package kostat.sop.ServiceAPI.api.member;

import java.util.HashMap;
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
 * 1. 기능 : 비밀번호 찾기 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 이동형, 1.0, 2014/10/21  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 이동형
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class ModifyCPNO extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(ModifyCPNO.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2018";
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
		member_key, member_id, cp_no
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
						
			String cp_no = (String)mapParameter.get(MustParam.cp_no.name());
			mapParameter.put(MustParam.cp_no.name(), SecureDB.encryptAria256(cp_no));
			
			//회원정보(전화번호)를 통해 검색한 회원키
			String member_key = (String)session.selectOne("member.getCPNO", mapParameter);
			if(member_key == null) {
				throw new ApiException("회원정보를 찾을 수 없습니다.", COMM_ERR_CODE.ERR_PARAM);
			}
			
			resultData.put("member_key", member_key);
			
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