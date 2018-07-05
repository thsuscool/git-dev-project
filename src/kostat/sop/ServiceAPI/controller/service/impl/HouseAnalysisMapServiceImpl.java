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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.HouseAnalysisMapService;
import kostat.sop.ServiceAPI.controller.service.mapper.HouseAnalysisMapMapper;

/**
 * @Class Name : HouseAnalysisMapServiceImpl.java
 * @Description : HouseAnalysisMapServiceImpl Implement Class
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

@Service("houseAnalysisMapService")
public class HouseAnalysisMapServiceImpl extends EgovAbstractServiceImpl implements HouseAnalysisMapService {

	private static final Logger logger = LoggerFactory.getLogger(HouseAnalysisMapServiceImpl.class);

	/** HouseAnalysisMapDAO */
	@Resource(name="houseAnalysisMapMapper")
	private HouseAnalysisMapMapper houseAnalysisMapMapper;

	@SuppressWarnings("unchecked")
	public Map<String,Object> selectMlsfcLists(){
		HashMap<String,Object> result = new HashMap<String,Object>();
		List<HashMap<String,Object>> list = houseAnalysisMapMapper.selectMlsfcLists();
		Iterator<HashMap<String,Object>> iter = list.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			if(result.get(data.get("b_class_idx_id").toString())==null){
				HashMap<String,Object> getd = new HashMap<String,Object>();
				HashMap<String,Object> indicator = new HashMap<String,Object>();
				indicator.put(data.get("m_class_idx_id").toString(),data);
				getd.put("indicator", indicator);
				result.put(data.get("b_class_idx_id").toString(),getd);
				HashMap<String,Object> bClassInfo = (HashMap<String, Object>) result.get(data.get("b_class_idx_id").toString());
				HashMap<String,Object> info = new HashMap<String,Object>();
				info.put("b_class_idx_id", data.get("b_class_idx_id"));
				info.put("b_class_idx_nm", data.get("b_class_idx_nm"));
				info.put("recmd_region_search_disp_yn", data.get("recmd_region_search_disp_yn"));
				bClassInfo.put("info", info);
			}else{
				HashMap<String,Object> getObj = (HashMap<String, Object>) result.get(data.get("b_class_idx_id").toString());
				HashMap<String,Object> indicator = (HashMap<String, Object>) getObj.get("indicator");
				indicator.put(data.get("m_class_idx_id").toString(),data);
			}
		}
		Iterator<String> keys = result.keySet().iterator();
		while( keys.hasNext() ){
			String key = keys.next();
			HashMap<String,Object> bClass = (HashMap<String,Object>)result.get(key);
			bClass.put("indicator", new TreeMap<String, Object>((HashMap<String,Object>)bClass.get("indicator")));
		}
		return new TreeMap<String, Object>(result);
	}

	@Override
	public List<HashMap<String, Object>> selectLifeStyleLists() {
		List<HashMap<String,Object>> list = houseAnalysisMapMapper.selectResIdLists();
		List<HashMap<String,Object>> caseList = houseAnalysisMapMapper.selectResIdCaseLists();
		Iterator<HashMap<String,Object>> iter = list.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			List<HashMap<String, Object>> addCaseList = new ArrayList<HashMap<String, Object>>();
			Iterator<HashMap<String,Object>> caseIter = caseList.iterator();
			while(caseIter.hasNext()){
				HashMap<String,Object> item = caseIter.next();
				if(data.get("serial")==item.get("serial")){
					addCaseList.add(item);
				}
			}
			data.put("children", addCaseList);
			caseList.removeAll(addCaseList);
		}
		return list;
	}
	@Override
	public Map<String, Object> selectIdealTypeLists() {
		HashMap<String,Object> result = new HashMap<String,Object>();
		List<HashMap<String,Object>> lClasslist = houseAnalysisMapMapper.selectLclasSearchList();
		List<HashMap<String,Object>> mClassList = houseAnalysisMapMapper.selectMclasSearchList();
		List<HashMap<String,Object>> sClassList = houseAnalysisMapMapper.selectSclasSearchList();
		Iterator<HashMap<String,Object>> iter = lClasslist.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			List<HashMap<String, Object>> removeCaseList = new ArrayList<HashMap<String, Object>>();
			HashMap<String, Object> addCase = new HashMap<String, Object>();
			Iterator<HashMap<String,Object>> childrenIter = mClassList.iterator();
			while(childrenIter.hasNext()){
				HashMap<String,Object> item = childrenIter.next();
				if(data.get("b_class_search_serial").equals(item.get("b_class_search_serial"))){
					removeCaseList.add(item);
					List<HashMap<String, Object>> removeSCaseList = new ArrayList<HashMap<String, Object>>();
					HashMap<String, Object> addSCase = new HashMap<String, Object>();
					Iterator<HashMap<String,Object>> sIter = sClassList.iterator();
					while(sIter.hasNext()){
						HashMap<String,Object> sClass = sIter.next();
						if(item.get("m_class_search_serial").equals(sClass.get("m_class_search_serial"))){
							removeSCaseList.add(sClass);
							addSCase.put(sClass.get("s_class_search_serial").toString(), sClass);
						}
					}
					item.put("children",new TreeMap<String, Object>(addSCase));
					addCase.put(item.get("m_class_search_serial").toString(),item);
					sClassList.removeAll(removeSCaseList);
				}
			}
			data.put("children", new TreeMap<String, Object>(addCase));
			mClassList.removeAll(removeCaseList);
			result.put(data.get("b_class_search_serial").toString(), data);
		}
		return new TreeMap<String, Object>(result);
	}
}