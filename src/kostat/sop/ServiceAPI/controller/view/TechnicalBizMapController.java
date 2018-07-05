package kostat.sop.ServiceAPI.controller.view;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
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
import org.apache.ibatis.session.SqlSession;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.TechnicalBizMapService;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.common.security.Security;

/**
 * 1. 기능 : 기술창업 통계지도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱 1.0, 2016/06/21  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/technicalBiz")
public class TechnicalBizMapController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(TechnicalBizMapController.class);
	
	@Resource(name="technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;
	
	@Resource(name="mapService")
	private MapService mapService;
	
	/**
	 * 기술창업 통계지도
	 * @param request
	 * @param response
	 * @return technicalBiz/technicalBizMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/technicalBizMap")
	public ModelAndView technicalBizMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/technicalBizMap");
	}
	
	/**
	 * 기술창업 통계지도 Left 메뉴
	 * @param request
	 * @param response
	 * @return map/technicalBizLeftMenu
	 */
	@RequestMapping(value="/technicalBizLeftMenu")
	public ModelAndView technicalBizLeftMenu(HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			Map mapParameter = new HashMap();
			Map tooltipInfo = new HashMap();
			mapParameter.put("menu_class_cd", "E0");
			List tooltipList = mapService.selectTooltipInfo(mapParameter);
			
			for (int i=0; i<tooltipList.size(); i++) {
				Map map = (HashMap)tooltipList.get(i);
				String classCd = (String)map.get("menu_class_cd");
				String ttpId = (String)map.get("ttip_id");
				String exp = (String)map.get("ttip_exp");
				tooltipInfo.put(classCd + ttpId, exp);
			}
			paramInfo.put("tooltipList", tooltipInfo);
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		return new ModelAndView("map/technicalBizLeftMenu", "paramInfo", paramInfo);
	}
	
	
	/**
	 * 기술창업 통계지도 데이터보드
	 * @param request
	 * @param response
	 * @return map/bizStatsDataBoard
	 */
	@RequestMapping(value="/technicalBizDataBoard")
	public ModelAndView technicalBizDataBoard(HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			Map mapParameter = new HashMap();
			Map tooltipInfo = new HashMap();
			mapParameter.put("menu_class_cd", "E0");
			List tooltipList = mapService.selectTooltipInfo(mapParameter);
			
			for (int i=0; i<tooltipList.size(); i++) {
				Map map = (HashMap)tooltipList.get(i);
				String classCd = (String)map.get("menu_class_cd");
				String ttpId = (String)map.get("ttip_id");
				String exp = (String)map.get("ttip_exp");
				tooltipInfo.put(classCd + ttpId, exp);
			}
			paramInfo.put("tooltipList", tooltipInfo);
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		return new ModelAndView("map/technicalBizDataBoard", "paramInfo", paramInfo);
	}
	
	/**
	 * 기술창업 통계지도 도움말
	 * @param request
	 * @param response
	 * @return map/technicalBizHelper
	 */
	@RequestMapping(value="/technicalBizHelper")
	public ModelAndView technicalBizHelper(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/helper/technicalBizHelper");
	}
	
	/**
	 *갤러리 등록
	 * @param request
	 * @param response
	 * @return map/gallaryDialog
	 */
	@RequestMapping(value="/gallaryDialog")
	public ModelAndView gallaryDialog(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/gallaryDialog");
	}
	
	/**
	 * 기술창업통계지도 연관검색
	 * @param request
	 * @param response
	 * @return map/technicalBizMap/{type}
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/technicalBizMap/{type}")
	public ModelAndView census(@PathVariable String type, HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			logger.info("START Query - select interactiveMap param Info");
			
			//2017.12.06 [개발팀] 취약점점검
			type = Security.cleanXss(type);
			
			if (type.equals("bookmark") || type.equals("sharedata")) {
				
				String hist_id = request.getParameter("id");
				hist_id = Security.cleanXss(hist_id);
				Map mapParameter = new HashMap();
				mapParameter.put("hist_id", hist_id);
				List bookmarkList = mapService.getStatistcsHistoryParamInfo(mapParameter);
				
				JSONArray tmpbookmarkList = new JSONArray();
				JSONObject bookmarkInfo;
				for (int i=0; i<bookmarkList.size(); i++) {
					HashMap tmpBookmarkInfo = (HashMap)bookmarkList.get(i);
					bookmarkInfo = new JSONObject();
					bookmarkInfo.put("hist_type",tmpBookmarkInfo.get("hist_type"));
					bookmarkInfo.put("hist_id",tmpBookmarkInfo.get("hist_id"));
					bookmarkInfo.put("hist_nm",tmpBookmarkInfo.get("hist_nm"));
					bookmarkInfo.put("map_type",tmpBookmarkInfo.get("map_type"));
					bookmarkInfo.put("seq",tmpBookmarkInfo.get("seq"));
					bookmarkInfo.put("api_call_url",tmpBookmarkInfo.get("api_call_url"));
					bookmarkInfo.put("param_info",tmpBookmarkInfo.get("param_info"));
					tmpbookmarkList.put(bookmarkInfo.toString());
				}
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpbookmarkList.toString());
				
			}
			else if(type.equals("recentdata")){
				String hist_id = request.getParameter("id");
				hist_id = Security.cleanXss(hist_id);
				Map mapParameter = new HashMap();
				mapParameter.put("hist_id", hist_id);
				List bookmarkList = mapService.getMainRecentParamInfo(mapParameter);
				
				JSONArray tmpbookmarkList = new JSONArray();
				JSONObject bookmarkInfo;
				for (int i=0; i<bookmarkList.size(); i++) {
					HashMap tmpBookmarkInfo = (HashMap)bookmarkList.get(i);
					bookmarkInfo = new JSONObject();
					bookmarkInfo.put("hist_id",tmpBookmarkInfo.get("hist_id"));
					bookmarkInfo.put("hist_nm",tmpBookmarkInfo.get("title"));
					bookmarkInfo.put("ex_type",tmpBookmarkInfo.get("ex_type"));
					bookmarkInfo.put("seq",tmpBookmarkInfo.get("seq"));
					bookmarkInfo.put("api_call_url",tmpBookmarkInfo.get("api_call_url"));
					bookmarkInfo.put("param_info",tmpBookmarkInfo.get("param_info"));
					tmpbookmarkList.put(bookmarkInfo.toString());
				}
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpbookmarkList.toString());
			}
			else if (type.equals("userdata")) {
				String id = request.getParameter("id");
				String title = request.getParameter("title");
				
				id = Security.cleanXss(id);
				title = Security.cleanXss(title);
				
				JSONArray tmpUserDataList = new JSONArray();
				JSONObject userDataInfo = new JSONObject();
				userDataInfo.put("id", id);
				userDataInfo.put("title",title);
				tmpUserDataList.put(userDataInfo.toString());
				
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpUserDataList.toString());
			}
			else if (type.equals("localgov")) {
				String code = request.getParameter("code");
				String isBnu = request.getParameter("isbnu");
				
				JSONArray paramList = new JSONArray();
				JSONObject params = new JSONObject();
				params.put("code", code);
				params.put("isbnu", isBnu);
				paramList.put(params.toString());
				
				paramInfo.put("type", type);
				paramInfo.put("paramObj", paramList.toString());
			}
			else {
				String params = request.getParameter("params");
				params = Security.cleanXss(params);
				
				JSONArray searchParamList = new JSONArray();
				JSONObject searchParamInfo = new JSONObject();
				
				Map tempMap = request.getParameterMap();
				Iterator<String> itr = tempMap.keySet().iterator();
				while(itr.hasNext()) {
					String key = itr.next();
					String data = request.getParameter(key);
					
					if (key.equals("params")) {
						String[] tempVal = data.split("=");
						
						key = tempVal[0];
						data = tempVal[1];
					}
					
//					if (key.equals("title")) {
//						data = StringUtil.encodingChange(request, data);
//					}
					searchParamInfo.put(key, data);
				}
			
				searchParamList.put(searchParamInfo.toString());
				paramInfo.put("type", type);
				paramInfo.put("paramObj", searchParamList.toString());
			}
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		
		return new ModelAndView("map/technicalBizMap", "paramInfo", paramInfo);
	}
	
	/**
	 *갤러리 등록
	 * @param request
	 * @param response
	 * @return map/gallaryDialog
	 */
	@RequestMapping(value="/industyPopup")
	public ModelAndView industryPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/technicalBizMapIndustryPopup");
	}
	
	@RequestMapping(value="/excelDown",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getExcelFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		HSSFWorkbook book = null;
		OutputStream out = null;
		
		try{
			book = new HSSFWorkbook();
			HSSFSheet sheet = book.createSheet();
			
			String[] excelDataArr = request.getParameterValues("excelData");
			
			ArrayList makeData =  new ArrayList();
			
			for (String excelData : excelDataArr) {
				String[] tempData = excelData.toString().split(",");
				ArrayList rowData = new ArrayList();
				for (String data : tempData) {
					//운영
					rowData.add(new String(data.getBytes("UTF-8"), "UTF-8"));
					//로컬
					//rowData.add(new String(data.getBytes("iso-8859-1"), "UTF-8"));
				}
				
				makeData.add( rowData );
			}
			
			for (int i =0; i < makeData.size();i++){
				HSSFCell cell = null;
				HSSFRow row = null;
				row = sheet.createRow(i);
				ArrayList rowList = (ArrayList) makeData.get(i);
				
				for(int j = 0; j < rowList.size(); j++){
					cell = row.createCell(j);
					
					if( rowList.get(j) == null ){
						cell.setCellValue("");
					} else{
						if( i == 0 || ( i != 0 && j == 0 )){
							cell.setCellValue( rowList.get(j).toString() );
						} else {
							cell.setCellValue( Double.parseDouble( rowList.get(j).toString() ) );
						}
					}
				}
			}
			
			response.setContentType("application/vnd.ms-excel; charset=UTF-8");
			String userAgent = request.getHeader("User-Agent");
			
			String filename = "데이터_보기.xls";
			boolean ie = userAgent.indexOf("MSIE") > -1; // MSIE 6~10
            boolean ie11 = userAgent.indexOf("Trident") > -1; // MSIE 11

            String browserType = request.getHeader("user-agent");
			if(browserType.indexOf("Firefox") > -1) {
				filename = new String (filename.getBytes ("UTF-8"), "iso-8859-1");
				response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\";");
			} else if(browserType.indexOf("Safari") > -1 && browserType.indexOf("Chrome") < 0) {
				filename = new String (filename.getBytes ("UTF-8"), "iso-8859-1");
				response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\";");
			} else {
				response.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(filename, "utf-8") + "\";");
			}
            
			//추가
			response.setHeader("Content-Type", "application/octet-stream");
            response.setHeader("Content-Transfer-Encoding", "binary");
            
            out = response.getOutputStream();
            book.write(out);
           
            out.flush();
            
		} catch(IOException e){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);			
		} finally{
			if(out != null){
				out.close();
			}
			if(book != null) {
				book = null;
			}
			if(out != null) {
				out = null;
			}
		}
	}

}