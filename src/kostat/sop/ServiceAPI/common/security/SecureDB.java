package kostat.sop.ServiceAPI.common.security;

import java.io.IOException;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.ksign.securedb.api.SDBCrypto;
import com.ksign.securedb.api.util.SDBException;

/**
 * 1. 기능 : 암호화 키서버 관리 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/08  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
public class SecureDB {
	
	private static final Log logger = LogFactory.getLog( SecureDB.class );
	private static final String PROPERTY_PATH = "/globals.properties";
	private static String SCHEMA = "";
	private static final String TABLE = "enc_key";
	private static final String A_COLUMN = "aria256";		//양방향 알고리즘
	private static final String S_COLUMN = "sha256";		//단방향 알고리즘
	
	/**
	* 암호화 키 서버 접근 Config
	* <pre></pre>
	*
	* @return SDBCrypto crypto
	* @exception SDBException
	* @exception Exception
	*/
	public static SDBCrypto dbConfig() {
		
		SDBCrypto crypto = new SDBCrypto();
		
		try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			SCHEMA = props.getProperty("Globals.Config.crypto.schema");		//oracle:dbsec	mssql:dbo
			String domainIP = props.getProperty("Globals.Config.crypto.domainIP");		//oracle dbms ip 기입 (Sample source code의 DomainIP 임)
			int domainPort = Integer.parseInt(props.getProperty("Globals.Config.crypto.domainPort"));	//oracle service port 기입(Sample source code의 DomainPort 임)
			String serverIP = props.getProperty("Globals.Config.crypto.serverIP");			//service ip 기입 => oracle dbms ip와 동일
			int serverPort = Integer.parseInt(props.getProperty("Globals.Config.crypto.serverPort"));		//암호화 Key 정보를 받아오는 서비스포트
			
	        crypto = SDBCrypto.getInstance(domainIP, domainPort, serverIP, serverPort);
	        
		} catch (SDBException e) {
			// 2015-12-03 시큐어코딩
			logger.error(e);
			
			if(crypto != null) {
				crypto = null;
			}
		} catch (IOException e){
			// 2016-12-05 시큐어코딩
			logger.error(e);
			
			if(crypto != null) {
				crypto = null;
			}
		}
		
		return crypto;
	}
	
	/**
	* Aria256 암호화 (양방향)
	* <pre></pre>
	*
	* @param String param
	* @return  String encData
	* @exception SDBException
	* @exception Exception
	*/
	public static String encryptAria256(String param) {
		String encData = "";
		try {
			SDBCrypto crypto = dbConfig();
			encData = crypto.encrypt(SCHEMA, TABLE, A_COLUMN, param);
		} catch (SDBException e) {
			// 2015-12-03 시큐어코딩
			logger.error(e);
			
			if(encData != null) {
				encData = null;
			}
		}
		
		return encData;
	}
	
	/**
	* Aria256 복호화 (양방향)
	* <pre></pre>
	*
	* @param String param
	* @return  String decData
	* @exception SDBException
	* @exception Exception
	*/
	public static String decryptAria256(String param) {
		String decData = "";
		try {
			SDBCrypto crypto = dbConfig();
			decData = crypto.decrypt(SCHEMA, TABLE, A_COLUMN, param);
		} catch (SDBException e) {
			// 2015-12-03 시큐어코딩
			logger.error(e);
			
			if(decData != null) {
				decData = null;
			}
		}
		
		return decData;
	}
	
	/**
	* Sha256 암호화 (단방향)
	* <pre></pre>
	*
	* @param String param
	* @return  String encData
	* @exception SDBException
	* @exception Exception
	*/
	public static String encryptSha256(String param) {
		String encData = "";
		try {
			SDBCrypto crypto = dbConfig();
			encData = crypto.encrypt(SCHEMA, TABLE, S_COLUMN, param);
		} catch (SDBException e) {
			// 2015-12-03 시큐어코딩
			logger.error(e);
			
			if(encData != null) {
				encData = null;
			}
		}
		
		return encData;
	}
}