import { redirect } from "next/navigation";

export default function Home() {
  redirect("/store/category?sub=bed-frame");
}
