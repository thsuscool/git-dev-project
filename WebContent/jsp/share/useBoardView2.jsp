<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ page import="kostat.sop.ServiceAPI.common.security.Security" %>
<!-- 세션정보 포함한 jsp임. 개발서버에 올릴때엔 삭제요망 -->
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<%@include file="/jsp/share/imsiLogin.jsp" %>
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<%
	String sgisUseBoardSeq = (String)request.getParameter("sgisUseBoardSeq");
	String sgisUseAreaCd = (String)request.getParameter("sgisUseAreaCd");
	String searchCont = (String)request.getParameter("searchCont");
	String searchGb = (String)request.getParameter("searchGb");
	String nowPage = (String)request.getParameter("nowPage");
	
	//2015-12-10 시큐어코딩
	sgisUseBoardSeq = Security.cleanXss(sgisUseBoardSeq);
	sgisUseAreaCd = Security.cleanXss(sgisUseAreaCd);
	searchCont = Security.cleanXss(searchCont);
	searchGb = Security.cleanXss(searchGb);
	nowPage = Security.cleanXss(nowPage);
	
		
	if("^^".equals(searchCont)){
		searchCont = "";
	}
	
	
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" /><!-- 전화번호 자동 링크 생성 방지 --> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS 통계지리정보서비스</title> 
	<script type="text/javascript"  src="/js/common/includeHead.js"></script>
	<script type="text/javascript" language="javascript">
	
	var sgisUseBoardSeq = "<%=sgisUseBoardSeq%>";
	var sgisUseAreaCd = "<%=sgisUseAreaCd%>";
	var searchCont = "<%=searchCont%>";
	var searchGb = "<%=searchGb%>";
	var nowPage = "<%=nowPage%>";

	 $(function () {
		init();
		
		$("#firstBtn").on('click',(function(e){
	//		nowPage = 1;
	//		getUseBoardList();
		
		}));
		$("#listBtn").on('click',(function(e){
			
			var url = "/jsp/share/useBoardList.jsp";
			url += "?nowPage=" + nowPage;
			url += "&searchGb=" + searchGb;
			url += "&searchCont=" + searchCont;
			
			window.location.href(url);
			
		}));
		 
	 });
	 
	 function init(){
		 getUseBoardView();
	 }
	 
	 //활용게시판 상세페이지 불러온다
	 function getUseBoardView(){
		 
		 
		 //검색, 페이징
		 jQuery.ajax({
 	 		type:"POST",
 	 		url: "/ServiceAPI/share/useBoardInfo.json",
 	 		data:{	
 	 				"gubun" 				: "useBoardView",
 	 				"sgisUseBoardSeq" 		: sgisUseBoardSeq,
 	 			  },
 	 		success:function(data){
					var sgisUseBoardTitle = data.result[0].sgis_use_board_title;
					var sgisUseName = data.result[0].sgis_user_name;
					var sgisUseGb = data.result[0].sgis_use_board_gb;
					var sgisUsePurpose = data.result[0].sgis_use_purpose;
					var sgisUseAreaCd = data.result[0].sgis_use_area_cd;
					var sgisUseData = data.result[0].sgis_use_data;
					var sgisUseDataOther = data.result[0].sgis_use_data_other;
					var sgisActCont = data.result[0].sgis_act_cont;
					var sgisSiteUrl = data.result[0].sgisSiteUrl;
					var sgisRefData1 = data.result[0].sgis_ref_data1;
					var sgisRefData2 = data.result[0].sgis_ref_data2;
					var sgisRefData3 = data.result[0].sgis_ref_data3;
					var sgisRefData4 = data.result[0].sgis_ref_data4;
					var sgisRefImage = data.result[0].sgis_ref_image;
					var sgisProgressStat = data.result[0].sgis_progress_stat;
					
					$("#sgisUseBoardTitle").html(sgisUseBoardTitle);
					$("#sgisUseName").html(sgisUseName);
					$("#sgisUseGb").html(sgisUseGb);
					$("#sgisUsePurpose").html(sgisUsePurpose);
					$("#sgisUseAreaCd").html(sgisUseAreaCd);
					$("#sgisUseData").html(sgisUseData);
					$("#sgisUseDataOther").html(sgisUseDataOther);
					$("#sgisActCont").html(sgisActCont);
					$("#sgisSiteUrl").html(sgisSiteUrl);
					$("#sgisRefData1").html(sgisRefData1);
					$("#sgisRefData2").html(sgisRefData2);
					$("#sgisRefData3").html(sgisRefData3);
					$("#sgisRefData4").html(sgisRefData4);
					$("#sgisRefImage").html(sgisRefImage);
					$("#sgisProgressStat").html(sgisProgressStat);
				
 	 		},
 	 		error:function(data) {
 	 			
 	 		}
 		});
	 }
	 
	</script>
	</head>

	<body >
		<div class="wrapper">
			<!-- cls:header start -->
			<div class="header"> 
			<!-- top  탑영역-->
		  	<!-- /top -->			
  			</div><!-- cls:header end -->


			<!-- cls:contents start -->
			<div class="contents subbg">
				<div class="container">
					<div class="lnb">
					</div>
			제목 : <span id="sgisUseBoardTitle"></span>					<br />
			활용자명 : <span id="sgisUseName"></span>				<br />	
			구분 : <span id="sgisUseGb"></span>					<br />
			활용목적 : <span id="sgisUsePurpose"></span>					<br />
			활용분야 : <span id="sgisUseAreaCd"></span>					<br />
			이용자료 통계청 : <span id="sgisUseData"></span>					<br />
			이요자료 타기관 : <span id="sgisUseDataOther"></span>					<br />
			주요활동내용 : <span id="sgisActCont"></span>					<br />
			사이트 URL : <span id="sgisSiteUrl"></span>					<br />
			참고자료1 : <span id="sgisRefData1"></span>					<br />
			참고자료2 : <span id="sgisRefData2"></span>					<br />
			참고자료3 : <span id="sgisRefData3"></span>					<br />
			참고자료4 : <span id="sgisRefData4"></span>					<br />
			대표이미지/분석결과 : <span id="sgisRefImage"></span>					<br />
			진행단계 : <span id="sgisProgressStat"></span>					<br />
			
			<input type="button" value="목록" id="listBtn" />

			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
			</div><!-- cls:footer end -->
		</div> 
	</div>
	</body>
</html>