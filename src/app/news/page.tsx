"use client";
import React, { useState } from "react";
import Image from "next/image";

interface NewsItem {
  title: string;
  summary: string;
  url: string;
  published_at: string;
  source: string;
  image: string | null;
  content?: string;
}

// 주요 뉴스(왼쪽 맨 위) - 트럼프 관세 기사
const leftTopNews: NewsItem = {
  image: "/news/trump-tariff.jpg",
  title: "트럼프, 관세 발언으로 시장 긴장… S&P500 선물과 달러 동반 하락",
  summary: "도널드 트럼프 전 대통령이 다시 관세 부과 가능성을 거론하면서 글로벌 금융시장이 긴장했다. 5일 새벽 미국 주가지수 선물과 달러가 하락했고, 투자자들은 보호무역주의 강화가 경기 둔화로 이어질 수 있다는 점을 우려하고 있다. 트럼프의 발언은 오는 대선 국면과 맞물려 미중 관계에 불확실성을 더하며 시장 전반에 부담으로 작용하고 있다.",
  content: `2025년 7월 5일(현지시간) 마켓워치에 따르면, 도널드 트럼프 전 대통령은 이날 대선 유세 연설에서 다시 한 번 강경한 무역 정책을 언급하며 "중국산 상품과 기타 수입품에 높은 관세를 부과하겠다"고 밝혔다. 그는 "미국을 다시 위대하게 만들기 위해서, 그리고 미국 노동자와 산업을 지키기 위해 반드시 관세를 강화해야 한다"고 강조했다. 이 같은 발언은 그의 첫 임기 당시 추진했던 '미국 우선주의' 무역 정책을 연상케 했고, 시장은 즉각 민감하게 반응했다.

트럼프의 발언이 전해진 직후 미국 금융시장에서는 위험자산 선호가 위축됐다. S&P500 선물은 장중 0.3%가량 내렸고, 기술주 중심의 나스닥 선물은 0.5% 가까이 하락하며 투자 심리가 악화됐다. 달러도 약세를 나타냈다. 달러 인덱스는 소폭 하락했으며, 이는 높은 관세가 결국 물가를 자극해 연방준비제도(Fed)의 금리 정책에 부담을 줄 수 있다는 전망과 맞물린 것으로 보인다. 또 글로벌 수요가 둔화될 경우 경기 침체 리스크가 커질 수 있다는 우려도 달러 매수세를 약화시켰다.

채권 시장에서는 안전자산 선호 현상이 나타났다. 10년 만기 미국 국채 수익률이 소폭 내려가며 투자자들이 위험을 회피하려는 움직임을 보였다. 월가의 한 이코노미스트는 "아직 정책으로 확정된 것은 아니지만, 트럼프가 실제로 집권할 경우 무역 전쟁이 다시 시작될 수 있다는 점이 불확실성으로 작용하고 있다"며 "시장에선 점점 그 리스크를 가격에 반영하기 시작하는 것"이라고 분석했다.

트럼프의 발언이 정치적으로는 미국 내 제조업과 농업계 일부 지지층을 결집시키는 효과가 있을 수 있지만, 기업과 소비자 모두에 비용을 전가해 경기 전반에 부담을 줄 수 있다는 점에서 논란이 커질 전망이다. 특히 지난 무역 전쟁 당시 경험했던 공급망 혼란과 소비자 물가 상승의 악몽이 되살아날 가능성이 있다는 점에서 시장은 여전히 긴장을 늦추지 못하고 있다.

경제학자들은 트럼프의 관세 정책이 현실화되면 글로벌 무역 관계를 훼손하고, 미국 경제 성장률을 둔화시킬 가능성이 크다고 경고하고 있다. 한 전문가도 "제조업과 농업 종사자들에게는 당장 유리한 것처럼 보이지만, 장기적으로는 기업 비용과 소비자 부담을 증가시키며 시장 불안을 심화시킬 것"이라고 말했다. 이번 발언을 계기로 시장의 변동성은 앞으로 대선 국면이 본격화되면서 더욱 커질 수 있다는 전망이 나온다.

<저작권자(c) MarketWatch, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "MarketWatch",
  published_at: "2025-07-05 08:30:00",
  url: "#"
};

// 왼쪽 두 번째 주요 뉴스 - 트럼프 메디케이드 주식 기사
const leftSecondNews: NewsItem = {
  image: "/news/trump-medicaid-stock.jpg",
  title: "공화당 의원, 트럼프 세금 법안 표결 전 메디케이드 관련 주식 매도",
  summary: `한 공화당 하원의원이 트럼프 전 대통령의 세금 법안 표결을 앞두고 메디케이드 관련 주식을 대규모로 매도한 사실이 드러났다. 해당 법안에는 메디케이드 예산 삭감이 포함돼 있어 이해충돌 논란이 일고 있다. 민주당과 시민단체는 "권력을 사익에 이용했다"며 강하게 비판했고, 공화당은 법적 문제는 없다는 입장을 밝혔다.`,
  content: `2025년 7월 2일(현지시간) 뉴스위크에 따르면, 공화당 소속 하원의원 로버트 브레스나한이 트럼프 전 대통령의 세금 법안 표결 직전에 메디케이드와 관련된 주식을 대거 매도한 사실이 확인되면서 논란이 커지고 있다. 트럼프의 '원 빅 뷰티풀 빌(One Big Beautiful Bill)'로 불리는 이 법안은 국경 장벽 건설과 대규모 감세, 연방 지출 삭감 등과 함께 메디케이드 예산을 줄이는 내용이 포함돼 있다. 이에 따라 브레스나한 의원이 표결에 앞서 관련 주식을 처분한 것은 자신이 입법으로 피해를 줄 산업에서 미리 손을 떼려는 이해충돌 아니냐는 의혹이 제기됐다.

브레스나한 의원은 표결 며칠 전 수백만 달러 규모의 메디케이드 관련 보험 및 의료 주식을 매도한 것으로 알려졌다. 그는 "내 모든 투자는 법적으로 문제 없고, 전문가의 자문을 받아 이뤄졌다"고 주장했다. 공화당 지도부도 "의원 개인의 자산 관리에 불법성은 없다"며 그를 감쌌다.

그러나 민주당과 복지 옹호 단체들은 강하게 반발했다. 민주당 대변인은 "가장 취약한 계층의 생존을 위협하는 법안을 통과시키기 전에 자신부터 안전하게 빠져나간 것"이라며 "권력을 사익에 이용한 전형적인 사례"라고 비난했다. 한 시민단체 관계자도 "정치인이 자신이 만드는 법의 피해를 미리 피할 수 있는 구조는 명백히 공정하지 않다"고 지적했다.

트럼프가 주도한 이번 세금 법안은 공화당이 내세우는 재정 건전성과 이민 통제 기조를 반영하며 강행되고 있다. 하지만 메디케이드 삭감으로 인해 수백만 명의 저소득층과 취약계층이 피해를 볼 수 있다는 우려가 나오고 있다. 민주당은 브레스나한 의원의 주식 매각 행위에 대해 윤리조사를 요구했고, 시민단체들은 연방선거위원회에 공식 조사를 요청할 방침이라고 밝혔다.

향후 법안 처리 과정에서 이 사건이 정치적 후폭풍으로 작용할 가능성이 크다는 관측이 나온다.

<저작권자(c) Newsweek, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "Newsweek",
  published_at: "2025-07-03 15:30:00",
  url: "#"
};

