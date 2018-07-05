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
 * 1. 기능 : 학구도 폴리곤 정보 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/02/11  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */
public class AreaSchoolPolygon extends AbsQuery<List<?>> {
	private static final Log logger = LogFactory.getLog(AreaSchoolPolygon.class);
	@Override
	public String getApiId() {
		return "100207";
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
	
	enum MustParam{
		area,
		type//0:초등학교,1:중학교,2:고등학교
	}
	
	enum OptionParam{
	}

	@Override
	public List<?> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		List<?> resultData = new ArrayList<Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			// 2017. 12. 08 [개발팀 수정] START
//			if(mapParameter.get("type").equals("0")){
//				mapParameter.put("type_table", "ele");
//			}else if(mapParameter.get("type").equals("1")){
//				mapParameter.put("type_table", "mid");
//			}else if(mapParameter.get("type").equals("2")){
//				mapParameter.put("type_table", "high");
//			}else{
//				throw new ApiException("타입이 잘못되었습니다");
//			}
			// 2017. 12. 08 [개발팀 수정] END
			
			resultData = session.selectList("house.selectSchoolPolygon",mapParameter);
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