package kr.co.offton.jdf.db;

import java.util.*;
import java.sql.*;

import org.w3c.dom.*;
import oracle.jdbc.driver.*;

import kr.co.offton.jdf.cfg.ConfigManager;
import kr.co.offton.jdf.xml.XMLUtil;
import kr.co.offton.jdf.basis.GeneralObject;

/**
 * <pre>
 * PGM_NAME: OFFTON DbPoolManager
 * DESC: 오라클 DB Connection Pool을 관리하는 클래스
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public final class DbPoolManager extends GeneralObject {

  private static DbPoolManager instance;
  private static int users;
  private Hashtable pools;

  private DbPoolManager() throws SQLException {
    try
    {
        init();
    }
    catch (SQLException e)
    {
      throw e;
    }
  }

  public static synchronized DbPoolManager getInstance() throws SQLException {
    if( instance == null ){
        instance = new DbPoolManager();
    }
    users++;
    return instance;
  }

  private synchronized void init() throws SQLException {

    DbConnectionPool pool;

    users = 0;
    pools = new Hashtable(5);

    org.w3c.dom.Document document = ConfigManager.getInstance().getDocument();
    NodeList nodelist = XMLUtil.select(document, "/XMLConfig/connectiondefs/connection");

    if(nodelist != null && nodelist.getLength() > 0)
    {
      int i = nodelist.getLength();

      for(int j = 0; j < i; j++)
      {
        Element element  = (Element)nodelist.item(j);
        String poolname  = XMLUtil.valueOf(element, "poolname").toLowerCase();
        String driver    = XMLUtil.valueOf(element, "driver");
        String url       = XMLUtil.valueOf(element, "dburl");
        String user      = XMLUtil.valueOf(element, "username");
        String password  = XMLUtil.valueOf(element, "password");
        int maxConns     = 10;
        int minConns     = 5;
        int logInterval  = 36000000;
        int cacheScheme  = 1;

        if(logger.isInfoEnabled()) {
          logger.info(
            "pollmanager : " + poolname + "\n" +
            "user : " + user +            "\n" +
            "password : " + password +    "\n" +
            "url : " + url +              "\n" +
            "driver " + driver +          "\n");
        }

        pool = new DbConnectionPool(poolname,url,user,password,maxConns,minConns,cacheScheme,logInterval );
        pools.put(poolname,pool);

        if(logger.isInfoEnabled()) {
          logger.info(
          "Initialized DbConnectionPool " + poolname + "\n" +
          "user : " + user +                           "\n" +
          "password : " + password +                   "\n" +
          "url : " + url +                             "\n" +
          "driver " + driver +                         "\n");
        }

      }
    }
    else
    {
        throw new SQLException("XMLConfig Load fail");
    }
  }

  /**
   * <pre>
   * ConnectionPool을 관리하는 하는 메소드.
   * DbConnectionPool 객체생성직후 바로 커넥션을 얻어옴.
   * @param poolname
   * @return DbConnectionPool
   * </pre>
   */
  public DbConnectionPool getConnectionPool( String poolname ){
      return (DbConnectionPool) pools.get(poolname);
  }

  public OracleConnection getConnection( String poolname ){
    OracleConnection conn = null;
    DbConnectionPool pool = (DbConnectionPool) pools.get(poolname);
    if( pool != null ){
        try {
    conn = (OracleConnection)pool.getConnection();
        } catch ( SQLException e ){
    logger.error("Unable to get a connection "
                +   "from the " + poolname + " pool.",e);
    		conn = null;
        }
    }
    return conn;
  }

  /**
   * <pre>
   * DbConnectionPool를 닫는 메소드.
   * </pre>
   */
  public void close(){
    // Do nothing until the last client
    // has released its instance.
    if( --users != 0 ){
        return;
    }
    // Close down all DbConnectionPool objects.
    for( Enumeration e = pools.elements(); e.hasMoreElements(); ){
      try {
    	  ( (DbConnectionPool) e.nextElement() ).close();
      } catch ( SQLException s ){
    	  logger.error(s);
    	  return;
      }
    }
  }
}