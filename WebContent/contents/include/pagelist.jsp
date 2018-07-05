<%@ page language="java" contentType="text/html;charset=utf-8" %>
<!--페이징처리-->
<div class="paging mt20">
        <%	if (block > 1){ %>
            <a href="<%= request.getRequestURL() %>?pg=1" onclick="list(1); return false;"><img src="/contents/support/images/preview.gif" alt="이전페이지" /></a>&nbsp;
        <%	}	 %>
        <%	if (totCount != 0){
                    int prePage = firstPage-1;
                    if(firstPage==1) prePage=1;
            %>
            <a href="<%= request.getRequestURL() %>?pg=<%=prePage %>" onclick="list(<%=prePage%>); return false;" >
            <img src="/contents/support/images/preview.gif" alt="이전페이지" width="13" height="13" /></a>&nbsp;
        <%	} %>
        <%
        for(int dpage = firstPage; dpage <= lastPage; dpage++) {

            if(pg == dpage) {%>
                <span class="fb" title='<%=dpage %>페이지'><%=dpage%></span>
            <%		} else { %>
                <a href="<%= request.getRequestURL() %>?pg=<%=dpage %>" onclick="list(<%=dpage%>); return false;">&nbsp;<%=dpage%></a>
            <%		}

            if(dpage < lastPage)
                out.println("| ");
            else
                out.println(" ");
        }
        %>
    <%	if (totCount != 0){ int nextpage = 0;
        if (lastPage == totPage) { nextpage = lastPage; } else { nextpage = lastPage + 1; }%>
              &nbsp;<a href="<%= request.getRequestURL() %>?pg=<%=nextpage %>" onclick="list(<%=nextpage%>); return false;"><img src="/contents/support/images/nextview.gif" alt="다음페이지" width="13" height="13" /></a>
    <%	}	 %>
    <%	if(block < totalBlock){	%>
        &nbsp;<a href="<%= request.getRequestURL() %>?pg=<%=totPage %>" onclick="list(<%=totPage%>); return false;"><img src="/contents/support/images/nextview.gif" alt="다음페이지" /></a>
    <%	} %>
</div>
<!--페이징처리 끝-->