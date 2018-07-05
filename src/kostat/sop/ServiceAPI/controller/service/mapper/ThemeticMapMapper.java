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
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.stereotype.Repository;

/**
 * @Class Name : TechnicalBizMapMapper.java
 * @Description : TechnicalBizMapMapper DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.06.21           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016. 06.21
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */


@Repository("themeticMapMapper")
public class ThemeticMapMapper extends EgovAbstractMapper {

	/**
	 * 전국 집계구 경계 Count 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public int getAllCountryStatsareaCount(Map mapParameter) throws SQLException {
		return selectOne("thematicMap_other.allCountryStatsareaCount", mapParameter);
	}
	
	/**
	 * 전국 집계구 경계 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectAllCountryStatsarea(Map mapParameter) throws SQLException {
		return selectList("thematicMap_other.allCountryStatsarea", mapParameter);
	}
}