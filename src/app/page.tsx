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
import SeForm from "@/components/SE-subjects";
import FeForm from "@/components/FE-subjects";
import TeForm from "@/components/TE-subjects";
import { Github } from "lucide-react";
import { useState } from "react";

type Branch = "Computer" | "AIDS" | "ECS" | "Mechanical";
type FeBranch = "Computer" | "CSE" | "ECS" | "Mechanical";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<string>();
  const [selectedBranch, setSelectedBranch] = useState<Branch | FeBranch>();
  const [selectedSemester, setSelectedSemester] = useState<"Sem3" | "Sem4" | "Sem5" | "Sem6">();

  const years = [
    { id: "1", label: "First Year" },
    { id: "2", label: "Second Year" },
    { id: "3", label: "Third Year" },
  ];
  const branches: Branch[] = ["Computer", "AIDS", "ECS", "Mechanical"];
  const FE_branches: FeBranch[] = ["Computer", "CSE", "ECS", "Mechanical"];

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <main className="flex flex-col items-center p-8 gap-6">
        <h1 className="text-3xl font-bold">Pointer Calculator</h1>

        <Card className="w-full max-w-md p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Year</label>
            <Select
              value={selectedYear}
              onValueChange={(value) => {
                setSelectedYear(value);
                setSelectedBranch(undefined);
                setSelectedSemester(undefined);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose your year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {years.map((year) => (
                    <SelectItem key={year.id} value={year.id}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* second year */}
          {selectedYear === "2" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Branch</label>
              <Select
                value={selectedBranch}
                onValueChange={(value) => {
                  setSelectedBranch(value as Branch);
                  setSelectedSemester(undefined);
                }}
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Semester</label>
              <Select
                value={selectedSemester}
                onValueChange={(value) => setSelectedSemester(value as "Sem3" | "Sem4" | "Sem5" | "Sem6")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Sem3">Semester 3</SelectItem>
                    <SelectItem value="Sem4">Semester 4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedYear === "2" && selectedBranch && selectedSemester && (selectedSemester === "Sem3" || selectedSemester === "Sem4") && (
            <SeForm branch={selectedBranch as Branch} semester={selectedSemester} />
          )}

          {/* first year */}
          {selectedYear === "1" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Branch</label>
              <Select
                value={selectedBranch}
                onValueChange={(value) => setSelectedBranch(value as FeBranch)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FE_branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedYear === "1" && selectedBranch && (
            <FeForm branch={selectedBranch as FeBranch} />
          )}

          {/* third year */}
          {selectedYear === "3" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Branch</label>
              <Select
                value={selectedBranch}
                onValueChange={(value) => {
                  setSelectedBranch(value as Branch);
                  setSelectedSemester(undefined);
                }}
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

          {selectedYear === "3" && selectedBranch && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Semester</label>
              <Select
                value={selectedSemester}
                onValueChange={(value) => setSelectedSemester(value as "Sem3" | "Sem4" | "Sem5" | "Sem6")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Sem5">Semester 5</SelectItem>
                    <SelectItem value="Sem6">Semester 6</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedYear === "3" && selectedBranch && selectedSemester && (selectedSemester === "Sem5" || selectedSemester === "Sem6") && (
            <TeForm branch={selectedBranch as Branch} semester={selectedSemester} />
          )}
        </Card>
      </main>
      <div className="flex justify-center items-center text-center py-4 border-t border-t-slate-200 dark:border-t-slate-700">
        Made with 🤍 by Chris Lopes |{" "}
        <a
          href="https://github.com/Chris-Lopes/pointer-calc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
      </div>
    </div>
  );
}
