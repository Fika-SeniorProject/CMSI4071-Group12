import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User, Bookmark, History } from "lucide-react"; // Added History icon
import { getSavedCafes, getVisitedCafes } from "@/app/actions"; // Import server actions
import { UserSavedCafe, UserVisit } from "@/lib/types"; // Import new types
import { SaveButton } from "@/components/save-button";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const savedCafes = await getSavedCafes();
  const visitedCafes = await getVisitedCafes();

  const name = profile?.username || user.email;

  const joinedDate = new Date(user.created_at);
  const joinedFullDate = joinedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen flex flex-col items-center pt-12 relative">
      <div className="flex-1 w-full flex flex-col gap-10 max-w-4xl p-5">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-kate">
            {name}&apos;s Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600 font-kate">
            Welcome to your personal fika space.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-kate">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>This information is private.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Email:</span>
                <span className="text-gray-700">{user.email}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Account Created:</span>
                <span className="text-gray-700">{joinedFullDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-kate">
                <Bookmark className="h-5 w-5" />
                Your Saved Cafes
              </CardTitle>
              <CardDescription>
                Cafes you&apos;ve marked as favorites for later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedCafes && savedCafes.length > 0 ? (
                <div className="space-y-4">
                  {savedCafes.map((savedCafe: UserSavedCafe) => {
                    const cafeName =
                      savedCafe.coffee_shops?.name || "Unknown Cafe";

                    return (
                      <div
                        key={savedCafe.coffee_shop_id}
                        className="flex justify-between items-center border-b pb-2 last:border-b-0"
                      >
                        <div className="flex flex-col">
                          <Link
                            href={`/cafe/${savedCafe.coffee_shop_id}`}
                            className="font-semibold text-primary hover:underline"
                          >
                            {cafeName}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            Saved on{" "}
                            {new Date(
                              savedCafe.saved_at || ""
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <SaveButton
                          shopId={savedCafe.coffee_shop_id}
                          isInitiallySaved={true}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    You haven&apos;t saved any cafes yet!
                  </p>
                  <Button asChild>
                    <Link href="/discover">Find Cafes to Save</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-kate">
                <History className="h-5 w-5" /> {/* Changed icon to History */}
                Your Visited Cafes
              </CardTitle>
              <CardDescription>
                A history of cafes you&apos;ve visited.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {visitedCafes && visitedCafes.length > 0 ? (
                <div className="space-y-4">
                  {visitedCafes.map((visitedCafe: UserVisit) => {
                    const cafeName =
                      visitedCafe.coffee_shops?.name || "Unknown Cafe";

                    return (
                      <div
                        key={visitedCafe.id} // Use the visit ID as key
                        className="flex justify-between items-center border-b pb-2 last:border-b-0"
                      >
                        <div className="flex flex-col">
                          <Link
                            href={`/cafe/${visitedCafe.coffee_shop_id}`}
                            className="font-semibold text-primary hover:underline"
                          >
                            {cafeName}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            Visited on{" "}
                            {new Date(
                              visitedCafe.visited_at || ""
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    You haven&apos;t logged any visits yet!
                  </p>
                  <Button asChild>
                    <Link href="/discover">Log a Visit</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}
