package kr.co.offton.jdf.db;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.math.*;
import java.sql.*;
import java.util.*;

import javax.sql.*;
import javax.naming.*;

import java.util.Properties;

import kr.co.offton.jdf.util.StringUtil;
import kr.co.offton.jdf.basis.*;
import kr.co.offton.pdf.basis.*;

import org.apache.commons.dbcp.BasicDataSource;
import org.apache.log4j.Logger;
/**
 * <pre>
 * PGM_NAME: OFFTON DbManager
 * DESC: DB 연동하는 클래스
 *       커넥션풀을 얻고, statement를 생성하여 쿼리를 실행하는 부분이 정의되어있음.
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public class DbManager extends GeneralObject {
  Connection conn = null;
  static DataSource dataSourceKairos = null;
  static DataSource dataSourceOracle = null;
  PreparedStatement pstmt = null;
  ResultSet rs = null;
  String preparedSql = null;
  
  static Logger logger = Logger.getRootLogger();
  

  int index = 1;

  boolean isPrintedDebugQuery  = false;

  /**
   * 특권 로그 레벨 여부
   * 질의문장이 긴 경우 log 출력으로 인해 성능의 하락이 오는 경우
   * 질의문장이 검증되었고 그 변화가 극히 적은 경우 특권적으로 로그레벨을 높인다.
   */
  private boolean isPrivilegedLogLevel = false;

  /**
   * <pre>
   * dbName를 "default"로 세팅하는 디폴트 생성자
   * 2012.10.4 김종현 jeuspool을 위한 connection Name 변경 
   * </pre>
   */
  public DbManager() {
      getDBConnection("jdbc/sgis");
  }

  /**
   * <pre>
   * dbName를 param String dbName으로 세팅하는 생성자
   * </pre>
   */
  public DbManager(String dbName) {
      getDBConnection(dbName);
  }

  /**
   * <pre>
   * Connection 객체를 반환
   * </pre>
   */
  public Connection getConn() {
    return conn;
  }

  /**
   * <pre>
   * Connection 객체를 세팅
   * </pre>
   */
  public void setConn(Connection conn) {
    this.conn = conn;
  }

  /**
   * <pre>
   * ConnectionPool을 관리하는 DbPoolManager 클래스의 객체를 생성하는 메소드(Factory 모델)
   * DbPoolManager 객체생성직후 바로 커넥션을 얻어옴.
   * @param  dbName
   * @return java.sql.Connection
   * @throws java.sql.SQLException
   * </pre>
   */
  public Connection getDBConnection(String dbName) {
	  
	  System.out.println("[DbManager.java] getDBConnection 시작");
	  System.out.println("[DbManager.java] getDBConnection dbName [" + dbName);
	  
    try {
    	System.out.println("[DbManager.java] ============= 111111 =================");
      logger.debug("dbName : "+dbName);
      System.out.println("[DbManager.java] ============= 2222222222 =================");
      
      if (dbName.equals("oracleKosis")) {
    	  
    	  System.out.println("[DbManager.java] ============= 3333333 =================");
    	  
        if (dataSourceOracle == null) {
          Context ctx = new InitialContext();
          dataSourceOracle = (DataSource) ctx.lookup(dbName);
        }
        else {
          printDataSourceStats(dataSourceOracle); // 커넥션 수 출력
        }
        conn = dataSourceOracle.getConnection();
      } else {
    	  System.out.println("[DbManager.java] ============= 444444 =================");
    	  System.out.println("[DbManager.java] dataSourceKairos [" + dataSourceKairos);
    	  
        if (dataSourceKairos == null){
        	
        	
        	
        	
        	/* 2012.10.04 김종현 JEUS Pool 작업을 위한 코드 수정 */
        	
        	//=========================================================================
        	//======================= 실환경 포팅시 바꾸어 주어야함 =======================
        	//=========================================================================
        	
        	
        	
        	//====================== 실환경 제우스 풀사용 =======================
        	//Context ctx = new InitialContext();
        	//dataSourceKairos = (DataSource) ctx.lookup("jdbc/sgis");
        	
        	
        	System.out.println("[DbManager.java] dataSourceKairos [" + dataSourceKairos);
        	
        	//======================= 로컬 개발용 =======================
        	dataSourceKairos = setupDataSource();
        	
        	//System.out.println("[DbManager.java] setupDataSource() 호출 후 ");
        	
        	
        	
        	//=========================================================================
        	//======================= 실환경 포팅시 바꾸어 주어야함 =======================
        	//=========================================================================
        	      	
        	
        	
        }
        else
          printDataSourceStats(dataSourceKairos); // 커넥션 수 출력
        conn = dataSourceKairos.getConnection();
      }


    } catch (Exception e) {
    	
    	//e.printStackTrace();
    	
      logger.error(this, e);
      conn = null;
    }
    return conn;
  }

  public synchronized DataSource setupDataSource() throws Exception {
    BasicDataSource ds = new BasicDataSource();

    return setupDataSource(ds);
  }

  public synchronized void resetDataSource() throws IOException {
	Context ctx;
	try {
		ctx = new InitialContext();
		dataSourceKairos = (DataSource) ctx.lookup("jdbc/sgis2015");
	} catch (NamingException e) {
		// 2015-12-03 시큐어코딩
		logger.error(e);
		ctx = null;
	}
  }

  private synchronized DataSource setupDataSource(BasicDataSource ds) throws IOException {
	  
	  System.out.println("[DbManager.java] setupDataSource 시작");
	  
    Properties prop = new Properties();

    InputStream inputstream = getClass().getResourceAsStream("/sgis_db.properties");
      BufferedInputStream bufferedinputstream = new BufferedInputStream(inputstream);
      prop.load(bufferedinputstream);
    bufferedinputstream.close();

    prop.list(System.out);

    String url = (String) prop.get("jdbc.url");
    String driverClassName = (String) prop.get("jdbc.driverClassName");
    String username = (String) prop.get("jdbc.username");
    String password = (String) prop.get("jdbc.password");
    
    System.out.println("[DbManager.java] url [" + url);

    ds.setDriverClassName(driverClassName);
    ds.setUsername(username);
    ds.setPassword(password);
    ds.setUrl(url);

    ds.setInitialSize( Integer.parseInt((String)prop.get("jdbc.initialSize")) );
    ds.setMaxActive( Integer.parseInt((String)prop.get("jdbc.maxActive")) );
    ds.setMaxIdle( Integer.parseInt((String)prop.get("jdbc.maxIdle")) );
    ds.setMaxWait( Integer.parseInt((String)prop.get("jdbc.maxWait")) );
    ds.setMinIdle( Integer.parseInt((String)prop.get("jdbc.minIdle")) );
    ds.setPoolPreparedStatements( Boolean.parseBoolean((String)prop.get("jdbc.minIdle")) );
    ds.setTestOnBorrow(Boolean.parseBoolean((String)prop.get("jdbc.testOnBorrow")));
    ds.setValidationQuery( (String) prop.get("jdbc.validationQuery") );

    return ds;
  }

    public static void printDataSourceStats(DataSource ds) throws SQLException {
    	BasicDataSource bds = null;
    	
    	try {
          bds = (BasicDataSource) ds;
          //System.out.println("NumActive: " + bds.getNumActive());
          //System.out.println("NumIdle: " + bds.getNumIdle());
        }
        catch (ClassCastException e) {
        	// 2015-12-03 시큐어코딩
        	logger.error(e);
        	bds = null;
        }
    }

  /**
   * <pre>
   * 이 클래스가 가비지 콜렉션될시에 이 클래스의 멤버변수인 PreparedStatement pstmt, ResultSet rs, kr.co.offton.jdf.db.OracleConnection conn을 close()한다.
   * </pre>
   */
  public void finalize() {
    try {
      close();
    } catch(Exception e){
        logger.error(this,e);
    }
  }

  /**
   * <pre>
   * 이 클래스의 멤버변수인 java.sql.PreparedStatement pstmt, java.sql.ResultSet rs, OracleConnection conn을 close()한다.
   * </pre>
   * @throws SQLException
   */
  public void close() throws SQLException {
    if (rs != null)
      try {
        rs.close();
      } catch (Exception ex) {
    	// 2015-12-03 시큐어코딩
    	  logger.error(ex);
    	  rs = null;
      }
    if (pstmt != null)
      try {
        pstmt.close();
      } catch (Exception ex) {
    	// 2015-12-03 시큐어코딩
    	  logger.error(ex);
    	  pstmt = null;
      }
    if (conn != null && !conn.isClosed()) {
      try {
        setAutoCommit(true);
        conn.close();
      } catch (Exception ex) {
    	// 2015-12-03 시큐어코딩
    	  logger.error(ex);
    	  conn.close();
      }
    }
  }

  /**
   * <pre>
   * 이 클래스의 멤버변수인 int index를 1로 세팅한다(index = 1);
   * </pre>
   */
  public void setIndex() {
    index = 1;
  }

  /**
   * <pre>
   * 멤버변수 java.sql.PreparedStatement pstmt 가 null이 아니면 close()하고 prepareStatement 메소드를 호출함.
   * @param  query
   * @return java.sql.PreparedStatement
   * @throws java.sql.SQLException
   * </pre>
   */
  public PreparedStatement prepareStatement(String query) throws SQLException{
    if(pstmt != null) pstmt.close();
    pstmt = conn.prepareStatement(query);
    index = 1;
    preparedSql = query;
    return pstmt;
  }

  /**
   * <pre>
   * param String query를 파싱한다(SqlParser 객체를 생성하여 parse()메소드 수행). ':컬럼명'은 '?'문자열로 치환되고
   * 컬럼명들은 파싱되는 순서되로 모아져서 java.util.Enumeration 객체로 얻는다. 컬럼명을 이용하여 리플렉션을 활용하여
   * '?'에 값을 세팅한다.
   * @param  query
   * @param  ldata
   * @return java.sql.PreparedStatement
   * @throws java.sql.SQLException
   * </pre>
   */
  public PreparedStatement prepareStatement(String query, LData ldata) throws SQLException{

    String[] sql = DbUtil.sqlCommentReader(query);

    //preparestment 메소드를 사용하여  Insert나 Update시 JDBC 내부에서 한글을 파싱하는 도중
    //Byte수가 2Byte에서 2~3Byte로 늘어나는 버그가 발생한다.
    //그로 인해 DB필드 타입이 Varchar2 4000인 경우 한글 2000자(영문4000자)가 입력되지 않게 되며
    //이를 해결하기 위해 LData클래스에서 데이터를 1000바이트 씩 쪼개서 처리하는데 이 작업을 처리하기 위해서
    //Form으로 전송하는 엘리먼트의 이름에 '_V'을 붙여서 작업을 구분한다.
    //쿼리에 :value_V 로 정의된 바인딩 변수가 있는 경우 :value_V_1||:value_V_2||:value_V_3||:value_V_4 로 치환한다.
    //'__BINDVALUES'의 키 이름으로 바인딩 변수들의 이름을 저장되어있다. 각각의 변수명은  ','으로 구분한다.
    if(ldata != null)
    {
        String __BINDVALUES = ldata.getString("__BINDVALUES");
        if(!__BINDVALUES.equals(""))
        {
            String keys[] = __BINDVALUES.split(",");
            for(int i=0; i<keys.length; i++)
            {
                if(!keys[i].equals(""))
                {
                    //예) key[0] = value_V, --> value_V_1||:value_V_2||:value_V_3||:value_V_4 으로 변경한다.
                    sql[1] = sql[1].replaceAll(keys[i], keys[i]+"_1||:"+keys[i]+"_2||:"+keys[i]+"_3||:"+keys[i]+"_4");
                }
            }
        }
    }

    //쿼리 로그작성
    if (! isPrivilegedLogLevel) {
      if(logger.isDebugEnabled() && !isPrintedDebugQuery) {
        logger.debug("\n\r"+sql[0]+sql[1]);
        isPrintedDebugQuery = true;
      }
    }
    
    
    System.out.println("\n=======================[DbManager.java] query 시작 ==================================="  );
    System.out.println("" + sql[0] + sql[1]);
    System.out.println("=======================[DbManager.java] query 끝 ===================================\n"  );
    
    
    //SqlParser를 이용해 ':컬럼명'을 '?'문자열로 치환
    SqlParser sp = new SqlParser(sql[1]);
    sp.parse();
    sql[1] = sp.getPreparedSql();
    prepareStatement(sql[1]);

    //'?'에 파라메터를 세팅
    Enumeration paramEle = sp.getParams().elements();
    String paramName = null;
    Object obj = null;

    
    System.out.println("\n=======================[DbManager.java] key value 시작 ==================================="  );
    while(paramEle.hasMoreElements()) {
    paramName = ((String)paramEle.nextElement()).substring(1);

    obj = ldata.getString(paramName);
    pstmt.setString(index,(String)obj);
    index++;

      if (! isPrivilegedLogLevel) {
        if(logger.isDebugEnabled()) logger.debug("LData getValue("+paramName+") = value("+StringUtil.fromDB(obj.toString())+")");
      }
      
      
      System.out.println("["+paramName+"] = ["+StringUtil.fromDB(obj.toString())+"]");
      
      
    }
    System.out.println("=======================[DbManager.java] key value 끝 ===================================\n"  );
    
    return pstmt;
  }

  /**
   * <pre>
   * 멤버필드 java.sql.PreparedStatement pstmt를 실행(execute())한다.
   * 실행전에 멤버필드 String preparedSql 를 로그파일에 write한다.
   * 실행결과는 true/false 로 리턴된다.<br>
   * update-select 모두 수행한다.
   * @return boolean
   * @throws java.sql.SQLException
   * </pre>
   */
  public boolean execute() throws SQLException {
  if (! isPrivilegedLogLevel) {
    if(logger.isDebugEnabled() && !isPrintedDebugQuery) {
      logger.debug("\n\r"+preparedSql);
    }
    isPrintedDebugQuery = false;
  }

    return pstmt.execute();
  }

  /**
   * <pre>
   * 멤버필드 java.sql.PreparedStatement pstmt를 실행(executeQuery())한다.
   * 실행전에 멤버필드 String preparedSql 를 로그파일에 write한다.
   * select 를 수행한다.
   * @return java.sql.ResultSet
   * @throws java.sql.SQLException
   * </pre>
   */
  public ResultSet executeQuery() throws SQLException {
  if (! isPrivilegedLogLevel) {
      if(logger.isDebugEnabled() && !isPrintedDebugQuery) {
        logger.debug("\n\r" + preparedSql);
      }
      isPrintedDebugQuery = false;
  }

    if(rs != null) rs.close();
    rs = pstmt.executeQuery();
    return rs;
  }

  /**
   * <pre>
   * 멤버필드 java.sql.PreparedStatement pstmt를 실행(executeUpdate())한다.
   * 실행전에 멤버필드 String preparedSql 를 로그파일에 write한다.
   * update를 모두 수행한다.
   * update된 row의 개수를 int로 리턴한다.
   * @return int
   * @throws java.sql.SQLException
   * </pre>
   */
  public int executeUpdate() throws SQLException {
  if (! isPrivilegedLogLevel) {
    if(logger.isDebugEnabled() && !isPrintedDebugQuery) {
      logger.debug("\n\r" + preparedSql);
    }
    isPrintedDebugQuery = false;
  }
    return pstmt.executeUpdate();
  }

  /**
   * <pre>
   * java API의 PrepareStatement의 pstmtSet 메소드와 동일하나
   * param으로 Object 객체를 받아서 null,java.lang.String,java.math.BigDecimal, java.sql.Timestamp형의 객체를 자동구분하여 세팅한다.
   * String 의 경우 StringUtil.toDB 메소드를 수행후 set한다. 따라서, DB에 넣을때 따로 StirngUtil.toDB 메소드를 사용할 필요가 없다.
   * 해당 데이타 타입은 이 메소드내부에서 DbUtil.getSqlType 메소드를 호출하여 얻어오므로 지정안 해도 된다.
   * 상기 4개의 유형이 아닌경우 java.sql.SQLException 발생시킨다.
   * @param  object
   * @throws java.sql.SQLException
   * </pre>
   */
  public void pstmtSet(Object object) throws SQLException {
    if(object == null){
      pstmt.setNull(index, DbUtil.getSqlType(object));
    }else{
      if(object instanceof java.lang.String)
        //pstmt.setString(index,(String)object);
        pstmt.setString(index,StringUtil.toDB((String)object));
      else if(object instanceof java.sql.Timestamp)
        pstmt.setTimestamp(index,(Timestamp)object);
      else if(object instanceof java.math.BigDecimal)
        pstmt.setBigDecimal(index,(BigDecimal)object);
      else if(object instanceof java.sql.Clob)
        pstmt.setClob(index,(Clob)object);
      else
        throw new SQLException("pstmtSet : 알 수 없는 파라메터입니다." + object);
    }
    index++;
  }

  /**
   * <pre>
   * java API의 PrepareStatement의 pstmtSet 메소드와 동일하나
   * param으로 Object 객체를 받아서 null,java.lang.String,java.math.BigDecimal, java.sql.Timestamp형의 객체를 자동구분하여 세팅한다.
   * String 의 경우 StringUtil.toDB 메소드를 수행후 set한다. 따라서, DB에 넣을때 따로 StirngUtil.toDB 메소드를 사용할 필요가 없다.
   * 상기 4개의 유형이 아닌경우 java.sql.SQLException 발생시킨다.
   * 해당 데이타 타입은 param int types이다.
   * @param  object
   * @param  types
   * @throws java.sql.SQLException
   * </pre>
   */
  public void pstmtSet(Object object,int types) throws SQLException {
    if(object == null){
      pstmt.setNull(index,types);
    }else{
      if(object instanceof java.lang.String)
        //pstmt.setString(index,(String)object);
        pstmt.setString(index,StringUtil.toDB((String)object));
      else if(object instanceof java.sql.Timestamp)
        pstmt.setTimestamp(index,(Timestamp)object);
      else if(object instanceof java.math.BigDecimal)
        pstmt.setBigDecimal(index,(BigDecimal)object);
      else if(object instanceof java.sql.Clob)
      pstmt.setClob(index,(Clob)object);
      else
        throw new SQLException("pstmtSet : 알 수 없는 파라메터입니다." + object);
    }
    index++;
  }

  /**
   * <pre>
   * executeQuery()를 메소드 내부에서 수행한다. param int pg와 param int pgSize는 페이징처리를 위한 변수임.
   * 목록 조회시에 사용함.
   * @param  pg
   * @param  pgSize
   * @return kr.co.offton.jdf.db.RecordModel
   * @throws java.sql.SQLException,kr.co.offton.jdf.db.RecordModelException
   * </pre>
   */
  public RecordModel select(int pg,int pgSize) throws SQLException,RecordModelException {
    rs = executeQuery();
    RecordModel rm = new RecordModel(rs);
    rm.select(rs,pg,pgSize);
    return rm;
  }

  /**
   * <pre>
   * executeUpdate()를 호출한다. 호출결과가 0 보다 크면 true, 아니면 false
   * @return boolean
   * @throws java.sql.SQLException
   * </pre>
   */
  public boolean insert() throws SQLException{
    boolean success = false;
    if(executeUpdate()>0){
      success = true;
    }
    return success;
  }

  /**
   * <pre>
   * 커넥션을 자동커밋상태를 세팅한다.
   * @param  autoCommit
   * @throws java.sql.SQLException
   * </pre>
   */
  public void setAutoCommit(boolean autoCommit) throws SQLException {
    conn.setAutoCommit(autoCommit);
  }

  /**
   * <pre>
   * 커밋실행
   * @throws java.sql.SQLException
   * </pre>
   */
  public void commit() throws SQLException {
    conn.commit();
  }

  /**
   * <pre>
   * 롤백실행
   * @throws java.sql.SQLException
   * </pre>
   */
  public void rollback() throws SQLException {
    conn.rollback();
  }

  /**
   * <pre>
   * executeQuery()를 호출한다. kr.co.offton.jdf.db.RecordModel 클래스의 select(java.sql.ResultSet, int)를 실행(param int만큼 rs.next()한 후에 다음 데이타부터 RecordModel이 사용한다.)
   * @param  pos
   * @return boolean
   * @throws java.sql.SQLException
   * </pre>
   */
  public RecordModel select(int pos) throws SQLException {
    rs = executeQuery();
    RecordModel rm = new RecordModel(rs);
    rm.select(rs,pos);
    return rm;
  }

  /**
   * <pre>
   * executeQuery()를 호출한다. kr.co.offton.jdf.db.RecordModel 클래스의 select(java.sql.ResultSet, int)를 실행(param int만큼 rs.next()한 후에 다음 데이타부터 RecordModel이 사용한다.)
   * @return RecordModel
   * @throws java.sql.SQLException
   * </pre>
   */
  public RecordModel select() throws SQLException {
    rs = executeQuery();
    RecordModel rm = new RecordModel(rs);
    rm.select(rs,0);
    return rm;
  }

  public void setPrivilege(boolean isPrivilged) {
    this.isPrivilegedLogLevel = isPrivilged;
  }
}