<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>운영이력관리 | 통계청SGIS 오픈플랫폼</title>
    
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />
	
	<link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/data.css" />
	
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="/contents/css/2014_css/css/default.css" /> 
    
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script type="text/javascript" src="/js/common/common.js"></script>
    
    <script src="/js/reqBoard/reqBoardView.js"></script>
		
	<style type="text/css">
		.toggleBtn {
		    align-items: flex-start;
		    text-align: center;
		    cursor: default;
		    color: buttontext;
		    background-color: buttonface;
		    box-sizing: border-box;
		    padding: 2px 6px 3px;
		    border-width: 2px;
		    border-style: outset;
		    border-color: buttonface;
		    border-image: initial;
		}
		
		.reqBtn, .listBtn {
			display: inline-block;
			font-weight: bold;
			color: #ffffff;
			width: 70px;
			height: 30px;
			line-height: 30px;
			border: solid 0px #aaa;
			text-align: center;
			background-color: #3385d3;
			letter-spacing: -0.25px;
		}
		
		.reqBtnBox {
			 text-align:right;
			 margin-top: 20px;
			 margin-bottom: 10px;
		}
		
		.display-none {
			display:none;
		}
		
	</style>			
	
<script type="text/javascript" language="javascript">
$(function(){
})	
//<![CDATA[
           
pageCallReg();
           
//alert(AuthInfo.authStatus);

</script>
</head>

