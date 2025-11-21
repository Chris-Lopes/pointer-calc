// API client for Contineo scraper backend

import type {
    FetchDataResponse,
    MarksResponse,
    RegisterUserData,
    ContineoError,
} from "@/types/contineo";

const API_BASE_URL = process.env.NEXT_PUBLIC_CONTINEO_API_URL || "http://localhost:8000";

class ContineoAPIError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = "ContineoAPIError";
        this.status = status;
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error: ContineoError = await response.json().catch(() => ({
            detail: `HTTP ${response.status}: ${response.statusText}`,
        }));
        throw new ContineoAPIError(error.detail, response.status);
    }
    return response.json();
}

/**
 * Fetch student data (attendance + CIE marks) from Contineo portal
 */
export async function fetchStudentData(
    username: string,
    forceRefresh: boolean = false
): Promise<FetchDataResponse> {
    const url = `${API_BASE_URL}/api/data/fetch/${username}?force_refresh=${forceRefresh}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return handleResponse<FetchDataResponse>(response);
}

/**
 * Get cached CIE marks for a user
 */
export async function getMarks(username: string): Promise<MarksResponse> {
    const url = `${API_BASE_URL}/api/data/marks/${username}`;

    const response = await fetch(url);
    return handleResponse<MarksResponse>(response);
}

/**
 * Register a new user in the Contineo system
 */
export async function registerUser(data: RegisterUserData): Promise<{ message: string; username: string }> {
    const url = `${API_BASE_URL}/api/users/register`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return handleResponse<{ message: string; username: string }>(response);
}

/**
 * Check if API is accessible
 */
export async function healthCheck(): Promise<{ status: string }> {
    const url = `${API_BASE_URL}/health`;

    const response = await fetch(url);
    return handleResponse<{ status: string }>(response);
}

export { ContineoAPIError };
