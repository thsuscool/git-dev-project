package kostat.sop.ServiceAPI.api.house;


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
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 주거지분석맵 지표평균값 가져오기 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2015/10/28  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */
public class HouseAnalysisAvgLists extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(HouseAnalysisAvgLists.class);
	@Override
	public String getApiId() {
		return "100209";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		b_class_idx_id,
		m_class_idx_id,
		level,
		year,
		stand_is
	}
	
	enum OptionParam
	{
		sido_cd,
		sgg_cd,
		emdong_cd
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		HashMap<String,Object> result =  new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			int level = Integer.parseInt(mapParameter.get(MustParam.level.name()).toString());
			
			if("Y".equals(mapParameter.get(MustParam.stand_is.name()).toString())){
				//기준지역 전국, 시도, 시군구
				result.put("country", session.selectOne("house.houseCountryAvg", mapParameter));
			}else{
				//추천지역 전국X, 시도, 시군구, 읍면동 ...	
				result.put("country", null);
			}
			
			if(mapParameter.get("sido_cd")!=null){
				result.put("sido", session.selectOne("house.houseSidoAvg", mapParameter));
				if(level>1){
					result.put("sgg", session.selectOne("house.houseSggAvg", mapParameter));
					if(level>2){
						result.put("emdong", session.selectOne("house.houseEmdongAvg", mapParameter));
					}
				}
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}
}
