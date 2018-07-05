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
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Class Name : MypageMapper.java
 * @Description : MypageMapper DAO Class
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


@Repository("mypageMapper")
public class MypageMapper extends EgovAbstractMapper {

	/**
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	
	//SRV_DT_USER_DATA_UPLOAD_MAIN
	//SRV_DT_USER_UPLOAD_STATUS
	//SRV_DT_USER_UPLOAD_DATA
	//SRV_DT_USER_META_DATA
	
	
	@Resource(name = "sqlSession2")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}

	
	public void insertMyDataFile(Map mapParamter) throws SQLException{
		insert("mypage.insertMyData",mapParamter);
	}
	
	public int selectMyDataTotalSize(String usr_id) throws SQLException{
		return selectOne("mypage.selectMyDataTotalSize",usr_id);
	}
	public void updateMyDataTotalSize(String usr_id, long totalSize) throws SQLException{
		Map parameterMap = new HashMap();
		parameterMap.put("usr_id", usr_id);
		parameterMap.put("total_size", totalSize);
		update("mypage.updateMyDataTotalSize",parameterMap);
	}
	public void insertMyDataTotalSize(String usr_id, long totalSize,String member_nm) throws SQLException{
		Map parameterMap = new HashMap();
		parameterMap.put("usr_id", usr_id);
		parameterMap.put("total_size", totalSize);
		parameterMap.put("member_nm", member_nm);
		// 2016.12.02 시큐어코딩 삭제
		insert("mypage.insertMyDataTotalSize",parameterMap);
	}
	
	public void insertUserData(Map mapParameter) throws SQLException{
		insert("mypage.insertUserData",mapParameter);
	}
	
	public void insertUserMetaData(Map mapParameter) throws SQLException{
		insert("mypage.insertUserMetaData",mapParameter);
	}
	
	public void updateMyDataFile(Map map) throws SQLException {
		update("mypage.updateMainData", map);
	}
	
	public void updateUsrData(Map map) throws SQLException {
		update("mypage.updateUploadData", map);
	}
	public void updateMetaData(Map map) throws SQLException {
		update("mypage.updateMetaData", map);
	}
	
	public void DeleteMyDataFile(String data_id,String usr_id) throws SQLException {
		delete("mypage.userDataDelete", data_id);
		delete("mypage.deleteMataData", data_id);
		delete("mypage.deleteMain", data_id);
		
	}
	
	public void deleteColId(Map map) throws SQLException {
		delete("mypage.deleteColId",map);
	}
	
	public Map selectMyDataInfo(String data_id) throws SQLException {
		Map dataMap = new HashMap();
		List uploadData = new ArrayList();
		List metaData = new ArrayList();
		
		Map map = selectOne("mypage.selectMyDataInfo", data_id);
		uploadData = selectList("mypage.selectUserUploadData",data_id);
		metaData = selectList("mypage.selectUserMetaData",data_id);
		
		dataMap.put("mainData", map);
		dataMap.put("uploadData", uploadData);
		dataMap.put("metaData", metaData);
		/*select t.spacial_attr.SDO_POINT.X,t.spacial_attr.SDO_POINT.Y from SRV_DT_USER_UPLOAD_DATA t;*/
		return dataMap;
	}
	
	public Map selectMyDataMain(String data_id) throws SQLException {
		Map dataMap = new HashMap();
		dataMap = selectOne("mypage.selectMyDataInfo", data_id);
		
		return dataMap;
	}
	
	
	public void getMyDataFile(String data_id){
		
	}
	
	public int SelectListMyDataCount(String usr_id) throws SQLException {
		int count = selectOne("mypage.selectMyDataListCount",usr_id);
		return count;
	}
	
	public List SelectListMyData(Map selectMap) throws SQLException {
		List list = selectList("mypage.selectMyDataList",selectMap);
		return list;
	}
	public List<HashMap<String,Object>> selectListMyDataPure(String usr_id) throws SQLException {
		return selectList("mypage.myDataPureList",usr_id);
	}
	
	public void insertNewSaveMyData(Map map) throws SQLException {
		insert("mypage.insertNewMainData",map);
	}
	public void insertNewSaveUsrData(Map map) throws SQLException {
		insert("mypage.insertNewUsrData",map);
	}
	public void insertNewMetaData(Map map) throws SQLException {
		insert("mypage.insertNewMetaData",map);
	}
	
	
	
	public List<Object> selectMainUploadList(String last_num) throws SQLException {		
		return selectList("mypage.MainUploadLists", last_num);
	}
	
	/**
	 * 나의 데이터 리스트
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMyDataList(Map mapParameter) throws SQLException {
		return selectList("mypage.myDataList",mapParameter);
	}
	
	/**
	 * 나의 데이터 총 개수
	 * @param mapParameter
	 * @exception Exception
	 */	
	public int myDataTotalCount(Map mapParameter) throws SQLException {
		return selectOne("mypage.myDataTotalCount", mapParameter);
	}
	
	/**
	 * 공유 데이터 리스트
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectSharedDataList(Map mapParameter) throws SQLException {
		return selectList("mypage.sharedDataList",mapParameter);
	}
	
	/**
	 * 공유 데이터 총 개수
	 * @param mapParameter
	 * @exception Exception
	 */	
	public int sharedDataTotalCount(Map mapParameter) throws SQLException {
		return selectOne("mypage.sharedDataTotalCount", mapParameter);
	}
	
	public void updateMyKmlData(Map mapParameter) throws SQLException {
		update("mypage.updateMyKmlData",mapParameter);
	}


	public void updateUsrGeoData(Map map) throws SQLException {
		// TODO Auto-generated method stub
		update("mypage.updateUploadGeoData", map);
	}
	
	//deleteUploadGeoData
	public void deleteUsrGeoData(Map map) throws SQLException {
		delete("mypage.deleteUploadGeoData",map);
	}
	
	public int selectCountUsrData(String data_id) throws SQLException {
		int i = selectOne("mypage.selectCountMyUploaqdData",data_id);
		return i;
	}
}