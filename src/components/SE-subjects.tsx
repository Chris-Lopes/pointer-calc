"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { MappedMarks } from "@/types/contineo";

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

interface ComponentMaxMarks {
  ise1?: number;
  mse?: number;
  ise2?: number;
  ese?: number;
}

interface Subject {
  name: string;
  credits: number;
  maxMarks: number;
  placeholder: boolean;
  componentMaxMarks?: ComponentMaxMarks;
}

const SUBJECTS_SEM3: Record<string, Subject[]> = {
  Computer: [
    {
      name: "Discrete Mathematics and Graph Theory",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      name: "Computer Organization and Architecture",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Data Structures",
      credits: 4,
      maxMarks: 200,
      placeholder: true,
      componentMaxMarks: {
        ise1: 20,
        mse: 50,
        ise2: 30,
        ese: 50,
      },
    },
    {
      name: "Object Oriented Programming with JAVA",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Law for Engineers / Financial Planning",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 50,
        ise2: 50,
      },
    },
    {
      name: "MDM Course-1",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      name: "MDM Course-2",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      name: "Modern Indian Languages",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 50,
        ise2: 50,
      },
    },
    {
      name: "Human Values and Professional Ethics",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 50,
        ise2: 50,
      },
    },
    {
      name: "Community Engagement Project",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 50,
        ise2: 50,
      },
    },

  ],
  AIDS: [
    {
      name: "Linear Algebra and Business Statistics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Analysis of Algorithms",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Database Management System",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Data Analytics and Visualization",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Emerging Technology and Law",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Open Elective-3",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      name: "Web Programming",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Modern Indian Language",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Technology Entrepreneurship",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Technology Innovation for Sustainable Development",
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
      name: "Indian Knowledge System",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Human Health Systems",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Creative Coding in Python",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
  ],
  ECS: [
    {
      name: "Mathematics and Numerical Methods",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Analog Electronics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Discrete Structures and Automata Theory",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Embedded Systems",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Emerging Technology and Law",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Operating Systems",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      name: "Data Structures",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Modern Indian Language",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Technology Entrepreneurship",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      name: "Technology Innovation for Sustainable Development",
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
      name: "Electromagnetic Theory",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Creative Coding in Python",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
  ],
  Mechanical: [
    {
      name: "Fundamentals of Thermodynamics",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Mechanics of Solids",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Materials Science and Engineering",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
    },
    {
      name: "Materials and Material Testing",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Emerging Technology and Law",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Open Elective-3",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
    },
    {
      name: "Computer Aided Machine Drawing",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Modern Indian Language",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Technology Entrepreneurship",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Technology Innovation for Sustainable Development",
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
      name: "Indian Knowledge System",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Human Health Systems",
      credits: 1,
      maxMarks: 50,
      placeholder: false,
    },
    {
      name: "Creative Coding in Python",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
  ],
  IT: [],
  EXTC: [],
};

const SUBJECTS_SEM4: Record<string, Subject[]> = {
  Computer: [
    {
      name: "Linear Algebra and Business Statistics",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 20,
        mse: 30,
        ise2: 20,
        ese: 30,
      },
    },
    {
      name: "Database Management Systems",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
      componentMaxMarks: {
        ise1: 20,
        mse: 30,
        ise2: 20,
        ese: 30,
      },
    },
    {
      name: "Analysis of Algorithm",
      credits: 4,
      maxMarks: 150,
      placeholder: true,
      componentMaxMarks: {
        ise1: 20,
        mse: 30,
        ise2: 20,
        ese: 30,
      },
    },
    {
      name: "Operating Systems",
      credits: 3,
      maxMarks: 150,
      placeholder: true,
      componentMaxMarks: {
        ise1: 20,
        mse: 30,
        ise2: 20,
        ese: 30,
      },
    },
    {
      name: "Emerging Technology and Law / Principles of Management",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 50,
        mse: 0,
        ise2: 0,
        ese: 50,
      },
    },
    {
      name: "MDM Course-3",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 20,
        mse: 30,
        ise2: 20,
        ese: 30,
      },
    },
    {
      name: "Full Stack Development",
      credits: 2,
      maxMarks: 100,
      placeholder: false,
    },
    {
      name: "Technology Entrepreneurship",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 50,
        mse: 0,
        ise2: 0,
        ese: 50,
      },
    },
    {
      name: "Technology Innovation for Sustainable Development",
      credits: 2,
      maxMarks: 100,
      placeholder: true,
      componentMaxMarks: {
        ise1: 40,
        mse: 0,
        ise2: 60,
        ese: 0,
      },
    },
    {
      name: "Double Minor Course",
      credits: 4,
      maxMarks: 150,
      placeholder: true,
      componentMaxMarks: {
        ise1: 20,
        mse: 30,
        ise2: 20,
        ese: 30,
      },
    },
  ],
  IT: [],
  EXTC: [],
};

