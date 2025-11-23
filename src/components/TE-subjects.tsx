"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { fetchCieMarksAction, type CieData } from "@/actions/fetchMarks";

function calculatePointer(marks: number, maxMarks: number) {
  const ten = maxMarks * 0.85;
  const nine = maxMarks * 0.8;
  const eight = maxMarks * 0.7;
  const seven = maxMarks * 0.6;
  const six = maxMarks * 0.5;
  const five = maxMarks * 0.45;
  const four = maxMarks * 0.4;

  if (marks >= ten) return 10;
  if (marks >= nine) return 9;
  if (marks >= eight) return 8;
  if (marks >= seven) return 7;
  if (marks >= six) return 6;
  if (marks >= five) return 5;
  if (marks >= four) return 4;
  return 0;
}

const SUBJECTS = {
  Computer: [
    {
      courseCode: "25PCC13CE11",
      name: "Computer Network",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13CE12",
      name: "Theory of Computer Science and Compiler Construction",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13CE13",
      name: "Operating System with System Programming",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13CE14",
      name: "Data Warehousing and Mining",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PEC13CE1X",
      name: "Program Elective Course",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PECL13CE1X",
      name: "Program Elective Lab",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25MDM4X",
      name: "MDM",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25OE04X",
      name: "Open Elective-4",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
  ],
  AIDS: [
    {
      courseCode: "25PCC13CS11",
      name: "Operating System",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13CS12",
      name: "Computer Network",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13CS13",
      name: "Artificial Intelligence",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13CS14",
      name: "Machine Learning",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25PCC13CS15",
      name: "Theoretical Computer Science",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PEC1CSXX",
      name: "Program Elective Course",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25MDM03X",
      name: "MDM",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25OECS3X",
      name: "Open Elective-4",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
  ],
  ECS: [
    {
      courseCode: "25PCC13EC11",
      name: "Control Systems",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13EC12",
      name: "Computer Networks",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13EC13",
      name: "Artificial Intelligence",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13EC14",
      name: "Analysis of Algorithms",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25PCC13EC15",
      name: "Data Warehousing and Mining",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25PEC13ECXX",
      name: "Program Elective Course",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PECL13ECXX",
      name: "Program Elective Lab",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25MDM03/25MDM04",
      name: "MDM",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25OEEC41",
      name: "Cloud Computing",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
  ],
  Mechanical: [
    {
      courseCode: "25PCC13ME11",
      name: "Applied Thermodynamics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13ME12",
      name: "Theory of Machines",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13ME13",
      name: "Metrology and Quality Engineering",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC13ME14",
      name: "CAD/CAM and FEA",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25PCC13ME15",
      name: "FEA and CFD Lab",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25PEC13MEXX",
      name: "Program Elective Course",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PECL13MEXX",
      name: "Program Elective Lab",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25MDM0X",
      name: "MDM",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25OE03X",
      name: "Open Elective-4",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
  ],
};

type Branch = keyof typeof SUBJECTS;

interface SubjectMarksFormProps {
  branch: Branch;
}

// Helper function to match course codes (handling electives with X)
function matchesCourseCode(subjectCode: string, cieCode: string): boolean {
  // Check if it's an open elective (starts with 25OE)
  if (subjectCode.startsWith("25OE")) {
    return cieCode.startsWith("25OE");
  }

  // Check if subject code has X (other electives)
  if (subjectCode.includes("X")) {
    // Compare up to the second last character
    const subjectPrefix = subjectCode.slice(0, -1);
    const ciePrefix = cieCode.slice(0, -1);
    return subjectPrefix === ciePrefix;
  }

  return subjectCode === cieCode;
}

// Helper function to calculate total marks from CIE data
function calculateTotalFromCie(
  cieData: Record<string, number | string | null>
): number {
  let total = 0;
  Object.values(cieData).forEach((value) => {
    if (typeof value === "number") {
      total += value;
    } else if (typeof value === "string") {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        total += numValue;
      }
    }
  });
  return total;
}

export default function SubjectMarksForm({ branch }: SubjectMarksFormProps) {
  const subjects = SUBJECTS[branch];
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);

  // Automatic form states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const subject of subjects) {
      const subjectMarks = marks[subject.name] || 0;
      const pointer = calculatePointer(subjectMarks, subject.maxMarks) || 0;
      totalPoints += pointer * subject.credits;
      totalCredits += subject.credits;
    }

    const finalResult =
      totalCredits > 0 ? (totalPoints / (totalCredits * 10)) * 10 : 0;
    setResult(Number(finalResult.toFixed(2)));
  };

  const handleAutomaticSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const cieData = await fetchCieMarksAction({
        prn: String(formData.get("prn") ?? ""),
        dobDay: Number(formData.get("dobDay") ?? 0),
        dobMonth: Number(formData.get("dobMonth") ?? 0),
        dobYear: Number(formData.get("dobYear") ?? 0),
        userFullNameForCheck: String(formData.get("fullName") ?? ""),
      });

      if (!cieData) {
        setError("Failed to fetch marks. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Map CIE data to subjects
      const newMarks: Record<string, number> = {};

      subjects.forEach((subject) => {
        // Find matching course code in CIE data
        const matchingCode = Object.keys(cieData).find((cieCode) =>
          matchesCourseCode(subject.courseCode, cieCode)
        );

        if (matchingCode) {
          const total = calculateTotalFromCie(cieData[matchingCode]);
          newMarks[subject.name] = total;
        }
      });

      setMarks(newMarks);

      // Auto-calculate after fetching
      let totalPoints = 0;
      let totalCredits = 0;

      for (const subject of subjects) {
        const subjectMarks = newMarks[subject.name] || 0;
        const pointer = calculatePointer(subjectMarks, subject.maxMarks) || 0;
        totalPoints += pointer * subject.credits;
        totalCredits += subject.credits;
      }

      const finalResult =
        totalCredits > 0 ? (totalPoints / (totalCredits * 10)) * 10 : 0;
      setResult(Number(finalResult.toFixed(2)));
    } catch (err) {
      setError("An error occurred while fetching marks.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual</TabsTrigger>
          <TabsTrigger value="automatic">Automatic</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4 mt-4">
          <h3 className="font-semibold text-lg">Enter Your Marks</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6">
              {subjects.map((subject, index) => (
                <div key={subject.name} className="space-y-2">
                  <Label
                    htmlFor={subject.name}
                    className="flex items-center gap-2"
                  >
                    <span className="font-semibold text-sm text-muted-foreground">
                      {(index + 1).toString().padStart(2, "0")}.
                    </span>
                    <span>{subject.name}</span>
                  </Label>
                  <Input
                    type="number"
                    id={subject.name}
                    placeholder={
                      subject.placeholder
                        ? "Total (ISEs + MSE + ESE)"
                        : "Total (ISE1 + ISE2)"
                    }
                    min={0}
                    max={subject.maxMarks}
                    step={0.01}
                    className="max-w-full"
                    value={marks[subject.name] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        const newMarks = { ...marks };
                        delete newMarks[subject.name];
                        setMarks(newMarks);
                      } else {
                        setMarks((prev) => ({
                          ...prev,
                          [subject.name]: Number(value),
                        }));
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            <Button onClick={handleCalculate} className="w-full">
              Calculate Result
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="automatic" className="space-y-4 mt-4">
          <h3 className="font-semibold text-lg">Auto-Fetch Marks</h3>
          <form action={handleAutomaticSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prn">PRN Number</Label>
              <Input
                type="text"
                id="prn"
                name="prn"
                placeholder="Enter your PRN"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  name="dobDay"
                  placeholder="Day"
                  min={1}
                  max={31}
                  required
                  disabled={loading}
                />
                <Input
                  type="number"
                  name="dobMonth"
                  placeholder="Month"
                  min={1}
                  max={12}
                  required
                  disabled={loading}
                />
                <Input
                  type="number"
                  name="dobYear"
                  placeholder="Year"
                  min={1990}
                  max={2010}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Fetching..." : "Fetch & Calculate"}
            </Button>
          </form>

          {marks && Object.keys(marks).length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-sm">Fetched Marks:</h4>
              <div className="grid gap-2 max-h-60 overflow-y-auto">
                {subjects.map((subject) => (
                  <div
                    key={subject.name}
                    className="flex justify-between items-center text-sm p-2 bg-muted rounded"
                  >
                    <span>{subject.name}</span>
                    <span className="font-semibold">
                      {marks[subject.name]?.toFixed(2) || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {result !== null && (
        <div className="text-center mt-6">
          <p className="text-lg font-semibold">Result: {result}</p>
          <p className="text-sm text-muted-foreground mt-1">
            The actual result can be ± 0.2 pointer
          </p>
        </div>
      )}
    </div>
  );
}
