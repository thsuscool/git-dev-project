<%@ page language="java" contentType="text/html;charset=utf-8" %>

<script  type="text/javascript">
	function popEmailReject(url){
	  pop_login = window.open(url,'','width=550,height=450,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
	}

	function popPrivate(url){
		pop_login = window.open(url,'','width=580,height=800,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=1,resizable=0');
	}
</script>
<div class="footerbox01">
	<ul>
		<li><a href="#" onclick="popEmailReject('/contents/include/pop_email_collect_no.jsp')">이메일 집단 수집거부</a></li>
		<li class="prvInfoExeLow"><a href="#" onclick="popPrivate('/contents/include/pop_private.jsp')"><b>개인정보 처리방침</b></a></li>
		<li>통계청 콜센터 02-2012-9114</li>
	</ul> 
	<a href="#footerService" class="btn_service" id="footerService">통계청 주요서비스</a>
	<div class="footerService ne">
		<ul class="ne">
			<li class="ne"><a href="http://www.kostat.go.kr" target="_blank" class="ne">통계청 홈페이지</a></li>
			<li class="ne"><a href="http://kosis.kr" target="_blank"  class="ne">국가통계포털</a></li>
			<li class="ne"><a href="http://mdss.kostat.go.kr" target="_blank"  class="ne">마이크로데이터</a></li>
			<li class="ne"><a href="http://www.index.go.kr/" target="_blank"  class="ne">e-나라지표</a></li>
			<li class="ne"><a href="http://meta.narastat.kr" target="_blank"  class="ne">통계설명자료</a></li>
			<li class="ne"><a href="http://kssc.kostat.go.kr" target="_blank"  class="ne">통계분류</a></li>
		</ul>
	</div>
</div> 
<div class="footerbox02"><img src="/contents/css/2014_css/img/pic/pic_footer.png" alt="통계청" /></div>