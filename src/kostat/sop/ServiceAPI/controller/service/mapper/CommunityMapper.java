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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import kostat.sop.ServiceAPI.common.security.SecureDB;

/**
 * @Class Name : CommunityMapper.java
 * @Description : CommunityMapper DAO Class
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


@Repository("communityMapper")
public class CommunityMapper extends EgovAbstractMapper {
	public List<HashMap<String,Object>> selectHistoryList(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectList("member.StatistcsHistoryAllLists", mapParameter);
	}
	public HashMap<String,Object> selectCmmnty(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectOne("communityMap.selectCmmnty", mapParameter);
	}
	public List<HashMap<String,Object>> selectMapList(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectList("communityEtc.selectMapList", mapParameter);
	}
	public HashMap<String,Object> selectArea(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectOne("communityEtc.selectArea", mapParameter);
	}
	public List<HashMap<String,Object>> selectKwrdList(String CMMNTY_MAP_ID) throws SQLException,IllegalArgumentException {
		return selectList("communityEtc.selectKwrdList", CMMNTY_MAP_ID);
	}
	public List<HashMap<String,Object>> selectCmmntyMapAddRegion(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		if(mapParameter.get("bnd_year")!=null&&!mapParameter.get("bnd_year").toString().matches("^(\\d{4})$")){
			mapParameter.put("bnd_year",kostat.sop.ServiceAPI.common.controller.Properties.getDefult_bnd_year());
		}
		List<HashMap<String,Object>> region = new ArrayList<HashMap<String,Object>>();
		List<HashMap<String,Object>> regionList = selectList("communityEtc.selectCmmntyMapAddRegion", mapParameter);
		Iterator<HashMap<String,Object>> iter = regionList.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			data.put("bnd_year", mapParameter.get("bnd_year"));
			HashMap<String,Object> addRegion = this.selectArea(data);
			addRegion.put("adm_cd", data.get("adm_cd"));
			addRegion.put("adm_nm", data.get("adm_nm"));
			region.add(addRegion);
		}
		return region;
	}
	public int insertPoiPoint(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return insert("communityPoi.insertPoiPoint", mapParameter);
	}
	public int insertPoi(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return insert("communityPoi.insertPoi", mapParameter);
	}
	public List<HashMap<String,Object>> selectCmmntyPoiList(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectList("communityPoi.selectCmmntyPoiList", mapParameter);
	}
	public List<HashMap<String,Object>> selectCommunityCustomSymbolList(String custom_symbol_group_id) throws SQLException,IllegalArgumentException {
		return selectList("communityCustomSymbol.selectCommunityCustomSymbolList", custom_symbol_group_id);
	}
	public HashMap<String,Object> selectCmmntyMapRegMber(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectOne("communityRegistMember.selectCmmntyMapRegMber", mapParameter);
	}
	public HashMap<String,Object> selectCmmntyPoi(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectOne("communityPoi.selectCmmntyPoi", mapParameter);
	}
	public List<String> selectCmmntyMapRegMberDuplicationList(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectList("communityRegistMember.selectCmmntyMapRegMberDuplicationList", mapParameter);
	}
	public int insertCmmntyMapRegMber(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return insert("communityRegistMember.insertCmmntyMapRegMber", mapParameter);
	}
	public List<HashMap<String,Object>> selectSidoList(String bnd_year) throws SQLException,IllegalArgumentException {
		return selectList("communityEtc.selectSidoList",bnd_year);
	}
	public List<String> selectCmmntyMapRegistMemberList(HashMap<String,Object> communityMapInfo) throws SQLException,IllegalArgumentException {
		return selectList("communityEtc.selectCmmntyMapRegistMemberList",communityMapInfo);
	}
	public List<HashMap<String,Object>> selectCmmntyItemList(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectList("communityEtc.selectCmmntyItemList",mapParameter);
	}
	public List<HashMap<String,Object>> selectHotCmmntyList(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectList("communityMap.selectHotCmmntyList",mapParameter);
	}
	public int selectCommunityPoiCountOfOrganization(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectOne("communityPoi.selectCommunityPoiCountOfOrganization",mapParameter);
	}
	public List<HashMap<String,Object>> selectCommunityPoiListOfOrganization(HashMap<String,Object> mapParameter) throws SQLException,IllegalArgumentException {
		return selectList("communityPoi.selectCommunityPoiListOfOrganization",mapParameter);
	}
	public boolean selectOperInstAreaCount(String organ) throws SQLException,IllegalArgumentException {
		return (int)selectOne("communityEtc.selectOperInstAreaCount",organ)>0;
	}
	public void insertOrganMember(String organ,String member_id) throws SQLException,IllegalArgumentException {
		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
		mapParameter.put("member_id", member_id);
		HashMap<String,Object> member = selectOne("member.memberLoginInfo",mapParameter);
		if(member==null){
			mapParameter.put("pw", SecureDB.encryptSha256(member_id+"1234!@#$"));
			mapParameter.put("member_nm", member_id);
			insert("communityEtc.insertMemberInfo",mapParameter);
		}
	}
	public List<HashMap<String,Object>> selectItemCdList() throws SQLException,IllegalArgumentException {
		List<HashMap<String,Object>> groupList =  selectList("communityEtc.selectItemGroupList");
		List<HashMap<String,Object>> itemList =  selectList("communityEtc.selectItemCdList");
		Iterator<HashMap<String,Object>> groupIter = groupList.iterator();
		while(groupIter.hasNext()){
			HashMap<String,Object> group = groupIter.next();
			List<HashMap<String,Object>> children = new ArrayList<HashMap<String,Object>>();
			List<HashMap<String,Object>> removeItem = new ArrayList<HashMap<String,Object>>();
			Iterator<HashMap<String,Object>> itemIter = itemList.iterator();
			while(itemIter.hasNext()){
				HashMap<String,Object> item = itemIter.next();
				if(group.get("group_id").equals(item.get("group_id"))){
					children.add(item);
					removeItem.add(item);
				}
			}
			group.put("children",children);
			itemList.removeAll(removeItem);
		}
		return groupList;
	}
}