<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<% 
	DbManager footer_dbmgr = null;
	RecordModel rm_cnt = null;
	StringBuffer footer_sb = new StringBuffer(1024);
/*  2012.08.06 -- 요청에 의해 관리자 카운터 전체 주석처리(김종현)
	String today_cnt = "";
	String month_cnt = "";
	String total_cnt = "";
	String this_month = DateTime.getDateString().substring(0,7);
	if(sgis_authid.equals("01")) {
		try{
			//카운트
			footer_dbmgr = new DbManager();

			footer_sb.append(" SELECT TO_CHAR(SUM(1),'9,999,999,999') total_cnt,                                                                                                         \n");
			footer_sb.append("							TO_CHAR(SUM(decode(to_char(sgis_menu_connect_time,'yyyy-mm-dd'), to_char(sysdate,'yyyy-mm-dd'), 1, 0)),'9,999,999,999') today_cnt, \n");
			footer_sb.append("              TO_CHAR(SUM(decode(substr(sgis_menu_connect_time,0,7), :this_month, 1, 0)),'9,999,999,999') month_cnt               \n");
			footer_sb.append("    FROM SGIS_PAGE_LOG                                                                                                                         \n");
			footer_sb.append("  WHERE sgis_menu_d_code_id = '910000'                                                                                                            \n");
			
		//	footer_sb.append(" SELECT TO_CHAR(SUM(1),'9,999,999,999') total_cnt,                                                                                                         \n");
		//	footer_sb.append("		  TO_CHAR(SUM(decode(SGIS_VISIT_DATE, to_char(sysdate,'yyyy-mm-dd'), 1, 0)),'9,999,999,999') today_cnt, \n");
		//	footer_sb.append("        TO_CHAR(SUM(decode(substr(SGIS_VISIT_DATE,0,7), :this_month, 1, 0)),'9,999,999,999') month_cnt               \n");
		//	footer_sb.append("    FROM SGIS_VISIT_COUNTS                                                                                                                        \n");
			
			lData.set("this_month", this_month);
			footer_dbmgr.prepareStatement(footer_sb.toString(), lData);
			rm_cnt = footer_dbmgr.select();

			if(rm_cnt!=null && rm_cnt.next()){
				total_cnt = StringUtil.verify_s((String)rm_cnt.get("total_cnt"));
				today_cnt = StringUtil.verify_s((String)rm_cnt.get("today_cnt"));
				month_cnt = StringUtil.verify_s((String)rm_cnt.get("month_cnt"));
			}
		}catch(Exception e){
			 out.println("------------->"+e);
		}finally{
			footer_dbmgr.close();
		}
	}
*/
%>
<br/><br/>
<div id="footer">
	<div id="footer_con">							
		<dl class="copy">
			<dt><img src="/contents/images/main/sgis_logo2.gif" alt="통계청" /></dt>
			<dd>
				<ul>
					<li><a href="/contents/include/pop_email_collect_no.jsp" onclick="javascript:openMail(); return false;" title="새창열림">이메일 집단 수신거부</a> | <a href="/contents/include/pop_private.jsp" onclick="javascript:openPrivate(); return false;" title="새창열림" >개인정보 처리방침</a></li>
					<li><img src="/contents/images/main/footerAddress_2010.gif" alt="통계청 하단 로고" /><address class="alt">(302-701)대전광역시 서구 청사로 189 통계청콜센터 Tel:02)2012-9114 / SGID담당자 Tel:(042)481-2498 / 자료제공 담당자 Tel : (042)481-2438 COPYRIGHT STATISTICS KOREA. ALL RIGHTS RESERVED SINCE 1996.</address></li>
				</ul>
			</dd>	
		</dl>
<!-- 	2012.08.06 -- 요청에 의해 관리자 카운터 전체 주석처리(김종현)	
		<%  // if(sgis_authid.equals("01")) { //관리자일 경우만 표시(09.10.12 고객요청사항) %>	
		<ul class="today">
			<li>today<span class="num"><% //= today_cnt %>명</span></li>
			<li>This month<span class="num"><% //=month_cnt %>명</span></li>
			<li>Total<span class="num"><% //=total_cnt %>명</span></li>
		</ul>
		<% // }%>
 -->				
	</div>
</div> 

<% if(!sgis_authid.equals("01")) { //관리자일 경우만 표시(09.10.12 고객요청사항) %>	
<div id="family" style="width: 100%; text-align: center">
	<div id="family_sub" style="margin: auto;">  
		<div id="fa_out"> <a onfocus="this.blur()" href="#" onclick="document.getElementById('top1').style.display='block';"><img src="/img/family_top2.gif" alt="열기" border="0"/></a></div>
		<div id="top1"> 
			<a onfocus="this.blur()"  href="#"  onclick="document.getElementById('top1').style.display='none';"><img src="/img/family_top.gif" alt="닫기" style=" border-bottom:2px #bec8cc solid;  margin-bottom: 2px;"/></a><br />
			<ul class="tx01">
				<li><a href="http://www.kostat.go.kr" target="_blank"> 통계청 홈페이지</a></li>
				<li><a href="http://kosis.kr" target="_blank"> 국가통계포털</a></li>
				<li><a href="http://mdss.kostat.go.kr" target="_blank"> 마이크로데이터</a></li>
				<li><a href="http://www.index.go.kr/egams/index.jsp" target="_blank"> e-나라지표</a></li>
				<li><a href="http://kosis.kr/metadata/" target="_blank"> 통계설명자료</a></li>
				<li><a href="http://kostat.go.kr/kssc/main/MainAction.do?method=main&amp;catgrp=kssc" target="_blank"> 통계분류</a></li>
			</ul>
		</div>
	</div>
</div> 
<%} %>