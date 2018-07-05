package kostat.sop.ServiceAPI.controller.service.impl;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.GalleryService;
import kostat.sop.ServiceAPI.controller.service.mapper.GalleryMapper;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("galleryService")
public class GalleryServiceImpl extends EgovAbstractServiceImpl implements GalleryService{
	private static final Logger logger = LoggerFactory.getLogger(MypageServiceImpl.class);
	
	/** galleryMapper **/
	@Resource(name = "galleryMapper")
	private GalleryMapper galleryMapper;

	
	public String getExternalName(String fileName){
    	int pathPoint = fileName.lastIndexOf(".");
    	String filePoint = fileName.substring(pathPoint + 1,fileName.length());
    	String fileType = filePoint.toLowerCase();
    	
    	return fileType;
    	
    }
	/**
	 * selectGalleryList
	 * @param Map
	 * @exception Exception
	 */
	@Override
	public List selectGalleryList(Map mapParameter) {
		return galleryMapper.selectGalleryList(mapParameter);
	}
	
	/**
	 * selectGalleryListMyGallery
	 * 갤러리 목록 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryListMyGallery(Map mapParameter){
		return galleryMapper.selectGalleryListMyGallery(mapParameter);
	}
	
	/**
	 * selectGalleryListResult
	 * (일반)갤러리 목록 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	@Override
	public List selectGalleryListResult(Map mapParameter) {
		return galleryMapper.selectGalleryListResult(mapParameter);
	}
	

	/**
	 * selectGalleryListTotalCnt
	 * @param Map
	 * @exception Exception
	 */
	@Override
	public int selectGalleryListTotalCnt(Map mapParameter) {
		return galleryMapper.selectGalleryListTotalCnt(mapParameter);
	}
	/**
	 * selectMyGalleryListTotalCnt
	 * 수집 갤러리 목록 개수 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectMyGalleryListTotalCnt(Map mapParameter){
		return galleryMapper.selectMyGalleryListTotalCnt(mapParameter);
	}
	
	/**
	 * selectGalleryListTotalCntResult
	 * @param Map
	 * @exception Exception 일반 조회 총계
	 */
	public int selectGalleryListTotalCntResult(Map mapParameter){
		return galleryMapper.selectGalleryListTotalCntResult(mapParameter);
	}
	
	/**
	 * selectGallery
	 * @param Map
	 * @exception Exception
	 */
	public HashMap<String, String> selectGallery(Map mapParameter){
		return galleryMapper.selectGallery(mapParameter);
	}
	
	/**
	 * selectGalleryPollDetailList
	 * 설문조사 상세조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryPollDetailList(Map mapParameter){
		return galleryMapper.selectGalleryPollDetailList(mapParameter);
	}
	
	/**
	 * selectGalleryImgList
	 * 갤러리 이미지 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryImg(Map mapParameter){
		return galleryMapper.selectGalleryImg(mapParameter);
	}
	
	/**
	 * selectGalleryImgIconList
	 * imgIcon 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryImgIconList(Map mapParameter){
		return galleryMapper.selectGalleryImgIconList(mapParameter);
	}
	
	/**
	 * selectGalleryReplyList
	 * @param Map
	 * @exception Exception
	 */
	@Override
	public List selectGalleryReplyList(Map mapParameter) {
		return galleryMapper.selectGalleryReplyList(mapParameter);
	}
	
