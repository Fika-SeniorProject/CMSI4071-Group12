import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CafeQuickView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cafe Name</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
        <p>A short description of the cafe.</p>
      </CardContent>
    </Card>
  );
}
