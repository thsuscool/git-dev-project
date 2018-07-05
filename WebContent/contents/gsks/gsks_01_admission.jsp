<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>
    
  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">사용자 관리</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">SGIS유통홈페이지 관리자</a> > <a href="#">사용자관리</a></li>
      </ul>
    </div>
     <div class="content_admin">

 <div class="agreement_form">
		<div class="agreement_form_tip"><img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" /> 필수입력항목입니다.</div>
		<table width="734" border="0" cellspacing="0" cellpadding="0" class="table1" summary="마이페이지 개인정보입니다.">
		  <caption>
		  마이페이지 개인정보
		  </caption>

		  <tr>
			<th width="110" class="td_top">아이디<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="td_top t_end">
			<label>
			  <input name="textfield" type="text" size="20" />
			</label></td>
		  </tr>
		  <tr>
			<th>비밀번호<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><input name="textfield2" type="text" size="20" /></td>
		  </tr>
		  <tr>
			<th>비밀번호 확인<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><input name="textfield3" type="text" size="20" /></td>
		  </tr>
		  <tr>
			<th>비밀번호 찾기<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><span class="b_b">질문</span>
		    <input name="textfield4" type="text" size="20" />
		    <span class="b_b">답</span>
		    <input name="textfield5" type="text" size="20" /></td>
		  </tr>
		  <tr>
			<th>이름<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><span class="bla_b">실명인증 후 자동으로 설정</span></td>
		  </tr>
		  <tr>
			<th>생년월일<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><input name="textfield6" type="text" size="20" />
			 [<span class="calender"><a href="javascript:;" onclick="calender_view('on')" onkeypress="calender_view('on')">캘린더보기</a></span>]　예:2008-08-01</td>
		  </tr>
		  <tr>
			<th>성별<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><label>
			  <select name="select">
			    <option>= 선택 =</option>
			    <option>남성</option>
			    <option>여성</option>
		      </select>
			</label></td>
		  </tr>
		  <tr>
			<th>이메일<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><input name="textfield7" type="text" size="20" /></td>
		  </tr>
		  <tr>
			<th>주소<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><input name="textfield8" type="text" size="4" />
			  -
		      <input name="textfield9" type="text" size="4" />
		      <a href="javascript:;" onclick="MM_openBrWindow('/contents/11member/popup_zone_number.jsp','','width=369,height=318')" onkeypress="MM_openBrWindow('/contents/11member/popup_zone_number.jsp','','width=369,height=318')"><img src="/contents/11member//images/button_zone_number.gif" alt="우편번호 검색" border="0" /></a>
		      <br />
		      <input name="textfield10" type="text" size="40" />
		      <br />
		      <input name="textfield11" type="text" size="40" /></td>
		  </tr>
		  <tr>
			<th>전화번호<img src="/contents/11member/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
			<td class="t_end"><input name="textfield12" type="text" size="4" />
			  -
		      <input name="textfield13" type="text" size="4" />
		      -
		      <input name="textfield14" type="text" size="4" /></td>
		  </tr>
		  <tr>
			<th>휴대폰번호</th>
			<td class="t_end"><input name="textfield15" type="text" size="4" />
			  -
		      <input name="textfield16" type="text" size="4" />
		      -
		      <input name="textfield17" type="text" size="4" /></td>
		  </tr>
		  <tr>
			<th>관심지역</th>
			<td class="t_end"><input name="textfield18" type="text" size="20" />
		    <a href="javascript:;" onClick="MM_openBrWindow('/contents/11member/popup_town_search.jsp','','width=369,height=318')" onkeypress="MM_openBrWindow('/contents/11member/popup_town_search.jsp','','width=369,height=318')"><img src="/contents/11member//images/button_town.gif" alt="읍ㆍ면ㆍ동 찾기" border="0" /></a></td>
		  </tr>
		  <tr>
			<th>직업분류</th>
			<td class="t_end"><select name="select2">
			  <option>= 선택 =</option>
			  <option>공공/정부기관</option>
			  <option>교육/연구기관</option>
			  <option>기업체</option>
			  <option>언론사</option>
			  <option>학생</option>
			  <option>기타</option>
			  </select>			</td>
		  </tr>
		  <tr>
		    <th>직장정보</th>
		    <td class="t_end"><span class="workplace_text">직장명(소속)</span> <input name="textfield19" type="text" size="13" />
		    <span class="workplace_text left_mar_5">부서</span> <input name="textfield20" type="text" size="13" />
		    <span class="workplace_text left_mar_5">직책</span> <input name="textfield21" type="text" size="13" /></td>
	      </tr>
		  <tr>
		    <th>이용빈도</th>
		    <td class="t_end"><select name="select2">
			  <option>= 선택 =</option>
			  <option>거의매일</option>
			  <option>한달에10회 이상</option>
			  <option>한달에 5~10회</option>
			  <option>한달에 1~5회</option>
			  <option>가끔</option>
			  </select>		</td>
	      </tr>
		  <tr>
		    <th>이용부문</th>
		    <td class="t_end"><input name="textfield11" type="text" size="40" /></td>
	      </tr>
		  <tr>
			<th>만족도</th>
			<td class="t_end"><select name="select2">
			  <option>= 선택 =</option>
			  <option>매우만족</option>
			  <option>만족</option>
			  <option>보통</option>
			  <option>불만족</option>
			  <option>매우불만족</option>
			  </select>		</td>
		  </tr>
		</table>
		</div>
		<div class="center top_mar_20"><a href="#"><img src="/contents/11member/images/button_ok.gif" alt="확인" border="0" /></a><a href="#"><img src="/contents/11member//images/button_cancle.gif" alt="취소" border="0" class="left_mar_10" /></a></div>
		<div id="popup_calendar">
		<div class="popup_calendar_button"><a href="#"><img src="/contents/11member/images/popup_calendar_move.gif" alt="이동" border="0" /></a><a href="javascript:;" onclick="calender_view('off')" onkeypress="calender_view('off')"><img src="/contents/11member/images/popup_calendar_close.gif" alt="닫기" border="0" /></a></div>
		  <div class="popup_calendar_wrapper">
		    <div class="popup_calendar_content">
		      <div class="popup_calendar_top">
		        <ul>
		          <li class="arrow1"><img src="/contents/11member/images/bullet_arrow01.gif" alt="이전달" /></li>
	     <li class="month">11월</li>
	     <li class="year">2008년</li>
	     <li class="year_icon"><a href="#"><img src="/contents/11member/images/bullet_arrow03.gif" alt="작년" border="0" /></a><a href="#"><img src="/contents/11member/images/bullet_arrow04.gif" alt="내년" border="0" /></a></li>
	     <li class="arrow2"><img src="/contents/11member/images/bullet_arrow02.gif" alt="다음달" /></li>
       </ul>
       <div class="clear"></div>
     </div>
     <div class="popup_calendar_table">
       <table width="176" border="0" cellspacing="0" cellpadding="0" class="table_caledar" summary="생년월일 선택 달력입니다.">
         <caption>생년월일 달력</caption>
         <tr>
           <th>일</th>
           <th>월</th>
           <th>화</th>
           <th>수</th>
           <th>목</th>
           <th>금</th>
           <th>토</th>
         </tr>
         <tr>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td>1</td>
         </tr>
         <tr>
           <td>2</td>
           <td>3</td>
           <td>4</td>
           <td>5</td>
           <td>6</td>
           <td>7</td>
           <td>8</td>
         </tr>
         <tr>
           <td>9</td>
           <td>10</td>
           <td>11</td>
           <td>12</td>
           <td>13</td>
           <td>14</td>
           <td>15</td>
         </tr>
         <tr>
           <td>16</td>
           <td>17</td>
           <td>18</td>
           <td>19</td>
           <td>20</td>
           <td>21</td>
           <td>22</td>
         </tr>
         <tr>
           <td>23</td>
           <td>24</td>
           <td>25</td>
           <td>26</td>
           <td>27</td>
           <td>28</td>
           <td>29</td>
         </tr>
         <tr>
           <td>30</td>
           <td>31</td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
         </tr>
         </table>
     </div>
    </div>
            </div>







  </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
