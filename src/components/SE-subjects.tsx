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
      courseCode: "25BSC12CE05",
      name: "Discrete Mathematics and Graph Theory",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25PCC12CE05",
      name: "Computer Organization and Architecture",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC12CE06",
      name: "Data Structures",
      credits: 4,
      maxMarks: 200,
      placeholder: true,
    },
    {
      courseCode: "25PCC12CE07",
      name: "Object Oriented Programming with JAVA",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25OE13CE1X",
      name: "Open Elective",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25MDMXX1",
      name: "MDM Course-1",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25MDMXX2",
      name: "MDM Course-2",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25AEC12CE02X",
      name: "Modern Indian Languages",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25VEC12CE01",
      name: "Human Values and Professional Ethics",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25CEP12CE01",
      name: "Community Engagement Project",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
  ],
  CSE: [
    {
      courseCode: "25BSC12CS05",
      name: "Discrete Maths and Statistics",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25PCC12CS05",
      name: "Analysis of Algorithms",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC12CS06",
      name: "Data Structure",
      credits: 4,
      maxMarks: 200,
      placeholder: true,
    },
    {
      courseCode: "25PCC12CS07",
      name: "Object Oriented Programming with JAVA",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25OE01",
      name: "Open Elective",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25MDMXX1",
      name: "MDM Course-1",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25MDMXX2",
      name: "MDM Course-2",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25AEC12CS02X",
      name: "Modern Indian Language",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25VEC12CS01",
      name: "Human Values and Professional Ethics",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25CEP12CS01",
      name: "Community Engagement Project",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
  ],
  ECS: [
    {
      courseCode: "25PCC12EC05",
      name: "Electronic Devices",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC12EC06",
      name: "Computer Organization and Architecture",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC12EC07",
      name: "Database Management System",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC12EC08",
      name: "Object Oriented Programming with JAVA",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25OE1X",
      name: "Open Elective",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25MDMXX1",
      name: "MDM Course-1",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25MDMXX2",
      name: "MDM Course-2",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25EEM12EC1X",
      name: "Modern Indian Language",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25VEC12EC01",
      name: "Human Values and Professional Ethics",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25CEP12EC01",
      name: "Community Engagement Project",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
  ],
  Mechanical: [
    {
      courseCode: "25BSC12ME05",
      name: "Statistical Techniques and Partial Differential Equations",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      courseCode: "25PCC12ME05",
      name: "Advanced Manufacturing Processes",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25PCC12ME06",
      name: "Engineering Mechanics",
      credits: 4,
      maxMarks: 200,
      placeholder: true,
    },
    {
      courseCode: "25PCC12ME07",
      name: "Machine Shop Practice",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      courseCode: "25OE1X",
      name: "Open Elective",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      courseCode: "25MDMXX1",
      name: "MDM Course-1",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25MDMXX2",
      name: "MDM Course-2",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25AEC12ME02X",
      name: "Modern Indian Language",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25VEC12ME01",
      name: "Human Values and Professional Ethics",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      courseCode: "25CEP12ME01",
      name: "Community Engagement Project",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
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

  // Check if it's MDM course (starts with 25MDM)
  if (subjectCode.startsWith("25MDM")) {
    return cieCode.startsWith("25MDM");
  }

  // Check if it's AEC course (starts with 25AEC)
  if (subjectCode.startsWith("25AEC")) {
    return cieCode.startsWith("25AEC");
  }

  // Check if it's EEM course (starts with 25EEM)
  if (subjectCode.startsWith("25EEM")) {
    return cieCode.startsWith("25EEM");
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
                        ? "Total (ISEs + PR_ISEs + MSE + ESE)"
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
