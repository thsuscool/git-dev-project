package kostat.sop.ServiceAPI.api.member;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.sci.v2.pcc.secu.SciSecuManager;
import com.sci.v2.pcc.secu.hmac.SciHmac;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 회원 실명인증 전에 코드값 생성<p>
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
@SuppressWarnings("rawtypes")
public class MemberConfigInfo extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(MemberConfigInfo.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2001";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		type
	}
	
	enum OptionParam
	{	
	}
	
	@SuppressWarnings({ "unchecked", "static-access" })
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			//요청 화면 타입 (JOIN, ID, PW,ModifyNO)
			String type = (String) mapParameter.get(MustParam.type.name());
			
			ClassPathResource resource = new ClassPathResource(getPerpertyPath());
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String serviceID = props.getProperty("Globals.Config.Member.serviceID");			//회원사 아이디
			String domainURL = props.getProperty("Globals.Config.domainURLssl");		//도메인URL
			String serviceNO = "";		//서비스 NO
			if(type.equals("JOIN")) {
				serviceNO = props.getProperty("Globals.Config.Member.joinNO");		//회원가입 NO
			} else if(type.equals("ID")) {
				serviceNO = props.getProperty("Globals.Config.Member.idNO");		//아이디 찾기 NO
			} else if(type.equals("PW")) {
				serviceNO = props.getProperty("Globals.Config.Member.pwNO");		//비밀번호 찾기 NO
			} else if(type.equals("ModifyNO")) {
				serviceNO = props.getProperty("Globals.Config.Member.modifyNO");		//회원정보 수정 NO				
			}else if(type.equals("IDNO")) {
				serviceNO = props.getProperty("Globals.Config.Member.ID_NO");		//ID 찾기	NO			
			}else if(type.equals("PWNO")) {
				serviceNO = props.getProperty("Globals.Config.Member.PW_NO");		//비밀번호 찾기 NO				
			}

			String randomStr = StringUtil.getRandomString(6);
			//날짜 생성
	        Calendar today = Calendar.getInstance();
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	        String day = sdf.format(today.getTime());
	        String reqNum = day + randomStr;
	        String certDate = day;
	        String certGb = "H";	
	        String addVar = type;		
	        
			String exVar = StringUtil.getRandomString(16);
			String retUrl = "32"+domainURL+"/jsp/member/nameCheckReturn.jsp";			
			logger.debug("********************************************"+reqNum);
			httpSession.setAttribute("reqNum", reqNum);
			
			SciSecuManager seed  = new SciSecuManager();
			
			String encStr = "";
			String reqInfo = serviceID+"^"+serviceNO+"^"+reqNum+"^"+certDate+"^"+certGb+"^"+addVar+"^"+exVar;
			
			encStr = seed.getEncPublic(reqInfo);
			
			SciHmac hmac = new SciHmac();
			String hmacMsg = hmac.HMacEncriptPublic(encStr);
			
			reqInfo  = seed.getEncPublic(encStr + "^" + hmacMsg + "^" + exVar);
			
			resultData.put("reqInfo", reqInfo);
			resultData.put("retUrl", retUrl);

			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return resultData;
	}
}