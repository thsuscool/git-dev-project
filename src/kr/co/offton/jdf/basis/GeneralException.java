package kr.co.offton.jdf.basis;

/**
 * <pre>
 * PGM_NAME: OFFTON GeneralException
 * DESC: Exception�� ��ӹ��� Exception Ŭ����
 * author: (��)���� Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 */
public class GeneralException extends Exception {
  private static final long serialVersionUID = 1L;

  public GeneralException() {
    super();
  }

  public GeneralException(String s) {
    super(s);
  }

  public GeneralException(Throwable cause) {
    super(cause);
  }
}