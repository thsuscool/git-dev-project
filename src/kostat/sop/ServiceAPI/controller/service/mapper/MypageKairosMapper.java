package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : MyPageKairos.java
 * @Description : MyPageKairos DAO Class
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
@Repository("mypageKairosMapper")
public class MypageKairosMapper extends EgovAbstractMapper{

	//시도 : SRV_PG_SIDOBORD
	//시군구:SRV_PG_SGGBORD
	//읍면동:SRV_PG_ADMBORD
	//집계구:SRV_PG_TOTREGBORD
	
	public Map selectSIDOGEO(String adm_cd){
		
		// 2016.12.02 시큐어코딩 삭제
		Map retMap = selectOne("mypageKairos.selectSIDOGEO",adm_cd.substring(0, 2));
		return retMap;
	}
	
	public Map selectSGGBORD(String adm_cd){
		
		Map paramMap = new HashMap();
		paramMap.put("sido_cd", adm_cd.substring(0, 2));
		paramMap.put("sgg_cd",adm_cd.substring(2, 5));
		Map retMap = selectOne("mypageKairos.selectSGGBORD",paramMap);
		
		return retMap;
	}
	public Map selectADMBORD(String adm_cd){
		
		Map paramMap = new HashMap();
		paramMap.put("sido_cd", adm_cd.substring(0, 2));
		paramMap.put("sgg_cd", adm_cd.substring(2, 5));
		paramMap.put("emdong_cd", adm_cd.substring(5, 7));
		Map retMap = selectOne("mypageKairos.selectADMBORD",paramMap);
		return retMap;
	}
	public Map selectTOTREGBORD(String tot_reg_cd){
		Map paramMap = new HashMap();
		paramMap.put("sido_cd", tot_reg_cd.substring(0, 2));
		paramMap.put("sgg_cd", tot_reg_cd.substring(2, 5));
		paramMap.put("emdong_cd", tot_reg_cd.substring(5, 7));
		Map retMap = selectOne("mypageKairos.selectADMBORD",paramMap);
		return retMap;
	}
	
}
