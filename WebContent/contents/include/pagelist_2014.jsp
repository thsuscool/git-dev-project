<%@ page language="java" contentType="text/html;charset=utf-8" %>
<!--페이징처리-->
<ul class="pageList">
        <%	if (block > 1){ %>
            <li><a href="<%= request.getRequestURL() %>?pg=1" onclick="list(1); return false;"><img src="/contents/css/2014_css/img/btn/btn_first.png" alt="처음" /></a></li>
        <%	}	 %>
        <%	if (totCount != 0){
                    int prePage = firstPage-1;
                    if(firstPage==1) prePage=1;
            %>
            <li><a href="<%= request.getRequestURL() %>?pg=<%=prePage %>" onclick="list(<%=prePage%>); return false;" >
            <img src="/contents/css/2014_css/img/btn/btn_prev.png" alt="이전" /></a>&nbsp;</li>
        <%	} %>
        <%
        for(int dpage = firstPage; dpage <= lastPage; dpage++) {
			%>
			<li>
			<%
            if(pg == dpage) {%>
                <span class="fb" title='<%=dpage %>페이지'><%=dpage%></span>
            <%		} else { %>
                <a href="<%= request.getRequestURL() %>?pg=<%=dpage %>" onclick="list(<%=dpage%>); return false;">&nbsp;<%=dpage%></a>
            <%		}
			%>
			</li>
			<%
        }
        %>
    <%	if (totCount != 0){ int nextpage = 0;
        if (lastPage == totPage) { nextpage = lastPage; } else { nextpage = lastPage + 1; }%>
              <li class="txt">&nbsp;<a href="<%= request.getRequestURL() %>?pg=<%=nextpage %>" onclick="list(<%=nextpage%>); return false;"><img src="/contents/css/2014_css/img/btn/btn_next.png" alt="다음" /></a></li>
    <%	}	 %>
    <%	if(block < totalBlock){	%>
       <li><a href="<%= request.getRequestURL() %>?pg=<%=totPage %>" onclick="list(<%=totPage%>); return false;"><img src="/contents/css/2014_css/img/btn/btn_last.png" alt="끝" /></a></li>
    <%	} %>
		</ul>
<!--페이징처리 끝-->