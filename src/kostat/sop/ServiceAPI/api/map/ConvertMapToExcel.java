package kostat.sop.ServiceAPI.api.map;

import com.neighborsystem.durian.restapi.model.NFData;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.util.*;

/**
 * Created by htkim on 2014-10-30.
 */
public class ConvertMapToExcel {

	private static final Log logger = LogFactory.getLog(ConvertMapToExcel.class);

	private NFData fConvertDatas;

	public ConvertMapToExcel(NFData datas) {
		this.fConvertDatas = datas;
	}

	/**
	 * NFData 에서 poi Workbook 으로 변환 시작.
	 * @return
	 */
	public Workbook convert() {
		if (logger.isDebugEnabled()) {
			logger.debug("ConvertMapToExcel [ Start ]");
			logger.debug("ConvertData : [ " + fConvertDatas + " ]");
		}

		// 변환 대상을 찾는다.
		Map<String,Object> result = getResultData();

		// 변환 대상에서 헤더 값을 찾는다.
		List liHeader;
		liHeader = getHeaderData(result);

		// 헤더를 엑셀 파일 만들기 편하게 데이터를 가공한다.
		Map mapHeader;
		mapHeader = convertTitleMap(liHeader);

		List liBodys;
		liBodys = getBodyData(result);

		Workbook wb = createHSSFWorkbook(mapHeader, liBodys);

//		Sheet sheet = wb.createSheet("새로운시트");
//		Row row = sheet.createRow(0);
//		Cell cell = row.createCell(0);
//		cell.setCellValue("테스트 입니다. 값이 보이나요?");

		if (logger.isDebugEnabled()) {
			logger.debug("ConvertMapToExcel [ End ]");
		}

		return wb;
	}

	private Workbook createHSSFWorkbook(Map header, List bodys) {
		Workbook workBook = new HSSFWorkbook();
		Sheet sheet = workBook.createSheet("사용자데이터"); // 시트명은 무엇으로 하나요?
		createTitle(workBook, sheet, header);
		createValues(workBook, sheet, bodys);
		// createTitle
		// createValues

//		createHeadCell( workBook, sheet, header );

		return workBook;
	}

	private Map<String, Object> getResultData() {
		String key = "result";
		if( fConvertDatas.containsKey(key)) {
			return (Map<String, Object>) fConvertDatas.get(key);
		} else {
			return fConvertDatas;
		}
	}

	private List getHeaderData(Map<String, Object> datas) {
		return (List) datas.get("header");
	}

	private List getBodyData(Map<String, Object> datas) {
		return (List) datas.get("bodys");
	}

	/**
	 * 엑셀 컬럼에 사용할 타이틀을 구성한다.
	 */
	private void createTitle(Workbook wb, Sheet sheet, Map<String, Object> header) {
		Row row;
		Cell cell;
		CellStyle csBorderLeft = createCellStyle(wb, CELL_BORDER_STYLE.KEY_LEFT);
		CellStyle csBorderMiddle = createCellStyle(wb, CELL_BORDER_STYLE.KEY_MIDDLE);
		CellStyle csBorderRight = createCellStyle(wb, CELL_BORDER_STYLE.KEY_RIGHT);
		int intRowNum = 0;

		HEAD_KEY [] arrHeadKey = HEAD_KEY.values();

		row = sheet.createRow( intRowNum );

		for( HEAD_KEY hkey : arrHeadKey )
		{
			cell = row.createCell( hkey.ordinal());
			cell.setCellValue( (String) header.get(hkey.name()) );
			if( hkey == HEAD_KEY.name )
			{
				cell.setCellStyle( csBorderLeft );
			}
			else if( hkey == HEAD_KEY.aggcode )
			{
				cell.setCellStyle( csBorderRight );
			}
			else
			{
				cell.setCellStyle( csBorderMiddle );
			}
		}
	}

