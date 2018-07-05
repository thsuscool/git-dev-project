<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div id="history-menu-depth-major" class="bk_box">
	<h3>주요지표 선택</h3>
	<div class="bk_cont">
		<div id="API_0301" class="totalResult tr01">
			<div id="mainIndex_box1" class="stepBox mainIndex_stepBox"> 
			    <p class="on">주요지표
			    	<select title="주요지표 조사년도" id="mainIndex_year" name="mainIndex_year" style="font-size:13px;">
			     	</select>
			    </p>
			   	<ul class="dbTypeCk">
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio01" value="tot_ppltn" checked="checked" data-show-name="총인구" data-unit="명"/>
			            <label for="mainIndex_radio01" class="on">총인구(명)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0002}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio02" value="avg_age" data-show-name="평균나이" data-unit="세"/>
			            <label for="mainIndex_radio02">평균나이(세)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0003}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio03" value="ppltn_dnsty" data-show-name="인구밀도" data-unit="명/㎢"/>
			            <label for="mainIndex_radio03">인구밀도(명/㎢)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0004}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio04" value="aged_child_idx" data-show-name="노령화지수" data-unit="일백명당 명"/>
			            <label for="mainIndex_radio04">노령화지수</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0005}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio05" value="oldage_suprt_per" data-show-name="노년부양비" data-unit="일백명당 명"/>
			            <label for="mainIndex_radio05">노년부양비</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0006}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio06" value="juv_suprt_per" data-show-name="유년부양비" data-unit="일백명당 명"/>
			            <label for="mainIndex_radio06">유년부양비</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0007}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio07" value="tot_family" data-show-name="가구" data-unit="가구"/>
			            <label for="mainIndex_radio07">가구(가구)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0008}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio08" value="avg_fmember_cnt" data-show-name="평균 가구원" data-unit="명"/>
			            <label for="mainIndex_radio08">평균 가구원(명)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0009}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio09" value="tot_house" data-show-name="주택" data-unit="호"/>
			            <label for="mainIndex_radio09">주택(호)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0010}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
				</ul>
			</div>
			<div class="stepBox mainIndex_stepBox" id="mainIndex_box2" style="display:none;">
		  		<ul class="dbTypeCk mt10">
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio10" value="nongga_cnt" data-show-name="농가" data-unit="가구"/>
			            <label for="mainIndex_radio10">농가(가구)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0011}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio11" value="nongga_ppltn" data-show-name="농가인구_계" data-unit="명"/>
			            <label for="mainIndex_radio11">농가인구_계(명)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0012}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio12" value="imga_cnt" data-show-name="임가" data-unit="가구"/>
			            <label for="mainIndex_radio12">임가(가구)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0013}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio13" value="imga_ppltn" data-show-name="임가인구_계" data-unit="명"/>
			            <label for="mainIndex_radio13">임가인구_계(명)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0014}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio14" value="naesuoga_cnt" data-show-name="내수면총어가" data-unit="가구"/>
			            <label for="mainIndex_radio14">내수면총어가(가구)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0015}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio15" value="naesuoga_ppltn" data-show-name="노수면어가인구" data-unit="명"/>
			            <label for="mainIndex_radio15">내수면어가인구(명)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0016}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio16" value="haesuoga_cnt" data-show-name="해수면총어가" data-unit="가구"/>
			            <label for="mainIndex_radio16">해수면총어가(가구)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0017}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio17" value="haesuoga_ppltn" data-show-name="해수면어가인구" data-unit="명"/>
			            <label for="mainIndex_radio17">해수면어가인구(명)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0018}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li>
			 	</ul>
			</div>
			<div class="stepBox mainIndex_stepBox"> 
			    <p class="on">사업체 주요지표
			    	<select title="주요지표 조사년도" id="mainIndex_corp_year" name="mainIndex_corp_year" style="font-size:13px;">
			     	</select>
			    </p>
			    <ul class="dbTypeCk mt10">
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio18" value="corp_cnt" data-show-name="사업체수" data-unit="개"/>
			            <label for="mainIndex_radio18">사업체수(개)</label>
			            <a href="#" class="ar" data-subj="주요지표" title="${tooltipList.A0019}"><img src="${pageContext.request.contextPath}/img/ico/ico_tooltip01.png" /></a>
			        </li> 
			    </ul> 
			</div>
		</div>
	</div>
	<div class="cm_make_map_finish"><button class="Finish" type="button">즐겨찾기 생성</button></div>
</div>
