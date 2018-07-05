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
import java.util.Map;
import java.util.List;

/**
 * @Class Name : MapService.java
 * @Description : MapService Class
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
public interface MapService {

	/**
	 * 북마크 정보조회 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getStatistcsHistoryParamInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 메인 최신정보 가져오기
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public List getMainRecentParamInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자영역 경계검색
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectUserAreaBoundInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 산업분류 검색
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCorpClassSearch(Map mapParameter) throws SQLException;
	
	/**
	 * 산업분류 검색 총개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public int getCorpClassCount(Map mapParameter) throws SQLException;
	
	/**
	 * 툴팁정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTooltipInfo(Map mapParameter) throws SQLException;
}