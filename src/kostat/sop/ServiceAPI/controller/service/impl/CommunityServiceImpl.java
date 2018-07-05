/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kostat.sop.ServiceAPI.controller.service.impl;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.geotools.data.DefaultTransaction;
import org.geotools.data.Transaction;
import org.geotools.data.collection.ListFeatureCollection;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.data.simple.SimpleFeatureStore;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.geotools.geometry.jts.JTSFactoryFinder;
import org.geotools.referencing.ReferencingFactoryFinder;
import org.json.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.referencing.crs.CRSFactory;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.common.util.FileUtils;
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.controller.service.SSOService;
import kostat.sop.ServiceAPI.controller.service.mapper.CommunityMapper;
import kostat.sop.ServiceAPI.controller.service.mapper.MypageMapper;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * @Class Name : CommunityServiceImpl.java
 * @Description : CommunityServiceImpl Implement Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.21           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.21
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */

@Service("communityService")
public class CommunityServiceImpl extends EgovAbstractServiceImpl implements CommunityService {
	private static final Log logger = LogFactory.getLog(CommunityServiceImpl.class);
	@Resource(name="communityMapper")
	private CommunityMapper communityMapper;
	@Resource(name="mypageMapper")
	private MypageMapper mypageMapper;
	@Resource(name="ssoService")
	private SSOService ssoService;
	@Resource(name="mapService")
	private MapService mapService;
	/**
	 * @description poi 등록
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @return
	 * @throws Exception
	 */
	@Override
	public String poiRegist(HttpServletRequest request) {
		HashMap<String,Object> hm = new HashMap<String,Object>();
		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
		mapParameter.put("cmmnty_map_id", request.getParameter("cmmnty_map_id"));
		HashMap<String, Object> community;
		try {
			dollarQueryReplace(mapParameter);
			community = communityMapper.selectCmmnty(mapParameter);
			if(hasAuthority(request,community,hm)){
				HashMap<String,Object> error = new HashMap<String,Object>();
				List<HashMap<String,Object>> obj = new ArrayList<HashMap<String,Object>>();
				validation(request, community, obj, error);
				if(error.size()>0){
					hm.put("success",false);
					hm.put("errCd",-1);
					if(error.size()>0){
						hm.put("error", error);
					}
				}else{
					Iterator<HashMap<String,Object>> iter = obj.iterator();
					while(iter.hasNext()){
						HashMap<String,Object> param = iter.next();
						if(communityMapper.insertPoiPoint(param)>0){
							communityMapper.insertPoi(param);
						}
					}
					hm.put("success",true);
					hm.put("errCd","0");
				}
			}
		} catch (IllegalArgumentException e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
			hm.put("errCd",-201);
			hm.put("message", message);
		} catch (Exception e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
			hm.put("errCd",-201);
			hm.put("message", message);
		}
		JSONObject obj = new JSONObject(hm);
		return obj.toString();
	}
	/**
	 * @description 사용자 등록
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @return
	 * @throws Exception
	 */
	@Override
	public String memberRegist(HttpServletRequest request) {
		HashMap<String,Object> hm = new HashMap<String,Object>();
		try{
			List<HashMap<String,Object>> obj = new ArrayList<HashMap<String,Object>>();
			List<Object> idList = new ArrayList<Object>();
			List<String> duplicationExcelidList = new ArrayList<String>();
			HashMap<String,Object> mapParameter = new HashMap<String,Object>();
			mapParameter.put("cmmnty_map_id", request.getParameter("cmmnty_map_id"));
			dollarQueryReplace(mapParameter);
			HashMap<String,Object> community = communityMapper.selectCmmnty(mapParameter);
			if(hasAuthority(request,community,hm)){
				HashMap<String,Object> error = new HashMap<String,Object>();
				validation(request, community, obj, error, idList, duplicationExcelidList);
				mapParameter.put("idList", idList);
				List<String> duplication = communityMapper.selectCmmntyMapRegMberDuplicationList(mapParameter);
				if(error.size()>0||duplicationExcelidList.size()>0||duplication.size()>0){
					hm.put("success",false);
					hm.put("errCd",-1);
					if(error.size()>0){
						hm.put("error", error);
					}
					if(duplicationExcelidList.size()>0){
						hm.put("duplicationExcelData", duplicationExcelidList);
					}
					if(duplication.size()>0){
						hm.put("duplication", duplication);
					}
				}else{
					hm.put("success",true);
					hm.put("errCd","0");
					Iterator<HashMap<String,Object>> objIter = obj.iterator();
					while(objIter.hasNext()){
						communityMapper.insertCmmntyMapRegMber(objIter.next());
					}
				}
			}
		}catch(IllegalArgumentException e){
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
			hm.put("errCd",-201);
			hm.put("message", message);
		}catch(Exception e){
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
			hm.put("errCd",-201);
			hm.put("message", message);
		}
		JSONObject obj = new JSONObject(hm);
		return obj.toString();
	}
	/**
	 * @description 맴버 등록시 업로드 엑셀 데이터를 handsontable 에 맞게변경 
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @return
	 * @throws IOException
	 */
	@Override
	public String getFileDataToHandsontable(HttpServletRequest request) throws IOException{
		JSONObject obj = new JSONObject();
		try{
			List<String[]> data = getExcelData(request, 1);
			if(data==null){
				HashMap<String,Object> hm = new HashMap<String,Object>();
				hm.put("errCd",-201);
				hm.put("message", "지원하지 않는 파일 형식입니다");
				obj.put("data", hm);
			}else{
				obj.put("errCd", 0);
				obj.put("data", data);
			}
		}catch(IllegalArgumentException e){
			HashMap<String,Object> hm = new HashMap<String,Object>();
			hm.put("errCd",-201);
			hm.put("message", "서버에서 처리중 에러가 발생했습니다.");
			obj = new JSONObject(hm);
		}catch(Exception e){
			HashMap<String,Object> hm = new HashMap<String,Object>();
			hm.put("errCd",-201);
			hm.put("message", "서버에서 처리중 에러가 발생했습니다.");
			obj = new JSONObject(hm);
		}
		return obj.toString();
	}
	/**
	 * @description 맴버 등록시 업로드 엑셀 데이터를 handsontable 에 맞게변경 
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @return
	 * @throws IOException
	 */
	@Override
	public String getBatchFileDataToHandsontable(HttpServletRequest request) throws IOException{
		JSONObject obj = new JSONObject();
		try{
			List<String[]> list = getExcelData(request, 2);
			if(list==null){
				HashMap<String,Object> hm = new HashMap<String,Object>();
				hm.put("errCd",-201);
				hm.put("message", "지원하지 않는 파일 형식입니다");
				obj.put("data", hm);
			}else{
				HashMap<String,Object> param = new HashMap<String,Object>();
				param.put("cmmnty_map_id", request.getParameter("cmmnty_map_id"));
				dollarQueryReplace(param);
				HashMap<String,Object> community = communityMapper.selectCmmnty(param);

				HashMap<String,Object> option = new HashMap<String,Object>();
				List<HashMap<String,Object>> customSymbolList = communityMapper.selectCommunityCustomSymbolList(community.get("custom_symbol_group_id").toString());
				String[] header = new String[7+customSymbolList.size()];
				header[0] = "결과";
				header[1] = "No";
				header[2] = "제목";
				header[3] = "주소";
				header[4] = "X좌표";
				header[5] = "Y좌표";
				header[6] = "의견";

				List<HashMap<String,Object>> columns = new ArrayList<HashMap<String,Object>>();
				setColumn(columns, "result", true, false);
				setColumn(columns, "no", true, false);
				setColumn(columns, "title", false, false);
				setColumn(columns, "address", false, false);
				setColumn(columns, "x_coor", false, false);
				setColumn(columns, "y_coor", false, false);
				setColumn(columns, "opinion", false, false);

				for(int i=0;i<customSymbolList.size();i++){
					HashMap<String,Object> symbol = customSymbolList.get(i);
					setColumn(columns, "icon_"+symbol.get("custom_symbol_id").toString(), false, true);
					header[i+7] = symbol.get("label_nm").toString();
				}
				list.remove(0);
				list.remove(0);
				List<HashMap<String,Object>> data = new ArrayList<HashMap<String,Object>>();
				Iterator<String[]> iter = list.iterator();
				while(iter.hasNext()){
					String[] datas = iter.next();
					HashMap<String,Object> addData = new HashMap<String,Object>();
					addData.put("no", datas[1]);
					addData.put("title", datas[2]);
					addData.put("address", datas[3]);
					addData.put("x_coor", datas[4]);
					addData.put("y_coor", datas[5]);
					addData.put("opinion", datas[6]);
					for(int i=7;i<datas.length;i++){
						if(datas[i]!=null&&datas[i].equals("O")){
							HashMap<String,Object> column = columns.get(i);
							addData.put(column.get("data").toString(), "yes");
						}
					}
					data.add(addData);
				}
				option.put("data",data);
				option.put("colHeaders",header);
				option.put("columns",columns);
				option.put("rowHeaders",true);
				option.put("contextMenu",false);
				obj.put("errCd", 0);
				obj.put("result", option);
			}
		}catch(IndexOutOfBoundsException e){
			HashMap<String,Object> hm = new HashMap<String,Object>();
			hm.put("errCd",-201);
			hm.put("message", "엑셀 양식이 맞지 않습니다");
			obj = new JSONObject(hm);
		}catch(Exception e){
			HashMap<String,Object> hm = new HashMap<String,Object>();
			hm.put("errCd",-201);
			hm.put("message", "서버에서 처리중 에러가 발생했습니다.");
			obj = new JSONObject(hm);
		}
		return obj.toString();
	}
	/**
	 * @description POI 일괄 업로드 샘플 엑셀 데이터 
	 * @date 2016. 6. 9.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param response -- {@link HttpServletResponse}
	 * @throws Exception
	 */
	@Override
	public void getBatchSampleExcel(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException {
		List<HashMap<String,Object>> sampleDataList = new ArrayList<HashMap<String,Object>>();
		HashMap<String,Object> param = new HashMap<String,Object>();
		param.put("cmmnty_map_id", request.getParameter("cmmnty_map_id"));
		dollarQueryReplace(param);
		HashMap<String,Object> community = communityMapper.selectCmmnty(param);
		List<HashMap<String,Object>> customSymbolList = communityMapper.selectCommunityCustomSymbolList(community.get("custom_symbol_group_id").toString());
		List<HashMap<String,Object>> sidoList = communityMapper.selectSidoList(null);
		Random generator = new Random();
		for(HashMap<String,Object> sido:sidoList){
			HashMap<String,Object> data = new HashMap<String,Object>();
			data.put("title", sido.get("sido_nm").toString()+"의 위치입니다");
			data.put("reg_lc", sido.get("sido_nm").toString());
			data.put("opinion_state", "샘플 데이터 입니다.");
			data.put("custom_symbol_id", customSymbolList.get(generator.nextInt(customSymbolList.size())).get("custom_symbol_id").toString());
			if(sido.get("sido_cd").equals("23")){
				data.put("x_coor", "909059.819359952");
				data.put("y_coor", "1942571.540534");
			}else{
				data.put("x_coor", sido.get("x_coor").toString());
				data.put("y_coor", sido.get("y_coor").toString());
			}
			sampleDataList.add(data);
		}
		setBatchExcel(request, response, "sample",community,customSymbolList,sampleDataList);
	}
	/**
	 * @description 등록 화면
	 * @date 2016. 6. 14.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param model -- {@link ModelMap}
	 * @return
	 * @throws Exception
	 */
	@Override
	public ModelAndView getForm(
			HttpServletRequest request,
			ModelMap model
			) throws Exception,IllegalArgumentException{
		String cmmnty_map_id = request.getParameter("cmmnty_map_id");
		if(request.getSession().getAttribute("member_id")==null){
			return redirectAuthPage(request,"/view/community/form");
		}else{
			String login_id = request.getSession().getAttribute("member_id").toString();
			HashMap<String,Object> mapParameter = new HashMap<String,Object>();
			mapParameter.put("member_id",login_id);
			if(cmmnty_map_id!=null){
				mapParameter.put("cmmnty_map_id",cmmnty_map_id);
				mapParameter.put("bnd_year", kostat.sop.ServiceAPI.common.controller.Properties.getDefult_bnd_year());
				dollarQueryReplace(mapParameter);
				HashMap<String,Object> communityMapInfo = communityMapper.selectCmmnty(mapParameter);
				if(communityMapInfo.get("usr_id").equals(login_id)){
					mapParameter.put("recmd_stat_yn", "N");
					communityMapInfo.put("stats",communityMapper.selectMapList(mapParameter));
					String kwrd = null;
					List<HashMap<String,Object>> kwrdList = communityMapper.selectKwrdList(cmmnty_map_id);
					for(HashMap<String,Object> keyword:kwrdList){
						if(kwrd==null){
							if(keyword.get("kwrd") != null){
								kwrd = keyword.get("kwrd").toString();
							}
						}else{
							kwrd += ","+keyword.get("kwrd").toString();
						}
					}
					communityMapInfo.put("kwrd",kwrd);
					communityMapInfo.put("itemList", communityMapper.selectCmmntyItemList(mapParameter));
					model.addAttribute("command",communityMapInfo);
					model.addAttribute("communityMapInfoJson",new JSONObject(communityMapInfo).toString());
					List<HashMap<String,Object>> custom_symbol_list = communityMapper.selectCommunityCustomSymbolList(communityMapInfo.get("custom_symbol_group_id").toString());
					if(custom_symbol_list!=null&&custom_symbol_list.size()>0){
						HashMap<Object,Object> custom_symbol_map = new HashMap<Object,Object>();
						Iterator<HashMap<String,Object>> iter = custom_symbol_list.iterator();
						while(iter.hasNext()){
							HashMap<String,Object> data = iter.next();
							if(communityMapInfo.get("reg_symbol")==null){
								custom_symbol_map.put(data.get("custom_symbol_id").toString(), data);
							}else{
								custom_symbol_map.put(data.get("order").toString(), data);
							}
						}
						model.addAttribute("custom_symbol_map",custom_symbol_map);
					}
				}
				model.addAttribute("areaList",communityMapper.selectCmmntyMapAddRegion(mapParameter));
			}
			HashMap<String,Object> tooltipParameter = new HashMap<String,Object>();
			HashMap<String,Object> tooltipInfo = new HashMap<String,Object>();
			tooltipParameter.put("menu_class_cd", "A0");
			List<?> tooltipList = mapService.selectTooltipInfo(tooltipParameter);
			
			for (int i=0; i<tooltipList.size(); i++) {
				HashMap<String,Object> map = (HashMap<String,Object>)tooltipList.get(i);
				String classCd = (String)map.get("menu_class_cd");
				String ttpId = (String)map.get("ttip_id");
				String exp = (String)map.get("ttip_exp");
				tooltipInfo.put(classCd + ttpId, exp);
			}
			model.addAttribute("tooltipList",tooltipInfo);
			model.addAttribute("historyList",communityMapper.selectHistoryList(mapParameter));
			model.addAttribute("mydataList",mypageMapper.selectListMyDataPure(login_id));
			model.addAttribute("themeMap",communityMapper.selectItemCdList());
			return new ModelAndView("/communityMap/form/communityMapForm");
		}
	}
	/**
	 * @description 소통지도 상세 화면
	 * @date 2016. 6. 14.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param model -- {@link ModelMap}
	 * @return
	 * @throws Exception
	 */
	@Override
	public ModelAndView view(
			HttpServletRequest request,
			ModelMap model
			) throws Exception,IllegalArgumentException{
		String login_id = request.getSession().getAttribute("member_id")==null?null:request.getSession().getAttribute("member_id").toString();
		model.addAttribute("member_id",login_id);
		String cmmnty_map_id = request.getParameter("cmmnty_map_id");
		if(StringUtils.hasText(cmmnty_map_id)){
			HashMap<String,Object> mapParameter = new HashMap<String,Object>();
			mapParameter.put("member_id",login_id);
			mapParameter.put("cmmnty_map_id",cmmnty_map_id);
			mapParameter.put("bnd_year", kostat.sop.ServiceAPI.common.controller.Properties.getDefult_bnd_year());
			dollarQueryReplace(mapParameter);
			HashMap<String,Object> communityMapInfo = communityMapper.selectCmmnty(mapParameter);
			if(communityMapInfo!=null&&communityMapInfo.size()>0&&communityMapInfo.get("temp_save_yn").equals("N")){
				mapParameter.put("recmd_stat_yn", "N");
				communityMapInfo.put("stats",communityMapper.selectMapList(mapParameter));
				mapParameter.put("recmd_stat_yn", "Y");
				communityMapInfo.put("recommend",communityMapper.selectMapList(mapParameter));
				mapParameter.put("adm_cd", communityMapInfo.get("adm_cd"));
				model.addAttribute("area",communityMapper.selectArea(mapParameter));
				communityMapInfo.put("bnd_year", kostat.sop.ServiceAPI.common.controller.Properties.getDefult_bnd_year());
				List<HashMap<String,Object>> communityMapList = new ArrayList<HashMap<String,Object>>();
				HashMap<String,Object> addArea = communityMapper.selectArea(communityMapInfo);
				addArea.put("adm_cd", communityMapInfo.get("adm_cd"));
				addArea.put("adm_nm", communityMapInfo.get("adm_nm"));
				communityMapList.add(addArea);
				communityMapInfo.remove("bnd_year");
				communityMapList.addAll(communityMapper.selectCmmntyMapAddRegion(mapParameter));
				communityMapInfo.put("addAreaList", communityMapList);
				communityMapInfo.put("itemList", communityMapper.selectCmmntyItemList(mapParameter));
				model.addAttribute("custom_symbol_list",communityMapper.selectCommunityCustomSymbolList(communityMapInfo.get("custom_symbol_group_id").toString()));
				model.addAttribute("communityMapInfoJson",new JSONObject(communityMapInfo).toString());
				if(forbidden(request, communityMapInfo)){
					model.addAttribute("regist_member_id_list",communityMapper.selectCmmntyMapRegistMemberList(communityMapInfo));
				}
				mapParameter.put("type","hot");
				List<HashMap<String,Object>> hotList = communityMapper.selectHotCmmntyList(mapParameter);
				if(hotList.size()<4){
					mapParameter.put("type","others");
					mapParameter.put("limit",4-hotList.size());
					mapParameter.put("hotList",hotList);
					List<HashMap<String,Object>> summaryOthersList = communityMapper.selectHotCmmntyList(mapParameter);
					hotList.addAll(summaryOthersList);
				}
				for(HashMap<String,Object> hot:hotList){
					if(cmmnty_map_id.equals(hot.get("cmmnty_map_id"))){
						communityMapInfo.put("is_hot", "Y");
						break;
					}
				}
				model.addAttribute("communityMapInfo",communityMapInfo);
			}else{
				throw new ApiException("존재하지 않는 참여형 통계지도 입니다.");
			}
		}else{
			throw new ApiException("잘못된 페이지 접근입니다.");
		}
		return new ModelAndView("/communityMap/view/communityMap");
	}
	/**
	 * @description 도로명주소
	 * @date 2016. 6. 14.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param response -- {@link HttpServletResponse}
	 * @param model -- {@link ModelMap}
	 * @return
	 * @throws Exception
	 */
	@Override
	public ModelAndView juso(
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model
			)throws Exception,IllegalArgumentException{
		if(request.getParameter("inputYn")!=null&&request.getParameter("inputYn").toString().equals("Y")){
			response.setContentType("text/html; charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			Enumeration<?> params = request.getParameterNames();
			while (params.hasMoreElements()){
				String name = (String)params.nextElement();
				model.addAttribute(name,new String(request.getParameter(name).getBytes("ISO-8859-1"), "UTF-8"));
			}
		}
		return new ModelAndView("/communityMap/view/jusoPopup");
	}
	/**
	 * @description 데이터 일괄 업로드 화면
	 * @date 2016. 6. 14.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param response -- {@link HttpServletResponse}
	 * @param model -- {@link ModelMap}
	 * @return
	 * @throws Exception
	 */
	@Override
	public ModelAndView dataUpload(
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception,IllegalArgumentException{
		if(request.getSession().getAttribute("member_id")==null){
			return redirectAuthPage(request,"/view/community/dataUpload");
		}else{
			HashMap<String,Object> mapParameter = new HashMap<String,Object>();
			mapParameter.put("cmmnty_map_id",request.getParameter("cmmnty_map_id"));
			dollarQueryReplace(mapParameter);
			HashMap<String,Object> communityMapInfo = communityMapper.selectCmmnty(mapParameter);
			if(this.forbidden(request, communityMapInfo)){
				communityMapInfo.put("custom_symbol_list", communityMapper.selectCommunityCustomSymbolList(communityMapInfo.get("custom_symbol_group_id").toString()));
				model.addAttribute("communityMapInfo",new JSONObject(communityMapInfo));
			}else{
				response.setContentType("text/html; charset=UTF-8");
				request.setCharacterEncoding("UTF-8");
				response.sendError(HttpServletResponse.SC_NOT_FOUND);
			}
			return new ModelAndView("/communityMap/batch/dataUpload");
		}
	}
	
	/**
	 * @description 접근 가능한지 체크
	 * @date 2016. 6. 14.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param community -- {@link HashMap}&lt;{@link String},{@link Object}&gt; : 소통지도 정보
	 * @return
	 */
	private boolean forbidden(
			HttpServletRequest request,
			HashMap<String,Object> community
			){
		return request.getSession().getAttribute("member_id")!=null&&community!=null&&community.get("usr_id").equals(request.getSession().getAttribute("member_id"));
	}
	/**
	 * @description 권한 체크
	 * @date 2016. 6. 10.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param community -- {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 * @param hm -- {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 * @return
	 * @throws Exception
	 */
	private boolean hasAuthority(
			HttpServletRequest request,
			HashMap<String,Object> community,
			HashMap<String,Object> hm
			) throws Exception,IllegalArgumentException{
		if(request.getSession().getAttribute("member_id")==null){
			hm.put("success",false);
			hm.put("message","로그인이 필요합니다");
			hm.put("errCd",-1);
		}else if(community!=null){
			if(!community.get("usr_id").equals(request.getSession().getAttribute("member_id"))){
				hm.put("success",false);
				hm.put("message","등록 권한이 존재하지 않습니다");
				hm.put("errCd",-1);
			}else{
				return true;
			}
		}else{
			hm.put("success",false);
			hm.put("message","존재하지 않는 소통지도입니다");
		}
		return false;
	}


	/**
	 * @description 사용자 등록 데이터 검증
	 * @date 2016. 6. 10.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param community -- {@link HashMap}&lt;{@link String},{@link Object}&gt; : 소통지도 정보
	 * @param obj -- {@link List}&lt;{@link HashMap}&lt;{@link String},{@link Object}&gt;&gt; : DB에 쌓을 데이터 리스트
	 * @param error -- {@link HashMap}&lt;{@link String},{@link Object}&gt; : 에러 목록
	 * @param idList -- {@link List}&lt;{@link Object}&gt; : 아이디 리스트
	 * @param duplicationExcelidList -- {@link List}&lt;{@link String}&gt; : 중복된 아이디 리스트
	 * @throws ParseException
	 */
	private void validation(
			HttpServletRequest request,
			HashMap<String,Object> community,
			List<HashMap<String,Object>> obj,
			HashMap<String,Object> error,
			List<Object> idList,
			List<String> duplicationExcelidList) throws ParseException{
		String cmmnty_map_id = request.getParameter("cmmnty_map_id");
		String paramData = request.getParameter("data");
		JSONParser jsonParser = new JSONParser();
		int row = 1;
		List<JSONArray> dataObject = (List<JSONArray>)jsonParser.parse(paramData);
		Iterator<JSONArray> iter = dataObject.iterator();
		while(iter.hasNext()){
			JSONArray json = iter.next();
			List<String> errorList = new ArrayList<String>();
			if(idList.size()>0){
				Iterator<Object> idIter = idList.iterator();
				while(idIter.hasNext()){
					Object id = idIter.next();
					if(json.get(3)!=null&&StringUtils.hasText(json.get(3).toString())){
						if(id.equals(json.get(3))){
							duplicationExcelidList.add(id.toString());
							break;
						}
					}
				}
			}
			idList.add(json.get(3));
			if(json.get(3)==null||!StringUtils.hasText(json.get(3).toString())){
				errorList.add("아이디를 입력해주세요");
			}else{
				if(community.get("usr_id").equals(json.get(3).toString())){
					errorList.add("개설자 아이디는 등록할 수 없습니다");
				}
				if(json.get(3).toString().length()>30){
					errorList.add("아이디는 최대 30자까지 등록 가능합니다");
				}
				if(!json.get(3).toString().matches("[a-z|A-Z|0-9]+")){
					errorList.add("아이디는 영문 또는 숫자만 사용하실 수 있습니다");
				}
			}
			if(json.get(2)!=null&&json.get(2).toString().length()>30){
				errorList.add("이름은 최대 30자까지 등록 가능합니다");
			}
			if(json.get(4)==null||!StringUtils.hasText(json.get(4).toString())){
				errorList.add("비밀번호를 입력해주세요");
			}else{
				if(json.get(4).toString().matches(".*[ㄱ-ㅎㅏ-ㅣ가-힣]+.*+")){
					errorList.add("패스워드는 한글을 포함할 수 없습니다");
				}
			}
			if(errorList.size()>0){
				error.put(String.valueOf(row), errorList);
			}
			HashMap<String,Object> data = new HashMap<String,Object>();
			data.put("cmmnty_map_id", cmmnty_map_id);
			data.put("id", json.get(3));
			data.put("nm", json.get(2));
			BCryptPasswordEncoder pwbcrypt = new BCryptPasswordEncoder();
			data.put("pw", json.get(4)!=null?pwbcrypt.encode(json.get(4).toString()):"");
			obj.add(data);
			row++;
		}
	}
	/**
	 * @description 데이터 검증
	 * @date 2016. 6. 14.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param community -- {@link List}&lt;{@link HashMap}&lt;{@link String},{@link Object}&gt;&gt; : 소통지도 정보
	 * @param obj -- {@link List}&lt;{@link HashMap}&lt;{@link String},{@link Object}&gt;&gt; : DB에 쌓을 데이터 리스트
	 * @param error -- {@link HashMap}&lt;{@link String},{@link Object}&gt; : 에러 목록
	 * @throws Exception
	 */
	private void validation(
			HttpServletRequest request,
			HashMap<String,Object> community,
			List<HashMap<String,Object>> obj,
			HashMap<String,Object> error
			) throws Exception,IllegalArgumentException{
		List<HashMap<String,Object>> customSymbolList = communityMapper.selectCommunityCustomSymbolList(community.get("custom_symbol_group_id").toString());
		String cmmnty_map_id = request.getParameter("cmmnty_map_id");
		String paramData = request.getParameter("data");
		JSONParser jsonParser = new JSONParser();
		int row = 1;
		List<JSONArray> dataObject = (List<JSONArray>)jsonParser.parse(paramData);
		Iterator<JSONArray> iter = dataObject.iterator();
		while(iter.hasNext()){
			JSONArray json = iter.next();
			List<String> errorList = new ArrayList<String>();
			if(json.get(2)==null||!StringUtils.hasText(json.get(2).toString())){
				errorList.add("제목을 입력해주세요");
			}else{
				if(json.get(2).toString().length()>30){
					errorList.add("제목은 최대 30자까지 작성하실 수 있습니다");
				}
			}
			if(json.get(3)==null||!StringUtils.hasText(json.get(3).toString())){
				errorList.add("주소를 입력해주세요");
			}else{
				if(json.get(3).toString().length()>65){
					errorList.add("주소는 최대 65자까지 작성하실 수 있습니다");
				}
			}
			if(json.get(6)==null||!StringUtils.hasText(json.get(6).toString())){
				errorList.add("의견기재 해주세요");
			}else{
				if(json.get(6).toString().length()>150){
					errorList.add("의견기재는 최대 150자까지 작성하실 수 있습니다");
				}
			}
			int symbolIndex = -1;
			for(int i=7;i<json.size();i++){
				String symbol = json.get(i)==null?null:json.get(i).toString();
				if(StringUtils.hasText(symbol)&&symbol.equals("yes")){
					if(symbolIndex==-1){
						symbolIndex = i-7;
					}else{
						errorList.add("아이콘을 하나만 선택해주세요");
					}
				}
			}
			HashMap<String,Object> data = new HashMap<String,Object>();
			if(symbolIndex>-1){
				HashMap<String,Object> symbolObj = customSymbolList.get(symbolIndex);
				if(community.get("reg_symbol")==null){
					data.put("symbol", symbolObj.get("custom_symbol_id"));
				}else{
					data.put("symbol", symbolObj.get("order"));
				}
			}else{
				errorList.add("아이콘을 선택해주세요");
			}
			if(errorList.size()>0){
				error.put(String.valueOf(row), errorList);
			}
			data.put("cmmnty_map_id", cmmnty_map_id);
			data.put("title", json.get(2));
			data.put("reg_lc", json.get(3));
			data.put("opinion_state", json.get(6));
			data.put("geom", "Point("+json.get(4).toString()+" "+json.get(5).toString()+")");
			data.put("member_id", request.getSession().getAttribute("member_id"));

			obj.add(data);
			row++;
		}
	}
	/**
	 * @description apache poi를 사용하여 엑셀을 다운로드 한다.
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request : {@link HttpServletRequest} 
	 * @param response : {@link HttpServletResponse} 
	 * @param wb : {@link Workbook} 
	 * @param downloadFilename -- {@link String} : 다운로드 파일이름 
	 */
	private void downloadExcel(
			HttpServletRequest request,
			HttpServletResponse response,
			Workbook wb,
			String downloadFilename
			){
		ByteArrayOutputStream outByteStream = null;
		try {
			outByteStream = new ByteArrayOutputStream();
			wb.write(outByteStream);
			byte [] outArray = outByteStream.toByteArray();
			setDownloadFilename(request, response, downloadFilename);
			response.setContentType("application/ms-excel");
			response.setContentLength(outArray.length);
			response.setHeader("Expires:", "0");
			OutputStream outStream = response.getOutputStream();
			outStream.write(outArray);
			outStream.flush();
		} catch (IllegalArgumentException e) {
			logger.error(e);
		} catch (Exception e) {
			logger.error(e);
		}finally {
			if(outByteStream!=null){try {
				outByteStream.close();
			} catch (IOException e) {
				logger.error(e);
			}}
		}
	}
	/**
	 * @description 업로드 엑셀 데이터를 handsontable 에 맞게변경 
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param startDataRow -- int : 데이터가 시작되는 row index
	 * @return
	 * @throws IOException
	 */
	private List<String[]> getExcelData(
			HttpServletRequest request,
			int startDataRow) throws IOException{
		MultipartHttpServletRequest mRequest =(MultipartHttpServletRequest)request;
		Iterator<String> itr = mRequest.getFileNames();
		MultipartFile mpf = null;
		if(itr.hasNext()){
			mpf = mRequest.getFile(itr.next());
			String external = getExternalName(mpf.getOriginalFilename());
			if(external.equals("xlsx") ){
				return getExcelData(mpf,startDataRow);
			}else if(external.equals("xls")){
				return getXlsData(mpf,startDataRow);
			}
		}
		return null;
	}
	/**
	 * @description 확장자 얻기
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param fileName -- {@link String} : 파일 이름
	 * @return
	 */
	private String getExternalName(String fileName){
		int pathPoint = fileName.lastIndexOf(".");
		String filePoint = fileName.substring(pathPoint + 1,fileName.length());
		String fileType = filePoint.toLowerCase();
		return fileType;
	}
	/**
	 * @description 엑셀 데이터 변환
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param mpf -- {@link MultipartFile}
	 * @param startDataRow -- int : 데이터가 시작되는 row index
	 * @return
	 * @throws IOException
	 */
	private List<String[]> getXlsData(
			MultipartFile mpf,
			int startDataRow
			) throws IOException{
		InputStream fis = mpf.getInputStream();
		List<String[]> dataList = new ArrayList<String[]>();

		HSSFWorkbook xworkBook = new HSSFWorkbook(fis);
		HSSFSheet xsheet = null;
		HSSFRow xrow = null;
		HSSFCell xcell = null;

		xsheet = xworkBook.getSheetAt(0);
		int rows = xsheet.getPhysicalNumberOfRows();//행의 개수

		if(rows >= 3501){
			rows = 3501;
		}

		for(int i=0; i<rows; i++){
			xrow = xsheet.getRow(i);
			int cells = xrow.getPhysicalNumberOfCells();
			if(cells > 11){
				cells = 11;
			}
			String rowArray[]=new String[cells + 6];
			for(int y=0;y<cells;y++){
				xcell = xrow.getCell(y);
				if(i > 0){
					if(i>=startDataRow){
						rowArray[0] = "";
						rowArray[1] = Integer.toString(i-startDataRow+1);
					}
				}else{
					rowArray[0] = "결과";
					rowArray[1] = "No";
				}

				switch(xcell.getCellType()){
				case 0 : 
					rowArray[y+2] = String.valueOf((long)xcell.getNumericCellValue());
					break;
				case 1 :
					rowArray[y+2]=xcell.getStringCellValue();
					break;
				}
			}
			dataList.add(rowArray);
		}
		return dataList;
	}
	/**
	 * @description 엑셀 데이터 변환
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param mpf -- {@link MultipartFile}
	 * @param startDataRow -- int : 데이터가 시작되는 row index
	 * @return
	 * @throws IOException
	 */
	private List<String[]> getExcelData(
			MultipartFile mpf,
			int startDataRow) throws IOException{
		InputStream fis = mpf.getInputStream();
		List<String[]> dataList = new ArrayList<String[]>();

		XSSFWorkbook xworkBook = new XSSFWorkbook(fis);
		XSSFSheet xsheet = null;
		XSSFRow xrow = null;
		XSSFCell xcell = null;

		xsheet = xworkBook.getSheetAt(0);//첫 시트

		int rows = xsheet.getPhysicalNumberOfRows();//행의 개수

		if(rows >= 3501){
			rows = 3501;
		}

		for(int i=0; i<rows; i++){
			xrow = xsheet.getRow(i);
			int cells = xrow.getPhysicalNumberOfCells();

			if(cells > 11){
				cells = 11;
			}
			String rowArray[]=new String[cells + 2];
			for(int y=0;y<cells;y++){
				xcell = xrow.getCell(y);
				if(xcell!=null){
					if(i > 0){
						if(i>=startDataRow){
							rowArray[0] = "";
							rowArray[1] = Integer.toString(i-startDataRow+1);
						}
					}else{
						rowArray[0] = "결과";
						rowArray[1] = "No";
					}

					switch(xcell.getCellType()){
					case 0 : 
						rowArray[y+2] = String.valueOf((long)xcell.getNumericCellValue());
						break;
					case 1 :
						rowArray[y+2]=xcell.getStringCellValue();
						break;
					}
				}
			}
			dataList.add(rowArray);
		}
		return dataList;
	}
	/**
	 * @description handsontable의 column 설정
	 * @date 2016. 6. 9.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param columns -- {@link HashMap}&lt;{@link String},{@link Object}&gt; : 컬럼이 담길 리스트
	 * @param name -- {@link String} : 컬럼 이름
	 * @param is_readonly -- 읽기 전용 유무
	 * @param checkbox -- checkbox 유무
	 */
	private void setColumn(
			List<HashMap<String,Object>> columns,
			String name,
			boolean is_readonly,
			boolean checkbox){
		HashMap<String,Object> column = new HashMap<String,Object>();
		column.put("data", name);
		column.put("readOnly", is_readonly);
		if(checkbox){
			column.put("type", "checkbox");
			column.put("checkedTemplate", "yes");
			column.put("uncheckedTemplate", "no");
		}
		columns.add(column);
	}

	/**
	 * @description 대용량 업로드 엑셀 샘플 다운로드
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param response -- {@link HttpServletResponse}
	 * @param downloadFilename -- {@link String} : 다운로드 파일 이름
	 * @param community -- {@link HashMap}&lt;{@link String},{@link Object}&gt; : 소통지도 정보
	 * @param customSymbolList -- {@link List}&lt;{@link HashMap}&lt;{@link String},{@link Object}&gt;&gt; : 심볼 리스트
	 * @param dataList -- {@link List}&lt;{@link HashMap}&lt;{@link String},{@link Object}&gt;&gt; : 데이터 리스트
	 * @throws Exception
	 */
	private void setBatchExcel(
			HttpServletRequest request,
			HttpServletResponse response,
			String downloadFilename,
			HashMap<String,Object> community,
			List<HashMap<String,Object>> customSymbolList,
			List<HashMap<String,Object>> dataList
			) throws Exception,IllegalArgumentException {
		XSSFWorkbook wb = new XSSFWorkbook();
		XSSFCellStyle titleStyle = this.setCellStyle(wb, true, new XSSFColor(Color.decode("#000000")).getIndexed(), "#dddddd", (short)14, true, CellStyle.BORDER_THICK,XSSFCellStyle.ALIGN_CENTER,true);
		XSSFCellStyle dataStyle = this.setCellStyle(wb, false, new XSSFColor(Color.decode("#000000")).getIndexed(), null, (short)13, false, CellStyle.BORDER_THICK,XSSFCellStyle.ALIGN_LEFT,false);
		XSSFSheet sheet = wb.createSheet(downloadFilename);
		sheet.protectSheet("sgis");

		sheet.setDefaultRowHeight((short)500);

		int rowCnt = 0;
		XSSFRow row = sheet.createRow(rowCnt);

		setExcelData(sheet, row, titleStyle, "제목", rowCnt, 0);
		setExcelData(sheet, row, titleStyle, "주소", rowCnt, 1);
		setExcelData(sheet, row, titleStyle, "X좌표", rowCnt, 2);
		setExcelData(sheet, row, titleStyle, "Y좌표", rowCnt, 3);
		setExcelData(sheet, row, titleStyle, "의견", rowCnt, 4);
		rowCnt = 1;
		row = sheet.createRow(rowCnt);
		for(int i=0;i<=4;i++){
			XSSFCell cell = row.createCell(i);
			cell.setCellStyle(titleStyle);
		}
		for(int i=0;i<customSymbolList.size()+4;i++){
			sheet.setDefaultColumnStyle(i, dataStyle);
		}
		String[] symbolArray = new String[customSymbolList.size()];
		for(int i=0;i<customSymbolList.size();i++){
			XSSFCell cell = sheet.getRow(0).createCell(i+5);
			cell.setCellStyle(titleStyle);
			HashMap<String,Object> symbol = customSymbolList.get(i);
			symbolArray[i] = symbol.get("custom_symbol_id").toString();
			setExcelData(sheet, row, titleStyle, symbol.get("label_nm").toString(), rowCnt, i+5);
		}
		setExcelData(sheet, sheet.getRow(0), titleStyle, "아이콘", 0, 5);
		Iterator<HashMap<String,Object>> iter = dataList.iterator();
		while(iter.hasNext()){
			rowCnt++;
			row = sheet.createRow(rowCnt);
			HashMap<String,Object> data = iter.next();
			setExcelData(sheet, row, dataStyle, data.get("title"), rowCnt, 0);
			setExcelData(sheet, row, dataStyle, data.get("reg_lc"), rowCnt, 1);
			setExcelData(sheet, row, dataStyle, data.get("x_coor"), rowCnt, 2);
			setExcelData(sheet, row, dataStyle, data.get("y_coor"), rowCnt, 3);
			setExcelData(sheet, row, dataStyle, data.get("opinion_state"), rowCnt, 4);
			int symbolIndex = Arrays.asList(symbolArray).indexOf(data.get("custom_symbol_id").toString());
			for(int i=5;i<5+symbolArray.length;i++){
				XSSFCell cell = row.createCell(i);
				cell.setCellStyle(dataStyle);
			}
			if(symbolIndex>-1){
				setExcelData(sheet, row, dataStyle, "O", rowCnt, 5+symbolIndex);
			}
		}
		sheet.addMergedRegion(new CellRangeAddress(0,0,5,(4+customSymbolList.size())));
		for(int i=0;i<=4;i++){
			sheet.addMergedRegion(new CellRangeAddress(0,1,i,i));
			sheet.autoSizeColumn((short)i);
		}
		for(int i=0; i<sheet.getPhysicalNumberOfRows(); i++){
			XSSFRow xrow = sheet.getRow(i);
			int cells = xrow.getPhysicalNumberOfCells();
			for(int y=4+symbolArray.length;y<cells;y++){
				XSSFCell xcell = xrow.getCell(y);
				xcell.getCellStyle();
			}
		}
		downloadExcel(request, response, wb, downloadFilename+".xlsx");
	}
	/**
	 * @description 엑셀의 셀 데이터 등록
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param sheet -- {@link XSSFSheet}
	 * @param row -- {@link XSSFRow}
	 * @param style -- {@link XSSFCellStyle}
	 * @param data -- {@link Object} : 셀의 데이터
	 * @param y -- int : 열
	 * @param x -- int : 행
	 */
	private void setExcelData(
			XSSFSheet sheet,
			XSSFRow row,
			XSSFCellStyle style,
			Object data,
			int y,
			int x
			){
		if(data!=null){
			XSSFCell cell = row.createCell(x);
			cell.setCellStyle(style);
			cell.setCellValue(data.toString());
		}
	}
	/**
	 * @description 셀의 스타일 등록
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param wb -- {@link XSSFWorkbook}
	 * @param bold -- boolean : 글씨체에서 굵기 여부
	 * @param fontColor -- short : 폰트 색상
	 * @param backgroundColor -- {@link String} : 배경색 색상
	 * @param fontSize -- short : 폰트 사이즈
	 * @param border -- boolean : 테두리여부
	 * @param borderStyle -- short : 테두리 스타일
	 * @param textAlign -- short : 글자 정렬
	 * @return
	 */
	private XSSFCellStyle setCellStyle(
			XSSFWorkbook wb,
			boolean bold,
			short fontColor,
			String backgroundColor,
			short fontSize,
			boolean border,
			short borderStyle,
			short textAlign,
			boolean locked
			){
		XSSFFont font = wb.createFont();
		font.setFontHeightInPoints(fontSize); //폰트 크기
		if(bold){
			font.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);	//폰트 굵기 
		}
		font.setFontName("맑은 돋움"); //폰트명
		font.setColor(fontColor); //폰트 색상

		XSSFCellStyle cellStyle = wb.createCellStyle();

		cellStyle.setFont(font); //설정한 폰트를 스타일에 적용
		cellStyle.setAlignment(textAlign); //가로정렬
		cellStyle.setVerticalAlignment (XSSFCellStyle.VERTICAL_CENTER);	//세로정렬
		cellStyle.setLocked(locked);//셀 잠금

		if(border){
			cellStyle.setBorderLeft(borderStyle);
			cellStyle.setBorderRight(borderStyle);
			cellStyle.setBorderTop(borderStyle);
			cellStyle.setBorderBottom(borderStyle);
		}

		if(StringUtils.hasText(backgroundColor)){
			cellStyle.setFillBackgroundColor(new XSSFColor(Color.decode(backgroundColor)));
			cellStyle.setFillForegroundColor(new XSSFColor(Color.decode(backgroundColor)));
			cellStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		}
		return cellStyle;
	}

	/**
	 * @description 파일다운로드 이름 셋팅
	 * @date 2016. 6. 8.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param response -- {@link HttpServletResponse}
	 * @param downloadFilename -- {@link String} : 다운로드 파일 이름
	 */
	private void setDownloadFilename(
			HttpServletRequest request,
			HttpServletResponse response,
			String downloadFilename
			){
		try {
			String header = request.getHeader("User-Agent");
			if(header.contains("MSIE")||header.contains("Windows")) {
				String docName = URLEncoder.encode(downloadFilename,"UTF-8").replaceAll("\\+", "%20");
				response.setHeader("Content-Disposition", "attachment;filename=" + docName + ";");
			}else{
				String docName = new String(downloadFilename.getBytes("UTF-8"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
			}
		}catch (UnsupportedEncodingException e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
		}
	}
	
	/**
	 * @description SHP POI 다운로드
	 * @date 2016. 6. 15.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param response -- {@link HttpServletResponse}
	 * @throws Exception
	 */
	@Override
	public void getPoiSHPFile(HttpServletRequest request,HttpServletResponse response) throws Exception,IllegalArgumentException{
		FileInputStream fis = null;
		OutputStream out = null;
		try {
			HashMap<String,Object> retMap = createSHPFile(request.getParameter("cmmnty_map_id"));
			File file = (File) retMap.get("file");
			byte[] arBytes = new byte[(int)file.length()];
			fis = new FileInputStream(file);
			fis.read(arBytes);

			String filename = retMap.get("fileName").toString();
			response.setContentType("application/zip; charset=utf-8");
			setDownloadFilename(request, response, filename);
			response.setHeader("Content-Transfer-Encoding", "binary");
			out = response.getOutputStream();
			out.write(arBytes);
			out.flush();
			out.close();
			file.delete();
		} catch (IllegalArgumentException e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
		} catch (Exception e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
		} finally {
			if(out!=null){out.close();}
			if(fis!=null){fis.close();}
		}
	}
	/**
	 * @description SHP 파일 만들기
	 * @date 2016. 6. 15.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param cmmnty_map_id -- {@link String} : SHP 파일 만들기
	 * @return
	 * @throws Exception
	 */
	private HashMap<String,Object> createSHPFile(String cmmnty_map_id) throws Exception,IllegalArgumentException{
		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
		mapParameter.put("member_id",null);
		mapParameter.put("bnd_year", kostat.sop.ServiceAPI.common.controller.Properties.getDefult_bnd_year());
		mapParameter.put("cmmnty_map_id", cmmnty_map_id);
		dollarQueryReplace(mapParameter);
		HashMap<String,Object> community = communityMapper.selectCmmnty(mapParameter);
		HashMap<String,Object> customsymbol = this.covertCustomSymbol(community);
		mapParameter.put("type", "markers");
		List<HashMap<String,Object>> poiList = communityMapper.selectCmmntyPoiList(mapParameter);

		SimpleFeatureTypeBuilder sftb = new SimpleFeatureTypeBuilder();
		// UTM-K EPSG:5179
		String strUtmkWKT = "PROJCS[\"UTM-K\","
				+ "GEOGCS[\"GCS_ITRF_2000\","
				+ "DATUM[\"D_ITRF_2000 (EPSG ID 9028080)\","
				+ "SPHEROID[\"GRS_1980 (EPSG ID 9021980)\",6378137.0,298.257222101]],"
				+ "PRIMEM[\"Greenwich\",0.0],"
				+ "UNIT[\"degree\",0.017453292519943295],"
				+ "AXIS[\"Longitude\",EAST],"
				+ "AXIS[\"Latitude\",NORTH]],"
				+ "PROJECTION[\"Transverse_Mercator\"],"
				+ "PARAMETER[\"central_meridian\",127.5],"
				+ "PARAMETER[\"latitude_of_origin\",38.0],"
				+ "PARAMETER[\"scale_factor\",0.9996],"
				+ "PARAMETER[\"false_easting\",1000000.0],"
				+ "PARAMETER[\"false_northing\",2000000.0],"
				+ "UNIT[\"m\",1.0],"
				+ "AXIS[\"x\",EAST],"
				+ "AXIS[\"y\",NORTH]]";
		logger.info("strUtmkWKT = " + strUtmkWKT);
		CRSFactory crsFactory = ReferencingFactoryFinder.getCRSFactory( null );
		CoordinateReferenceSystem crs = crsFactory.createFromWKT( strUtmkWKT ); 

		sftb.setName( "UTM-k" );
		sftb.setCRS( crs );
		sftb.add( "Location", Point.class );

		SimpleFeatureType TYPE = null;

		// Feature 리스트
		List<SimpleFeature> features = new ArrayList<SimpleFeature>();

		// 추가된 Data를 이용하여 Feature 를 생성한다.
		SimpleFeature feature = null;

		boolean isFirst = true;

		Iterator<HashMap<String,Object>> iter = poiList.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> poi = iter.next();
			double geo_x = Double.parseDouble(poi.get("x_loc").toString());
			double geo_y = Double.parseDouble(poi.get("y_loc").toString());
			sftb.add(new String("제목".getBytes("EUC-KR"), "ISO-8859-1"),String.class);
			sftb.add(new String("의견".getBytes("EUC-KR"), "ISO-8859-1"),String.class);
			sftb.add(new String("X좌표".getBytes("EUC-KR"), "ISO-8859-1"),String.class);
			sftb.add(new String("Y좌표".getBytes("EUC-KR"), "ISO-8859-1"),String.class);
			sftb.add(new String("아이콘이름".getBytes("EUC-KR"), "ISO-8859-1"),String.class);
			ArrayList<String> dispData = new ArrayList<String>();
			dispData.add(poi.get("title").toString());
			String opinion = poi.get("opinion_state").toString();
			dispData.add(byteSubString(opinion,0,253));
			dispData.add(String.valueOf(geo_x));
			dispData.add(String.valueOf(geo_y));
			HashMap<String,Object> symbolInfo = (HashMap<String,Object>)customsymbol.get(poi.get("symbol").toString());
			dispData.add(symbolInfo.get("label_nm").toString());
			if(isFirst){
				TYPE = sftb.buildFeatureType();
				isFirst = false;
			}
			feature = createPointFeature(TYPE,dispData,geo_x,geo_y);
			features.add( feature );
		}
		
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String filepath = props.getProperty("Globals.Community.File.Path")+"upload"+File.separator+"community";
		String filename = FileUtils.getUniqueFileName(filepath, null);
		String downloadname = community.get("cmmnty_map_nm").toString().replaceAll(" |\\\\|\\/|:|\\*|\\?|\"|<|>\\||\\.", " ");
		createShapeFile(TYPE,features,filepath,filename);
		
		mapParameter.put("file",shapeFileZip(downloadname,filename));
		mapParameter.put("fileName",downloadname+".zip");
		return mapParameter;
	}
	/**
	 * @description point 생성
	 * @date 2016. 6. 15.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param type -- {@link SimpleFeatureType}
	 * @param dispData -- {@link List}&lt;{@link String}&gt; : 데이터
	 * @param x -- double : x좌표
	 * @param y -- double : y좌표
	 * @return
	 */
	private SimpleFeature createPointFeature(SimpleFeatureType type, List<String> dispData, double x, double y){
		// 지오메트리 생성 팩토리, point, polyline ... 을 생성한다.
		GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();

		// Feature 생성 빌더
		SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(type);

		// 지오메트리팰토리를 활용 하여 포인트를 생성한다.
		Point point = geometryFactory.createPoint( new Coordinate(x, y) );

		// 피쳐빌드에 생성 포인트및 attribution을 추가 한다.
		featureBuilder.add( point );
		for(int i = 0; i < dispData.size(); i ++){
			featureBuilder.add( dispData.get(i));
		}

		return featureBuilder.buildFeature( null );
	}
	/**
	 * @description shape 파일 생성
	 * @date 2016. 6. 15.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param type -- {@link SimpleFeatureType}
	 * @param features -- {@link List}&lt;{@link SimpleFeature}&gt;
	 * @param filepath -- {@link String} : 파일 경로
	 * @param filename -- {@link String} : 파일 이름
	 * @throws IOException
	 */
	private void createShapeFile(SimpleFeatureType type, List<SimpleFeature> features,String filepath,String filename) throws IOException {
		
		File fileShape = new File(filepath+"/"+filename+".shp");

		ShapefileDataStoreFactory dataStoreFactory = new ShapefileDataStoreFactory();

		Map<String, Serializable> params = new HashMap<String, Serializable>();
		params.put("url", fileShape.toURI().toURL());
		params.put("create spatial index", Boolean.TRUE);
		params.put("charset", "CP949");
		ShapefileDataStore newDataStore = (ShapefileDataStore) dataStoreFactory.createNewDataStore(params);

		newDataStore.createSchema( type );

		Transaction transaction = new DefaultTransaction("create");

		String typeName = newDataStore.getTypeNames()[0];

		SimpleFeatureSource featureSource = newDataStore.getFeatureSource(typeName);

		if (featureSource instanceof SimpleFeatureStore) {
			SimpleFeatureStore featureStore = (SimpleFeatureStore) featureSource;
			SimpleFeatureCollection collection = new ListFeatureCollection(type, features);
			featureStore.setTransaction(transaction);
			try {
				featureStore.addFeatures(collection);
				transaction.commit();

			} catch (IllegalArgumentException e) {
				String message = "서버에서 처리중 에러가 발생했습니다.";
				logger.info(message+":"+e);
				transaction.rollback();
			} catch (Exception e) {
				String message = "서버에서 처리중 에러가 발생했습니다.";
				logger.info(message+":"+e);
				transaction.rollback();
			} finally {
				transaction.close();
			}
		} else {
			logger.warn(typeName + " does not support read/write access");
		}

	}
	/**
	 * @description file 압축
	 * @date 2016. 6. 15.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param communityName -- {@link String} : 소통지도 이름
	 * @param filename -- {@link String} : 파일 이름
	 * @return
	 * @throws IOException
	 */
	public File shapeFileZip(String communityName,String filename) throws IOException{
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String file_path = props.getProperty("Globals.Community.File.Path")+"upload"+File.separator+"community";

		String zipFileName = file_path+File.separator+filename+".zip";
		//shp,shx,qix,prj,fix,dbf
		String[] files = new String[6];

		files[0] = file_path+File.separator+filename+".shp";
		files[1] = file_path+File.separator+filename+".shx";
		files[2] = file_path+File.separator+filename+".qix";
		files[3] = file_path+File.separator+filename+".prj";
		files[4] = file_path+File.separator+filename+".fix";
		files[5] = file_path+File.separator+filename+".dbf";

		byte[] buf = new byte[4096];
		ZipOutputStream out = null;
		try {
			out = new ZipOutputStream(new FileOutputStream(zipFileName));

			for (int i=0; i<files.length; i++) {
				FileInputStream in = null;
				try{
					in = new FileInputStream(files[i]);
					Path p = Paths.get(files[i]);
					String file = p.getFileName().toString();
					String fileExtension = file.substring(file.lastIndexOf("."));
					ZipEntry ze = new ZipEntry(communityName+fileExtension);
					out.putNextEntry(ze);
					
					int len;
					while ((len = in.read(buf)) > 0) {
						out.write(buf, 0, len);
					}
					
					out.closeEntry();
					//in.close(); //2017.12.04 [개발팀] 시큐어코딩
				}catch (IOException e) {
					String message = "서버에서 처리중 에러가 발생했습니다.";
					logger.info(message+":"+e);
				} finally {
					if(in!=null){in.close();}
				}

			}

			out.close();

			for(int i=0;i<files.length;i++){
				File f = new File(files[i]);
				f.delete();
			}

		} catch (IOException e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
		} finally {
			if(out!=null){out.close();}
		}
		File zipFile = new File(zipFileName);
		return zipFile;		
	}
	
	/**
	 * @description byte단위로 substring
	 * @date 2016. 7. 4.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param startIndex -- int : 시작 index
	 * @param length -- int : 종료 index
	 * @return
	 */
	private static String byteSubString(String str, int startIndex, int length){
		byte[] b1 = null;
		byte[] b2 = null;
		try{
			if (str == null){
				return "";
			}
			b1 = str.getBytes();
			b2 = new byte[length];
			if (length > (b1.length - startIndex)){
				length = b1.length - startIndex;
			}
			System.arraycopy(b1, startIndex, b2, 0, length);
		}
		//2017.12.04 [개발팀] 시큐어코딩
		catch (IllegalArgumentException e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
		}
		catch (Exception e){
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
		}
		return new String(b2);
	}
	/**
	 * @description 비밀번호 체크
	 * @date 2016. 7. 15.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @return
	 * @throws Exception
	 */
	@Override
	public String checkPassword(HttpServletRequest request) throws Exception,IllegalArgumentException {
		HashMap<String,Object> hm = new HashMap<String,Object>();
		try{
			HashMap<String,Object> mapParameter = new HashMap<String,Object>();
			mapParameter.put("cmmnty_map_id", request.getParameter("cmmnty_map_id"));
			dollarQueryReplace(mapParameter);
			HashMap<String,Object> community = communityMapper.selectCmmnty(mapParameter);
			if(community==null){
				hm.put("errCd",-1);
				hm.put("errMsg", "존재하지 않는 소통지도입니다");
				hm.put("success",false);
			}else if(request.getParameter("cmmnty_ipcd")==null){
				hm.put("errCd",-1);
				hm.put("errMsg", "아이디를 입력해주세요");
				hm.put("success",false);
			}else if(request.getParameter("cmmnty_ppcd")==null){
				hm.put("errCd",-1);
				hm.put("errMsg", "비밀번호를 입력해주세요");
				hm.put("success",false);
			}else{
				String pw = request.getParameter("cmmnty_ppcd");
				BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
				if("P".equals(community.get("cmmnty_partcptn_grant_yn"))){
					if(request.getParameter("cmmnty_ipcd").toString().length()<5){
						hm.put("errCd",-1);
						hm.put("errMsg", "아이디는 5글자 이상으로 등록해주세요");
						hm.put("success",false);
					}else if(!bcrypt.matches(pw,community.get("pw").toString())){
						hm.put("errCd",-1);
						if(request.getParameter("cmmnty_poi_id")!=null){
							hm.put("errMsg", "아이디 또는 비밀번호를 확인해 주시기 바랍니다.<div class='help'>* 비밀번호는 소통지도 개설자가 설정한 비밀번호이므로, 비밀번호는 개설자에게 확인하시기 바랍니다.</div>");
						}else{
							hm.put("errMsg", "비밀번호를 확인해 주시기 바랍니다.<div class='help'>* 비밀번호는 소통지도 개설자가 설정한 비밀번호이므로, 비밀번호는 개설자에게 확인하시기 바랍니다.</div>");
						}
						hm.put("success",false);
					}else{
						if(request.getParameter("cmmnty_poi_id")!=null){
							mapParameter.put("cmmnty_poi_id", request.getParameter("cmmnty_poi_id"));
							mapParameter.put("getPw", null);
							HashMap<String,Object> poi = communityMapper.selectCmmntyPoi(mapParameter);
							if(poi==null){
								hm.put("errCd",-1);
								hm.put("errMsg", "존재하지않는 의견입니다");
								hm.put("success",false);
							}else if(!poi.get("usr_id").toString().equals(request.getParameter("cmmnty_ipcd"))){
								hm.put("errCd",-1);
								hm.put("errMsg", "아이디 또는 비밀번호를 확인해 주시기 바랍니다.<div class='help'>* 비밀번호는 소통지도 개설자가 설정한 비밀번호이므로, 비밀번호는 개설자에게 확인하시기 바랍니다.</div>");
								hm.put("success",false);
							}else{
								hm.put("errCd",0);
								hm.put("success",true);
							}
						}else{
							hm.put("errCd",0);
							hm.put("success",true);
						}
					}
				}else if("M".equals(community.get("cmmnty_partcptn_grant_yn"))){
					mapParameter.put("id", request.getParameter("cmmnty_ipcd"));
					HashMap<String,Object> mber = communityMapper.selectCmmntyMapRegMber(mapParameter);
					if(mber==null||!bcrypt.matches(pw,mber.get("pw").toString())){
						hm.put("errCd",-1);
						hm.put("errMsg", "아이디 또는 비밀번호를 확인해주세요<div class='help'>* 소통지도 개설자가 등록한 아이디와 비밀번호를 사용하셔야 합니다.<br/>아이디와 비밀번호는 개설자에게 확인하시기 바랍니다.</div>");
						hm.put("success",false);
					}else{
						if(request.getParameter("cmmnty_poi_id")!=null){
							mapParameter.put("cmmnty_poi_id", request.getParameter("cmmnty_poi_id"));
							mapParameter.put("getPw", null);
							HashMap<String,Object> poi = communityMapper.selectCmmntyPoi(mapParameter);
							if(poi==null){
								hm.put("errCd",-1);
								hm.put("errMsg", "존재하지않는 의견입니다");
								hm.put("success",false);
							}else if(!poi.get("usr_id").toString().equals(request.getParameter("cmmnty_ipcd"))){
								hm.put("errCd",-1);
								hm.put("errMsg", "아이디 또는 비밀번호를 확인해주세요<div class='help'>* 소통지도 개설자가 등록한 아이디와 비밀번호를 사용하셔야 합니다.<br/>아이디와 비밀번호는 개설자에게 확인하시기 바랍니다.</div>");
								hm.put("success",false);
							}else{
								hm.put("errCd",0);
								hm.put("success",true);
							}
						}else{
							hm.put("errCd",0);
							hm.put("success",true);
						}
					}
				}else if("A".equals(community.get("cmmnty_partcptn_grant_yn"))){
					if(request.getParameter("cmmnty_ipcd").toString().length()<5){
						hm.put("errCd",-1);
						hm.put("errMsg", "별명은 5글자 이상으로 등록해주세요");
						hm.put("success",false);
					}else{
						if(request.getParameter("cmmnty_poi_id")!=null){
							mapParameter.put("cmmnty_poi_id", request.getParameter("cmmnty_poi_id"));
							mapParameter.put("getPw", "Y");
							HashMap<String,Object> poi = communityMapper.selectCmmntyPoi(mapParameter);
							if(poi==null){
								hm.put("errCd",-1);
								hm.put("errMsg", "존재하지않는 의견입니다");
								hm.put("success",false);
							}else if(!poi.get("usr_id").toString().equals(request.getParameter("cmmnty_ipcd"))){
								hm.put("errCd",-1);
								hm.put("errMsg", "아이디 또는 비밀번호를 확인해 주시기 바랍니다.");
								hm.put("success",false);
							}else if(!bcrypt.matches(pw,poi.get("pw").toString())){
								hm.put("errCd",-1);
								hm.put("errMsg", "아이디 또는 비밀번호를 확인해 주시기 바랍니다.");
								hm.put("success",false);
							}else{
								hm.put("errCd",0);
								hm.put("success",true);
							}
						}else{
							hm.put("errCd",0);
							hm.put("success",true);
						}
					}
				}else{
					hm.put("errCd",-1);
					hm.put("errMsg", "승인이 필요없는 소통지도 입니다");
					hm.put("success",false);
				}
			}
		}catch(IllegalArgumentException e){
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
			hm.put("errCd",-201);
			hm.put("errMsg", message);
			hm.put("success",false);
		}catch(Exception e){
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
			hm.put("errCd",-201);
			hm.put("errMsg", message);
			hm.put("success",false);
		}
		JSONObject obj = new JSONObject(hm);
		return obj.toString();
	}
	/**
	 * @description custom symbol list to HashMap
	 * @date 2016. 7. 20.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param community
	 * @return
	 * @throws Exception
	 */
	private HashMap<String,Object> covertCustomSymbol(HashMap<String,Object> community) throws Exception,IllegalArgumentException{
		HashMap<String,Object> result = new HashMap<String,Object>();
		List<HashMap<String,Object>> customSymbolList = communityMapper.selectCommunityCustomSymbolList(community.get("custom_symbol_group_id").toString());
		Iterator<HashMap<String,Object>> iter = customSymbolList.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			if(community.get("reg_symbol")!=null&&community.get("reg_symbol").toString().matches("a|b|c|d")){
				result.put(data.get("order").toString(), data);
			}else{
				result.put(data.get("custom_symbol_id").toString(), data);
			}
		}
		return result;
	}
	/**
	 * @description 연계기관 사용자 등록
	 * @date 2016. 11. 24.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@Override
	public String insertOrganUser(HttpServletRequest request,HttpServletResponse response) throws Exception,IllegalArgumentException{
		HashMap<String,Object> hm = new HashMap<String,Object>();
		if(StringUtils.hasText(request.getParameter("organ"))&&StringUtils.hasText(request.getParameter("scu"))){
			if(this.hasOrgan(request.getParameter("organ"))){
				hm.put("errCd",0);
				communityMapper.insertOrganMember(base64Decode(request.getParameter("organ")), base64Decode(request.getParameter("scu")));
			}else{
				hm.put("errCd",-1);
				hm.put("errMsg", "잘못된 접근입니다");
			}
		}else{
			hm.put("errCd",-1);
			hm.put("errMsg", "잘못된 접근입니다");
		}
		JSONObject obj = new JSONObject(hm);
		return obj.toString();
	}
	/**
	 * @description 등록된 연계기관 유무
	 * @date 2016. 11. 24.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param organ
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean hasOrgan(String organ) throws Exception,IllegalArgumentException{
		if(StringUtils.hasText(organ)){
			return communityMapper.selectOperInstAreaCount(base64Decode(organ));
		}else{
			return false;
		}
	}
	/**
	 * @description base64Decode
	 * @date 2016. 11. 24.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str
	 * @return
	 * @throws Exception
	 */
	@Override
	public String base64Decode(String str) throws Exception,IllegalArgumentException{
		if(str!=null){
			sun.misc.BASE64Decoder decode = new sun.misc.BASE64Decoder();
			return new String(decode.decodeBuffer(str));
		}else{
			return null;
		}
	}
	/**
	 * @description 등록 기간 체크
	 * @date 2016. 11. 24.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param community
	 */
	@Override
	public void registCheckDate(HashMap<String,Object> community){
		if(community==null){
			throw new ApiException("존재하지 않는 소통지도입니다.");
		}else{
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
			Date date = new Date();
			if(Integer.parseInt(community.get("prid_estbs_end_date").toString().replaceAll("\\.", ""))<Integer.parseInt(format.format(date))){
				throw new ApiException("기간이 종료된 소통지도입니다.");
			}else if(Integer.parseInt(community.get("prid_estbs_start_date").toString().replaceAll("\\.", ""))>Integer.parseInt(format.format(date))){
				throw new ApiException("아직 등록할 수 없는 소통지도입니다.");
			}
		}
	}
	/**
	 * @description 로그인 세션 확인하는 페이지 이동
	 * @date 2016. 11. 24.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param returnPage
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	private ModelAndView redirectAuthPage(HttpServletRequest request,String returnPage) throws UnsupportedEncodingException{
		List<String> parameters = new ArrayList<String>();
		Enumeration<?> eNames = request.getParameterNames();
		if(eNames.hasMoreElements()) {
			while (eNames.hasMoreElements()) {
				String name = (String) eNames.nextElement();
				String[] values = request.getParameterValues(name);
				if (values.length > 0) {
					String value = values[0];
					for (int i = 1; i < values.length; i++) {
						value += "," + values[i];
					}
					parameters.add(name+"="+value);
				}
			}
		}
		String addParameters="";
		if(parameters.size()>0){
			for(int i=0;i<parameters.size();i++){
				addParameters+=(i>0?"&":"?")+parameters.get(i);
			}
		}
		return new ModelAndView("redirect:/view/community/auth?returnPage="+URLEncoder.encode(returnPage+addParameters,"UTF-8"));
	}
	/**
	 * @description cmmnty_ipcd : id, cmmnty_ppcd : pw 로 치환
	 * @date 2016. 11. 24.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param mapParameter
	 * @throws Exception
	 */
	@Override
	public void replaceIdPw(Map<String, Object> mapParameter) throws Exception,IllegalArgumentException {
		if(mapParameter.get("cmmnty_ipcd")!=null){
			mapParameter.put("id", mapParameter.get("cmmnty_ipcd"));
			mapParameter.remove("cmmnty_ipcd");
		}
		if(mapParameter.get("cmmnty_ppcd")!=null){
			mapParameter.put("pw", mapParameter.get("cmmnty_ppcd"));
			mapParameter.remove("cmmnty_ppcd");
		}
	}
	/**
	 * @description mybatis 오류때문에 달러로 쿼리 날린부분 sql injection방어
	 * @date 2016. 12. 14.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param mapParameter
	 * @return
	 */
	public Map<String,Object> dollarQueryReplace(Map<String,Object> mapParameter){
		String[] escapeParameterArray = {"bnd_year","sido_cd","sgg_cd","emdong_cd"};
		for(String parameter:escapeParameterArray){
			if(mapParameter.get(parameter)!=null){
				String paramvalue = mapParameter.get(parameter).toString();
				if(paramvalue.indexOf("'") != -1){
					mapParameter.put(parameter, paramvalue.replaceAll("'", ""));
				}
			}
		}
		return mapParameter;
	}
	
}