	/**
	 * 엑셀 로우를 구성할 값을 Workbook에 채운다.
	 */
	private void createValues(Workbook wb, Sheet sheet, List datas) {
		Iterator<Map> itr = datas.iterator();
		HEAD_KEY [] arrHeadKey = HEAD_KEY.values();
		Map tmp;
		Row row;
		Cell cell;
		int intRowNum = 1;
		CellStyle csBorderLeft;
		CellStyle csBorderMiddle;
		CellStyle csBorderRight;
		CellStyle csDataFormatMiddleCenter;
		CellStyle csDataFormatMiddleRight;
		String value;

		csBorderLeft = createCellStyle( wb, CELL_BORDER_STYLE.BODY_VALUE_LEFT );
		csBorderMiddle = createCellStyle( wb, CELL_BORDER_STYLE.BODY_VALUE_MIDDLE );
		csBorderRight = createCellStyle( wb, CELL_BORDER_STYLE.BODY_VALUE_RIGHT );
		csBorderRight.setAlignment( CellStyle.ALIGN_CENTER );

		while( itr.hasNext() ) {
			tmp = itr.next();
			row = sheet.createRow( intRowNum );

			if( ! itr.hasNext() )
			{
				csBorderLeft = createCellStyle( wb, CELL_BORDER_STYLE.FINISH_LEFT );
				csBorderMiddle = createCellStyle( wb, CELL_BORDER_STYLE.FINISH_MIDDLE );
				csBorderRight = createCellStyle( wb, CELL_BORDER_STYLE.FINISH_RIGHT );
				csBorderRight.setAlignment( CellStyle.ALIGN_CENTER );
			}

			for( HEAD_KEY key : arrHeadKey) {
				cell = row.createCell(key.ordinal());
				value = (String) tmp.get(key.name());
				value = value.trim();

				switch (key) {
					case name:
						cell.setCellStyle(csBorderLeft);
						cell.setCellValue((String) tmp.get(key.name()));
						break;
//					case addr:
//						break;
//					case uda:
//						break;
//					case udb:
//						break;
//					case udc:
//						break;
//					case udd:
//						break;
//					case ude:
//						break;
					case x :
					case y :
						cell.setCellStyle(csBorderMiddle);
						if( value.equalsIgnoreCase("")) {
							cell.setCellValue(value);
						} else {
							cell.setCellValue(Integer.valueOf(value));
						}
						break;
					case aggcode:
						cell.setCellStyle(csBorderRight);
						cell.setCellValue(value);
						break;
					default:
						cell.setCellStyle(csBorderMiddle);
						cell.setCellValue(value);
				}

				sheet.autoSizeColumn( key.ordinal() );
				sheet.setColumnWidth( key.ordinal() , (sheet.getColumnWidth( key.ordinal() ) + 2000 ));
			}
			if( logger.isDebugEnabled() ) {
				logger.debug(tmp);
			}
			intRowNum++;
		}

	}


	private enum CELL_BORDER_STYLE
	{
		TITLE_LEFT
		, TITLE_MIDDLE
		, TITLE_RIGHT

		, KEY_LEFT
		, KEY_MIDDLE
		, KEY_RIGHT

		, BODY_VALUE_LEFT
		, BODY_VALUE_MIDDLE
		, BODY_VALUE_RIGHT

		, FINISH_LEFT
		, FINISH_MIDDLE
		, FINISH_RIGHT

	}