type Branch = keyof typeof SUBJECTS_SEM3;

interface SubjectMarksFormProps {
  branch: Branch;
  semester: "Sem3" | "Sem4";
  fetchedMarks?: MappedMarks | null;
}

// Define ComponentMarks type for clarity and reuse
interface ComponentMarks {
  ise1?: number;
  mse?: number;
  ise2?: number;
  ese?: number;
  practical_ise?: number; // Updated field for single practical input
  total?: number; // For total input mode
}

export default function SubjectMarksForm({ branch, semester, fetchedMarks }: SubjectMarksFormProps) {
  const subjects = semester === "Sem3" ? SUBJECTS_SEM3[branch] : SUBJECTS_SEM4[branch];

  if (!subjects || subjects.length === 0) {
    return <div className="text-center p-4">Subjects for {branch} {semester} are not yet available.</div>;
  }
  // Updated state to use ComponentMarks type and single practical_ise field
  const [componentMarks, setComponentMarks] = useState<Record<string, ComponentMarks>>({});
  const [result, setResult] = useState<number | null>(null);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [inputMode, setInputMode] = useState<'individual' | 'total'>('individual'); // 'individual' or 'total'

  // Auto-populate marks when fetched from Contineo
  useEffect(() => {
    if (fetchedMarks) {
      setComponentMarks(fetchedMarks);
    }
  }, [fetchedMarks]);

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
                            {/* ISE1 Input */}
                            {(subject.componentMaxMarks?.ise1 ?? 20) > 0 && (
                              <Input
                                type="number"
                                id={`${subject.name}-ise1`}
                                placeholder={`ISE 1 (${subject.componentMaxMarks?.ise1 ?? 20} marks)`}
                                min={0}
                                max={subject.componentMaxMarks?.ise1 ?? 20}
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
                            )}
                            {/* MSE Input */}
                            {(subject.componentMaxMarks?.mse ?? 30) > 0 && (
                              <Input
                                type="number"
                                id={`${subject.name}-mse`}
                                placeholder={`MSE (${subject.componentMaxMarks?.mse ?? 30} marks)`}
                                min={0}
                                max={subject.componentMaxMarks?.mse ?? 30}
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
                            )}
                            {/* ISE2 Input */}
                            {(subject.componentMaxMarks?.ise2 ?? 20) > 0 && (
                              <Input
                                type="number"
                                id={`${subject.name}-ise2`}
                                placeholder={`ISE 2 (${subject.componentMaxMarks?.ise2 ?? 20} marks)`}
                                min={0}
                                max={subject.componentMaxMarks?.ise2 ?? 20}
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
                            )}
                            {/* ESE Input */}
                            {(subject.componentMaxMarks?.ese ?? 30) > 0 && (
                              <Input
                                type="number"
                                id={`${subject.name}-ese`}
                                placeholder={`ESE (${subject.componentMaxMarks?.ese ?? 30} marks)`}
                                min={0}
                                max={subject.componentMaxMarks?.ese ?? 30}
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
                            )}
                          </>
                        )}
                      </>
                    )}
                    {/* Total Marks Input */}
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
                    {/* MODIFIED SECTION FOR PRACTICAL INPUTS */}
                    {/* New Single Practical Input Logic: */}
                    {(!subject.placeholder || (subject.placeholder && (subject.maxMarks === 150 || subject.maxMarks === 200))) && (
                      <Input
                        type="number"
                        id={`${subject.name}-practical-ise`}
                        placeholder={
                          !subject.placeholder
                            ? `Practical ISE (${subject.maxMarks} marks)`
                            : "Practical ISE (50 marks)" // For theory+practical (150/200 total)
                        }
                        min={0}
                        max={
                          !subject.placeholder
                            ? subject.maxMarks
                            : 50 // For theory+practical (150/200 total)
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
