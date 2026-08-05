import Link from "next/link";
import { CATEGORIES, SIDEBAR_DISABLED, categoryHref } from "@/lib/categories";
import { DISABLED_CATEGORY_SLUG } from "@/lib/stubs";
import type { SubCategoryId } from "@/lib/types";

export function CategorySidebar({ activeSub }: { activeSub: SubCategoryId }) {
  return (
    <aside className="border-r border-[var(--line)] px-5 py-6">
      <h2 className="mb-4 text-lg font-bold">가구</h2>
      <ul className="space-y-0.5 text-sm text-[var(--ink-soft)]">
        <li>
          <Link
            href="/proto/only"
            className="block rounded-md px-1 py-2 font-extrabold text-[var(--ink)] hover:bg-[var(--paper)]"
          >
            오늘의집 Only
          </Link>
        </li>
        {CATEGORIES.map((major) => {
          const childActive = major.children.some((c) => c.id === activeSub);
          return (
            <li key={major.id} className="pt-1">
              <div
                className={`flex items-center justify-between rounded-md px-1 py-2 font-bold ${
                  childActive ? "text-[var(--blue)]" : "text-[var(--ink)]"
                }`}
              >
                <span>{major.label}</span>
                <span className="text-[11px] text-[var(--ink-faint)]">
                  {childActive ? "▴" : "▾"}
                </span>
              </div>
              <ul>
                {major.children.map((sub) => {
                  const on = sub.id === activeSub;
                  return (
                    <li key={sub.id}>
                      <Link
                        href={categoryHref(sub.id)}
                        className={`block rounded-md py-2 pl-4 text-[13.5px] hover:bg-[var(--paper)] ${
                          on
                            ? "font-extrabold text-[var(--blue)]"
                            : "text-[var(--ink-soft)]"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
        <li className="my-3.5 h-px bg-[var(--line)]" />
        {SIDEBAR_DISABLED.slice(1).map((label) => {
          const slug = DISABLED_CATEGORY_SLUG[label] ?? "home";
          return (
            <li key={label}>
              <Link
                href={`/proto/${slug}`}
                className="flex items-center justify-between rounded-md px-1 py-2 text-[var(--ink-faint)] hover:bg-[var(--paper)] hover:text-[var(--ink-soft)]"
              >
                {label}
                <span className="text-[11px]">▾</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
