package kostat.sop.ServiceAPI.api.house;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 지역 종합현황 가져오기 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2015/11/18  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */
public class AreaIndexChartLists extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(AreaIndexChartLists.class);
	@Override
	public String getApiId() {
		return "100203";
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
		sido_cd,
		sgg_cd,
		bnd_year
	}
	
	enum OptionParam
	{
		emdong_cd,
		type
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		HashMap<String,Object> resultData = new HashMap<String,Object>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			mapParameter.put("sido_yn", "N");
			HashMap<String,Object> country = new HashMap<String,Object>();
			country.put("list", session.selectList("house.areaSynSidoResultLists", mapParameter));
			HashMap<String,Object> countryInfo = new HashMap<String,Object>();
			countryInfo.put("addr", "전국");
			country.put("info", countryInfo);
			resultData.put("country", country);
			if(mapParameter.get("sido_cd")!=null&&StringUtils.hasText(mapParameter.get("sido_cd").toString())&&!mapParameter.get("sido_cd").toString().equals("00")){
				mapParameter.put("sido_yn", "Y");
				HashMap<String,Object> sido = new HashMap<String,Object>();
				sido.put("list", session.selectList("house.areaSynSidoResultLists", mapParameter));
				sido.put("info", session.selectOne("house.selectSido", mapParameter));
				resultData.put("sido", sido);
				if(mapParameter.get("sgg_cd")!=null&&StringUtils.hasText(mapParameter.get("sgg_cd").toString())&&!mapParameter.get("sgg_cd").toString().equals("999")){
					HashMap<String,Object> sgg = new HashMap<String,Object>();
					sgg.put("list", session.selectList("house.areaSynSggResultLists", mapParameter));
					sgg.put("info", session.selectOne("house.selectSgg", mapParameter));
					resultData.put("sgg", sgg);
					if(mapParameter.get("emdong_cd")!=null&&StringUtils.hasText(mapParameter.get("emdong_cd").toString())&&!mapParameter.get("emdong_cd").toString().equals("00")){
						HashMap<String,Object> emdong = new HashMap<String,Object>();
						emdong.put("list", session.selectList("house.areaSynEmdongResultLists", mapParameter));
						emdong.put("info", session.selectOne("house.selectEmdong", mapParameter));
						resultData.put("emdong", emdong);
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
		return resultData;
	}
}