	private CellStyle createCellStyle( Workbook wb, CELL_BORDER_STYLE val )
	{
		CellStyle csCreated = wb.createCellStyle();
		switch(val)
		{

			case TITLE_LEFT:
				csCreated.setBorderTop( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderLeft( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderBottom( CellStyle.BORDER_THIN);
				csCreated.setAlignment( CellStyle.ALIGN_CENTER );
				break;
			case TITLE_MIDDLE:
				csCreated.setBorderTop( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderBottom( CellStyle.BORDER_THIN);
				csCreated.setAlignment( CellStyle.ALIGN_CENTER );
				break;
			case TITLE_RIGHT:
				csCreated.setBorderTop( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderRight( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderBottom( CellStyle.BORDER_THIN);
				csCreated.setAlignment( CellStyle.ALIGN_CENTER );
				break;
			case KEY_LEFT:
				csCreated.setBorderLeft( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderTop( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderRight( CellStyle.BORDER_THIN );
				csCreated.setBorderBottom( CellStyle.BORDER_THIN );
				csCreated.setAlignment( CellStyle.ALIGN_CENTER );
				break;
			case KEY_MIDDLE:
				csCreated.setBorderLeft( CellStyle.BORDER_THIN );
				csCreated.setBorderTop( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderRight( CellStyle.BORDER_THIN );
				csCreated.setBorderBottom( CellStyle.BORDER_THIN );
				csCreated.setAlignment( CellStyle.ALIGN_CENTER );
				break;
			case KEY_RIGHT:
				csCreated.setBorderLeft( CellStyle.BORDER_THIN );
				csCreated.setBorderTop( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderRight( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderBottom( CellStyle.BORDER_THIN );
				csCreated.setAlignment( CellStyle.ALIGN_CENTER );
				break;
			case BODY_VALUE_LEFT:
				csCreated.setBorderLeft( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderTop( CellStyle.BORDER_NONE );
				csCreated.setBorderRight( CellStyle.BORDER_THIN );
				csCreated.setBorderBottom( CellStyle.BORDER_DOTTED );
				break;
			case BODY_VALUE_MIDDLE:
				csCreated.setBorderLeft( CellStyle.BORDER_THIN );
				csCreated.setBorderTop( CellStyle.BORDER_NONE );
				csCreated.setBorderRight( CellStyle.BORDER_THIN );
				csCreated.setBorderBottom( CellStyle.BORDER_DOTTED );
				break;
			case BODY_VALUE_RIGHT:
				csCreated.setBorderLeft( CellStyle.BORDER_THIN );
				csCreated.setBorderTop( CellStyle.BORDER_NONE );
				csCreated.setBorderRight( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderBottom( CellStyle.BORDER_DOTTED );
				break;
			case FINISH_LEFT:
				csCreated.setBorderLeft( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderTop( CellStyle.BORDER_NONE );
				csCreated.setBorderRight( CellStyle.BORDER_THIN );
				csCreated.setBorderBottom( CellStyle.BORDER_MEDIUM );
				break;
			case FINISH_MIDDLE:
				csCreated.setBorderLeft( CellStyle.BORDER_THIN );
				csCreated.setBorderTop( CellStyle.BORDER_NONE );
				csCreated.setBorderRight( CellStyle.BORDER_THIN );
				csCreated.setBorderBottom( CellStyle.BORDER_MEDIUM );
				break;
			case FINISH_RIGHT:
				csCreated.setBorderLeft( CellStyle.BORDER_THIN );
				csCreated.setBorderTop( CellStyle.BORDER_NONE );
				csCreated.setBorderRight( CellStyle.BORDER_MEDIUM );
				csCreated.setBorderBottom( CellStyle.BORDER_MEDIUM );
				break;
		}

		return csCreated;
	}

	/**
	 * 클라이언트에서 전달받은 데이터에서 엑셀 타이틀에 사용될 값을 추출 한다.
	 * key : field
	 * value : title
	 *
	 * @param li
	 * @return
	 */
	private Map<String, Object> convertTitleMap(List<Map<String, Object>> li) {
		Iterator<Map<String, Object>> itr = li.iterator();
		Map<String, Object> mapReturn;

		if( !itr.hasNext() ) {
			return null;
		}

		mapReturn = new HashMap<String, Object>();
		Map<String, Object> temp;
		String key, value;

		while(itr.hasNext()) {
			temp = itr.next();
			key = (String) temp.get("field");
			value = (String) temp.get("title");
			mapReturn.put(key, value);
		}

		return mapReturn;
	}

	private enum HEAD_KEY {
		name
		, addr
		, uda
		, udb
		, udc
		, udd
		, ude
		, x
		, y
		, aggcode
	}

}
