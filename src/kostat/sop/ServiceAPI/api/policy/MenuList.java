package kostat.sop.ServiceAPI.api.policy;


import java.util.ArrayList;
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
 * 1. 기능 : 정책통계지도 메뉴 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 송종대, 1.0, 2016/11/25  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 송종대
 * @version 1.0
 * @see
 * <p/>
 */

public class MenuList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(MenuList.class);
	@Override
	public String getApiId() {
		return "100401";
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
	}
	
	enum OptionParam
	{
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		HashMap<String,Object> result =  new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			List resultList = new ArrayList();//결과
			
			List lclasList = session.selectList("policyStatic.lclasList", mapParameter);
			for (int i = 0; i < lclasList.size(); i++) {
				HashMap resultmap = new HashMap();//lclas + mlsfcList 결과

				HashMap map = (HashMap) lclasList.get(i);
				resultmap.put("lslas", map);
				mapParameter.put("lclas_id", map.get("lclas_id"));
				List mlsfcList = session.selectList("policyStatic.mlsfcList", mapParameter);
				resultmap.put("mlsfcList", mlsfcList);
				
				resultList.add(resultmap);
			}

			result.put("resultList", resultList);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
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
		return result;
	}
}
