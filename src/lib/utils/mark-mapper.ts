// Utility to map API marks format to calculator format

import type {
    CIEMarks,
    CalculatorComponentMarks,
    MappedMarks,
} from "@/types/contineo";

/**
 * Subject name mappings from API subject codes to calculator subject names
 */
const SUBJECT_NAME_OVERRIDES: Record<string, string> = {};

/**
 * Maps API mark types to calculator field names
 */
function mapApiMarkToCalculatorField(
    apiMarks: CIEMarks[string]
): CalculatorComponentMarks {
    const calculatorMarks: CalculatorComponentMarks = {};

    // Map theory components
    if (apiMarks["TH-ISE1"] !== undefined) {
        calculatorMarks.ise1 = apiMarks["TH-ISE1"];
    }

    if (apiMarks.MSE !== undefined) {
        calculatorMarks.mse = apiMarks.MSE;
    }

    if (apiMarks["TH-ISE2"] !== undefined) {
        calculatorMarks.ise2 = apiMarks["TH-ISE2"];
    }

    if (apiMarks.ESE !== undefined) {
        calculatorMarks.ese = apiMarks.ESE;
    }

    // Combine practical marks
    const prIse1 = apiMarks["PR-ISE1"] || 0;
    const prIse2 = apiMarks["PR-ISE2"] || 0;

    if (prIse1 || prIse2) {
        calculatorMarks.practical_ise = prIse1 + prIse2;
    }

    return calculatorMarks;
}

/**
 * Maps API CIE marks to calculator format
 */
export function mapCIEMarksToCalculatorFormat(
    cieMarks: CIEMarks,
    subjectCodeToNameMap: Record<string, string>
): MappedMarks {
    const mapped: MappedMarks = {};

    for (const [subjectCode, apiMarks] of Object.entries(cieMarks)) {
        let subjectName = subjectCodeToNameMap[subjectCode] || subjectCode;
        subjectName = SUBJECT_NAME_OVERRIDES[subjectName] || subjectName;
        mapped[subjectName] = mapApiMarkToCalculatorField(apiMarks);
    }

    return mapped;
}

/**
 * Filters marks by semester (DISABLED - returns all marks)
 */
export function filterMarksBySemester(
    cieMarks: CIEMarks,
    semester: "Sem3" | "Sem4" | "Sem5" | "Sem6"
): CIEMarks {
    // For now, return all marks without filtering
    return cieMarks;
}

/**
 * Subject code to name mapping from Contineo API config
 */
export const SUBJECT_CODE_TO_NAME_MAP: Record<string, string> = {
    // Semester 3 (SE) - 2025 batch codes
    "25BSC12CE05": "Discrete Mathematics and Graph Theory",
    "25PCC12CE05": "Computer Organization and Architecture",
    "25PCC12CE06": "Data Structures",
    "25PCC12CE07": "Object Oriented Programming with JAVA",
    "25VEC12CE01": "Human Values and Professional Ethics",
    "25AEC12CE021": "Modern Indian Languages",
    "25MDMBM1": "MDM Course-1",
    "25OE13CE12": "Financial Planning",
    "25MDMBM2": "MDM Course-2",
    "25DM41": "Double Minor Course",

    // Semester 4 (SE) - 2025 batch
    "25BSC12CE06": "Linear Algebra and Business Statistics",
    "25PCC12CE08": "Database Management Systems",
    "25PCC12CE09": "Analysis of Algorithm",
    "25PCC12CE10": "Operating Systems",

    // Semester 5 (TE) - 2025 batch
    "25PCC13CE11": "Computer Network",
    "25PCC13CE12": "Theory of Computer Science",
    "25PCC13CE13": "Operating Systems",
    "25PCC13CE14": "Data Warehousing and Mining",
    "25PEC13CE16": "Human Machine Interface",
    "25MDM42": "Emotional And Spiritual Intelligence",
    "25PECL13CE14": "Innovative Product Development Lab Phase 1",
    "25OE13CE43": "Supply Chain Management",

    // Semester 6 (TE) - Older batch codes
    "CSC601": "System Programming & Compiler Construction",
    "CSC602": "Cryptography and System Security",
    "CSC603": "Mobile Computing",
    "CSC604": "Artificial Intelligence",
    "CSL601": "SPCC Lab",
    "CSL602": "CSS Lab",
    "CSL603": "MC Lab",
    "CSL604": "AI Lab",
    "CSL605": "Skill-Based Lab",
    "CSM601": "Mini Project 2B",
};
