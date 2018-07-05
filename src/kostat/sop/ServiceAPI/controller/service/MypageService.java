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

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.json.simple.parser.ParseException;
import org.opengis.referencing.FactoryException;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import jxl.Workbook;

/**
 * @Class Name : MypageService.java
 * @Description : MypageService Class
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
public interface MypageService {
	
	/**getExternalName
	 * 파일의 확장자를 리턴
	 * @param String fileName
	 * @exception 
	 */
	public String getExternalName(String fileName);

	/**getMetaData
	 * 업로드한 파일데이터를 받아낸다
	 * @param HttpServletRequest request
	 * @exception IOException
	 */
	public List getMetaData(HttpServletRequest request) throws IOException;
	
	/**getExcelData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getExcelData(MultipartFile mpf) throws IOException;
	
	/**getTxtData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTxtData(MultipartFile mpf,String splitString)throws IOException;
	
	/**getTxtData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	 public List getCsvData(MultipartFile mpf) throws IOException;
	 
	/**insertMyData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public String insertMyData(HttpServletRequest request);
	
	/**insertUserdata
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public void insertUserdata(HttpServletRequest request, String data_id);
	
	/**insertMetaData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public void insertMetaData(HttpServletRequest request,String data_id);
	
	/**selectMyData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public void updateMyData(Map map) throws SQLException;
	
	/**selectMyData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectMyData(String data_id) throws SQLException;
	
	/**selectListMyDataApi
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectListMyDataApi(Map mapParameter) throws SQLException;
	
	/**getMydataFile
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getMydataFile(String data_id) throws SQLException;
	
	/**getMySHPFile
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getMySHPFile(String data_id) throws SQLException, FactoryException, ParseException, com.vividsolutions.jts.io.ParseException, IOException;
	
	public ArrayList getMyDataToArrayList(Map excelData) throws ParseException;
	/**getFileData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public void getFileData(String file_path,String file_nm_logic,String file_nm_real);
	
	/**selectListMyData
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectListMyData(String index,String usr_id) throws SQLException;
	
	public List<Object> getMainUploadList(HttpServletRequest request) throws SQLException;

	public void deleteMyData(String parameter,String usr_id) throws SQLException;

	public void newSaveMyData(Map mapParameter) throws SQLException;
	
	/**
	 * 나의 데이터 리스트
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMyDataList(Map mapParameter) throws SQLException;
	
	/**
	 * 나의 데이터 총 개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public int myDataTotalCount(Map mapParameter) throws SQLException;
	
	/**
	 * 공유 데이터 리스트
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectSharedDataList(Map mapParameter) throws SQLException;
	
	/**
	 * 공유 데이터 총 개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public int sharedDataTotalCount(Map mapParameter) throws SQLException;

	/**
	 * 데이터설정시 KML 데이터 정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectMyKmlData(String file_path,String file_nm_logic,String file_nm_real) throws SQLException, ParserConfigurationException, SAXException, TransformerException;
	
	public Map getSampleFile(String parameter);
	
	public Map getKmlFile(String data_id) throws SQLException;
	
	public String viewKmlFileCP(String data_id,String member_id) throws SQLException, IOException;
	
	public void updateMyKmlData(Map mapParameter) throws SQLException;
	
	public long selectMyDataTotalSize(String usr_id);
}