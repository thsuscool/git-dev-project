<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<script type="text/javascript" language="javascript" src="/contents/scripts/main/jquery-1.5.1.min.js"></script>

<%
	GeneralBroker broker = null;
	DbManager dmg = null;
	RecordModel rm = null;
	RecordModel rm1 = null;
	RecordModel rm2 = null;

	/* paging 초기화  */
	int pg = 1;
	int pgSize = 15;
	int blockSize = 10;
	int totPage   = 1;
	int totCount  = 0;

	if(lData.containsKey("pg"))        pg = lData.getInt("pg");

	try {

		dmg = new DbManager();

		/*******************************/
		/* 다중 삭제 */
		/* 센서스 자료를 삭제할 경우 관련된 테이블을 모두 삭제한다. */
		/*******************************/
		if(lData.getString("aT").equals("DEL")) {
			String selected_census_id = lData.getString("com_sgis_census_id");
			String[] list_selected_census_id = selected_census_id.split(",");

			for(int i=0; i < list_selected_census_id.length; i++) {

				String[] list_selected_census = list_selected_census_id[i].split("\\|");
				String list_id = list_selected_census[0];
				String list_data_id = list_selected_census[1];
				
//				센서스 자료신청년도 삭제
				String dsql2 = "	delete from sgis_census_req_year_code	";
								dsql2 += "		where sgis_census_id = '"+list_id+"'";
								dsql2 += "								and sgis_census_data_id = '"+list_data_id+"'";

								dmg.prepareStatement(dsql2);
								dmg.executeUpdate();
								

				//센서스 기준년도 삭제
				String dsql1 = "	delete from sgis_census_year_code	";
								dsql1 += "		where sgis_census_id = '"+list_id+"'";
								dsql1 += "								and sgis_census_data_id = '"+list_data_id+"'";

								dmg.prepareStatement(dsql1);
								dmg.executeUpdate();

				

				//센서스 자료신청 삭제
				String dsql3 = "	delete from sgis_census_req	";
								dsql3 += "		where sgis_census_id = '"+list_id+"'";
								dsql3 += "								and sgis_census_data_id = '"+list_data_id+"'";

								dmg.prepareStatement(dsql3);
								dmg.executeUpdate();

				//센서스자료삭제
				String dsql = " delete from sgis_census_data ";
								dsql += "		where sgis_census_id = '"+list_id+"'";
								dsql += "								and sgis_census_data_id = '"+list_data_id+"'";

								dmg.prepareStatement(dsql);
								dmg.executeUpdate();

			}

			out.print("<script>alert('처리되었습니다.');</script>");
		}

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		dmg.close();
	}

	try {

		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_DATA2");
		rm = broker.getList(lData);

		totCount = rm.getRowCount();	//리스트 전체 수

		rm = broker.getList(lData, pg, pgSize);

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}

	/*  block 처리 */
	totPage  = totCount / pgSize;
	if (totCount%pgSize > 0) totPage++;

	int totalBlock = totPage/blockSize;
	if(totPage%blockSize > 0) totalBlock++;
	int block = pg/blockSize;
	if(pg % blockSize > 0) block++; //현재블럭표시

	int firstPage = (block-1)*blockSize + 1;
	int lastPage = block*blockSize;

	if(totalBlock <= block) {
		lastPage = totPage;
	}

%>
<script language="javascript">
	function addClicked() {
		window.open("gsks_01_04_03_popup.jsp","census","width=650, height=500, scrollbars=yes");
	}

	function removeClicked() {
		var fm=document.censusFm;
		var c = confirm("사용자에게 제공된 모든 신청 건이 삭제됩니다. 삭제하시겠습니까?")

		if(c == 1) {
			var cnt = fm.com_sgis_census_id.length;
			var chk=0;
			for(i=0; i < cnt; i++) {
				if(fm.com_sgis_census_id[i].checked) chk++;
			}
			
			if(fm.com_sgis_census_id.length == undefined){
			
				if(fm.com_sgis_census_id.checked == false) {
					alert("선택된 자료가 없습니다.");
					return;
				} else {
					fm.target="_self";
					fm.action="gsks_01_04_03.jsp";
					fm.aT.value="DEL";
					fm.submit();
				}
			}else{
				if(chk == 0) {
					alert("선택된 자료가 없습니다.");
					return;
				} else {
					fm.target="_self";
					fm.action="gsks_01_04_03.jsp";
					fm.aT.value="DEL";
					fm.submit();
				}
			
			}
		}
	}

	function editClicked(id, did) {
		var fm=document.censusFm;

		window.open("", "census","width=650, height=500, scrollbars=yes");

		fm.aT.value = "RET";
		fm.selected_sgis_census_id.value = id;
		fm.selected_sgis_census_data_id.value = did;
		fm.target="census";
		fm.action="gsks_01_04_03_popup.jsp";
		fm.submit();
	}

	var isall="F";
	function allChecked() {
		var fm = document.censusFm;
		var cnt = fm.com_sgis_census_id.length;

		if(isall == "F") {
			for(i=0; i < cnt; i++)	 fm.com_sgis_census_id[i].checked = true;
			isall="T";
		} else if(isall == "T") {
			for(i=0; i < cnt; i++)	 fm.com_sgis_census_id[i].checked = false;
			isall="F";
		}

	}

	function list(pg){
		document.searchFm.pg.value = pg;
		document.searchFm.submit();
	}