// 왼쪽 세 번째 주요 뉴스 - 미 달러화 기사
const leftThirdNews: NewsItem = {
  image: "/news/us-dollar-liz-truss.jpg",
  title: "미 달러화, '리즈 트러스 순간' 위기 맞나… 관세 혼란 속 신뢰 흔들려",
  summary: `미국의 재정적자와 달러화 가치 하락이 위험 신호를 보내고 있다는 우려가 커지고 있다. 최근 미국 달러는 금리가 오르는데도 주요 통화 대비 13.5% 하락하며, 2022년 리즈 트러스 당시 영국이 맞닥뜨린 채권 위기와 비슷한 양상을 보인다는 지적이 나온다. 트럼프 행정부와 공화당이 추진하는 대규모 적자 확대 정책이 달러 신뢰를 훼손해 미국의 글로벌 리더십을 위협할 수 있다는 경고가 잇따른다.`,
  content: `2025년 7월 4일(현지시간) 아시아타임스에 따르면, 올해 들어 달러 가치는 주요국 통화 대비 13.5% 급락하며 불안한 흐름을 보이고 있다. 특히 최근에는 미 국채 금리가 오름에도 불구하고 달러가 계속 약세를 보이고 있어 전문가들은 2022년 영국에서 발생한 '리즈 트러스 사태'를 떠올리고 있다. 당시 영국 정부의 무책임한 감세안 발표로 채권 시장이 붕괴하고 파운드화가 급락한 바 있다.\n\n브루킹스연구소의 로빈 브룩스는 "달러가 금리 차가 확대되는데도 약세를 이어가는 것은 심상치 않다"며 "긴 재정적자와 관세 불확실성으로 달러에 위험 프리미엄이 붙기 시작했다"고 말했다. 워런 버핏의 "썰물이 빠지면 누가 벌거숭이로 수영했는지 알게 된다"는 말처럼, 37조 달러에 달하는 미국의 막대한 부채가 본격적으로 문제로 드러나고 있다는 것이다.\n\n문제의 핵심에는 트럼프와 공화당이 추진하는 '빅, 뷰티풀 빌'이 있다. 이 법안은 연방 적자를 4조 달러나 늘릴 것으로 예상되는데, 이는 일본 연간 GDP 규모와 맞먹는다. 이미 미국의 국가신용등급은 2011년 이후 잇따라 강등돼, 최근 무디스도 100년 넘게 유지하던 최상위 등급을 철회했다. 스탠퍼드대의 대럴 더피 교수는 "미국이 더는 재정 규율을 지키지 않고 있다"고 지적했다.\n\n경제학자 필립 럭은 "미국의 부채 문제는 이제 단순한 위험이 아니라 국가 안보와 리더십을 제한하는 전략적 족쇄가 됐다"며 "지금 같은 추세라면 2055년에는 부채가 GDP의 156%에 달하게 된다"고 경고했다. 그는 "달러 패권이 미국을 보호해줄 것이란 착각이 가장 위험하다"며, 재정 개혁 없이는 국방과 외교 등 핵심 분야의 투자마저 위태로워질 것이라고 우려했다.\n\n특히 아시아가 보유한 미 국채는 2조5000억 달러에 달해 이번 위기에 노출돼 있다. 일본이 1조1000억 달러, 중국이 7700억 달러를 보유하고 있어 이들 국가도 불안감을 표출하고 있다. 중국은 이미 2009년 글로벌 금융위기 당시 "미국의 신뢰를 믿어야 할지 걱정된다"는 입장을 내놨다.\n\n브룩스는 "지금의 비정상적인 가격 흐름은 매우 이례적이며, 오랜 기간 방치된 재정 불균형과 관세 불확실성이 달러에 대한 신뢰를 시험하고 있다"고 말했다. 전문가들은 미국이 더 늦기 전에 재정 건전성을 회복하지 않으면, 신용등급과 함께 세계 경제 리더십도 잃을 수 있다고 경고했다.\n\n<저작권자(c) Asia Times, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "Asia Times",
  published_at: "2025-07-04 21:00:00",
  url: "#"
};

const mainNews: NewsItem = {
  image: "/news/trump.jpg",
  title: "트럼프의 '빅, 뷰티풀 빌(국경 장벽·강경 이민법)'이 공화당에 부담으로… 민주당, 중간선거 역공 카드로 활용",
  summary: "도널드 트럼프 전 대통령이 주도해 통과시킨 '빅, 뷰티풀 빌'(남부 국경 장벽 건설과 초강경 이민 정책을 담은 법안)이 2025년 중간선거를 앞두고 공화당의 발목을 잡고 있다. 시행 이후 과도한 예산 부담과 인권 침해 논란이 불거지면서 여론이 악화됐고, 민주당은 이를 공화당을 공격할 주요 소재로 삼아 라틴계와 무당층 유권자를 집중 공략하고 있다. 공화당 내부에서도 법안의 부작용을 우려하며 전략 수정이 필요하다는 목소리가 나오고 있다.",
  content: `2025년 7월 4일(현지시간) 워싱턴포스트는 트럼프 전 대통령과 공화당 지도부가 올해 초 의회를 통과시킨 '빅, 뷰티풀 빌'이 정치적 역풍을 불러일으키고 있다고 보도했다. 남부 국경에 대규모 장벽을 건설하고 이민자 송환을 강화하며, 이를 위해 수십억 달러의 예산을 투입하는 내용을 담은 이 법안은 공화당이 그동안 강조해온 '국가 안보 강화'를 상징하는 법안이었다. 트럼프는 이 법안을 "미국 역사상 가장 강력하고 아름다운 법"이라고 치켜세우며 자신의 정치적 승리로 포장했지만, 시행 이후 드러난 부작용은 공화당의 선거 전략을 뒤흔들고 있다.

법안 통과 이후 남부 국경에서의 혼란은 오히려 커졌다. 강제 송환 과정에서 가족 단위 이민자들이 장기간 수용시설에 갇히거나, 아이들이 부모와 격리되는 사례가 잇따라 발생하며 국제사회의 비판도 거세졌다. 또 장벽 건설과 인프라 유지에 드는 비용이 애초 계획을 크게 초과하고 있다는 사실이 알려지면서 재정 부담에 대한 우려도 커졌다. 특히 경합주의 라틴계 유권자들 사이에서 '불필요하게 가혹하다'는 인식이 확산되면서 공화당에 대한 지지가 약화되고 있다는 여론조사 결과가 속속 나오고 있다.

민주당은 이를 호재로 삼아 '공화당은 불필요하게 잔혹하고 비효율적인 정책을 고집한다'는 메시지를 내세우며 공격을 강화하고 있다. 민주당 선거 전략가들은 경합주에서 이 법안을 주요 쟁점으로 만들며, 무당층과 소수인종 표심을 공략하는 데 집중하고 있다. 한 민주당 관계자는 "이 법안 덕분에 공화당이 중도층과 젊은 유권자들에게 자신들의 민낯을 드러냈다"며 "우리가 이 기회를 최대한 활용할 것"이라고 말했다.

공화당 내부에서도 균열이 감지되고 있다. 일부 온건 성향 의원들은 "법안의 장기적 정치적 손해가 이익을 상회할 수 있다"며 수정 논의를 요구하고 있다. 한 중진 의원은 익명을 전제로 "우리는 안보를 지키기 위해 싸운다는 입장이지만, 유권자들이 그 대가를 받아들이지 못한다면 결국 정치적으로 실패하는 셈"이라고 말했다. 반면 트럼프와 지도부는 여전히 "국가 안보가 최우선"이라는 기조를 유지하며 후퇴하지 않겠다는 입장을 고수하고 있다. 이런 가운데 당내 분열이 본격화될지, 공화당의 선거 전략에 어떤 변화를 가져올지가 주목된다.

<저작권자(c) The Washington Post, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "The Washington Post",
  published_at: "2025-07-04 21:00:00",
  url: "#"
};

