package kostat.sop.ServiceAPI.api.communityMap;


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
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/01/04  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */
public class Community extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(Community.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100002";
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
		cmmnty_map_id,
		bnd_year
	}

	enum OptionParam{
	}

	@Override
	public HashMap<String,Object> executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			communityService.dollarQueryReplace(mapParameter);
			_checkNullParameterValue(mapParameter);
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id", login_id);
			HashMap<String,Object> summary = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(mapParameter.get("bnd_year")!=null&&!mapParameter.get("bnd_year").toString().matches("^(\\d{4})$")){
				mapParameter.put("bnd_year",kostat.sop.ServiceAPI.common.controller.Properties.getDefult_bnd_year());
			}
			if(summary!=null){
				mapParameter.put("recmd_stat_yn", "N");
				summary.put("stats", session.selectList("communityEtc.selectMapList",mapParameter));
				if(summary.get("area_estbs_sido_cd").toString().equals("00")&&Integer.parseInt(mapParameter.get("bnd_year").toString())<2014){
					mapParameter.put("adm_cd","11");
				}else{
					mapParameter.put("adm_cd",summary.get("adm_cd"));
				}
				summary.put("area", session.selectOne("communityEtc.selectArea",mapParameter));
			}
			resultData.put("custom_symbol_list",session.selectList("communityCustomSymbol.selectCommunityCustomSymbolList",summary.get("custom_symbol_group_id").toString()));
			
			HashMap<String,Object> communityArea = new HashMap<String,Object>();
			communityArea.put("adm_cd", summary.get("adm_cd"));
			communityArea.put("adm_nm", summary.get("adm_nm"));
			communityArea.put("sido_cd", summary.get("area_estbs_sido_cd"));
			communityArea.put("sgg_cd", summary.get("area_estbs_sgg_cd"));
			communityArea.put("emdong_cd", summary.get("area_estbs_emdong_cd"));
			List<HashMap<String,Object>> communityMapList = session.selectList("communityEtc.selectCmmntyMapAddRegion", mapParameter);
			communityMapList.add(communityArea);
			resultData.put("areaList",communityMapList);
			resultData.put("summary",summary );
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
