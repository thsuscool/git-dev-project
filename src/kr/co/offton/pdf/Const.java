package kr.co.offton.pdf;

/**
 * <pre>
 * PGM_NAME: OFFTON Const
 * DESC: 웹에서 작업모드에 대한 상수들이 선언된 클래스
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 */
public class Const {
    /**
     * 알수업는 작업모드(0)
     */
    public static final int P_NONE = 0;

    /**
     * 작업모드 : 조회(100)
     */
    public static final int P_RET = 100;

    /**
     * 작업모드 : 등록(200)
     */
    public static final int P_INS = 200;

    /**
     * 작업모드 : 복수등록(210)
     */
    public static final int P_INSS = 210;
    
    /**
     * 작업모드 : 등록후 조회모드전환(220)
     */
    public static final int P_INS2RET = 220;

    /**
     * 작업모드 : 수정(300)
     */
    public static final int P_UPD = 300;

    /**
     * 작업모드 : 복수수정(310)
     */
    public static final int P_UPDS = 310;

    /**
     * 작업모드 : 삭제(400)
     */
    public static final int P_DEL = 400;

    /**
     * 작업모드 : 복수삭제(410)
     */
    public static final int P_DELS = 410;

    /**
     * 작업모드 : 출력(500)
     */
    public static final int P_PRN = 500;

    /**
     * 작업모드 : 확인(600)
     */
    public static final int P_CONFIRM = 600;

    /**
     * 작업모드 : 취소(700)
     */
    public static final int P_CANCEL = 700;

    /**
     * 에러모드 : 성공(0)
     */
    public static final int E_OK = 0;

    /**
     * 에러모드 : 성공(0)
     */
    public static final int E_SUCCESS = 0;

    /**
     * 에러모드 : 에러(-1)
     */
    public static final int E_ERROR = -1;

    /**
     * 에러모드 : 치명적에러(-2)
     */
    public static final int E_FATAL = -2;

    public static String ROOTDIR = "D:\\workspace\\sticims\\web\\";

    public static String WEBROOT = "http://192.168.0.175:8080";
    
/* == real ==
 *  public static String ROOTDIR = "D:\\www\\sticims\\web\\";
 *  public static String WEBROOT = "http://192.168.0.16:8082";     
 */




    /**
     * <pre>
     * param char codeClass('p' : 작업모드, 'e' : 에러모드) 해당하는 param int code 모드의 이름을 리턴함.
     * 디폴트옵션(공백 옵션)은 없음.
     * @param  codeClass
     * @param  code
     * @return String
     * @throws com.jdf.db.DbManagerException
     * </pre>
     */
    public static String getCodeName(char codeClass, int code) {
        switch (codeClass) {
        case 'P':
        case 'p':
            switch (code) {
            case P_NONE:
                return "NONE";
            case P_RET:
                return "조회";
            case P_INS:
                return "등록";
            case P_INSS:
                return "복수등록";
            case P_UPD:
                return "수정";
            case P_UPDS:
                return "복수수정";
            case P_DEL:
                return "삭제";
            case P_DELS:
                return "복수삭제";
            case P_PRN:
                return "출력";
            case P_CONFIRM:
                return "확인";
            case P_CANCEL:
                return "취소";
            default:
                return "NONE";
            }
        case 'E':
        case 'e':
            switch (code) {
            case E_OK:
                return "성공";
            case E_ERROR:
                return "에러";
            case E_FATAL:
                return "치명적에러";
            default:
                return "NONE";
            }
        default:
            return "NONE";
        }
    }
}