// 우측 맨 위 주요 뉴스 - 테슬라 기사
const rightTopNews: NewsItem = {
  image: "/news/tesla-time-bomb.jpg",
  title: "테슬라 주식의 실제 가치는 시한폭탄… 로보택시 기대가 떠받치는 천문학적 평가",
  summary: "최근 주가 반등에도 불구하고 테슬라의 본질적 가치는 과대평가됐다는 우려가 커지고 있다. 자동차 판매는 급감하고 수익성도 무너진 상황에서, 회사의 1조 달러에 가까운 시가총액은 사실상 일론 머스크의 로보택시 비전에 대한 기대만으로 지탱되고 있다는 지적이다. 전문가들은 로보택시 사업의 현실적 한계와 불안정한 정치적 환경을 고려할 때, 현재의 평가가 위험한 도박에 가깝다고 경고한다.",
  content: `2025년 7월 3일(현지시간) 퓨처리즘 보도에 따르면, 최근 테슬라 주가가 상승세를 보였지만 전문가들은 그 내실에 의문을 던지고 있다. 테슬라 주가는 2분기 판매량이 전년 동기 대비 14% 급감하며 사상 최대 하락을 기록했음에도 불구하고, 예상보다 덜 나쁘다는 이유로 수요일 하루에만 약 4% 상승했다. 투자자들이 여전히 머스크가 제시한 자율주행과 로보택시 사업의 비전에 베팅하고 있다는 방증이다.

그러나 현실은 거칠다. 테슬라는 올해 1분기 순이익이 무려 71% 급감하며 수익성 악화를 드러냈고, 자동차 본업의 가치는 월스트리트저널과 모건스탠리 애널리스트들조차 현재 시가총액에 한참 못 미친다고 평가했다. 모건스탠리의 애덤 조너스는 지난 5월 테슬라 주식의 적정가치를 주당 100달러 미만으로 추정했지만, 현재 주가는 그 3배가 넘는다.

회사 시가총액은 1조 달러에 가까워 여전히 세계에서 가장 가치 있는 자동차 제조사 자리를 차지하고 있다. 이는 2위 도요타의 4배 이상에 달하는 규모지만, 로보택시 사업의 실적은 기대에 크게 못 미치고 있다. 지난달 시작된 로보택시 서비스는 텍사스 남부의 극히 제한된 지역에서만 운영되며, 차량에는 반드시 인간 직원이 동승해 문제 발생 시 개입한다. 운행 도중 승객을 교차로 한가운데에 방치하거나 핸들이 급격히 흔들리는 등 각종 사고도 발생해 논란을 키우고 있다.

머스크는 여전히 "2026년 말까지 수십만 대에서 많게는 100만 대 이상의 완전 자율주행 테슬라가 도로를 달리게 될 것"이라고 장담하지만, 현실은 요원하다. 그는 심지어 저가형 모델2를 포기하며 "25,000달러짜리 세단을 만드는 것은 우리가 추구하는 것과 맞지 않는다"고 선언한 바 있다. 대신 자율주행 기술에 '올인'하고 있지만, 사업 전망은 불투명하고 회사의 판매량과 수익성은 계속 악화되고 있다.

여기에 머스크의 극우 성향으로 인한 이미지 훼손, 트럼프 대통령과의 갈등, 정부 보조금 중단 위협, 핵심 임원들의 잇단 이탈까지 겹치면서 회사 운영의 불안정성도 커지고 있다. 최근에는 오랜 측근인 오미드 애쉬파르와 로봇 프로그램 총책임자까지 회사를 떠났다.

이런 상황에서 로보택시가 테슬라의 시가총액을 10조 달러까지 끌어올릴 것이라는 머스크의 주장은 회의적인 시선을 받고 있다. 자동차 판매가 계속 부진한 가운데, 자율주행이 테슬라의 거대한 몸값을 지탱하는 마지막 기둥이자 위험한 도박이 되고 있다는 지적이다.

<저작권자(c) Futurism, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "Futurism",
  published_at: "2025-07-04 03:23:00",
  url: "#"
};

// 우측 두 번째 주요 뉴스 - 로빈후드 기사
const rightSecondNews: NewsItem = {
  image: "/news/robinhood-record.jpg",
  title: "로빈후드 주가 사상 최고치 경신… 암호화폐·옵션 거래 열풍에 급등",
  summary: "주식 및 암호화폐 거래 플랫폼 로빈후드의 주가가 7월 2일(현지시간) 장중 사상 최고치를 기록했다. 최근 옵션과 암호화폐 거래가 급증하면서 수익 기대가 높아진 데다, 젊은 투자자들의 지속적인 유입이 주가를 밀어올렸다는 분석이다. 전문가들은 다만 지나친 낙관론에는 경계가 필요하다고 지적했다.",
  content: `2025년 7월 2일(현지시간) CNBC 보도에 따르면, 미국의 개인투자자 플랫폼 로빈후드의 주가가 이날 장중 사상 최고치인 주당 29.70달러까지 치솟았다. 마감가는 전일 대비 7% 이상 오른 29.45달러로 마무리됐다. 로빈후드 주가는 올해 들어서만 80% 넘게 상승하며 시장의 뜨거운 관심을 받고 있다.

이날 급등의 배경에는 최근 몇 분기 동안 크게 늘어난 옵션 거래 수수료 수익과 암호화폐 거래량이 있다. 특히 비트코인 가격이 최근 다시 70,000달러에 육박하며 암호화폐 시장이 활황을 보이는 가운데, 로빈후드를 통해 암호화폐를 거래하는 젊은 투자자들이 크게 늘어난 것으로 나타났다. 회사 측에 따르면 2분기 암호화폐 거래 수익은 전년 동기 대비 60% 이상 증가했다.

또한 미국 증시가 사상 최고 수준을 경신하며 개인투자자들의 시장 참여가 활발해진 것도 긍정적으로 작용했다. 로빈후드의 고객 계좌 수는 현재 2,700만 개를 넘어서며 꾸준히 증가 중이다. 한 애널리스트는 "옵션과 코인에 특화된 로빈후드의 사업 모델이 현 시장 분위기와 맞물려 수익성 개선 기대가 커지고 있다"고 평가했다.

그러나 지나친 낙관에 대한 경계도 나온다. 전문가들은 "수익의 상당 부분이 높은 변동성을 지닌 자산군에 집중돼 있어 시장 환경이 악화될 경우 실적에 큰 타격을 받을 수 있다"고 지적하며, 장기적 안정성을 위해 수익구조 다변화가 필요하다고 강조했다. 최근 규제 당국의 시선도 여전히 로빈후드에 집중돼 있어, 규제 리스크도 주의해야 한다는 평가다.

<저작권자(c) CNBC, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "CNBC",
  published_at: "2025-07-03 07:00:00",
  url: "#"
};

