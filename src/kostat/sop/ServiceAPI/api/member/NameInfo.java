package kostat.sop.ServiceAPI.api.member;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

/**
 * 1. 기능 : 회원 실명인증 정보를 가져온다.<p>
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
public class NameInfo extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(NameInfo.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2005";
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
	}
	
	enum OptionParam
	{	
	}
	
	@SuppressWarnings({ "unchecked" })
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
			
			String member_key = (String)httpSession.getAttribute("member_key");
			if(member_key == null) {
				throw new ApiException("실명인증이 잘못되었습니다.", COMM_ERR_CODE.ERR_PARAM);
			}
			//httpSession.removeAttribute("member_key");
			
			Map parameter = new HashMap();
			parameter.put("member_key", member_key);
			
			//실명인증 정보조회
			List infoList = session.selectList("member.getNameInfoList", parameter);
			if(infoList.size() == 0) {
				throw new ApiException("실명인증이 잘못되었습니다.", COMM_ERR_CODE.ERR_PARAM);
			}
			
			Map infoMap = (Map)infoList.get(0);
			infoMap.put("nm", SecureDB.decryptAria256((String)infoMap.get("nm")));
			infoMap.put("cp_no", SecureDB.decryptAria256((String)infoMap.get("cp_no")));
			infoList.remove(0);
			infoList.add(infoMap);
			
			resultData.put("infoList", infoList);
			
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