<%@ page language="java" contentType="text/html;charset=utf-8" %>
<% if(loginYn.equals("N")) { //로그인전 %>
<h2 class="hid">로그인</h2>
    <div id="login">
      <p class="login_top_bg"></p>
      <div class="login_center">
      <form name="loginFm" method="post" action="/contents/member/login.jsp"  onsubmit="return loginClicked();">
        <fieldset class="search_t">
        <legend>로그인</legend>
        <dl>
          <dt>
            <label for="userid">ID</label>
          </dt>
          <dd>
            <input type="text" id="userid" name="userid" class="inp w87" maxlength="12" />
          </dd>
          <dt>
            <label for="userpassword">PW</label>
          </dt>
          <dd>
            <input type="password" id="userpassword" name="userpassword" class="inp w87" onkeydown="javascript:enterLogin(event);" maxlength="12" />
          </dd>
          <dt>
            <input type="image" src="/contents/images/new/login_menu_login.gif" alt="로그인" />
          </dt>
        </dl>
        <ul>
          <li><a href="/vname_input_seed_mem.jsp"><img src="/contents/images/new/login_menu_join.gif" alt="회원가입" /></a></li>
          <li><a href="/contents/member/search_idpwd.jsp"><img src="/contents/images/new/login_menu_info.gif" alt="아이디/패스워드 찾기" /></a></li>
        </ul>
        </fieldset>
        </form>
      </div>
    </div>
<% } else { //로그인후%>
    <h2 class="hid">로그아웃</h2>
    <div id="login">
      <p class="login_top_bg"></p>
      <div class="login_center">
        <fieldset class="search_t">
        <legend>로그아웃</legend>
        <dl class="search_d">
          <dt><img src="/contents/images/new/main_logout_icon.gif" alt="" /> <span class="fb"><%=sc_username %></span>님 환영합니다.</dt>
          <dd><a href="/contents/include/logout.jsp"><img src="/contents/images/new/main_logout_button.gif" alt="로그아웃" /></a> 
          <a href="/contents/mypage/myPage_04.jsp"><img src="/contents/images/new/main_top_login_info.gif" alt="정보수정하기" /></a></dd>
        </dl>
        </fieldset>
      </div>
    </div>
<%} %>