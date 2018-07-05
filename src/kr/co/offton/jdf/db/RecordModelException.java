package kr.co.offton.jdf.db;

import kr.co.offton.jdf.basis.GeneralException;

/**
 * <pre>
 * PGM_NAME: OFFTON RecordModelException
 * DESC: 디비연동하여 java.sql.ResultSet처리하는 kr.co.offton.jdf.db.RecordModel 을 처리하기위한 Exception 클래스
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public class RecordModelException extends GeneralException{
  private static final long serialVersionUID = 1L;

  public RecordModelException()
  {
    super();
  }

  public RecordModelException(String s)
  {
    super(s);
  }
}