"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { createPortal } from "react-dom";
import type { User } from "firebase/auth";
import { useBanner } from "./BannerContext";

const menus = [
  { name: "홈", path: "/" },
  { name: "뉴스", path: "/news" },
  { name: "내부자 고르기", path: "/insider" },
];

// 슬러그 변환 함수 (API와 동일하게)
function nameToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// 하이라이트 함수
function highlight(text: string, keyword: string) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase()
      ? <span key={i} style={{ background: "#ffe066", color: "#222", borderRadius: 4, padding: "0 2px" }}>{part}</span>
      : part
  );
}

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // 임시: 유료 구독 여부 (실제 구현 시 DB/결제 연동)
  const isPro = false; // true면 PRO, false면 FREE
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [search, setSearch] = useState("");
  const [politicians, setPoliticians] = useState<{en: string, ko: string}[]>([]);
  const [results, setResults] = useState<{en: string, ko: string}[]>([]);
  const [showDataset, setShowDataset] = useState(false);
  const datasetRef = useRef<HTMLDivElement>(null);
  const { showBanner } = useBanner();
  const topOffset = pathname === "/" && showBanner ? 56 : 0;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // 정치인 목록 불러오기 (최초 1회)
  useEffect(() => {
    fetch("/api/politician/list")
      .then(res => res.json())
      .then(data => {
        setPoliticians(data.politicians || []);
      });
  }, []);

  // 검색어 입력 시 필터링
  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }
    setResults(
      politicians.filter(
        p =>
          p.en.toLowerCase().includes(search.toLowerCase()) ||
          p.ko.includes(search)
      )
    );
  }, [search, politicians]);

  // 구글 로그인 핸들러
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setShowLogin(false);
      // 로그인 성공 후 추가 로직(예: 토스트, 리다이렉트 등) 필요시 여기에 작성
    } catch {
      alert("구글 로그인에 실패했습니다.");
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    setShowLogoutConfirm(false);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [dropdownOpen]);

  // 드롭다운 외부 클릭 시 닫힘
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (datasetRef.current && !datasetRef.current.contains(e.target as Node)) {
        setShowDataset(false);
      }
    }
    if (showDataset) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDataset]);

  return (
    <>
      <header className="w-full h-16 flex items-center justify-between px-8 fixed left-0 z-50 bg-black/60 backdrop-blur-md"
        style={{ top: topOffset }}>
        {/* 로고 */}
        <Link href="/" className="text-2xl font-extrabold text-white tracking-wide select-none">
          WHITEPICK
        </Link>
        {/* 메뉴 */}
        <nav className="hidden md:flex gap-8">
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
          {/* 데이터셋 메뉴 */}
          <div className="relative" ref={datasetRef}>
            <button
              className="text-gray-400 hover:text-white text-lg font-semibold px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
              onClick={() => setShowDataset(v => !v)}
            >
              데이터셋
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className={`transition-transform ${showDataset ? "rotate-180" : ""}`}>
                <path d="M5 8l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showDataset && (
              <div className="absolute left-0 mt-2 w-56 bg-[#23272f] rounded-2xl shadow-2xl border border-white/10 z-50 animate-fadein">
                <button
                  className="w-full text-left px-5 py-4 text-base text-white font-semibold hover:bg-white/10 rounded-2xl transition"
                  onClick={() => {
                    setShowDataset(false);
                    router.push("/dataset/recent-trades");
                  }}
                >
                  최근 주식거래내역
                </button>
                {/* 추후 다른 메뉴 추가 가능 */}
              </div>
            )}
          </div>
        </nav>
        {/* 검색창 & 로그인 */}
        <div className="flex items-center gap-4">
          <div style={{ position: "relative" }}>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M20 20l-3.5-3.5"/></svg>
            </span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="정치인 이름(한글/영문) 검색"
              style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", width: 260, paddingLeft: 36 }}
            />
            {results.length > 0 && (
              <ul style={{
                position: "absolute",
                top: 40,
                left: 0,
                background: "#23272f",
                border: "1px solid #eee",
                width: 220,
                zIndex: 10,
                listStyle: "none",
                margin: 0,
                padding: 0,
                color: "#fff"
              }}>
                {results.map(p => (
                  <li
                    key={p.en}
                    onClick={() => {
                      setSearch("");
                      setResults([]);
                      router.push(`/politician/${nameToSlug(p.en)}`);
                    }}
                    style={{ padding: 8, cursor: "pointer", borderBottom: "1px solid #2c2c2c", background: "none" }}
                    onMouseOver={e => (e.currentTarget.style.background = "#333")}
                    onMouseOut={e => (e.currentTarget.style.background = "none")}
                  >
                    <div style={{ fontWeight: 500, fontSize: 15 }}>
                      {highlight(p.ko, search)}
                    </div>
                    <div style={{ fontSize: 13, color: "#bbb" }}>
                      {highlight(p.en, search)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
              <div className="cursor-pointer" onClick={() => setDropdownOpen((v) => !v)}>
                {user.photoURL ? (
                  <Image src={user.photoURL} alt="프로필" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow">
                    {user.displayName ? user.displayName[0] : user.email ? user.email[0] : "?"}
                  </div>
                )}
                <span className={`absolute left-1/2 -translate-x-1/2 top-8 px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${isPro ? "bg-black text-white border border-white" : "bg-white text-black"} font-[Pretendard]`}
                  style={{ minWidth: 36, textAlign: 'center', fontFamily: 'Pretendard, sans-serif', fontSize: '11px', lineHeight: '16px' }}>
                  {isPro ? "PRO" : "FREE"}
                </span>
              </div>
              {/* 프로필 드롭다운 */}
              {dropdownOpen && (
                <div className="profile-dropdown absolute right-0 top-14 w-40 bg-[#23272f] rounded-xl shadow-lg py-2 flex flex-col z-[200] border border-white/10">
                  <button className="px-4 py-2 text-left hover:bg-white/10 transition text-sm" onClick={() => { setDropdownOpen(false); setShowSettings(true); }}>설정</button>
                  <button className="px-4 py-2 text-left hover:bg-white/10 transition text-sm" onClick={() => { setDropdownOpen(false); alert('계정전환은 추후 구현됩니다.'); }}>계정전환</button>
                  <button className="px-4 py-2 text-left hover:bg-white/10 transition text-sm text-red-400" onClick={() => { setDropdownOpen(false); setShowLogoutConfirm(true); }}>로그아웃</button>
                </div>
              )}
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
                                <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="구글" width={20} height={20} className="w-5 h-5" />
              구글 로그인
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 font-semibold py-2 rounded-lg cursor-not-allowed opacity-60"
              disabled
            >
                                <Image src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="페이스북" width={20} height={20} className="w-5 h-5" />
              페이스북 로그인 (준비중)
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 font-semibold py-2 rounded-lg cursor-not-allowed opacity-60"
              disabled
            >
                                <Image src="https://www.svgrepo.com/show/448234/kakao-talk.svg" alt="카카오" width={20} height={20} className="w-5 h-5" />
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
      {/* 설정 모달 */}
      {showSettings && typeof window !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#23272f] rounded-2xl p-0 min-w-[400px] max-w-full flex flex-col gap-0 shadow-2xl" style={{width: 600}}>
            <div className="flex gap-0">
              {/* 왼쪽 탭 - 전체 배경색 적용 및 상단 X버튼 */}
              <nav className="relative flex flex-col gap-2 min-w-[180px] bg-[#202127] rounded-l-2xl py-6 px-2 border-r border-white/10 items-stretch" style={{height: '420px'}}>
                {/* X 닫기 버튼 */}
                <button
                  className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white text-xl"
                  onClick={() => setShowSettings(false)}
                  aria-label="닫기"
                  tabIndex={0}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                <button className="text-left px-4 py-2 rounded-lg bg-white/10 text-white font-bold mt-12 flex items-center gap-2 text-sm">
                  {/* 일반: 홈/설정 아이콘 */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M12 3L3 9v12h6v-6h6v6h6V9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  일반
                </button>
                <button className="text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 flex items-center gap-2 text-sm">
                  {/* 알림: 종/알림 아이콘 */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  알림
                </button>
                <button className="text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 flex items-center gap-2 text-sm">
                  {/* 개인 맞춤 설정: 슬라이더/조절 아이콘 */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M4 21v-7m0 0a2 2 0 1 1 4 0v7m-4-7h4m6-7V3m0 0a2 2 0 1 1 4 0v4m-4-4h4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  개인 맞춤 설정
                </button>
                <button className="text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 flex items-center gap-2 text-sm">
                  {/* 커넥터: 링크/연결 아이콘 */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M17 7a5 5 0 0 1 0 7l-1 1m-4-4l1-1a5 5 0 0 1 7 0m-7 7a5 5 0 0 1-7 0l-1-1m4-4l-1 1a5 5 0 0 1 0-7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  커넥터
                </button>
                <button className="text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 flex items-center gap-2 text-sm">
                  {/* 데이터 제어: 데이터/차트 아이콘 */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M3 17v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M8 3.13a4 4 0 0 0 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  데이터 제어
                </button>
                <button className="text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 flex items-center gap-2 text-sm">
                  {/* 보안: 자물쇠 아이콘 */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M6 10V7a6 6 0 1 1 12 0v3m-1 10H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  보안
                </button>
                <button className="text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 flex items-center gap-2 text-sm">
                  {/* 계정: 유저/사람 아이콘 */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  계정
                </button>
              </nav>
              {/* 오른쪽 내용 */}
              <section className="flex-1 flex flex-col gap-6 p-8 text-sm">
                <div className="text-xl font-bold mb-2">설정</div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 min-w-[80px] text-sm">내 계정</span>
                    <span className="text-white font-semibold font-[Pretendard] flex-1 min-w-0 truncate break-all overflow-hidden text-sm" style={{fontFamily: 'Pretendard, sans-serif'}}>{user?.email}</span>
                  </div>
                  <div className="my-2 border-b border-white/10 w-full" />
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 min-w-[80px] text-sm">테마</span>
                    <div className="flex-1 flex items-center">
                      <select
                        className="bg-[#18171c] text-white px-2 py-2 rounded-lg border border-white/10 focus:outline-none w-auto min-w-[80px] text-sm"
                        value={theme}
                        onChange={e => setTheme(e.target.value as 'system' | 'light' | 'dark')}
                      >
                        <option value="system">시스템</option>
                        <option value="light">라이트</option>
                        <option value="dark">다크</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* 로그아웃 확인 모달 */}
      {showLogoutConfirm && typeof window !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#23272f] rounded-2xl p-8 min-w-[320px] flex flex-col items-center gap-6 shadow-2xl">
            <div className="text-lg font-bold mb-2">정말 로그아웃 하시겠습니까?</div>
            <div className="flex gap-4 w-full justify-center">
              <button className="px-6 py-2 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition" onClick={handleLogout}>로그아웃</button>
              <button className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition" onClick={() => setShowLogoutConfirm(false)}>취소</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
} 