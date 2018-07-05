<%@ page language="java" contentType="text/html;charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@page import="kr.co.offton.jdf.util.DateTime"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>

<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>
<%@page import="java.util.Calendar" %>
<%@page import="java.text.NumberFormat" %>
<%@page import="java.text.SimpleDateFormat" %>
<%@page import="java.util.Date" %>
<%@page import="java.util.GregorianCalendar" %>
<%@page import="java.math.BigDecimal" %>
<%@page import="java.math.MathContext" %>

<%@ include file="/contents/include/logger.jsp"%>

<%

	ConfigManager.getInstance();
	request.setCharacterEncoding("utf-8");
	/*******************************/
	/* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
	/*******************************/
	
	if(seperate.equals("")) lData     = new LData( request );
	else lData     = new LData( request,seperate);
	
  	DbManager dbmgr           = null;
    RecordModel countSet    = null;
    StringBuffer countQuery = new StringBuffer(1024);
    
    
    String nowDate = DateTime.getShortDateString();
    
//    nowDate = "2013" + nowDate.substring(4, 6);		// 현재 년월일
    nowDate = nowDate.substring(0, 6);		// 현재 년월일
    
    
    NumberFormat clsNf = NumberFormat.getInstance();
    
    
     GregorianCalendar today = new GregorianCalendar(java.util.Locale.KOREA);   
	 today.add(GregorianCalendar.MONTH,-1);
	 SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMdd", java.util.Locale.KOREA);
	 String preMonth = formatter.format(today.getTime()).substring(0,6);
