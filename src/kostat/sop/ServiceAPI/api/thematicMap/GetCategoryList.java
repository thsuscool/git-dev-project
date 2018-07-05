package kostat.sop.ServiceAPI.api.thematicMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * 1. 기능 : 통계주제도 테이블에 데이터를 조회한다.
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 * dmd
 *  <b>History:</b> 
 *     작성자 : 윤지혜, 1.0, 2014/10/20  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 윤지혜
 * @version 1.0
 * @see <p/>
 */
public class GetCategoryList extends AbsQuery<Map> {
	private static final Log logger = LogFactory
			.getLog(GetCategoryList.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9003";
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

	enum MustParam {
		resultCnt
	}

	enum OptionParam {
		
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map mapParameter = getParameterMap(req);

		_checkNullParameterValue(mapParameter);

		Map resultData = new HashMap();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			mapParameter.put("cate_id", "CTGR_001");
			List lifeCateList = (List) session.selectList(
					"thematicMap.select.statsMapList", mapParameter);	
			resultData.put("lifeCateList", lifeCateList);
			
			mapParameter.put("cate_id", "CTGR_002");
			List healthCateList = (List) session.selectList(
					"thematicMap.select.statsMapList", mapParameter);	
			resultData.put("healthCateList", healthCateList);
			
			mapParameter.put("cate_id", "CTGR_003");
			List cultureCateList = (List) session.selectList(
					"thematicMap.select.statsMapList", mapParameter);	
			resultData.put("cultureCateList", cultureCateList);
			
			mapParameter.put("cate_id", "CTGR_004");
			List saftyCateList = (List) session.selectList(
					"thematicMap.select.statsMapList", mapParameter);	
			resultData.put("saftyCateList", saftyCateList);
			
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