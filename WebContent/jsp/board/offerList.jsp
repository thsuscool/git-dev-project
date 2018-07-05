<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<style scoped="scoped">
	td {font-weight: bold;}
	#offerTB td{padding: 5px;}
	#tbHeader th{font-size: 17px; background-color: #A9D0F5;} <!-- 2017.12.27 [개발팀] 접근성조치  -->
	#offerHead {font-weight: bold; font-size: 18px;}
</style>
<p id="offerHead" style="font-family: 'HY강B'; text-align: right;">2018.3. 현재</p>
<table id="offerTb" style="text-align: center; width: 100%" summary="SGIS 서비스 자료제공시점현황"> <!-- 2017.12.27 [개발팀] 접근성조치  -->
	<caption>SGIS 서비스 자료제공시점현황</caption> <!-- 2017.12.27 [개발팀] 접근성조치  -->
	<tr id="tbHeader">
		<th style="width: 5%;" scope="col">번호</th>	<!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 22%;" scope="col">자료명</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 28%;" scope="col">활용 서비스</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 20%;" scope="col">작성기관</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 15%;" scope="col">제공기준 시점</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 10%;" scope="col">비 고</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
	</tr>
	<tr>
		<td>1</td>
		<td>인구주택총조사결과<br/>(등록센서스)
		</td>
		<td rowspan="4">공통 활용</td>
		<td rowspan="4">통계청</td>
		<td>2016.11.1.</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>인구주택총조사결과<br>(표본 항목)
		</td>
		<td>2015.11.1.</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>전국사업체조사결과</td>
		<td>2016.12.31.</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>농림어업총조사결과</td>
		<td>2015.12.1.</td>
		<td></td>
	</tr>
	<tr>
		<td>5</td>
		<td>주택실거래가</td>
		<td>살고싶은 우리동네,<br/>우리동네 생활업종</td>
		<td>국토교통부</td>
		<td>2016.1.1.～<br/>2017.6.30.</td>
		<td>㎡당 가격 평균</td>
	</tr>
	<tr>
		<td>6</td>
		<td>공시지가</td>
		<td>살고싶은 우리동네,<br/>우리동네 생활업종</td>
		<td>국토교통부</td>
		<td>2017.1.1.</td>
		<td></td>
	</tr>
	<tr>
		<td>7</td>
		<td>버스정류장 위치 정보</td>
		<td rowspan="2">대화형 통계지도,<br/>우리동네 생활업종</td>
		<td>교통안전공단</td>
		<td>2017.6.30.</td>
		<td></td>
	</tr>
	<tr>
		<td>8</td>
		<td>지하철 승하차 현황</td>
		<td>철도 노선별<br/>관리 기관</td>
		<td>2016.7.1.～<br/>2016.6.30.</td>
		<td>일, 월,<br/>요일별 평균</td>
	</tr>
	<tr>
		<td>9</td>
		<td>상권정보</td>
		<td>우리동네 생활업종</td>
		<td>중소기업청</td>
		<td>2015년</td>
		<td></td>
	</tr>
	<tr>
		<td>10</td>
		<td>대기오염도</td>
		<td>살고싶은 우리 동네,<br/>통계주제도</td>
		<td>국립환경과학원</td>
		<td>2016.1.～<br/>2016.12.</td>
		<td>연평균</td>
	</tr>
	<tr>
		<td>11</td>
		<td>화재안전지수(등급)</td>
		<td rowspan="6">살고싶은 우리동네</td>
		<td rowspan="2">행정안전부</td>
		<td rowspan="2">2016년</td>
		<td></td>
	</tr>
	<tr>
		<td>12</td>
		<td>교통안전지수(등급)</td>	
		<td></td>	
	</tr>
	<tr>
		<td>13</td>
		<td>녹지비율</td>
		<td>환경부</td>
		<td>2014.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>14</td>
		<td>학 구 도</td>
		<td>교육시설환경<br/>연구센터</td>
		<td>2017.9.</td>
		<td></td>
	</tr>
	<tr>
		<td>15</td>
		<td>체감온도</td>
		<td rowspan="2">기상청</td>
		<td>2016.11.1.～<br/>2017.3.31.</td>
		<td rowspan="2">평균</td>
	</tr>
	<tr>
		<td>16</td>
		<td>불쾌지수</td>
		<td>2017.6.1.～<br/>2017.9.30.</td>
	</tr>
	<tr>
		<td>17</td>
		<td>교통사고</td>
		<td rowspan="3">통계주제도</td>
		<td>도로교통공단</td>
		<td>2017년판</td>
		<td>'16년 자료</td>
	</tr>
	<tr>
		<td>18</td>
		<td>기초생활수급자</td>
		<td>보건복지부</td>
		<td>2016.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>19</td>
		<td>문화재분포현황</td>
		<td>문화재청</td>
		<td>2016.6.</td>
		<td></td>
	</tr>
	<tr>
		<td>20</td>
		<td>주민등록인구</td>
		<td>살고싶은 우리동네,<br/>통계주제도</td>
		<td>행정안전부</td>
		<td rowspan="2">2016.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>21</td>
		<td>인구이동통계</td>
		<td rowspan="30">통계주제도</td>
		<td>통계청</td>
		<td></td>
	</tr>
	<tr>
		<td>22</td>
		<td>시군구별 외국인<br/>주민 현황</td>
		<td>행정안전부</td>
		<td>2016.11.</td>
		<td></td>
	</tr>
	<tr>
		<td>23</td>
		<td>결혼기간 10년 이하<br/>가구의 주택 점유형태
		</td>
		<td>통계청</td>
		<td>2014.11.</td>
		<td>'10년 자료</td>
	</tr>
	<tr>
		<td>24</td>
		<td>자동차 등록대수</td>
		<td rowspan="2">국토교통부</td>
		<td rowspan="3">2016.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>25</td>
		<td>노외주차장 현황</td>
		<td></td>
	</tr>
	<tr>
		<td>26</td>
		<td>주택의 매매가격 상승률</td>
		<td>한국감정원</td>
		<td></td>
	</tr>
	<tr>
		<td>27</td>
		<td>의료기관 병상수, 의사수</td>
		<td>행정자치부</td>
		<td>2015.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>28</td>
		<td>65세 이상 장기요양<br/>급여자 현황</td>
		<td>국민건강관리공단</td>
		<td rowspan="14">2016.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>29</td>
		<td>장애인수</td>
		<td>보건복지부</td>
		<td></td>
	</tr>
	<tr>
		<td>30</td>
		<td>장애인 고용률</td>
		<td>한국장애인고용공단</td>
		<td></td>
	</tr>
	<tr>
		<td>31</td>
		<td>평생교육기관</td>
		<td>한국교육개발원</td>
		<td></td>
	</tr>
	<tr>
		<td>32</td>
		<td>도서관 분포현황</td>
		<td>문화체육관광부</td>
		<td></td>
	</tr>
	<tr>
		<td>33</td>
		<td>교원 1인당 학생수</td>
		<td>한국교육개발원</td>
		<td></td>
	</tr>
	<tr>
		<td>34</td>
		<td>EQ-5D 지표</td>
		<td rowspan="2">보건복지부</td>
		<td></td>
	</tr>
	<tr>
		<td>35</td>
		<td>어린이집/직장어린이집<br/>현황</td>
		<td></td>
	</tr>
	<tr>
		<td>36</td>
		<td>요양기관수 현황</td>
		<td>국민건강보험<br/>공단</td>
		<td></td>
	</tr>
	<tr>
		<td>37</td>
		<td>인구천명당 사설학원 수</td>
		<td>행정안전부</td>
		<td></td>
	</tr>
	<tr>
		<td>38</td>
		<td>취업자 수</td>
		<td rowspan="3">통계청</td>
		<td></td>
	</tr>
	<tr>
		<td>39</td>
		<td>고용률</td>
		<td></td>
	</tr>
	<tr>
		<td>40</td>
		<td>실업률</td>
		<td></td>
	</tr>
	<tr>
		<td>41</td>
		<td>재정자립도 현황</td>
		<td>행정안전부</td>
		<td></td>
	</tr>
	<tr>
		<td>42</td>
		<td>일반폐기물 재활용률</td>
		<td rowspan="2">환경부</td>
		<td rowspan="2">2015.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>43</td>
		<td>폐기물 배출량</td>
		<td></td>
	</tr>
	<tr>
		<td>44</td>
		<td>화재사고 발생건수</td>
		<td>행정안전부</td>
		<td rowspan="3">2016.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>45</td>
		<td>범죄 발생건수</td>
		<td>경찰청</td>
		<td></td>
	</tr>
	<tr>
		<td>46</td>
		<td>음주율, 흡연율</td>
		<td>보건복지부</td>
		<td></td>
	</tr>
	<tr>
		<td>47</td>
		<td>화학물질 배출량</td>
		<td>환경부</td>
		<td>2015.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>48</td>
		<td>소년범죄 발생건수</td>
		<td rowpan="2">행정안전부</td>
		<td rowspan="3">2016.12.</td>
		<td></td>
	</tr>
	<tr>
		<td>49</td>
		<td>119안전센터 1개당<br/>담당주민 수</td>
		<td>국토교통부</td>
		<td></td>
	</tr>
	<tr>
		<td>50</td>
		<td>재배면적 변화</td>
		<td rowspan="5">통계청</td>
		<td></td>
	</tr>
	<tr>
		<td>51</td>
		<td>고용동향</td>
		<td rowspan="4">분석지도(월간통계)</td>
		<td rowspan="4">매월</td>
		<td rowspan="4">보도자료</td>
	</tr>
	<tr>
		<td>52</td>
		<td>산업활동동향</td>
	</tr>
	<tr>
		<td>53</td>
		<td>소비자물가동향</td>
	</tr>
	<tr>
		<td>54</td>
		<td>인구동향</td>
	</tr>
</table>