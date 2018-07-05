package kostat.sop.ServiceAPI.api.thematicMap.other;

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
 * 1. 기능 : 주제도 - KOSIS 데이터 조회(시도)
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 * 
 *  <b>History:</b> 
 *     작성자 : 윤지혜, 1.0, 2014/12/02  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 윤지혜
 * @version 1.0
 * @see <p/>
 */
public class ThemaKosisDataBasicLibe extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(ThemaKosisDataBasicLibe.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9031";
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
		adm_cd
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

			List resultList = (List) session.selectList(
					"thematicMap_other.getThemeKosisData_basic_libe", mapParameter);
			resultData.put("kosisInfo", resultList);

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