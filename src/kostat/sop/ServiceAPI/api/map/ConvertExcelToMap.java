package kostat.sop.ServiceAPI.api.map;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * Created by htkim on 2014-10-21.
 * 엑셀파일을 Map<String, String> 자료형으로 변환 한다.
 */
public class ConvertExcelToMap {

//	private static final String [] fHeaderKey = {"id","name","tel","addr","uda","udb","udc","udd","ude","x","y"};
	private static final String [] fHeaderKey = {"name","addr","uda","udb","udc","udd","ude","x","y","aggcode"};

	private MultipartFile fMultipartFile;

	public ConvertExcelToMap(MultipartFile mf) {
		fMultipartFile = mf;
	}

	/**
	 * MultipartFile
	 * @return
	 * @throws IOException
	 * @throws InvalidFormatException
	 */
	public Map<String, Object> convert() throws InvalidFormatException, IOException {
		Workbook wb = createWorkBook(this.fMultipartFile);
		Map<String, Object> mapResult = new HashMap<String, Object>();

		readHeader(mapResult, wb);
		readBodys(mapResult, wb);

		return mapResult;
	}


	/**
	 * org.apache.poi 에서 제공되는 Workbook을 입력 받은 MultipartFile을 이용하여 생성 한다.
	 *
	 * @param file
	 * @return Workbook
	 * @throws IOException
	 * @throws InvalidFormatException
	 */
	private Workbook createWorkBook(MultipartFile file) throws IOException, InvalidFormatException {

		InputStream ins = file.getInputStream();
		return WorkbookFactory.create(ins);
	}

	/**
	 * 엑셀파일의 타이틀 부분을 읽어 드린다.
	 *
	 * 헤더 구성
	 * header: [
	 * 		{
	 * 			field : "id",
	 * 			title: "ID"
	 * 		}
	 * 	......
	 * ]
	 *
	 * @param result 변환 결과를 저장할 객체
	 * @param wb 엑셀 Workbook
	 */
	private void readHeader(Map<String, Object> result, Workbook wb) {
		String [] headerKey = fHeaderKey;
		List<Map<String, String>> hList = new ArrayList();
		Map mapTmp = null;

//		Map hObj = new HashMap<String, String>();
		result.put("header", hList);

		Sheet sheet = wb.getSheetAt(0);
		Row row = sheet.getRow(0);

		int i = 0, len = headerKey.length;

		if( row.getLastCellNum() != len ) {
			throw new NullPointerException("셀의 길이가 정확하지 않습니다.");
		}

		for ( ;i < len; i++) {
			mapTmp = new HashMap<String, String>();
			mapTmp.put("field",headerKey[i]);
			mapTmp.put("title",getValueFromCell(row.getCell(i)));
			hList.add(mapTmp);

//			mapTmp.put(headerKey[i], getValueFromCell(row.getCell(i)));
		}
	}

	/**
	 * 엑셀파일을 본문 부분을 읽어 들인다.
	 *
	 * 바디 구성
	 *	bodys: [
	 *		{
	 *			udb: "",
	 *			uda: "",
	 *			udd: "",
	 *			udc: "",
	 *			ude: "",
	 *			name: "(주)아워홈 잠실야구장점",
	 *			x: "962169.0",
	 *			y: "1946066.0",
	 *			tel: "02-413-3484",
	 *			id: "1.0",
	 *			addr: "서울특별시 송파구 잠실2동 10"
	 *		},
	 * @param result
	 * @param wb
	 */
	private void readBodys(Map<String, Object> result, Workbook wb) {

		List<Map<String, String>> bodys = new ArrayList<Map<String, String>>();

		result.put("bodys", bodys);

		Sheet sheet = wb.getSheetAt(0);
		Row row;
		Cell cell;
		String [] key = fHeaderKey;
		Map tmpMap = null;

		int rowNum = 1;
		int rowEnd = sheet.getLastRowNum();
		int colNum, colNumEnd = fHeaderKey.length;
		
		if (rowEnd > 500) {
			rowEnd = 500;
		}

		for( ;rowNum < rowEnd+1; rowNum++) {
			row = sheet.getRow(rowNum);
			tmpMap = new HashMap<String,String>();
			for(colNum=0; colNum < colNumEnd; colNum++) {
				cell = row.getCell(colNum);
				String value = "";
				if (cell != null && getValueFromCell(cell) != null) {
					cell.setCellType(Cell.CELL_TYPE_STRING);
					value = getValueFromCell(cell);
				}
				tmpMap.put(key[colNum], value);
			}
			bodys.add(tmpMap);
		}
	}

	/**
	 * 엑셀 셀에 있는 값을 String 타입으로 반환 한다.
	 *
	 * @param cell
	 * @return stringValue
	 */
	private String getValueFromCell(Cell cell) {
		Object obj = null;
		switch (cell.getCellType()) {
			case Cell.CELL_TYPE_STRING:
				obj = cell.getRichStringCellValue().getString();
				break;
			case Cell.CELL_TYPE_NUMERIC:
				if (DateUtil.isCellDateFormatted(cell)) {
					obj = cell.getDateCellValue();
				} else {
					obj = cell.getNumericCellValue();
				}
				break;
			case Cell.CELL_TYPE_BOOLEAN:
				obj = cell.getBooleanCellValue();
				break;
			case Cell.CELL_TYPE_FORMULA:
				obj = cell.getCellFormula();
				break;
			default:
				obj = "";
		}

		return String.valueOf(obj);
	}
}
