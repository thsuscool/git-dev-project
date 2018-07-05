package kr.co.offton.jdf.db;

import java.sql.*;

/**
 * <pre>
 * PGM_NAME: OFFTON DbCallManager
 * DESC: 프로시져를 실행해야하는 DB연동의 경우 사용하는 클래스
 *       내부에서 java.sql.CallableStatement를 사용함.
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public class DbCallManager extends DbManager {
  CallableStatement cstmt = null;

  /**
   * <pre>
   * 생성자
   * </pre>
   */
  public DbCallManager() {
    super();
  }

  /**
   * <pre>
   * 디비명의 param String dbName으로 가져오는 생성자
   * </pre>
   */
  public DbCallManager(String dbName) {
    super(dbName);
  }

  /**
   * <pre>
   * 부모클래스의 멤버필드 oracle.jdbc.pool.OracleConnection conn과 멤버필드 java.sql.CallableStatement cstmt를 close()하는 메소드
   * </pre>
   */
  public void close() {
    try {
      if (cstmt != null) cstmt.close();
      if (conn  != null) conn .close();
    }  catch(SQLException ex) {
    	// 2015-12-03 시큐어코딩
    	logger.error(ex);
    	
    	if(cstmt != null) {
    		cstmt = null;
    	}
    	
    	if(conn != null) {
    		conn = null;
    	}
    }
  }

  /**
   * <pre>
   * java.sql.CallableStatement 객체를 얻어서 멤버필드 java.sql.CallableStatement cstmt에 레퍼런싱함.
   * @param query
   * @return java.sql.CallableStatement
   * @throws SQLException
   * </pre>
   */
  public CallableStatement getCallableStatement(String query) throws SQLException {
    cstmt = conn.prepareCall(query);
    return cstmt;
  }

  /**
   * <pre>
   * 멤버필드 java.sql.CallableStatement cstmt를 call함.
   * @param query
   * @throws SQLException
   * </pre>
   */
  public void execProc(String query) throws SQLException {
    cstmt = conn.prepareCall(query);
    cstmt.execute();
  }
}