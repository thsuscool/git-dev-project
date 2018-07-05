package kr.co.offton.jdf.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import kr.co.offton.jdf.basis.GeneralObject;
import kr.co.offton.pdf.basis.LData;

/**
 * �������ϰ� ��õ� ����� �����ϴ� Ŭ����
 * @author Offton
 */
public class ExcelUtil extends GeneralObject {
	/**
	 * �Ծ��� �ۼ��� ���������� LData��ü�� (K,V)���·� ��ȯ�Ѵ�.
	 * 
	 * ���������� ������ ���� �Ծ��� �����.
	 *    1. �� �� ���� ��ũ��Ʈ�� ���� �� �ִ�.
	 *    2. �� ��Ʈ�� ���뿵���� �����Ϳ����� ������ 
	 *       �� ������ �ۼ����� ���� �� ��� ���еȴ�.
	 *    3. ���뿵���� �Ʒ��� ���� �����ȴ�.
	 *       a. �׸�� | �׸��ڵ� | �׸� | ���
	 *    4. ������ ������ ���� ��(n)�� �׸��� �ѱ۸�, ���� ��(n+1)�� �׸��� ������
	 *       �� ���� ��(n+2)���� �����Ͱ� �����Ѵ�.
	 *    5. ������ ������ ù��° ���� ��������� �������� ����� �����Ѵ�.
	 *            
	 * @param tempFilePath �������ϰ��
	 * @return ��ӵ� ������������� LDataŸ������ ��ȯ�� ��ü
	 */
	public static List convertToLDatas(String tempFilePath) {

		int sheetCount                  = 0;	
		Workbook workbook               = null;
		List commonParams               = null;
		List commonFieldNames           = null;
		List fieldNames                 = null;
		List exportList                 = null;
		int exportIdx                   = 0;  		
		
		try {
			File xlsFile            = new File(tempFilePath);
			
			// ���� ��ü �ν��Ͻ� ��
			if (xlsFile != null) {
				workbook   = Workbook.getWorkbook(xlsFile);		
				sheetCount = workbook.getSheets().length;
			}
			
			Sheet sheet = null;
			
			if(workbook != null) {
				for (int i = 0; i < sheetCount; i++) {
					sheet = workbook.getSheet(i);
					
					// ���뿵��(key, value)
					int m = 0;			
					commonParams     = new ArrayList();
					commonFieldNames = new ArrayList();
					
					while (true) {
						Cell commField   = sheet.getCell(1, m);
						String commValue = commField.getContents() == null ? "" : commField.getContents(); 
						
						if (StringUtil.isEmpty(commValue)) {
							break;
						} else {
							String commFieldName  = sheet.getCell(2, m).getContents() == null ? "" : sheet.getCell(2, m).getContents(); 
							String commFieldValue = sheet.getCell(3, m).getContents() == null ? "" : sheet.getCell(3, m).getContents();
							
							commonParams.add(commFieldValue.trim());
							commonFieldNames.add(commFieldName.trim());
							m++;
						}	
					}
					
					// ������ ����(key)
					int k = 1;			
					int headerKeyIndex = m + 2;

					fieldNames = new ArrayList();
					while (true) {

						try {
							Cell metaField   = sheet.getCell(k, headerKeyIndex);
							String fieldName = metaField.getContents() == null ? "" : metaField.getContents();		
							
							if (StringUtil.isEmpty(fieldName)) {
								break;
							} else {
								fieldNames.add(fieldName.trim());
								k++;
							}
						} catch (Exception e) {
							// 2015-12-03 시큐어코딩
							logger.error(e);
							
							if(fieldNames != null) {
								fieldNames = null;
							}
						}
					}
					
					// ������ ���� ó��(value)
					int dataRowIdx = headerKeyIndex + 1;
					exportIdx      = 0;
					exportList     = new ArrayList();
					
					if (fieldNames.size() != 0) {	
						dataRead : 
						while (true) {
							LData recordData = new LData();
							
							for (int j = 1; j <= fieldNames.size(); j++) {
								Cell cell = sheet.getCell(j, dataRowIdx);
								String cellData = cell.getContents() == null ? "" : cell.getContents();
								
								if (j == 1 && StringUtil.isEmpty(cellData)) {
									break dataRead;
								}
								
								if (j == 1) {
									for (int n = 0; n < commonParams.size(); n++) {
										recordData.set("_sheet_id", String.valueOf(i));
										recordData.set((String) commonFieldNames.get(n), (String) commonParams.get(n));
									}
								}	
								
								recordData.set((String) fieldNames.get(j - 1), cellData.trim());
							}
							
							exportList.add(recordData);
							exportIdx++;
							dataRowIdx++;				
						}
					}
				}
			}
		} catch (Exception e) {
			logger.debug("�������� ��ȯ �� ���� �߻��߽��ϴ�.");
			logger.debug(e);
			if (workbook != null) {
				workbook.close();
			}	
		} finally {
			if (workbook != null) {
				workbook.close();
			}	
		}
		
		return exportList;
	}
}
