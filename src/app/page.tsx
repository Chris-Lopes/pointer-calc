"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SESubjects from "@/components/SE-subjects";
import TESubjects from "@/components/TE-subjects";
import FESubjects from "@/components/FE-subjects";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import { mapCIEMarksToCalculatorFormat, SUBJECT_CODE_TO_NAME_MAP } from "@/lib/utils/mark-mapper";
import type { MappedMarks, FetchDataResponse } from "@/types/contineo";

type Year = "First Year" | "Second Year" | "Third Year" | "Fourth Year";
type FeBranch = "Computer" | "CSE" | "ECS" | "Mechanical";
type SeTeBranch = "Computer" | "IT" | "AIDS" | "EXTC";
type Semester = "Sem3" | "Sem4" | "Sem5" | "Sem6";
type ViewState = "LANDING" | "DASHBOARD" | "CALCULATOR";

export default function PointerCalculator() {
  // View State
  const [view, setView] = useState<ViewState>("LANDING");
  const [studentData, setStudentData] = useState<FetchDataResponse | null>(null);
  const [fetchedMarks, setFetchedMarks] = useState<MappedMarks | null>(null);

  // Calculator State
  const [year, setYear] = useState<Year | "">("");
  const [branch, setBranch] = useState<string>("");
  const [semester, setSemester] = useState<Semester | "">("");

  // Reset branch and semester when year changes
  useEffect(() => {
    setBranch("");
    setSemester("");
  }, [year]);

  // Handlers
  const handleLogin = (data: FetchDataResponse) => {
    setStudentData(data);

    // Map marks immediately
    const mapped = mapCIEMarksToCalculatorFormat(data.cie_marks, SUBJECT_CODE_TO_NAME_MAP);
    setFetchedMarks(mapped);

    setView("DASHBOARD");
  };

  const handleGuest = () => {
    setStudentData(null);
    setFetchedMarks(null);
    setView("CALCULATOR");
  };

  const handleLogout = () => {
    setStudentData(null);
    setFetchedMarks(null);
    setView("LANDING");
    // Reset calculator state
    setYear("");
    setBranch("");
    setSemester("");
  };

  const handleBackToDashboard = () => {
    if (studentData) {
      setView("DASHBOARD");
    } else {
      setView("LANDING");
    }
  };

  // Render Views
  if (view === "LANDING") {
    return <LandingPage onLogin={handleLogin} onGuest={handleGuest} />;
  }

  if (view === "DASHBOARD" && studentData) {
    return (
      <Dashboard
        studentData={studentData}
        onCalculate={() => setView("CALCULATOR")}
        onLogout={handleLogout}
      />
    );
  }

  // Calculator View
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBackToDashboard}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-center flex-1 mr-9">Pointer Calculator</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Year</Label>
              <Select value={year} onValueChange={(val) => setYear(val as Year)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Year">First Year</SelectItem>
                  <SelectItem value="Second Year">Second Year</SelectItem>
                  <SelectItem value="Third Year">Third Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {year === "First Year" && (
              <div className="space-y-2">
                <Label>Select Branch</Label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer">Computer</SelectItem>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="ECS">ECS</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {year && year !== "First Year" && (
              <div className="space-y-2">
                <Label>Select Branch</Label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer">Computer</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="AIDS">AIDS</SelectItem>
                    <SelectItem value="EXTC">EXTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {year === "Second Year" && branch === "Computer" && (
              <div className="space-y-2">
                <Label>Select Semester</Label>
                <Select value={semester} onValueChange={(val) => setSemester(val as Semester)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sem3">Semester 3</SelectItem>
                    <SelectItem value="Sem4">Semester 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {year === "Third Year" && branch === "Computer" && (
              <div className="space-y-2">
                <Label>Select Semester</Label>
                <Select value={semester} onValueChange={(val) => setSemester(val as Semester)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sem5">Semester 5</SelectItem>
                    <SelectItem value="Sem6">Semester 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Render Subject Forms */}
        {year === "First Year" && branch && (
          <FESubjects branch={branch as FeBranch} />
        )}

        {year === "Second Year" && branch === "Computer" && semester && (
          <SESubjects
            branch={branch as SeTeBranch}
            semester={semester as "Sem3" | "Sem4"}
            fetchedMarks={fetchedMarks || undefined}
          />
        )}

        {year === "Third Year" && branch === "Computer" && semester && (
          <TESubjects
            branch={branch as SeTeBranch}
            semester={semester as "Sem5" | "Sem6"}
            fetchedMarks={fetchedMarks || undefined}
          />
        )}
      </div>
    </div>
  );
}
