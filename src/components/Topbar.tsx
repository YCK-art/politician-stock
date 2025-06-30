"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { createPortal } from "react-dom";

const menus = [
  { name: "홈", path: "/" },
  { name: "뉴스", path: "/news" },
  { name: "내부자 고르기", path: "/insiders" },
];

export default function Topbar() {
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);
  // 임시: 유료 구독 여부 (실제 구현 시 DB/결제 연동)
  const isPro = false; // true면 PRO, false면 FREE

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // 구글 로그인 핸들러
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setShowLogin(false);
      // 로그인 성공 후 추가 로직(예: 토스트, 리다이렉트 등) 필요시 여기에 작성
    } catch (e) {
      alert("구글 로그인에 실패했습니다.");
    }
  };

  return (
    <>
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
          {/* 로그인/프로필 영역 */}
          {!user ? (
            <button
              className="bg-[#222c] text-white px-6 py-2 rounded-md font-bold hover:bg-white hover:text-black transition"
              onClick={() => setShowLogin(true)}
            >
              로그인
            </button>
          ) : (
            <div className="relative flex items-center">
              {user.photoURL ? (
                <img src={user.photoURL} alt="프로필" className="w-10 h-10 rounded-full border-2 border-white shadow object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow">
                  {user.displayName ? user.displayName[0] : user.email[0]}
                </div>
              )}
              <span className={`absolute left-1/2 -translate-x-1/2 top-9 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${isPro ? "bg-black text-white border border-white" : "bg-white text-black"} font-[Pretendard]`}
                style={{ minWidth: 44, textAlign: 'center', fontFamily: 'Pretendard, sans-serif' }}>
                {isPro ? "PRO" : "FREE"}
              </span>
            </div>
          )}
        </div>
      </header>
      {/* 로그인 모달을 Portal로 body에 렌더링 */}
      {showLogin && typeof window !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#23272f] rounded-2xl p-8 min-w-[320px] flex flex-col items-center gap-4 shadow-2xl">
            <div className="text-lg font-bold mb-2">무엇으로 로그인할 것인가요?</div>
            <button
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
              onClick={handleGoogleLogin}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="구글" className="w-5 h-5" />
              구글 로그인
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 font-semibold py-2 rounded-lg cursor-not-allowed opacity-60"
              disabled
            >
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="페이스북" className="w-5 h-5" />
              페이스북 로그인 (준비중)
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 font-semibold py-2 rounded-lg cursor-not-allowed opacity-60"
              disabled
            >
              <img src="https://www.svgrepo.com/show/448234/kakao-talk.svg" alt="카카오" className="w-5 h-5" />
              카카오 로그인 (준비중)
            </button>
            <button
              className="mt-2 text-xs text-gray-400 hover:text-white underline"
              onClick={() => setShowLogin(false)}
            >
              닫기
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
} 