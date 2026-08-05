import { redirect } from "next/navigation";

export default function Home() {
  redirect(
    `/store/category?sub=${encodeURIComponent("침대프레임")}`
  );
}
