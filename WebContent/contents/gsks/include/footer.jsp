<%@ page language="java" contentType="text/html;charset=utf-8"%>

<script type="text/javascript">
 //개인보호정책
	function openPrivate(){
		var pop_private = window.open('/contents/include/pop_private.jsp','pop_private','width=570,height=700,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=1,resizable=0');
		pop_private.focus();
	}
</script>

<div class="clear"></div>
<div class="bottom">
	<div class="bottom_logo"><img src="/contents/images/bottom_logo.gif" alt="통계청"></div>
    <div class="bottom_address">
        <div class="bottom_navigation">
          <a href="javascript:openMail()"  onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('bottom_navigation_03','','/contents/images/bottom_navigation_3_over.gif',1)" onBlur="MM_swapImgRestore()" onFocus="MM_swapImage('bottom_navigation_03','','/contents/images/bottom_navigation_3_over.gif',1)"><img name="bottom_navigation_03" border="0" src="/contents/images/bottom_navigation_3.gif" alt="이메일무단수집거부"></a>   	    
    	  <a href="javascript:openPrivate()"  onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('bottom_navigation_02','','/contents/images/bottom_navigation_2_over.gif',1)" onBlur="MM_swapImgRestore()" onFocus="MM_swapImage('bottom_navigation_02','','/contents/images/bottom_navigation_2_over.gif',1)"><img name="bottom_navigation_02" border="0" src="/contents/images/bottom_navigation_2.gif" alt="개인정보보호정책"></a>
        </div>
        <div class="address"><img src="/contents/images/bottom_address.gif" alt="(302-701) 대전광역시 서구 선사로 139 통계청콜센터 Tel 02)2012-9114 SGIS담당자  Tel : (042)481-2342"></div>
    </div>

</div>
</BODY>
</html>