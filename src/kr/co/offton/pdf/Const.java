package kr.co.offton.pdf;

/**
 * <pre>
 * PGM_NAME: OFFTON Const
 * DESC: ������ �۾���忡 ���� ������� ����� Ŭ����
 * author: (��)���� Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 */
public class Const {
    /**
     * �˼����� �۾����(0)
     */
    public static final int P_NONE = 0;

    /**
     * �۾���� : ��ȸ(100)
     */
    public static final int P_RET = 100;

    /**
     * �۾���� : ���(200)
     */
    public static final int P_INS = 200;

    /**
     * �۾���� : �������(210)
     */
    public static final int P_INSS = 210;
    
    /**
     * �۾���� : ����� ��ȸ�����ȯ(220)
     */
    public static final int P_INS2RET = 220;

    /**
     * �۾���� : ����(300)
     */
    public static final int P_UPD = 300;

    /**
     * �۾���� : ��������(310)
     */
    public static final int P_UPDS = 310;

    /**
     * �۾���� : ����(400)
     */
    public static final int P_DEL = 400;

    /**
     * �۾���� : ��������(410)
     */
    public static final int P_DELS = 410;

    /**
     * �۾���� : ���(500)
     */
    public static final int P_PRN = 500;

    /**
     * �۾���� : Ȯ��(600)
     */
    public static final int P_CONFIRM = 600;

    /**
     * �۾���� : ���(700)
     */
    public static final int P_CANCEL = 700;

    /**
     * ������� : ����(0)
     */
    public static final int E_OK = 0;

    /**
     * ������� : ����(0)
     */
    public static final int E_SUCCESS = 0;

    /**
     * ������� : ����(-1)
     */
    public static final int E_ERROR = -1;

    /**
     * ������� : ġ��������(-2)
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
     * param char codeClass('p' : �۾����, 'e' : �������) �ش��ϴ� param int code ����� �̸��� ������.
     * ����Ʈ�ɼ�(���� �ɼ�)�� ����.
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
                return "��ȸ";
            case P_INS:
                return "���";
            case P_INSS:
                return "�������";
            case P_UPD:
                return "����";
            case P_UPDS:
                return "��������";
            case P_DEL:
                return "����";
            case P_DELS:
                return "��������";
            case P_PRN:
                return "���";
            case P_CONFIRM:
                return "Ȯ��";
            case P_CANCEL:
                return "���";
            default:
                return "NONE";
            }
        case 'E':
        case 'e':
            switch (code) {
            case E_OK:
                return "����";
            case E_ERROR:
                return "����";
            case E_FATAL:
                return "ġ��������";
            default:
                return "NONE";
            }
        default:
            return "NONE";
        }
    }
}
