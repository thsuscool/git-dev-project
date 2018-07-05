package kostat.sop.ServiceAPI.api.map;

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
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 시도/시군구/읍면동 일괄 조회 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/10/16  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class AllAddressList extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(AllAddressList.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "3003";
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
		sido_cd, base_year
	}
	
	enum OptionParam
	{	
		sgg_cd, dong_cd
	}
	
	@SuppressWarnings("unchecked")
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
			
			String sido_cd = (String) mapParameter.get("sido_cd");
			String sgg_cd = (String) mapParameter.get("sgg_cd");
			
			//시도 목록 가져오기
			List sidoList = session.selectList("map.selectSidoList", mapParameter);
			resultData.put("sidoList", sidoList);
			
			//시군구 목록 가져오기
			if(sido_cd != null) {
				List sggList = session.selectList("map.selectSggList", mapParameter);
				resultData.put("sggList", sggList);	
			}
			
			//읍면동 목록 가져오기
			if(sido_cd != null && sgg_cd != null) {
				List admList = session.selectList("map.selectAdmList", mapParameter);
				resultData.put("admList", admList);	
			}
			
			resultData.put("sido_cd", mapParameter.get("sido_cd"));
			resultData.put("sgg_cd", mapParameter.get("sgg_cd"));
			resultData.put("dong_cd", mapParameter.get("dong_cd"));
			
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