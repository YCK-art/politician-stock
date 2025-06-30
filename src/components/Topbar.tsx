"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { name: "홈", path: "/" },
  { name: "뉴스", path: "/news" },
  { name: "내부자 고르기", path: "/insiders" },
];

export default function Topbar() {
  const pathname = usePathname();
  return (
    <header className="w-full h-16 flex items-center justify-between px-8 fixed top-0 left-0 z-50 bg-black/60 backdrop-blur-md">
      {/* 로고 */}
      <Link href="/" className="text-2xl font-extrabold text-white tracking-wide select-none">
        WHITEPICK
      </Link>
      {/* 메뉴 */}
      <nav className="flex gap-8">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            href={menu.path}
            className={`text-lg px-3 py-1 rounded-md transition-colors font-semibold ${
              pathname === menu.path ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
      {/* 검색창 & 로그인 */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="🔍 눌러 검색하세요"
          className="bg-[#222c] text-white px-4 py-2 rounded-md w-56 outline-none placeholder:text-gray-400 border border-transparent focus:border-white/40 transition"
        />
        <button className="bg-[#222c] text-white px-6 py-2 rounded-md font-bold hover:bg-white hover:text-black transition">
          로그인
        </button>
      </div>
    </header>
  );
} 