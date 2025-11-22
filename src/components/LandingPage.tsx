"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Loader2,
    Download,
    AlertCircle,
    CheckCircle2,
    UserPlus,
    GraduationCap,
    ArrowRight,
    User
} from "lucide-react";
import { fetchStudentData, registerUser, ContineoAPIError } from "@/lib/api/contineo";
import type { FetchDataResponse } from "@/types/contineo";

interface LandingPageProps {
    onLogin: (data: FetchDataResponse) => void;
    onGuest: () => void;
}

export default function LandingPage({ onLogin, onGuest }: LandingPageProps) {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showRegister, setShowRegister] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Registration fields
    const [regFullName, setRegFullName] = useState("");
    const [regPRN, setRegPRN] = useState("");
    const [regDay, setRegDay] = useState("");
    const [regMonth, setRegMonth] = useState("");
    const [regYear, setRegYear] = useState("");

    const handleFetch = async () => {
        if (!username.trim()) {
            setError("Please enter your username");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Force refresh to ensure we get latest data (including new subjects)
            const data = await fetchStudentData(username.trim(), true);
            setSuccessMessage("Welcome back! Loading your dashboard...");

            setTimeout(() => {
                onLogin(data);
            }, 1000);
        } catch (err) {
            if (err instanceof ContineoAPIError && err.message.includes("not found")) {
                setError("User not found. Please register to continue.");
                setShowRegister(true);
            } else {
                const errorMessage = err instanceof ContineoAPIError
                    ? err.message
                    : "Failed to fetch data. Please check your connection.";
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!username.trim() || !regFullName.trim() || !regPRN.trim() || !regDay || !regMonth || !regYear) {
            setError("Please fill in all registration fields");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await registerUser({
                username: username.trim(),
                full_name: regFullName.trim(),
                prn: regPRN.trim(),
                dob_day: regDay,
                dob_month: regMonth,
                dob_year: regYear,
            });

            setSuccessMessage("Registration successful! Fetching your data...");

            // Auto-fetch after registration
            setTimeout(async () => {
                await handleFetch();
            }, 1000);

        } catch (err) {
            const errorMessage = err instanceof ContineoAPIError
                ? err.message
                : "Registration failed. Please check your details.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
            <div className="w-full max-w-md space-y-8">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
                    <p className="text-muted-foreground">
                        Access your academic performance, attendance, and calculate your pointers in one place.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">

                    {!showRegister ? (
                        /* Login View */
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Contineo Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        placeholder="Enter your username"
                                        className="pl-9"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && !isLoading && handleFetch()}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <Button
                                className="w-full"
                                size="lg"
                                onClick={handleFetch}
                                disabled={isLoading || !username.trim()}
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Download className="mr-2 h-4 w-4" />
                                )}
                                Fetch My Data
                            </Button>
                        </div>
                    ) : (
                        /* Registration View */
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input value={username} disabled />
                            </div>

                            <div className="space-y-2">
                                <Label>Full Name (as per Contineo)</Label>
                                <Input
                                    placeholder="SURNAME NAME FATHER'S NAME"
                                    value={regFullName}
                                    onChange={(e) => setRegFullName(e.target.value.toUpperCase())}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>PRN</Label>
                                <Input
                                    placeholder="e.g., MU034112XXXXXX"
                                    value={regPRN}
                                    onChange={(e) => setRegPRN(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Date of Birth</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <Input
                                        placeholder="DD"
                                        value={regDay}
                                        onChange={(e) => setRegDay(e.target.value)}
                                        maxLength={2}
                                        className="text-center"
                                    />
                                    <Input
                                        placeholder="MM"
                                        value={regMonth}
                                        onChange={(e) => setRegMonth(e.target.value)}
                                        maxLength={2}
                                        className="text-center"
                                    />
                                    <Input
                                        placeholder="YYYY"
                                        value={regYear}
                                        onChange={(e) => setRegYear(e.target.value)}
                                        maxLength={4}
                                        className="text-center"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" className="flex-1" onClick={() => setShowRegister(false)}>
                                    Back
                                </Button>
                                <Button className="flex-1" onClick={handleRegister} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                                    Register
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Status Messages */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {successMessage && (
                        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-600 dark:text-green-400">
                                {successMessage}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Guest Option */}
                <div className="text-center">
                    <Button variant="ghost" onClick={onGuest} className="text-muted-foreground hover:text-foreground">
                        Continue as Guest <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            </div>
        </div>
    );
}
