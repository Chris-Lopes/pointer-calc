"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubjectMarksForm } from "@/components/subject-marks-form";
import { useState } from "react";

type Branch = "Computer" | "AIDS" | "ECS" | "Mechanical";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<string>();
  const [selectedBranch, setSelectedBranch] = useState<Branch>();

  const years = [
    { id: "1", label: "First Year", disabled: true, note: "(coming soon)" },
    { id: "2", label: "Second Year" },
    { id: "3", label: "Third Year", disabled: true, note: "(coming soon)" },
  ];

  const branches: Branch[] = ["Computer", "AIDS", "ECS", "Mechanical"];

  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-6">
      <h1 className="text-3xl font-bold">Pointer Calculator</h1>

      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Year</label>
          <Select
            value={selectedYear}
            onValueChange={(value) => {
              setSelectedYear(value);
              setSelectedBranch(undefined); // Reset branch when year changes
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose your year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem
                    key={year.id}
                    value={year.id}
                    disabled={year.disabled}
                  >
                    {year.label} {year.note}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {selectedYear === "2" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Branch</label>
            <Select
              value={selectedBranch}
              onValueChange={(value) => setSelectedBranch(value as Branch)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose your branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedYear === "2" && selectedBranch && (
          <SubjectMarksForm branch={selectedBranch} />
        )}
      </Card>
    </main>
  );
}
