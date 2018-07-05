package kostat.sop.ServiceAPI.api.policy;


import java.util.Arrays;
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
 * 1. 기능 : 정책통계지도 지자체 데이터 조회 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 나광흠, 1.0, 2017/1/3  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */

public class GetLbdmsPolygonData extends AbsQuery<List<HashMap<String,Object>>> {
	private static final Log logger = LogFactory.getLog(GetLbdmsPolygonData.class);
	@Override
	public String getApiId() {
		return "100426";
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
		return "policyStatic.selectLbdmsPolygonList";
	}
	
	enum MustParam{
		seq,
		bnd_year,
		low_search //2017.09.10 [개발팀] 파라미터 추가 
	}
	
	enum OptionParam{
		adm_cd,
		type//1 : 전국의 시도 조회, 2 : 전국의 시군구 조회, 3 : 전국의 읍면동 조회
	}

	@Override
	public List<HashMap<String,Object>> executeAPI(HttpServletRequest req, HttpServletResponse res,String trId) throws AbsException {
		httpSession = req.getSession();
		Map<String,Object> mapParameter = getParameterMap(req);
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			_checkNullParameterValue(mapParameter);
			String[] type = {"1","2","3"};
			if(Arrays.asList(type).indexOf(mapParameter.get("type"))==-1){
				mapParameter.remove("type");
			}
			if(mapParameter.get("adm_cd")!=null){
				String adm_cd = mapParameter.get("adm_cd").toString();
				if(adm_cd.length()>=2&&adm_cd.substring(0,2)!="00"){
					mapParameter.put("sido_cd", adm_cd.substring(0,2));
					if(adm_cd.length()>=5&&adm_cd.substring(2,5)!="999"){
						mapParameter.put("sgg_cd", adm_cd.substring(2,5));
					}
				}
			}
			logger.info("END Query - TXID[" + getApiId() + "] ");
			return session.selectList(getQueryStr(),mapParameter);
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("메뉴정보를 확인 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
	}
}
