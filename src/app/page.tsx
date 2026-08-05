import { redirect } from "next/navigation";
import { categoryHref } from "@/lib/categories";

export default function Home() {
  redirect(categoryHref("침대프레임"));
}
