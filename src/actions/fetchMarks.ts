"use server";

import * as cheerio from "cheerio";

// CRCE Student Portal Configuration
const LOGIN_URL =
  process.env.LOGIN_URL ??
  "https://crce-students.contineo.in/parents/index.php?option=com_studentdashboard&controller=studentdashboard&task=dashboard";
const FORM_ACTION_URL = process.env.FORM_ACTION_URL ?? LOGIN_URL;

const PRN_FIELD_NAME = process.env.PRN_FIELD_NAME ?? "username";
const DAY_FIELD_NAME = process.env.DAY_FIELD_NAME ?? "dd";
const MONTH_FIELD_NAME = process.env.MONTH_FIELD_NAME ?? "mm";
const YEAR_FIELD_NAME = process.env.YEAR_FIELD_NAME ?? "yyyy";
const PASSWORD_FIELD_NAME = process.env.PASSWORD_FIELD_NAME ?? "passwd";

type CieValue = number | string | null;
export type CieData = Record<string, Record<string, CieValue>>;

type LoginParams = {
  prn: string;
  dobDay: number;
  dobMonth: number;
  dobYear: number;
  userFullNameForCheck?: string; // Optional since the portal doesn't require it
};

async function loginAndGetWelcomePage({
  prn,
  dobDay,
  dobMonth,
  dobYear,
  userFullNameForCheck,
}: LoginParams): Promise<string | null> {
  // 1) GET login page
  const getResp = await fetch(LOGIN_URL, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      Referer: LOGIN_URL,
    },
  });

  if (!getResp.ok) {
    console.error("Failed to fetch login page", getResp.status);
    return null;
  }

  const loginPageHtml = await getResp.text();
  const $login = cheerio.load(loginPageHtml);

  const loginForm = $login("form#login-form");
  if (!loginForm || loginForm.length === 0) {
    console.error("Could not find login form with id='login-form'");
    return null;
  }

  // Parse form `action`
  const formAction = loginForm.attr("action");
  const actualPostUrl = formAction
    ? new URL(formAction, LOGIN_URL).toString()
    : FORM_ACTION_URL;

  // Build payload
  // Note: Day field values have trailing space in the portal (e.g., '01 ')
  const dayStr = String(dobDay).padStart(2, "0") + " ";
  const monthStr = String(dobMonth).padStart(2, "0");
  const yearStr = String(dobYear);
  const passwordString = `${yearStr}-${monthStr}-${dayStr.trim()}`;

  const payload: Record<string, string | number> = {
    [PRN_FIELD_NAME]: prn,
    [DAY_FIELD_NAME]: dayStr,
    [MONTH_FIELD_NAME]: monthStr,
    [YEAR_FIELD_NAME]: yearStr,
    [PASSWORD_FIELD_NAME]: passwordString,
  };

  // Reconstruct cookies from GET (if any)
  let cookieHeader: string | undefined;

  // Try modern getSetCookie() method first
  if (typeof getResp.headers.getSetCookie === "function") {
    const cookies = getResp.headers.getSetCookie();
    if (cookies.length > 0) {
      const cookieParts = cookies.map((c) => c.split(";")[0].trim());
      cookieHeader = cookieParts.join("; ");
    }
  } else {
    // Fallback for older Node versions
    const setCookieHeader = getResp.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieParts = setCookieHeader
        .split(",")
        .map((c) => c.split(";")[0])
        .map((c) => c.trim())
        .filter(Boolean);
      cookieHeader = cookieParts.join("; ");
    }
  }

  // Build form body directly to preserve field order and duplicates
  const formBody = new URLSearchParams();

  // Add our credential fields first (in the order they appear in the form)
  formBody.append(PRN_FIELD_NAME, prn);
  formBody.append(DAY_FIELD_NAME, dayStr);
  formBody.append(MONTH_FIELD_NAME, monthStr);
  formBody.append(YEAR_FIELD_NAME, yearStr);

  // Add hidden inputs in order, including duplicates
  loginForm.find('input[type="hidden"]').each((_, el) => {
    const name = $login(el).attr("name");
    const value = $login(el).attr("value") ?? "";

    if (name) {
      if (name === PASSWORD_FIELD_NAME) {
        // Set password field with our computed value
        formBody.append(name, passwordString);
      } else {
        // Add all other hidden fields as-is (including duplicates)
        formBody.append(name, value);
      }
    }
  });

  // 2) POST login request

  const postResp = await fetch(actualPostUrl, {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      Referer: LOGIN_URL,
      Origin: new URL(LOGIN_URL).origin,
      "Content-Type": "application/x-www-form-urlencoded",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: formBody.toString(),
    redirect: "manual", // Handle redirects manually
  });

  // Handle redirect manually to preserve cookies
  let welcomeHtml: string;
  if (postResp.status === 303 || postResp.status === 302) {
    const redirectUrl = postResp.headers.get("location");

    // Update cookies from the POST response
    const newCookies = postResp.headers.getSetCookie?.() || [];
    if (newCookies.length > 0) {
      const cookieParts = newCookies.map((c) => c.split(";")[0].trim());
      cookieHeader = cookieParts.join("; ");
    }

    if (redirectUrl) {
      const fullRedirectUrl = new URL(redirectUrl, LOGIN_URL).toString();
      const redirectResp = await fetch(fullRedirectUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
          Referer: LOGIN_URL,
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
      });
      welcomeHtml = await redirectResp.text();
    } else {
      console.error("No location header in redirect response");
      return null;
    }
  } else if (!postResp.ok) {
    console.error("Login POST failed", postResp.status);
    return null;
  } else {
    welcomeHtml = await postResp.text();
  }

  // 3) Check login success
  const lowerHtml = welcomeHtml.toLowerCase();

  let loginSuccessful = false;

  // Check for known success indicators
  if (welcomeHtml.includes('id="gaugeTypeMulti"')) {
    console.log("Login successful (found attendance chart)!");
    loginSuccessful = true;
  } else if (welcomeHtml.includes('id="stackedBarChart_1"')) {
    console.log("Login successful (found CIE chart)!");
    loginSuccessful = true;
  } else if (
    userFullNameForCheck &&
    lowerHtml.includes(userFullNameForCheck.toLowerCase())
  ) {
    console.log(`Login successful! Welcome ${userFullNameForCheck}.`);
    loginSuccessful = true;
  } else {
    const $post = cheerio.load(welcomeHtml);
    if ($post("form#login-form").length > 0) {
      console.error(
        "Login FAILED. The page after POST still contains the login form."
      );
      if (lowerHtml.includes("invalid username or password")) {
        console.error("Reason: Invalid username or password detected on page.");
      }
    } else {
      console.warn(
        "Login status uncertain. No user identifier or known charts, but it's not the login page."
      );
      // Assume success if we don't see the login form
      loginSuccessful = true;
    }
  }

  if (!loginSuccessful) {
    return null;
  }

  return welcomeHtml;
}

