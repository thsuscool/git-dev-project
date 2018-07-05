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
package kostat.sop.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @Class Name : PublicDataService.java
 * @Description : PublicDataService Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.21           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.24
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
public interface PublicDataService {

	/**
	 * 임의 영역 반경 내 집계구경계
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCircleAreaTotInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 임의 영역 반경 내 사업체 테마정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getThemeInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 임의 영역 반경 내 인구, 가구, 주택, 사업체 정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getTotalInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 시군구 평균 학생/교사 정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getSggSchoolAvg(Map mapParameter) throws SQLException;
	
	/**
	 * 시군구 학교별 평균 학생/교사 정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSggSchoolGroupAvg(Map mapParameter) throws SQLException;
	
	/**
	 * 지하철 승하차 인원 (월평균)
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMetroMonthPpln(Map mapParameter) throws SQLException;
	
	/**
	 * 지하철 승하차 인원 (요일 평균)
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMetroWeekPpln(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 목록
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPublicDataList(Map mapParameter) throws SQLException;
	
	//============= 2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행흐름정보 START =============// 
	/**
	 * 공공데이터 - cctv목록
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCctvPoiList(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - BRT목록
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectBrtPoiList(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - cctv 월별 통계정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCctvWeekendChartInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - cctv 시간대별 통계정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCctvTimeSeriesChartInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - cctv 요일별 통계정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCctvDayOfWeekChartInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - brt 월별 통계정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectBrtWeekendChartInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - brt 시간대별 통계정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectBrtTimeSeriesChartInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - brt 요일별 통계정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectBrtDayOfWeekChartInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - cctv 기본년도 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCctvBaseYearList(Map mapParameter) throws SQLException;
	
	/**
	 * 공공데이터 - brt 기본년도 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectBrtBaseYearList(Map mapParameter) throws SQLException;
	//============= 2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행흐름정보 END ==============// 
}