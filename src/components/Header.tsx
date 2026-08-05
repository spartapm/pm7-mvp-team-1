import Link from "next/link";

const GNB = [
  { label: "쇼핑홈", href: "/proto/home" },
  { label: "카테고리", href: "/store/category?sub=%EC%B9%A8%EB%8C%80%ED%94%84%EB%A0%88%EC%9E%84" },
  { label: "베스트", href: "/proto/best" },
  { label: "오늘의딜", href: "/proto/deal" },
  { label: "단독상품", href: "/proto/exclusive" },
  { label: "오마트", href: "/proto/omart" },
  { label: "원하는날도착", href: "/proto/delivery" },
  { label: "오!쇼룸", href: "/proto/showroom" },
  { label: "기획전", href: "/proto/exhibition" },
] as const;

export function Header({ activeNav = "카테고리" }: { activeNav?: string }) {
  return (
    <header className="border-b border-[var(--line)] bg-white">
      <div className="mx-auto flex max-w-[1256px] items-center gap-5 px-7 pb-2.5 pt-3.5">
        <Link
          href="/store/category"
          className="flex items-center gap-2 text-[19px] font-extrabold text-[var(--ink)]"
        >
          <span className="logo-mark" aria-hidden />
          오늘의집
        </Link>
        <nav className="flex gap-5 text-[15px] font-bold text-[var(--ink-soft)]">
          <Link href="/proto/community" className="hover:text-[var(--ink)]">
            집구경
          </Link>
          <Link href="/store/category" className="text-[var(--blue)]">
            쇼핑
          </Link>
          <Link href="/proto/interior" className="hover:text-[var(--ink)]">
            인테리어·생활
          </Link>
        </nav>
        <Link
          href="/proto/search"
          className="mx-1 flex max-w-[420px] flex-1 items-center gap-2 rounded-full bg-[var(--paper)] px-[18px] py-2 text-[13px] text-[var(--ink-faint)] hover:bg-[#eef0f3]"
        >
          <span aria-hidden>🔍</span>
          쇼핑 검색
        </Link>
        <div className="ml-auto flex items-center gap-3.5 text-[12.5px] text-[var(--ink-soft)]">
          <Link href="/proto/cart" className="hover:text-[var(--ink)]">
            장바구니
          </Link>
          <Link href="/proto/login" className="hover:text-[var(--ink)]">
            로그인
          </Link>
          <Link href="/proto/signup" className="hover:text-[var(--ink)]">
            회원가입
          </Link>
          <Link
            href="/proto/write"
            className="rounded-lg bg-[var(--blue)] px-4 py-2 text-[13.5px] font-extrabold text-white"
          >
            글쓰기 ▾
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1256px] items-center gap-[22px] border-t border-[var(--line)] px-7">
        {GNB.map((item) => {
          const on = item.label === activeNav;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`border-b-2 py-3 text-sm font-semibold ${
                on
                  ? "border-[var(--blue)] font-extrabold text-[var(--blue)]"
                  : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
