"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { fetchStudentData, ContineoAPIError } from "@/lib/api/contineo";
import {
    mapCIEMarksToCalculatorFormat,
    SUBJECT_CODE_TO_NAME_MAP,
} from "@/lib/utils/mark-mapper";
import type { MappedMarks } from "@/types/contineo";

interface ContineoFetchButtonProps {
    semester: "Sem3" | "Sem4" | "Sem5" | "Sem6";
    onMarksFetched: (marks: MappedMarks) => void;
}

export default function ContineoFetchButton({
    semester,
    onMarksFetched,
}: ContineoFetchButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFetch = async () => {
        if (!username.trim()) {
            setError("Please enter your username");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const data = await fetchStudentData(username.trim(), false);
            console.log("📥 Fetched data:", data);
            console.log("🔑 Subject codes in API:", Object.keys(data.cie_marks));

            // TEMPORARILY SKIP FILTERING - Map ALL subjects
            const mappedMarks = mapCIEMarksToCalculatorFormat(data.cie_marks, SUBJECT_CODE_TO_NAME_MAP);
            console.log("📊 Mapped marks (ALL subjects):", mappedMarks);
            console.log("📝 Number of subjects mapped:", Object.keys(mappedMarks).length);

            onMarksFetched(mappedMarks);
            setSuccess(true);

            setTimeout(() => {
                setIsOpen(false);
                setUsername("");
                setSuccess(false);
            }, 1500);
        } catch (err) {
            const errorMessage = err instanceof ContineoAPIError
                ? err.message
                : "Failed to fetch marks. Please check your connection and try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button variant="outline" onClick={() => setIsOpen(true)} className="w-full flex items-center gap-2">
                <Download className="w-4 h-4" />
                Fetch from Contineo
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Fetch Marks from Contineo</DialogTitle>
                        <DialogDescription>
                            Enter your Contineo username to automatically fetch your marks.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Contineo Username</Label>
                            <Input
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !isLoading && handleFetch()}
                                disabled={isLoading}
                            />
                            <p className="text-xs text-muted-foreground">
                                This is the username you registered with in the Contineo scraper system
                            </p>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-600 dark:text-green-400">
                                    Marks fetched successfully!
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsOpen(false);
                                setUsername("");
                                setError(null);
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleFetch} disabled={isLoading || !username.trim()}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Fetch Marks
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
