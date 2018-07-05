package kostat.sop.ServiceAPI.api.house;


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
 * 1. 기능 : 주거지분석맵 지표순위 가져오기 <p>
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
public class HouseAnalysisOrderLists extends AbsQuery<List<?>> {
	private static final Log logger = LogFactory.getLog(HouseAnalysisOrderLists.class);
	@Override
	public String getApiId() {
		return "100200";
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
		level,//1 : 시도, 2 : 시군구, 3 : 읍면동
		year
	}
	
	enum OptionParam
	{
		sido_cd,
		sgg_cd,
		borough
	}

	@Override
	public List<?> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		List<?> summaryList =  null;
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<?,?> mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String level = (String) mapParameter.get(MustParam.level.name());
			if(level.equals("1")){
				summaryList = (List<?>) session.selectList("house.houseSidoLists", mapParameter);
			}else if(level.equals("2")){
				summaryList = (List<?>) session.selectList("house.houseSggLists", mapParameter);
			}else{
				summaryList = (List<?>) session.selectList("house.houseEmdongLists", mapParameter);
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
		return summaryList;
	}
}