%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
	<title>SGIS Open API 모니터링서비스</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/base.css" /> 
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/style.css" /> 
</head>
<body>

	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery_chart.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.pie.js"></script>
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery.flot.categories.js"></script>
	
	<script type="text/javascript">

	$(function() {

	var data = [], 
	series = 5;							//차트를 이루는 데이터 건수를 설정

	for (var i = 0; i < series; i++) {
		data[i] = {
			data: Math.floor(Math.random() * 500) + 1,		//데이터 값을 설정
			label: "데이터" + (i + 1)+":data="				//데이터 이름 설정
		}
	}
		
	var data2 = [], 
	series = 5;							//차트를 이루는 데이터 건수를 설정

	for (var i = 0; i < series; i++) {
		data2[i] = {
			data: Math.floor(Math.random() * 500) + 1,		//데이터 값을 설정
			label: "데이터" + (i + 1)+":data="				//데이터 이름 설정
		}
	}

	var data3 = [], 
	series = 5;							//차트를 이루는 데이터 건수를 설정

	for (var i = 0; i < series; i++) {
		data3[i] = {
			data: Math.floor(Math.random() * 500) + 1,		//데이터 값을 설정
			label: "데이터" + (i + 1)+":data="				//데이터 이름 설정
		}
	}
		var placeholder = $("#placeholder");		//API분포도 좌표
		var placeholder2 = $("#placeholder2");		//API분포도 통계
		var placeholder3 = $("#placeholder3");		//API분포도 센서스
		var placeholder4 = $("#placeholder4");		//월간일일현황모니터링


		
		
		
		///////////////////////////////////////////////////////////////////////////////////
		//6월 막대차트 start
			placeholder4.unbind();

			 var data4 = [  
			    <%
			    //////////////////////////////////////////////////////////////////////////////
			    //월간 일일현황 모니터링 데이터
			    //////////////////////////////////////////////////////////////////////////////
			    try {
					dbmgr = new DbManager();
					
						countQuery.append(" select api_process_date, sum(use_count) as use_count																																				\n");
						countQuery.append(" from sgis_api_log_group																																				\n");
						countQuery.append(" where api_process_date like '" + nowDate +"%" +"'																																			\n");
						countQuery.append(" group by api_process_date																																	\n");
				
					dbmgr.prepareStatement(countQuery.toString(), lData);
					countSet = dbmgr.select();
			    
			    
			    } catch( Exception e ) {
			    	//2015-12-03 시큐어코딩
			    	//e.printStackTrace();
			    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			    } finally {
			    	dbmgr.close();
			    }
				
			    while(countSet != null && countSet.next()) {
			    	
				    String api_process_date;
				    String use_count;
				    api_process_date = countSet.get("api_process_date").toString().substring(6,8);
				    use_count = countSet.get("use_count").toString();				    
			    %>
			    	["<%=api_process_date%>", "<%=use_count %>"],
				<%
				
				
			    }
				%>
					];
			 	
			 $.plot($("#placeholder4"), [ data4 ], {
			        series: {
			            bars: {
			                show: true,		//true:막대, false:선
			                barWidth:  1,
			                align: "center" }
			        },
			        xaxis: {
			            mode: "categories",
			            tickLength: 0
			        }
			    });
			 
			 
			 //PieChart부분
			 jQuery.ajax({
					type:"POST",
					url: "apiPieChart.jsp",
					data:{"area":"A" },
					success:function(data){
						jQuery('#placeholder').html(data);
					},
					error:function(data) {
						
					}
				});
			 jQuery.ajax({
					type:"POST",
					url: "apiPieChart.jsp",
					data:{"area":"B" },
					success:function(data){
						jQuery('#placeholder2').html(data);
					},
					error:function(data) {
						
					}
				});
			 jQuery.ajax({
					type:"POST",
					url: "apiPieChart.jsp",
					data:{"area":"C" },
					success:function(data){
						jQuery('#placeholder3').html(data);
					},
					error:function(data) {
						
					}
				});
	});
	
	/////////////////////////////////////////////////////////////////////////////////////////
	//6월 막대차트 end
	
	function popup(pageName){
		
		cw = screen.availWidth;
		ch = screen.availHeight;
		sw = 760;
		sh = 550;
		ml = (cw-sw)/2;
		mt = (ch-sh)/2;
		
		test = window.open(pageName, pageName, ',width=' + sw + ',height=' + sh + ',top=' + mt +',left=' + ml +',resizable=no, scrobars=no');
	}
	
	function m_sgis_count(){
		location.href='${pageContext.request.contextPath}/contents/gsks/gsks_count_view.jsp';
	}
	function m_api_count(){
		location.href='${pageContext.request.contextPath}/contents/gsks/monitoring/monitoring.jsp';
	}
	
	var nowYn = "Y";
	function changeMonth(){
		if(nowYn == "Y"){
			$("#nowMOnth").hide();
			$("#preMOnth").show();
			
			$("#monthChange").attr("src", "/contents/css/monitoring/img/nowbtn.png");
			nowYn="N";
		}else{
			$("#preMOnth").hide();
			$("#nowMOnth").show();
			$("#monthChange").attr("src", "/contents/css/monitoring/img/bfbtn.png");
			nowYn="Y";
		}
	}
	
	</script>
<div style="width:969px; height:30px; position:relative; margin:0 auto; border-left:1px solid #aeb2b6; border-right:1px solid #aeb2b6; background:#fff; padding-top:0px;">    
  	<div style="float:right; padding-right:20px; margin-top:5px;">
  		<font size="4">
	  		<label onclick="m_sgis_count()"> 통계지리카운트 </label> ::
	  		<label onclick="m_api_count()"> API 카운트 </label>
  		</font>
  	</div>
