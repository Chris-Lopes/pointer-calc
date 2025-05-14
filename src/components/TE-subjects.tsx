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
      name: "System Programming & Compiler Construction",
      credits: 3,
      maxMarks: 100,
    },
    { name: "Cryptography & System Security", credits: 3, maxMarks: 100 },
    { name: "Mobile Computing", credits: 3, maxMarks: 100 },
    { name: "Artificial Intelligence", credits: 3, maxMarks: 100 },
    { name: "Department Level Optional Course-2", credits: 3, maxMarks: 100 },
    {
      name: "System Programming & Compiler Construction Lab",
      credits: 1,
      maxMarks: 50,
    },
    { name: "Cryptography & System Security Lab", credits: 1, maxMarks: 25 },
    { name: "Mobile Computing Lab", credits: 1, maxMarks: 25 },
    { name: "Artificial Intelligence Lab", credits: 1, maxMarks: 50 },
    { name: "Skill-based Laboratory", credits: 2, maxMarks: 75 },
    { name: "Mini Project 2B", credits: 2, maxMarks: 50 },
  ],
  AIDS: [
    { name: "Data Analytics and Visualization", credits: 3, maxMarks: 100 },
    { name: "Cryptography & System Security", credits: 3, maxMarks: 100 },
    {
      name: "Software Engineering and Project Management",
      credits: 3,
      maxMarks: 100,
    },
    { name: "Machine Learning", credits: 3, maxMarks: 100 },
    { name: "Department Level Optional Course-2", credits: 3, maxMarks: 100 },
    { name: "Data Analytics and Visualization Lab", credits: 1, maxMarks: 50 },
    { name: "Cryptography & System Security Lab", credits: 1, maxMarks: 25 },
    {
      name: "Software Engineering and Project Management Lab",
      credits: 1,
      maxMarks: 25,
    },
    { name: "Machine Learning Lab", credits: 1, maxMarks: 50 },
    {
      name: "Skill base Lab Course: Cloud Computing",
      credits: 2,
      maxMarks: 75,
    },
    { name: "Mini Project: 2B", credits: 2, maxMarks: 50 },
  ],
  ECS: [
    { name: "Embedded Systems and RTOS", credits: 3, maxMarks: 100 },
    { name: "Artificial Intelligence", credits: 3, maxMarks: 100 },
    { name: "Computer Networks", credits: 3, maxMarks: 100 },
    { name: "Data Warehousing and Mining", credits: 3, maxMarks: 100 },
    { name: "Department Level Optional Course-II", credits: 3, maxMarks: 100 },
    { name: "Embedded Systems Lab", credits: 1, maxMarks: 50 },
    {
      name: "Artificial Intelligence and Computer Networks Lab",
      credits: 1,
      maxMarks: 50,
    },
    { name: "Data Warehousing and Mining Lab", credits: 1, maxMarks: 50 },
    { name: "Skill-based Laboratory", credits: 2, maxMarks: 50 },
    { name: "Mini Project 2B", credits: 2, maxMarks: 50 },
  ],
  Mechanical: [
    { name: "Machine Design", credits: 4, maxMarks: 100 },
    { name: "Turbo Machinery", credits: 3, maxMarks: 100 },
    {
      name: "Heating, Ventilation, Air conditioning and Refrigeration",
      credits: 3,
      maxMarks: 100,
    },
    {
      name: "Automation and Artificial Intelligence",
      credits: 3,
      maxMarks: 100,
    },
    { name: "Department Level Optional Course – 2", credits: 3, maxMarks: 100 },
    { name: "Machine Design Lab", credits: 1, maxMarks: 50 },
    { name: "Turbo Machinery Lab", credits: 1, maxMarks: 25 },
    {
      name: "Heating, Ventilation, Air conditioning and Refrigeration Lab",
      credits: 1,
      maxMarks: 50,
    },
    { name: "Measurements and Automation Lab", credits: 2, maxMarks: 50 },
    { name: "Mini Project – 2 B", credits: 2, maxMarks: 50 },
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
                placeholder="Total (ISEs + PR_ISEs + MSE + ESE)"
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