// 오른쪽 세 번째 주요 뉴스 - 캘리포니아 마드레 산불 기사
const rightThirdNews: NewsItem = {
  image: "/news/madre-fire-california.jpg",
  title: "캘리포니아 올해 최대 규모로 번진 '마드레' 산불",
  summary: `캘리포니아 남부에서 발생한 '마드레(Madre)' 산불이 기록적인 폭염과 강풍 속에 빠르게 확산되며 올해 캘리포니아에서 발생한 산불 중 최대 규모로 번졌다. 현재까지 수천 에이커가 소실됐고, 로스앤젤레스 외곽 수천 채의 주택이 위협받고 있다. 당국은 긴급 대피령을 발령했으며, 기후변화가 이러한 대형 산불의 원인이라는 지적이 나온다.`,
  content: `2025년 7월 3일(현지시간) 액시오스 보도에 따르면, 캘리포니아 로스앤젤레스 북쪽에서 발생한 '마드레 화재(Madre Fire)'가 폭염과 강풍을 타고 급격히 번지며 올해 캘리포니아에서 발생한 산불 중 가장 큰 규모로 확대됐다. 현재까지 최소 7,000에이커 이상의 산림이 불타며, 로스앤젤레스 카운티 북부와 벤투라 카운티 일부 지역으로 불길이 번지고 있다.

이번 화재로 인해 실마(Sylmar), 산타클라리타(Santa Clarita) 등 인근 지역 주민 수천 명에게 긴급 대피령이 내려졌고, 주민들은 황급히 피난소로 이동하고 있다. 소방당국은 "낮은 습도, 극심한 폭염, 강풍이 겹쳐 진화율은 아직 15% 수준에 불과하다"고 전했다.

기후 전문가들은 이번 화재가 기후변화로 인한 고온·건조한 환경의 결과라고 지적했다. 캘리포니아의 폭염과 건조한 기후는 산불 시즌을 더 길고 강하게 만들고 있으며, 이번 화재 역시 그 악순환을 보여주고 있다는 것이다. 미국 기상청(NWS)은 로스앤젤레스 일대에 역대 최고 수준의 폭염 경보를 발령하고 주민들에게 외출을 자제하라고 권고했다.

일부 도로가 통제되고, 송전선 차단으로 일부 지역에서 정전 피해가 발생했다. 주정부는 추가 소방 병력을 투입해 진화 작업을 서두르고 있다. 한 주민은 "불길이 너무 빨리 다가와 짐도 제대로 챙기지 못하고 도망쳤다"며 "해마다 산불이 더 심각해지는 것 같아 두렵다"고 말했다.

당국은 주민들에게 기상 상황을 주시하며 대피 명령을 철저히 따를 것을 당부했고, 기후위기 대응 없이는 앞으로도 이런 대형 산불이 반복될 것이라는 경고가 이어지고 있다.

<저작권자(c) Axios, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "Axios",
  published_at: "2025-07-04 08:30:00",
  url: "#"
};

// 오른쪽 네 번째 주요 뉴스 - 델몬트 파산 기사
const rightFourthNews: NewsItem = {
  image: "/news/del-monte-bankruptcy.jpg",
  title: "139년 전통의 델몬트, 재정 압박에 파산 보호 신청",
  summary: `139년 동안 통조림 과일과 채소를 생산해온 미국의 델몬트 푸즈가 파산보호를 신청하고 매각 절차에 들어갔다. 회사는 법원의 감독하에 매각을 추진하면서 9억 달러 규모의 신규 자금을 확보해 정상 영업을 유지할 방침이다. 델몬트는 변화하는 소비자 수요와 어려운 경제 여건 속에서도 '지속 가능한 재도약'을 다짐했다.`,
  content: `2025년 7월 3일(현지시간) 발표에 따르면, 통조림 과일과 채소로 잘 알려진 미국의 델몬트 푸즈(Del Monte Foods)가 챕터 11 파산보호를 신청하며 139년 역사의 전환점을 맞았다. 회사는 법원의 감독 아래 매각 절차를 진행하면서도 운영을 이어가겠다는 계획을 밝혔다.\n\n델몬트는 '델몬트' 브랜드 외에도 콘타디나(Contadina), 조이바(Joyba), 칼리지 인(College Inn) 등 여러 식품 브랜드를 보유하고 있다. 그렉 롱스트리트 CEO는 이날 성명을 통해 "모든 옵션을 면밀히 검토한 결과, 법원의 감독하에 매각 절차를 진행하는 것이 회사의 재도약을 가속화하고 델몬트 푸즈를 더 강하고 지속 가능한 회사로 만들 수 있는 최선의 방법이라고 판단했다"고 밝혔다.\n\n델몬트는 법원이 감독하는 구조조정 절차의 일환으로 자산 전체를 매각할 인수를 찾고 있다. 이를 위해 9억1,250만 달러(약 1조2천억 원)의 신규 자금을 확보해 현재 한창 진행 중인 포장 시즌 동안에도 정상 운영을 이어갈 계획이다.\n\n롱스트리트 CEO는 "최근 급변하는 거시 경제 환경 속에서 소비자 수요의 변화로 많은 어려움을 겪어 왔다"며 "그러나 델몬트는 거의 140년 동안 가족들의 식탁을 지켜온 만큼, 앞으로도 영양가 높고 맛있는 음식을 더 많은 사람들에게 제공하겠다는 사명을 이어갈 것"이라고 강조했다. 그는 "장기적 목표를 이루기 위해 힘을 보태준 임직원, 생산자, 고객, 거래처, 그리고 대출 기관에 깊이 감사드린다"고 덧붙였다.\n\n<저작권자(c) MLive, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "MLive",
  published_at: "2025-07-04 03:24:00",
  url: "#"
};

// 오른쪽 다섯 번째 주요 뉴스 - 화석연료 주식 급등 기사
const rightFifthNews: NewsItem = {
  image: "/news/fossil-fuels-stocks.jpg",
  title: "트럼프 세금·지출안 상원 통과에 화석연료 주식 급등",
  summary: `트럼프 대통령의 '빅, 뷰티풀 빌'이 상원 표결을 통과하면서 석탄·석유 등 화석연료 업종 주식이 일제히 급등했다. 법안에는 재생에너지 세금 감면 폐지와 화석연료 업계 지원이 담겨 있어 투자자들의 기대를 자극했다. 대표적으로 라마코 리소스는 하루 만에 20% 이상 오르며 시장을 주도했고, 석탄·시추 관련 주식들도 강세를 이어갔다.`,
  content: `2025년 7월 3일(현지시간) 발표에 따르면, 전날 트럼프 대통령의 세금·지출안 '빅, 뷰티풀 빌(Big Beautiful Bill)'이 상원 표결을 통과하자 화석연료 업종 주식이 급등했다. S&P500과 나스닥이 사상 최고치를 경신한 가운데, 해당 법안에는 화석연료 산업 지원과 함께 태양광·풍력 등 재생에너지 세금 감면을 2028년까지 단계적으로 폐지하는 내용이 포함됐다.\n\n이날 주식시장에서 메탈러지컬 석탄 기업인 라마코 리소스(Ramaco Resources)는 무려 20% 이상 폭등하며 주목을 받았다. 라마코 주가는 개장 전 거래에서도 추가 상승세를 보였다. 워리어 메트 콜(Warrior Met Coal)과 알파 메탈러지컬 리소스(Alpha Metallurgical Resources)는 각각 13% 이상 상승했고, 코어 내추럴 리소스(Core Natural Resources)와 피바디 에너지(Peabody Energy)도 각각 12.2%, 11.4% 올랐다.\n\n석탄 관련 주식들은 지난 4월 바닥을 찍고 반등한 이후 횡보세를 보였지만, 라마코는 이날까지 4월 저점 대비 90% 넘는 상승률을 기록했다.\n\n석유 시추주들도 상승세를 보였다. 시드릴(Seadrill), 프리시전 드릴링(Precision Drilling), 네이버스 인더스트리(Nabors Industries)는 각각 6%가량 올랐고, 트랜스오션(Transocean)도 5.3% 상승했다. 노블(Noble)과 발라리스(Valaris)는 4월 저점 대비 각각 62%, 67% 반등했으며, 발라리스는 올해 들어 2.7% 상승해 업계에서 가장 높은 연초 대비 상승률을 기록 중이다.\n\n한편, 화석연료와 달리 재생에너지 업종은 엇갈린 흐름을 보였다. 특히 태양광 업종은 지난 6월 말 상원안에 2028년까지 세금 감면 전면 폐지가 명시되면서 급락한 이후 회복세를 보이지 못했다.\n\n시장 전문가들은 IBD 리더보드, IBD 50, IBD 스윙트레이더, 섹터 리더스 리스트 등을 통해 성장주와 업종 동향을 지속적으로 모니터링할 것을 권했다.\n\n<저작권자(c) Investor's Business Daily, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "Investor's Business Daily",
  published_at: "2025-07-03 21:42:00",
  url: "#"
};

// 중앙 두 번째 주요 뉴스 - 엔비디아 시총 기사
const centerSecondNews: NewsItem = {
  image: "/news/nvidia-apple-marketcap.jpg",
  title: "엔비디아, 애플의 시총 기록 넘본다… 로봇이 성장 견인할까",
  summary: `엔비디아 주가가 올해 들어 19% 상승하며 시가총액 3.89조 달러를 기록, 애플이 보유한 사상 최고치(3.195조 달러)에 바짝 다가섰다. 전문가들은 CEO 젠슨 황이 강조한 휴머노이드 로봇 분야가 향후 엔비디아 성장의 핵심 동력이 될 수 있다고 전망한다. 연말에는 전통적으로 주가가 더 강세를 보이는 경향도 있어 시장의 기대감이 커지고 있다.`,
  content: `2025년 7월 4일(현지시간) 배런스에 따르면, 엔비디아(Nvidia) 주가는 목요일 1.3% 상승하며 시가총액 3조8,900억 달러를 기록했다. 이는 애플이 2024년 12월 26일 세운 역대 최고 시총인 3조1,950억 달러에 불과 수천억 달러 차이로 다가선 것이다. 미국 증시는 독립기념일 휴장으로 금요일에는 거래가 없고, 다음 주부터 다시 주가가 움직일 예정이다.\n\n엔비디아의 주가 상승은 AI 반도체 수요와 더불어 로봇 분야에 대한 기대감이 더해진 결과로 분석된다. 젠슨 황 CEO는 지난달 파리 콘퍼런스에서 "휴머노이드 로봇은 잠재적으로 가장 큰 산업 중 하나가 될 것"이라며, 스웨덴의 헥사곤과 협력해 개발한 새로운 휴머노이드 로봇 'AEON'을 공개하기도 했다. 황은 로봇 산업이 단순한 공상과학이 아니라 실질적인 성장 동력임을 강조했다.\n\n팩트셋에 따르면, 엔비디아의 자동차·로봇 부문 매출은 현재 연간 17억 달러 수준에서 2030년대 초에는 75억5천만 달러까지 성장할 것으로 예상된다. 휴머노이드 로봇 시장이 황의 예측대로 커진다면 전망치는 더 높아질 가능성이 있다.\n\n올해 초에는 미 정부의 중국 수출 규제 우려로 잠시 주가가 흔들렸지만, 이후 시장의 불안이 잦아들며 주가는 다시 상승세로 돌아섰다. 현재까지 2025년 들어 엔비디아 주가는 19% 올라 세계에서 가장 가치 있는 기업 자리를 되찾았고, 4조 달러 돌파를 눈앞에 두고 있다.\n\n다만 역사적으로 3분기에는 주가 상승률이 평균 4%에 그쳤고, 연말 4분기에는 평균 23% 상승하는 경향이 있다는 점에서, 단기적 숨고르기 이후 연말 강세가 기대된다.\n\n애널리스트들은 "로봇 분야에서의 돌파구가 마련된다면 엔비디아의 주가 전망은 더 밝아질 수 있다"고 평가했다.\n\n<저작권자(c) Barron's, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "Barron's",
  published_at: "2025-07-04 21:22:00",
  url: "#"
};

