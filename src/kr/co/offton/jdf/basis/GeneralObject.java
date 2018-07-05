package kr.co.offton.jdf.basis;

import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;

/**
 * <pre>
 * PGM_NAME: OFFTON GeneralObject
 * DESC: 시스템의 거의 대부분의 클래스는 이 클래스를 상속받는다.
 *       공통적으로 클래스들의 속성을 주기위한 것으로 현재는 로그파일을 쓰는 부분에 대해서만 정의되어있다.
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 */
public class GeneralObject extends Object {
  protected static Logger logger = null;

  static {
    try {
      logger = Logger.getRootLogger();
      DOMConfigurator.configure(logger.getClass().getResource("/Log4JConfig.xml"));

      //logger.setLevel((Level) Level.OFF);
    } catch (Exception e) {
    	// 2015-12-03 시큐어코딩
    	logger.error(e);
    	
    	if(logger != null) {
    		logger = null;
    	}
    }
  }

  public GeneralObject() {
  }
}