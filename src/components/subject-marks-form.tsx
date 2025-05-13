"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const SUBJECTS = {
  Computer: [
    "Linear Algebra and business statistics",
    "Database Management Systems",
    "Analysis of Algorithm",
    "Advanced JAVA Programming Lab",
    "Emerging Technology and Law",
    "Open Elective-3",
    "Full Stack Development Lab",
    "Modern Indian Language",
    "Technology Entrepreneurship",
    "Technology Innovation for Sustainable Development",
    "One Course from CC",
    "Indian Knowledge System",
    "Human Health Systems",
    "Creative Coding in Python",
  ],
  AIDS: [
    "Linear Algebra and Business Statistics",
    "Analysis of Algorithms",
    "Database Management System",
    "Data Analytics and Visualization",
    "Emerging Technology and Law",
    "Open Elective-3",
    "Web Programming",
    "Modern Indian Language",
    "Technology Entrepreneurship",
    "Technology Innovation for Sustainable Development",
    "One Course from CC",
    "Indian Knowledge System",
    "Human Health Systems",
    "Creative Coding in Python",
  ],
  ECS: [
    "Mathematics and Numerical Methods",
    "Analog Electronics",
    "Discrete Structures and Automata Theory",
    "Embedded Systems",
    "Emerging Technology and Law",
    "Operating Systems",
    "Data Structures",
    "Modern Indian Language",
    "Technology Entrepreneurship",
    "Technology Innovation for Sustainable Development",
    "One Course from CC",
    "Electromagnetic Theory",
    "Creative Coding in Python",
  ],
  Mechanical: [
    "Fundamentals of Thermodynamics",
    "Mechanics of Solids",
    "Materials Science and Engineering",
    "Materials and Material Testing",
    "Emerging Technology and Law",
    "Open Elective-3",
    "Computer Aided Machine Drawing",
    "Modern Indian Language",
    "Technology Entrepreneurship",
    "Technology Innovation for Sustainable Development",
    "One Course from CC",
    "Indian Knowledge System",
    "Human Health Systems",
    "Creative Coding in Python",
  ],
};

type Branch = keyof typeof SUBJECTS;

interface SubjectMarksFormProps {
  branch: Branch;
}

export function SubjectMarksForm({ branch }: SubjectMarksFormProps) {
  const subjects = SUBJECTS[branch];
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    // Placeholder for calculation formula
    // Will be implemented when formula is provided
    console.log("Marks:", marks);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Enter Your Marks</h3>
      <div className="grid gap-6">
        {subjects.map((subject, index) => (
          <div key={subject} className="space-y-2">
            <Label htmlFor={subject} className="flex items-center gap-2">
              <span className="font-semibold text-sm text-muted-foreground">
                {(index + 1).toString().padStart(2, "0")}.
              </span>
              <span>{subject}</span>
            </Label>
            <Input
              type="number"
              id={subject}
              placeholder="Enter marks"
              min={0}
              max={150}
              className="max-w-full"
              value={marks[subject] || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  const newMarks = { ...marks };
                  delete newMarks[subject];
                  setMarks(newMarks);
                } else {
                  setMarks((prev) => ({
                    ...prev,
                    [subject]: Number(value),
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

      {result !== null && (
        <div className="text-center">
          <p className="text-lg font-semibold">Result: {result}</p>
        </div>
      )}
    </div>
  );
}