// 오른쪽 여섯 번째 주요 뉴스 - 에어프랑스-KLM SAS 인수 기사
const rightSixthNews: NewsItem = {
  image: "/news/air-france-klm-sas.jpg",
  title: "에어프랑스-KLM, SAS 지분 60.5%로 확대… 대다수 지분 인수 계획 발표",
  summary: `에어프랑스-KLM이 스칸디나비아항공(SAS)의 지분을 기존 19.9%에서 60.5%로 확대해 대다수 지분을 인수하겠다는 계획을 발표했다. 이번 결정은 SAS의 구조조정 이후 재무 및 운영 성과 개선, 상업적 협력의 성공에 힘입어 이뤄졌다. 거래가 성사되면 SAS는 에어프랑스, KLM, 트란사비아와 함께 에어프랑스-KLM 그룹 산하에 편입되며, 스카이팀 프로그램과의 통합도 진행될 예정이다.`,
  content: `2025년 7월 4일(현지시간) 에어프랑스-KLM은 스칸디나비아항공(SAS)의 지분을 현재의 19.9%에서 60.5%로 확대해 대다수 지분을 확보하겠다고 발표했다. SAS는 2022년 7월 챕터11 파산보호를 신청한 후, 구조조정을 거쳐 스카이팀으로 얼라이언스를 옮기고 재무 상태를 개선하며 회생에 성공한 바 있다.\n\n에어프랑스-KLM은 이번에 캐슬레이크와 린드 인베스트가 보유한 지분을 매입해 지분을 확대할 계획이다. 덴마크 정부는 26.4%의 지분과 이사회 의석을 그대로 유지한다. 인수가격은 거래 성사 시점의 SAS 재무 상황(EBITDA 및 순부채 기준)에 따라 결정될 예정이며, 규제 당국의 승인을 전제로 2026년 하반기 완료를 목표로 하고 있다.\n\n벤 스미스 에어프랑스-KLM CEO는 성명을 통해 "SAS의 성공적인 구조조정과 그간의 성과는 인상적이었다"며 "이번 통합으로 스칸디나비아 고객들에게 더 나은 연결성과 서비스를 제공하고, SAS를 에어프랑스-KLM 가족으로 맞이하게 돼 기쁘다"고 밝혔다.\n\nSAS는 최근 코펜하겐을 글로벌 허브로 육성하고 단거리 노선에 비즈니스 클래스 재도입, 무료 스타링크 와이파이 제공, 단거리 기단 교체 등 혁신적인 변화를 추진해 왔다.\n\n거래가 성사되면 SAS는 에어프랑스, KLM, 트란사비아와 함께 그룹 산하 항공사로 편입되며, 플라잉 블루(Flying Blue) 멤버십 프로그램과 스카이팀의 대서양 공동사업에도 참여하게 될 전망이다.\n\n유럽 항공업계는 에어프랑스-KLM, IAG, 루프트한자그룹의 '빅3' 체제로 경쟁하고 있으며, 이번 인수는 지리적·경쟁적 측면에서도 그룹의 입지를 강화할 수 있을 것으로 기대된다. 시장에서는 이번 인수가 향후 유럽 항공업계의 추가적인 통합 움직임의 신호탄이 될 것이라는 전망도 나온다.\n\n<저작권자(c) One Mile at a Time, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "One Mile at a Time",
  published_at: "2025-07-04 16:00:00",
  url: "#"
};

// 오른쪽 일곱 번째 주요 뉴스 - OpenAI 패닉 버튼 기사
const rightSeventhNews: NewsItem = {
  image: "/news/openai-panic-button.jpg",
  title: "OpenAI, 강제 휴가와 인재 유출 속 '패닉 버튼'… 메타와의 전면전 돌입",
  summary: `세계 최대 AI 기업인 오픈AI가 전 직원에게 강제 휴가를 부여하며 인재 유출 위기에 대응하고 있다. 메타가 고액 연봉으로 핵심 연구자들을 빼가자, 샘 알트만 CEO는 사내 메모에서 "메타는 용병, 우리는 선교사"라며 이상을 지켰지만, 결국 연봉 재조정까지 검토하며 방어전에 나섰다. 한편 오픈AI 공동창업자인 일리야 수츠케버가 설립한 SSI마저 CEO를 메타에 빼앗기며 업계 전쟁은 확산되고 있다.`,
  content: `2025년 7월 4일(현지시간) 기즈모도(Gizmodo) 보도에 따르면, 오픈AI는 이번 주 전 직원을 대상으로 일주일간 강제 휴가를 부여했다. 표면적으로는 재충전이 목적이지만, 내부적으로는 메타의 공세에 흔들리는 조직을 다잡기 위한 전략적 후퇴였다.\n\n샘 알트만 CEO는 사내 슬랙 메시지에서 "메타는 우리 팀원들에게 거액의 제안을 하고 있다"며 "메타의 방식은 썩 유쾌하지 않다"고 토로했다. 그는 "우리는 구석에서 시작한 괴짜였지만 이제는 산업의 중심"이라며 "AI 트위터는 독성으로 가득하고 앞으로 더 혼란스러울 것"이라고 덧붙였다. 메타는 최근 오픈AI의 핵심 연구자 여러 명을 스카우트했고, 알트만은 "메타가 최고 인재를 데려가지 못해 리스트를 내려가며 뽑고 있다"며 불쾌감을 드러냈다.\n\n하지만 사명만으로 인재를 붙잡는 것이 더는 쉽지 않다는 점도 인정했다. 그는 연구팀 전체의 보상을 재검토하겠다고 밝혀 메타식 '머니 게임'에 대응하겠다는 뜻을 내비쳤다.\n\n한편 오픈AI 공동창업자 일리야 수츠케버가 설립한 '세이프 슈퍼인텔리전스(SSI)'마저 이번 전쟁의 피해자가 됐다. 수츠케버는 3일 X(옛 트위터)에서 SSI CEO인 다니엘 그로스가 6월 29일부로 회사를 떠나 메타에 합류했다고 밝혔다. 그는 "메타로부터 인수 제안을 받았지만, 우리는 독립적으로 우리의 길을 가겠다"며 SSI의 독자노선을 강조했다.\n\n벤치마크 분석에 따르면, 메타는 AI 연구소를 넘어 '인재 확보 머신'을 만들고 있고, 마크 저커버그 CEO는 이를 숨기지 않고 있다. 오픈AI는 여전히 챗GPT와 마이크로소프트 파트너십 등으로 업계의 얼굴이지만, 내부 문화가 흔들리며 금이 가기 시작했다는 평가다.\n\n알트만은 "우리는 AGI를 올바른 방식으로 만들고 싶다. 그것이 우리의 사명이고, 메타가 다음 유행을 쫓아 떠난 후에도 우리는 남아 있을 것"이라고 강조했다. 그러나 기즈모도는 "9자리 숫자의 제안 앞에서 선교사의 사명만으로는 인재를 지킬 수 없다"며 문화적 균열이 드러나고 있다고 진단했다.\n\n<저작권자(c) Gizmodo, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "Gizmodo",
  published_at: "2025-07-04 23:00:00",
  url: "#"
};

