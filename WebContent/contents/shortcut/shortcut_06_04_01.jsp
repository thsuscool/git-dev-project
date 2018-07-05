<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ page import="org.apache.commons.lang.StringEscapeUtils"     %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
    RecordModel rm = null;
    GeneralBroker broker = null;

    String api_element_id = "";
    String api_element_name = "";
    String api_element_desc = "";
    String api_element_ex_name = "";
    String api_element_ex_desc = "";
    String api_element_example_exe = "";
    String api_element_script = "";
    String api_element_req_down = "";
    String api_element_res_down = "";
    String api_element_doc_down = "";

    try {
        broker = new GeneralBroker("apaa00");

        lData.setString("PARAM","SAMPLE_ELEMENT");
        rm = broker.getList(lData);

        if(rm != null && rm.next()) {
            api_element_name = StringUtil.verify((String)rm.get("api_element_name"));
            api_element_desc = StringUtil.verify((String)rm.get("api_element_e_desc"));
            api_element_desc = StringUtil.toLine(api_element_desc);
            api_element_ex_name = StringUtil.verify((String)rm.get("api_element_ex_name"));
            api_element_ex_desc = StringUtil.verify((String)rm.get("api_element_ex_desc"));
            api_element_ex_desc = StringUtil.toLine(api_element_ex_desc);
            api_element_example_exe = StringUtil.verify((String)rm.get("api_element_example_exe"));
            api_element_script = StringUtil.verify((String)rm.get("api_element_script"));
            //api_element_script = StringUtil.toLine(api_element_script);
            api_element_req_down = StringUtil.verify((String)rm.get("api_element_req_down"));
            api_element_res_down = StringUtil.verify((String)rm.get("api_element_res_down"));
            api_element_doc_down = StringUtil.verify((String)rm.get("api_element_doc_down"));
        }

    } catch(Exception e) {
        System.out.print("sgisWebError : ");
      //2015-12-03 시큐어코딩
      //e.printStackTrace();
      logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    }
%>
    <h4 class="left_ball_01"><%=api_element_name %></h4>
    <p class="service_xy">
            <%=api_element_desc %>
    </p>
    <br/>
    <p class="service_xy">
            <%=api_element_ex_name %>
    </p>
    <br/>
    <p class="service_xy">
            <%=api_element_ex_desc %>
    </p>

<%	if(!StringUtil.isEmpty(api_element_script)) { %>
    <br/>
    <p class="service_xy">
        <textarea rows="20" cols="100" readonly ><%=StringEscapeUtils.unescapeHtml(api_element_script) %>	</textarea>
    </p>
<%	} %>
    <br/>

    <ul class="mt10 fb">
<%	if(!StringUtil.isEmpty(api_element_req_down)) {	%>
        <li class="pl20 fl"><a href="/contents/include/download.jsp?filename=<%=api_element_req_down %>" target="downloadIfr" onclick="fileDownload(document.pFm,'<%=api_element_req_down %>'); return false;" class="blue_02" title="새창 열림">요청다운로드 <img src="/contents/shortcut/images/new/dot_xy.gif" alt="" /></a></li>
<%	}
    if(!StringUtil.isEmpty(api_element_res_down)) {
%>
        <li class="pl20 fl"><a href="/contents/include/download.jsp?filename=<%=api_element_res_down %>" target="downloadIfr" onclick="fileDownload(document.pFm,'<%=api_element_res_down %>'); return false;" class="blue_02" title="새창 열림">응답다운로드 <img src="/contents/shortcut/images/new/dot_xy.gif" alt="" /></a></li>
<%	}
    if(!StringUtil.isEmpty(api_element_example_exe)) {
%>
        <li class="pl20 fl"><a href="/contents/include/download.jsp?filename=<%=api_element_example_exe %>" target="downloadIfr" onclick="examplesClicked('<%=api_element_example_exe %>'); return false;" class="blue_02" title="새창 열림">예제실행하기 <img src="/contents/shortcut/images/new/dot_xy.gif" alt="" /></a></li>
<%	}
    if(!StringUtil.isEmpty(api_element_doc_down)) {
%>
        <li class="pl20 fl"><a href="/contents/include/download.jsp?filename=<%=api_element_doc_down %>" target="downloadIfr" onclick="fileDownload(document.pFm,'<%=api_element_doc_down %>'); return false;" class="blue_02" title="새창 열림">API문서다운로드 <img src="/contents/shortcut/images/new/dot_xy.gif" alt="" /></a></li>
<%	} %>

    </ul>

    <input type="hidden" name="api_element_example_exe" value="<%="/upload/api/"+ java.net.URLEncoder.encode(api_element_example_exe)%>"/>
    <input type="hidden" name="api_element_req_down" value="<%=java.net.URLEncoder.encode(api_element_req_down) %>"/>
    <input type="hidden" name="api_element_res_down" value="<%=java.net.URLEncoder.encode(api_element_res_down) %>"/>
    <input type="hidden" name="api_element_doc_down" value="<%=java.net.URLEncoder.encode(api_element_doc_down) %>"/>