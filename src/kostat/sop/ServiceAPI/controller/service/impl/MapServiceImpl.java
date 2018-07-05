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
import java.util.Map;
import java.util.List;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.controller.service.mapper.MapMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : MapServiceImpl.java
 * @Description : MapServiceImpl Implement Class
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

@Service("mapService")
public class MapServiceImpl extends EgovAbstractServiceImpl implements MapService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MapServiceImpl.class);

	/** MapDAO */
	@Resource(name="mapMapper")
	private MapMapper mapMapper;

	/**
	 * 북마크 정보조회 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getStatistcsHistoryParamInfo(Map mapParameter) throws SQLException {
		return mapMapper.getStatistcsHistoryParamInfo(mapParameter);
	}
	
	/**
	 * 메인 최신정보 가져오기
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public List getMainRecentParamInfo(Map mapParameter) throws SQLException {
		return mapMapper.getMainRecentParamInfo(mapParameter);
	}
	
	/**
	 * 사용자영역 경계검색
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectUserAreaBoundInfo(Map mapParameter) throws SQLException {
		return mapMapper.selectUserAreaBoundInfo(mapParameter);
	}

	/**
	 * 산업분류 검색
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCorpClassSearch(Map mapParameter) throws SQLException {
		return mapMapper.selectCorpClassSearch(mapParameter);
	}
	
	/**
	 * 산업분류 검색 총개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public int getCorpClassCount(Map mapParameter) throws SQLException {
		return mapMapper.getCorpClassCount(mapParameter);
	}
	
	/**
	 * 툴팁정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTooltipInfo(Map mapParameter) throws SQLException {
		return mapMapper.selectTooltipInfo(mapParameter);
	}
}