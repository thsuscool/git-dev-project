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

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : HouseAnalysisMapMapper.java
 * @Description : HouseAnalysisMapMapper DAO Class
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


@Repository("houseAnalysisMapMapper")
public class HouseAnalysisMapMapper extends EgovAbstractMapper {

	public List<HashMap<String,Object>> selectMlsfcLists(){
		return selectList("house.houseMlsfcLists");
	}
	public List<HashMap<String,Object>> selectResIdLists(){
		return selectList("house.selectResIdLists");
	}
	public List<HashMap<String,Object>> selectResIdCaseLists(){
		return selectList("house.selectResIdCaseLists");
	}
	public List<HashMap<String,Object>> selectLclasSearchList(){
		return selectList("house.selectLclasSearchList");
	}
	public List<HashMap<String,Object>> selectMclasSearchList(){
		return selectList("house.selectMclasSearchList");
	}
	public List<HashMap<String,Object>> selectSclasSearchList(){
		return selectList("house.selectSclasSearchList");
	}
}