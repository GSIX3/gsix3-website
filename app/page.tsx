import HomePage from "@/components/home/HomePage";
import { homeMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata = homeMetadata();

export default function Home() {
  return <HomePage />;
}
