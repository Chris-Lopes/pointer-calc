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
      placeholder: true,
    },
    {
      name: "Engineering Physics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Engineering Graphics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Human Health Systems",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Digital Electronics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Essential Computing Skills for Engineers",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Measuring Instruments and Testing Tools",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Art of Communication",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "One Course from LCC",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Introduction to Emerging Technologies",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
  ],
  CSE: [
    {
      name: "Integral Calculus and Probability Theory",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Engineering Chemistry",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Programming Fundamentals",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Human Health Systems",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Digital Electronics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Essential Psychomotor Skills for Engineers",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Creative Coding in Python",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Indian Knowledge System",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "One Course from LCC",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Introduction to Emerging Technologies",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
  ],
  ECS: [
    {
      name: "Integral Calculus and Probability Theory",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Engineering Chemistry",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Programming Fundamentals",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Human Health Systems",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Digital Electronics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Essential Psychomotor Skills for Engineers",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Creative Coding in Python",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Indian Knowledge System",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "One Course from LCC",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Introduction to Emerging Technologies",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
  ],
  Mechanical: [
    {
      name: "Integral Calculus and Probability Theory",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Engineering Chemistry",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Programming Fundamentals",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Human Health Systems",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Basic Manufacturing Processes",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Essential Psychomotor Skills for Engineers",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Creative Coding in Python",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Indian Knowledge System",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "One Course from LCC",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Introduction to Emerging Technologies",
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

// Define ComponentMarks type for clarity and reuse
interface ComponentMarks {
  ise1?: number;
  mse?: number;
  ise2?: number;
  ese?: number;
  practical_ise?: number; // Updated field for single practical input
  total?: number; // Added for total input mode
}

export default function SubjectMarksForm({ branch }: SubjectMarksFormProps) {
  const subjects = SUBJECTS[branch];
  // Updated state to use ComponentMarks type and single practical_ise field
  const [componentMarks, setComponentMarks] = useState<Record<string, ComponentMarks>>({});
  const [result, setResult] = useState<number | null>(null);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [inputMode, setInputMode] = useState<'individual' | 'total'>('individual'); // 'individual' or 'total'

  // Updated calculateTotalMarks to use ComponentMarks type and sum practical_ise
  const calculateTotalMarks = (subject: any, components: ComponentMarks | undefined, inputMode: 'individual' | 'total') => {
    if (!components) return 0;

    if (inputMode === 'total' && components.total !== undefined) {
      return components.total;
    }

    let total = 0;
    if (components.ise1) total += components.ise1;
    if (components.mse) total += components.mse;
    if (components.ise2) total += components.ise2;
    if (components.ese) total += components.ese;
    if (components.practical_ise) total += components.practical_ise; // Sums the single practical_ise

    return total;
  };

  const handleCalculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const subject of subjects) {
      const components = componentMarks[subject.name] || {};
      const subjectMarks = calculateTotalMarks(subject, components, inputMode);
      const pointer = calculatePointer(subjectMarks, subject.maxMarks) || 0;
      totalPoints += pointer * subject.credits;
      totalCredits += subject.credits;
    }

    const finalResult =
      totalCredits > 0 ? (totalPoints / (totalCredits * 10)) * 10 : 0;
    setResult(Number(finalResult.toFixed(2)));
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Enter Your Marks</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Input Mode Selection */}
        <div className="flex items-center space-x-4">
          <Label htmlFor="input-mode">Input Mode:</Label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="individual-mode"
              value="individual"
              checked={inputMode === 'individual'}
              onChange={() => setInputMode('individual')}
              className="form-radio"
            />
            <Label htmlFor="individual-mode">Individual Components</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="total-mode"
              value="total"
              checked={inputMode === 'total'}
              onChange={() => setInputMode('total')}
              className="form-radio"
            />
            <Label htmlFor="total-mode">Total Marks</Label>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Display only the current subject */}
          {
            (() => {
              const subject = subjects[currentSubjectIndex];
              const index = currentSubjectIndex;
              return (
                <div key={subject.name} className="space-y-2">
                  <Label htmlFor={subject.name} className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-muted-foreground">
                      {(index + 1).toString().padStart(2, "0")}.
                    </span>
                    <span>{subject.name}</span>
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Individual Component Inputs: Render if inputMode is 'individual' */}
                    {inputMode === 'individual' && (
                      <>
                        {/* Theory components: Render if subject.placeholder is true */}
                        {subject.placeholder && (
                          <>
                            {/* Unchanged ISE1 Input */}
                            <Input
                              type="number"
                              id={`${subject.name}-ise1`}
                              placeholder="ISE 1 (20 marks)"
                              min={0}
                              max={20}
                              step={0.01}
                              className="max-w-full"
                              value={componentMarks[subject.name]?.ise1 || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComponentMarks((prev) => ({
                                  ...prev,
                                  [subject.name]: {
                                    ...prev[subject.name],
                                    ise1: value === "" ? undefined : Number(value),
                                  },
                                }));
                              }}
                            />
                            {/* Unchanged MSE Input */}
                            <Input
                              type="number"
                              id={`${subject.name}-mse`}
                              placeholder="MSE (30 marks)"
                              min={0}
                              max={30}
                              step={0.01}
                              className="max-w-full"
                              value={componentMarks[subject.name]?.mse || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComponentMarks((prev) => ({
                                  ...prev,
                                  [subject.name]: {
                                    ...prev[subject.name],
                                    mse: value === "" ? undefined : Number(value),
                                  },
                                }));
                              }}
                            />
                            {/* Unchanged ISE2 Input */}
                            <Input
                              type="number"
                              id={`${subject.name}-ise2`}
                              placeholder="ISE 2 (20 marks)"
                              min={0}
                              max={20}
                              step={0.01}
                              className="max-w-full"
                              value={componentMarks[subject.name]?.ise2 || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComponentMarks((prev) => ({
                                  ...prev,
                                  [subject.name]: {
                                    ...prev[subject.name],
                                    ise2: value === "" ? undefined : Number(value),
                                  },
                                }));
                              }}
                            />
                            {/* Unchanged ESE Input */}
                            <Input
                              type="number"
                              id={`${subject.name}-ese`}
                              placeholder="ESE (30 marks)"
                              min={0}
                              max={30}
                              step={0.01}
                              className="max-w-full"
                              value={componentMarks[subject.name]?.ese || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComponentMarks((prev) => ({
                                  ...prev,
                                  [subject.name]: {
                                    ...prev[subject.name],
                                    ese: value === "" ? undefined : Number(value),
                                  },
                                }));
                              }}
                            />
                          </>
                        )}
                        {/* MODIFIED SECTION FOR PRACTICAL INPUTS */}
                        {/* Old practical inputs (practical_ise1, practical_ise2) are removed. */}
                        {/* New Single Practical Input Logic: */}
                        {(!subject.placeholder || (subject.placeholder && subject.maxMarks === 150)) && (
                          <Input
                            type="number"
                            id={`${subject.name}-practical-ise`}
                            placeholder={
                              !subject.placeholder
                                ? `Practical ISE (${subject.maxMarks} marks)`
                                : "Practical ISE (50 marks)" // For theory+practical (150 total)
                            }
                            min={0}
                            max={
                              !subject.placeholder
                                ? subject.maxMarks
                                : 50 // For theory+practical (150 total)
                            }
                            step={0.01}
                            className={`max-w-full ${!subject.placeholder ? 'md:col-span-2' : ''}`}
                            value={componentMarks[subject.name]?.practical_ise || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              setComponentMarks((prev) => ({
                                ...prev,
                                [subject.name]: {
                                  ...prev[subject.name],
                                  practical_ise: value === "" ? undefined : Number(value),
                                },
                              }));
                            }}
                          />
                        )}
                      </>
                    )}
                    {/* New Total Marks Input Logic: */}
                    {inputMode === 'total' && (
                      <Input
                        type="number"
                        id={`${subject.name}-total`}
                        placeholder={`Total Marks (${subject.maxMarks} marks)`}
                        min={0}
                        max={subject.maxMarks}
                        step={0.01}
                        className="max-w-full md:col-span-2"
                        value={componentMarks[subject.name]?.total || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setComponentMarks((prev) => ({
                            ...prev,
                            [subject.name]: {
                              ...prev[subject.name],
                              total: value === "" ? undefined : Number(value),
                            },
                          }));
                        }}
                      />
                    )}
                  </div>

                  {/* Display calculated total */}
                  <div className="text-sm text-muted-foreground">
                    Total: {calculateTotalMarks(subject, componentMarks[subject.name] || {}, inputMode)} / {subject.maxMarks}
                  </div>
                </div>
              );
            })()
          }
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentSubjectIndex > 0 && (
            <Button onClick={() => setCurrentSubjectIndex(prev => prev - 1)}>
              Back
            </Button>
          )}
          {currentSubjectIndex < subjects.length - 1 && (
            <Button onClick={() => setCurrentSubjectIndex(prev => prev + 1)} className="ml-auto">
              Next
            </Button>
          )}
          {currentSubjectIndex === subjects.length - 1 && (
            <Button onClick={handleCalculate} className="w-full">
              Calculate Result
            </Button>
          )}
        </div>
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
