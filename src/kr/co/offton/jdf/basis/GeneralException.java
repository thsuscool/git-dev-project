package kr.co.offton.jdf.basis;

/**
 * <pre>
 * PGM_NAME: OFFTON GeneralException
 * DESC: Exception을 상속받은 Exception 클래스
 * author: (주)옵톤 Offton Co., Ltd.
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