// 오른쪽 여덟 번째 주요 뉴스 - 센틴 주가 폭락 기사
const rightEighthNews: NewsItem = {
  image: "/news/centene-stock-plunge.jpg",
  title: "센틴 주가 40% 폭락해 8년래 최저… 주목해야 할 핵심 지지·저항선",
  summary: `미국의 메디케이드·ACA 보험사 센틴(Centene)이 가입자 감소와 의료비 증가로 연간 가이던스를 철회하면서 주가가 하루 만에 40% 급락, 2017년 이후 최저치로 떨어졌다. 올해만 44% 빠진 센틴 주가는 장기적 하락세를 보이며 주요 지지선과 저항선이 주목된다. 기술적 분석에 따르면 추가 하락 시 27달러와 17달러 부근이 매수 관심 구간으로, 반등 시 42달러와 74달러 부근이 중요한 저항선으로 작용할 전망이다.`,
  content: `2025년 7월 2일(현지시간) 인베스토피디아에 따르면, 센틴(Centene, 티커: CNC) 주가는 이날 40% 폭락하며 33.78달러에 마감해 8년 만의 최저치를 기록했다. 회사는 이날 가입자 증가세 둔화와 예상보다 높은 의료비 지출로 인해 연간 가이던스를 철회하고, 2025년 실적에 약 18억 달러(주당 2.75달러)의 손실이 반영될 것이라고 밝혔다.\n\n센틴은 메디케이드와 '오바마케어(ACA)' 보험을 중심으로 사업을 영위해 왔으나, 최근 가입자 수와 환자 건강 상태가 예상보다 나빠 연방 보조금 감소와 비용 증가가 불가피하다는 설명이다. 센틴 주가는 2022년 8월 사상 최고치를 기록한 이후 3분의 2 가까이 하락했고, 올해 들어서만 44% 급락했다.\n\n기술적 분석에 따르면, 주가는 장기 하락 추세 속에서 200개월 이동평균선 아래로 내려가며 과매도 국면에 진입했다. 최근 매도세는 거래량이 평균 이상으로 늘어나 대형 투자자들의 매도세가 확인됐다.\n\n앞으로 주목할 만한 지지선으로는 27달러 부근이 있다. 이 구간은 2015-2016년 박스권 하단이자 매수세가 유입될 가능성이 있는 가격대다. 만약 27달러마저 붕괴될 경우, 주가는 2013-2014년 삼각형 패턴 상단이었던 17달러까지 추가 하락할 가능성이 있다는 분석이다.\n\n반등 시에는 우선 42달러 부근이 첫 번째 저항선으로 작용할 전망이다. 이 가격대는 2015년 고점과 2019년 저점, 그리고 200개월 이동평균선이 모이는 지점이다. 이후 74달러 부근까지 상승할 경우, 과거 추세선을 따라온 투자자들이 차익 실현에 나설 가능성이 있다.\n\n센틴의 이번 급락은 의료비 증가와 가입자 감소라는 업계 전반의 어려움을 반영한 것으로, 투자자들은 신중한 접근이 필요하다.\n\n<저작권자(c) Investopedia, 무단 전재-재배포, AI 학습 및 활용 금지>`,
  source: "Investopedia",
  published_at: "2025-07-03 12:12:00",
  url: "#"
};

// 모든 뉴스 데이터를 배열로 정리
const allNews: NewsItem[] = [
  mainNews,
  leftTopNews,
  leftSecondNews,
  leftThirdNews,
  rightTopNews,
  rightSecondNews,
  rightThirdNews,
  rightFourthNews,
  rightFifthNews,
  centerSecondNews,
  rightSixthNews,
  rightSeventhNews,
  rightEighthNews
];

// 현재 뉴스를 제외한 다른 뉴스들을 반환하는 함수
function getOtherNews(currentNews: NewsItem): NewsItem[] {
  const otherNews = allNews.filter(news => news.title !== currentNews.title);
  
  // 랜덤하게 섞기
  const shuffled = otherNews.sort(() => Math.random() - 0.5);
  
  // 처음 3개 반환
  return shuffled.slice(0, 3);
}

