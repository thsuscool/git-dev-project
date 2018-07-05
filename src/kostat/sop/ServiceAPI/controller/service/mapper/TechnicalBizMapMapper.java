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
package kostat.sop.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.stereotype.Repository;

/**
 * @Class Name : BizStatsMapMapper.java
 * @Description : BizStatsMapMapper DAO Class
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


@Repository("technicalBizMapMapper")
public class TechnicalBizMapMapper extends EgovAbstractMapper {
	
	/**
	 * 기술업종 시도별 기술업종 분포현황
	 * @param mapParameter 
	 * @exception Exception
	 */
	public List getIntroData(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.getIntroData", mapParameter);
	}
	
	/**
	 * 기술업종 시도별 기술업종 분포현황
	 * @param mapParameter 
	 * @exception Exception
	 */
	public List getSidoFeature(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.getSidoFeature", mapParameter);
	}
	
	/**
	 * 기술업종 시도별 업종별 기술업종 특성정보
	 * @param mapParameter 
	 * @exception Exception
	 */
	public List getSidoFeatureDetail(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.getSidoFeatureDetail", mapParameter);
	}
	
	/**
	 * 기술업종 업종별 성남시 신설법인 사업체 수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDensitySeongnam(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("technicalBiz.getDensitySeongnam", mapParameter);
	}
	
	/**
	 * 기술업종 시군구별 업종별 사업체 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSigunguClass(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("technicalBiz.getSigunguClass", mapParameter);
	}
	
	/**
	 * 기술업종 시도별 타입별 경제총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSidoEconomyList(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("technicalBiz.getSidoEconomy", mapParameter);
	}
	
	/**
	 * 기술업종 업종별 시군구 순위
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDensityCombined(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("technicalBiz.getDensityCombined", mapParameter);
	}
	
	/**
	 * 기술업종 업종별 시군구 순위
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSigunguRank(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.getSigunguRank", mapParameter);
	}
	
	/**
	 * 기술업종 코드 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTechCd(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("technicalBiz.getTechCd", mapParameter);
	}
	
	/**
	 * 테마별 업종 밀집도 정보 - 사업체 POI
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiCompanyDensity(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.getPoiCompanyDensity", mapParameter);
	}
	
	/**
	 * 테마별 업종 밀집도 정보 - 사업체 년도별 개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiCompanyTimeSeries(Map mapParameter) throws SQLException {
		return selectList("bizStats.poiCompanyTimeSeries", mapParameter);
	}
	
	/**
	 * 지역 종합정보 조회 - 총사업체, 총인구, 총가구, 총주택 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAllCompanyPplHouse(Map mapParameter) throws SQLException {
		return selectOne("bizStats.allCompanyPplHouse", mapParameter);
	}
	
	/**
	 * 상권정보 - 선택영역 비율 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getTradeSelectAreaRatio(Map mapParameter) throws SQLException {
		return selectOne("bizStats.tradeSelectAreaRatio", mapParameter);
	}
	
	/**
	 * 상권정보 - 전국평균 비율 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getTradeCountryAvgRatio(Map mapParameter) throws SQLException {
		return selectOne("bizStats.tradeCountryAvgRatio", mapParameter);
	}
	
	/**
	 * 상권정보 - 영역 내 선택업종 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTradeAreaCorp(Map mapParameter) throws SQLException {
		return selectList("bizStats.tradeAreaCorp", mapParameter);
	}
	
	/**
	 * 지역종합정보 - 주요시설물 정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map mainFacilityList(Map mapParameter) throws SQLException {
		return selectOne("bizStats.mainFacilityList", mapParameter);
	}
	
	/**
	 * 시군구별 기술업종현황 - 시군구 전체기술업종현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTechAllSggCorpCnt(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.getAllSggCorpCnt", mapParameter);
	}
	
	
	
//	========================================================	
	/**
	 * 사업체 수 / 종사자수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectAreaStateBarChart(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectAreaStateBarChart", mapParameter);
	}
	
	/**
	 * 주요 지원시설 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMajorFacilityBarChart(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectMajorFacilityBarChart", mapParameter);
	}
	
	/**
	 * 지역 종합 통계정도 상단 데이터
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectAreaStateTitleData(Map mapParameter) throws SQLException{
		return selectOne("technicalBiz.selectAreaStateTitleData", mapParameter);
	}
	
	/**
	 * 기술업종별 사업체/종사자 수&비율
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTechnicalBizCntBarChartAndPercentPieChart(Map mapParameter) throws SQLException{
		return selectList("technicalBiz.selectTechnicalBizCntBarChartAndPercentPieChart", mapParameter);
	}
	
	/**
	 * 기술업종별 사업체/종사자 증감
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTechnicalBizVariateLineChart(Map mapParameter) throws SQLException{
		return selectList("technicalBiz.selectTechnicalBizVariateLineChart", mapParameter);
	}
	
	
	/**
	 * 산업단지 내 기술업종 증감현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectIndustryVariationStateLineChart(Map mapParameter) throws SQLException{
		return selectList("technicalBiz.selectIndustryVariationStateLineChart", mapParameter);
	}

	/**
	 * 산업단지 내 기술업종 분포현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectIndustryDistributionStateRadialShapeChart(Map mapParameter) throws SQLException{
		return selectList("technicalBiz.selectIndustryDistributionStateRadialShapeChart", mapParameter);
	}
	
	/**
	 * 산업단지 내 기술업종 상세현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectIndustryDetailStateBarChart(Map mapParameter) throws SQLException{
		return selectList("technicalBiz.selectIndustryDetailStateBarChart", mapParameter);
	}

	/**
	 * 산업단지 내 주요시설 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectIndustryImportantFacilityStateBarChart(Map mapParameter) throws SQLException{
		return selectList("technicalBiz.selectIndustryImportantFacilityStateBarChart", mapParameter);
	}
	
	/**
	 * 지원시설 - 지역별 총사업체/종사자수 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectSupplyRegionInfo(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectSupplyRegionInfo", mapParameter);
	}
	
	/**
	 * 지원시설 - 지역별 총사업체/종사자수 조회(합계)
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectRegionCorpWorkerInfo(Map mapParameter) throws SQLException {
		return selectOne("technicalBiz.selectRegionCorpWorkerInfo", mapParameter);
	}
	
	/**
	 * 기술업종정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectTechInfo(Map mapParameter) throws SQLException {
		return selectOne("technicalBiz.selectTechInfo", mapParameter);
	}
	
	/**
	 * 산업단지 경계조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectIndustryBoundary(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectIndustryBoundary",mapParameter);
	}
	
	/**
	 * 지역별 신설법인정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectNewCorpInfoList(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectNewCorpInfoList",mapParameter);
	}
	
	/**
	 * 지역별 기술업종 전체수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCorpInfoTimeSeries(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectCorpInfoTimeSeries",mapParameter);
	}
	
	/**
	 * 산업단지 내 지원시설 정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectSupplyPoiInIndustry(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectSupplyPoiInIndustry",mapParameter);
	}
	
	/**
	 * 시구군별 기술업종현황정보(지도정보-사업체수, 사업체비율, 종사자, 거주인구 등)
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectSggCompanyMapInfo(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectSggCompanyMapInfo",mapParameter);
	}
	
	
	// 2017. 09. 14 개발팀 추가
	/**
	 * 시구군별 기술업종현황정보(지도정보-사업체수, 사업체비율, 종사자, 거주인구 등)
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectFindRegionSgg(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectFindRegionSgg",mapParameter);
	}
	
	// 2017. 09. 14 개발팀 추가
	/**
	 * 시구군별 기술업종현황정보(지도정보-사업체수, 사업체증감율, 종사자증감율, 거주인구 등)
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectFindRegionSggIrds(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectFindRegionSggIrds",mapParameter);
	}
	
	// 2017. 10. 10 개발팀 추가
	/**
	 * 산업단지 입지계수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectInduscomLq(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectInduscomLq",mapParameter);
	}
	
	
	// 2017. 10. 19 개발팀 추가
	/**
	 * 행정구역별 입지계수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectRegionLq(Map mapParameter) throws SQLException {
		return selectList("technicalBiz.selectRegionLq",mapParameter);
	}
	
	//2017. 11. 09 개발팀 추가
	/**
	 * 조건검색 지역 필터
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectFilterSerch(Map mapParameter)throws SQLException{
		return selectList("technicalBiz.selectFilterSerch",mapParameter);
	}
	
	//2017. 11. 09 개발팀 추가
	/**
	 * 조건검색 지역 필터
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map searchTechTotalInfo(Map mapParameter)throws SQLException{
		Map map = new HashMap();
		map.put("info1",selectOne("technicalBiz.selectTotalInfo1",mapParameter));
		map.put("info2",selectOne("technicalBiz.selectTotalInfo2",mapParameter));
		map.put("info3",selectList("technicalBiz.selectTotalInfo3",mapParameter));
		map.put("info4",selectOne("technicalBiz.selectAdmNm",mapParameter));
		return map;
	}
	
	//2017. 11. 09 개발팀 추가
	/**
	 * 조건검색 지역 필터
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map searchTechDetailInfo(Map mapParameter)throws SQLException{
		Map map = new HashMap();
		map.put("info1",selectOne("technicalBiz.selectDetailInfo1",mapParameter));
		map.put("info2",selectOne("technicalBiz.selectDetailInfo2",mapParameter));
		map.put("info3",selectOne("technicalBiz.selectDetailInfo3",mapParameter));
		map.put("info4",selectOne("technicalBiz.selectDetailInfo4",mapParameter));
		map.put("info5",selectOne("technicalBiz.selectAdmNm",mapParameter));
		return map;
		
	}
	/**
	 * 지역 이름 검색
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map searchAdmNm(Map mapParameter)throws SQLException{
		return selectOne("technicalBiz.selectAdmNm",mapParameter);
	}	
//	========================================================	

}