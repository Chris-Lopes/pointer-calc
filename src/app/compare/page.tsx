"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { Lock, ArrowLeft, Users, Loader2 } from "lucide-react";
import { fetchStudentData } from "@/lib/api/contineo";
import type { FetchDataResponse } from "@/types/contineo";
import SubjectComparison from "@/components/SubjectComparison";

// Secret password - read from env or use development default
const SECRET_PASSWORD = process.env.NEXT_PUBLIC_COMPARE_PASSWORD || "compare123";

export default function ComparePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [username1, setUsername1] = useState("");
    const [username2, setUsername2] = useState("");
    const [user1Data, setUser1Data] = useState<FetchDataResponse | null>(null);
    const [user2Data, setUser2Data] = useState<FetchDataResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === SECRET_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordError("");
        } else {
            setPasswordError("Incorrect password. Access denied.");
        }
    };

    const handleCompare = async () => {
        if (!username1 || !username2) {
            setError("Please enter both usernames");
            return;
        }

        setLoading(true);
        setError("");
        setUser1Data(null);
        setUser2Data(null);

        try {
            // Fetch data for both users
            const [data1, data2] = await Promise.all([
                fetchStudentData(username1, false),
                fetchStudentData(username2, false),
            ]);

            setUser1Data(data1);
            setUser2Data(data2);
        } catch (err: any) {
            setError(err.message || "Failed to fetch data for one or both users");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setUsername1("");
        setUsername2("");
        setUser1Data(null);
        setUser2Data(null);
        setError("");
    };

    // Password Gate
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-2">
                        <div className="mx-auto p-4 bg-zinc-800 rounded-full w-fit">
                            <Lock className="h-8 w-8 text-zinc-400" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">Secret Access Required</CardTitle>
                        <CardDescription className="text-zinc-400">
                            This is a restricted comparison tool. Enter the password to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    placeholder="Enter secret password"
                                    className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
                                    autoFocus
                                />
                            </div>
                            {passwordError && (
                                <Alert className="bg-red-900/20 border-red-900 text-red-400">
                                    {passwordError}
                                </Alert>
                            )}
                            <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
                                Unlock
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Main Comparison Interface
    return (
        <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => (window.location.href = "/")}
                        className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Users className="h-8 w-8" />
                            Student Comparison Tool
                        </h1>
                        <p className="text-zinc-400 mt-1">Compare academic performance between two students</p>
                    </div>
                </div>

                {/* Input Section */}
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <CardHeader>
                        <CardTitle className="text-white">Select Students</CardTitle>
                        <CardDescription className="text-zinc-400">Enter usernames for both students to compare</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="user1" className="text-zinc-300">Student 1 Username</Label>
                                <Input
                                    id="user1"
                                    value={username1}
                                    onChange={(e) => setUsername1(e.target.value)}
                                    placeholder="Enter first username"
                                    className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="user2" className="text-zinc-300">Student 2 Username</Label>
                                <Input
                                    id="user2"
                                    value={username2}
                                    onChange={(e) => setUsername2(e.target.value)}
                                    placeholder="Enter second username"
                                    className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {error && (
                            <Alert className="bg-red-900/20 border-red-900 text-red-400">
                                {error}
                            </Alert>
                        )}

                        <div className="flex gap-3">
                            <Button
                                onClick={handleCompare}
                                disabled={loading || !username1 || !username2}
                                className="bg-white text-black hover:bg-zinc-200"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Fetching Data...
                                    </>
                                ) : (
                                    "Compare Students"
                                )}
                            </Button>
                            {(user1Data || user2Data) && (
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                                >
                                    Reset
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Comparison Results */}
                {user1Data && user2Data && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* User Profile Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg text-white">{user1Data.user.full_name}</CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        <span className="font-mono text-xs">PRN: {user1Data.user.prn}</span>
                                        <br />
                                        <span className="font-mono text-xs">Username: {user1Data.user.username}</span>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg text-white">{user2Data.user.full_name}</CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        <span className="font-mono text-xs">PRN: {user2Data.user.prn}</span>
                                        <br />
                                        <span className="font-mono text-xs">Username: {user2Data.user.username}</span>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Subject-wise Comparison */}
                        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Subject-wise Marks Comparison</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Detailed comparison of CIE marks across all subjects
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SubjectComparison user1Data={user1Data} user2Data={user2Data} />
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
