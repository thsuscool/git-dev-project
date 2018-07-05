package kr.co.offton.jdf.cfg;

import java.io.BufferedInputStream;
import org.w3c.dom.Document;

import kr.co.offton.jdf.xml.XMLUtil;
import kr.co.offton.jdf.xml.XMLParserHelper;
import kr.co.offton.jdf.basis.GeneralObject;

/**
 * <pre>
 * PGM_NAME: OFFTON ConfigManager
 * DESC: 시스템 설정을 관리하는 클래스
 *       XMLConfig.xml 파일에 정의된 내용을 읽어 시스템환경을 설정한다.
 *       현재는 jsp엔진에서 한글을 자동으로 처리하는 부분(charConversion)과 DB 정보를 설정한다.
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 */

public class ConfigManager extends GeneralObject {

  private static final String CONFIG_FILE_NAME = "/XMLConfig.xml";
  private static org.w3c.dom.Document document = null;

  /**
   * uml.property name="instance"
   * @uml.associationEnd multiplicity="(0 1)"
   */
  private static ConfigManager instance = null;


  private static boolean charConversion;
  private static String runMode;
  private static String sqlPath;  
  private static boolean sqlReload;
  private static String scWebUrl;
  private static String scAbsouteRoot;
  private static String scFilePath;
  private static String scFilePathBoard;
  private static String scPageTitle;
  private static String loginYn;
  private static int fileSizeLimit;
  private static String statisticsURL;
  private static String statisticsResourceURL;
  private static String mailHost;
  private static String mailFromName;
  private static String mailFromAddress;
  private static String nameCheckServiceID;
  private static String nameCheckServiceNO;
  private static String ipCheckip1;
  private static String ipCheckip2;
  private static String ipCheckip3;
  private static String ipCheckip4;
  private static String ipCheckip5;
  private static String apiKey;
  private static boolean isDev;
  private static String wasId;

  private ConfigManager() {
    charConversion = false;
    sqlReload = false;
    runMode = "";
    sqlPath = "";
    loadConfigFile();
  }

  /**
   * uml.property name="instance"
   */
  public static ConfigManager getInstance() {
    if (instance == null)
      instance = new ConfigManager();
    return instance;
  }

  /**
   * uml.property name="document"
   */
  public Document getDocument() {
    return document;
  }

  /**
   *
   * uml.property name="charConversion"
   */
  public static boolean getCharConversion() {
    return charConversion;
  }

  /**
   * uml.property name="charConversion"
   */
  public boolean getSqlReload() {
    return sqlReload;
  }

  /**
   * uml.property name="runMode"
   */
  public String getRunMode() {
    return runMode;
  }

  /**
   * uml.property name="sqlPath"
   */
  public String getSqlPath() {
    return sqlPath;
  }

