package kostat.sop.ServiceAPI.api.house;


import java.util.ArrayList;
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
 * 1. 기능 : 아산시 고유정보<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/2/4  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class AsanPointList extends AbsQuery<List<?>> {
	private static final Log logger = LogFactory.getLog(AsanPointList.class);
	@Override
	public String getApiId() {
		return "100205";
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
		type//returnToFarming :귀농, pastoralHouse : 전원주택
	}
	
	enum OptionParam
	{
	}

	@Override
	public List<?> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		List<?> result = new ArrayList<Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			if(mapParameter.get("type")==null){
				throw new ApiException("타입이 잘못되었습니다");
			}else if(mapParameter.get("type").equals("returnToFarming")){//귀농
				mapParameter.put("point_table","SRV_PT_RTRN_FARMNG");
				result = session.selectList("house.selectPointList",mapParameter);
			}else if(mapParameter.get("type").equals("pastoralHouse")){//전원주택
				mapParameter.put("point_table","SRV_PT_FSVGS");
				result = session.selectList("house.selectPointList",mapParameter);
			}else{
				throw new ApiException("타입이 잘못되었습니다");
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