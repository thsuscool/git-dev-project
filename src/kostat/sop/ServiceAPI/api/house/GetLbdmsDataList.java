package kostat.sop.ServiceAPI.api.house;


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

import kostat.sop.ServiceAPI.api.house.StandardAreaLists.MustParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 아산시 고유정보 귀농 폴리곤<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/3/11  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class GetLbdmsDataList extends AbsQuery<List<?>> {
	private static final Log logger = LogFactory.getLog(GetLbdmsDataList.class);
	@Override
	public String getApiId() {
		return "100210";
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
		adm_cd
	}
	
	enum OptionParam
	{
	}

	@Override
	public List<?> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		List result = new ArrayList<Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String adm_cd = (String) mapParameter.get("adm_cd");
			List lbdmsList = (List)session.selectList("house.selectCheckLbdmsList", mapParameter);
			for (int i=0; i<lbdmsList.size(); i++) {
				HashMap param = new HashMap();
				HashMap tmpLbdmsList = (HashMap)lbdmsList.get(i);
				String sido_cd = null;
				String sgg_cd = null;
				String emdong_cd = null;
				String type = (String)tmpLbdmsList.get("bord_level");
				String data_type = (String)tmpLbdmsList.get("spacial_data_type_cd");
				if (tmpLbdmsList.get("bord_level") != null) {
					param.put("type", type);
				}
				
				if (data_type.equals("03") && type == null) {
					continue;
				}
				
				param.put("seq", tmpLbdmsList.get("seq"));
				param.put("adm_cd", adm_cd);
				param.put("data_type", data_type);
						
				switch(adm_cd.length()) {
					case 2:
						sido_cd = adm_cd;
						param.put("sido_cd", sido_cd);
						break;
					case 5:
					case 7:
						sido_cd = adm_cd.substring(0, 2);
						sgg_cd = adm_cd.substring(2, 5);
						param.put("sido_cd", sido_cd);
						param.put("sgg_cd", sgg_cd);
						break;
				}
				Map tmpResult = (Map)session.selectOne("house.selectLbdmsDataList", param);
				int cnt = (Integer)tmpResult.get("cnt");
				if (cnt > 0) {
					result.add(tmpLbdmsList);
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