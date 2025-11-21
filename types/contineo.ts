// TypeScript types for Contineo API integration

export interface ContineoUser {
    username: string;
    full_name: string;
    prn: string;
}

export interface AttendanceRecord {
    subject: string;
    subject_name: string;
    percentage: number;
    present: number;
    absent: number;
    total: number;
}

export interface CIEMarks {
    [subjectCode: string]: {
        MSE?: number;
        "TH-ISE1"?: number;
        "TH-ISE2"?: number;
        ESE?: number;
        "PR-ISE1"?: number;
        "PR-ISE2"?: number;
    };
}

export interface FetchDataResponse {
    user: ContineoUser;
    attendance: AttendanceRecord[];
    cie_marks: CIEMarks;
    scraped_at: string;
}

export interface MarksResponse {
    username: string;
    cie_marks: CIEMarks;
}

export interface RegisterUserData {
    username: string;
    full_name: string;
    prn: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
}

// Calculator's ComponentMarks format
export interface CalculatorComponentMarks {
    ise1?: number;
    mse?: number;
    ise2?: number;
    ese?: number;
    practical_ise?: number;
    total?: number;
}

// Mapped marks by subject name
export interface MappedMarks {
    [subjectName: string]: CalculatorComponentMarks;
}

export interface ContineoError {
    detail: string;
    status?: number;
}