export default function NewsPage() {
  // 모달 상태
  const [modalOpen, setModalOpen] = useState<string|false>(false);



  // ESC로 모달 닫기
  React.useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  // 날짜 한글 변환 함수
  function formatKoreanDate(dateStr: string) {
    // YYYY-MM-DD HH:mm(:ss) or '2025년 7월 4일 21:00 KST' 등 다양한 포맷 대응
    const d = dateStr;
    if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(d)) {
      // ex: 2025-07-04 21:00:00
      const [date, time] = d.split(' ');
      const [y, m, day] = date.split('-');
      const [h, min] = time.split(':');
      return `${y}년 ${m}월 ${day}일 ${h}시 ${min}분`;
    }
    // ex: 2025년 7월 4일 21:00 KST
    if (/\d{4}년 \d{1,2}월 \d{1,2}일 \d{1,2}:\d{2}/.test(d)) {
      return d.replace(/(\d{1,2}):(\d{2})/, '$1시 $2분');
    }
    // fallback: 그대로
    return d;
  }

  return (
    <main className="min-h-screen w-full bg-[#18171c] text-white flex flex-col items-center pt-28 pb-16">
      <div className="w-full max-w-7xl px-2 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 좌측: Today's Picks */}
        <section className="flex flex-col gap-6 min-h-[420px]">
          <h2 className="text-2xl font-bold mb-2 tracking-tight px-1">주요 뉴스</h2>
          {/* 첫 번째 카드: 트럼프 관세 기사 */}
          <button
            className="flex flex-col bg-[#23272f] rounded-xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer text-left"
            style={{padding:0, border:'none'}}
            onClick={() => setModalOpen('leftTop')}
            aria-label="뉴스 상세 열기"
          >
            <Image src={leftTopNews.image || "/vercel.svg"} alt="뉴스 이미지" width={600} height={340} className="w-full h-40 object-cover bg-black/30" />
            <div className="flex flex-col gap-1 p-4">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">{leftTopNews.source}</span>
              <h3 className="text-base font-bold leading-tight mb-1 line-clamp-2">{leftTopNews.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{leftTopNews.summary}</p>
              <span className="text-xs text-gray-500 mt-2">{formatKoreanDate(leftTopNews.published_at)}</span>
            </div>
          </button>
          {/* 두 번째 카드: 트럼프 메디케이드 주식 기사 */}
          <button
            className="flex flex-col bg-[#23272f] rounded-xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer text-left"
            style={{padding:0, border:'none'}}
            onClick={() => setModalOpen('leftSecond')}
            aria-label="뉴스 상세 열기"
          >
            <Image src={leftSecondNews.image || "/vercel.svg"} alt="뉴스 이미지" width={600} height={340} className="w-full h-40 object-cover bg-black/30" />
            <div className="flex flex-col gap-1 p-4">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">{leftSecondNews.source}</span>
              <h3 className="text-base font-bold leading-tight mb-1 line-clamp-2">{leftSecondNews.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{leftSecondNews.summary}</p>
              <span className="text-xs text-gray-500 mt-2">{formatKoreanDate(leftSecondNews.published_at)}</span>
            </div>
          </button>
          {/* 세 번째 카드: 미 달러화 기사 */}
          <button
            className="flex flex-col bg-[#23272f] rounded-xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer text-left"
            style={{padding:0, border:'none'}}
            onClick={() => setModalOpen('leftThird')}
            aria-label="뉴스 상세 열기"
          >
            <Image src={leftThirdNews.image || "/vercel.svg"} alt="뉴스 이미지" width={600} height={340} className="w-full h-40 object-cover bg-black/30" />
            <div className="flex flex-col gap-1 p-4">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">{leftThirdNews.source}</span>
              <h3 className="text-base font-bold leading-tight mb-1 line-clamp-2">{leftThirdNews.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{leftThirdNews.summary}</p>
              <span className="text-xs text-gray-500 mt-2">{formatKoreanDate(leftThirdNews.published_at)}</span>
            </div>
          </button>
        </section>
        {/* 중앙: Main News (트럼프) */}
        <section className="col-span-1 flex flex-col gap-6 min-h-[420px]">
          <h2 className="text-lg font-bold mb-2 tracking-tight px-1 invisible md:visible">&nbsp;</h2>
          <button
            className="block bg-[#23272f] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform cursor-pointer text-left"
            style={{padding:0, border:'none'}}
            onClick={() => setModalOpen('main')}
            aria-label="뉴스 상세 열기"
          >
            <Image src={mainNews.image || "/vercel.svg"} alt="메인 뉴스 이미지" width={900} height={420} className="w-full h-64 md:h-80 object-cover bg-black/30" />
            <div className="p-7 flex flex-col gap-2">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">{mainNews.source}</span>
              <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2 line-clamp-2">{mainNews.title}</h1>
              <p className="text-base text-gray-300 mb-2 line-clamp-3">{mainNews.summary}</p>
              <span className="text-xs text-gray-500">{formatKoreanDate(mainNews.published_at)}</span>
            </div>
          </button>
          {/* 추가 카드 2개 */}
          <div className="flex flex-col gap-4">
            {/* 첫 번째 추가 카드: 엔비디아 시총 기사 */}
            <button
              className="flex flex-col bg-[#23272f] rounded-xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer text-left"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('centerSecond')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={centerSecondNews.image || "/vercel.svg"} alt="뉴스 이미지" width={600} height={340} className="w-full h-40 object-cover bg-black/30" />
              <div className="flex flex-col gap-1 p-4">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">{centerSecondNews.source}</span>
                <h3 className="text-base font-bold leading-tight mb-1 line-clamp-2">{centerSecondNews.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{centerSecondNews.summary}</p>
                <span className="text-xs text-gray-500 mt-2">{formatKoreanDate(centerSecondNews.published_at)}</span>
              </div>
            </button>
          </div>
        </section>
        {/* 우측: Most Recent & Featured */}
        <section className="flex flex-col gap-6 min-h-[420px]">
          <h2 className="text-lg font-bold mb-2 tracking-tight px-1 invisible md:visible">&nbsp;</h2>
          <div className="flex flex-col gap-4">
            {/* 첫 번째 카드: 테슬라 기사 (더 넓게) */}
            <button
              className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer px-6 py-6 text-left min-h-[120px]"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('rightTop')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={rightTopNews.image || "/vercel.svg"} alt="뉴스 이미지" width={96} height={96} className="w-24 h-24 object-cover rounded-xl bg-black/30 flex-shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-2 ml-2 mr-3">
                <h4 className="text-base font-bold leading-tight line-clamp-2 pr-2">{rightTopNews.title}</h4>
                <span className="text-xs text-gray-400 mt-1">{rightTopNews.source}</span>
                <span className="text-xs text-gray-500 mt-1">{formatKoreanDate(rightTopNews.published_at)}</span>
              </div>
            </button>
            {/* 두 번째 카드: 로빈후드 기사 (넓게) */}
            <button
              className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer px-6 py-6 text-left min-h-[120px]"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('rightSecond')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={rightSecondNews.image || "/vercel.svg"} alt="뉴스 이미지" width={96} height={96} className="w-24 h-24 object-cover rounded-xl bg-black/30 flex-shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-2 ml-2 mr-3">
                <h4 className="text-base font-bold leading-tight line-clamp-2 pr-2">{rightSecondNews.title}</h4>
                <span className="text-xs text-gray-400 mt-1">{rightSecondNews.source}</span>
                <span className="text-xs text-gray-500 mt-1">{formatKoreanDate(rightSecondNews.published_at)}</span>
              </div>
            </button>
            {/* 세 번째 카드: 캘리포니아 마드레 산불 기사 (넓게) */}
            <button
              className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer px-6 py-6 text-left min-h-[120px]"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('rightThird')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={rightThirdNews.image || "/vercel.svg"} alt="뉴스 이미지" width={96} height={96} className="w-24 h-24 object-cover rounded-xl bg-black/30 flex-shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-2 ml-2 mr-3">
                <h4 className="text-base font-bold leading-tight line-clamp-2 pr-2">{rightThirdNews.title}</h4>
                <span className="text-xs text-gray-400 mt-1">{rightThirdNews.source}</span>
                <span className="text-xs text-gray-500 mt-1">{formatKoreanDate(rightThirdNews.published_at)}</span>
              </div>
            </button>
            {/* 네 번째 카드: 델몬트 파산 기사 (넓게) */}
            <button
              className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer px-6 py-6 text-left min-h-[120px]"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('rightFourth')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={rightFourthNews.image || "/vercel.svg"} alt="뉴스 이미지" width={96} height={96} className="w-24 h-24 object-cover rounded-xl bg-black/30 flex-shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-2 ml-2 mr-3">
                <h4 className="text-base font-bold leading-tight line-clamp-2 pr-2">{rightFourthNews.title}</h4>
                <span className="text-xs text-gray-400 mt-1">{rightFourthNews.source}</span>
                <span className="text-xs text-gray-500 mt-1">{formatKoreanDate(rightFourthNews.published_at)}</span>
              </div>
            </button>
            {/* 다섯 번째 카드: 화석연료 주식 급등 기사 (넓게) */}
            <button
              className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer px-6 py-6 text-left min-h-[120px]"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('rightFifth')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={rightFifthNews.image || "/vercel.svg"} alt="뉴스 이미지" width={96} height={96} className="w-24 h-24 object-cover rounded-xl bg-black/30 flex-shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-2 ml-2 mr-3">
                <h4 className="text-base font-bold leading-tight line-clamp-2 pr-2">{rightFifthNews.title}</h4>
                <span className="text-xs text-gray-400 mt-1">{rightFifthNews.source}</span>
                <span className="text-xs text-gray-500 mt-1">{formatKoreanDate(rightFifthNews.published_at)}</span>
              </div>
            </button>
            {/* 여섯 번째 카드: 에어프랑스-KLM SAS 인수 기사 (넓게) */}
            <button
              className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer px-6 py-6 text-left min-h-[120px]"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('rightSixth')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={rightSixthNews.image || "/vercel.svg"} alt="뉴스 이미지" width={96} height={96} className="w-24 h-24 object-cover rounded-xl bg-black/30 flex-shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-2 ml-2 mr-3">
                <h4 className="text-base font-bold leading-tight line-clamp-2 pr-2">{rightSixthNews.title}</h4>
                <span className="text-xs text-gray-400 mt-1">{rightSixthNews.source}</span>
                <span className="text-xs text-gray-500 mt-1">{formatKoreanDate(rightSixthNews.published_at)}</span>
              </div>
            </button>
            {/* 일곱 번째 카드: OpenAI 패닉 버튼 기사 (넓게) */}
            <button
              className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer px-6 py-6 text-left min-h-[120px]"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('rightSeventh')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={rightSeventhNews.image || "/vercel.svg"} alt="뉴스 이미지" width={96} height={96} className="w-24 h-24 object-cover rounded-xl bg-black/30 flex-shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-2 ml-2 mr-3">
                <h4 className="text-base font-bold leading-tight line-clamp-2 pr-2">{rightSeventhNews.title}</h4>
                <span className="text-xs text-gray-400 mt-1">{rightSeventhNews.source}</span>
                <span className="text-xs text-gray-500 mt-1">{formatKoreanDate(rightSeventhNews.published_at)}</span>
              </div>
            </button>
            {/* 여덟 번째 카드: 센틴 주가 폭락 기사 (넓게) */}
            <button
              className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow hover:scale-[1.01] transition-transform cursor-pointer px-6 py-6 text-left min-h-[120px]"
              style={{padding:0, border:'none'}}
              onClick={() => setModalOpen('rightEighth')}
              aria-label="뉴스 상세 열기"
            >
              <Image src={rightEighthNews.image || "/vercel.svg"} alt="뉴스 이미지" width={96} height={96} className="w-24 h-24 object-cover rounded-xl bg-black/30 flex-shrink-0" />
              <div className="flex flex-col min-w-0 flex-1 gap-2 ml-2 mr-3">
                <h4 className="text-base font-bold leading-tight line-clamp-2 pr-2">{rightEighthNews.title}</h4>
                <span className="text-xs text-gray-400 mt-1">{rightEighthNews.source}</span>
                <span className="text-xs text-gray-500 mt-1">{formatKoreanDate(rightEighthNews.published_at)}</span>
              </div>
            </button>
          </div>
        </section>
      </div>
      {/* 뉴스 상세 모달: 왼쪽 맨 위 주요 뉴스 */}
      {modalOpen === 'leftTop' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={leftTopNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{leftTopNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{leftTopNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(leftTopNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{leftTopNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(leftTopNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 중앙 메인 뉴스 */}
      {modalOpen === 'main' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={mainNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{mainNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{mainNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(mainNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{mainNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(mainNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 왼쪽 두 번째 주요 뉴스 */}
      {modalOpen === 'leftSecond' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={leftSecondNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{leftSecondNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{leftSecondNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(leftSecondNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{leftSecondNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(leftSecondNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 왼쪽 세 번째 주요 뉴스 */}
      {modalOpen === 'leftThird' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={leftThirdNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{leftThirdNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{leftThirdNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(leftThirdNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{leftThirdNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(leftThirdNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 오른쪽 맨 위 주요 뉴스 */}
      {modalOpen === 'rightTop' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={rightTopNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightTopNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightTopNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightTopNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightTopNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(rightTopNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 오른쪽 두 번째 주요 뉴스 */}
      {modalOpen === 'rightSecond' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={rightSecondNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightSecondNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightSecondNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightSecondNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightSecondNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(rightSecondNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 오른쪽 세 번째 주요 뉴스 */}
      {modalOpen === 'rightThird' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={rightThirdNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightThirdNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightThirdNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightThirdNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightThirdNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(rightThirdNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 오른쪽 네 번째 주요 뉴스 */}
      {modalOpen === 'rightFourth' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={rightFourthNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightFourthNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightFourthNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightFourthNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightFourthNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(rightFourthNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 오른쪽 다섯 번째 주요 뉴스 */}
      {modalOpen === 'rightFifth' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={rightFifthNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightFifthNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightFifthNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightFifthNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightFifthNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(rightFifthNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 중앙 두 번째 주요 뉴스 */}
      {modalOpen === 'centerSecond' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={centerSecondNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{centerSecondNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{centerSecondNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(centerSecondNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{centerSecondNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(centerSecondNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 오른쪽 여섯 번째 주요 뉴스 */}
      {modalOpen === 'rightSixth' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={rightSixthNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightSixthNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightSixthNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightSixthNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightSixthNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(rightSixthNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 오른쪽 일곱 번째 주요 뉴스 */}
      {modalOpen === 'rightSeventh' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={rightSeventhNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightSeventhNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightSeventhNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightSeventhNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightSeventhNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(rightSeventhNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 뉴스 상세 모달: 오른쪽 여덟 번째 주요 뉴스 */}
      {modalOpen === 'rightEighth' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* X 버튼을 오버레이에 고정 */}
          <button
            className="fixed top-8 right-12 text-gray-400 hover:text-white text-3xl font-bold z-[100000]"
            style={{boxShadow:'0 2px 8px #0008', background:'rgba(35,39,47,0.85)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            onClick={() => setModalOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <Image src={rightEighthNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightEighthNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightEighthNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightEighthNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightEighthNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {getOtherNews(rightEighthNews).map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => {
                        const modalKey = allNews.findIndex(n => n.title === news.title);
                        if (modalKey === 0) setModalOpen('main');
                        else if (modalKey === 1) setModalOpen('leftTop');
                        else if (modalKey === 2) setModalOpen('leftSecond');
                        else if (modalKey === 3) setModalOpen('leftThird');
                        else if (modalKey === 4) setModalOpen('rightTop');
                        else if (modalKey === 5) setModalOpen('rightSecond');
                        else if (modalKey === 6) setModalOpen('rightThird');
                        else if (modalKey === 7) setModalOpen('rightFourth');
                        else if (modalKey === 8) setModalOpen('rightFifth');
                        else if (modalKey === 9) setModalOpen('centerSecond');
                        else if (modalKey === 10) setModalOpen('rightSixth');
                        else if (modalKey === 11) setModalOpen('rightSeventh');
                        else if (modalKey === 12) setModalOpen('rightEighth');
                      }, 100);
                    }}
                  >
                    <Image src={news.image || "/vercel.svg"} alt={news.title} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-semibold text-base text-white line-clamp-2">{news.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatKoreanDate(news.published_at)} · {news.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 