  private synchronized void loadConfigFile() {

    try {
      java.io.InputStream inputstream = getClass().getResourceAsStream(CONFIG_FILE_NAME);

      BufferedInputStream bufferedinputstream = new BufferedInputStream(inputstream);

      document = XMLParserHelper.parse(bufferedinputstream, null, null);
      bufferedinputstream.close();
    } catch(Exception e) {
      System.out.println("ConfigManager loadConfigFile() : CONFIG_FILE Load Error!!");
      return;
    }

    // 한글변환여부
    String s1 = XMLUtil.valueOf(document, "/XMLConfig/charConversion");
    charConversion = s1 != null && s1.equalsIgnoreCase("true");

    // 운영환경
    runMode = XMLUtil.valueOf(document, "/XMLConfig/runMode");

    // sql query file 저장 경로
    sqlPath = XMLUtil.valueOf(document, "/XMLConfig/sqlPath");

    // sql query 계속 file에서 읽을지 여부
    String s2 = XMLUtil.valueOf(document, "/XMLConfig/sqlReload");
    sqlReload  = s2 != null && s2.equalsIgnoreCase("true");

    //web url
    scWebUrl = XMLUtil.valueOf(document, "/XMLConfig/scWebUrl");

    // 웹 루트 디렉토리
    scAbsouteRoot = XMLUtil.valueOf(document, "/XMLConfig/scAbsouteRoot");

    // 첨부파일 업로드 위치
    scFilePath = XMLUtil.valueOf(document, "/XMLConfig/scFilePath");

    // 첨부파일 업로드 Board 위치
    scFilePathBoard = XMLUtil.valueOf(document, "/XMLConfig/scFilePathBoard");

    // 각 페이지의 공통 타이틀
    scPageTitle = XMLUtil.valueOf(document, "/XMLConfig/scPageTitle");

    // 로그인 유무
    loginYn = XMLUtil.valueOf(document, "/XMLConfig/loginYn");

    // 5 * 1024 * 1024
    fileSizeLimit = Integer.parseInt(XMLUtil.valueOf(document, "/XMLConfig/fileSizeLimit"));

    // 통계네비게이터 모듈 참조 URL
    statisticsURL = XMLUtil.valueOf(document, "/XMLConfig/statisticsURL");

    // 통계네비게이터 자원(js, css, 기타) 잠초 URL
    statisticsResourceURL = XMLUtil.valueOf(document, "/XMLConfig/statisticsResourceURL");

    // smtp 메일서버
    mailHost = XMLUtil.valueOf(document, "/XMLConfig/mail/host");

    // 메일발송 대표 발신자명
    mailFromName = XMLUtil.valueOf(document, "/XMLConfig/mail/from/name");

    // 메일발송 대표 발신주소
    mailFromAddress = XMLUtil.valueOf(document, "/XMLConfig/mail/from/address");

    // 실명인증 서비스 ID
    nameCheckServiceID = XMLUtil.valueOf(document, "/XMLConfig/nameCheck/serviceID");

    // 실명인증 서비스 NO
    nameCheckServiceNO = XMLUtil.valueOf(document, "/XMLConfig/nameCheck/serviceNO");

    // 관리자 허용IP
    ipCheckip1 = XMLUtil.valueOf(document, "/XMLConfig/ipCheck/ip_1");
    ipCheckip2 = XMLUtil.valueOf(document, "/XMLConfig/ipCheck/ip_2");
    ipCheckip3 = XMLUtil.valueOf(document, "/XMLConfig/ipCheck/ip_3");
    ipCheckip4 = XMLUtil.valueOf(document, "/XMLConfig/ipCheck/ip_4");
    ipCheckip5 = XMLUtil.valueOf(document, "/XMLConfig/ipCheck/ip_5");


    // 사업체위치찾기의 map api 키
    apiKey = XMLUtil.valueOf(document, "/XMLConfig/apiKey");

    // 개발서버여부
    isDev = Boolean.valueOf(XMLUtil.valueOf(document, "/XMLConfig/isDev"));
    
    // 이중화 WAS의 ID
    wasId = XMLUtil.valueOf(document, "/XMLConfig/wasId");
}

  public static String getScWebUrl() {
    return scWebUrl;
  }

  public static String getScPageTitle() {
    return scPageTitle;
  }

  public synchronized void reload(){
    loadConfigFile();
  }

  public static String getScAbsouteRoot() {
    return scAbsouteRoot;
  }

  public static String getScFilePath() {
    return scFilePath;
  }

  public static String getLoginYn() {
    return loginYn;
  }

  public static int getFileSizeLimit() {
    return fileSizeLimit;
  }

  public static String getStatisticsURL() {
    return statisticsURL;
  }

  public static String getStatisticsResourceURL() {
    return statisticsResourceURL;
  }

  public static String getMailHost() {
    return mailHost;
  }

  public static String getMailFromName() {
    return mailFromName;
  }

  public static String getMailFromAddress() {
    return mailFromAddress;
  }

  public static String getNameCheckServiceID() {
    return nameCheckServiceID;
  }

  public static String getNamecheckServiceNO() {
    return nameCheckServiceNO;
  }

  public static String getApiKey() {
    return apiKey;
  }

  public static String getIpCheckip1() {
    return ipCheckip1;
  }

  public static void setIpCheckip1(String ipCheckip1) {
    ConfigManager.ipCheckip1 = ipCheckip1;
  }

  public static String getIpCheckip2() {
    return ipCheckip2;
  }

  public static void setIpCheckip2(String ipCheckip2) {
    ConfigManager.ipCheckip2 = ipCheckip2;
  }

  public static String getIpCheckip3() {
    return ipCheckip3;
  }

  public static void setIpCheckip3(String ipCheckip3) {
    ConfigManager.ipCheckip3 = ipCheckip3;
  }

  public static String getIpCheckip4() {  
    return ipCheckip4;
  }

  public static void setIpCheckip4(String ipCheckip4) {
    ConfigManager.ipCheckip4 = ipCheckip4;
  }

  public static String getIpCheckip5() {
    return ipCheckip5;
  }

  public static void setIpCheckip5(String ipCheckip5) {
    ConfigManager.ipCheckip5 = ipCheckip5;
  }

  public static boolean isDev() {
    return isDev;
  }

  public static String getScFilePathBoard() {
	return scFilePathBoard;
  }

  public static void setScFilePathBoard(String scFilePathBoard) {
	ConfigManager.scFilePathBoard = scFilePathBoard;
  }
  
  public static String getWasId() {
	return wasId;
  }
}