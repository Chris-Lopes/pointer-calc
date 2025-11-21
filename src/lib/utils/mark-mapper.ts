// Utility to map API marks format to calculator format

import type {
    CIEMarks,
    CalculatorComponentMarks,
    MappedMarks,
} from "@/types/contineo";

/**
 * Subject name mappings from API subject codes to calculator subject names
 * Based on the semester and subject code patterns
 */
const SUBJECT_NAME_OVERRIDES: Record<string, string> = {
    // Add specific overrides if API subject names don't match calculator exactly
    // Example: "Data Structures": "Data Structures"
};

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
 * Determines semester from subject code
 * CSC501, CSL501 -> Sem3 (SE)
 * CSC601, CSL601 -> Sem4 (SE)
 * CSC701, CSL701 -> Sem5 (TE)
 * CSC801, CSL801 -> Sem6 (TE)
 */
function getSemesterFromSubjectCode(subjectCode: string): string | null {
    const semesterMap: Record<string, string> = {
        "5": "Sem3", // SE Semester 3
        "6": "Sem4", // SE Semester 4  
        "7": "Sem5", // TE Semester 5
        "8": "Sem6", // TE Semester 6
    };

    // Extract semester digit (4th character in codes like CSC501)
    const semesterDigit = subjectCode.charAt(3);
    return semesterMap[semesterDigit] || null;
}

/**
 * Filters marks by semester
 */
export function filterMarksBySemester(
    cieMarks: CIEMarks,
    semester: "Sem3" | "Sem4" | "Sem5" | "Sem6"
): CIEMarks {
    const filtered: CIEMarks = {};

    for (const [subjectCode, marks] of Object.entries(cieMarks)) {
        const subjectSemester = getSemesterFromSubjectCode(subjectCode);
        if (subjectSemester === semester) {
            filtered[subjectCode] = marks;
        }
    }

    return filtered;
}

/**
 * Maps API CIE marks to calculator format
 * Subject codes are converted to subject names as keys
 */
export function mapCIEMarksToCalculatorFormat(
    cieMarks: CIEMarks,
    subjectCodeToNameMap: Record<string, string>
): MappedMarks {
    const mapped: MappedMarks = {};

    for (const [subjectCode, apiMarks] of Object.entries(cieMarks)) {
        // Get subject name from mapping or use code as fallback
        let subjectName = subjectCodeToNameMap[subjectCode] || subjectCode;

        // Apply overrides if any
        subjectName = SUBJECT_NAME_OVERRIDES[subjectName] || subjectName;

        // Map marks to calculator format
        mapped[subjectName] = mapApiMarkToCalculatorField(apiMarks);
    }

    return mapped;
}

/**
 * Get subject code to name mapping from API config
 * This should match the config.SUBJECT_CODE_TO_NAME_MAP from your API
 */
export const SUBJECT_CODE_TO_NAME_MAP: Record<string, string> = {
    // Semester 3 (SE)
    "CSC501": "Discrete Mathematics and Graph Theory",
    "CSC502": "Computer Organization and Architecture",
    "CSC503": "Data Structures",
    "CSL501": "Object Oriented Programming with JAVA",
    "CSC504": "Law for Engineers / Financial Planning",
    "CSC505": "MDM Course-1",
    "CSC506": "MDM Course-2",
    "CSC507": "Modern Indian Languages",
    "CSC508": "Human Values and Professional Ethics",
    "CSC509": "Community Engagement Project",

    // Semester 4 (SE) 
    "CSC601": "Linear Algebra and Business Statistics",
    "CSC602": "Database Management Systems",
    "CSC603": "Analysis of Algorithm",
    "CSC604": "Operating Systems",
    "CSC605": "Emerging Technology and Law / Principles of Management",
    "CSC606": "MDM Course-3",
    "CSL602": "Full Stack Development",
    "CSC607": "Technology Entrepreneurship",
    "CSC608": "Technology Innovation for Sustainable Development",
    "CSC609": "Double Minor Course",

    // Semester 5 (TE)
    "CSC701": "Cryptography and System Security",
    "CSC702": "Theory of Computer Science",
    "CSC703": "System Programming and Computer Construction",
    "CSC704": "Data Warehousing and Mining",
    "CSL701": "Cloud Computing Lab",
    "CSC705": "Program Elective Course",
    "CSL702": "Program Elective Lab",
    "CSC706": "Human Values and Psychology / Emotional and Spiritual Intelligence",
    "CSC707": "MDM Course-3",
    "CSC708": "Double Minor Course",

    // Semester 6 (TE)
    "CSC801": "Distributed Computing",
    "CSC802": "Software Engineering",
    "CSL801": "Artificial Intelligence Lab",
    "CSM601": "Mini Project 2B",
    "CSL802": "Mobile App Development",
    "CSL803": "DevOps Tools",
    "CSC803": "Advanced Microprocessors",
    "CSC804": "Program Elective Course",
    "CSL804": "Competitive Coding",
    "CSL805": "Program Elective Lab",
    "CSC805": "Public Relations and Corporate Communication",
    "CSC806": "MDM Course-5",
    "CSC807": "Double Minor Course",
};
