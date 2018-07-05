package kostat.sop.ServiceAPI.api.communityMap;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 POI 통계<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/06/20  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityPoiStats extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityPoiStats.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100015";
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
		bnd_year,
		stat_type//region : 지역별, icon : 아이콘별, region_icon : 아이콘 + 지역
	}

	enum OptionParam{
		adm_cd,
		icon,
		search_usr_id
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
			_checkNullParameterValue(mapParameter);
			if(mapParameter.get("bnd_year")!=null&&!mapParameter.get("bnd_year").toString().matches("^(\\d{4})$")){
				mapParameter.put("bnd_year",kostat.sop.ServiceAPI.common.controller.Properties.getDefult_bnd_year());
			}
			communityService.dollarQueryReplace(mapParameter);
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id", login_id);
			
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(community==null){
				throw new ApiException("존재하지 않는 소통지도입니다.");
			}
			resultData.put("community",community);
			HashMap<String,Object> symbolObject = new HashMap<String,Object>();
			List<HashMap<String,Object>> customSymbolList = session.selectList("communityCustomSymbol.selectCommunityCustomSymbolList",community.get("custom_symbol_group_id").toString());
			Iterator<HashMap<String,Object>> customSymbolIter = customSymbolList.iterator();
			while(customSymbolIter.hasNext()){
				HashMap<String,Object> data = customSymbolIter.next();
				data.put("cnt", 0);
				if(community.get("reg_symbol")==null){
					symbolObject.put(data.get("custom_symbol_id").toString(), data);
				}else{
					symbolObject.put(data.get("order").toString(), data);
				}
			}
			validation(mapParameter, resultData, community, symbolObject);
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
	private void validation(
			Map<String,Object> mapParameter,
			HashMap<String,Object> resultData,
			HashMap<String,Object> community,
			HashMap<String,Object> symbolObject){
		String type = mapParameter.get("stat_type").toString();
		if("region".equals(type)){
			this.getStatRegion(mapParameter, resultData, community, symbolObject);
		}else if("icon".equals(type)){
			this.getStatIcon(mapParameter, resultData, community, symbolObject);
		}else if("region_icon".equals(type)){
			this.getStatRegionIcon(mapParameter, resultData, community, symbolObject);
		}else{
			throw new ApiException("타입이 잘못되었습니다.");
		}
	}
	private void getStatRegion(
			Map<String,Object> mapParameter,
			HashMap<String,Object> resultData,
			HashMap<String,Object> community,
			HashMap<String,Object> symbolObject
			){
		if(mapParameter.get("adm_cd")!=null){
			boolean error = true;
			String adm_cd = mapParameter.get("adm_cd").toString();
			HashMap<String,Object> communityArea = new HashMap<String,Object>();
			communityArea.put("adm_cd", community.get("adm_cd"));
			communityArea.put("adm_nm", community.get("adm_nm"));
			communityArea.put("sido_cd", community.get("area_estbs_sido_cd"));
			communityArea.put("sgg_cd", community.get("area_estbs_sgg_cd"));
			communityArea.put("emdong_cd", community.get("area_estbs_emdong_cd"));
			List<HashMap<String,Object>> communityMapList = session.selectList("communityEtc.selectCmmntyMapAddRegion", mapParameter);
			communityMapList.add(communityArea);
			Iterator<HashMap<String,Object>> iter = communityMapList.iterator();
			while(iter.hasNext()){
				HashMap<String,Object> data = iter.next();
				if(data.get("adm_cd") !=null && data.get("adm_cd").equals(adm_cd)){
					error = false;
					break;
				}
			}
			if(error){
				throw new ApiException("등록된 지역이 아닙니다.");
			}
		}
		List<HashMap<String,Object>> symbol = session.selectList("communityPoi.selectCommunitySymbolStatByArea", mapParameter);
		Iterator<HashMap<String,Object>> symbolIter = symbol.iterator();
		while(symbolIter.hasNext()){
			HashMap<String,Object> data = symbolIter.next();
			HashMap<String,Object> symbolData = (HashMap<String,Object>)symbolObject.get(data.get("symbol").toString());
			if(symbolData!=null){
				symbolData.put("cnt", data.get("symbol_cnt"));
			}
		}
		resultData.put("stats",symbolObject);
	}
	private void getStatIcon(
			Map<String,Object> mapParameter,
			HashMap<String,Object> resultData,
			HashMap<String,Object> community,
			HashMap<String,Object> symbolObject
			){
		HashMap<String,Object> stats = new HashMap<String,Object>();
		if(mapParameter.get("icon")!=null&&symbolObject.get(mapParameter.get("icon"))==null){
			throw new ApiException("등록된 아이콘이 아닙니다.");
		}
		HashMap<String,Object> communityArea = new HashMap<String,Object>();
		communityArea.put("adm_cd", community.get("adm_cd"));
		communityArea.put("adm_nm", community.get("adm_nm"));
		communityArea.put("sido_cd", community.get("area_estbs_sido_cd"));
		communityArea.put("sgg_cd", community.get("area_estbs_sgg_cd"));
		communityArea.put("emdong_cd", community.get("area_estbs_emdong_cd"));
		List<HashMap<String,Object>> regionList = session.selectList("communityEtc.selectCmmntyMapAddRegion", mapParameter);
		regionList.add(communityArea);
		boolean hasCountry = false;
		for(HashMap<String,Object> data:regionList){
			if(data.get("adm_cd")==null||!StringUtils.hasText(data.get("adm_cd").toString())){
				hasCountry = true;
			}
		}
		int index = 0;
		if(hasCountry&&regionList.size()==1){
			regionList = session.selectList("communityEtc.selectSidoList", mapParameter.get("bnd_year").toString());
		}
		
		Iterator<HashMap<String,Object>> iter = regionList.iterator();
		while(iter.hasNext()){
			this.getStatIcon(index,mapParameter,stats,iter.next());
			index++;
		}
		if(!hasCountry){
			HashMap<String,Object> data = new HashMap<String,Object>();
			data.put("adm_cd", null);
			data.put("adm_nm", "그외 지역");
			this.getStatIcon(index,mapParameter,stats,data);
			HashMap<String,Object> stat = (HashMap<String,Object>)stats.get(String.valueOf(index));
			int allCnt = (int)stat.get("cnt");
			int cnt = 0;
			for(int i=index-1;i>=0;i--){
				HashMap<String,Object> h = (HashMap<String,Object>)stats.get(String.valueOf(i));
				cnt+=(int)h.get("cnt");
			}
			stat.put("cnt",allCnt-cnt);
		}
		resultData.put("stats",stats);
	}
	private void getStatIcon(
			int index,
			Map<String,Object> mapParameter,
			HashMap<String,Object> stats,
			HashMap<String,Object> data){
		data.put("stat_type", mapParameter.get("stat_type"));
		data.put("icon", mapParameter.get("icon"));
		data.put("bnd_year", mapParameter.get("bnd_year"));
		data.put("search_usr_id", mapParameter.get("search_usr_id"));
		data.put("cmmnty_map_id", mapParameter.get("cmmnty_map_id"));
		HashMap<String,Object> symbol = session.selectOne("communityPoi.selectCommunitySymbolStatByArea", data);
		HashMap<String,Object> stat = new HashMap<String,Object>();
		if(symbol==null){
			stat.put("cnt", 0);
		}else{
			stat.put("cnt", symbol.get("symbol_cnt"));
		}
		stat.put("label_nm", data.get("adm_nm"));
		stats.put(String.valueOf(index), stat);
	}
	private void getStatRegionIcon(
			Map<String,Object> mapParameter,
			HashMap<String,Object> resultData,
			HashMap<String,Object> community,
			HashMap<String,Object> symbolObject){
		List<HashMap<String,Object>> stats = session.selectList("communityPoi.selectCommunitySymbolStatByRegionIcon", mapParameter);
		HashMap<String,Object> sidoMap = new HashMap<String,Object>(); 
		Iterator<HashMap<String,Object>> iter = stats.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			if(sidoMap.get(data.get("sido_cd"))==null){
				HashMap<String,Object> sido = new HashMap<String,Object>(); 
				sido.put("cd", data.get("sido_cd").toString());
				sido.put("nm", data.get("sido_nm").toString());
				HashMap<String,Object> sidoSymbol = new HashMap<String,Object>(copySymbolObject(symbolObject));
				HashMap<String,Object> sidoSymbolObj = (HashMap<String,Object>)sidoSymbol.get(data.get("symbol").toString());
				sidoSymbolObj.put("cnt", (int)sidoSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
				sido.put("symbol", sidoSymbol);
				
				HashMap<String,Object> sgg = new HashMap<String,Object>();
				List<HashMap<String,Object>> sggList = new ArrayList<HashMap<String,Object>>();
				sgg.put("cd", data.get("sgg_cd").toString());
				sgg.put("nm", data.get("sgg_nm").toString());
				sgg.put("cnt", (int)data.get("symbol_cnt"));
				HashMap<String,Object> sggSymbol = new HashMap<String,Object>(copySymbolObject(symbolObject));
				HashMap<String,Object> sggSymbolObj = (HashMap<String,Object>)sggSymbol.get(data.get("symbol").toString());
				sggSymbolObj.put("cnt", (int)sggSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
				sgg.put("symbol", sggSymbol);
				sggList.add(sgg);
				sido.put("children", sggList);
				
				HashMap<String,Object> emdong = new HashMap<String,Object>();
				List<HashMap<String,Object>> emdongList = new ArrayList<HashMap<String,Object>>();
				emdong.put("cd", data.get("emdong_cd").toString());
				emdong.put("nm", data.get("emdong_nm").toString());
				emdong.put("cnt", (int)data.get("symbol_cnt"));
				sidoMap.put(data.get("sido_cd").toString(), sido);
				HashMap<String,Object> emdongSymbol = new HashMap<String,Object>(copySymbolObject(symbolObject));
				HashMap<String,Object> emdongSymbolObj = (HashMap<String,Object>)emdongSymbol.get(data.get("symbol").toString());
				emdongSymbolObj.put("cnt", (int)emdongSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
				emdong.put("symbol", emdongSymbol);
				emdongList.add(emdong);
				sgg.put("children", emdongList);
				
			}else{
				HashMap<String,Object> sido = (HashMap<String,Object>)sidoMap.get(data.get("sido_cd").toString());
				List<HashMap<String,Object>> sggList = (List<HashMap<String,Object>> )sido.get("children");
				HashMap<String,Object> sgg = null;
				for(HashMap<String,Object> sggObj:sggList){
					if(sggObj.get("cd").toString().equals(data.get("sgg_cd").toString())){
						sgg = sggObj;
						break;
					}
				}
				if(sgg==null){
					sgg = new HashMap<String,Object>();
					sgg.put("cd", data.get("sgg_cd").toString());
					sgg.put("nm", data.get("sgg_nm").toString());
					HashMap<String,Object> sggSymbol = new HashMap<String,Object>(copySymbolObject(symbolObject));
					HashMap<String,Object> sggSymbolObj = (HashMap<String,Object>)sggSymbol.get(data.get("symbol").toString());
					sggSymbolObj.put("cnt", (int)sggSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
					sgg.put("symbol",sggSymbol);
					HashMap<String,Object> emdong = new HashMap<String,Object>();
					List<HashMap<String,Object>> emdongList = new ArrayList<HashMap<String,Object>>();
					emdong.put("cd", data.get("emdong_cd").toString());
					emdong.put("nm", data.get("emdong_nm").toString());
					HashMap<String,Object> emdongSymbol = new HashMap<String,Object>(copySymbolObject(symbolObject));
					HashMap<String,Object> emdongSymbolObj = (HashMap<String,Object>)emdongSymbol.get(data.get("symbol").toString());
					emdongSymbolObj.put("cnt", (int)emdongSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
					emdong.put("symbol",emdongSymbol);
					emdongList.add(emdong);
					sgg.put("children", emdongList);
					sggList.add(sgg);
					sido.put("children", sggList);
				}else{
					HashMap<String,Object> sggSymbol = (HashMap<String,Object>)sgg.get("symbol");
					HashMap<String,Object> sggSymbolObj = (HashMap<String,Object>)sggSymbol.get(data.get("symbol").toString());
					sggSymbolObj.put("cnt", (int)sggSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
					List<HashMap<String,Object>> emdongList = (List<HashMap<String,Object>> )sgg.get("children");
					HashMap<String,Object> emdong = null;
					for(HashMap<String,Object> emdongObj:emdongList){
						if(emdongObj.get("cd").toString().equals(data.get("emdong_cd").toString())){
							emdong = emdongObj;
							break;
						}
					}
					if(emdong==null){
						emdong = new HashMap<String,Object>();
						emdong.put("cd", data.get("emdong_cd").toString());
						emdong.put("nm", data.get("emdong_nm").toString());
						emdong.put("cnt", (int)data.get("symbol_cnt"));
						HashMap<String,Object> emdongSymbol = new HashMap<String,Object>(copySymbolObject(symbolObject));
						HashMap<String,Object> emdongSymbolObj = (HashMap<String,Object>)emdongSymbol.get(data.get("symbol").toString());
						emdongSymbolObj.put("cnt", (int)emdongSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
						emdong.put("symbol",emdongSymbol);
						emdongList.add(emdong);
						sgg.put("children", emdongList);
					}else{
						HashMap<String,Object> emdongSymbol = (HashMap<String,Object>)emdong.get("symbol");
						HashMap<String,Object> emdongSymbolObj = (HashMap<String,Object>)emdongSymbol.get(data.get("symbol").toString());
						emdongSymbolObj.put("cnt", (int)emdongSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
					}
				}
				HashMap<String,Object> sidoSymbol = (HashMap<String,Object>)sido.get("symbol");
				HashMap<String,Object> sidoSymbolObj = (HashMap<String,Object>)sidoSymbol.get(data.get("symbol").toString());
				sidoSymbolObj.put("cnt", (int)sidoSymbolObj.get("cnt")+(int)data.get("symbol_cnt"));
			}
		}
		resultData.put("stats",sidoMap);
		resultData.put("symbolInfo",copySymbolObject(symbolObject));
	}
	private HashMap<String,Object> copySymbolObject(HashMap<String,Object> symbolObject){
		HashMap<String,Object> symbol = new HashMap<String,Object>();
		Iterator<String> keys = symbolObject.keySet().iterator();
		while( keys.hasNext() ){
			String key = keys.next();
			symbol.put(key,new HashMap<String,Object>((HashMap<String,Object>)symbolObject.get(key)));
		}
		return symbol;
	}
}
