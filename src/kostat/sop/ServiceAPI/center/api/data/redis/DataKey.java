package kostat.sop.ServiceAPI.center.api.data.redis;

public enum DataKey {
    BOARDLIKE("board", "like"),     // 게시판 좋아요.
    PROFILE("users", "profile"),    // 회원 정보
    USERLOGIN("users", "login"),    // 일자별 방문 여부
    LOG("system", "log"),           // 로그 통합
    PAGEVIEW("page", ""),			// 일자별 페이지 방문 통계
    VISIT("statistics", "visit");   // 순수 방문자 통계
    
    String format = "%s:%s:%s";
	String idFormat = "%s:%s:%s";
    String mainStr = null;
    String subStr = null;
	
    DataKey(String mainClass, String subClass) {
        this.mainStr = mainClass;
        this.subStr = subClass;
    }
    
    public String get(String id) {
        return String.format(idFormat, mainStr, subStr, id);
    }
    
    public String get() {
        return String.format(format, mainStr, subStr);
    }
}
