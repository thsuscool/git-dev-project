package kostat.sop.ServiceAPI.api.communityMap;


import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.FileUtils;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.AuthFailedException;

/**
 * 1. 기능 : 소통지도 개설<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/10/21  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityCreate extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityCreate.class);
	@Override
	public String getApiId() {
		return "100003";
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
		cmmnty_map_nm
	}

	enum OptionParam{
		cmmnty_map_id,//통계 소통지도 일련번호
		symbol,//심볼
		fileSearchSample,//샘플 번호
		intrcn,//맵소개
		startDate,//시작날짜
		endDate,//종료날짜
		kwrd,//태그
		stats,//통계 리스트
		mydata,//마이데이터
		itemPoi,//산업분류 POI
		temp,//임시저장 여부
		pwdyn,//비밀번호 변경 유무
		pwdchk,//비밀번호
		sidoSelect,//기본 시도
		sggSelect,//기본 시군구
		emdongSelect,//기본 읍면동
		addsido,//추가 시도
		addsgg,//추가 시군구
		addemdong,//추가 읍면동
		grant_yn,//의견등록 참여방법
		fileSearch,//메인사진
		iconSetRadio,//아이콘
		iconSetRadioName//아이콘 이름
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
			mapParameter.put("bnd_year", kostat.sop.ServiceAPI.common.controller.Properties.getDefult_bnd_year());
			_checkNullParameterValue(mapParameter);
			if(!"Y".equals(getParameter(mapParameter,"temp"))){
				mapParameter.put("temp","N");
			}
			MultipartRequest multiReq = (MultipartRequest) req;
			MultipartFile file = multiReq.getFile("fileSearch");
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			if(login_id==null){
				throw new AuthFailedException();
			}
			mapParameter.put("member_id", login_id);
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			
			boolean update = false;
			if(community!=null&&community.get("usr_id").equals(login_id)){
				if(mapParameter.get("temp").equals("N")&&(file==null||file.getSize()<=0)){
					mapParameter.put("cmmnty_map_atch_file_id", community.get("cmmnty_map_atch_file_id"));
				}
				mapParameter.put("communityMapInfo", community);
				update = true;
			}
			if(this.validation(req, file, community, mapParameter, update)){
				if(formCommunity(req, file, mapParameter, update)){
					resultData.put("cmmnty_map_id",mapParameter.get("cmmnty_map_id"));
					if("M".equals(getParameter(mapParameter,"grant_yn"))){
						HttpSession session = req.getSession(false);
						if(session != null){
							session.setAttribute("addMessage", true);
							session.setMaxInactiveInterval(60*10);//10분
						}
					}
				}else{
					throw new ApiException(StringUtil.getErrMsg());
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
		return resultData;
	}
	private boolean validation(
			HttpServletRequest request,
			MultipartFile file,
			HashMap<String,Object> communityMapInfo,
			Map<String,Object> mapParameter,
			boolean update
			){
		String cmmnty_map_nm = getParameter(mapParameter,"cmmnty_map_nm");//맵이름
		String intrcn =  getParameter(mapParameter,"intrcn");//맵소개
		String startDate =  getParameter(mapParameter,"startDate");//시작날짜
		String endDate =  getParameter(mapParameter,"endDate");//종료날짜
		String kwrd =  getParameter(mapParameter,"kwrd");//태그
		String[] stats = request.getParameterValues("stats");//통계
		String[] mydata = request.getParameterValues("mydata");//마이데이터
		String[] itemPoi = request.getParameterValues("itemPoi");//산업분류 POI
		String temp =  getParameter(mapParameter,"temp");//임시저장 여부
		String pwdyn =  getParameter(mapParameter,"pwdyn");//비밀번호 변경 유무
		String pw =  getParameter(mapParameter,"pwdchk");//비밀번호
		String[] addsido = request.getParameterValues("addsido");//추가 시도
		String[] addsgg = request.getParameterValues("addsgg");//추가 시군구
		String[] addemdong = request.getParameterValues("addemdong");//추가 읍면동
		String regexp_date = "^\\d{4}\\.(0[1-9]|1[012])\\.(0[1-9]|[12][0-9]|3[0-1])$";
		if(!StringUtils.hasText(cmmnty_map_nm)){
			throw new ApiException("맵이름은 필수 값입니다");
		}else{
			if(cmmnty_map_nm.length()>26){
				throw new ApiException("맵이름은 최대 26글자까지 작성하실 수 있습니다");
			}
		}
		if(temp==null||temp.equals("N")){
			if(file!=null&&file.getSize()>0){
				String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
				if(file.getSize() > 5242880) {
					throw new ApiException("메인 사진 제한 용량은 5MB 입니다");
				}else if(!fileExtension.matches("(?i)(jpe?g|png|gif|bmf)$")){
					throw new ApiException("허용 가능한 확장자가 아닙니다");
				}
			}else{
				if(communityMapInfo==null){
					if( getParameter(mapParameter,"fileSearchSample")!=null){
						if(! getParameter(mapParameter,"fileSearchSample").matches("(^[1-9]{1}$|^[1-9]{1}[0-2]{1}$)")){
							throw new ApiException("대표사진 샘플 이미지의 번호가 잘못되었습니다");
						}
					}else{
						throw new ApiException("대표사진은 필수 값입니다");
					}
				}else{
					if(communityMapInfo.get("cmmnty_map_atch_file_id")==null){
						if( getParameter(mapParameter,"fileSearchSample")!=null){
							if(! getParameter(mapParameter,"fileSearchSample").matches("(^[1-9]{1}$|^[1-9]{1}[0-2]{1}$)")){
								throw new ApiException("대표사진 샘플 이미지의 번호가 잘못되었습니다");
							}
						}else{
							throw new ApiException("대표사진은 필수 값입니다");
						}
					}
				}
			}
			if(StringUtils.hasText(intrcn)&&intrcn.length()>1300){
				throw new ApiException("맵소개는 최대 1300자까지 작성하실 수 있습니다");
			}
			if(addsido!=null&&addsgg!=null&&addemdong!=null){
				if(addsido.length!=addsgg.length||addsgg.length!=addemdong.length|addsido.length!=addemdong.length){
					throw new ApiException("지역의 값이 잘못 되었습니다.");
				}else{
					List<String> areaList = new ArrayList<String>();
					String sido =  getParameter(mapParameter,"sidoSelect")==null?"00": getParameter(mapParameter,"sidoSelect");
					String sgg =  getParameter(mapParameter,"sggSelect")==null?"999": getParameter(mapParameter,"sggSelect");
					String emdong =  getParameter(mapParameter,"emdongSelect")==null?"00": getParameter(mapParameter,"emdongSelect");
					areaList.add(sido+sgg+emdong);
					for(int i=0;i<addsido.length;i++){
						if(areaList.contains(addsido[i]+addsgg[i]+addemdong[i])){
							throw new ApiException("중복된 지역이 존재합니다.");
						}else{
							areaList.add(addsido[i]+addsgg[i]+addemdong[i]);
						}
					}
				}
			}
			if(!StringUtils.hasText(startDate)){
				throw new ApiException("시작날짜는 필수 값입니다");
			}else{
				if(!startDate.matches(regexp_date)){
					throw new ApiException("시작날짜 형식이 잘못되었습니다");
				}
			}
			if(!StringUtils.hasText(endDate)){
				throw new ApiException("종료날짜는 필수 값입니다");
			}else{
				if(!endDate.matches(regexp_date)){
					throw new ApiException("종료날짜 형식이 잘못되었습니다");
				}
			}
			if(StringUtils.hasText(kwrd)){
				if(kwrd.split(",").length>5){
					throw new ApiException("키워드 최대 5개까지 작성하실 수 있습니다");
				}else{
					for(String keyword:kwrd.split(",")){
						if(keyword.length()>15){
							throw new ApiException("키워드 하나당 최대 15자까지 작성하실 수 있습니다");
						}
					}
				}
			}
			if(stats!=null&&stats.length>5){
				throw new ApiException("색지도통계는 최대 5개까지 선택 가능합니다");
			}
			if(mydata!=null&&mydata.length>1){
				throw new ApiException("나의데이터는 하나만 등록하실 수 있습니다");
			}
			if(itemPoi!=null&&itemPoi.length<=0){
				throw new ApiException("테마는 최대 4개까지 선택 가능합니다");
			}
			if(!(update&&(int)communityMapInfo.get("poi_cnt")>0)){
				String[] iconSetRadioName = request.getParameterValues("iconSetRadioName");
				if(iconSetRadioName!=null){
					for(String symbolName : iconSetRadioName){
						if(symbolName==null||symbolName.length()==0){
							throw new ApiException("아이콘 라벨명을 입력하세요.");
						}
					}
				}
				if(mapParameter.get("symbol")==null){
					throw new ApiException("아이콘을 선택해주세요.");
				}else{
					if("d".equals(mapParameter.get("symbol").toString())&&iconSetRadioName.length>5){
						throw new ApiException("사용자 선택 아이콘은 최대 5개까지 등록 가능합니다.");
					}
				}
			}
			if("Y".equals(pwdyn)){
				if(StringUtils.hasText(pw)){
					BCryptPasswordEncoder pwbcrypt = new BCryptPasswordEncoder();
					mapParameter.put("pw", pwbcrypt.encode(pw));
				}else{
					throw new ApiException("비밀번호를 입력하세요.");
				}
			}else{
				mapParameter.put("pw", null);
			}
		}
		return true;
	}
	private boolean formCommunity(
			HttpServletRequest request,
			MultipartFile file,
			Map<String, Object> parameters,
			boolean update) throws Exception,IllegalArgumentException {
		ClassPathResource resource = new ClassPathResource("/globals.properties");
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String filePath = props.getProperty("Globals.Community.File.Path");
		String savePath = "upload"+File.separator+"community"+File.separator+"main";
		HashMap<String,Object> fileResult = new HashMap<String,Object>();
		if(file!=null&&file.getSize()>0){
			fileResult = FileUtils.imageUpload(filePath, savePath, file);
		}else if(request.getParameter("fileSearchSample")!=null&&request.getParameter("fileSearchSample").matches("(^[1-9]{1}$|^[1-9]{1}[0-2]{1}$)")){
			FileUtils.createFolder(filePath+savePath);
			Date today = new Date();
			SimpleDateFormat simple = new SimpleDateFormat("yyyyMM", Locale.KOREA);
			String saveSubFolder = filePath+File.separator+savePath+File.separator+simple.format(today);
			FileUtils.createFolder(saveSubFolder);			
			String newFileNm = FileUtils.getUniqueFileName(saveSubFolder,"png");
			String newfile = saveSubFolder+File.separator+newFileNm;
			FileUtils.fileCopy(
				filePath+File.separator+"img"+File.separator+"community"+File.separator+"sample"+File.separator+parameters.get("fileSearchSample")+".png",
				saveSubFolder+File.separator+newFileNm);
			FileUtils.createThumbnail(saveSubFolder, newfile, newFileNm);
			HashMap<String,Object> fileResultHashMap = new HashMap<String, Object>();
			fileResultHashMap.put("originalName","샘플 이미지");
			fileResultHashMap.put("originalFilename","샘플 이미지.png");
			fileResultHashMap.put("saveFilename",newFileNm);
			fileResultHashMap.put("extension","png");
			fileResultHashMap.put("contentType","image/png");
			fileResultHashMap.put("savePath",simple.format(today)+File.separator);
			fileResult.put("error", false);
			fileResult.put("file", fileResultHashMap);
		}else{
			fileResult.put("error", true);
		}
		parameters.put("lock_yn", "N");
		if("Y".equals(parameters.get("temp"))||parameters.get("cmmnty_map_atch_file_id")!=null||!(Boolean)fileResult.get("error")){
			if(!(Boolean)fileResult.get("error")){
				HashMap<String,Object> fileResultHashMap = (HashMap<String, Object>) fileResult.get("file");
				parameters.put("path_nm",File.separator+savePath+File.separator+fileResultHashMap.get("savePath"));
				parameters.put("file_nm",fileResultHashMap.get("originalName"));
				parameters.put("ori_file_nm",fileResultHashMap.get("originalFilename"));
				parameters.put("save_file_nm",fileResultHashMap.get("saveFilename"));
				parameters.put("file_extn",fileResultHashMap.get("extension"));
				parameters.put("file_type",fileResultHashMap.get("contentType"));
				session.insert("communityEtc.insertCmmntyImage",parameters);
			}
			boolean hasError,symbolChangePpossible = true;
			HashMap<String,Object> communityMapInfo = (HashMap<String,Object>)parameters.get("communityMapInfo");
			if(update&&(int)communityMapInfo.get("poi_cnt")>0){
				symbolChangePpossible = false;
			}
			if(symbolChangePpossible){
				if(parameters.get("symbol").toString().matches("^([a-g])$")){
					String[] iconSetRadioName = request.getParameterValues("iconSetRadioName");
					String[] iconSetRadio = request.getParameterValues("iconSetRadio");
					parameters.put("custom_symbol_group_nm", "Automatic generation");
					parameters.put("share_yn", "N");
					parameters.put("auto_create_yn", "Y");
					if(session.insert("communityCustomSymbol.insertCustomSymbolGroup",parameters)>0){
						for(int i=0;i<iconSetRadio.length;i++){
							parameters.put("label_nm",iconSetRadioName[i]);
							parameters.put("order",iconSetRadio[i]);
							session.insert("communityCustomSymbol.insertCustomSymbol",parameters);
						}
					}
				}else{
					parameters.put("custom_symbol_group_id",parameters.get("symbol").toString());
					parameters.put("symbol",null);
				}
			}else{
				parameters.put("custom_symbol_group_id",communityMapInfo.get("custom_symbol_group_id"));
				parameters.put("symbol",communityMapInfo.get("reg_symbol"));
				parameters.put("grant_yn",communityMapInfo.get("cmmnty_partcptn_grant_yn"));
			}
			if(update){
				if(parameters.get("cmmnty_map_atch_file_id")==null){
					parameters.put("cmmnty_map_atch_file_id",communityMapInfo.get("cmmnty_map_atch_file_id"));
				}
				hasError=session.update("communityMap.updateCmmnty",parameters)<=0;
			}else{
				hasError=session.insert("communityMap.insertCmmnty",parameters)<=0;
			}
			if(!hasError){
				session.delete("communityEtc.deleteCmmntyKwrd",parameters);
				session.delete("communityEtc.deleteCmmntyMapAddRegion", parameters);
				String[] addsido = request.getParameterValues("addsido");
				String[] addsgg = request.getParameterValues("addsgg");
				String[] addemdong = request.getParameterValues("addemdong");
				if(addsido!=null){
					for(int i=0;i<addsido.length;i++){
						HashMap<String,Object> region = new HashMap<String,Object>();
						region.put("cmmnty_map_id",parameters.get("cmmnty_map_id"));
						region.put("sido_cd", addsido[i]);
						region.put("sgg_cd", addsgg[i]);
						region.put("emdong_cd", addemdong[i]);
						region.put("order", i+1);
						session.insert("communityEtc.insertCmmntyMapAddRegion",region);
					}
				}
				if(parameters.get("kwrd")!=null){
					for(String item:parameters.get("kwrd").toString().split(",")){
						HashMap<String, Object> obj = new HashMap<String, Object>();
						obj.put("cmmnty_map_id", parameters.get("cmmnty_map_id"));
						obj.put("kwrd", item);
						session.insert("communityEtc.insertCmmntyKwrd",obj);
					}
				}
				session.delete("communityEtc.deleteCmmntyMapList",parameters);
				session.delete("communityEtc.deleteCmmntyMydataList",parameters);
				session.delete("communityEtc.deleteCmmntyItemList",parameters);
				String[] stats = request.getParameterValues("stats");//통계
				String[] mydata = request.getParameterValues("mydata");//마이데이터
				String[] itemPoi = request.getParameterValues("itemPoi");//산업분류 POI
				boolean insertStats = true,insertMydata=true,isertItemPoi=true;
				if("Y".equals(parameters.get("temp"))){
					if(stats==null){
						insertStats = false;
					}
					if(mydata==null){
						insertMydata = false;
					}
					if(itemPoi==null){
						isertItemPoi = false;
					}
				}
				if(insertStats&&stats!=null){
					for(String item:stats){
						HashMap<String, Object> obj = new HashMap<String, Object>();
						obj.put("cmmnty_map_id", parameters.get("cmmnty_map_id"));
						obj.put("list", item);
						obj.put("recmd_stat_yn", "N");
						session.insert("communityEtc.insertCmmntyMapList", obj);
					}
				}
				if(insertMydata){
					if(mydata!=null&&mydata.length>0){
						HashMap<String, Object> obj = new HashMap<String, Object>();
						obj.put("cmmnty_map_id", parameters.get("cmmnty_map_id"));
						obj.put("list", mydata[0]);
						session.insert("communityEtc.insertCmmntyMydataList", obj);
					}
				}
				if(isertItemPoi&&itemPoi!=null){
					for(int i=0;i<itemPoi.length;i++){
						HashMap<String, Object> obj = new HashMap<String, Object>();
						obj.put("cmmnty_map_id", parameters.get("cmmnty_map_id"));
						obj.put("item_cd", itemPoi[i]);
						session.insert("communityEtc.insertCmmntyItemList", obj);
					}
				}
			}
		}else{
			throw new ApiException("대표사진의 값이 잘못되었습니다");
		}
		return true;
	}
	private String getParameter(
			Map<String,Object> mapParameter,
			String name
			){
		return mapParameter.get(name)!=null&&StringUtils.hasText(mapParameter.get(name).toString())?mapParameter.get(name).toString():null;
	}
}
