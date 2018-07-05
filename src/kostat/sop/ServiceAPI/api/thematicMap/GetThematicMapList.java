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
 *     작성자 : 윤지혜, 1.0, 2014/10/06  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 윤지혜
 * @version 1.0
 * @see <p/>
 */
public class GetThematicMapList extends AbsQuery<Map> {
	private static final Log logger = LogFactory
			.getLog(GetThematicMapList.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9030";
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
		
	}

	enum OptionParam {
		cate_id, stat_thema_map_id, title, resultCnt, p
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

			int themeMapInfoListCount = (Integer) session.selectOne(
					"thematicMap.select.statsMapListCount", mapParameter);

			// 전체 조회 갯수
			resultData.put("themeMapInfoListCount", themeMapInfoListCount);

			// 현재 요청된 데이터의 페이지
			if (!mapParameter.containsKey("p")) {
				resultData.put("currentPage", 0);
				mapParameter.put("p", 1);
			} else {
				resultData.put("currentPage",
						Integer.parseInt(mapParameter.get("p").toString()));
				int p = Integer.valueOf(mapParameter.get("p").toString())
						* Integer.valueOf(mapParameter.get("resultCnt")
								.toString()) + 1;
				mapParameter.put("p", p);
			}
			
			if (!mapParameter.containsKey("resultCnt")) {
				mapParameter.put("resultCnt", 10);
			}
			
			List themeMapInfoList = (List) session.selectList(
					"thematicMap.select.statsMapList2", mapParameter);

			resultData.put("themeMapInfoList", themeMapInfoList);

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