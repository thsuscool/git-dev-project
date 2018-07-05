
package kostat.sop.ServiceAPI.api.policy;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.PolicyWriteService;
import kostat.sop.ServiceAPI.exception.ApiException;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * 1. 기능 : 정책통계지도 API 정책통계지도 등록<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김보민 1.0, 2017/089/06  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 권차욱
 * @version 1.0
 * @see
 * <p/>
 */
public class RegPolicyMap extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(RegPolicyMap.class);
	
	@Resource(name = "policyWriteService")
	private PolicyWriteService policyWriteService;
	
	@Override
	public String getApiId() {
		return "100421";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		policy_idx_nm,
		category_id,
		policy_idx_content,
		idx_type,
		region_cd,
		bord_level,
		non_atdrc_yn,
		source_inst_cd,
		bord_year,
		srv_yn,
		disp_rank,
		callList,
		
	}

	enum OptionParam{
		nomfrm_cd,
		disp_unit,
		disp_nm,
		relMapList,
		nomfrm_base_map_div
	}
	
	@Override
	public Map executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		Map resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			//사용자 아이디
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id",login_id);
			
			//지표 아이디 생성
			String idx_id = StringUtil.getRandomString(10).toString()+new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date())+StringUtil.getRandomString(10).toString();
			mapParameter.put("idx_id", idx_id);
			
			//카테고리 아이디
			String category_id = (String)mapParameter.get("category_id");
			String region_cd = (String)mapParameter.get("region_cd");
			
			//정책통계지도 등록
			int result = policyWriteService.insertPolicyMap(mapParameter);
			
			if (result == 1) {
				//정책통계지도 파라미터 정보 등록
				String callList = (String) mapParameter.get("callList");
				JSONArray callListArray = new JSONArray(callList); 
				for (int i=0; i<callListArray.length(); i++) {
		            JSONObject callParamInfo = callListArray.getJSONObject(i);
		            String call_info_serial = (String)callParamInfo.get("call_info_serial");
		            String call_url = (String)callParamInfo.get("call_url");
		            String call_param = (String)callParamInfo.get("call_param").toString();
		            String map_param = (String)callParamInfo.get("map_param").toString();
		            String data_type = (String)callParamInfo.get("data_type");
		            String data_div = (String)callParamInfo.get("data_div");
		            String source = (String)callParamInfo.get("source");
		            String map_div = (String)callParamInfo.get("map_div");
		            
		            Map prameter = new HashMap();
		            prameter.put("category_id", category_id);
		            prameter.put("idx_id", idx_id);
		            prameter.put("call_info_serial", call_info_serial);
		            prameter.put("call_url", call_url);
		            prameter.put("call_param", call_param);
		            prameter.put("map_param", map_param);
		            prameter.put("data_type", data_type);
		            prameter.put("data_div", data_div);
		            prameter.put("source", source);
		            prameter.put("map_div", map_div);
		            
		            policyWriteService.insertPolicyParamInfo(prameter);
		        }
				
				//연관정책통계지도 등록
				String relMapList = (String) mapParameter.get("relMapList");
				if (relMapList != null) {
					JSONArray relMapListArray = new JSONArray(relMapList); 
					for (int i=0; i<relMapListArray.length(); i++) {
						JSONObject relMapInfo = relMapListArray.getJSONObject(i);
			            String rel_policy_stat_map_id = (String)relMapInfo.get("rel_policy_stat_map_id");
			            
			            Map prameter = new HashMap();  
			            prameter.put("category_id", category_id);
			            prameter.put("idx_id", idx_id);
			            prameter.put("rel_policy_stat_map_id", rel_policy_stat_map_id);
			           
			            policyWriteService.insertRelPolicyMapInfo(prameter);
					}
				}
				
			}
			
			resultData.put("idx_id", idx_id);
			resultData.put("category_id", category_id);
			resultData.put("region_cd", region_cd);
			
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
//========== 2017.08.10 [개발팀] 정책통계지도 카테고리별 갯수조회  END ==========//