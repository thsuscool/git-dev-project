package kostat.sop.ServiceAPI.api.policy;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 데이터관리 공개 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김도형, 1.0, 2017/3/16  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김도형
 * @version 1.0
 * @see
 * <p/>
 */

public class DataOpen extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(DataOpen.class);
	@Override
	public String getApiId() {
		return "100410";
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
		open_yn
	}
	enum OptionParam{
		data_chk
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		HashMap<String,Object> result =  new HashMap<String,Object>();
		Map<String,Object> mapParameter = getParameterMap(req);
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			_checkNullParameterValue(mapParameter);
			
			mapParameter.put("member_id",httpSession.getAttribute("member_id"));
			HashMap<String,Object> member = session.selectOne("member.memberInfo", mapParameter);
			if(member==null||"GM".equals(member.get("member_grade"))){
				throw new ApiException("권한이 존재하지 않습니다");
			}else{
				if(mapParameter.get("data_chk")!=null){
					String text = (String)mapParameter.get("data_chk");
					String[] chkId = text.split(",");
					for(int i=0;i<chkId.length;i++){
						mapParameter.put("data_chk",chkId[i]);
						session.update("policyStatic.updateInnerOpenHist",mapParameter);
					}
				}
			}
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
