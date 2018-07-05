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

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.nio.channels.FileChannel;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;
import java.util.Vector;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import au.com.bytecode.opencsv.CSVReader;

import org.geotools.data.DefaultTransaction;
import org.geotools.data.Transaction;
import org.geotools.data.collection.ListFeatureCollection;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.data.simple.SimpleFeatureStore;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.geotools.geometry.jts.JTSFactoryFinder;
import org.geotools.referencing.ReferencingFactoryFinder;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.referencing.FactoryException;
import org.opengis.referencing.crs.CRSFactory;
import org.opengis.referencing.crs.CoordinateReferenceSystem;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.io.WKTReader;

import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.MypageService;
import kostat.sop.ServiceAPI.controller.service.mapper.MypageKairosMapper;
import kostat.sop.ServiceAPI.controller.service.mapper.MypageMapper;

/**
 * @Class Name : MypageServiceImpl.java
 * @Description : MypageServiceImpl Implement Class
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


@Service("mypageService")
public class MypageServiceImpl extends EgovAbstractServiceImpl implements MypageService {

	private static final Logger logger = LoggerFactory.getLogger(MypageServiceImpl.class);

	/** MypageMapperDAO */
	@Resource(name="mypageMapper")
	private MypageMapper mypageMapper;
	
	@Resource(name="mypageKairosMapper")
	private MypageKairosMapper mypageKairos;
    
    public String getExternalName(String fileName){
    	int pathPoint = fileName.lastIndexOf(".");
    	String filePoint = fileName.substring(pathPoint + 1,fileName.length());
    	String fileType = filePoint.toLowerCase();
    	
    	return fileType;
    	
    }
    public String getFileName(String fileName){
    	int pathPoint = fileName.lastIndexOf(".");
    	String filePoint = fileName.substring(0,pathPoint);
    	String filename = filePoint.toLowerCase();
    	
    	return filename;
    }
    
    //올린 파일의 메타데이터 가져오기
    public List getMetaData(HttpServletRequest request) throws IOException{
    	MultipartHttpServletRequest mRequest =(MultipartHttpServletRequest)request;
    	
    	HttpSession session = request.getSession();
    	String member_id =(String)session.getAttribute("member_id");
    	
    	String splitString = request.getParameter("splitString");
    	Iterator<String> itr = mRequest.getFileNames();
		MultipartFile mpf = null;
		
		if(itr.hasNext()){
			mpf = mRequest.getFile(itr.next());
			
			String external = getExternalName(mpf.getOriginalFilename());
			
			if(external.equals("xlsx") ){
				return  getExcelData(mpf);
			}else if(external.equals("xls")){
				return getXlsData(mpf);
			}else if(external.equals("csv")){
				return getCsvData(mpf);
			}else if(external.equals("txt")){
				return getTxtData(mpf,splitString);
			}else if(external.equals("kml")){
				return getKmlData(mpf,member_id);
			}
			
		}
		
		return null;
    }
    
    
    public List getKmlData(MultipartFile mpf,String member_id) throws IOException{
    	
    	//파일을 서버에 저장 후 !!! 파일경로와 파일 명을 return 해 주어야 한다...
    	//파일명은 알기 쉽게 사용자id . kml로 저장 후 완료후 같은 파일명일경우 덮어쓴다.
    	InputStream is = mpf.getInputStream();
    	
    	String PROPERTY_PATH = "/globals.properties";
    	ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
    	Properties props = PropertiesLoaderUtils.loadProperties(resource);
    	String file_path = props.getProperty("Globals.MyData.File.Path");
    	//왠지 여기서 뒤에 _copy를 붙여줘야 할것 같다...
    	//파일명뒤에_copy가 붙는 경우에는 모두 임시 파일이다.
    	//원본 test.kml이 원본일 경우 choijy_copy.kml이 복사본
    	//사용자 id가 choijy_copy -> choijy_copy_copy.kml 이런 방식
    	File file = new File(file_path+"/"+member_id+".kml_copy");
    	
    	
    	mpf.transferTo(file);
    	
    	
    	
/*    	PlaceMark

    	name
    	description
    	point
    		coordinates

    	LineString
    		coordinates

    	Polygon
    		outerBoundaryIs
    				LinearRing
    						coordinates
    		innerBoundaryIs
    				LinearRing
    						coordinates
    		
    	MultiGeometry
    		LineString
    			coordinates
    		LineString
    			coordinates

    name | description | 좌표
    */
    	
		ArrayList kmlDataList = new ArrayList(); 
		
    	try {
    			DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
    			DocumentBuilder parser = f.newDocumentBuilder();
    			org.w3c.dom.Document xmlDoc = parser.parse(is);
			
    			Element root = xmlDoc.getDocumentElement();
    			
    			
    			TransformerFactory factory = TransformerFactory.newInstance();
    			Transformer former = factory.newTransformer();
    			former.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
    			former.setOutputProperty(OutputKeys.INDENT,"yes");
    			StringWriter sw = new StringWriter();
    			StreamResult result = new StreamResult(sw);
    			DOMSource source = new DOMSource(xmlDoc);
    			former.transform(source, result);
    			// 2016.12.02 시큐어코딩 삭제
    			
    			kmlDataList.add(sw.toString());

			
		} 
    	//2017.12.04 [개발팀] 시큐어코딩
    	catch (IllegalArgumentException e) {
    		logger.info("서버에서 처리중 에러가 발생했습니다.");
    	}
    	catch (Exception e) {
    		logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
    	
    	return kmlDataList;
    	
    }
    
    public List getKmlData2(MultipartFile mpf) throws IOException{
    	
    	InputStream is = mpf.getInputStream();
    	
    	try {
    		/*DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = (Document) dBuilder.parse(is);*/
			
			DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
			DocumentBuilder parser = f.newDocumentBuilder();
			org.w3c.dom.Document xmlDoc = parser.parse(is);
			
			Element root = xmlDoc.getDocumentElement();
			
			NodeList placeList = root.getElementsByTagName("Placemark");
			
			
			ArrayList kmlHeaderList = new ArrayList();
			ArrayList kmlDataList = new ArrayList(); 
			
			kmlHeaderList.add("결과");
			kmlHeaderList.add("No");
			
			for(int i = 0; i<placeList.getLength();i++){
				ArrayList kmlDataRow =new ArrayList(); 
				kmlDataRow.add("");
				kmlDataRow.add(i+1);
				Node node = placeList.item(i);
				Element palceMark = (Element) node;
				NodeList extednedData = palceMark.getElementsByTagName("ExtendedData");
				/*NodeList point = palceMark.getElementsByTagName("Point");
				NodeList lineString = palceMark.getElementsByTagName("LineString");
				NodeList multiGeoMetry = palceMark.getElementsByTagName("MultiGeometry");
				NodeList polygon = palceMark.getElementsByTagName("Polygon");*/
				
				NodeList coordinatesNodeList = palceMark.getElementsByTagName("coordinates");

				for(int j =0; j < extednedData.getLength();j++){
					Node extednedDataNode = extednedData.item(j);
					Element extendedEl = (Element) extednedDataNode;
					NodeList dataList = extendedEl.getElementsByTagName("Data");
					
					for(int y = 0; y < dataList.getLength();y++){
						Node dataNode = dataList.item(y);
						Element dataEl = (Element) dataNode;
						// 2016.12.02 시큐어코딩 삭제
						if(i==0){
							kmlHeaderList.add( dataEl.getAttribute("name"));
						}
						
						NodeList valueList = dataEl.getElementsByTagName("value");
						/*NodeList valueList = dataEl.getChildNodes();*/
						for(int z = 0; z < valueList.getLength(); z++){
							Node valueNode = valueList.item(z);
							Element valueEl = (Element)valueNode;
							kmlDataRow.add(valueNode.getFirstChild().getNodeValue());
						}
						
						
					}
				}
				
				
				if(i == 0){
					kmlHeaderList.add("공간좌표 X");
					kmlHeaderList.add("공간좌표Y");
				}
				
				
				StringBuffer coordiString = new StringBuffer();
				for(int j = 0; j < coordinatesNodeList.getLength();j++){
					Node coordinates = coordinatesNodeList.item(j);
					/*kmlDataRow.add(coordinates.getFirstChild().getNodeValue());*/
					if(j >=1 ){
						coordiString.append("/");
					}
					coordiString.append(coordinates.getFirstChild().getNodeValue());
					
				}
				
				String coordiX = coordiString.toString().split(",")[0];
				String coordiY = coordiString.toString().split(",")[1];
				kmlDataRow.add(coordiX);
				kmlDataRow.add(coordiY);
				
				/*kmlDataRow.add(coordiString.toString());*/
				
				
				/*for(int j = 0; j <point.getLength(); j ++){
					Node pointNode = point.item(j);
					Element pointEl = (Element)pointNode;
					NodeList coordinates = pointEl.getElementsByTagName("coordinates");
					for(int y = 0; y<coordinates.getLength();y++){
						Node xy = coordinates.item(y);
						kmlDataRow.add(xy.getFirstChild().getNodeValue());
						// 2016.12.02 시큐어코딩 삭제
					}
				}*/
				
				if(i == 0){
					kmlDataList.add(kmlHeaderList);
				}
					kmlDataList.add(kmlDataRow);
			}
			return kmlDataList;
			
		} 
    	//2017.12.04 [개발팀] 시큐어코딩
    	catch (IllegalArgumentException e) {
    		logger.info("서버에서 처리중 에러가 발생했습니다.");
    	}
    	catch (Exception e) {
			// TODO Auto-generated catch block
    		logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
    	
    	
    	
    	return null;
    }
    
    public List getTxtData(MultipartFile mpf,String splitString) throws IOException{
    	BufferedReader br = new BufferedReader(new InputStreamReader(mpf.getInputStream(),"euc-kr"));
    	StringBuilder sb = new StringBuilder();
    	ArrayList txtList = new ArrayList();
    	ArrayList dataList = new ArrayList();
    	String line = br.readLine();
    	
    	//2017.12.04 [개발팀] 시큐어코딩
    	try {
    		while(line !=null){
        		String[] lineArray = line.split(splitString);
        		txtList.add(lineArray);
        		line = br.readLine();
        	}
        	
        	for(int i = 0; i < txtList.size();i++){
        		
        		/*if(i>3500){
        			break;
        		}*/
        		
        		if(i>=5001){
        			break;
        		}
        		
        		
        		String[] tempLine = (String[]) txtList.get(i);
        		/*String[] rowArray = new String[tempLine.length +2];*/
        		String[] rowArray = new String[tempLine.length +6];
        		for(int j = 0; j<tempLine.length;j++){
        			if(j> 10){
        				break;
        			}
        			
        			if(i>0){
        				rowArray[0] = "";
        				rowArray[1] = Integer.toString(i);
        			}else{
        				rowArray[0] = "결과";
        				rowArray[1] = "No";
        			}
        			
        			rowArray[j+2] = tempLine[j];
        			if(j == tempLine.length-1){
        				if(i>0){
        					rowArray[j+3] = "";
            				rowArray[j+4] = "";
            				rowArray[j+5] = "";
            				rowArray[j+6] = "";
        				}else{
        					rowArray[j+3] = "X좌표";
            				rowArray[j+4] = "Y좌표";
            				rowArray[j+5] = "집계구코드";
            				rowArray[j+6] = "읍면동";
        				}
        				
        			}
        			
        		}
        		dataList.add(rowArray);
        	}
    	}
    	catch (IllegalArgumentException e) {
    		logger.info("서버에서 처리중 에러가 발생했습니다.");
    	}
		catch (Exception e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
    	finally {
			br.close();
    	}
    	
    	return dataList;
    }
    
    public List getCsvData(MultipartFile mpf) throws IOException{
    	
    	List dataList = new ArrayList();
    	List csvList = new ArrayList();
    	CSVReader csv = new CSVReader(new InputStreamReader(mpf.getInputStream(),"euc-kr"));
    	
    	String[] row;
    	
    	while((row = csv.readNext()) !=null){
    		dataList.add(row);
    	}
    	
    	for(int i =0; i <dataList.size();i++){
    		/*if(i>3500){
    			break;
    		}*/
    		
    		if(i>=5001){
    			break;
    		}
    		
    		
    		String[] tempRow = (String[]) dataList.get(i);
    		/*String[] rowArray = new String[tempRow.length +2];*/
    		String[] rowArray = new String[tempRow.length +6];
    		for(int j = 0; j <tempRow.length;j++){
    			if(j> 10){
    				break;
    			}
    			if(i>0){
    				rowArray[0] = "";
    				rowArray[1] = Integer.toString(i);
    			}else{
    				rowArray[0] = "결과";
    				rowArray[1] = "No";
    			}
    			rowArray[j+2] = tempRow[j];
    			
    			if(j == tempRow.length-1){
    				if(i>0){
    					rowArray[j+3] = "";
        				rowArray[j+4] = "";
        				rowArray[j+5] = "";
        				rowArray[j+6] = "";
    				}else{
    					rowArray[j+3] = "X좌표";
        				rowArray[j+4] = "Y좌표";
        				rowArray[j+5] = "집계구코드";
        				rowArray[j+6] = "읍면동";
    				}
    				
    			}
    			
    			
    			
    		}
    		csvList.add(rowArray);
    		
    	}
    	return csvList;
    }
    
    public List getXlsData(MultipartFile mpf) throws IOException{
    	InputStream fis = mpf.getInputStream();
    	List dataList = new ArrayList();
    	
    	HSSFWorkbook xworkBook = new HSSFWorkbook(fis);
    	HSSFSheet xsheet = null;
    	HSSFRow xrow = null;
    	HSSFCell xcell = null;
    	
    	int sheetnum = xworkBook.getNumberOfSheets();
    	xsheet = xworkBook.getSheetAt(0);
    	int rows = xsheet.getPhysicalNumberOfRows();//행의 개수
    	
    	/*if(rows >= 3501){
    		rows = 3501;
    	}*/
    	
    	if(rows >= 5001){
    		rows = 5001;
    	}
    	
    	
    	for(int i=0; i<rows; i++){
    		xrow = xsheet.getRow(i);
    		int cells = xrow.getPhysicalNumberOfCells();
    		if(cells > 11){
    			cells = 11;
    		}
    		/*String rowArray[]=new String[cells + 2];*/
    		String rowArray[]=new String[cells + 6];
    		for(int y=0;y<cells;y++){
    			xcell = xrow.getCell(y);
    			if(i > 0){
    				//rowArray[0] = "O";
    				rowArray[0] = "";
    				rowArray[1] = Integer.toString(i);
    			}else{
    				rowArray[0] = "결과";
    				rowArray[1] = "No";
    				//만약 체크가 안되어 잇다면 "" 빈값으로 쭉 채워 주면 된다.
    			}
    			
    			//2017.03.29 최재영 xlsx null 값 처리
    			if(xcell == null){
    				rowArray[y+2] = "";
    			}else{
    				switch(xcell.getCellType()){
    				case 0 : 
    					rowArray[y+2] = String.valueOf((long)xcell.getNumericCellValue());
    					break;
    				case 1 :
    					rowArray[y+2]=xcell.getStringCellValue();
    					break;
    				/*case Cell.CELL_TYPE_FORMULA :
    					// 2016.12.02 시큐어코딩 삭제
    					break;*/
    				}
    			}
    			
    			
    			if(y == cells -1){
    				if(i>0){
    					rowArray[y+3] = "";
        				rowArray[y+4] = "";
        				rowArray[y+5] = "";
        				rowArray[y+6] = "";
    				}else{
    					rowArray[y+3] = "X좌표";
        				rowArray[y+4] = "Y좌표";
        				rowArray[y+5] = "집계구코드";
        				rowArray[y+6] = "읍면동";
    				}
    				
    			}
    			
    		}
    		dataList.add(rowArray);
    	}
    	return dataList;
    	
    	
    	
    }
    
    public List getExcelData(MultipartFile mpf) throws IOException{
    	InputStream fis = mpf.getInputStream();
    	List dataList = new ArrayList();
    	
    	XSSFWorkbook xworkBook = new XSSFWorkbook(fis);
    	XSSFSheet xsheet = null;
    	XSSFRow xrow = null;
    	XSSFCell xcell = null;
    	
    	int sheetnum = xworkBook.getNumberOfSheets();//시트개수
    	xsheet = xworkBook.getSheetAt(0);//첫 시트
    	
    	int rows = xsheet.getPhysicalNumberOfRows();//행의 개수
    	
    	/*if(rows >= 3501){
    		rows = 3501;
    	}*/
    	
    	if(rows >= 5001){
    		rows = 5001;
    	}
    	
    	
    	for(int i=0; i<rows; i++){
    		xrow = xsheet.getRow(i);
    		//int cells = xrow.getPhysicalNumberOfCells();
    		short cells = xrow.getLastCellNum();
    		
    		if(cells > 11){
    			cells = 11;
    		}
    		
    		/*String rowArray[]=new String[cells + 2];*/
    		String rowArray[]=new String[cells + 6];
    		for(int y=0;y<cells;y++){
    			xcell = xrow.getCell(y);
    			if(i > 0){
    				//rowArray[0] = "O";
    				rowArray[0] = "";
    				rowArray[1] = Integer.toString(i);
    			}else{
    				rowArray[0] = "결과";
    				rowArray[1] = "No";
    			}
    			//2017.03.29 최재영 xlsx null 값 처리
    			if(xcell == null){
    				rowArray[y+2] = "";
    			}else{
    				
    				switch(xcell.getCellType()){
    				case 0 : 
    					rowArray[y+2] = String.valueOf((long)xcell.getNumericCellValue());
    					break;
    				case 1 :
    					rowArray[y+2]=xcell.getStringCellValue();
    					break;
    				/*case Cell.CELL_TYPE_FORMULA :
    					// 2016.12.02 시큐어코딩 삭제
    					break;*/
    				}
    			}
    			
    			
    			if(y == cells -1){
    				if(i > 0){
    					rowArray[y+3] = "";
        				rowArray[y+4] = "";
        				rowArray[y+5] = "";
        				rowArray[y+6] = "";
    				}else{
    					rowArray[y+3] = "X좌표";
        				rowArray[y+4] = "Y좌표";
        				rowArray[y+5] = "집계구코드";
        				rowArray[y+6] = "읍면동";
    				}
    				
    			}
    			
    		}
    		dataList.add(rowArray);
    	}
    	return dataList;
    }
    
    
    //파일에 대한 실제 저장
	public String insertMyData(HttpServletRequest request){
		
		Map mapParameter = new HashMap();
		
		HttpSession session = request.getSession();
		MultipartHttpServletRequest mRequest =(MultipartHttpServletRequest)request;
		Calendar date = Calendar.getInstance();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmssS");
		SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp ts = new Timestamp(date.getTimeInMillis());
		String idDate = df.format(date.getTimeInMillis());
		String nowDate = dfs.format(date.getTimeInMillis());
		/*date.add(date.DAY_OF_YEAR, 14);*/
		date.add(date.MONTH, 6);
		String endDate = dfs.format(date.getTimeInMillis());
	
		
		String usr_id = (String)session.getAttribute("member_id");
		String member_nm =(String)session.getAttribute("member_nm");
		
		/*String data_id = getMD5(usr_id)+"_"+idDate;*/
		String data_id = StringUtil.getRandomString(32) + "_" + idDate ;
		
		String data_title = request.getParameter("mpfSubj");
		String share_yn = "N";
		String useHistory = "N";
		
		
		String gioCoding = request.getParameter("gioCoding");
		String gioX = request.getParameter("gioX");
		String gioY = request.getParameter("gioY");
		String gioField = request.getParameter("gioField");
		String dispData = request.getParameter("dispData");
		String[] tooltipSetting = request.getParameterValues("tooltipSetting[]");
		String dataVisualSetting = request.getParameter("dataVisualSetting");
		String[] rdOption = request.getParameterValues("rdOption[]");
		
		
		
		Map dispMap = new HashMap();
		dispMap.put("dispData", dispData);
		dispMap.put("tooltipSetting", tooltipSetting);
		dispMap.put("dataVisualSetting", dataVisualSetting);
		

		if(rdOption != null){
			for(int i =0;i<rdOption.length;i++){
				if(rdOption[i].equals("shared")){
					share_yn = "W";
				}else if(rdOption[i].equals("useHistory")){
					useHistory = "W";
				}
			}
		} 
		
		
		Iterator<String> itr = mRequest.getFileNames();
		MultipartFile mpf = null;
		
		
		long file_sz=0;
		
		String share_grant_manager_id="";
		
		
		if(itr.hasNext()){
			mpf = mRequest.getFile(itr.next());
			//SRV_DT_USER_DATA_UPLOAD_MAIN
			try {				
				String PROPERTY_PATH = "/globals.properties";
				ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
				Properties props = PropertiesLoaderUtils.loadProperties(resource);
				String file_path = props.getProperty("Globals.MyData.File.Path");
				
				String file_nm_real="";
				String file_nm_logic="";
				
				file_nm_logic = mpf.getOriginalFilename() + idDate;
				file_nm_real =mpf.getOriginalFilename();
				file_sz = mpf.getSize();
				
				mapParameter.put("data_id", data_id);
				mapParameter.put("usr_id", usr_id);
				mapParameter.put("member_nm",member_nm);
				
				mapParameter.put("share_yn", share_yn);
				mapParameter.put("use_history", useHistory);
				mapParameter.put("data_title", data_title);
				
				mapParameter.put("mpf", mpf);
				mapParameter.put("file_path", file_path);
				mapParameter.put("file_nm_real", file_nm_real);
				mapParameter.put("file_nm_logic", file_nm_logic);
				mapParameter.put("file_sz", file_sz);
				
				mapParameter.put("map_disp_type", dataVisualSetting);
				
				mapParameter.put("share_grant_manager_id", share_grant_manager_id);

				mapParameter.put("upload_dt", nowDate);
				mapParameter.put("start_dt", nowDate);
				mapParameter.put("end_dt", endDate);
				
				mypageMapper.insertMyDataFile(mapParameter);
				
				File file = new File(file_path+"/"+file_nm_logic);
				
				long totalSize = mypageMapper.selectMyDataTotalSize(usr_id);
				if(totalSize > -1){
					mypageMapper.updateMyDataTotalSize(usr_id,totalSize + file_sz);
				}else{
					mypageMapper.insertMyDataTotalSize(usr_id,file_sz,member_nm);
				}
				mpf.transferTo(file);
				
			} 
			//2017.12.04 [개발팀] 시큐어코딩
	    	catch (IllegalArgumentException e) {
	    		logger.info("서버에서 처리중 에러가 발생했습니다.");
	    	}
			catch (Exception e) {
				//2015-12-03 시큐어코딩
				logger.info(StringUtil.getErrMsg()+e);
				//e.printStackTrace();
				if(share_grant_manager_id != null) {
					share_grant_manager_id = null;
				}
			}
			
		}
		return data_id;
	}
	
	public void insertUserdata(HttpServletRequest request, String data_id){
	
		String geoDataArray = request.getParameter("geoDataArray");
		String usrString = request.getParameter("usrData");
		
		JSONParser parser = new JSONParser();
		JSONArray usrObj = null;
		
		JSONArray geoJson = null;
		try{
			//사용자업로드데이터 SRV_DT_USER_UPLOAD_DATA
			usrObj = (JSONArray) parser.parse(usrString);
			geoJson = (JSONArray)parser.parse(geoDataArray);
			
			for(int i = 0; i <usrObj.size(); i ++){
				JSONObject geoData = (JSONObject) geoJson.get(i);
				//i+1을 순번으로 seq 
				//매번 반복하여 한행씩 집어 넣는다
				Map userMap = new HashMap();
				userMap.put("usr_data_id", data_id);
				userMap.put("usr_data", usrObj.get(i).toString());
				userMap.put("SEQ", i+1);
				userMap.put("geo_x", geoData.get("x").toString());
				userMap.put("geo_y", geoData.get("y").toString());
				userMap.put("tot_reg_cd", geoData.get("tot_reg_cd").toString());
				userMap.put("adm_cd", geoData.get("adm_cd").toString());
				userMap.put("adm_nm", geoData.get("adm_nm").toString());
				mypageMapper.insertUserData(userMap);
				//insert 호출
			}
		}catch(ParseException | SQLException e){
			// 2015-12-03 시큐어코딩
			//e1.printStackTrace();
			logger.info(StringUtil.getErrMsg()+e);
			
			if(geoDataArray != null) {
				geoDataArray = null;
			}
						
			if(usrString != null) {
				usrString = null;
			}
						
			if(parser != null) {
				parser = null;
			}
						
			if(usrObj != null) {
				usrObj = null;
			}
						
			if(geoJson != null) {
				geoJson = null;
			}
		}
		
		
	}
	
	public void insertMetaData(HttpServletRequest request,String data_id){
		String metaString = request.getParameter("metaData");
		String geoDataArray = request.getParameter("geoDataArray");
		
		String[] dispData = request.getParameterValues("dispData[]");
		String[] tooltipSetting = request.getParameterValues("tooltipSetting[]");
		
		JSONParser parser = new JSONParser();
		JSONArray metaObj = null;
				
		try {
			//사용자 메타데이터 SRV_DT_USER_META_DATA
			metaObj = (JSONArray)parser.parse(metaString);
			
			// 2016.12.02 시큐어코딩 삭제
			
			for(int i = 0; i<metaObj.size();i++){
				Map metaMap = (Map) metaObj.get(i);
				
				
				/*Iterator metaIt = metaMap.entrySet().iterator();*/
				Vector v = new Vector(metaMap.keySet());
				Collections.sort(v);
				Iterator metaIt = v.iterator();
				
				Map userMap = new HashMap();
				int j = 0;
				while(metaIt.hasNext()){
					/*Map.Entry metaEntry = (Map.Entry)metaIt.next();*/
					/*userMap.put("col_id",metaEntry.getKey());
					userMap.put("col_nm", metaEntry.getValue());*/
					
					String element = (String)metaIt.next();
					userMap.put("col_id",element);
					userMap.put("col_nm",metaMap.get(element));
					userMap.put("data_id", data_id);
					
					int checktype = 0;
					// 0 선택 안함 , 1 disp선택  2, tooltipSetting ,3 모두 선택
					if(dispData[j].equals("true")){
						if(tooltipSetting[j].equals("true")){
							userMap.put("CHECK_TYPE", "3");
						}else{
							userMap.put("CHECK_TYPE", "1");
						}
					}else{
						if(tooltipSetting[j].equals("true")){
							userMap.put("CHECK_TYPE", "2");
						}else{
							userMap.put("CHECK_TYPE", "0");
						}
					}
					
					// 2016.12.02 시큐어코딩 삭제
					
					mypageMapper.insertUserMetaData(userMap);
					
					j ++;
				}
				//여기서 userMap을 넣어서
				
			}
		} 
		//2017.12.04 [개발팀] 시큐어코딩
    	catch (IllegalArgumentException e) {
    		logger.info("서버에서 처리중 에러가 발생했습니다.");
    	}
		catch (Exception e) {
			//2015-12-03 시큐어코딩
			logger.info(StringUtil.getErrMsg()+e);
			//e.printStackTrace();
			
			if(metaString != null) {
				metaString = null;
			}
			
			if(geoDataArray != null) {
				geoDataArray = null;
			}
			
			if(parser != null) {
				parser = null;
			}
			
			if(metaObj != null) {
				metaObj = null;
			}
		}
		
	}
	
	
	public void updateMyData(Map map) throws SQLException{
		
		String data_uid = (String) map.get("data_uid");
		String subject 	= (String)map.get("subject");
		String usr_data = (String)map.get("usr_data");
		String metaData = (String)map.get("meta_data");
		String rdOptions = (String) map.get("rdOption");
		String gioField = (String) map.get("gioField");
		// 2016.12.02 시큐어코딩 삭제
		
		String map_disp_type = (String)map.get("map_disp_type");
		String dispString = (String)map.get("dispData");
		String tooltipString = (String)map.get("tooltipSetting");
		
		String dispData[] = dispString.split(",");
		String tooltipSetting[] = tooltipString.split(",");
		
		
		String share_yn = "N";
		String use_history = "N";
		
		if(rdOptions != null){
			String[] rdOption = rdOptions.split(",");
			for(int i =0;i<rdOption.length;i++){
				
				Map myData = mypageMapper.selectMyDataInfo(data_uid);
				Map mainData = (Map)myData.get("mainData");
				
				if(rdOption[i].equals("shared")){
					
					if(mainData.get("SHARE_YN").toString().equals("Y")){
						share_yn = "Y";
					}else{
						share_yn = "W";
					}
					
				}else if(rdOption[i].equals("useHistory")){
					if(mainData.get("USE_HISTORY").toString().equals("Y")){
						use_history = "Y";
					}else{
						use_history = "W";
					}
				}
			}
		} 
		
		
		JSONParser parser 	= new JSONParser();
		JSONArray usrObj 	= null;
		JSONArray metaObj 	= null;
		/*String geoDataArray = (String) map.get("geoDataArray");*/
		/*JSONArray geoJson = null;*/
		try {
			
			Map mainMap = new HashMap();
			mainMap.put("data_id", data_uid);
			mainMap.put("subject", subject);
			mainMap.put("share_yn",share_yn);
			mainMap.put("use_history", use_history);
			mainMap.put("map_disp_type", map_disp_type);
			mainMap.put("gioField", gioField);
			//2017 07 31 [개발팀] 수정
			if(!map.get("yearList").toString().equals("") || !map.get("yearList").toString().equals(null)){
				mainMap.put("yearList", map.get("yearList").toString());
			}else{
				mainMap.put("yearList", "");
			}
			//2017 07 31 [개발팀] 수정 종료
			
			mypageMapper.updateMyDataFile(mainMap);
			
			usrObj =(JSONArray)parser.parse(usr_data);
			/*geoJson = (JSONArray)parser.parse(geoDataArray);*/
			
			//삭제된 데이터 삭제하기
			//개수 가져오기 !!!
			if(map_disp_type.equals("location") ||map_disp_type.equals("ratio") ){
				int usrDataCount = mypageMapper.selectCountUsrData(data_uid);
				if(usrObj.size() < usrDataCount){
					for(int i = usrObj.size()+1; i <= usrDataCount ; i ++){
						Map delMap = new HashMap();
						delMap.put("data_uid", data_uid);
						delMap.put("SEQ", i);
						mypageMapper.deleteUsrGeoData(delMap);
					}
				}
			}
			for(int i = 0; i< usrObj.size(); i ++){
				Map usrMap = new HashMap();
				
				JSONObject usrSortMap = new  JSONObject();
				Map treeMap = new TreeMap();
				
				Map usr_Map = (Map)usrObj.get(i);
				Vector usr_Vector = new Vector(usr_Map.keySet());
				Collections.sort(usr_Vector);
				
				int j =0;
				Iterator usr_it = usr_Vector.iterator();
				
				while(usr_it.hasNext()){
					String element =(String)usr_it.next();
					treeMap.put(element, usr_Map.get(element));
				}
				usrSortMap.putAll(treeMap);
				/*usrMap.put("usr_data", usrObj.get(i).toString());*/
				usrMap.put("usr_data", usrSortMap.toString());
				usrMap.put("data_uid", data_uid);
				usrMap.put("SEQ",i+1);
				
				if(map_disp_type.equals("location") ||map_disp_type.equals("ratio") ){
					// 2016.12.02 시큐어코딩 삭제
					List list = new ArrayList();
					Iterator keys = treeMap.keySet().iterator();
					while(keys.hasNext()){
						list.add(keys.next());
					}
					usrMap.put("geo_x", treeMap.get(list.get(list.size()-4)).toString());
					usrMap.put("geo_y", treeMap.get(list.get(list.size()-3)).toString());
					usrMap.put("tot_reg_cd", treeMap.get(list.get(list.size()-2)).toString());
					usrMap.put("adm_cd",treeMap.get(list.get(list.size()-2)).toString().substring(0, 7));
					usrMap.put("adm_nm",treeMap.get(list.get(list.size()-1)).toString());
					mypageMapper.updateUsrGeoData(usrMap);
				}else{
					mypageMapper.updateUsrData(usrMap);
				}
				
				/*JSONObject geoData = (JSONObject) geoJson.get(i);
				usrMap.put("ADM_CD",geoData.get("ADM_CD").toString());
				usrMap.put("geo_x", geoData.get("GEO_X").toString());
				usrMap.put("geo_y", geoData.get("GEO_Y").toString());
				usrMap.put("TOT_REG_CD", geoData.get("TOT_REG_CD").toString());*/
				
				
			}
			
			metaObj =(JSONArray)parser.parse(metaData);
			
			for(int i = 0;i<metaObj.size();i++){
				Map metaMap = (Map) metaObj.get(i);
				/*Iterator metaIt= metaMap.entrySet().iterator();*/
				Vector v = new Vector(metaMap.keySet());
				Collections.sort(v);
				Iterator metaIt = v.iterator();
				
				int j = 0;
				while(metaIt.hasNext()){
					// 2016.12.02 시큐어코딩 삭제
					/*Map.Entry metaEntry = (Map.Entry)metaIt.next();
					Map paramMap = new HashMap();
					paramMap.put("col_id", metaEntry.getKey());
					paramMap.put("col_nm", metaEntry.getValue());
					paramMap.put("data_id", data_uid);*/
					String element = (String)metaIt.next();
					Map paramMap = new HashMap();
					
					paramMap.put("col_id",element);
					paramMap.put("col_nm",metaMap.get(element));
					paramMap.put("data_id", data_uid);
					
					if(dispData[j].equals("true")){
						if(tooltipSetting[j].equals("true")){
							paramMap.put("CHECK_TYPE", "3");
						}else{
							paramMap.put("CHECK_TYPE", "1");
						}
					}else{
						if(tooltipSetting[j].equals("true")){
							paramMap.put("CHECK_TYPE", "2");
						}else{
							paramMap.put("CHECK_TYPE", "0");
						}
					}
					j++;
					
					mypageMapper.updateMetaData(paramMap);
				}
				
			}
			
			//이제 열이 바뀌었으니 header 부분을 지우는 쿼리 실행
			//delete start
			Map allData = mypageMapper.selectMyDataInfo(data_uid);
			
			ArrayList headerList = (ArrayList)allData.get("metaData");
			ArrayList usrList = (ArrayList)allData.get("uploadData");
			Map usrDatas = (Map) usrList.get(0);
			JSONObject usrMap = (JSONObject)parser.parse(usrDatas.get("USR_DATA").toString());
			
			
			for(int i =0; i<headerList.size();i++){
				Boolean hasKey = false;
				Map headerMap = (Map) headerList.get(i);
				String hkey = (String) headerMap.get("COL_ID");
				Iterator ukey = usrMap.keySet().iterator();
				while(ukey.hasNext()){
					String ukeyValue = (String) ukey.next();
					if(ukeyValue.equals(hkey)){
						hasKey = true;
					}
				}
				
				if(hasKey == false){
					// 2016.12.02 시큐어코딩 삭제
					Map deleteMetaMap = new HashMap();
					deleteMetaMap.put("data_id", data_uid);
					deleteMetaMap.put("col_id", hkey);
					mypageMapper.deleteColId(deleteMetaMap);
				}
			}
			
			
		
		} 
		//2017.12.04 [개발팀] 시큐어코딩
    	catch (IllegalArgumentException e) {
    		logger.info("서버에서 처리중 에러가 발생했습니다.");
    	}
		catch (Exception e) {
			//2015-12-03 시큐어코딩
			logger.info(StringUtil.getErrMsg()+e);
			//e.printStackTrace();
			
			if(data_uid != null) {
				data_uid = null;
			}
			
			if(subject != null) {
				subject = null;
			}
			
			if(usr_data != null) {
				usr_data = null;
			}
			
			if(metaData != null) {
				metaData = null;
			}
			
			if(parser != null) {
				parser = null;
			}
			
			if(usrObj != null) {
				usrObj = null;
			}
			
			if(metaObj != null) {
				metaObj = null;
			}
		}
		
		
	
	}
	
	
	public void newSaveMyData(Map map) throws SQLException{
		
		Calendar date = Calendar.getInstance();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmssS");
		SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp ts = new Timestamp(date.getTimeInMillis());
		String idDate = df.format(date.getTimeInMillis());
		String nowDate = dfs.format(date.getTimeInMillis());
		/*date.add(date.DAY_OF_YEAR, 14);*/
		date.add(date.MONTH, 6);
		String endDate = dfs.format(date.getTimeInMillis());
		
		String subject 	= (String)map.get("subject");
		String usr_id = (String) map.get("member_id");
		String member_nm = (String) map.get("member_nm");
		
		/*String data_id = getMD5(usr_id)+"_"+idDate;*/
		String data_id = StringUtil.getRandomString(32) + "_" + idDate ;
		String usr_data = (String)map.get("usr_data");
		String metaData = (String)map.get("meta_data");
		
		String file_nm_real = (String)map.get("file_nm_real");
		
		Map dispMap = new HashMap();
		String map_disp_type = (String)map.get("map_disp_type");
		String dispString = (String)map.get("dispData");
		String tooltipString = (String)map.get("tooltipSetting");
		String rdOptions = (String) map.get("rdOption");
		String gioField = (String)map.get("gioField");
		String share_grant_manager_id="";
		
		String dispData[] = dispString.split(",");
		String tooltipSetting[] = tooltipString.split(",");
		String tot_type = map.get("tot_type").toString();
		String share_yn = "N";
		String use_history = "N";
		
		if(rdOptions != null){
			String[] rdOption = rdOptions.split(",");
			for(int i =0;i<rdOption.length;i++){
				if(rdOption[i].equals("shared")){
					share_yn = "Y";
				}else if(rdOption[i].equals("useHistory")){
					use_history = "Y";
				}
			}
		}
		
		Map mainData= new HashMap();
		mainData.put("data_id", data_id);
		mainData.put("usr_id", usr_id);
		mainData.put("member_nm",member_nm);
		mainData.put("share_yn", share_yn);
		mainData.put("use_history", use_history);
		mainData.put("data_title", subject);
		mainData.put("map_disp_type", map_disp_type);
		mainData.put("share_grant_manager_id", share_grant_manager_id);
		mainData.put("upload_dt", nowDate);
		mainData.put("start_dt", nowDate);
		mainData.put("end_dt", endDate);
		mainData.put("file_nm_real", file_nm_real);
		mainData.put("tot_type", tot_type);
		mainData.put("gioField", gioField);
		//2017 07 31 [개발팀] 수정
		if(!map.get("yearList").toString().equals("") || !map.get("yearList").toString().equals(null)){
			mainData.put("yearList", map.get("yearList").toString());
		}else{
			mainData.put("yearList", "");
		}
		//2017 07 31 [개발팀] 수정 종료
		//mainData Insert
		mypageMapper.insertNewSaveMyData(mainData);
		
		JSONParser parser 	= new JSONParser();
		JSONArray usrObj 	= null;
		JSONArray metaObj 	= null;
		JSONArray geoObj = null;
		
		String geoDataArray = (String) map.get("geoDataArray");
		JSONArray geoJson = null;
		try{
			usrObj =(JSONArray)parser.parse(usr_data);
			geoJson = (JSONArray)parser.parse(geoDataArray);
			
			for(int i = 0; i< usrObj.size(); i ++){
				JSONObject geoData = (JSONObject) geoJson.get(i);
				Map usrMap = new HashMap();
				usrMap.put("usr_data", usrObj.get(i).toString());
				usrMap.put("usr_data_id", data_id);
				usrMap.put("SEQ",i+1);
				if(geoData.get("ADM_CD").toString().length() > 7){
					usrMap.put("ADM_CD",geoData.get("ADM_CD").toString().subSequence(0, 7));
				}else{
					usrMap.put("ADM_CD",geoData.get("ADM_CD").toString());
				}
				
				usrMap.put("geo_x", geoData.get("GEO_X").toString());
				usrMap.put("geo_y", geoData.get("GEO_Y").toString());
				usrMap.put("TOT_REG_CD", geoData.get("TOT_REG_CD").toString());
				//usrData update
				mypageMapper.insertNewSaveUsrData(usrMap);
			}
			
		}catch(SQLException | ParseException e){
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		
		try {
			metaObj =(JSONArray)parser.parse(metaData);
			for(int i = 0;i<metaObj.size();i++){
				Map metaMap = (Map) metaObj.get(i);
				
				//Iterator metaIt= metaMap.entrySet().iterator();
				Vector v = new Vector(metaMap.keySet());
				Collections.sort(v);
				Iterator metaIt = v.iterator();
				
				
				int j = 0;
				while(metaIt.hasNext()){
					/*Map.Entry metaEntry = (Map.Entry)metaIt.next();*/
					Map paramMap = new HashMap();
					String element = (String)metaIt.next();
					paramMap.put("col_id",element);
					paramMap.put("col_nm",metaMap.get(element));
					paramMap.put("data_id", data_id);
					
					/*paramMap.put("col_id", metaEntry.getKey());
					paramMap.put("col_nm", metaEntry.getValue());
					paramMap.put("data_id", data_id);*/
					
					if(dispData[j].equals("true")){
						if(tooltipSetting[j].equals("true")){
							paramMap.put("CHECK_TYPE", "3");
						}else{
							paramMap.put("CHECK_TYPE", "1");
						}
					}else{
						if(tooltipSetting[j].equals("true")){
							paramMap.put("CHECK_TYPE", "2");
						}else{
							paramMap.put("CHECK_TYPE", "0");
						}
					}
					j++;
					
					mypageMapper.insertNewMetaData(paramMap);
				}
			}
			
		} 
		//2017.12.04 [개발팀] 시큐어코딩
    	catch (IllegalArgumentException e) {
    		logger.info("서버에서 처리중 에러가 발생했습니다.");
    	}
		catch (Exception e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		
		
		
		
	}
	
	public void deleteMyData(String data_id,String usr_id) throws SQLException{
		
		
	try {
			long dataTotalSize = mypageMapper.selectMyDataTotalSize(usr_id);
			Map map = mypageMapper.selectMyDataInfo(data_id);
			//map에서 fileName이 없지 않으면 삭제 로직을 추가하는걸로?
			Map maindata = (Map) map.get("mainData");
			long file_sz = Long.parseLong(maindata.get("FILE_SZ").toString());
			long totalSize = dataTotalSize - file_sz;
			
			if(totalSize < 0){
				totalSize = 0;
			}
			
			mypageMapper.updateMyDataTotalSize(usr_id, totalSize);
		} 
		//2017.12.04 [개발팀] 시큐어코딩
		catch (IllegalArgumentException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		catch (Exception e) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		
		mypageMapper.DeleteMyDataFile(data_id,usr_id);
	}
	
	
	@Override
	public List<Object> getMainUploadList(HttpServletRequest request) throws SQLException {      
	      String last_num = (String)request.getParameter("last_num");
	     return mypageMapper.selectMainUploadList(last_num);
	}

	public Map selectListMyData(String index,String usr_id) throws SQLException{		
		int page = Integer.parseInt(index);
		int count = mypageMapper.SelectListMyDataCount(usr_id);
		int pageCount = (int) Math.ceil((double)count/(double)5);
		int startPage = (page-1)/5 * 5+1;
		int endPage = startPage + 5 -1;
		
		if(endPage > pageCount){
			/*endPage =startPage +( endPage - pageCount);*/
			endPage = pageCount;
		}
		
		int startRow = ((page -1) *5)+1;
		int endRow = startRow + 5 -1;
		
		Map selectMap = new HashMap();
		Map dataMap = new HashMap();
		selectMap.put("usr_id", usr_id);
		selectMap.put("startRow", Integer.toString(startRow));
		selectMap.put("endRow", Integer.toString(endRow));
		//최대 보여줄 개수 4개씩
		List list = mypageMapper.SelectListMyData(selectMap);
		
		dataMap.put("list", list);
		dataMap.put("page",page);
		dataMap.put("count", count);
		dataMap.put("pageCount", pageCount);
		dataMap.put("startPage", startPage);
		dataMap.put("endPage", endPage);
		
		return dataMap;
	}
	
	public Map selectMyData(String data_id) throws SQLException{
		return mypageMapper.selectMyDataInfo(data_id);
	}
	
	public List selectListMyDataApi(Map mapParameter) throws SQLException{
		List list = mypageMapper.SelectListMyData(mapParameter);
		return list;
	}
	
	public Map getMydataFile(String data_id) throws SQLException{
		Map retMap = new HashMap();
		Map excelData = new HashMap();
		excelData = mypageMapper.selectMyDataInfo(data_id);
		
		Map mainData = (Map)excelData.get("mainData");
		String fileName = (String) mainData.get("FILE_NM_REAL");
		
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		
		
		try {
			ArrayList makeData = getMyDataToArrayList(excelData);
			
			for (int i =0; i < makeData.size();i++){
				
				HSSFCell cell = null;
				HSSFRow row = null;
				row = sheet.createRow(i);
				ArrayList rowList = (ArrayList) makeData.get(i);
				for(int j = 0; j < rowList.size(); j++){
					cell = row.createCell(j);
					if(rowList.get(j)==null){
						cell.setCellValue("");
					}else{
						cell.setCellValue(rowList.get(j).toString());
					}
				}
			}
		} 
		//2017.12.04 [개발팀] 시큐어코딩
		catch (IllegalArgumentException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		catch (ParseException e) {
			// 2015-12-03 시큐어코딩
			logger.info(StringUtil.getErrMsg()+e);
			//e.printStackTrace();
						
			if(excelData != null) {
				excelData = null;
			}
						
			if(mainData != null) {
				mainData = null;
			}
						
			if(fileName != null) {
				fileName = null;
			}
						
			if(workbook != null) {
				workbook = null;
			}
						
			if(sheet != null) {
				sheet = null;
			}
		}
		retMap.put("file", workbook);
		retMap.put("fileName", fileName);
		return retMap;
		
	}
	
	public Map getMySHPFile(String data_id) throws SQLException, FactoryException, ParseException, com.vividsolutions.jts.io.ParseException, IOException {
		
		Map retMap = new HashMap();
		Map map=mypageMapper.selectMyDataInfo(data_id);
		Map mainMap = (Map) map.get("mainData");
		ArrayList uploadDataList = (ArrayList) map.get("uploadData");
		ArrayList metaDataList = (ArrayList)map.get("metaData");
		JSONParser parser = new JSONParser();
		String fileNM = getFileName(mainMap.get("FILE_NM_REAL").toString());
		
		SimpleFeatureTypeBuilder sftb = new SimpleFeatureTypeBuilder();
		// UTM-K EPSG:5179
		String strUtmkWKT = "PROJCS[\"UTM-K\","
						+ "GEOGCS[\"GCS_ITRF_2000\","
						+ "DATUM[\"D_ITRF_2000 (EPSG ID 9028080)\","
						+ "SPHEROID[\"GRS_1980 (EPSG ID 9021980)\",6378137.0,298.257222101]],"
						+ "PRIMEM[\"Greenwich\",0.0],"
						+ "UNIT[\"degree\",0.017453292519943295],"
						+ "AXIS[\"Longitude\",EAST],"
						+ "AXIS[\"Latitude\",NORTH]],"
						+ "PROJECTION[\"Transverse_Mercator\"],"
						+ "PARAMETER[\"central_meridian\",127.5],"
						+ "PARAMETER[\"latitude_of_origin\",38.0],"
						+ "PARAMETER[\"scale_factor\",0.9996],"
						+ "PARAMETER[\"false_easting\",1000000.0],"
						+ "PARAMETER[\"false_northing\",2000000.0],"
						+ "UNIT[\"m\",1.0],"
						+ "AXIS[\"x\",EAST],"
						+ "AXIS[\"y\",NORTH]]";
		logger.info("strUtmkWKT = " + strUtmkWKT);
		CRSFactory crsFactory = ReferencingFactoryFinder.getCRSFactory( null );
		CoordinateReferenceSystem crs = crsFactory.createFromWKT( strUtmkWKT ); 
		
		sftb.setName( "UTM-k" );
		sftb.setCRS( crs );
		
		
		if(mainMap.get("TOT_TYPE").toString().equals("1") || mainMap.get("TOT_TYPE").toString().equals("2")||mainMap.get("TOT_TYPE").toString().equals("3")||mainMap.get("TOT_TYPE").toString().equals("4")){
			sftb.add("polygonProperty", MultiPolygon.class);
		}else{
			sftb.add( "Location", Point.class );
		}
	
		//이제 이 밑에 나오는거는 dispData와 ToolTipSettingData? 넣어주면 되나요?
		/*sftb.add( "sido_nm", String.class );
		sftb.add( "sido_cd", Integer.class );*/
		
	
		
		/**/
		//집계가 된 데이터의 경우 Polygon mainMap.TOT_TYPE.equals(1) or 2 or 3 or 4
		/*sftb.add("Location",MultiPolygon.class);*/
	
		/*final SimpleFeatureType TYPE = sftb.buildFeatureType();*/
		SimpleFeatureType TYPE = null;
		
		// Feature 리스트
		List<SimpleFeature> features = new ArrayList<SimpleFeature>();
		
		// 추가된 Data를 이용하여 Feature 를 생성한다.
		SimpleFeature feature = null;
		
		
		
		
		for(int i = 0;i<uploadDataList.size();i++){
			Map usrDatasMap = (Map)uploadDataList.get(i);
			int adm_cd = Integer.parseInt(usrDatasMap.get("ADM_CD").toString());
			Map geoMap = new HashMap();
			
			if(mainMap.get("TOT_TYPE").toString().equals("1")|| 
			   mainMap.get("TOT_TYPE").toString().equals("2")||
			   mainMap.get("TOT_TYPE").toString().equals("3")||
			   mainMap.get("TOT_TYPE").toString().equals("4")){
				
				
				//시도
				if(mainMap.get("TOT_TYPE").toString().equals("1")){
					geoMap = mypageKairos.selectSIDOGEO(usrDatasMap.get("ADM_CD").toString());
				}else if(mainMap.get("TOT_TYPE").toString().equals("2")){
					geoMap = mypageKairos.selectSGGBORD(usrDatasMap.get("ADM_CD").toString());
				}else if(mainMap.get("TOT_TYPE").toString().equals("3")){
					geoMap = mypageKairos.selectADMBORD(usrDatasMap.get("ADM_CD").toString());
				}else{
					geoMap = mypageKairos.selectTOTREGBORD(usrDatasMap.get("TOT_REG_CD").toString());
				}
				
				logger.info(geoMap.toString());
				
				String readLine = geoMap.get("lighten_bord").toString();
				logger.info("readLine = "+ readLine);
				
				JSONObject usrMap = (JSONObject)parser.parse(usrDatasMap.get("USR_DATA").toString());
				
				ArrayList dispData = new ArrayList();
				for(int j = 0; j <metaDataList.size();j++){
					Map metaMap = (Map) metaDataList.get(j);
					String colId = metaMap.get("COL_ID").toString();
					String colNm = metaMap.get("COL_NM").toString();
					if(i==0){
						// 2016.12.02 시큐어코딩 삭제
						logger.info(j + " = " + colNm);
						/*sftb.add(colId, String.class );*/
						sftb.add(new String(colNm.getBytes("EUC-KR"), "ISO-8859-1"),String.class);
					}
					
					dispData.add(usrMap.get(colId).toString());
				}
				if(i==0){
					TYPE = sftb.buildFeatureType();
				}
				// 2016.12.02 시큐어코딩 삭제
				
				/*String dispData = usrMap.get(colId).toString();*/
				/*feature = createPointFeature(TYPE,adm_cd,dispData,geo_x,geo_y);*/
				feature = createLineString(TYPE, adm_cd, dispData, readLine);
				features.add( feature );
				
			}else{
				String geo_X = usrDatasMap.get("GEO_X").toString();
				String geo_Y = usrDatasMap.get("GEO_Y").toString();
				if(geo_X.indexOf(".") > -1){
					geo_X = geo_X.split("\\.")[0];
				}
				if(geo_Y.indexOf(".") > -1){
					geo_Y = geo_Y.split("\\.")[0];
				}
				double geo_x = Integer.parseInt(geo_X);
				double geo_y = Integer.parseInt(geo_Y);
				logger.info(geo_x +" :: "+ geo_y);
				JSONObject usrMap = (JSONObject)parser.parse(usrDatasMap.get("USR_DATA").toString());
				ArrayList dispData = new ArrayList();
				for(int j = 0; j <metaDataList.size();j++){
					Map metaMap = (Map) metaDataList.get(j);
					String colId = metaMap.get("COL_ID").toString();
					String colNm = metaMap.get("COL_NM").toString();
					if(i==0){
						/*sftb.add(colId, String.class );*/
						sftb.add(new String(colNm.getBytes("EUC-KR"), "ISO-8859-1").replace("Location", "location"),String.class);
					}
					if(usrMap.get(colId) == null){
						dispData.add("");
					}else{
						dispData.add(usrMap.get(colId).toString());
					}
				}
				if(i==0){
					TYPE = sftb.buildFeatureType();
				}
				
				/*dispData = new String(dispData.toString().getBytes("EUC-KR"),"EUC-KR");
				// 2016.12.02 시큐어코딩 삭제*/
				//code는 adm_cd 값 name은 선택된 disp값을 넣는다.
				feature = createPointFeature(TYPE,adm_cd,dispData,geo_x,geo_y);
				features.add( feature );
			}
			
		}
		
		createShapeFile(TYPE,features,fileNM);
		
		retMap.put("file",shapeFileZip(fileNM));
		retMap.put("fileName",fileNM+".zip");
		return retMap;
	}
	
	
	public SimpleFeature createPointFeature(SimpleFeatureType type, int code,  ArrayList dispData, double x, double y)
	{
		// 지오메트리 생성 팩토리, point, polyline ... 을 생성한다.
		GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();
		
		// Feature 생성 빌더
		SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(type);
		
		// 지오메트리팰토리를 활용 하여 포인트를 생성한다.
		Point point = geometryFactory.createPoint( new Coordinate(x, y) );
					  
		// 피쳐빌드에 생성 포인트및 attribution을 추가 한다.
		featureBuilder.add( point );
		for(int i = 0; i < dispData.size(); i ++){
			featureBuilder.add( dispData.get(i));
		}
		
		
		/*featureBuilder.add( code );*/
		
		return featureBuilder.buildFeature( null );
	}
	
	public SimpleFeature createLineString(SimpleFeatureType type, int code, ArrayList dispData,String readLine ) throws com.vividsolutions.jts.io.ParseException{
		// 지오메트리 생성 팩토리, point, polyline ... 을 생성한다.
				GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();
				
				// Feature 생성 빌더
				SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(type);
				
				WKTReader reader = new WKTReader( geometryFactory );
				MultiPolygon multiPolygon = (MultiPolygon) reader.read(readLine);
				featureBuilder.add(multiPolygon);

				
				// 피쳐빌드에 생성 포인트및 attribution을 추가 한다.
				/*featureBuilder.add( point );*/
				// 2016.12.02 시큐어코딩 삭제
				for(int i = 0; i < dispData.size(); i ++){
					
					featureBuilder.add( dispData.get(i).toString());
				}
				
				
				/*featureBuilder.add( code );*/
				
				return featureBuilder.buildFeature( null );
	}
	
	public void createShapeFile(SimpleFeatureType type, List<SimpleFeature> features,String fileNM) throws IOException {
		/*File fileShape = new File("D:\\DATA\\logs\\shpfile\\test.shp");*/
		
		// 2016.12.02 시큐어코딩 삭제
		
		/*File fileShape = new File("C:\\test\\upload\\userData\\"+fileNM+".shp");*/
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String file_path = props.getProperty("Globals.MyData.File.Path");
		File fileShape = new File(file_path+"/"+fileNM+".shp");
		
		ShapefileDataStoreFactory dataStoreFactory = new ShapefileDataStoreFactory();

		
		
		Map<String, Serializable> params = new HashMap<String, Serializable>();
        params.put("url", fileShape.toURI().toURL());
        params.put("create spatial index", Boolean.TRUE);
        params.put("charset", "CP949");
        ShapefileDataStore newDataStore = (ShapefileDataStore) dataStoreFactory.createNewDataStore(params);
        
        newDataStore.createSchema( type );
        
        Transaction transaction = new DefaultTransaction("create");
        
        String typeName = newDataStore.getTypeNames()[0];
        
        SimpleFeatureSource featureSource = newDataStore.getFeatureSource(typeName);
        
        SimpleFeatureType SHAPE_TYPE = featureSource.getSchema();
        
        
     // 2016.12.02 시큐어코딩 삭제
        
        if (featureSource instanceof SimpleFeatureStore) {
            SimpleFeatureStore featureStore = (SimpleFeatureStore) featureSource;
            
            /*
             * SimpleFeatureStore has a method to add features from a
             * SimpleFeatureCollection object, so we use the ListFeatureCollection
             * class to wrap our list of features.
             */
            SimpleFeatureCollection collection = new ListFeatureCollection(type, features);
            featureStore.setTransaction(transaction);
            try {
                featureStore.addFeatures(collection);
                transaction.commit();
                
            } 
            //2017.12.04 [개발팀] 시큐어코딩
    		catch (IllegalArgumentException e) {
    			logger.info("서버에서 처리중 에러가 발생했습니다.");
    		}
            catch (Exception problem) {
                //problem.printStackTrace();
            	logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
                transaction.rollback();
            } finally {
                transaction.close();
            }
        } else {
        	// 2016.12.02 시큐어코딩 삭제
        }
        
	}
	
	public File shapeFileZip(String fileNM) throws IOException{
		
		// 2016.12.02 시큐어코딩 삭제
		
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String file_path = props.getProperty("Globals.MyData.File.Path");
		
		String zipFileName = file_path+"/"+fileNM+".zip";
		//shp,shx,qix,prj,fix,dbf
		String[] files = new String[6];
		
		files[0] = file_path+"/"+fileNM+".shp";
		files[1] = file_path+"/"+fileNM+".shx";
		files[2] = file_path+"/"+fileNM+".qix";
		files[3] = file_path+"/"+fileNM+".prj";
		files[4] = file_path+"/"+fileNM+".fix";
		files[5] = file_path+"/"+fileNM+".dbf";
		
		byte[] buf = new byte[4096];
		
		//2017.12.04 [개발팀] 시큐어코딩
		ZipOutputStream out = null;
				
		try {
		    out = new ZipOutputStream(new FileOutputStream(zipFileName));
		 
		    for (int i=0; i<files.length; i++) {
		        FileInputStream in = new FileInputStream(files[i]);
		        Path p = Paths.get(files[i]);
		        String fileName = p.getFileName().toString();
		                 
		        ZipEntry ze = new ZipEntry(fileName);
		        out.putNextEntry(ze);
		           
		        int len;
		        while ((len = in.read(buf)) > 0) {
		            out.write(buf, 0, len);
		        }
		           
		        out.closeEntry();
		        in.close();
		 
		    }
		           
		    //out.close(); //2017.12.04 [개발팀] 시큐어코딩
		    
		    for(int i=0;i<files.length;i++){
		    	File f = new File(files[i]);
		    	f.delete();
		    }
		    
		} 
		//2017.12.04 [개발팀] 시큐어코딩
		catch (IllegalArgumentException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		catch (IOException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		//2017.12.04 [개발팀] 시큐어코딩
		finally {
			if (out != null) {
				 out.close();
			}
		}
		File zipFile = new File(zipFileName);
		return zipFile;		
	}
	
	public Map getSampleFile(String type){
		Map retMap = new HashMap();
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		 
		try {
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String file_path = props.getProperty("Globals.MyData.SampleFile.Path");
			String sampleFileName =file_path+"/sample/"+type;
			File sampleFile = new File(sampleFileName);
			
			
			retMap.put("file",sampleFile);
			retMap.put("fileName",type);
			
		} 
		//2017.12.04 [개발팀] 시큐어코딩
		catch (IllegalArgumentException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		
		
		return retMap;
		
	};
	
	public Map getKmlFile(String data_id) throws SQLException{
		Map retMap = new HashMap();
		String PROPERTY_PATH = "/globals.properties";
		
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		 
		try {
			
			Map datainfo = mypageMapper.selectMyDataMain(data_id);
			String fileName = datainfo.get("FILE_NM_LOGIC").toString();
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String file_path = props.getProperty("Globals.MyData.File.Path");
			String kmlName =file_path+"/"+fileName;
			File kmlFile = new File(kmlName);
			
			
			retMap.put("file",kmlFile);
			retMap.put("fileName",datainfo.get("FILE_NM_REAL").toString());
			
		} 
		//2017.12.04 [개발팀] 시큐어코딩
		catch (IllegalArgumentException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.");
		}
		
		
		return retMap;
		
	};
	
	public ArrayList getMyDataToArrayList(Map excelData) throws ParseException {
		
		ArrayList headerList = (ArrayList) excelData.get("metaData");
		ArrayList data = (ArrayList) excelData.get("uploadData");
		ArrayList usrDataList = new ArrayList();
		ArrayList makeData = new ArrayList();
		for(int i = 0;i<data.size();i++ ){
			Map usrData= (Map) data.get(i);
			usrDataList.add(usrData.get("USR_DATA"));
		}		
		
		
		
		for(int i = 0; i < usrDataList.size();i++){
			ArrayList rowData = new ArrayList();
			if(i == 0 ){
				ArrayList rowHeader = new ArrayList();
				for(int j = 0;j < headerList.size();j++){
					Map headerMap = (Map)headerList.get(j);
					rowHeader.add(headerMap.get("COL_NM"));
				}
				makeData.add(rowHeader);
			}
			JSONParser parser = new JSONParser();
			JSONObject usrMap = (JSONObject) parser.parse(usrDataList.get(i).toString());
			for(int j = 0; j<headerList.size();j++){
				Map headerMap = (Map) headerList.get(j);
				rowData.add(usrMap.get(headerMap.get("COL_ID")));
			}
			makeData.add(rowData);
		}
		
		return makeData;
	}

	public void getFileData(String file_path,String file_nm_logic,String file_nm_real){
		File file = new File("C:"+file_path+"/"+file_nm_logic);
		FileInputStream fis = null;
		try{
			fis = new FileInputStream(file);
			
		}catch(IOException e){
			// 2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info(StringUtil.getErrMsg()+e);
				
			if(file != null) {
				file = null;
			}
		}finally { //2017.12.04 [개발팀] 시큐어코딩
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
				}
			}
		}
	}
	
	/**
	 * 나의 데이터 리스트
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMyDataList(Map mapParameter) throws SQLException{
		return mypageMapper.selectMyDataList(mapParameter);
	}
	
	/**
	 * 나의 데이터 총 개수
	 * @param mapParameter
	 * @exception Exception
	 */	
	public int myDataTotalCount(Map mapParameter) throws SQLException {
		return mypageMapper.myDataTotalCount(mapParameter);
	}
	
	/**
	 * 공유 데이터 리스트
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectSharedDataList(Map mapParameter) throws SQLException{
		return mypageMapper.selectSharedDataList(mapParameter);
	}
	
	/**
	 * 공유 데이터 총 개수
	 * @param mapParameter
	 * @exception Exception
	 */	
	public int sharedDataTotalCount(Map mapParameter) throws SQLException {
		return mypageMapper.sharedDataTotalCount(mapParameter);
	}
	
	public Map selectMyKmlData(String file_path,String file_nm_logic,String file_nm_real) throws SQLException, ParserConfigurationException, SAXException, TransformerException{
		
		Map retMap = new HashMap();
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		 
		try {
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			
			String sampleFileName =file_path+"/"+file_nm_logic;
			File kmlFile = new File(sampleFileName);
			
			
			DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
			DocumentBuilder parser = f.newDocumentBuilder();
			org.w3c.dom.Document xmlDoc = parser.parse(kmlFile);
		
			Element root = xmlDoc.getDocumentElement();
			
			
			TransformerFactory factory = TransformerFactory.newInstance();
			Transformer former = factory.newTransformer();
			former.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			former.setOutputProperty(OutputKeys.INDENT,"yes");
			StringWriter sw = new StringWriter();
			StreamResult result = new StreamResult(sw);
			DOMSource source = new DOMSource(xmlDoc);
			former.transform(source, result);
			// 2016.12.02 시큐어코딩 삭제
			
			retMap.put("content", sw.toString());
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			// 2016-12-01 시큐어코딩
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
		return retMap;
	}
	
	
	public String viewKmlFileCP(String data_id,String member_id) throws SQLException, IOException{
		
		String retStr = "";
		
		Map myData = mypageMapper.selectMyDataInfo(data_id);
		Map mainData = (Map)myData.get("mainData");
		String fileName = mainData.get("FILE_NM_LOGIC").toString();
		String filePath = mainData.get("FILE_PATH").toString();
		
		FileInputStream inputStream = null;
		FileOutputStream outputStream = null;
		FileChannel fcin = null;
		FileChannel fcount = null;
		try {
			inputStream = new FileInputStream(filePath+"/"+fileName);
			outputStream = new FileOutputStream(filePath+"/"+member_id+".kml_copy");
			
			fcin = inputStream.getChannel();
			fcount = outputStream.getChannel();
			
			long size = fcin.size();
			fcin.transferTo(0, size, fcount);
			
			fcount.close();
			fcin.close();
			//2017.12.04 [개발팀] 시큐어코딩
			//outputStream.close();
			//inputStream.close();
			retStr = member_id+".kml_copy";
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}finally{
			if(fcount != null){
				fcount.close();
			}
			if(fcin != null){
				fcin.close();
			}
			if(outputStream != null){
				outputStream.close();
			}
			if(inputStream != null){
				inputStream.close();
			}
		}
		
		return retStr;
	}
	
	public void updateMyKmlData(Map mapParameter) throws SQLException{
		
		Map paramMap = new HashMap();
		
		String data_uid = mapParameter.get("data_uid").toString();
		String subject = mapParameter.get("subject").toString();
		String rdOptions = (String) mapParameter.get("rdOption");
		// 2016.12.02 시큐어코딩 삭제
		String share_yn = "N";
		String use_history = "N";
		
		if(rdOptions != null){
			String[] rdOption = rdOptions.split(",");
			for(int i =0;i<rdOption.length;i++){
				
				Map myData = mypageMapper.selectMyDataInfo(data_uid);
				Map mainData = (Map)myData.get("mainData");
				
				if(rdOption[i].equals("shared")){
					
					if(mainData.get("SHARE_YN").toString().equals("Y")){
						share_yn = "Y";
					}else{
						share_yn = "W";
					}
					
				}else if(rdOption[i].equals("useHistory")){
					if(mainData.get("USE_HISTORY").toString().equals("Y")){
						use_history = "Y";
					}else{
						use_history = "W";
					}
				}
			}
		} 
		
		paramMap.put("data_id", data_uid);
		paramMap.put("subject", subject);
		paramMap.put("share_yn", share_yn);
		paramMap.put("use_history", use_history);
		
		mypageMapper.updateMyKmlData(paramMap);
		
		
	} 
	
	public long selectMyDataTotalSize(String usr_id) {
		
		long totalSize =0;
		try {
			totalSize = mypageMapper.selectMyDataTotalSize(usr_id);
			
			if(totalSize == -1){
				totalSize = 0;
			}
			
		} catch (SQLException e) {
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
		return totalSize;
	}
	
	public String convertToStr(String str, String encoding) throws IOException {
		  ByteArrayOutputStream requestOutputStream = null;
		  try{
			  requestOutputStream = new ByteArrayOutputStream();
			  requestOutputStream.write(str.getBytes(encoding));
		  }catch(IOException e){
			  logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		  }finally{
			if(requestOutputStream != null){
				requestOutputStream.close();
			}
		  }
		  return requestOutputStream.toString(encoding);
	}
}