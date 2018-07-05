package kostat.sop.ServiceAPI.controller.view;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/map")
public class InteractiveMapController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(BizStatsMapController.class);
	
	@RequestMapping(value="/interactiveExcelDown",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getExcelFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		HSSFWorkbook book = null;
		OutputStream out = null;
		try{
			
			book = new HSSFWorkbook();
			HSSFSheet sheet = book.createSheet();
			
			String[] excelDataArr = request.getParameterValues("excelData");
			
			ArrayList makeData =  new ArrayList();
			//System.out.println("Type : request.getCharcterEncoding() " + request.getCharacterEncoding());
			//System.out.println("Type : reponse.getCharcterEncoding() " + response.getCharacterEncoding());
			for (String excelData : excelDataArr) {
				String[] tempData = excelData.toString().split(",");
				ArrayList rowData = new ArrayList();
				for (String data : tempData) {
					//운영
					rowData.add(new String(data.getBytes("UTF-8"), "UTF-8"));
					//로컬
					//rowData.add(new String(data.getBytes("iso-8859-1"), "UTF-8"));
				}
				makeData.add(rowData);
			}
			
			int value = 999999;
			int value2 = 999999;
			for (int i =0; i < makeData.size();i++){
				
				HSSFCell cell = null;
				HSSFRow row = null;
				row = sheet.createRow(i);
				ArrayList rowList = (ArrayList) makeData.get(i);
				for(int j = 0; j < rowList.size(); j++){
					cell = row.createCell(j);
					if(i==0 && "값".equals(rowList.get(j).toString())){
						value = j;
					}else if(i == 0 && "비율(%)".equals(rowList.get(j).toString())){
						value2 = j;
					}
					if(rowList.get(j)==null){
						cell.setCellValue("");
					}else if(i!= 0 && value == j){
						cell.setCellValue( Double.parseDouble(rowList.get(j).toString()));
					}else if (i != 0 && value2 == j){
						cell.setCellValue(Double.parseDouble(rowList.get(j).toString()));
					}else{
						cell.setCellValue(rowList.get(j).toString());
					}
					
				}
			}
			
			response.setContentType("application/vnd.ms-excel; charset=UTF-8");
			String userAgent = request.getHeader("User-Agent");
			
			String filename = "데이터_보기.xls";
			boolean ie = userAgent.indexOf("MSIE") > -1; // MSIE 6~10
            boolean ie11 = userAgent.indexOf("Trident") > -1; // MSIE 11

            String browserType = request.getHeader("user-agent");
			if(browserType.indexOf("Firefox") > -1) {
				filename = new String (filename.getBytes ("UTF-8"), "iso-8859-1");
				response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\";");
			} else if(browserType.indexOf("Safari") > -1 && browserType.indexOf("Chrome") < 0) {
				filename = new String (filename.getBytes ("UTF-8"), "iso-8859-1");
				response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\";");
			} else {
				response.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(filename, "utf-8") + "\";");
			}
            
			//추가
			response.setHeader("Content-Type", "application/octet-stream");
            
            response.setHeader("Content-Transfer-Encoding", "binary");
            
            out = response.getOutputStream();
            book.write(out);
           
            out.flush();

		}catch(IOException e){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);			
		}finally{
			if(out != null){
				out.close();
			}
			if(book != null) {
				book = null;
			}
			
			if(out != null) {
				out = null;
			}
		}
	}
	
}
