package kostat.sop.ServiceAPI.api.common;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.common.security.Security;

/**
 * 1. 기능 : API 호출 로그 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2015/08/04  초기 작성
 *     작성자 : 이경현, 2.0, 2016/04/15	 파일로 저장되는 apiLog를 DB에 쌓이도록 변경  
 *     작성자 : 이경현, 2.1, 2016/04/16	 대화형 통계지도 검색조건 DB저장  
 *     작성자 : 이경현, 2.2, 2016/04/17	 살고싶은 우리동네 지역선택 및 검색조건 DB저장  
 *     작성자 : 이경현, 2.2, 2016/05/03	 생활업종통계지도  인기검색업종 DB추출 저장
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class APILogWrite extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(APILogWrite.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "1005";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.ALL;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		type, api_id, title, parameter, zoomLevel, adm_nm
	}
	
	enum OptionParam
	{	
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			String type = (String) mapParameter.get("type");		//맵 구분(대화형통계지도, 창업통계맵, 통계주제도)
			String api_id = (String) mapParameter.get("api_id");		//조회 구분값
			String title = (String) mapParameter.get("title");			//제목
			String parameter = (String) mapParameter.get("parameter");			//파라미터
			String zoomLevel = (String) mapParameter.get("zoomLevel");			//줌레벨
			String adm_nm = (String) mapParameter.get("adm_nm");			//지역정보
			String member_id = (String) httpSession.getAttribute("member_id");		//로그인 ID
			String addressIP = (String)req.getRemoteAddr();
			
			//sql indjection
			type = Security.sqlInjectionCheck(type);
			api_id = Security.sqlInjectionCheck(api_id);
			title = Security.sqlInjectionCheck(title);
			parameter = Security.sqlInjectionCheck(parameter);
			zoomLevel = Security.sqlInjectionCheck(zoomLevel);
			adm_nm = Security.sqlInjectionCheck(adm_nm);
			
			if(title == null || title.equals("undefined")) { title = "null"; }
			if(parameter == null || parameter.equals("undefined")) { parameter = "null"; }
			if(zoomLevel == null || zoomLevel.equals("undefined")) { zoomLevel = "null"; }
			if(adm_nm == null || adm_nm.equals("undefined")) { adm_nm = "null"; }
			if(member_id == null || member_id.equals("undefined")) { member_id = "null"; }
			
			StringBuffer logSb = new StringBuffer();
			logSb.append(";"+type);
			logSb.append(";"+api_id);
			logSb.append(";"+title);
			logSb.append(";"+parameter);
			logSb.append(";"+zoomLevel);
			logSb.append(";"+adm_nm);
			logSb.append(";"+member_id);
			logSb.append(";0");
			logSb.append(";"+addressIP);
			
//			System.out.println("############"+logSb);
			
			mapParameter.put("member_id", member_id);
			mapParameter.put("addressIP", addressIP);
			
			session.insert("common.apiLogWrite", mapParameter);
			
			
			if("A0".equals(type)){			//대화형 통계지도 검색조건 추출
				session.insert("common.regpopsearcondi", mapParameter);
			}else if("J0".equals(type)){		//살고싶은 우리동네 조건 추출
				String jogun = mapParameter.get("title").toString();
				String jogun2 = mapParameter.get("adm_nm").toString();
				String[] strArr = jogun.split(",");
				String[] strArr2 = jogun2.split(",");
				
				strArr = sortingArr(strArr);				//추천지역찾기의 인기지표조합 등록시 sorting 필요
				
				
				jogun = "";
				Map mapParam = new HashMap();
				for(int i=0; i<strArr.length; i++){
					

					
					mapParam.put("condition", strArr[i]);
					mapParam.put("type", api_id);
					
					
					
					session.insert("common.houseAnalcondi", mapParam);
					
					if("".equals(jogun)){
						jogun = strArr[i];
					}else{
						jogun = jogun + ", " + strArr[i]; 
					}
					
				}
				//추천지역찾기일때 복합값 저장 (인기지표조합)
				if("J02".equals(api_id)){
					
					//condition_mix
					mapParam.put("condition_mix", jogun);
					mapParam.put("type", api_id);
					session.insert("common.houseAnalcondiMix", mapParam);
				}
				
				for(int i = 0; i<strArr2.length; i++){
					mapParam.put("adm_nm", strArr2[i].trim());
					session.insert("common.interestArea", mapParam);
				}
				
				
			}else if("C0".equals(type)){		//통계주제도 인기 조건 추출
				String jogun = mapParameter.get("title").toString();
				if(jogun != null){
					Map mapParam = new HashMap();
					mapParam.put("condition", jogun.split("\\^")[0]);
					session.insert("common.themaCondi", mapParam);
				}
			}else if("B0".equals(type)){		//통계주제도 인기 조건 추출
				String parameterVal = mapParameter.get("parameter").toString();
				if(parameterVal != null){
					if(api_id != null){
						if("B29".equals(api_id) || "B30".equals(api_id) || "B31".equals(api_id) || "B34".equals(api_id)){
							String[] strArr = parameterVal.split("&");
							
							for(int i=0; i<strArr.length; i++){
								if("theme_cd".equals(strArr[i].substring(0, 8))){
									String theme_cd = strArr[i].substring(9, 13);
									mapParameter.put("theme_cd", theme_cd);
									
									session.insert("common.popSearchTheme", mapParameter);
								}
							}
						}
					}
				}
			}
			
			logger.info(logSb);
			
		} catch (AbsAPIException e) {
			throw e;
		} catch (IllegalArgumentException e) {
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			throw new ApiException(StringUtil.getErrMsg());
		}
		return resultData;
	}
	
	
	public String[] sortingArr(String[] param){
		/*
		 * 자연
		 * 1				:				대기오염도
		 * 2				:				생활날씨
		 * 3				:				녹지비율
		 * 주택
		 * 4				:				공동주택비율
		 * 5				:				주거면적
		 * 6				:				노후주택비율
		 * 7				:				자가점유비율
		 * 8				:				면적당아파트가격
		 * 지역 인구
		 * 9				:				청장년인구비율	
		 * 10				:				혈연가구 비율
		 * 11				:				사업체종사자비율
		 * 12				:				순유입인구비율
		 * 	안전
		 * 13				:				화재안전
		 * 14				:				교통사고안전
		 * 생활 편의 교통
		 * 15				:				편의시설수
		 * 16				:				쇼핑시설수
		 * 17				:				외식시설수
		 * 18				:				대중교통이용률
		 * 19				:				대중교통접근성
		 * 교육 
		 * 20				:				교원1인당학생수
		 * 21				:				고등교육기관수
		 * 22				:				학원수
		 * 복지문화 
		 * 23				:				유치원 및 보육시설
		 * 24				:				병의원및약국
		 * 25				:				노인복지시설
		 * 26				:				사회복지시설
		 * 27				:				문화체육시설수
		 * 
		 */
		int sortArr[] = new int[param.length];

		for(int i=0; i<param.length; i++){
			if("대기오염도".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 1;
			}else if("생활날씨".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 2;
			}else if("녹지비율".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 3;
			}else if("공동주택비율".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 4;
			}else if("주거면적".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 5;
			}else if("노후주택비율".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 6;
			}else if("자가점유비율".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 7;
			}else if("면적당아파트가격".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 8;
			}else if("청장년인구비율".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 9;
			}else if("혈연가구비율".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 10;
			}else if("사업체종사자비율".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 11;
			}else if("순유입인구비율".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 12;
			}else if("화재안전".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 13;
			}else if("교통사고안전".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 14;
			}else if("편의시설수".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 15;
			}else if("쇼핑시설수".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 16;
			}else if("외식시설수".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 17;
			}else if("대중교통이용률".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 18;
			}else if("대중교통접근성".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 19;
			}else if("교원1인당학생수".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 20;
			}else if("고등교육기관수".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 21;
			}else if("학원수".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 22;
			}else if("유치원및보육시설".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 23;
			}else if("병의원및약국".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 24;
			}else if("노인복지시설".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 25;
			}else if("사회복지시설".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 26;
			}else if("문화체육시설수".equals(param[i].replaceAll(" ", ""))){
				sortArr[i] = 27;
			}
		}
		
		//sortArr2 = sortArr;
		
		
		for(int i=0; i<sortArr.length; i++){
			for(int j=0; j<=i; j++){
				if(sortArr[i] < sortArr[j]){
					int bigyoVal = sortArr[i];
					sortArr[i] = sortArr[j];
					sortArr[j] = bigyoVal;
				}
				
			}
		}
		
		for(int i=0; i<sortArr.length; i++){
			if(sortArr[i] == 1){
				param[i] = "대기오염도";
			}else if(sortArr[i] == 2){
				param[i] = "생활날씨";
			}else if(sortArr[i] == 3){
				param[i] = "녹지비율";
			}else if(sortArr[i] == 4){
				param[i] = "공동주택비율";
			}else if(sortArr[i] == 5){
				param[i] = "주거면적";
			}else if(sortArr[i] == 6){
				param[i] = "노후주택비율";
			}else if(sortArr[i] == 7){
				param[i] = "자가점검비율";
			}else if(sortArr[i] == 8){
				param[i] = "면적당아파트가격";
			}else if(sortArr[i] == 9){
				param[i] = "청장년인구비율";
			}else if(sortArr[i] == 10){
				param[i] = "혈연가구비율";
			}else if(sortArr[i] == 11){
				param[i] = "사업체종사자비율";
			}else if(sortArr[i] == 12){
				param[i] = "순유입인구비율";
			}else if(sortArr[i] == 13){
				param[i] = "화재안전";
			}else if(sortArr[i] == 14){
				param[i] = "교통사고안전";
			}else if(sortArr[i] == 15){
				param[i] = "편의시설수";
			}else if(sortArr[i] == 16){
				param[i] = "쇼핑시설수";
			}else if(sortArr[i] == 17){
				param[i] = "외식시설수";
			}else if(sortArr[i] == 18){
				param[i] = "대중교통이용률";
			}else if(sortArr[i] == 19){
				param[i] = "대중교통접근성";
			}else if(sortArr[i] == 20){
				param[i] = "교원1인당학생수";
			}else if(sortArr[i] == 21){
				param[i] = "고등교육기관수";
			}else if(sortArr[i] == 22){
				param[i] = "학원수";
			}else if(sortArr[i] == 23){
				param[i] = "유치원및보육시설";
			}else if(sortArr[i] == 24){
				param[i] = "병의원및약국";
			}else if(sortArr[i] == 25){
				param[i] = "노인복지시설";
			}else if(sortArr[i] == 26){
				param[i] = "사회복지시설";
			}else if(sortArr[i] == 27){
				param[i] = "문화체육시설수";
			}
		}
		
		return param;
	}
}