<body>
	<div id="wrap">
		<header> 
		<!-- Top Include --> 
		<jsp:include page="/view/common/includeSearch"></jsp:include> 
		</header>
		<div id="container">
			<p class="path">
				
			</p>
			<h2 class="ctit">운영이력관리</h2>
			<br/>
		
			<div id="contents">
				<div class="content">				
					<div class="reqBtnBox">
						<a class="listBtn" href="#" onclick="return false;">목록</a>
					</div>
					
					<div class="tilte03" style="width: 100%;">
						요청정보 <button class="toggleBtn toggle-on" style="cursor: pointer">-</button>
					</div>
					<div>
						<div class="step1">
							<form id="resetForm" method="post" enctype="multipart/form-data">
								<table class="useTable" summary="요청정보">
									<caption>요청정보</caption>
									<colgroup>
										<col width="141"/>
										<col width="200"/>
										<col width="141"/>
										<col width=""/>
									</colgroup>
									<tbody>
										<tr>
											<th>등록일</th>
											<td>										
												<span id="REQ_DT"></span>
											</td>
											<th>요청자</th>
											<td>
												<span id="REQ_USER_NM"></span>
											</td>	
										</tr>	
										<tr>
											<th>작업구분</th>
											<td>										
												<span id="REQ_DIV_CD_NM"></span>
											</td>
											<th>진행상태</th>
											<td>
												<span id="REQ_PRGRS_STATS_CD_NM"></span>
											</td>
										</tr>	
										<tr>
											<th>제목</th>
											<td colspan="3">								
												<span id="REQ_TITLE"></span>
											</td>
										</tr>		
										<tr>
											<th>내용</th>
											<td colspan="3">
												<span id="REQ_CONTENT"></span>									
											</td>	
										</tr>
										<tr>
											<th>첨부파일</th>
											<td colspan="3" id="reqFile"></td>
										</tr>
									</tbody>
								</table>
							</form>
							
							<table class="useTable" summary="접수정보" style="margin-top: 10px;">
								<caption>접수정보</caption>
								<colgroup>
									<col width="141"/>
									<col width="200"/>
									<col width="141"/>
									<col width=""/>
								</colgroup>
								<tbody>
									<tr>
										<th>접수일</th>
										<td>										
											<span id="RECV_DT"></span>
										</td>
										<th>접수자</th>
										<td>										
											<input type="text" class="input_use13" id="RECV_USER_NM" maxlength="30" value=""/>
										</td>	
									</tr>	
								</tbody>
							</table>
							<div class="reqBtnBox recv">
								<a class="reqBtn" href="#" data-statscd="02" onclick="return false;">접수</a>
							</div>
						</div>
						
						<div class="step2-1 display-none" id="prgrsDiv" style="margin-top: 10px;">
							<table class="useTable" summary="진행정보" style="margin-top: 10px;">
								<caption>진행정보</caption>
								<colgroup>
									<col width="141">
									<col width="200">
									<col width="141">
									<col width="">
								</colgroup>
								<tbody>
									<tr>
										<th>진행일</th>
										<td>										
											<span id="PRGRS_DT"></span>
										</td>
										<th>진행자</th>
										<td>										
											<input type="text" class="input_use13" id="PRGRS_USER_NM" maxlength="30" value="">
										</td>	
									</tr>	
								</tbody>
							</table>
						
							<div class="reqBtnBox prgrs">
								<a class="reqBtn" href="#" data-statscd="05" onclick="return false;">진행</a>
							</div>
						</div>
					</div>
				</div>
			
			<div class="step2-2 display-none" id="modReq" style="margin-top: 10px;">
				<div class="tilte03" style="width: 100%;">
					변경요청 <button class="toggleBtn" style="cursor: pointer">+</button>
				</div>
				<div class="display-none"> 
					<table class="useTable" summary="변경요청">
						<caption>변경요청</caption>
						<colgroup>
							<col width="141">
							<col width="200">
							<col width="141">
							<col width="">
						</colgroup>
						<tbody>
							<tr>
								<th>변경요청이력</th>
								<td colspan="3">
									<span id="MOD_REQ_CONTENT"></span>
								</td>
							</tr>
							<tr>
								<th>변경후요청이력</th>
								<td colspan="3">
									<span id="MOD_AFTER_REQ_CONTENT"></span>
								</td>
							</tr>
							<tr>
								<th>변경후요청일</th>
								<td colspan="3">										
									<span id="MOD_AFTER_REQ_DT"></span>
								</td>
							</tr>
							<tr>
								<th>변경요청</th>
								<td colspan="3">
									<textarea rows="5" cols="100" class="input_use15" id="_MOD_REQ_CONTENT" style="resize:none" maxlength="1300"></textarea>				
								</td>
							</tr>
							<tr>
								<th>변경요청일</th>
								<td>	
									<span id="MOD_REQ_DT"></span>			
								</td>
								<th>변경요청자</th>
								<td>	
									<input type="text" class="input_use13" id="MOD_REQ_USER_NM" maxlength="30" value="">			
								</td>
							</tr>
						</tbody>
					</table>
					
					<div class="reqBtnBox">
						<a class="reqBtn" href="#" data-statscd="03" onclick="return false;">변경요청</a>
					</div>
				</div>
			</div>
			
			<div class="step3 display-none" style="margin-top: 10px;">
				<div class="tilte03" style="width: 100%;">
					확인요청 <button class="toggleBtn" style="cursor: pointer">+</button>
				</div>
				<div class="display-none">
					<table class="useTable" summary="확인요청">
						<caption>확인요청</caption>
						<colgroup>
							<col width="141"/>
							<col width="200"/>
							<col width="141"/>
							<col width=""/>
						</colgroup>
						<tbody>
							<tr>
								<th>확인요청이력</th>
								<td colspan="3">										
									<span id="WORK_CONTENT"></span>
								</td>
							</tr>
							<tr>
								<th>추가요청이력</th>
								<td colspan="3">			
									<span id="RE_REQ_CONTENT"></span>
								</td>
							</tr>
							<tr>
								<th>추가요청일</th>
								<td colspan="3">							
									<span id="RE_REQ_DT"></span>
								</td>
							</tr>
							<tr>
								<th>확인요청</th>
								<td colspan="3">									
									<textarea rows="5" cols="100" class="input_use15" id="_WORK_CONTENT" style="resize:none" maxlength="1300"></textarea>
								</td>
							</tr>
							<tr>
								<th>확인요청일</th>
								<td>			
									<span id="WORK_COMPLETE_DT"></span>							
								</td>
								<th>확인요청자</th>
								<td>			
									<input type="text" class="input_use13" id="WORK_USER_NM" maxlength="30" value="">							
								</td>
							</tr>
						</tbody>
					</table>
					
					<div class="reqBtnBox">
						<a class="reqBtn" href="#" data-statscd="06" onclick="return false;">확인요청</a>
					</div>
					<br/>
				</div>
			</div>
		</div>
			
			<footer id="footer"> <jsp:include page="/view/common/includeBottom"></jsp:include> </footer>
		</div> 
	</body>
</html>