"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, LogOut, User, BookOpen, CalendarDays, GraduationCap } from "lucide-react";
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
    <div className="min-h-screen bg-muted/20 p-4 md:p-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.full_name.split(' ')[1] || user.username}</h1>
          <p className="text-muted-foreground">Here's your academic overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Button onClick={onCalculate} size="lg" className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Pointer
          </Button>
        </div>
      </div>

      {/* Profile & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card */}
        <Card className="md:col-span-1 h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Full Name</span>
              <span className="font-semibold truncate" title={user.full_name}>{user.full_name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">PRN</span>
              <span className="font-mono text-sm">{user.prn}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Username</span>
              <span className="font-mono text-sm">{user.username}</span>
            </div>
            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Attendance</span>
                <span className={`text-lg font-bold ${overallAttendance < 75 ? 'text-red-500' : 'text-green-600'}`}>
                  {overallAttendance}%
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${overallAttendance < 75 ? 'bg-red-500' : 'bg-green-600'}`}
                  style={{ width: `${overallAttendance}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Summary */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium">Attendance Details</CardTitle>
              <CardDescription>Subject-wise attendance breakdown</CardDescription>
            </div>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {attendance.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {attendance.map((record, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="truncate max-w-[200px] font-medium" title={record.subject_name}>
                        {record.subject_name}
                      </span>
                      <span className={record.percentage < 75 ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>
                        {record.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${record.percentage < 75 ? 'bg-red-500' : 'bg-green-600'}`}
                        style={{ width: `${record.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{record.present}/{record.total} lectures</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[150px] text-muted-foreground">
                <BookOpen className="h-8 w-8 mb-2 opacity-20" />
                <p>No attendance data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CIE Marks Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">CIE Marks Overview</CardTitle>
            <CardDescription>Internal assessment scores fetched from Contineo</CardDescription>
          </div>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(cie_marks).map(([code, marks]) => {
              const subjectName = mapSubjectCodeToName(code);
              return (
                <div key={code} className="bg-secondary/30 rounded-lg p-4 border space-y-3 hover:bg-secondary/50 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]" title={subjectName}>
                      {subjectName}
                    </h4>
                    <Badge variant="outline" className="text-[10px] shrink-0">{code}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {marks["TH-ISE1"] !== undefined && (
                      <div className="flex justify-between bg-background/50 p-1.5 rounded">
                        <span className="text-muted-foreground">ISE 1</span>
                        <span className="font-mono font-medium">{marks["TH-ISE1"]}</span>
                      </div>
                    )}
                    {marks.MSE !== undefined && (
                      <div className="flex justify-between bg-background/50 p-1.5 rounded">
                        <span className="text-muted-foreground">MSE</span>
                        <span className="font-mono font-medium">{marks.MSE}</span>
                      </div>
                    )}
                    {marks["TH-ISE2"] !== undefined && (
                      <div className="flex justify-between bg-background/50 p-1.5 rounded">
                        <span className="text-muted-foreground">ISE 2</span>
                        <span className="font-mono font-medium">{marks["TH-ISE2"]}</span>
                      </div>
                    )}
                    {marks.ESE !== undefined && (
                      <div className="flex justify-between bg-background/50 p-1.5 rounded">
                        <span className="text-muted-foreground">ESE</span>
                        <span className="font-mono font-medium">{marks.ESE}</span>
                      </div>
                    )}
                    {(marks["PR-ISE1"] !== undefined || marks["PR-ISE2"] !== undefined) && (
                      <div className="flex justify-between bg-background/50 p-1.5 rounded col-span-2">
                        <span className="text-muted-foreground">Practical</span>
                        <span className="font-mono font-medium">
                          {(marks["PR-ISE1"] || 0) + (marks["PR-ISE2"] || 0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions / Info */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Ready to calculate your pointer?</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Your marks have been fetched successfully. Proceed to the calculator with your marks pre-filled.
          </p>
        </div>
        <Button onClick={onCalculate} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md whitespace-nowrap">
          <Calculator className="mr-2 h-4 w-4" />
          Go to Calculator
        </Button>
      </div>

    </div>
  );
}
