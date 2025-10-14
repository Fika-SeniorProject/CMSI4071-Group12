import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, User, Bookmark } from "lucide-react"; // Imported Bookmark for Saved Cafes
import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";

// Corrected UserRating type to account for nested array in Supabase joins
type UserRating = Database["public"]["Tables"]["ratings"]["Row"] & {
  coffee_shops: { name: string | null }[] | null;
};

// MOCKED TYPE for demonstrating the front-end implementation of saved cafes
type SavedCafe = {
  shop_id: number;
  coffee_shops: { name: string | null }[] | null;
  saved_at: string;
};

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. Check for authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect unauthenticated users to login
    return redirect("/auth/login");
  }

  // 2. Fetch user profile data (username)
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  // 3. Fetch user's reviews/ratings (Logged Cafes)
  const { data: userRatings, error: ratingsError } = (await supabase
    .from("ratings")
    .select(
      `
      drinks_quality,
      created_at,
      shop_id,
      coffee_shops (
        name
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })) as {
    data: UserRating[] | null;
    error: PostgrestError | null;
  };

  // 4. MOCK: Fetch user's saved cafes (Favorites) - Requires a 'user_favorites' table
  const { data: savedCafes } = {
    data: [
      // REPLACE WITH DATA
    ] as SavedCafe[],
  };

  if (profileError || ratingsError) {
    console.error("Error fetching data:", profileError || ratingsError);
  }

  const username = profile?.username || "Guest";

  // New logic to format user join date
  const joinedDate = new Date(user.created_at);
  const joinedFullDate = joinedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50/50 pt-12 relative">
      <div className="flex-1 w-full flex flex-col gap-10 max-w-4xl p-5">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-kate">
            {username}&apos;s Profile
          </h1>
          {/* Apply font-kate to the descriptive text */}
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

          {/* NEW SAVED CAFES SECTION */}
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
                  {savedCafes.map((cafe) => {
                    const cafeName =
                      cafe.coffee_shops?.[0]?.name || "Unknown Cafe";

                    return (
                      <div
                        key={cafe.shop_id}
                        className="flex justify-between items-center border-b pb-2 last:border-b-0"
                      >
                        <div className="flex flex-col">
                          <Link
                            href={`/cafe/${cafe.shop_id}`}
                            className="font-semibold text-primary hover:underline"
                          >
                            {cafeName}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            Saved on{" "}
                            {new Date(cafe.saved_at).toLocaleDateString()}
                          </span>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/cafe/${cafe.shop_id}`}>View</Link>
                        </Button>
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
          {/* END NEW SAVED CAFES SECTION */}

          {/* Existing Logged Cafes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-kate">Your Logged Cafes</CardTitle>
              <CardDescription>
                Cafes you have reviewed or rated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userRatings && userRatings.length > 0 ? (
                <div className="space-y-4">
                  {userRatings.map((rating) => {
                    // Safely access the name from the expected array result
                    const cafeName =
                      rating.coffee_shops?.[0]?.name || "Unknown Cafe";

                    return (
                      <div
                        key={rating.shop_id}
                        className="flex justify-between items-center border-b pb-2 last:border-b-0"
                      >
                        <div className="flex flex-col">
                          <Link
                            href={`/cafe/${rating.shop_id}`}
                            className="font-semibold text-primary hover:underline"
                          >
                            {cafeName}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            Reviewed on{" "}
                            {new Date(
                              rating.created_at || ""
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <Coffee className="h-4 w-4" />
                          <span>{rating.drinks_quality}/5</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    You haven&apos;t logged any cafes yet!
                  </p>
                  <Button asChild>
                    <Link href="/discover">Find Cafes</Link>
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
