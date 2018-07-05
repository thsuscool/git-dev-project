package kostat.sop.ServiceAPI.common.util;


import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;

public class StatUtil {
    /**
     * 빈 문자열 <code>""</code>.
     */
    public static final String EMPTY = "";

    /**
     * 
     * @param basenum
     * @param highnum
     * @return
     */
    public static String getPercent(int basenum, int highnum){
    	String strRet = String.format("%.1f", ((float)basenum/highnum) * 100);

    	return strRet.equals("NaN")?"0.0":strRet;
    }

    public static int getPercentByInt(int basenum, int highnum){
    	String strRet = String.format("%.0f", ((float)basenum/highnum) * 100);
    	//Integer.parseInt(String.format("%.1f", ((float)basenum/highnum) * 100));
    	return strRet.equals("NaN")?0:Integer.parseInt(strRet);
    }
    
    /**
     * 
     * @param baseFieldNM
     * @param adm_length
     * @param mapStatCount
     */
    public static void setPercent(String baseFieldNM, int adm_length, Map<String, Object> mapStatCount){
    	//Map <String, Object> mapTemp = new HashMap();
    	String strBaseCntNM = "";
    	
    	if(adm_length == 0){
    		// 전국은 비교 대상이 없음
    		strBaseCntNM = "hhh_cnt";
    	}else if(adm_length == 2){
    		mapStatCount.put("bottom", (String)getPercent((int)mapStatCount.get("hh_cnt"), (int)mapStatCount.get("hhh_cnt")));
    		strBaseCntNM = "hh_cnt";
    	}else if(adm_length == 5){
    		mapStatCount.put("middle", getPercent((int)mapStatCount.get("hh_cnt"), (int)mapStatCount.get("hhh_cnt")));
    		mapStatCount.put("bottom", getPercent((int)mapStatCount.get("h_cnt"), (int)mapStatCount.get("hh_cnt")));
    		strBaseCntNM = "h_cnt";
    	}else if(adm_length == 7){
    		mapStatCount.put("top", getPercent((int)mapStatCount.get("hh_cnt"), (int)mapStatCount.get("hhh_cnt")));
    		mapStatCount.put("middle", getPercent((int)mapStatCount.get("h_cnt"), (int)mapStatCount.get("hh_cnt")));
    		mapStatCount.put("bottom", getPercent((int)mapStatCount.get("base_cnt"), (int)mapStatCount.get("h_cnt")));
    		strBaseCntNM = "base_cnt";
    	}
    		
    	mapStatCount.put(baseFieldNM, mapStatCount.get(strBaseCntNM));
    	
    	mapStatCount.remove("hhh_cnt");
    	mapStatCount.remove("hh_cnt");
    	mapStatCount.remove("h_cnt");
    	mapStatCount.remove("base_cnt");
    	
    }

