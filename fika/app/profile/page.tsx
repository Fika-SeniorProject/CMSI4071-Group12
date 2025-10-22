"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, User, Bookmark } from "lucide-react";
import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";
import { useState, useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { SaveButton } from "@/components/save-button";

type UserRating = Database["public"]["Tables"]["ratings"]["Row"] & {
  coffee_shops: { name: string | null } | null;
};

type SavedCafe = Database["public"]["Tables"]["ratings"]["Row"] & {
  coffee_shops: { name: string | null } | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<{ username: string } | null>(null);
  const [userRatings, setUserRatings] = useState<UserRating[] | null>(null);
  const [savedCafes, setSavedCafes] = useState<SavedCafe[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const fetchData = async (user: SupabaseUser) => {
      setUser(user);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

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
        .not("drinks_quality", "is", null)
        .order("created_at", { ascending: false })) as {
        data: UserRating[] | null;
        error: PostgrestError | null;
      };

      const { data: savedCafes, error: savedCafesError } = (await supabase
        .from("ratings")
        .select(
          `
          shop_id,
          created_at,
          coffee_shops (
            name
          )
        `
        )
        .eq("user_id", user.id)
        .is("drinks_quality", null)
        .order("created_at", { ascending: false })) as {
        data: SavedCafe[] | null;
        error: PostgrestError | null;
      };

      if (profileError || ratingsError || savedCafesError) {
        console.error(
          "Error fetching data:",
          profileError || ratingsError || savedCafesError
        );
      }

      setProfile(profile);
      setUserRatings(userRatings);
      setSavedCafes(savedCafes);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session?.user) {
          router.push("/auth/login");
        } else {
          fetchData(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleUnsave = (shopId: number) => {
    if (savedCafes) {
      setSavedCafes(savedCafes.filter((cafe) => cafe.shop_id !== shopId));
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center pt-12 relative">
        <div className="flex-1 w-full flex flex-col gap-10 max-w-4xl p-5">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-kate">
              Loading...
            </h1>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

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
                  {savedCafes.map((cafe) => {
                    const cafeName = cafe.coffee_shops?.name || "Unknown Cafe";

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
                            {new Date(
                              cafe.created_at || ""
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <SaveButton
                          shopId={cafe.shop_id}
                          isInitiallySaved={true}
                          userId={user.id}
                          onUnsave={handleUnsave}
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
              <CardTitle className="font-kate">Your Logged Cafes</CardTitle>
              <CardDescription>
                Cafes you have reviewed or rated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userRatings && userRatings.length > 0 ? (
                <div className="space-y-4">
                  {userRatings.map((rating) => {
                    const cafeName =
                      rating.coffee_shops?.name || "Unknown Cafe";

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
