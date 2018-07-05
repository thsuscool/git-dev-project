package kr.co.offton.jdf.db;

import oracle.jdbc.pool.*;
import java.sql.*;

import kr.co.offton.jdf.basis.GeneralObject;

/**
 * <pre>
 * PGM_NAME: OFFTON DbConnectionPool
 * DESC: classes12.zip에 있는 OracleConnectionCacheImpl 을 활용하여 오라클 DB Connection을 풀링하여 관리하는 클래스
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public class DbConnectionPool extends GeneralObject {

  private final int SLEEP_INTERVAL = 2000;
  private OracleConnectionCacheImpl oci;
  private long logTimer;
  private long logInterval;
  private Thread poolMonitor;

  /**
   * <pre>
   * 생성자
   * @param name
   * @param url
   * @param user
   * @param password
   * @param maxConns
   * @param minConns
   * @param cacheScheme
   * @param logInterval
   * @throws SQLException
   * </pre>
   */
  public DbConnectionPool(String name , String url  , String user    , String password,
                          int maxConns, int minConns, int cacheScheme, long logInterval) throws SQLException {

    oci = new OracleConnectionCacheImpl();
    oci.setURL     (url     );
    oci.setUser    (user    );
    oci.setPassword(password);
    oci.setMaxLimit(maxConns);
    oci.setMinLimit(minConns);

    // Set the cache scheme.
    if ( cacheScheme == 1 ) {
      oci.setCacheScheme(OracleConnectionCacheImpl.FIXED_RETURN_NULL_SCHEME);
    } else if ( cacheScheme == 2 ) {
      oci.setCacheScheme(OracleConnectionCacheImpl.FIXED_WAIT_SCHEME);
    }

    this.logInterval = logInterval;
    logTimer = System.currentTimeMillis();

    // Create the monitor Thread.
    poolMonitor = new Thread(new Runnable(){public void run() {monitor();}});
    poolMonitor.start();
  }

  /**
   * <pre>
   * 커넥션을 얻어옴
   * @return synchronized
   * @throws SQLException
   * </pre>
   */
  public synchronized Connection getConnection() throws SQLException {
    Connection conn = oci.getConnection();
    if ( conn == null ) {
      throw new SQLException("Maximum number of connections in pool succeeded.");
    }
    return conn;
  }

  /**
   * <pre>
   * Close any open inConns when this object is garbage collected.
   * @throws SQLException
   * </pre>
   */
  public void finalize() throws SQLException {
    close();
    if(logger.isInfoEnabled()) {
      logger.info("DbConnectionPool finalized");
    }
  }

  /**
   * <pre>
   * 커넥션 닫기
   * @throws SQLException
   * </pre>
   */
  public synchronized void close() throws SQLException {
    oci.close();
  }

  public int totalCount() {
    return oci.getCacheSize();
  }

  public int inCount() {
    return (totalCount() - outCount());
  }

  public int outCount() {
    return oci.getActiveSize();
  }

  private void log() {
    if(logger.isInfoEnabled()) {
      logger.info("IN + OUT = TOTAL: " + inCount() +   "+" + outCount() + "=" + totalCount() );
    }
  }

  private void log(String msg) {
    if(logger.isInfoEnabled()) {
      logger.info(msg);
    }
  }

  private void monitor() {
    while(true) {
      // This is only done every logInterval seconds.
      if ((logInterval != 0) && ((System.currentTimeMillis() - logTimer) > logInterval)) {
        log();
        logTimer = System.currentTimeMillis();
      }

      // Rest the Thread on a regular basis.
      try {
        Thread.sleep(SLEEP_INTERVAL);
      } catch (InterruptedException e) {
        log("Interrupted in the monitor function");
      }
    }
  }
}

