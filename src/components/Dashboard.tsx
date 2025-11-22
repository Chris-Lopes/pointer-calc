"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, LogOut, User, BookOpen, CalendarDays, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
import type { FetchDataResponse } from "@/types/contineo";
import { mapSubjectCodeToName } from "@/lib/utils/mark-mapper";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  studentData: FetchDataResponse;
  onCalculate: () => void;
  onLogout: () => void;
}

export default function Dashboard({ studentData, onCalculate, onLogout }: DashboardProps) {
  const { user, attendance, cie_marks } = studentData;

  // Calculate overall attendance if available
  const overallAttendance = attendance.length > 0
    ? Math.round(attendance.reduce((acc, curr) => acc + curr.percentage, 0) / attendance.length)
    : 0;

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 space-y-8 transition-colors duration-500">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome back, {user.full_name.split(' ')[1] || user.username}
          </h1>
          <p className="text-zinc-400 text-lg flex items-center gap-2">
            Here's your academic performance overview <Sparkles className="h-4 w-4 text-yellow-500" />
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onLogout} className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Button onClick={onCalculate} size="lg" className="bg-white text-black hover:bg-zinc-200 shadow-lg shadow-zinc-900/20 transition-all duration-300 transform hover:-translate-y-0.5">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Pointer
          </Button>
        </div>
      </div>

      {/* Profile & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">

        {/* Profile Card */}
        <Card className="md:col-span-1 h-full border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold text-zinc-100">Student Profile</CardTitle>
            <div className="p-2 bg-zinc-800 rounded-full">
              <User className="h-5 w-5 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="group p-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Full Name</span>
                <p className="font-semibold text-zinc-200 truncate" title={user.full_name}>{user.full_name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group p-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">PRN</span>
                  <p className="font-mono text-sm font-semibold text-zinc-200">{user.prn}</p>
                </div>
                <div className="group p-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Username</span>
                  <p className="font-mono text-sm font-semibold text-zinc-200">{user.username}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                  <TrendingUp className="h-4 w-4" /> Overall Attendance
                </span>
                <span className={`text-2xl font-bold ${overallAttendance < 75 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {overallAttendance}%
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${overallAttendance < 75 ? 'bg-red-600' : 'bg-emerald-600'}`}
                  style={{ width: `${overallAttendance}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Summary */}
        <Card className="md:col-span-2 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-zinc-100">Attendance Details</CardTitle>
              <CardDescription className="text-zinc-400">Subject-wise attendance breakdown</CardDescription>
            </div>
            <div className="p-2 bg-zinc-800 rounded-full">
              <CalendarDays className="h-5 w-5 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent>
            {attendance.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-h-[320px] overflow-y-auto pr-4 custom-scrollbar">
                {attendance.map((record, idx) => (
                  <div key={idx} className="space-y-2 group">
                    <div className="flex justify-between text-sm items-end">
                      <span className="truncate max-w-[220px] font-medium text-zinc-300 group-hover:text-white transition-colors" title={record.subject_name}>
                        {record.subject_name}
                      </span>
                      <span className={`font-bold ${record.percentage < 75 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {record.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${record.percentage < 75 ? 'bg-red-600' : 'bg-emerald-600'}`}
                        style={{ width: `${record.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-end text-[10px] text-zinc-500 font-mono">
                      <span>{record.present} / {record.total} lectures</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-zinc-500">
                <BookOpen className="h-12 w-12 mb-4 opacity-20" />
                <p>No attendance data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CIE Marks Section */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-zinc-100">CIE Marks Overview</CardTitle>
            <CardDescription className="text-zinc-400">Internal assessment scores fetched from Contineo</CardDescription>
          </div>
          <div className="p-2 bg-zinc-800 rounded-full">
            <GraduationCap className="h-5 w-5 text-zinc-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(cie_marks).map(([code, marks]) => {
              const subjectName = mapSubjectCodeToName(code);
              return (
                <div key={code} className="group relative bg-black border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BookOpen className="h-12 w-12 text-zinc-500" />
                  </div>

                  <div className="flex flex-col gap-2 mb-4 relative z-10">
                    <h4 className="font-bold text-sm line-clamp-2 min-h-[2.5rem] text-zinc-200" title={subjectName}>
                      {subjectName}
                    </h4>
                    <Badge variant="outline" className="w-fit text-[10px] font-mono border-zinc-700 text-zinc-400">{code}</Badge>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {marks["TH-ISE1"] !== undefined && (
                        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded-md border border-zinc-800">
                          <span className="text-zinc-500 font-medium">ISE 1</span>
                          <span className="font-mono font-bold text-zinc-300">{marks["TH-ISE1"]}</span>
                        </div>
                      )}
                      {marks.MSE !== undefined && (
                        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded-md border border-zinc-800">
                          <span className="text-zinc-500 font-medium">MSE</span>
                          <span className="font-mono font-bold text-zinc-300">{marks.MSE}</span>
                        </div>
                      )}
                      {marks["TH-ISE2"] !== undefined && (
                        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded-md border border-zinc-800">
                          <span className="text-zinc-500 font-medium">ISE 2</span>
                          <span className="font-mono font-bold text-zinc-300">{marks["TH-ISE2"]}</span>
                        </div>
                      )}
                      {marks.ESE !== undefined && (
                        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded-md border border-zinc-800">
                          <span className="text-zinc-500 font-medium">ESE</span>
                          <span className="font-mono font-bold text-zinc-300">{marks.ESE}</span>
                        </div>
                      )}
                      {marks["PR-ISE1"] !== undefined && (
                        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded-md border border-zinc-800">
                          <span className="text-zinc-500 font-medium">PR ISE 1</span>
                          <span className="font-mono font-bold text-zinc-300">{marks["PR-ISE1"]}</span>
                        </div>
                      )}
                      {marks["PR-ISE2"] !== undefined && (
                        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded-md border border-zinc-800">
                          <span className="text-zinc-500 font-medium">PR ISE 2</span>
                          <span className="font-mono font-bold text-zinc-300">{marks["PR-ISE2"]}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-dashed border-zinc-800 flex justify-between items-center bg-zinc-900/50 p-2 rounded-lg">
                      <span className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Total Marks</span>
                      <span className="font-mono font-black text-lg text-white">
                        {(marks["TH-ISE1"] || 0) +
                          (marks.MSE || 0) +
                          (marks["TH-ISE2"] || 0) +
                          (marks.ESE || 0) +
                          (marks["PR-ISE1"] || 0) +
                          (marks["PR-ISE2"] || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions / Info */}
      <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-200 space-y-2">
            <h3 className="text-2xl font-bold text-white">Ready to calculate your pointer?</h3>
            <p className="text-zinc-400 max-w-xl">
              Your marks have been fetched successfully. Proceed to the calculator with your marks pre-filled to get your estimated pointer.
            </p>
          </div>
          <Button onClick={onCalculate} size="lg" className="bg-white text-black hover:bg-zinc-200 border-none font-bold px-8 py-6 h-auto transition-transform hover:scale-105">
            <Calculator className="mr-2 h-5 w-5" />
            Go to Calculator
          </Button>
        </div>
      </div>

    </div>
  );
}
