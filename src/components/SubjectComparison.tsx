"use client";

import type { FetchDataResponse } from "@/types/contineo";
import { mapSubjectCodeToName } from "@/lib/utils/mark-mapper";
import { TrendingUp, TrendingDown, Minus, BookOpen } from "lucide-react";

interface SubjectComparisonProps {
    user1Data: FetchDataResponse;
    user2Data: FetchDataResponse;
}

interface ComparisonRow {
    subjectCode: string;
    subjectName: string;
    user1Marks: {
        "TH-ISE1"?: number;
        MSE?: number;
        "TH-ISE2"?: number;
        ESE?: number;
        "PR-ISE1"?: number;
        "PR-ISE2"?: number;
        total: number;
    };
    user2Marks: {
        "TH-ISE1"?: number;
        MSE?: number;
        "TH-ISE2"?: number;
        ESE?: number;
        "PR-ISE1"?: number;
        "PR-ISE2"?: number;
        total: number;
    };
    difference: number;
}

export default function SubjectComparison({ user1Data, user2Data }: SubjectComparisonProps) {
    // Combine all unique subject codes from both users
    const allSubjectCodes = new Set([
        ...Object.keys(user1Data.cie_marks),
        ...Object.keys(user2Data.cie_marks),
    ]);

    // Build comparison data
    const comparisonData: ComparisonRow[] = Array.from(allSubjectCodes).map((code) => {
        const user1Marks = user1Data.cie_marks[code] || {};
        const user2Marks = user2Data.cie_marks[code] || {};

        const user1Total =
            (user1Marks["TH-ISE1"] || 0) +
            (user1Marks.MSE || 0) +
            (user1Marks["TH-ISE2"] || 0) +
            (user1Marks.ESE || 0) +
            (user1Marks["PR-ISE1"] || 0) +
            (user1Marks["PR-ISE2"] || 0);

        const user2Total =
            (user2Marks["TH-ISE1"] || 0) +
            (user2Marks.MSE || 0) +
            (user2Marks["TH-ISE2"] || 0) +
            (user2Marks.ESE || 0) +
            (user2Marks["PR-ISE1"] || 0) +
            (user2Marks["PR-ISE2"] || 0);

        return {
            subjectCode: code,
            subjectName: mapSubjectCodeToName(code),
            user1Marks: { ...user1Marks, total: user1Total },
            user2Marks: { ...user2Marks, total: user2Total },
            difference: user1Total - user2Total,
        };
    });

    // Sort by subject name
    comparisonData.sort((a, b) => a.subjectName.localeCompare(b.subjectName));

    const getDifferenceIcon = (diff: number) => {
        if (diff > 0) return <TrendingUp className="h-4 w-4 text-emerald-500" />;
        if (diff < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
        return <Minus className="h-4 w-4 text-zinc-500" />;
    };

    const getDifferenceColor = (diff: number) => {
        if (diff > 0) return "text-emerald-500";
        if (diff < 0) return "text-red-500";
        return "text-zinc-500";
    };

    const getHighlightClass = (val1?: number, val2?: number) => {
        if (val1 === undefined || val2 === undefined) return "";
        if (val1 > val2) return "bg-emerald-900/30 border-emerald-900";
        if (val1 < val2) return "bg-red-900/20 border-red-900";
        return "";
    };

    if (comparisonData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[200px] text-zinc-500">
                <BookOpen className="h-12 w-12 mb-4 opacity-20" />
                <p>No common subjects found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {comparisonData.map((row) => (
                <div
                    key={row.subjectCode}
                    className="group relative bg-black border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all duration-300"
                >
                    {/* Subject Header */}
                    <div className="flex items-start justify-between mb-4 pb-3 border-b border-zinc-800">
                        <div className="flex-1">
                            <h3 className="font-bold text-white mb-1">{row.subjectName}</h3>
                            <p className="text-xs font-mono text-zinc-500">{row.subjectCode}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {getDifferenceIcon(row.difference)}
                            <span className={`font-mono font-bold ${getDifferenceColor(row.difference)}`}>
                                {row.difference > 0 ? "+" : ""}
                                {row.difference}
                            </span>
                        </div>
                    </div>

                    {/* Marks Comparison Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* User 1 Column */}
                        <div className="space-y-2">
                            <div className="text-xs font-medium text-zinc-400 mb-3">
                                {user1Data.user.full_name.split(" ")[1] || user1Data.user.username}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {row.user1Marks["TH-ISE1"] !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user1Marks["TH-ISE1"],
                                            row.user2Marks["TH-ISE1"]
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">ISE 1</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user1Marks["TH-ISE1"]}
                                        </span>
                                    </div>
                                )}
                                {row.user1Marks.MSE !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user1Marks.MSE,
                                            row.user2Marks.MSE
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">MSE</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user1Marks.MSE}
                                        </span>
                                    </div>
                                )}
                                {row.user1Marks["TH-ISE2"] !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user1Marks["TH-ISE2"],
                                            row.user2Marks["TH-ISE2"]
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">ISE 2</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user1Marks["TH-ISE2"]}
                                        </span>
                                    </div>
                                )}
                                {row.user1Marks.ESE !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user1Marks.ESE,
                                            row.user2Marks.ESE
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">ESE</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user1Marks.ESE}
                                        </span>
                                    </div>
                                )}
                                {row.user1Marks["PR-ISE1"] !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user1Marks["PR-ISE1"],
                                            row.user2Marks["PR-ISE1"]
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">PR ISE 1</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user1Marks["PR-ISE1"]}
                                        </span>
                                    </div>
                                )}
                                {row.user1Marks["PR-ISE2"] !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user1Marks["PR-ISE2"],
                                            row.user2Marks["PR-ISE2"]
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">PR ISE 2</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user1Marks["PR-ISE2"]}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div
                                className={`mt-2 pt-2 border-t border-dashed border-zinc-800 flex justify-between items-center bg-zinc-900/50 p-2 rounded-lg ${getHighlightClass(
                                    row.user1Marks.total,
                                    row.user2Marks.total
                                )}`}
                            >
                                <span className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Total</span>
                                <span className="font-mono font-black text-lg text-white">{row.user1Marks.total}</span>
                            </div>
                        </div>

                        {/* User 2 Column */}
                        <div className="space-y-2">
                            <div className="text-xs font-medium text-zinc-400 mb-3">
                                {user2Data.user.full_name.split(" ")[1] || user2Data.user.username}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {row.user2Marks["TH-ISE1"] !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user2Marks["TH-ISE1"],
                                            row.user1Marks["TH-ISE1"]
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">ISE 1</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user2Marks["TH-ISE1"]}
                                        </span>
                                    </div>
                                )}
                                {row.user2Marks.MSE !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user2Marks.MSE,
                                            row.user1Marks.MSE
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">MSE</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user2Marks.MSE}
                                        </span>
                                    </div>
                                )}
                                {row.user2Marks["TH-ISE2"] !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user2Marks["TH-ISE2"],
                                            row.user1Marks["TH-ISE2"]
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">ISE 2</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user2Marks["TH-ISE2"]}
                                        </span>
                                    </div>
                                )}
                                {row.user2Marks.ESE !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user2Marks.ESE,
                                            row.user1Marks.ESE
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">ESE</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user2Marks.ESE}
                                        </span>
                                    </div>
                                )}
                                {row.user2Marks["PR-ISE1"] !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user2Marks["PR-ISE1"],
                                            row.user1Marks["PR-ISE1"]
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">PR ISE 1</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user2Marks["PR-ISE1"]}
                                        </span>
                                    </div>
                                )}
                                {row.user2Marks["PR-ISE2"] !== undefined && (
                                    <div
                                        className={`flex justify-between items-center bg-zinc-900 p-2 rounded-md border ${getHighlightClass(
                                            row.user2Marks["PR-ISE2"],
                                            row.user1Marks["PR-ISE2"]
                                        )}`}
                                    >
                                        <span className="text-xs text-zinc-500 font-medium">PR ISE 2</span>
                                        <span className="font-mono text-sm font-bold text-zinc-300">
                                            {row.user2Marks["PR-ISE2"]}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div
                                className={`mt-2 pt-2 border-t border-dashed border-zinc-800 flex justify-between items-center bg-zinc-900/50 p-2 rounded-lg ${getHighlightClass(
                                    row.user2Marks.total,
                                    row.user1Marks.total
                                )}`}
                            >
                                <span className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Total</span>
                                <span className="font-mono font-black text-lg text-white">{row.user2Marks.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