    /**
     * 다중 결과의 차트 통계를 위한 메소드
     * @param baseFieldNM 처리 기준이 되는 필드
     * @param adm_length 동코드 길이
     * @param mapStatCount DB에서 조회한 카운트 결과 Map<String, Object>
     */
    public static void setPercentByNM(String baseFieldNM, int adm_length, Map<String, Object> mapadmnm, Map<String, Object> mapStatCount){
    	//Map <String, Object> mapTemp = new HashMap();
    	String strBaseCntNM = "";
    	Map mapTemp = new HashMap();
    	
    	// 전국대상 비교
    	if(adm_length == 0){
    		// 전국은 비교 대상이 없음
    		strBaseCntNM = baseFieldNM+"_hhh_cnt";
    		mapTemp.put("base_cnt", getIntegerValue(mapStatCount.get(strBaseCntNM)));
    	// 시도를 기준으로 한 경우. 전국과 시도만 비교되어 나온다
    	}else if(adm_length == 2){
    		mapTemp.put("bottom", getPercent(getIntegerValue(mapStatCount.get(baseFieldNM+"_hh_cnt")), getIntegerValue(mapStatCount.get(baseFieldNM+"_hhh_cnt"))));
    		strBaseCntNM = baseFieldNM+"_hh_cnt";
    		mapTemp.put("base_cnt", getIntegerValue(mapStatCount.get(strBaseCntNM)));
    	// 시군구를 기준으로 한 경우. 전국과 시도, 시도와 시군구를 비교한다
    	}else if(adm_length == 5){
    		
    		mapTemp.put("middle", getPercent(getIntegerValue(mapStatCount.get(baseFieldNM+"_hh_cnt")), getIntegerValue(mapStatCount.get(baseFieldNM+"_hhh_cnt"))));
    		mapTemp.put("bottom", getPercent(getIntegerValue(mapStatCount.get(baseFieldNM+"_h_cnt")), getIntegerValue(mapStatCount.get(baseFieldNM+"_hh_cnt"))));
    		strBaseCntNM = baseFieldNM+"_h_cnt";
    		mapTemp.put("base_cnt", getIntegerValue(mapStatCount.get(strBaseCntNM)));
    	// 읍면동을 기준으로 한 경우. 전국과 시도, 시도와 시군구, 읍면동과 시군구를 비교한다
    	}else if(adm_length == 7){
    		mapTemp.put("top", getPercent(getIntegerValue(mapStatCount.get(baseFieldNM+"_hh_cnt")), getIntegerValue(mapStatCount.get(baseFieldNM+"_hhh_cnt"))));
    		mapTemp.put("middle", getPercent(getIntegerValue(mapStatCount.get(baseFieldNM+"_h_cnt")), getIntegerValue(mapStatCount.get(baseFieldNM+"_hh_cnt"))));
    		mapTemp.put("bottom", getPercent(getIntegerValue(mapStatCount.get(baseFieldNM+"_base_cnt")), getIntegerValue(mapStatCount.get(baseFieldNM+"_h_cnt"))));
    		strBaseCntNM = baseFieldNM+"_base_cnt";
    		mapTemp.put("base_cnt", getIntegerValue(mapStatCount.get(strBaseCntNM)));
    	}
    	
    	Map mapNmTemp = new HashMap();
    	mapNmTemp.put("adm_length", adm_length);
    	setAdmNM(mapadmnm, mapNmTemp, mapTemp);
    	//mapStatCount.put(baseFieldNM, getIntegerValue(mapStatCount.get(strBaseCntNM)));
    	mapStatCount.put(baseFieldNM, mapTemp);
    	
    	// 계산이 완료된 필요없는 데이터는 삭제한다. 
    	mapStatCount.remove(baseFieldNM+"_hhh_cnt");
    	mapStatCount.remove(baseFieldNM+"_hh_cnt");
    	mapStatCount.remove(baseFieldNM+"_h_cnt");
    	mapStatCount.remove(baseFieldNM+"_base_cnt");
    	
    }
    
    /**
     * Object형을 int형으로 변환
     * @param obj
     * @return
     */
    public static int getIntegerValue(Object obj){
    	
    	return Integer.parseInt(String.valueOf(obj));
    }
    
	public static void setHighAdmLength(Map<String, String> mapParameter, String strAdmLength ){
		String strTmpAdmLength = "7";
		
		if(strAdmLength.equals("13")){
			strTmpAdmLength = "7";
		}else if(strAdmLength.equals("7")){
			strTmpAdmLength = "5";
		}else if(strAdmLength.equals("5")){
			strTmpAdmLength = "2";
		// 동코드가 2자리일 경우
		
		}else if(strAdmLength.equals("2")){
			strTmpAdmLength = "0";
		}else{
			// 
		}
			
		mapParameter.put("adm_length", strTmpAdmLength);
	}
    
	/**
	 * 
	 * @param admnm
	 * @param mappram
	 * @param resultmap
	 */
	public static void setAdmNM(Map admnm, Map mappram, Map resultmap){
		int admlength = getIntegerValue(mappram.get("adm_length"));
		
		if(admnm == null) return;
		
		if(admlength == 2){
			resultmap.put("bottom_nm", admnm.get("sido_nm"));
		}
		if(admlength == 5){
			resultmap.put("bottom_nm", admnm.get("sgg_nm"));
			resultmap.put("middle_nm", admnm.get("sido_nm"));
		}
		if(admlength == 7){
			resultmap.put("bottom_nm", admnm.get("emdong_nm"));
			resultmap.put("middle_nm", admnm.get("sgg_nm"));
			resultmap.put("top_nm", admnm.get("sido_nm"));
		}
	}

    enum StaticLevel{
    	hhh_cnt,
    	hh_cnt,
    	h_cnt,
    	base_cnt
    }
}