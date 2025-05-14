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
      name: "Integral Calculus and Probability Theory",
      credits: 3,
      maxMarks: 150,
    },
    { name: "Engineering Physics", credits: 3, maxMarks: 150 },
    { name: "Engineering Graphics", credits: 3, maxMarks: 150 },
    { name: "Human Health Systems", credits: 1, maxMarks: 50 },
    { name: "Digital Electronics", credits: 3, maxMarks: 150 },
    {
      name: "Essential Computing Skills for Engineers",
      credits: 2,
      maxMarks: 100,
    },
    {
      name: "Measuring Instruments and Testing Tools",
      credits: 2,
      maxMarks: 100,
    },
    { name: "Art of Communication", credits: 2, maxMarks: 100 },
    { name: "One Course from LCC", credits: 1, maxMarks: 50 },
    {
      name: "Introduction to Emerging Technologies",
      credits: 2,
      maxMarks: 100,
    },
  ],
  CSE: [
    {
      name: "Integral Calculus and Probability Theory",
      credits: 3,
      maxMarks: 150,
    },
    { name: "Engineering Chemistry", credits: 3, maxMarks: 150 },
    { name: "Programming Fundamentals", credits: 3, maxMarks: 150 },
    { name: "Human Health Systems", credits: 1, maxMarks: 50 },
    { name: "Digital Electronics", credits: 3, maxMarks: 150 },
    {
      name: "Essential Psychomotor Skills for Engineers",
      credits: 2,
      maxMarks: 100,
    },
    { name: "Creative Coding in Python", credits: 2, maxMarks: 100 },
    { name: "Indian Knowledge System", credits: 2, maxMarks: 100 },
    { name: "One Course from LCC", credits: 1, maxMarks: 50 },
    {
      name: "Introduction to Emerging Technologies",
      credits: 2,
      maxMarks: 100,
    },
  ],
  ECS: [
    {
      name: "Integral Calculus and Probability Theory",
      credits: 3,
      maxMarks: 150,
    },
    { name: "Engineering Chemistry", credits: 3, maxMarks: 150 },
    { name: "Programming Fundamentals", credits: 3, maxMarks: 150 },
    { name: "Human Health Systems", credits: 1, maxMarks: 50 },
    { name: "Digital Electronics", credits: 3, maxMarks: 150 },
    {
      name: "Essential Psychomotor Skills for Engineers",
      credits: 2,
      maxMarks: 100,
    },
    { name: "Creative Coding in Python", credits: 2, maxMarks: 100 },
    { name: "Indian Knowledge System", credits: 2, maxMarks: 100 },
    { name: "One Course from LCC", credits: 1, maxMarks: 50 },
    {
      name: "Introduction to Emerging Technologies",
      credits: 2,
      maxMarks: 100,
    },
  ],
  Mechanical: [
    {
      name: "Integral Calculus and Probability Theory",
      credits: 3,
      maxMarks: 150,
    },
    { name: "Engineering Chemistry", credits: 3, maxMarks: 150 },
    { name: "Programming Fundamentals", credits: 3, maxMarks: 150 },
    { name: "Human Health Systems", credits: 1, maxMarks: 50 },
    { name: "Basic Manufacturing Processes", credits: 3, maxMarks: 150 },
    {
      name: "Essential Psychomotor Skills for Engineers",
      credits: 2,
      maxMarks: 100,
    },
    { name: "Creative Coding in Python", credits: 2, maxMarks: 100 },
    { name: "Indian Knowledge System", credits: 2, maxMarks: 100 },
    { name: "One Course from LCC", credits: 1, maxMarks: 50 },
    {
      name: "Introduction to Emerging Technologies",
      credits: 2,
      maxMarks: 100,
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
