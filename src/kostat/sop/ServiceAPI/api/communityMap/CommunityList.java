package kostat.sop.ServiceAPI.api.communityMap;


import java.util.ArrayList;
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
 * 1. 기능 : 소통지도 목록<p>
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
public class CommunityList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityList.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100000";
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
		type,
		bnd_year
	}

	enum OptionParam{
		page_num,
		search_word,
		pageSize,
		sido_cd,
		sgg_cd,
		emdong_cd,
		first_sort,
		second_sort,
		last_cmmnty_map_id,
		tags,
		search_type
	}
	
	enum FirstSort{
		Default("기본",null),
		hot("Hot소통지도","IS_HOT DESC"),
		newest("New소통지도","IS_NEW DESC"),
		open("개방형 소통지도","COMMUNITY_TYPE_SORT_NUMBER ASC"),
		enclosed("폐쇄형 소통지도","COMMUNITY_TYPE_SORT_NUMBER DESC"),
		my("내가만든 소통지도","IS_MINE DESC"),
		temp("임시저장 소통지도","TEMP_SAVE_YN DESC, IS_MINE DESC");

		private final String title;
		private final String column;

		private FirstSort(String title, String column){
			this.title = title;
			this.column = column;
		}
		public String getCode(){return this.name();}
		public String getName(){return this.name();}
		public String getTitle(){return this.title;}
		public String getColumn(){return this.column;}
		public static FirstSort getColumn(String title){
			if(title!=null){for(FirstSort e : FirstSort.values()){if(title.equals(e.name())){return e;}}}
			return FirstSort.Default;
		}
	}
	enum SecondSort{
		Default("기본","MOD_TS DESC"),
		title_asc("소통지도명","CMMNTY_MAP_NM ASC"),
		data_desc("자료건수","POI_CNT DESC"),
		date_desc("등록일","REG_DATE DESC"),
		mod_desc("수정일","MOD_TS DESC");
		private final String title;
		private final String column;

		private SecondSort(String title, String column){
			this.title = title;
			this.column = column;
		}
		public String getCode(){return this.name();}
		public String getName(){return this.name();}
		public String getTitle(){return this.title;}
		public String getColumn(){return this.column;}
		public static SecondSort getColumn(String title){
			if(title!=null){for(SecondSort e : SecondSort.values()){if(title.equals(e.name())){return e;}}}
			return SecondSort.Default;
		}
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
			communityService.dollarQueryReplace(mapParameter);
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id", login_id);
			int totalCount = 0;
			List<HashMap<String,Object>> summaryList = new ArrayList<HashMap<String,Object>>();
			String original_type = mapParameter.get("type").toString();
			mapParameter.put("type","hot");
			List<HashMap<String,Object>> hotList = session.selectList("communityMap.selectHotCmmntyList", mapParameter);
			if(hotList.size()<4){
				mapParameter.put("type","others");
				mapParameter.put("limit",4-hotList.size());
				mapParameter.put("summaryList",hotList);
				List<HashMap<String,Object>> summaryOthersList = session.selectList("communityMap.selectHotCmmntyList", mapParameter);
				hotList.addAll(summaryOthersList);
			}
			mapParameter.put("type",original_type);
			if(mapParameter.get("type").equals("hot")){
				summaryList = hotList; 
				totalCount = hotList.size();
			}else{
				totalCount = (int) session.selectOne("communityMap.selectCmmntyCount", mapParameter);
				int pageSize = req.getParameter("pageSize")==null?5:Integer.parseInt(mapParameter.get("pageSize").toString());
				int curPage = req.getParameter("page_num")==null?1:Integer.parseInt(mapParameter.get("page_num").toString());
				mapParameter.put("page_size", pageSize);
				mapParameter.put("page_num", curPage);
				mapParameter.put("hotList", hotList);
				mapParameter.put("firstSort", FirstSort.getColumn(mapParameter.get("first_sort")==null?null:mapParameter.get("first_sort").toString()).column);
				if("hot".equals(mapParameter.get("first_sort"))&&"Default".equals(mapParameter.get("second_sort"))){
					mapParameter.put("secondSort", "HOT_SORT ASC,JOIN_CNT DESC,POI_CNT DESC,CMMNTY_MAP_ID DESC");
				}else{
					mapParameter.put("secondSort", SecondSort.getColumn(mapParameter.get("second_sort")==null?null:mapParameter.get("second_sort").toString()).column);
				}
				int lastNum = 0;
				if(curPage > 1){
					if(mapParameter.get("last_cmmnty_map_id")==null){
						lastNum = pageSize*(curPage-1) + 1;
					}else{
						int lastRowNum = (int)session.selectOne("communityMap.selectLastNum", mapParameter);
						lastNum = lastRowNum+1;
					}
				}
				mapParameter.put("last_num", lastNum);
				summaryList = session.selectList("communityMap.selectCmmntyList", mapParameter);
			}

			resultData.put("summaryList", summaryList);
			resultData.put("total_count", totalCount);

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
