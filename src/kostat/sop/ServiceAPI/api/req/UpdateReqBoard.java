package kostat.sop.ServiceAPI.api.req;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import common.Logger;

/**   
 *
 * @ClassName: UpdateReqBoard
 * @Description： 
 *
 * @author jrj
 * @date：2018.01.30    
 * @version V1.0      
 *    
 */
public class UpdateReqBoard extends AbsQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateReqBoard.class);
	
	@Override
	public String getApiId() {
		return "reqboard_addreqboard";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException{
		Map resultData = new HashMap();
		
		try {
			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			session.update("reqBoard.updateReqBoard", mapParameter);
			
			resultData.put("success", true);
		}  catch (AbsAPIException e) {
			e.printStackTrace();
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} 
		
		return resultData;
	}
	
	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	
	private enum MustParam{
		REQ_SEQ, REQ_PRGRS_STATS_CD
	}
	
	private enum OptionParam{
		RECV_USER_NM, MOD_REQ_CONTENT, MOD_REQ_USER_NM, PRGRS_USER_NM, WORK_CONTENT, WORK_USER_NM
	}
	
	@Override
	protected String getQueryStr() {
		return null;
	}

}
