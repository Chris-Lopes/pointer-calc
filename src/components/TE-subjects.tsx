"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

export default function SubjectMarksForm({ branch }: SubjectMarksFormProps) {
  const subjects = SUBJECTS[branch];
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);

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
    // console.log("total:", totalPoints, totalCredits);
    // console.log("Marks:", marks);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Enter Your Marks</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-6">
          {subjects.map((subject, index) => (
            <div key={subject.name} className="space-y-2">
              <Label htmlFor={subject.name} className="flex items-center gap-2">
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
                max={150}
                step={0.01}
                required
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

      {result !== null && (
        <div className="text-center">
          <p className="text-lg font-semibold">Result: {result}</p>
          <p className="text-sm text-muted-foreground mt-1">
            The actual result can be ± 0.2 pointer
          </p>
        </div>
      )}
    </div>
  );
}