function extractCieMarksFromWelcomePage(html: string): CieData | null {
  if (!html) return null;

  const $ = cheerio.load(html);
  const scripts = $("script");

  const cieData: CieData = {};
  let found = false;

  scripts.each((_, el) => {
    if (found) return;

    const scriptContent = $(el).text().trim();
    if (
      !scriptContent.includes("stackedBarChart_1") ||
      !scriptContent.includes('type: "bar"') ||
      !scriptContent.includes("categories:")
    ) {
      return;
    }

    // Extract bb.generate({ ... bindto: "#stackedBarChart_1" ... });
    const chartConfigMatch = scriptContent.match(
      /bb\.generate\s*\(\s*(\{[\s\S]*?bindto\s*:\s*['"]#stackedBarChart_1['"][\s\S]*?\})\s*\)\s*;/
    );
    if (!chartConfigMatch) return;

    const chartConfigStr = chartConfigMatch[1];

    // Extract categories: ["SUB1", "SUB2", ...]
    const categoriesMatch = chartConfigStr.match(
      /categories\s*:\s*(\[[\s\S]*?\])/
    );
    if (!categoriesMatch) return;

    const categoriesStr = categoriesMatch[1];
    const subjects = Array.from(
      categoriesStr.matchAll(/['"]([^'"]+)['"]/g),
      (m) => m[1]
    );

    if (!subjects.length) return;

    // Extract columns: [ ["UT1", ...], ["UT2", ...], ... ], type: "bar"
    const columnsMatch = chartConfigStr.match(
      /columns\s*:\s*(\[[\s\S]*?\])\s*,\s*type\s*:\s*["']bar["']/
    );
    if (!columnsMatch) return;

    const columnsStr = columnsMatch[1];

    // Series regex: ["UT1", 12, 15, ...]
    const seriesMatches = Array.from(
      columnsStr.matchAll(
        /\[\s*['"]([^'"]+)['"]\s*([^\]]*)\]/g // group 1 = exam type, group 2 = values
      )
    );

    for (const series of seriesMatches) {
      const examType = series[1]; // e.g., "UT1"
      const valuesStr = series[2] ?? "";

      const rawItems = valuesStr
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);

      const parsedMarks: CieValue[] = rawItems.map((item) => {
        const lower = item.toLowerCase();

        if (lower === "null") return null;

        // "something"
        if (item.startsWith('"') && item.endsWith('"')) {
          const inner = item.slice(1, -1);
          if (!inner || inner.toLowerCase() === "null") return null;
          const num = Number(inner);
          if (!isNaN(num)) return num;
          return inner;
        }

        // number
        const num = Number(item);
        if (!isNaN(num)) return num;

        return item; // fallback
      });

      subjects.forEach((subjectCode, idx) => {
        if (!cieData[subjectCode]) cieData[subjectCode] = {};
        cieData[subjectCode][examType] =
          idx < parsedMarks.length ? parsedMarks[idx] : null;
      });
    }

    found = true;
  });

  if (!found) {
    console.error("Could not find or parse CIE marks from any script tag.");
    return null;
  }

  return cieData;
}

export async function fetchCieMarksAction(
  params: LoginParams
): Promise<CieData | null> {
  const welcomeHtml = await loginAndGetWelcomePage(params);
  if (!welcomeHtml) return null;

  return extractCieMarksFromWelcomePage(welcomeHtml);
}
