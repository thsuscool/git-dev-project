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
 * 1. 기능 : 정책통계지도 등록 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 나광흠, 1.0, 2017/1/3  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */

public class Write extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(Write.class);
	@Override
	public String getApiId() {
		return "100402";
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
		title,//제목
		left,//좌측 지도 정보
		right,//우측 지도 정보
		div_cd,//01 : 버퍼형, 02 : 연산형
		right_disp_type,//01(polygon), 02(사업체 poi) , 03(mydata), 04(지자체 데이터)
		region_cd//지역코드
	}
	
	enum OptionParam{
		exp,//설명
		url,//url
		community,//커뮤니티 ID
		srv_distance,//서비스 거리
		nomfrm//수식
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
			if(httpSession.getAttribute("member_id")==null){
				throw new ApiException("로그인이 필요합니다");
			}else if(member==null||!"PM".equals(member.get("member_grade"))){
				throw new ApiException("권한이 존재하지 않습니다");
			}else if(mapParameter.get("title")==null){
				throw new ApiException("제목은 필수입니다");
			}else if(mapParameter.get("title").toString().length()>40){
				throw new ApiException("제목은 최대 40글자까지 쓸 수 있습니다");
			}else if(mapParameter.get("exp")!=null&&mapParameter.get("exp").toString().length()>1000){
				throw new ApiException("내용은 최대 1000글자까지 쓸 수 있습니다");
			}else if(mapParameter.get("URL은")!=null&&mapParameter.get("URL은").toString().length()>100){
				throw new ApiException("내용은 최대 100글자까지 쓸 수 있습니다");
			}
			mapParameter.put("reg_member_id",httpSession.getAttribute("member_id"));
			if(session.insert("policyStatic.insertWrite",mapParameter)>0){
				if(mapParameter.get("community")!=null){
					for(String cmmnty_map_id:mapParameter.get("community").toString().split(",")){
						HashMap<String,Object> community = new HashMap<String,Object>();
						community.put("policy_stat_map_serial",mapParameter.get("policy_stat_map_serial"));
						community.put("div_cd",mapParameter.get("div_cd"));
						community.put("cmmnty_map_id",cmmnty_map_id);
						session.insert("policyStatic.insertCommunity",community);
					}
				}
				insertApi(new HashMap<String,Object>((HashMap)mapParameter),"left","01","01");
				insertApi(new HashMap<String,Object>((HashMap)mapParameter),"right","02",mapParameter.get("right_disp_type").toString());
			}else{
				throw new ApiException(StringUtil.getErrMsg());
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			delete(mapParameter);
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			delete(mapParameter);
			logger.error(e);
			throw new ApiException("메뉴정보를 확인 해 주세요");
		} catch (Exception e) {
			delete(mapParameter);
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}
	private void insertApi(HashMap<String,Object> map,String type,String data_div_cd,String disp_type){
		JSONParser parser = new JSONParser();
		JSONObject obj;
		try {
			obj = (JSONObject) parser.parse(map.get(type).toString());
			map.put("api_id",obj.get("api_id"));
			if(obj.get("url")!=null){
				String url = obj.get("url").toString();
				if(url.indexOf("?")>-1){
					map.put("call_url",url.substring(0,url.indexOf("?")));
				}else{
					map.put("call_url",url);
				}
			}
			map.put("data_div_cd",data_div_cd);
			map.put("disp_type",disp_type);
			map.put("disp_nm",obj.get("disp_nm"));
			map.put("disp_unit",obj.get("disp_unit"));
			map.put("disp_value",obj.get("disp_value"));
			map.put("bnd_year",obj.get("bnd_year"));
			if(session.insert("policyStatic.insertApiInfo",map)>0){
				JSONArray params = (JSONArray) obj.get("params");
				for(int i=0; i<params.size(); i++){
					HashMap<String,Object> param = new HashMap<String,Object>(map);
					JSONObject paramsObject = (JSONObject) params.get(i);
					param.put("param", paramsObject.get("key"));
					param.put("value", paramsObject.get("value"));
					session.insert("policyStatic.insertApiParam",param);
				}
				
			}
		} catch (ParseException e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
	}
	private void delete(Map<String,Object> mapParameter){
		if(mapParameter.get("policy_stat_map_serial")!=null){
			session.delete("deleteApiParam",mapParameter);
			session.delete("deleteApiInfo",mapParameter);
			session.delete("deleteCommunity",mapParameter);
			session.delete("deleteWrite",mapParameter);
		}
	}
}