	/**
	 * selectGalleryReplyNextOrder
	 * 갤러리 댓글 next reply_order 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryReplyNextOrder(Map mapParameter){
		return galleryMapper.selectGalleryReplyNextOrder(mapParameter);
	}
	
	/**
	 * insertGalleryReply
	 * 갤러리 댓글 등록
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryReply(Map mapParameter){
		return galleryMapper.insertGalleryReply(mapParameter);
	}
	
	/**
	 * insertGalleryLikeInfo
	 * 갤러리 추천 등록
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryLikeInfo(Map mapParameter){
		return galleryMapper.insertGalleryLikeInfo(mapParameter);
	}
	
	/**
	 * deleteGalleryLikeInfo
	 * 갤러리 추천 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryLikeInfo(Map mapParameter){
		return galleryMapper.deleteGalleryLikeInfo(mapParameter);
	}
	
	/**
	 * deleteGalleryPollVoteInfo
	 * 설문조사 참여자 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPollVoteInfo(Map mapParameter){
		return galleryMapper.deleteGalleryPollVoteInfo(mapParameter);
	}

	/**
	 * deleteGalleryPollDetail
	 * 설문조사 문항 상세 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPollDetail(Map mapParameter){
		return galleryMapper.deleteGalleryPollDetail(mapParameter);
	}

	/**
	 * deleteGalleryPoll
	 * 설문조사 문항 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPoll(Map mapParameter){
		return galleryMapper.deleteGalleryPoll(mapParameter);
	}
	
	/**
	 * deleteGalleryImgIconList
	 * 이미지 아이콘 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgIconList(Map mapParameter){
		return galleryMapper.deleteGalleryImgIconList(mapParameter);
	}

	/**
	 * deleteGalleryImgList
	 * 통계갤러리 이미지 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgList(Map mapParameter){
		return galleryMapper.deleteGalleryImgList(mapParameter);
	}
	
	/**
	 * deleteReply
	 * 댓글 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteReply(Map mapParameter){
		return galleryMapper.deleteReply(mapParameter);
	}

	/**
	 * deleteGallery
	 * 통계 갤러리 데이터 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGallery(Map mapParameter){
		return galleryMapper.deleteGallery(mapParameter);
	}
	
	/**
	 * deleteGalleryMyGallery
	 * 통계 갤러리 마이갤러리 데이터 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryMyGallery(Map mapParameter){
		return galleryMapper.deleteGalleryMyGallery(mapParameter);
	}
	
	
	
	/**existMyGallery
	 * 갤러리 조회수 증가 
	 * @param String mapParameter
	 * @exception 
	 */
	public boolean existMyGallery(Map mapParameter){
		boolean exist = false;
		int cnt = galleryMapper.existMyGallery(mapParameter);
		if(cnt > 0){
			return exist = true;
		}
		
		return exist;
	}
	/**addMyGallery
	 * 갤러리 조회수 증가 
	 * @param String mapParameter
	 * @exception 
	 */
	public void addMyGallery(Map mapParameter){
		galleryMapper.addMyGallery(mapParameter);
	};
	
	
	/**
	 * insertGalleryPollVoteInfo
	 * 갤러리 설문조사 투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryPollVoteInfo(Map mapParameter){
		
		String ansString = mapParameter.get("ans_serial").toString();
		String[] ansList = ansString.split(",");
		for(int i = 0; i < ansList.length ; i++){
			Map map = mapParameter;
			map.put("ans_serial", ansList[i]);
			galleryMapper.insertGalleryPollVoteInfo(map);
		}
		
		return 1;
		/*return galleryMapper.insertGalleryPollVoteInfo(mapParameter);*/
	}
	
	
	/**
	 * updateGalleryPollVoteInfo
	 * 갤러리 설문조사 재투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public int updateGalleryPollVoteInfo(Map mapParameter){
		
		String ansString = mapParameter.get("ans_serial").toString();
		
		String[] ansList = ansString.split(",");
		
		galleryMapper.deleteGalleryPollVoteInfoUser(mapParameter);
		
		for(int i = 0; i < ansList.length ; i++){
			Map map = mapParameter;
			map.put("ans_serial", ansList[i]);
			galleryMapper.insertGalleryPollVoteInfo(map);
			
		}
		
		return 1;
		/*return galleryMapper.updateGalleryPollVoteInfo(mapParameter);*/
	}
	
	

    
    /**
	 * addGallery
	 * @param Map
	 * @exception Exception
	 */
	public String addGallery(Map map){
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmssS");
		Calendar date = Calendar.getInstance();
		String idDate = df.format(date.getTimeInMillis());
		String data_id = StringUtil.getRandomString(32)+ idDate;
		
		map.put("data_id", data_id);
		
		galleryMapper.addGallery(map);
		return data_id;
	}
	
	
	/**
	 * insertSurvey
	 * @param Map
	 * @exception Exception
	 */
	public int insertSurvey(String surveyData,String data_id,String surveyDuplication) {
		// TODO Auto-generated method stub
		//설문조사 문항
		//data_id
		//survey_surv_id
		//survey_title
		//survey_type
		
		//설문조사 문항 상세
		//data_id
		//survey_surv_id
		//ans_serial
		//ans_content
		JSONParser parser = new JSONParser();
		JSONArray jsonArray = null;
		
		try{
			jsonArray = (JSONArray)parser.parse(surveyData);
			for(int i =0; i < jsonArray.size();i++){
				//설문 본문
				JSONObject surveyPoll = (JSONObject) jsonArray.get(i);
				Map poll = new HashMap();
				poll.put("data_id", data_id);
				poll.put("survey_surv_id", data_id + "_" + i);
				poll.put("survey_title", surveyPoll.get("survery_title").toString());
				if(surveyDuplication.equals("true")){
					poll.put("survey_type",'2');	
				}else{
					poll.put("survey_type",'1');
				}
				
				galleryMapper.insertSurveyPoll(poll);
				//설문 항목;
				JSONArray surveyDetailArray = (JSONArray) surveyPoll.get("surveyDetail");
				for(int j = 0; j < surveyDetailArray.size(); j++){
					Map pollDetail = new HashMap();
					pollDetail.put("data_id", data_id);
					pollDetail.put("survey_surv_id", data_id + "_" + i);
					pollDetail.put("ans_serial",j);
					pollDetail.put("ans_content", surveyDetailArray.get(j).toString());
					galleryMapper.insertSurveyPollDetail(pollDetail);
				}
			}
		}catch(ParseException e){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
		return 0;
	}
	
	/**insertImage
	 * USECASE 이미지및 파일을 저장한다.
	 * @param String param,String data_id
	 * @exception 
	 */
	public void insertImage(HttpServletRequest request,String data_id){
		// 2016.12.02 시큐어코딩 삭제
		
		String param = request.getParameter("param");
		JSONParser parser = new JSONParser();	
		//활용사례일 경우
		MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest)request;
		// 2016.12.02 시큐어코딩 삭제
		List<MultipartFile> preViewImage = mRequest.getFiles("preView");
		List<MultipartFile> fileList = mRequest.getFiles("refFiles[]");
		Map map = new HashMap();
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props;
		try {
			JSONObject paramJson = (JSONObject)parser.parse(param);
			JSONArray fileNameArray = (JSONArray) paramJson.get("refFileList");
			JSONObject previewJson = (JSONObject)paramJson.get("preViewImg");
			
			props = PropertiesLoaderUtils.loadProperties(resource);
			String preView_path = props.getProperty("Globals.GalleryData.preViewFile.Path");
			String refFile_path = props.getProperty("Globals.GalleryData.refFile.Path");
			

			if(preViewImage.size() > 0){
				MultipartFile preViewImgFile = preViewImage.get(0);
				File imageFile = new File(preView_path + "/" + previewJson.get("saveFileName"));
				preViewImgFile.transferTo(imageFile);
			}
			
			
			for(int i = 0; i < fileList.size(); i++){
				JSONObject fileObject = (JSONObject)fileNameArray.get(i);
				String saveName = fileObject.get("saveName").toString();
				
				MultipartFile mpf = fileList.get(i);
				// 2016.12.02 시큐어코딩 삭제
				String extName = getExternalName(saveName);
				if(extName.equals("jsp") || extName.equals("asp") || extName.equals("php")){
					
				}else{
					File file = new File(refFile_path +"/"+saveName);
					mpf.transferTo(file);
				}
				
			}
		} catch (IllegalStateException e1) {
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e1);
		}catch (IOException e2) {
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e2);
		}catch(ParseException e3){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e3);
		}
		
		map.put("img_id", data_id + "_"+0);
		map.put("param_info", param);
		map.put("data_id", data_id);
		galleryMapper.insertGalleryImg(map);

		//통계갤러리 경우
		
	}
	
	public void insertGalleryImage(HttpServletRequest request,String data_id){
		// 2016.12.02 시큐어코딩 삭제
		//우선 각각의 이미지는 나중에
		String param = request.getParameter("param");
		String iconParam = request.getParameter("iconParam");
		// 2016.12.02 시큐어코딩 삭제
		JSONParser parser = new JSONParser();
		try {
			JSONArray paramJson = (JSONArray)parser.parse(param);
			JSONArray iconJson = (JSONArray)parser.parse(iconParam);
			for(int i = 0; i < paramJson.size();i++ ){
				JSONObject paramObject = (JSONObject)paramJson.get(i);
				Map paramMap = new HashMap();
				String img_id = data_id +"_"+i;
				paramMap.put("data_id", data_id);
				paramMap.put("img_id", img_id);
				paramMap.put("api_call_URL", paramObject.get("APIURL").toString());
				paramMap.put("param_info", paramObject.get("paramInfo").toString());
				galleryMapper.insertGalleryImg(paramMap);
				for(int j =0; j < iconJson.size(); j++){
					if ( i == j) {
						JSONArray iconArray = (JSONArray)iconJson.get(j);
						for(int k =0; k < iconArray.size();k++){
							JSONObject iconMap = (JSONObject)iconArray.get(k);
							Map map = new HashMap();
							map.put("data_id", data_id);
							map.put("img_id",img_id);
							map.put("icon_id", k);
							map.put("icon_type", iconMap.get("type").toString());
							map.put("icon_nm", iconMap.get("srcFileName").toString());
							map.put("html_src", iconMap.get("html").toString());
							if(iconMap.get("type").toString().equals("2")){
								map.put("exp", iconMap.get("exp").toString());
							}else{
								map.put("exp", "");
							}
							map.put("x_coor",iconMap.get("positionTop").toString());
							map.put("y_coor",iconMap.get("positionLeft").toString());
							// 2016.12.02 시큐어코딩 삭제
							galleryMapper.insertIconList(map);
						}
						break;
					}
				}
			}
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
	}
	
	
	/**insertUseBoardRegist
	 * USECASE 활용사례등록.
	 * @param String param,String data_id
	 * @exception 
	 */
	public void insertUseBoardRegist(HttpServletRequest request,String data_id){
		String param = request.getParameter("param");
		JSONParser parser = new JSONParser();
		//파일은 아직 미구현
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);

		
		Map map = new HashMap();
		Properties props;
		try{
			props = PropertiesLoaderUtils.loadProperties(resource);
			JSONObject paramJson = (JSONObject)parser.parse(param);
			
		}
		//2017.12.04 [개발팀] 시큐어코딩
		catch (IllegalArgumentException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		catch(Exception e){
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		
		map.put("img_id", data_id + "_"+0);
		map.put("param_info", param);
		map.put("data_id", data_id);
		galleryMapper.insertGalleryImg(map);
		
	}
	
	/**selectBookMarkListCount
	 * BookMarkList 이미지및 아이콘 리스트.
	 * @param Map map
	 * @exception 
	 */
	public int selectBookMarkListCount(Map map){
		return galleryMapper.selectBookMarkListCount(map);
	}
	/**
	 * selectBookMarkList
	 * 이미지 추가
	 * @param Map map
	 * @exception 
	 */
	public List selectBookMarkList(Map map){
		List list = galleryMapper.selectBookMarkList(map);
		return list;
	}
	
	
	/**selectGalleryAllCountList
	 * 즐겨찾기, 작성 갤러리 , 수집갤러리 개수
	 * @param String member_id
	 * @exception 
	 */
	public Map selectGalleryAllCountList(String member_id){
		Map result = new HashMap();
		result.put("member_id", member_id);
		result.put("bookmarkcount", galleryMapper.selectBookMarkListCount(result));
		result.put("writecount", galleryMapper.selectAllCountWriteCount(result));
		result.put("collectcount", galleryMapper.selectAllCountCollectCount(result));
		result.put("likecount", galleryMapper.selectAllCountLikeCount(result));
		//result.put("tempwrite", galleryMapper.selectAllTempWriteCount(result)); //2017.03.28 비공개 카운트 제거
		
		return result;
		/*return galleryMapper.selectGalleryAllCountList(member_id);*/
	};
	
	
	/**selectGalleryImgIconListAll
	 * 해당 갤러리의 모든 이이콘 리스트 가져오기
	 * @param String member_id
	 * @exception 
	 */
	public List selectGalleryImgIconListAll(Map mapParameter){
		
		List galleryList = galleryMapper.selectGalleryImg(mapParameter);
		List galleryIconList = new ArrayList();
		for(int i =0; i < galleryList.size();i++){
			Map map = (Map) galleryList.get(i);
			Map selectMap = new HashMap();
			selectMap.put("data_id", map.get("data_id").toString());
			selectMap.put("img_id", map.get("img_id").toString());
			List galleryIcon = galleryMapper.selectGalleryImgIconList(selectMap);
			galleryIconList.add(galleryIcon);
			
		}
		
		return galleryIconList;
		
	};
	
	/**
	 * @throws ParseException updateGalleryData
	 * 작성 갤러리 수정
	 * @param Map map
	 * @exception 
	 */
	public Map updateGalleryData(Map map) throws ParseException{
		//1.SRV_DT_GALLERYLIST 수정
		galleryMapper.updateGalleryList(map);
		//2.SRV_DT_GALLERYPOLL
		//3.SRV_DT_GALLERYPOLLDETAIL
		/*List oriSurvList = galleryMapper.selectGalleryPollDetailList(map);*/
		int oriSurvList = galleryMapper.selectGalleryPollDetailCount(map);
		 
		JSONParser parser = new JSONParser();
		JSONObject surveyObj = (JSONObject)parser.parse(map.get("survey").toString());
		
		
		Map pollMainMap = new HashMap();
		
		String survey_survId = "";
		if(surveyObj.containsKey("surveyId")){
			survey_survId= surveyObj.get("surveyId").toString();
			
			pollMainMap.put("survey_title",surveyObj.get("survey_title").toString());
			pollMainMap.put("data_id",map.get("data_id").toString());
			pollMainMap.put("survey_surv_id",survey_survId);
			
			if(map.get("surveyduplication").toString().equals("true")){
				pollMainMap.put("surveyduplication", 2);
			}else{
				pollMainMap.put("surveyduplication", 1);
			}
			galleryMapper.updateGalleryPoll(pollMainMap);
		}else{
			survey_survId= map.get("data_id").toString()+"_0";
			
			pollMainMap.put("survey_title",surveyObj.get("survey_title").toString());
			pollMainMap.put("data_id",map.get("data_id").toString());
			pollMainMap.put("survey_surv_id",survey_survId);
			
			if(map.get("surveyduplication").toString().equals("true")){
				pollMainMap.put("surveyduplication", 2);
			}else{
				pollMainMap.put("surveyduplication", 1);
			}
			galleryMapper.insertSurveyPoll(pollMainMap);
		}
		
		JSONArray surveyList = (JSONArray) surveyObj.get("surveyList");
		
		for(int i = 0; i < surveyList.size();i++){
			JSONObject jsonPoll = (JSONObject) surveyList.get(i);
			
			//2017.03.22 빈 object 체크 추가
			if (!jsonPoll.isEmpty()) {
				Map updatePoll = new HashMap();
				updatePoll.put("data_id", map.get("data_id").toString());
				updatePoll.put("survey_surv_id", survey_survId);
				updatePoll.put("ans_serial", i);
				//만약 지우는걸로 가면 ans_serial이 잇는건 기존거 쓰고 없으면 있는거 중에 가장 마지막에거에서 더하는걸로
				updatePoll.put("ans_content", jsonPoll.get("ans_content").toString());
				
				try {
					if(i < oriSurvList && oriSurvList > 0){
						galleryMapper.updateGalleryPollDetail(updatePoll);
					}else{
						updatePoll.put("survey_surv_id", survey_survId);
						galleryMapper.insertSurveyPollDetail(updatePoll);
					}
					
				}
				//2017.12.04 [개발팀] 시큐어코딩
				catch (IllegalArgumentException e) {
					logger.info("서버에서 처리중 에러가 발생했습니다.");
				}
				catch (Exception e) {
					// TODO Auto-generated catch block
					logger.info("서버에서 처리중 에러가 발생했습니다.");
				}
			}
		}
		
		//4.SRV_DT_GALLERYIMGLIST
		//이미지 개수 카운트 해오기
		//현재 이미지리스트의 ID 와 비교
		//현재 이미지리스트에 없는 ID는 삭제 
		JSONObject imgObj = (JSONObject)parser.parse(map.get("imgList").toString());
		JSONArray imgList = (JSONArray)imgObj.get("imgList");
		List oriImgList = galleryMapper.selectGalleryImg(map);

		if(oriImgList.size() > imgList.size()){
			int endNum = oriImgList.size() - imgList.size();
			for(int i = imgList.size(); i <oriImgList.size();i++){
				Map oriMap = (Map)oriImgList.get(i);
				galleryMapper.deleteGalleryImg(oriMap);
				galleryMapper.deleteGalleryImgIcon(oriMap);
			}
		}else if(oriImgList.size() < imgList.size()){
			int startNum = oriImgList.size();
			int endNum = imgList.size();
			
			for(int i = startNum; i < endNum; i++){
				galleryMapper.insertGalleryImg((Map)imgList.get(i));
			}
		}
		
		//맵 세팅
		JSONObject jsonIconObject = (JSONObject)parser.parse(map.get("iconList").toString());
		JSONArray iconList = (JSONArray)jsonIconObject.get("iconList");
		for(int i =0; i < imgList.size();i++){
			JSONObject imgMap = (JSONObject)parser.parse(imgList.get(i).toString());
			//imgMap.data_id 에 +_i 로 이유)키를 바꿀수 없기때문에 
			//나중에 추가 될때는 먼저 img_id로 검색 해와서 없으면 insert로 변경
			String img_id = imgMap.get("data_id").toString() + "_" + Integer.toString(i);
			imgMap.put("img_id", img_id);
			galleryMapper.updateGalleryImgList(imgMap);
			List iconArray = (List)iconList.get(i);
			Map selectMap = new HashMap();
			selectMap.put("data_id", imgMap.get("data_id").toString());
			/*selectMap.put("img_id", imgMap.get("img_id").toString());*/
			selectMap.put("img_id", img_id);
			//먼저 삭제 
			List oriIconArray = galleryMapper.selectGalleryImgIconList(selectMap);
			// 2016.12.02 시큐어코딩 삭제
			//삭제 끝
			if(oriIconArray.size() > iconArray.size()){
				int endNum = oriIconArray.size() - iconArray.size();
				for(int j = iconArray.size(); j < oriIconArray.size();j ++){
					Map delIconMap = (Map)oriIconArray.get(j);
					galleryMapper.deleteGalleryImgIconOri(delIconMap);
				}
			}
			
			for(int j = 0; j < iconArray.size();j++){
				JSONObject icon = (JSONObject)iconArray.get(j);
				Map iconMap = new HashMap();
				iconMap.put("data_id", map.get("data_id").toString());
				iconMap.put("img_id", imgMap.get("img_id").toString());
				iconMap.put("icon_id", j);
				iconMap.put("icon_type", icon.get("icon_type").toString());
				if(icon.get("icon_type").toString().equals("2")){
					iconMap.put("exp", icon.get("exp").toString());
				}else{
					iconMap.put("exp", "");
				}
				iconMap.put("x_coor", icon.get("x_coor").toString());
				iconMap.put("y_coor", icon.get("y_coor").toString());
				iconMap.put("icon_nm", icon.get("icon_nm").toString());
				iconMap.put("html_src", icon.get("html_src").toString());
				
				if(j < oriIconArray.size()){
					galleryMapper.updateGalleryImgIconList(iconMap);
				}else{
					galleryMapper.insertIconList(iconMap);
				}
			}
		}
		
		
		return null;
		
	}
	
	/**useCaseUpdate
	 * 활용사례 수정 이거좀 나눠서 했어야 했는데 ;;
	 * @param HttpServletRequest req,String usr_id
	 * @exception 
	 */
	public void useCaseUpdate(HttpServletRequest req,String usr_id)throws ParseException{
		
		MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest)req;
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props;
		String preView_path = null;
		String refFile_path = null;
		try {
			props = PropertiesLoaderUtils.loadProperties(resource);
			 /*file_path = props.getProperty("Globals.GalleryData.File.Path");*/
			  preView_path = props.getProperty("Globals.GalleryData.preViewFile.Path");
			  refFile_path = props.getProperty("Globals.GalleryData.refFile.Path");
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e1);
		}
		
		
		
		JSONParser parser = new JSONParser();
		String data_id = req.getParameter("data_id");
		String img_id = req.getParameter("img_id");
		String survey_surv_id = req.getParameter("survey_surv_id");
		
		Map selectMap = new HashMap();
		selectMap.put("data_id", data_id);
		selectMap.put("img_id", img_id);
		selectMap.put("member_id", usr_id);
		selectMap.put("survey_surv_id", survey_surv_id);
		
		Map map = new HashMap();
		map.put("usr_id", usr_id);
		map.put("title", req.getParameter("title"));
		map.put("content", req.getParameter("content"));
		map.put("tag", req.getParameter("tag"));
		map.put("srv_type", req.getParameter("srv_type"));
		map.put("survey_surv_start_dt", req.getParameter("survey_surv_start_dt"));
		map.put("survey_surv_end_dt", req.getParameter("survey_surv_end_dt"));
		map.put("data_id",data_id);
		
		
		
		
		
		//메인 업데이트
		galleryMapper.updateGalleryList(map);
		//이미지 업데이트
		String param = req.getParameter("param");
		JSONObject paramJson = (JSONObject)parser.parse(param);
		
		String bChangeImg = req.getParameter("bChangeImg");
		boolean bChange = false;
		if(bChangeImg.equals("true")){
			bChange = true;
		}
		
		//기존 이미지 테이블에서 자료 가져오기
		List imgList = galleryMapper.selectGalleryImg(selectMap);
		//활용사례의 경우 이미지는 반드시 하나씩
		Map galleryImgMap = (Map) imgList.get(0);
		JSONObject paramInfo = (JSONObject) parser.parse(galleryImgMap.get("param_info").toString());

		List refList = (List) paramInfo.get("refFileList");
		//기존 참고자료에서 있던 파일이 지워진게 있는지 검사
		String oriRefFileList = req.getParameter("oriRefFileList");
		JSONArray oriRefArray = (JSONArray) parser.parse(oriRefFileList);
		JSONArray saveRefArray = new JSONArray();
		if(refList.size() > oriRefArray.size()){
			//지워진 파일이 있으니 직접 삭제 로직 실행
			//뭐가 지워졌는지 확인 
			//saveFileName 으로 비교
			for(int i = 0; i <refList.size(); i++){
				boolean bExistFile = false;
				Map refMap = (Map) refList.get(i);
				//2017.03.01최재영 수정
				String refFileName = refMap.get("saveName").toString();
				for(int j =0; j < oriRefArray.size();j++){
					Map oriRefMap = (Map) oriRefArray.get(j);
					//2017.03.01최재영 수정
					String oriRefFileName = oriRefMap.get("saveName").toString();
					if(refFileName.equals(oriRefFileName)){
						bExistFile = true;
					}
					
				}
				if(bExistFile == false){
					//없으니까 파일 삭제 실행
					//saveFileName
				}else{
					//refFile 파라미터에 살아남은 파라미터 saveRefArray추가
					//paramJson
					saveRefArray.add((JSONObject)parser.parse(refMap.toString()));
				}
			}
		}else{
			saveRefArray.addAll(oriRefArray);
		}
		
		//저장할 파라미터 생성
		JSONArray refFileList = (JSONArray)paramJson.get("refFileList");
		saveRefArray.addAll(refFileList);

		paramJson.put("refFileList", saveRefArray);
		
		//추가된 파일 있을경우 추가
		List<MultipartFile> fileList = mRequest.getFiles("refFiles[]");
		try{
			JSONArray fileNameArray = (JSONArray) paramJson.get("refFileList");
			
			for(int i = 0; i < fileList.size(); i++){
				//mng_s 20170720_김대보(참고자료 수정 오류 처리)
				JSONObject fileObject = (JSONObject)fileNameArray.get(i+oriRefArray.size());
				//mng_e 20170720_김대보(참고자료 수정 오류 처리)
				String saveName = fileObject.get("saveName").toString();
				
				String extName = getExternalName(saveName);
				if(extName.equals("jsp") || extName.equals("asp") || extName.equals("php")){
					
				}else{
					MultipartFile mpf = fileList.get(i);
					File file = new File(refFile_path +"/"+saveName);
					mpf.transferTo(file);
				}
				
			}
			
		}catch(IOException e1){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e1);
		}catch (RuntimeException e2) {
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e2);
		}
		
		
		//미리보기가 바뀌었는지 테스트 
		if(bChange == true){
			Map preViewMap = (Map)paramInfo.get("preViewImg");
			String realFilePreView = preViewMap.get("saveFileName").toString();
			//삭제로직 구동
			
			//삭제로직 구동 끝
			
			//새 이미지 저장
			List<MultipartFile> preViewImage = mRequest.getFiles("preView");
			JSONObject previewJson = (JSONObject)paramJson.get("preViewImg");
			if(preViewImage.size() > 0){
				MultipartFile preViewImgFile = preViewImage.get(0);
				File imageFile = new File(preView_path + "/" + previewJson.get("saveFileName"));
				try {
					preViewImgFile.transferTo(imageFile);
				} catch (IllegalStateException e) {
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				} catch (IOException e) {
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				}
			}
			
		}else{
			//화면에서 미리 처리 했기때문에 그냥 진행
		}
		
		
		
		
		Map imgMap = new HashMap();
		imgMap.put("data_id", data_id);
		imgMap.put("img_id", img_id);
		imgMap.put("param_info", paramJson.toString());
		imgMap.put("api_call_URL", "");
		galleryMapper.updateGalleryImgList(imgMap);
		//설문조사 업데이트
		
		String survString = req.getParameter("surveyData");
		
		JSONArray survAr = (JSONArray)parser.parse(survString);
		JSONObject survJson = (JSONObject)survAr.get(0);
		List survDetailArray = (List)survJson.get("surveyDetail");
		
		Map surveyMap = new HashMap();
		surveyMap.put("data_id", data_id);
		surveyMap.put("survey_surv_id", survey_surv_id);
		//2017.03.01최재영 수정
		if(survJson.containsKey("survery_title")){
			surveyMap.put("survey_title", survJson.get("survery_title").toString());
		}
		//2017.03.01최재영 수정
		if(survJson.containsKey("survey_type")){
			surveyMap.put("survey_type", survJson.get("survey_type").toString());
		}
		
		//기존 설문조사가 없으면 insertSurveyPoll
		int galleryEx = galleryMapper.selectGalleryPoll(surveyMap);
		if(galleryEx == 0){
			//2017.03.01최재영 수정
			//기존설문조사가 없고 현재 설문조사는 있을경우
			if(survJson.containsKey("survery_title")){
				survey_surv_id = data_id+"_0";
				surveyMap.put("survey_surv_id", survey_surv_id);
				galleryMapper.insertSurveyPoll(surveyMap);
			}
			
		}else{
			galleryMapper.updateGalleryPoll(surveyMap);
		}
		
		int oriSurvList = galleryMapper.selectGalleryPollDetailCount(selectMap);
		for(int i = 0; i< survDetailArray.size();i++){
			String ans_content = survDetailArray.get(i).toString();
			Map pollDetail = new HashMap();
			pollDetail.put("data_id",data_id);
			pollDetail.put("survey_surv_id",survey_surv_id);
			pollDetail.put("ans_serial", i);
			pollDetail.put("ans_content",ans_content);
			try {
				if(i < oriSurvList && oriSurvList > 0){
					galleryMapper.updateGalleryPollDetail(pollDetail);
				}else{
					galleryMapper.insertSurveyPollDetail(pollDetail);
				}
				
			} 
			//2017.12.04 [개발팀] 시큐어코딩
			catch (IllegalArgumentException e) {
				logger.info("서버에서 처리중 에러가 발생했습니다.");
			}
			catch (Exception e) {
				logger.info("서버에서 처리중 에러가 발생했습니다.");
			}
		}
	}
	
	
	/**urlMakeBase64
	 * 통계갤러리 화면 캡쳐를 위해 받아온 url을 Base64로 인코딩 
	 * @param HttpServletRequest req,String usr_id
	 * @exception 
	 */
	public String urlMakeBase64(HttpServletRequest req) throws IOException{
		// 2016.12.02 시큐어코딩 삭제
		String data = req.getParameter("data");
		String fileName = req.getParameter("fileName");
		URL url=null;
		String str = null;
		
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props;
		String file_path = null;
		StringBuffer sb;
		BufferedReader br = null;
		FileOutputStream fos = null;
		try {
			
			props = PropertiesLoaderUtils.loadProperties(resource);
			file_path = props.getProperty("Globals.GalleryData.galleryViewFile.Path");
			 
			/*url = new URL(makeUrl);
			HttpURLConnection conn = (HttpURLConnection)url.openConnection();
			conn.setDoInput(true);
			conn.setDoOutput(true);
			conn.setUseCaches(false);
			conn.setReadTimeout(20000000);
			conn.setRequestMethod("POST");
			
			
			sb = new StringBuffer();
			br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			str = br.readLine();*/
			
			byte[] decode = new sun.misc.BASE64Decoder().decodeBuffer(data);

			//파일로출력
			File target = new File(file_path + "/" +fileName+".png");
			fos = new FileOutputStream(target);
			fos.write(decode);
			fos.flush();
			
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}finally{
			if(fos != null){
				fos.close();
			}
			if(br != null){
				br.close();
			}
		}
		
		return str;
	};
	
	
	/**deleteGalleryHist
	 * 캡쳐된 통계갤러리 ID와 사진을 삭제 
	 * @param String hist_id
	 * @exception 
	 */
	public void deleteGalleryHist(String hist_id,String member_id){
		//db에서 지우고
		Map map = new HashMap();
		map.put("hist_id", hist_id);
		map.put("member_id", member_id);
		map.put("hist_type", "gcap");
		galleryMapper.deleteGalleryHist(map);
		//file에서 지우기
		
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props;
		String file_path = null;
		
		try{
			props = PropertiesLoaderUtils.loadProperties(resource);
			file_path = props.getProperty("Globals.GalleryData.galleryViewFile.Path");
			String fileName = file_path+"/"+hist_id + ".png";
			
			File deleteFile = new File(fileName);
			
			if(deleteFile.exists()){
				deleteFile.delete();
			}
			
		}catch(IOException e){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
	}
	
	/**updateGalleryHit
	 * 갤러리 조회수 증가 
	 * @param String data_id
	 * @exception 
	 */
	public void updateGalleryHit(String data_id){
		galleryMapper.updateGalleryHit(data_id);
	}
	
	/**deleteGalleryReply
	 * 갤러리 댓글 삭제 
	 * @param Map mapParameter
	 * @exception 
	 */
	public void deleteGalleryReply(Map mapParameter){
		galleryMapper.deleteGalleryReply(mapParameter);
	}
	/**getMemberMn
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public String getMemberNm(Map mapParameter){
		String memberNm = galleryMapper.getMemberNm(mapParameter);
		return memberNm;
	}
	
	/**updateReply
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public void updateReply(Map mapParameter){
		galleryMapper.updateReply(mapParameter);
	}
	
	/**selectBookMarkData
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public Map selectBookMarkData(Map mapParameter){
		return galleryMapper.selectBookMarkData(mapParameter);
	}
	
	/**updateReqCensusData
	 * 자료신청 수정 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public void updateReqCensusData(Map mapParameter){
		/*return galleryMapper.updateGalleryList(map);*/
		galleryMapper.updateGalleryList(mapParameter);
		galleryMapper.updateGalleryImgList(mapParameter);
	}
}
