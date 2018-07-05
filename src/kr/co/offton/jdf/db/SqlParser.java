package kr.co.offton.jdf.db;

import java.util.*;
import java.sql.*;
import java.io.IOException;
import java.io.Reader;
import java.math.*;

import kr.co.offton.jdf.util.*;
import kr.co.offton.jdf.basis.GeneralObject;

/**
 * <pre>
 * PGM_NAME: OFFTON SqlParser
 * DESC: SQL문을 파싱하는 클래스
 *       컬럼명 형식으로 되어있는 부분을  ? 로 바꾸고, 컬럼명을 Vector에 담아서 리턴한다.
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public class SqlParser extends GeneralObject {

  String sql;                      //생성자 호출시 받은 param String sql
  StringBuffer preparedSql;        //PrepareStatement 객체에서 사용가능한 sql문으로 파싱된 sql문
  Vector params;           //sql문에서 다루는 컬럼명을 sql문에 나오는 순서되로 담는 java.util.Vector
  boolean sqlFlag = false;         //해석된 문장이 SQL인지의 여부 일반 수식이면 false
  boolean updateSqlFlag = false;

  /**
   * <pre>
   * param String sql을 받는 생성자
   * @param sql
   * </pre>
   */
  public SqlParser (String sql) throws SQLException {
    this.sql    = sql;
    preparedSql = new StringBuffer();
    params      = new Vector();
  }

  public boolean isSql() { return sqlFlag; }
  public boolean isUpdateSql() { return updateSqlFlag; }

  /**
   * <pre>
   * 멤버필드 String sql을 파싱하여 멤버필드 StringBuffer preparedSql이 레퍼런싱케함.
   * @throws java.sql.SQLException
   * </pre>
   */
  public void parse() throws SQLException {
    int i = 0;
    StringTokenizer st = new StringTokenizer(this.sql, " \t\r\n+-*/()=><!,|@");

    preparedSql.delete(0, preparedSql.length());
    preparedSql.append(this.sql);
    params.clear();
    while (st.hasMoreTokens()) {
      String token = st.nextToken();

      if(token != null &&
              (token.equals("SELECT") || token.equals("select") ||
               token.equals("INSERT") || token.equals("insert") ||
               token.equals("UPDATE") || token.equals("update") ||
               token.equals("DELETE") || token.equals("delete") ) )
        sqlFlag = true;

      if(token != null &&
              (token.equals("INSERT") || token.equals("insert") ||
               token.equals("UPDATE") || token.equals("update") ||
               token.equals("DELETE") || token.equals("delete") ) )
        updateSqlFlag = true;

      // ':' 문자로 시작되는 token만
      if(token != null && token.trim().substring(0, 1).equals(":") && token.length() >1)
        params.add(token.trim());

        //Logger.debug.println(this, "parse()", "token[" + i + "] = [" + token.trim() + "]");
      i++;
    }

    if(isSql()) {
      Enumeration e = params.elements();
      while(e.hasMoreElements()) {
        String param = (String)e.nextElement();
        replaceParam(preparedSql, param, "?");
      }
    }
  }

  /**
   * <pre>
   * 멤버필드 String sql을 get함.
   * @return String
   * uml.property name="sql"
   * </pre>
   */
  public String getSql() {
    return sql;
  }

  /**
   * <pre>
   * 멤버필드 String sql을 파싱시에 sql문에 나오는 컬럼명(:컬럼명 中 ':'을 제외한 컬럼명을 나오는 순서대로 멤버필드 Vector params에 add함)<br>
   * 멤버필드 Vector params를 get하는 메소드
   * @return Vector
   * uml.property name="params"
   * </pre>
   */
  public Vector getParams() {
    return params;
  }

  /**
   * <pre>
   * 멤버필드 StringBuffer preparedSql은 생성자 호출시에 받은 sql문을 파싱하고난 sql문임.
   * 멤버필드 StringBuffer preparedSql를 String 객체로 get하는 메소드
   * @return String
   * @throws java.sql.SQLException
   * uml.property name="preparedSql"
   * </pre>
   */
  public String getPreparedSql() throws SQLException {
    return preparedSql.toString();
  }

  /**
   * <pre>
   * sql문 파싱시에 내부적으로 호출되는 메소드.
   * param StringBuffer replaceSql에서 param String paramName이 처음으로 나오는 문자열을 param String value로 치환하는 메소드
   * @param replaceSql
   * @param paramName
   * @param value
   * @throws java.sql.SQLException
   * </pre>
   */
  public void replaceParam(StringBuffer replaceSql, String paramName, String value) throws SQLException {
    int startPos = -1;
    try {
      startPos = replaceSql.toString().indexOf(paramName);
      if( startPos < 0 ) return; //throw new NullPointerException() ;
      //Logger.debug.println(this, "replaceParam()", "paramName : " + paramName + ", startPos : " + startPos + ", param Length : " + paramName.length() + ", value : " + value.trim());

      replaceSql.replace(startPos, startPos + paramName.length(), value.trim());
    }catch(NullPointerException  e) {
      logger.debug(this, e);
      throw new SQLException("setParamString: 파라메터 오류 입니다. name[" + paramName + "]=["+value+"]");
    }
  }

  /**
   * <pre>
   * PreparedStatement 에 paramemter setting.
   * @param paramName
   * @param value
   * @throws java.sql.SQLException
   * </pre>
   */
  public void setParam(String paramName, Object value) throws SQLException {
  }

  /**
   * <pre>
   * Statement 문장 자체에 param String paramName에 param Object value를 치환.
   * @param paramName
   * @param value
   * @throws java.sql.SQLException
   * </pre>
   */
  public void replaceParam(String paramName, Object value) throws SQLException, IOException {
    if(value instanceof java.lang.String)
      replaceParamString(paramName, (String)value);
    else if(value instanceof java.sql.Timestamp)
      replaceParamTimestamp(paramName, (Timestamp)value);
    else if(value instanceof java.math.BigDecimal)
      replaceParamBigDecimal(paramName, (BigDecimal)value);
    else if(value instanceof java.sql.Clob)
    	replaceParamClob(paramName, (Clob)value);
    else
      throw new SQLException("setParam : 알 수 없는 파라메터 Type 입니다." + value);
  }

  /**
   * <pre>
   * Statement 문장 자체에 param String paramName에 param String value를 치환.
   * @param paramName
   * @param value
   * @throws java.sql.SQLException
   * </pre>
   */
  public void replaceParamString(String paramName, String value) throws SQLException {
    this.sql = this.sql.replaceAll(paramName, "'" + value + "'");
  }

  /**
   * <pre>
   * Statement 문장 자체에 param String paramName에 param BigDecimal value를 치환.
   * @param paramName
   * @param value
   * @throws java.sql.SQLException
   * </pre>
   */
  public void replaceParamBigDecimal(String paramName, BigDecimal value) throws SQLException {
    this.sql = this.sql.replaceAll(paramName, value.toString());
  }

  /**
   * <pre>
   * Statement 문장 자체에 param String paramName에 param Timestamp value를 치환.
   * @param paramName
   * @param value
   * @throws java.sql.SQLException
   * </pre>
   */
  public void replaceParamTimestamp(String paramName, Timestamp value) throws SQLException {
    replaceParamString(paramName, DateTime.getDateString(value));
  }
  
  /**
   * <pre>
   * Statement 문장 자체에 param String paramName에 param Clob value를 치환.
   * @param paramName
   * @param value
   * @throws java.sql.SQLException
   * </pre>
   */
  public void replaceParamClob(String paramName, Clob value) throws SQLException, IOException 
  {
	  StringBuffer data = new StringBuffer();
	  Reader reader = value.getCharacterStream();
	  
      char[] buf = new char[1024];
      int cnt = 0;
      if (null != reader) {
          while ( (cnt = reader.read(buf)) != -1) {
              data.append(buf, 0, cnt);
          }
      }	  
      replaceParamString(paramName, data.toString());
  }

  /**
   * <pre>
   * SQL 문자을 되돌린다. 문자열변환시 사용할 수 이도록 한다.
   * @return String
   * </pre>
   */
  public String toString() {
    return getSql();
  }
}