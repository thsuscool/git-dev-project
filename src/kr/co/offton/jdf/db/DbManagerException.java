package kr.co.offton.jdf.db;

import kr.co.offton.jdf.basis.GeneralException;

/**
 * <pre>
 * PGM_NAME: OFFTON DbManagerException
 * DESC: 디비연동시 발생되는 Exception을 처리하기위한 Exception 클래스. 아직은 GeneralException을 상속만 함.
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public class DbManagerException extends GeneralException{
  private static final long serialVersionUID = 1L;

  public DbManagerException()
  {
    super();
  }

  public DbManagerException(String s)
  {
    super(s);
  }
}