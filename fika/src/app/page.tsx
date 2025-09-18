import { createClient } from "../utils/supabase/client";

export default async function Home() {
  const supabase = createClient();
  let coffee_shops: any[] | null = null;
  let error: string | null = null;

  try {
    const { data, error: supabaseError } = await supabase
      .from("coffee_shops")
      .select();
    if (supabaseError) {
      throw supabaseError;
    }
    coffee_shops = data;
  } catch (e: any) {
    error = e.message;
    console.error(e);
  }

  if (error) {
    return <main className="p-8">Error: {error}</main>;
  }

  if (!coffee_shops) {
    return <main className="p-8">Loading...</main>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Coffee Shops</h1>
      <p>If you can see this list, the database connection is working:</p>
      <ul>
        {coffee_shops.map((shop) => (
          <li key={shop.id}>{shop.name}</li>
        ))}
      </ul>
    </main>
  );
}
