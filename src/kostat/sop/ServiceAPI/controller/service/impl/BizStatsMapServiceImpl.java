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

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.controller.service.BizStatsMapService;
import kostat.sop.ServiceAPI.controller.service.mapper.BizStatsMapMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : BizStatsMapServiceImpl.java
 * @Description : BizStatsMapServiceImpl Implement Class
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

@Service("bizStatsMapService")
public class BizStatsMapServiceImpl extends EgovAbstractServiceImpl implements BizStatsMapService {

	private static final Logger LOGGER = LoggerFactory.getLogger(BizStatsMapServiceImpl.class);

	/** BizStatsMapDAO */
	@Resource(name="bizStatsMapMapper")
	private BizStatsMapMapper bizStatsMapMapper;

	
	/**
	 * 테마별 업종 밀집도 정보 - 사업체 POI
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiCompanyDensity(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectPoiCompanyDensity(mapParameter);
	}
	
	/**
	 * 지자체 인허가 통계 업종별 개업 현황 - 사업체 POI
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiCompanyOpen(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectPoiCompanyOpen(mapParameter);
	}
	
	/**
	 * mng_s 업종별 뜨는 지역
	 */
	public List selectGetCompanyBestArea(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectGetCompanyBestArea(mapParameter);
	}
	public List selectjobBestTab10(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectjobBestTab10(mapParameter);
	}
	public List selectjobBestTab20(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectjobBestTab20(mapParameter);
	}
	public List selectjobBestTab30(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectjobBestTab30(mapParameter);
	}
	public List selectjobBestTab40(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectjobBestTab40(mapParameter);
	}
	public List selectjobBestTab50(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectjobBestTab50(mapParameter);
	}
	public List selectjobBestTabFull(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectjobBestTabFull(mapParameter);
	}
	
	/**
	 * 테마별 업종 밀집도 정보 - 사업체 년도별 개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiCompanyTimeSeries(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectPoiCompanyTimeSeries(mapParameter);
	}
	
	/**
	 * 지자체 인허가 통계 업종별 개업 현황 - 사업체 년도별 개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiOpenTimeSeries(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectPoiOpenTimeSeries(mapParameter);
	}
	
	/**
	 * 지역 종합정보 조회 - 총사업체, 총인구, 총가구, 총주택 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAllCompanyPplHouse(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.getAllCompanyPplHouse(mapParameter);
	}
	
	/**
	 * 상권정보 - 선택영역 비율 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getTradeSelectAreaRatio(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.getTradeSelectAreaRatio(mapParameter);
	}
	
	/**
	 * 상권정보 - 전국평균 비율 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getTradeCountryAvgRatio(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.getTradeCountryAvgRatio(mapParameter);
	}
	
	/**
	 * 상권정보 - 영역 내 선택업종 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTradeAreaCorp(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.selectTradeAreaCorp(mapParameter);
	}
	
	/**
	 * 지역종합정보 - 주요시설물 정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map mainFacilityList(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.mainFacilityList(mapParameter);
	}
	
	/**
	 * 지역종합정보 - 주요시설물 정보 (테마코드 조회)
	 * @param mapParameter
	 * @exception Exception
	 */
	public List mainFacilityList_thcd(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.mainFacilityList_thcd(mapParameter);
	}
	
	/**
	 * 업종밀집도 - 시군구별 소속 읍면동 조회
	 * @param mapParameter
	 * @exception Exception
	 */	
	public List getEmdongListBySgg(Map mapParameter) throws SQLException {
		return bizStatsMapMapper.getEmdongListBySgg(mapParameter);
	}
	
}