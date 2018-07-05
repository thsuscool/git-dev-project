delete srv_dt_statthemamap
where srv_yn = 'Y';

insert into srv_dt_statthemamap values(
'LHxyLnnDJo20150121101530239npFvJuo5qI',
'CTGR_001',
'admin',
'인구분포현황, 2010',
sysdate,
'02',
'02',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/pplDistHeat/pplDistHeat.html',
'Y',
'0',
'단일뷰, 열지도',
'통계청, 2010년 인구주택총조사',
'전국 인구분포 현황을 한번에 직관적으로 파악할 수 있도록 열지도를 이용하여 작성된 주제도</br>
※ 출처 : 통계청, 2010년 인구주택총조사');

insert into srv_dt_statthemamap values(
'7GvLn4HoDo20141030095216712pyysx7ysws',
'CTGR_001',
'admin',
'65세 이상 고령자 증가, 2000-2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/oldPPLTn/oldPPLTn.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2000, 2005, 2010년 인구주택총조사',
'');
update srv_dt_statthemamap
set exp = '이 주제도는 2000년 부터 2010년 사이에 65세 이상 고령자 인구가 어떻게 변했는지를 나타냅니다.
행정구역별로 고령자 인구의 증감률을 비교할 수 있고, 각 지역의 연도별 고령자 인구 변화를 확인할 수 있습니다.</br>
※ 출처 : 통계청, 2000, 2005, 2010년 인구주택총조사</br>
※ 연평균증감율(CAGR) : (10년 인구/00년 인구)^(1/(2010-2000))-1'
where stat_thema_map_id = '7GvLn4HoDo20141030095216712pyysx7ysws';

insert into srv_dt_statthemamap values(
'tpJ7rCwppD20141030095222504MzKtvExLrF',
'CTGR_001',
'admin',
'1인 가구 증가, 2000-2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/singleFamily/singleFamily.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2000, 2005, 2010년 인구주택총조사',
'이 주제도는 2000년 부터 2010년 사이에 1인 가구가 어떻게 변했는지를 나타냅니다. 행정구역별로 1인 가구의 증감률을 비교할 수 있고, 각 지역의 연도별 1인 가구 변화를 확인할 수 있습니다.</br>
※ 출처 : 통계청, 2000, 2005, 2010년 인구주택총조사</br>
※ 연평균증감율(CAGR) : (10년 인구/00년 인구)^(1/(2010-2000))-1');

insert into srv_dt_statthemamap values(
'GuLrKK2FyF20141120153721323KHLG7DFM1F',
'CTGR_001',
'admin',
'다문화 가구현황, 2010',
sysdate,
'02',
'02',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/multiCulture/multiCulture.html',
'Y',
'0',
'분할뷰',
'통계청, 2010년 인구주택총조사',
'이 주제도는 다문화 가구의 현황을 나타내며, 시/도, 시/군/구별로 다문화 가구를 비교할 수 있습니다.</br>
※ 출처 : 통계청, 2010년 인구주택총조사');

-- '다문화 가구정보는 KOSIS의 "다문화가구 구성별 다문화 가구 및 가구원-시군구" 정보를 원본 그대로 이관하였으며, 시군구 단위까지 정보를 제공합니다.</br>

insert into srv_dt_statthemamap values(
'KpFF9Lwwvr20141120100721275nIGtGJLw9x',
'CTGR_001',
'admin',
'연립, 다세대 주택수 감소, 2000-2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/multiHouse/multiHouse.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2000, 2005, 2010년 인구주택총조사',
'서민들의 주택난 해소를 위해 도입된 다세대/다가구 주택수와 증감율의 10년간의 변화(2000년~2010년)를 그래프와 지도를 이용해 작성된 주제도</br>
※ 출처 : 통계청, 2000, 2005, 2010년 인구주택총조사</br>
※ 연평균증감율(CAGR) : (10년 주택수/00년 주택수)^(1/(2010-2000))-1');

insert into srv_dt_statthemamap values(
'sGDEEFH4vz20141209192921136EKvH8ppIHD',
'CTGR_001',
'admin',
'결혼기간 10년이하 가구의 주택 점유형태 지역별 분포, 2010',
sysdate,
'02',
'02',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/occupTypeUnder10year/occupTypeUnder10year.html',
'Y',
'0',
'분할뷰',
'통계개발원, 생애주기별 주요특성 및 변화분석(2014. 11)',
'2010년 기준으로 결혼 10년차 이하 가구의 자가와 전세 비중을 지역별로 비교하기 위해 분할된 화면으로 작성된 주제도</br>
※ 출처 : <a href="http://kostat.go.kr/portal/korea/kor_nw/2/1/index.board?bmode=read&bSeq=&aSeq=332081&pageNo=1&rowNum=10&navCount=10&currPg=&sTarget=title&sTxt=%EC%83%9D%EC%95%A0%EC%A3%BC%EA%B8%B0" target="_blank">
통계개발원, 생애주기별 주요특성 및 변화분석(2014. 11)</a>');





insert into srv_dt_statthemamap values(
'H3Gn9rLznD20141030095228163Lo1DnuEFuL',
'CTGR_002',
'admin',
'보건시설 1개당 65세이상 노인인구, 2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/health/oldManHealth/oldManMap.html',
'Y',
'0',
'단일뷰, POI 정보',
'통계청, 2010년 인구주택총조사, 2010년 전국사업체조사',
'이 주제도는 보건업종 1개당 노인인구 비율을 나타내며, 읍/면/동 단위로 조회할 경우 보건업종 사업체의 위치가 표시됩니다.</br>
※ 출처 : 통계청, 2010년 인구주택총조사, 2010년 전국사업체조사</br>
※ 산술식 : 보건업체 한 개당 노인인구 (노인인구/보건업종 수)</br>
※ 해당업종(9차 표준산업분류): 종합병원(86101), 일반병원(86102), 치과병원(86103), 한방병원(86104), 일반의원(86201), 치과의원(86202), 한의원(86203), 방사선진단및병리검사의원(86204), 공중보건의료업(86300)');

insert into srv_dt_statthemamap values(
'FqDHxHsIKn20141030095235625tIFKGHHynI',
'CTGR_002',
'admin',
'보육업체 분포도, 2013',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/health/childcare/childcare.html',
'Y',
'0',
'단일뷰, POI 정보',
'통계청, 2013년 전국사업체조사',
'이 주제도는 유치원, 놀이방 등의 보육 업체가 어느 지역에 얼마나 분포해 있는지를 나타냅니다.</br>
※ 출처 : 통계청, 2013년 전국사업체조사</br>
※ 해당업종(9차 표준산업분류): 보육시설운영업(87210), 유아교육기관(85110)');

insert into srv_dt_statthemamap values(
'wGLDoLwEpy20141204104626133DtHxEqrsoK',
'CTGR_002',
'admin',
'기초생활수급자 분포현황, 2013',
sysdate,
'02',
'01',
'11',
'STATE',
'/html/thematicMap/other/health/basicLivRecipient/basicLivRecipient.html',
'Y',
'0',
'단일뷰',
'보건복지부, 2013년 국민기초생활수급자총괄(일반,시설)',
'이 주제도는 기초생활수급자가 어느 지역에 얼마나 분포해 있는지를 나타냅니다. </br>
※ 출처 : 보건복지부, 2013년 국민기초생활수급자총괄(일반,시설)</br>
※ 산술식 : 대상 인구의 총합');

insert into srv_dt_statthemamap values(
'noroGzzwF42014103009531931KIzLMtJFHu ',
'CTGR_002',
'admin',
'문화시설 1개당 인구, 2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/culture/culturalFacilities/culturalFacilities.html',
'Y',
'0',
'단일뷰, POI 정보',
'통계청, 2010년 인구주택총조사, 2010년 전국사업체조사',
'');
update srv_dt_statthemamap
--set exp = '이 주제도는 문화시설(사업체) 1개당 인구 비율을 나타내며, 시/군/구 단위로 조회할 경우 문화 사업체의 위치가 표시됩니다.</br>
set exp = '이 주제도는 문화시설(사업체) 1개당 인구 비율을 나타내며, 읍/면/동 단위로 조회할 경우 문화 사업체의 위치가 표시됩니다.</br>
※ 출처 : 통계청, 2010년 인구주택총조사, 2010년 전국사업체조사</br>
※ 산술식 : 문화시설 한 개당 인구 (인구/문화시설 수)</br>
※ 해당업종(9차 표준산업분류): 공연시설운영업(90110), 영화관운영업(59141)'
where stat_thema_map_id = 'noroGzzwF42014103009531931KIzLMtJFHu ';

insert into srv_dt_statthemamap values(
'FDDpyDnz7F20141203135226976wELqqqrEHs',
'CTGR_002',
'admin',
'도서관 분포현황, 2011',
sysdate,
'02',
'01',
'11',
'STATE',
'/html/thematicMap/other/culture/libraryPresentStatus/libraryPresentStatus.html',
'Y',
'0',
'단일뷰',
'문화체육관광부, 2011년 도서관현황총괄표',
'이 주제도는 시/도별로 운영되고 있는 도서관 수를 나타내며, 시/도별로 도서관 수를 비교할 수 있습니다.</br>
※ 출처 : 문화체육관광부, 2011년 도서관현황총괄표');

insert into srv_dt_statthemamap values(
'8tGIItrnuq20141205095535192rw1DFwJLG1',
'CTGR_002',
'admin',
'평생교육기관 분포현황, 2013',
sysdate,
'02',
'01',
'11',
'STATE',
'/html/thematicMap/other/culture/lifelongEduInst/lifelongEduInst.html',
'Y',
'0',
'단일뷰',
'한국교육개발원, 2013년 지역별 평생교육기관 현황',
'이 주제도는 시/도별로 운영되고 있는 평생교육기관 수를 나타내며, 시/도별로 평생교육기관 수를 비교할 수 있습니다.</br>
※ 출처 : 한국교육개발원, 2013년 지역별 평생교육기관 현황');

--insert into srv_dt_statthemamap values(
--'GCz2ynrIqo20141204111511449HIsKMEnGJp',
--'CTGR_002',
--'admin',
--'1인당 국내 여행횟수 현황, 2008',
--sysdate,
--'02',
--'01',
--'11',
--'STATE',
--'/html/thematicMap/other/culture/personalDomTrip/personalDomTrip.html',
--'N',
--'0',
--'단일뷰',
--'문화체육관광부, 2008년 거주지역별 1인 평균 국내여행 참가 횟수',
--'이 주제도는 거주지역별 1인 평균 국내여행에 대한 참가 횟수(2008년 기준)를 나타내며, 시/도별로 여행 횟수를 비교할 수 있습니다.</br>
--※ 출처 : 문화체육관광부, 2008년 거주지역별 1인 평균 국내여행 참가 횟수</br>
--※ 산술식 : 당일여행+숙박여행');



insert into srv_dt_statthemamap values(
'DMEEMLptFJ201411200948454469pHFMynD2H',
'CTGR_003',
'admin',
'지역별 농림어가의 청장년인구 변화, 2005-2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/youngAdult/youngAdult.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2005, 2010년 농림어업총조사',
'2005년~2010년 사이에 농림어가의 30대, 40대 인구 증감률을 그래프와 지도를 이용해 작성된 주제도</br>
※ 출처 : 통계청, 2005, 2010년 농림어업총조사</br>
※ 연평균증감율(CAGR) : (10년인구/05년인구)^(1/(2010-2005))-1');

insert into srv_dt_statthemamap values(
'xsoEwqrxuG2014120917093750EMyxKLMnFD ',
'CTGR_003',
'admin',
'제과점 변화, 2009-2013',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/smallBizBreadshop/smallBizBreadshop.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2009년~2013년 전국사업체조사',
'이 주제도는 2009년 부터 2013년 사이에 제과점의 수가 어떻게 변했는지를 나타냅니다. 행정구역별로 제과점 수의 연평균성장률(CAGR)을 비교할 수 있고, 각 지역의 연도별 사업체 수 변화를 확인할 수 있습니다.</br>
※ 출처 : 통계청, 2009~2013년 전국사업체조사</br>
※ 연평균증감율(CAGR) : (13년 사업체수/09년 사업체수)^(1/(2013-2009))-1</br>
※ 해당업종(9차 표준산업분류): 제과점업(세세분류 코드: 56191)');

insert into srv_dt_statthemamap values(
'rxHIwKrEnH20141209162146160n5xrp8xJIy',
'CTGR_003',
'admin',
'슈퍼마켓 변화, 2009-2013',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/smallBizMarket/smallBizMarket.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2009년~2013년 전국사업체조사',
'이 주제도는 2009년 부터 2013년 사이에 슈퍼마켓의 수가 어떻게 변했는지를 나타냅니다. 행정구역별로 슈퍼마켓 수의 연평균성장률(CAGR)을 비교할 수 있고, 각 지역의 연도별 사업체 수 변화를 확인할 수 있습니다.</br>
※ 출처 : 통계청, 2009~2013년 전국사업체조사</br>
※ 연평균증감율(CAGR) : (13년 사업체수/09년 사업체수)^(1/(2013-2009))-1</br>
※ 해당업종(9차 표준산업분류): 기타 음·식료품 위주 종합 소매업(세세분류 코드: 47129)');

insert into srv_dt_statthemamap values(
'qoJxtz1Ms020141209171203817n0s3HMKLCp',
'CTGR_003',
'admin',
'치킨전문점 변화, 2009-2013',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/smallBizChickenshop/smallBizChickenshop.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2009년~2013년 전국사업체조사',
'이 주제도는 2009년 부터 2013년 사이에 치킨전문점의 수가 어떻게 변했는지를 나타냅니다. 행정구역별로 치킨전문점 수의 연평균성장률(CAGR)을 비교할 수 있고, 각 지역의 연도별 사업체 수 변화를 확인할 수 있습니다.</br>
※ 출처 : 통계청, 2009~2013년 전국사업체조사</br>
※ 연평균증감율(CAGR) : (13년 사업체수/09년 사업체수)^(1/(2013-2009))-1</br>
※ 해당업종(9차 표준산업분류): 치킨전문점(세세분류 코드: 56191)');

insert into srv_dt_statthemamap values(
'LzH7KLnGJz20141209170816739vqttzpq2oI',
'CTGR_003',
'admin',
'커피전문점 변화, 2009-2013',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/smallBizCoffeeshop/smallBizCoffeeshop.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2009년~2013년 전국사업체조사',
'이 주제도는 2009년 부터 2013년 사이에 커피전문점의 수가 어떻게 변했는지를 나타냅니다. 행정구역별로 커피전문점 수의 연평균성장률(CAGR)을 비교할 수 있고, 각 지역의 연도별 사업체 수 변화를 확인할 수 있습니다.</br>
※ 출처 : 통계청, 2009~2013년 전국사업체조사</br>
※ 연평균증감율(CAGR) : (13년 사업체수/09년 사업체수)^(1/(2013-2009))-1</br>
※ 해당업종(9차 표준산업분류): 비알콜 음료점업(세세분류 코드: 56220)');

insert into srv_dt_statthemamap values(
'q7MJFKFMM920141209170632104rxCJqEy0Jx',
'CTGR_003',
'admin',
'PC방 변화, 2009-2013',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/smallBizPCRoom/smallBizPCRoom.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2009년~2013년 전국사업체조사',
'이 주제도는 2009년부터 2013년 사이에 PC방의 수가 얼마나 줄었는지를 나타냅니다. 행정구역별로 PC방의 증감율을 비교할 수 있고, 각 지역의 연도별 사업체수 변화를 확인할 수 있습니다. </br>
※ 출처 : 통계청, 2009~2013년 전국사업체조사</br>
※ 연평균증감율(CAGR) : (13년 사업체수/09년 사업체수)^(1/(2013-2009))-1</br>
※ 해당업종(9차 표준산업분류): 컴퓨터 게임방 운영업(91222)');

insert into srv_dt_statthemamap values(
'JuFEsCrrKz20141120153720188vLFH5LD65p',
'CTGR_003',
'admin',
'치킨점 1개당 인구수(인구와 치킨전문점 현황), 2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/pplTnChicken/pplTnChicken.html',
'Y',
'0',
'단일뷰, POI 정보',
'통계청, 2010년 인구주택총조사, 2010년 전국사업체조사',
'특별한 기술 없이도 소자본 창업이 가능한 치킨전문점과 인구분포를 치킨전문점 위치와 함께 작성된 주제도</br>
※ 출처 : 통계청, 2010년 인구주택총조사, 2010년 전국사업체조사</br>
※ 산술식 : 치킨전문점 한 개당 인구 (인구/치킨전문점 수)</br>
※ 해당업종(9차 표준산업분류): 치킨전문점(세세분류 코드: 56191)');

insert into srv_dt_statthemamap values(
'LIoD9spJsF20141209180110127nEMCCIKsxC',
'CTGR_003',
'admin',
'주택유지보수 업체 변화, 2009-2013',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/houseMaintenanceCond/houseMaintenanceCond.html',
'Y',
'0',
'단일뷰, 막대그래프',
'통계청, 2009년~2013년 전국사업체조사',
'이 주제도는 2009년부터 2013년 사이에 주택유지보수 관련 업종의 수가 얼마나 줄었는지를 나타냅니다. 
행정구역별로 주택유지보수 관련 업종의 증감율을 비교할 수 있고, 각 지역의 연도별 사업체수 변화를 확인할 수 있습니다. </br>
※ 출처 : 통계청, 2009~2013년 전국사업체조사</br>
※ 연평균증감율(CAGR) : (13년 사업체수/09년 사업체수)^(1/(2013-2009))-1</br>
※ 해당업종(9차 표준산업분류): 철물 및 난방용구 소매업(47511), 벽지 및 장판류 소매업(47513), 페인트, 유리 및 기타 건설자재 소매업(47519), 배관 및 냉·난방 공사업(42201), 금속 문, 창, 셔터 및 관련제품 제조업(25111)');

insert into srv_dt_statthemamap values(
'JuJoHLMK7t20141203203825530qItILsrDDu',
'CTGR_003',
'admin',
'주택유지보수 업체 1개당 단독, 연립, 다세대 주택수, 2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/lifeAndEconomy/multiCorpDist/multiCorpDist.html',
'Y',
'0',
'단일뷰, POI 정보',
'통계청, 2010년 인구주택총조사, 2010년 전국사업체조사',
'주택유지보수 관련 업종은 단독/연립/다세대 주택이 밀집한 지역에 주로 분포하는 경향을 나타냅니다. 이 주제도는 점포당 가구 비율을 나타내며, 읍/면/동 단위로 조회할 경우 관련 사업체의 위치가 표시됩니다.</br>
※ 출처 : 통계청, 2010년 인구주택총조사, 2010년 전국사업체조사</br>
※ 산술식 : (단독.연립,다세대)호/관련업종수</br>
※ 해당업종(9차 표준산업분류): 철물 및 난방용구 소매업(47511), 벽지 및 장판류 소매업(47513), 페인트, 유리 및 기타 건설자재 소매업(47519), 배관 및 냉·난방 공사업(42201), 금속 문, 창, 셔터 및 관련제품 제조업(25111), 유리 및 창호 공사업(42420), 미장, 타일 및 방수 공사업(42491)');






--insert into srv_dt_statthemamap values(
--'xz8y899Ivy20141203173542159w8wxFroHqK',
--'CTGR_004',
--'admin',
--'화재사고 사망자  증감현황',
--sysdate,
--'02',
--'01',
--'11',
--'STATE',
--'/html/thematicMap/other/environment/fireAccident/fireAccident.html',
--'Y',
--'0',
--'단일뷰, 막대그래프',
--'국민안전처, 1997~2011년 시도별 화재발생 현황',
--'이 주제도는 1997년 부터 2011년 사이에 화재 사고 1,000건 당 사망자수가 어떻게 변했는지를 나타냅니다. 
--시/도별로 화재 1,000건 당 사망자 수의 연평균성장률(CAGR)을 비교할 수 있고, 각 지역의 연도별 비율의 변화를 확인할 수 있습니다.</br>
--※ 출처 : 국민안전처, 1997~2011년 시도별 화재발생 현황');

insert into srv_dt_statthemamap values(
'rGFwIoqopx20141128100619767oLDK4xMLz6',
'CTGR_004',
'admin',
'화학물질 배출현황, 1999-2012',
sysdate,
'02',
'01',
'11',
'STATE',
'/html/thematicMap/other/environment/chemicalSubstance/chemicalSubstance.html',
'Y',
'0',
'분할뷰',
'환경부, 1999, 2012년 지역별 화학물질 배출량·이동량',
'이 주제도는 1999년과 2012년을 기준으로 화학물질 배출량이 얼마나 달라졌는지를 나타냅니다. 분할된 화면을 통해 시/도간의 화학물질배출량의 변화를 비교할 수 있습니다.</br>
※ 출처 : 환경부, 1999, 2012년 지역별 화학물질 배출량·이동량');

insert into srv_dt_statthemamap values(
'DqELMs7MHp20141030095407754xrJFwI7ps ',
'CTGR_004',
'admin',
'30년이상 노후주택 분포현황, 2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/environment/oldhouse/oldhouse.html',
'Y',
'0',
'단일뷰',
'통계청, 2010년 인구주택총조사',
'이 주제도는 건축년도가 30년 이상된 노후 주택 수(호)를 나타내며, 행정구역별로 노후 주택 수를 비교할 수 있습니다.</br>
※ 출처 : 통계청, 2010년 인구주택총조사');

insert into srv_dt_statthemamap values(
'tx8t4xrxwM20141030095412805qzpoEuxqMK',
'CTGR_004',
'admin',
'2,30대 여성 1인가구와 치안시설 분포현황, 2010',
sysdate,
'02',
'03',
'11',
'STATE',
'/html/thematicMap/other/environment/publicPeace/publicPeace.html',
'Y',
'0',
'단일뷰, POI 정보',
'통계청, 2010년 인구주택총조사, 2010년 전국사업체조사',
'이 주제도는 파출소 등의 치안시설 1개당 2, 30대 자취 여성인구 비율을 나타내며, 읍/면/동 단위로 조회할 경우 치안시설의 위치가 표시됩니다.</br>
※ 출처 : 통계청, 2010년 인구주택총조사, 2010년 전국사업체조사</br>
※ 산술식 : 20~30대 여성 1인가구 / 치안시설 수</br>
※ 해당업종(9차 표준산업분류): 경찰(84404)');




