import { fetchCieMarksAction } from "@/actions/fetchMarks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Page() {
  async function action(formData: FormData) {
    "use server";
    const cie = await fetchCieMarksAction({
      prn: String(formData.get("prn") ?? ""),
      dobDay: Number(formData.get("dobDay") ?? 0),
      dobMonth: Number(formData.get("dobMonth") ?? 0),
      dobYear: Number(formData.get("dobYear") ?? 0),
      userFullNameForCheck: String(formData.get("fullName") ?? ""),
    });

    console.log("CIE Marks:", JSON.stringify(cie, null, 2));
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-black">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test CIE Marks Fetch</CardTitle>
          <CardDescription>
            Enter your credentials to test fetching CIE marks from the portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prn">PRN</Label>
              <Input
                id="prn"
                name="prn"
                type="text"
                placeholder="Enter your PRN"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name (Optional)</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Optional - for verification only"
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="dobDay" className="text-xs">
                    Day
                  </Label>
                  <Input
                    id="dobDay"
                    name="dobDay"
                    type="number"
                    min="1"
                    max="31"
                    placeholder="DD"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dobMonth" className="text-xs">
                    Month
                  </Label>
                  <Input
                    id="dobMonth"
                    name="dobMonth"
                    type="number"
                    min="1"
                    max="12"
                    placeholder="MM"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dobYear" className="text-xs">
                    Year
                  </Label>
                  <Input
                    id="dobYear"
                    name="dobYear"
                    type="number"
                    min="1900"
                    max="2020"
                    placeholder="YYYY"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Fetch CIE Marks
            </Button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            <p className="text-blue-900 font-medium mb-1">Note:</p>
            <p className="text-blue-800">
              Check the browser console or server logs to see the fetched CIE
              marks data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
