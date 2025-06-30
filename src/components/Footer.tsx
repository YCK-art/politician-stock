export default function Footer() {
  return (
    <footer className="w-full bg-[#18171c] text-gray-400 text-sm py-8 flex flex-col items-center gap-2 mt-16">
      <div className="flex flex-wrap gap-4 justify-center mb-2">
        <a href="#" className="hover:text-white transition">개인정보처리방침</a>
        <span>|</span>
        <a href="#" className="hover:text-white transition">공지사항</a>
        <span>|</span>
        <a href="#" className="hover:text-white transition">자주 묻는 질문</a>
        <span>|</span>
        <a href="#" className="hover:text-white transition">투자 유의사항</a>
      </div>
      <div className="text-center text-xs text-gray-500 mt-1">
        화이트픽(WHITEPICK)에서 제공하는 내부자 정보는 고객의 투자 판단을 위한 단순 참고용일 뿐, 투자 제안 및 권유, 종목 추천을 위해 작성된 것이 아닙니다.
      </div>
    </footer>
  );
} 