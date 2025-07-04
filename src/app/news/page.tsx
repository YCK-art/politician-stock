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
  title: "“테슬라 주식의 실제 가치는 시한폭탄”… 로보택시 기대가 떠받치는 천문학적 평가",
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

export default function NewsPage() {
  // 모달 상태
  const [modalOpen, setModalOpen] = useState<string|false>(false);

  // 카드 placeholder
  function CardPlaceholder({height = 'h-40', className = ''}: {height?: string, className?: string}) {
    return (
      <div className={`flex flex-col bg-[#23272f] rounded-xl overflow-hidden shadow animate-pulse ${height} ${className}`} style={{minHeight: '120px'}}>
        <div className="w-full bg-[#23272f] flex-1 flex items-center justify-center text-gray-600 text-sm font-bold opacity-60">
          뉴스가 없습니다
        </div>
      </div>
    );
  }

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
    let d = dateStr;
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
          <h2 className="text-lg font-bold mb-2 tracking-tight px-1">주요 뉴스</h2>
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
          {/* 나머지 카드 placeholder */}
          {[1].map(i => <CardPlaceholder key={i} />)}
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
            {[0,1].map(i => <CardPlaceholder key={i} height="h-20" />)}
          </div>
        </section>
        {/* 우측: Most Recent & Featured */}
        <aside className="flex flex-col gap-8 min-h-[420px]">
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
            {/* 마지막 1개 placeholder 카드 (넓게) */}
            <div className="flex items-center gap-7 bg-[#23272f] rounded-2xl overflow-hidden shadow px-6 py-6 min-h-[120px] animate-pulse">
              <div className="w-24 h-24 rounded-xl bg-gray-700 flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="h-5 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-800 rounded w-1/2" />
                <div className="h-4 bg-gray-800 rounded w-1/3" />
              </div>
            </div>
          </div>
          {/* Featured */}
          <div className="bg-[#23272f] rounded-2xl overflow-hidden shadow flex flex-col min-h-[160px]">
            <CardPlaceholder height="h-40" />
          </div>
        </aside>
      </div>
      {/* 뉴스 상세 모달: 왼쪽 맨 위 주요 뉴스 */}
      {modalOpen === 'leftTop' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="닫기"
            >
              ×
            </button>
            <Image src={leftTopNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{leftTopNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{leftTopNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(leftTopNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{leftTopNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {/* 더미 뉴스 1 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/hiring.jpg" alt="공공일자리" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">공공일자리 무려 10배나 늘었다…미국 '깜짝고용' 숨은 배경은</div>
                    <div className="text-xs text-gray-400 mt-1">11시간 전 · 매일경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 2 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/goldholiday.jpg" alt="황금연휴" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">"10월 황금연휴 온다"…노랑풍선·하나투어 꿈틀</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 한국경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 3 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/china-casino.jpg" alt="중국인 무비자 카지노" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">중국인 무비자에 카지노주 '껑충'</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 매일경제</div>
                  </div>
                </div>
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
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="닫기"
            >
              ×
            </button>
            <Image src={mainNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{mainNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{mainNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(mainNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{mainNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {/* 더미 뉴스 1 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/hiring.jpg" alt="공공일자리" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">공공일자리 무려 10배나 늘었다…미국 '깜짝고용' 숨은 배경은</div>
                    <div className="text-xs text-gray-400 mt-1">11시간 전 · 매일경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 2 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/goldholiday.jpg" alt="황금연휴" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">"10월 황금연휴 온다"…노랑풍선·하나투어 꿈틀</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 한국경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 3 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/china-casino.jpg" alt="중국인 무비자 카지노" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">중국인 무비자에 카지노주 '껑충'</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 매일경제</div>
                  </div>
                </div>
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
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="닫기"
            >
              ×
            </button>
            <Image src={leftSecondNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{leftSecondNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{leftSecondNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(leftSecondNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{leftSecondNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {/* 더미 뉴스 1 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/hiring.jpg" alt="공공일자리" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">공공일자리 무려 10배나 늘었다…미국 '깜짝고용' 숨은 배경은</div>
                    <div className="text-xs text-gray-400 mt-1">11시간 전 · 매일경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 2 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/goldholiday.jpg" alt="황금연휴" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">"10월 황금연휴 온다"…노랑풍선·하나투어 꿈틀</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 한국경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 3 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/china-casino.jpg" alt="중국인 무비자 카지노" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">중국인 무비자에 카지노주 '껑충'</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 매일경제</div>
                  </div>
                </div>
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
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="닫기"
            >
              ×
            </button>
            <Image src={rightTopNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightTopNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightTopNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightTopNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightTopNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {/* 더미 뉴스 1 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/hiring.jpg" alt="공공일자리" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">공공일자리 무려 10배나 늘었다…미국 '깜짝고용' 숨은 배경은</div>
                    <div className="text-xs text-gray-400 mt-1">11시간 전 · 매일경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 2 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/goldholiday.jpg" alt="황금연휴" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">"10월 황금연휴 온다"…노랑풍선·하나투어 꿈틀</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 한국경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 3 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/china-casino.jpg" alt="중국인 무비자 카지노" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">중국인 무비자에 카지노주 '껑충'</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 매일경제</div>
                  </div>
                </div>
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
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="닫기"
            >
              ×
            </button>
            <Image src={rightSecondNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightSecondNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightSecondNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightSecondNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightSecondNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {/* 더미 뉴스 1 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/hiring.jpg" alt="공공일자리" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">공공일자리 무려 10배나 늘었다…미국 '깜짝고용' 숨은 배경은</div>
                    <div className="text-xs text-gray-400 mt-1">11시간 전 · 매일경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 2 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/goldholiday.jpg" alt="황금연휴" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">"10월 황금연휴 온다"…노랑풍선·하나투어 꿈틀</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 한국경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 3 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/china-casino.jpg" alt="중국인 무비자 카지노" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">중국인 무비자에 카지노주 '껑충'</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 매일경제</div>
                  </div>
                </div>
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
          <div
            className="bg-[#23272f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadein"
            style={{maxHeight:'90vh', overflowY:'auto'}}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="닫기"
            >
              ×
            </button>
            <Image src={rightThirdNews.image || "/vercel.svg"} alt="뉴스 이미지" width={900} height={420} className="w-full h-64 object-cover rounded-xl mb-6 bg-black/30" />
            <div className="mb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest">{rightThirdNews.source}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{rightThirdNews.title}</h1>
            <div className="text-sm text-gray-400 mb-4">{formatKoreanDate(rightThirdNews.published_at)}</div>
            <div className="text-base text-gray-200 whitespace-pre-line leading-relaxed mb-2">{rightThirdNews.content}</div>
            {/* 다음 뉴스 섹션 */}
            <div className="mt-10 pt-8 border-t border-[#333]">
              <div className="text-xl font-bold mb-5 text-white">다음 뉴스</div>
              <div className="flex flex-col gap-5">
                {/* 더미 뉴스 1 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/hiring.jpg" alt="공공일자리" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">공공일자리 무려 10배나 늘었다…미국 '깜짝고용' 숨은 배경은</div>
                    <div className="text-xs text-gray-400 mt-1">11시간 전 · 매일경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 2 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/goldholiday.jpg" alt="황금연휴" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">"10월 황금연휴 온다"…노랑풍선·하나투어 꿈틀</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 한국경제</div>
                  </div>
                </div>
                {/* 더미 뉴스 3 */}
                <div className="flex items-center gap-4 bg-[#23272f] rounded-xl p-3 shadow hover:bg-[#282c34] transition cursor-pointer">
                  <Image src="/news/china-casino.jpg" alt="중국인 무비자 카지노" width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold text-base text-white line-clamp-2">중국인 무비자에 카지노주 '껑충'</div>
                    <div className="text-xs text-gray-400 mt-1">16시간 전 · 매일경제</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 