function onLoadAjax(id) {}

	function searchClicked() {
			document.censusFm.submit();
	}

	//자료구분선택
	function selectDetailData(def) {
	    setParam(['sgis_census_id:'+document.censusFm.sgis_census_id.value,'default:'+def]);
	    writeDiv(['detailMenuDiv']);
	}

	//대상자료 선택 (사용하지 않음)
	function locationChanged() {}
	
	
	

	//최신자료갱신
	function gsks_reload_data() {
		
		//alert('gsks_reload_data()');
		jQuery.ajax({
			type:"POST",
			url: "gsks_01_04_03_reload_data.jsp",
			//data:{   },
			success:function(data){
				//alert('gsks_reload_data() ====== ajax success===');
				alert('최신자료갱신을 완료하였습니다.');
				document.location.reload();
			},
			error:function(data) {
				
			}
		});
		  
	    
	}
	
	function gsks_search_data() {
		window.open("gsks_01_04_03_search_data.jsp","gsks_01_04_03_search_data","width=780, height=650, scrollbars=yes, resizable=yes");
	}
	
	function gsks_add_data() {
		window.open("gsks_01_04_03_popup2.jsp","gsks_01_04_03_popup2","width=650, height=330, scrollbars=yes, resizable=yes");
	}
	
	
	
</script>

  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">센서스경계 자료제공</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="#">센서스경계 자료제공</a></li>
      </ul>
    </div>

<div class="content_admin">

		<div class="list_wrap">
		<div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    <a href="gsks_01_04.jsp"><strong>요청관리</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_01.jsp"><strong>자료제공</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_02.jsp"><strong>자료및안내</strong></a></td>
					<td width="140" height="25" align="center" bgcolor="#00BFFF" >
    					<a href="gsks_01_04_03.jsp"><font color="#FFFFFF"><strong>자료목록관리</strong></font></a></td>
    				<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_05.jsp"><strong>자료제공관리</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_06.jsp"><strong>결재관리</strong></a></td>
				</tr>
			<tr>
				<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
			</tr>
		</table>
		</div>

<div class="clear">

  	<form name="censusFm" method="post">
			<input type="hidden" name="aT">
			<input type="hidden" name="selected_sgis_census_id">
			<input type="hidden" name="selected_sgis_census_data_id">

