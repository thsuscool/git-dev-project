<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>산업단지 상세정보</title>
	<link href="/css/common.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/map/technicalBiz.css">  
	<link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	<script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	<script type="text/javascript" src="/js/technicalBiz/technicalBizMapIndustryPopup.js"></script>  
</head>
<body>
	<div>
		<div class='dimbox'>
			<div class='cont'>
				<div class='dimAreaScroll' style="height:auto;">
					<div class='dimAreaBox'>
						<p class='dabSubj' id="complex_nm"></p>
						<div class='mDetailArea'>
							<div class='mCont'>
								<div class='tit'>
									<span class='t01'>1. 조성목적 및 특징</span>
								</div>
								<table class='mContTable'>
									<tr>
										<td id="make_purps_chartr"></td> 
									</tr>
								</table>
								<div class='tit mt20'>
									<span class='t01'>2. 사업시행자/관리기관</span>
								</div>
								<table class='mContTable'>
									<tr>
										<td id="implementer_mgmt_inst"></td> 
									</tr>
								</table> 
								<div class='tit mt20'>
									<span class='t01'>3. 위치</span>
								</div>
								<table class='mContTable'>
									<tr>
										<td id="lc"></td> 
									</tr>
								</table>
								<div class='tit mt20'>
									<span class='t01'>4. 관리면적</span>
								</div>
								<table class='mContTable'>
									<colgroup>
										<col width='100' />
									</colgroup>
									<tr class='ac'>
										<th rowspan='2'>관리면적<br />(건㎡)</th>
										<td>총면적</td>
										<td>산업시설구역</td>
										<td>지원시설구역</td>
										<td>공공시설구역</td>
										<td>녹지구역</td>
										<td>주거구역</td>
										<td>기타</td>  
									</tr>
									<tr class='ar'>
										<td style='text-align:center;'><span id="tot_area"></span></td>
										<td style='text-align:center;'><span id="induty_fac_zone_area"></span></td>
										<td style='text-align:center;'><span id="support_fac_zone_area"></span></td>
										<td style='text-align:center;'><span id="pub_fac_zone_area"></span></td>
										<td style='text-align:center;'><span id="green_zone_area"></span></td>
										<td style='text-align:center;'><span id="resid_zone_area"></span></td>
										<td style='text-align:center;'><span id="etc_zone_area"></span></td>
									</tr>
								</table>
								<div class='tit mt20'>
									<span class='t01'>5. 입지조건</span>
								</div>
								<table class='mContTable'>
									<colgroup>
										<col width='100' />
									</colgroup>
									<tr>
										<th>입주업종</th>
										<td id="mvn_biz"></td>
									</tr>
									<tr>
										<th>입주자격</th>
										<td id="mvn_limit"></td> 
									</tr>
									<tr>
										<th>입주제한</th>
										<td id="mvn_qualf"></td>
									</tr>
								</table>
							</div>
						</div>
						<p class="etcRight05" style="font-size:11px;color:#c8c9ca;font-weight:normal;magin-top:30px;">출처:국토교통부,산업단지 현황(2015)</p> 
						<p class="etcRight05" style="font-size:11px;color:#c8c9ca;font-weight:normal;margin-top:5px;">출처:한국산업단지공단,한국산업단지총람(2015)</p> 
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>