</div>   
<div class="wrap">`
	<div class="contentsWrap">
		<div class="title">
			<div class="titleFont"><%=nowDate.substring(0,4) %>년 <%=nowDate.substring(4,6) %>월 월간 일일현황 모니터링</div>
			<div class="titleBtn"><a href="javascript:popup('popup1.jsp');"><img src="/contents/css/monitoring/img/btn.png" alt="버튼" /></a></div>
		</div>
		
		<%
			try {
		    	countQuery.delete(0, countQuery.length());
				dbmgr = new DbManager();
					
					int nYear = Integer.parseInt(nowDate.substring(0,4));
					int nYearMonth = Integer.parseInt(nowDate.substring(0,6));
					
				
					countQuery.append(" select 																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group) as total_count, 																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + nYear +"%') as yearCount,																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + nYearMonth + "%') as monthCount, 																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + preMonth + "%') as premonthCount, 																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + nYearMonth + "%' and api_auth_key like 'E%') as outCount,  																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + preMonth + "%' and api_auth_key like 'E%') as preOutCount,  																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + nYearMonth + "%' and api_auth_key='SGIS2011101952956623') as mobileCount , 																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + preMonth + "%' and api_auth_key='SGIS2011101952956623') as preMobileCount , 																	\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + nYearMonth + "%' and api_auth_key like 'SA%') as statCount 	,																\n");
					countQuery.append(" (select nvl(sum(use_count), 0) from sgis_api_log_group where api_process_date like '" + preMonth + "%' and api_auth_key like 'SA%') as preStatCount 																	\n");
					countQuery.append("  from dual																	\n");
					countQuery.append("  																	\n");
			
				dbmgr.prepareStatement(countQuery.toString(), lData);
				countSet = dbmgr.select();
		    
		    
		    } catch( Exception e ) {
		    	//2015-12-03 시큐어코딩
		    	//e.printStackTrace();
		    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		    } finally {
		    	dbmgr.close();
		    }
				
				String total_count="";
				String monthCount="";
				String premonthCount="";
				String yearCount="";
				String outCount="";
				String preOutCount="";
				String mobileCount="";
				String preMobileCount="";
				String statCount="";
				String preStatCount="";
				
				BigDecimal monInc = new BigDecimal("0");
				BigDecimal oInc = new BigDecimal("0");
				BigDecimal saInc = new BigDecimal("0");
				BigDecimal mInc = new BigDecimal("0");
				
				String strMonInc = "";
				String strOInc = "";
				String strSaInc = "";
				String strMInc = "";
				
				BigDecimal month_log    = new BigDecimal("0");	//메뉴별 접속수

		    while(countSet != null && countSet.next()) {
		    	total_count = countSet.get("total_count").toString();
		    	monthCount = countSet.get("monthCount").toString();
		    	premonthCount = countSet.get("premonthCount").toString();
		    	yearCount = countSet.get("yearCount").toString();
		    	outCount = countSet.get("outCount").toString();
		    	preOutCount = countSet.get("preOutCount").toString();
		    	mobileCount = countSet.get("mobileCount").toString();
		    	preMobileCount = countSet.get("preMobileCount").toString();
		    	statCount = countSet.get("statCount").toString();
		    	preStatCount = countSet.get("preStatCount").toString();
		    	
		    	//,MathContext.DECIMAL32
		    	if(!"0".equals(premonthCount)){
					monInc = (new BigDecimal(monthCount).subtract(new BigDecimal(premonthCount))).divide(new BigDecimal(premonthCount),MathContext.DECIMAL128).multiply(new BigDecimal("100"));
		    		monInc = monInc.setScale(2, BigDecimal.ROUND_HALF_UP);
		    		strMonInc = makePersent(monInc);
		    	}if(!"0".equals(preOutCount)){
					oInc = (new BigDecimal(outCount).subtract(new BigDecimal(preOutCount))).divide(new BigDecimal(preOutCount),MathContext.DECIMAL128).multiply(new BigDecimal("100"));
					oInc = oInc.setScale(2, BigDecimal.ROUND_HALF_UP);
		    		strOInc = makePersent(oInc);
		    	}if(!"0".equals(preMobileCount)){
		    		mInc = (new BigDecimal(mobileCount).subtract(new BigDecimal(preMobileCount))).divide(new BigDecimal(preMobileCount),MathContext.DECIMAL128).multiply(new BigDecimal("100"));
		    		mInc = mInc.setScale(2, BigDecimal.ROUND_HALF_UP);
		    		strMInc = makePersent(mInc);
		    	}if(!"0".equals(preStatCount)){
		    		saInc = (new BigDecimal(statCount).subtract(new BigDecimal(preStatCount))).divide(new BigDecimal(preStatCount),MathContext.DECIMAL128).multiply(new BigDecimal("100"));
		    		saInc = saInc.setScale(2, BigDecimal.ROUND_HALF_UP);
		    		strSaInc = makePersent(saInc);
		    	}
		    	
		    	
		    	
	    }
		    total_count = clsNf.format(Integer.parseInt(total_count));
		    monthCount = clsNf.format(Integer.parseInt(monthCount));
		    premonthCount = clsNf.format(Integer.parseInt(premonthCount));
		    yearCount = clsNf.format(Integer.parseInt(yearCount));
		    outCount = clsNf.format(Integer.parseInt(outCount));
		    mobileCount = clsNf.format(Integer.parseInt(mobileCount));
		    statCount = clsNf.format(Integer.parseInt(statCount));
		    preOutCount = clsNf.format(Integer.parseInt(preOutCount));
		    preMobileCount = clsNf.format(Integer.parseInt(preMobileCount));
		%>

		<%! public String makePersent(BigDecimal inc)
		{
			String rtnStr = "";
			

			if(inc.compareTo(new BigDecimal("0")) == 1 ){
				rtnStr = "▲"+inc;
				
	    	}else if(inc.compareTo(new BigDecimal("0")) == 0){
	    		rtnStr = "0";
	    	}else{
	    		rtnStr = "▼"+ inc.multiply(new BigDecimal("-1"));
	    	}
			
			if(rtnStr.length()>7){
				rtnStr = rtnStr.substring(0,6);
			}
			
			return rtnStr;
		}
		%>
		
		<div class="gWrap">
			<div class="graph" id="placeholder4"></div>
			<div class="list">
				<div class="pT1"><img src="/contents/css/monitoring/img/icon2.png" alt="아이콘"/>  총사용량 <%= total_count %><img src="/contents/css/monitoring/img/bfbtn.png" id="monthChange" style="float:right" alt="이전달" onclick="changeMonth()" /></div>
				<div class="pT2">
				<div id="nowMOnth">
					<ul>
						<li><img src="/contents/css/monitoring/img/icon.png" alt="아이콘"/> <%=nowDate.substring(0,4) %>년사용량 <%= yearCount %></li>
						<li><img src="/contents/css/monitoring/img/icon.png" alt="아이콘"/> <%=nowDate.substring(0,4) %>년<%=nowDate.substring(4,6) %>월 외부 사용량  </li>
						<li> - <%= outCount %>(전월대비 <%= strOInc%>) </li>
						<li><img src="/contents/css/monitoring/img/icon.png" alt="아이콘"/> <%=nowDate.substring(0,4) %>년<%=nowDate.substring(4,6) %>월모바일 사용량 <img src="/contents/css/monitoring/img/btn.png" width="40px" onclick="javascript:popup('popup4.jsp');" alt="더보기" /></li>
						<li> - <%=mobileCount %>(전월대비 <%=strMInc %>)</li>
					</ul>
				</div> 
				<div id="preMOnth" style="display:none;">
					<ul>
						<li><img src="/contents/css/monitoring/img/icon.png" alt="아이콘"/> <%=nowDate.substring(0,4) %>년사용량 <%= yearCount %></li>
						<li><img src="/contents/css/monitoring/img/icon.png" alt="아이콘"/> <%=preMonth.substring(0,4) %>년<%=preMonth.substring(4,6) %>월 외부 사용량  </li>
						<li> - <%= preOutCount %> </li>
						<li><img src="/contents/css/monitoring/img/icon.png" alt="아이콘"/> <%=preMonth.substring(0,4) %>년<%=preMonth.substring(4,6) %>월 모바일 사용량 </li>
						<li> - <%=preMobileCount %></li>
					</ul>
				</div> 

				</div>
			</div>
		</div>
	</div>
	  <%
			    //////////////////////////////////////////////////////////////////////////////
			    //월간 최대 사용자 Best 5
			    //////////////////////////////////////////////////////////////////////////////
			    try {
			    	countQuery.delete(0, countQuery.length());
					dbmgr = new DbManager();
					
						countQuery.append(" select 																	\n");
						countQuery.append(" top 5 a.api_auth_key,													\n");
						countQuery.append(" sum(a.use_count) as use_count,											\n");
						countQuery.append(" b.api_use_name,															\n");
						countQuery.append(" b.api_server_ip															\n");
						countQuery.append(" from  sgis_api_log_group a												\n");
						countQuery.append(" join sgis_api_auth_key_grant b											\n");
						countQuery.append(" on a.api_auth_key = b.api_auth_key										\n");
						countQuery.append(" where a.api_process_date like '" + nowDate.substring(0,6) + "%'			\n");
						countQuery.append(" and a.api_auth_key not like('SGIS%') 									\n");
						countQuery.append(" group by a.api_auth_key, b.api_server_ip, b.api_use_name				\n");
						countQuery.append(" order by use_count desc													\n");
				
					dbmgr.prepareStatement(countQuery.toString(), lData);
					countSet = dbmgr.select();
			    
			    
			    } catch( Exception e ) {
			    	//2015-12-03 시큐어코딩
			    	//e.printStackTrace();
			    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			    } finally {
			    	dbmgr.close();
			    }
				
	  			int count = 0;
	  			
	  			String api_auth_key1 = "";
	  			String use_count1= "";
	  			String api_use_name1= "";
	  			String api_server_ip1= "";
	  			String api_auth_key2= "";
	  			String use_count2= "";
	  			String api_use_name2= "";
	  			String api_server_ip2= "";
	  			String api_auth_key3= "";
	  			String use_count3= "";
	  			String api_use_name3= "";
	  			String api_server_ip3= "";
	  			String api_auth_key4= "";
	  			String use_count4= "";
	  			String api_use_name4= "";
	  			String api_server_ip4= "";
	  			String api_auth_key5= "";
	  			String use_count5= "";
	  			String api_use_name5= "";
	  			String api_server_ip5= "";
	  			
			    while(countSet != null && countSet.next()) {
			    	count++;
					if(count == 1){
					    api_auth_key1 = countSet.get("api_auth_key").toString();
					    use_count1 = countSet.get("use_count").toString();				    
					    api_use_name1 = countSet.get("api_use_name").toString();				    
					    api_server_ip1 = countSet.get("api_server_ip").toString();		
					    
					    use_count1 = clsNf.format(Integer.parseInt(use_count1));
						
					}else if(count == 2){
					    api_auth_key2 = countSet.get("api_auth_key").toString();
					    use_count2 = countSet.get("use_count").toString();				    
					    api_use_name2 = countSet.get("api_use_name").toString();				    
					    api_server_ip2 = countSet.get("api_server_ip").toString();	
					    
					    use_count2 = clsNf.format(Integer.parseInt(use_count2));
						
					}else if(count == 3){
					    api_auth_key3 = countSet.get("api_auth_key").toString();
					    use_count3 = countSet.get("use_count").toString();				    
					    api_use_name3 = countSet.get("api_use_name").toString();				    
					    api_server_ip3 = countSet.get("api_server_ip").toString();		
					    
					    use_count3 = clsNf.format(Integer.parseInt(use_count3));
						
					}else if(count == 4){
					    api_auth_key4 = countSet.get("api_auth_key").toString();
					    use_count4 = countSet.get("use_count").toString();				    
					    api_use_name4 = countSet.get("api_use_name").toString();				    
					    api_server_ip4 = countSet.get("api_server_ip").toString();		
					    
					    use_count4 = clsNf.format(Integer.parseInt(use_count4));
						
					}else if(count == 5){
					    api_auth_key5 = countSet.get("api_auth_key").toString();
					    use_count5 = countSet.get("use_count").toString();				    
					    api_use_name5 = countSet.get("api_use_name").toString();				    
					    api_server_ip5 = countSet.get("api_server_ip").toString();				    
						
					    
					    use_count5 = clsNf.format(Integer.parseInt(use_count5));
					}
			    }
				%>
	<div class="contentsWrap2">
		<div class="title">
			<div class="titleFont"><%=nowDate.substring(0,4) %>년 <%=nowDate.substring(4,6) %>월 월간 최대 사용자 Best 5</div>
			<div class="titleBtn"><a href="javascript:popup('popup2.jsp');"><img src="/contents/css/monitoring/img/btn.png" alt="버튼" /></a></div>
		</div>
		<div class="tWrap">
			<div class="tList">
				<ul>
					<li class="t1">사용자 성명</li>
					<li class="t2">-<%=api_use_name1 %></li>
					<li class="t1">인증키</li>
					<li class="t2"><%=api_auth_key1 %></li>
					<li class="t1">홈페이지</li>
					<li class="t2"><a href="<%=api_server_ip1 %>" target="_brank"><%=api_server_ip1 %></a></li>
					<li class="t1">사용량</li>
					<li class="t3"><%=use_count1 %></li>
				</ul>
			</div>
			<div class="tList">
				<ul>
					<li class="t6">사용자 성명</li>
					<li class="t7">-<%=api_use_name2 %></li>
					<li class="t6">인증키</li>
					<li class="t7"><%=api_auth_key2 %></li>
					<li class="t6">홈페이지</li>
					<li class="t7"><a href="<%=api_server_ip2 %>" target="_brank"><%=api_server_ip2 %></a></li>
					<li class="t6">사용량</li>
					<li class="t8"><%=use_count2 %></li>
				</ul>
			</div>
			<div class="tList">
				<ul>
					<li class="t1">사용자 성명</li>
					<li class="t2">-<%=api_use_name3 %></li>
					<li class="t1">인증키</li>
					<li class="t2"><%=api_auth_key3 %></li>
					<li class="t1">홈페이지</li>
					<li class="t2"><a href="<%=api_server_ip3 %>" target="_brank"><%=api_server_ip3 %></a></li>
					<li class="t1">사용량</li>
					<li class="t3"><%=use_count3 %></li>
				</ul>
			</div>
			<div class="tList">
				<ul>
					<li class="t6">사용자 성명</li>
					<li class="t7">-<%=api_use_name4 %></li>
					<li class="t6">인증키</li>
					<li class="t7"><%=api_auth_key4 %></li>
					<li class="t6">홈페이지</li>
					<li class="t7"><a href="<%=api_server_ip4 %>" target="_brank"><%=api_server_ip4 %></a></li>
					<li class="t6">사용량</li>
					<li class="t8"><%=use_count4 %></li>
				</ul>
			</div>
			<div class="tList">
				<ul>
					<li class="t4">사용자 성명</li>
					<li class="t11">-<%=api_use_name5 %></li>
					<li class="t4">인증키</li>
					<li class="t11"><%=api_auth_key5 %></li>
					<li class="t4">홈페이지</li>
					<li class="t11"><a href="<%=api_server_ip5 %>" target="_brank"><%=api_server_ip5 %></a></li>
					<li class="t4">사용량</li>
					<li class="t5"><%=use_count5 %></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="contentsWrap3">
	<div class="title">
		<div class="titleFont"><%=nowDate.substring(0,4) %>년 <%=nowDate.substring(4,6) %>월 API 분포도</div>
		<div class="titleBtn"><a href="javascript:popup('popup3.jsp');"><img src="/contents/css/monitoring/img/btn.png" alt="버튼" /></a></div>
	</div>
	<div class="gWrap2">
		<div class="gList">
			<div class="p1">좌표</div>
				<div id="placeholder"></div>
		</div>
		<div class="gList">
			<div class="p1">통계</div>
				<div id="placeholder2"></div>
		</div>
		<div class="gList2">
			<div class="p1">센서스</div>
				<div id="placeholder3"></div>
		</div>
	</div>

	</div>

</div>


</body>
</html>