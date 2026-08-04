import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[var(--line)] bg-white">
      <div className="mx-auto flex max-w-[1256px] items-center gap-5 px-7 pb-2.5 pt-3.5">
        <Link href="/store/category" className="flex items-center gap-2 text-[19px] font-extrabold text-[var(--ink)]">
          <span className="logo-mark" aria-hidden />
          오늘의집
        </Link>
        <nav className="flex gap-5 text-[15px] font-bold text-[var(--ink-soft)]">
          <span>집구경</span>
          <span className="text-[var(--blue)]">쇼핑</span>
          <span>인테리어·생활</span>
        </nav>
        <div className="mx-1 flex max-w-[420px] flex-1 items-center gap-2 rounded-full bg-[var(--paper)] px-[18px] py-2 text-[13px] text-[var(--ink-faint)]">
          <span aria-hidden>🔍</span>
          쇼핑 검색
        </div>
        <div className="ml-auto flex items-center gap-3.5 text-[12.5px] text-[var(--ink-soft)]">
          <span>장바구니</span>
          <span>로그인</span>
          <span>회원가입</span>
          <button type="button" className="rounded-lg bg-[var(--blue)] px-4 py-2 text-[13.5px] font-extrabold text-white">
            글쓰기 ▾
          </button>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1256px] items-center gap-[22px] border-t border-[var(--line)] px-7">
        {[
          "쇼핑홈",
          "카테고리",
          "베스트",
          "오늘의딜",
          "단독상품",
          "오마트",
          "원하는날도착",
          "오!쇼룸",
          "기획전",
        ].map((label) => (
          <span
            key={label}
            className={`border-b-2 py-3 text-sm font-semibold ${
              label === "카테고리"
                ? "border-[var(--blue)] font-extrabold text-[var(--blue)]"
                : "border-transparent text-[var(--ink-soft)]"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </header>
  );
}