<table width="100%" border=0 cellpadding="0" cellspacing="0" class="table1" summary="인증키관리에 대한 내용입니다." >
  <thead>

      <tr>
        <!-- <th class="td_top"><input type="checkbox" name="chkAll" onClick="allChecked();"></th> -->
        <th class="td_top" width="100">구분</th>
        <th class="td_top" width="150">대상자료명</th>
        <th class="td_top">기준연도</th>
        <th class="td_top" width="60">배포포맷</th>
        <th class="td_top" width="60">공개여부</th>
        <th class="td_top" width="60">대상지역</th>
        <th class="td_top" width="50">가격</th>
        <!-- <th class="t_end td_top">수정</th> -->
      </tr>
    </thead>
    <tbody>
    <%
    	try {

    		broker = new GeneralBroker("ceaa00");

    		int rowcnt=0;
    		while(rm != null && rm.next()) {
    			String sgis_census_id= String.valueOf((BigDecimal)rm.get("sgis_census_id"));
    			String sgis_census_data_id= String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
    			String sgis_census_id_name = StringUtil.verify((String)rm.get("sgis_census_id_name"));
    			String sgis_census_name= StringUtil.verify((String)rm.get("sgis_census_name"));
    			String sgis_census_public_format= StringUtil.verify((String)rm.get("sgis_census_public_format"));
    			String sgis_census_public_yn= String.valueOf((Character)rm.get("sgis_census_public_yn"));
    			String sgis_census_location= StringUtil.verify((String)rm.get("sgis_census_location"));
    			String sgis_census_price= StringUtil.verify((String)rm.get("sgis_census_price"));

    			String short_sgis_census_name = StringUtil.toShortenStringB(sgis_census_name, 50);
    			String short_sgis_census_location = StringUtil.toShortenStringB(sgis_census_location, 6);
    			String short_sgis_census_price = StringUtil.toShortenStringB(sgis_census_price, 8);

				/*********************************/
				/* 자료별 대상년도 가져오기 */
				/*********************************/
				lData.setString("PARAM", "CENSUS_DATA_YEAR2");
				lData.setString("r_sgis_census_id", sgis_census_id);
				lData.setString("r_sgis_census_data_id", sgis_census_data_id);

				rm2 = broker.getList(lData);
				String years="";

				while(rm2 != null && rm2.next()) {
					years += StringUtil.verify((String)rm2.get("sgis_census_year")) + ", ";
				}
				if(!StringUtil.isEmpty(years))	years = years.substring(0, (years.length() - 2));
    %>
      <tr>
        <!-- <td class="cell_center"><input type="checkbox" name="com_sgis_census_id" value="<%=sgis_census_id%>|<%=sgis_census_data_id%>"></td>-->
        <td class="cell_left"><%=sgis_census_id_name %></td>
        <td class="cell_left" title="<%=sgis_census_name %>"><%=short_sgis_census_name %></td>
        <td class="cell_left"><%=years %></td>
        <td class="cell_center"><%=sgis_census_public_format %></td>
        <td class="cell_center"><%=sgis_census_public_yn %></td>
        <td class="cell_center" title="<%=sgis_census_location%>"><%=short_sgis_census_location %></td>
        <td class="cell_center" title="<%=sgis_census_price%>"><%=short_sgis_census_price %></td>
        <!-- <td class="t_end cell_center"><a href="javascript:editClicked('<%=sgis_census_id %>', '<%=sgis_census_data_id %>');"><img src="images/button_admin_01_02_correct.gif" border=0 align="absmiddle"></a></td>-->
      </tr>
     <% rowcnt++;} %>

     <%if(rowcnt == 0) {%>
     	<tr>
     		<td colspan="10" class="cell_center">No Data</td>
     	</tr>
     <%} %>
     <%
     } catch(Exception e) {
    	 System.out.print("sgisWebError : ");
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
     }
     %>
    </tbody>
  </table>
		
		<!-- 
		<div class="list_button_right_02"><a href="javascript:addClicked()"><img src="images/admin_01_04_tab_page_03_button_add.gif" border=0></a>
				<a href="javascript:removeClicked();"><img src="images/admin_01_04_tab_page_03_button_delete.gif" border=0></a></td>
		</div>
		 -->
		
		
		<div class="list_button_right_02">
			<a href="javascript:gsks_reload_data()"><img src="images/buton_new_data.gif" border=0></a>
			<a href="javascript:gsks_search_data();"><img src="images/buton_data_search.gif" border=0></a>
			<a href="javascript:gsks_add_data();"><img src="images/admin_01_04_tab_page_03_button_add.gif" border=0></a>
		</div>
		

<div class="clear">
<!-- page 처리 -->
<%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->
</div>

 <div class="clear"><br></div>

<!-- 
		<div align="center">
				<table border=0>
					<tr>
						<td>
					<select name="sgis_census_id" class="search_sel" style="width:90px" onChange="selectDetailData();">
						<option value="">전체</option>
		          <%--
		          	try {
		
				    			broker = new GeneralBroker("ceaa00");
		
									lData.setString("PARAM", "CODE");
		          		rm1 = broker.getList(lData);
		
		          		while(rm1 != null && rm1.next()) {
		          			String sgis_census_id = String.valueOf((BigDecimal)rm1.get("sgis_census_id"));
		          			String sgis_census_name = StringUtil.verify((String)rm1.get("sgis_census_code_name"));
		          			--%>
		          			<option value="<%//=sgis_census_id %>" <%//if(lData.getString("sgis_census_id").equals(sgis_census_id)) {%>selected<%//} %>><%//=sgis_census_name %></option>
		          			<%--
		          		}
		          	} catch(Exception e) {
		          		System.out.print("sgisWebError : ");
						//2015-12-03 시큐어코딩
						//e.printStackTrace();
						logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		          	}
		          --%>
		          </select>
		          </td>
		          <td>
		          <div id='detailMenuDiv' type='table' data='/contents/shortcut/shortcut_05_03_02.jsp' foRow='1' style=" overflow-y:hidden;"></div>
							</td>
							<td>
		          <img src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" onClick="searchClicked();" style="cursor:pointer"/>
		          </td>
		         </tr>
		        </table>

     </div>
     
 -->
     
</div>
</div>
     	</form>
				</div>
			</div>
  </div>
</div>
<div class="clear"></div>

<%if(!StringUtil.isEmpty(lData.getString("sgis_census_data_id"))) { %>
	<script>selectDetailData('<%=lData.getString("sgis_census_data_id") %>');</script>
<%} %>

<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
