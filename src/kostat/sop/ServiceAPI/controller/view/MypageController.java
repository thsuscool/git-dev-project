package kostat.sop.ServiceAPI.controller.view;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.parser.ParseException;
import org.opengis.referencing.FactoryException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.MypageService;
import kostat.sop.ServiceAPI.controller.service.impl.MypageServiceImpl;
import kostat.sop.ServiceAPI.controller.service.mapper.MypageMapper;

/**
 * 1. 기능 : 마이페이지 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/09/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/mypage")
public class MypageController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(MypageController.class);
	
	@Resource(name="mypageService")
	private MypageService mypageService;
	
	/**
	 * 마이페이지
	 * @param request
	 * @param response
	 * @return mypage/mypage
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/mypage")
	public ModelAndView mypage(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("mypage/mypage");
	}
	
	/**
	 * 회원정보 수정화면
	 * @param request
	 * @param response
	 * @return mypage/mysubpage
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/mysubpage")
	public ModelAndView mysubpage(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("mypage/mysubpage");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/myData/dataList")
	public ModelAndView dataList(HttpServletRequest request, HttpServletResponse response){
		return new ModelAndView("mypage/myData/dataList");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/myData/dataUpload")
	public ModelAndView dataUpload(HttpServletRequest request, HttpServletResponse response){
		return new ModelAndView("mypage/myData/dataUpload");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/myData/dataModify")
	public ModelAndView dataModify(HttpServletRequest request, HttpServletResponse response,@RequestParam(value= "data_uid") String data_uid){		
		return new ModelAndView("mypage/myData/dataModify","data_uid",data_uid);
	}
	
	
	@RequestMapping(value="/myData/getFileData",method = RequestMethod.POST)
	@ResponseBody
	public void getFileData(HttpServletRequest request){
		
	}
	
	
	@RequestMapping(value="/myData/DeleteMyData",method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
	@ResponseBody
	public int deleteData(HttpServletRequest request) throws SQLException{
		HttpSession session = request.getSession();
		String usr_id = (String)session.getAttribute("member_id");
		mypageService.deleteMyData(request.getParameter("data_uid"),usr_id);
		
		return 1;
	}
	
	
	@RequestMapping(value="/myData/fileUpload",method = RequestMethod.POST)
	@ResponseBody
	public String insertController(HttpServletRequest request){
		//파일에 대한 실제 저장
		String data_id = mypageService.insertMyData(request);
		mypageService.insertUserdata(request,data_id);
		mypageService.insertMetaData(request,data_id);
		return data_id;
	}
	
	
	@RequestMapping(value="/myData/fileDownLoad",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getExcelFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		HSSFWorkbook book = null;
		OutputStream out = null;
		try{
			Map retMap = mypageService.getMydataFile(request.getParameter("data_id"));
			book = (HSSFWorkbook) retMap.get("file");
			response.setContentType("application/vnd.ms-excel; charset=UTF-8");
			String userAgent = request.getHeader("User-Agent");
			
			String filename = (String) retMap.get("fileName");
			filename = filename.substring(0,filename.indexOf("."))+".xls";
			boolean ie = userAgent.indexOf("MSIE") > -1; // MSIE 6~10
            boolean ie11 = userAgent.indexOf("Trident") > -1; // MSIE 11

            /*if (ie || ie11) {                      
            		filename = new String(filename.getBytes(), "ISO-8859-1");
            } else {
            		filename = new String(filename.getBytes(), "ISO-8859-1");
            }*/
            /*System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.out.println("filename = " + filename);*/
            /*filename = StringUtil.encodingChange(request,filename);*/
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
			
            
            /*filename = new String(filename.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\";");*/
            response.setHeader("Content-Transfer-Encoding", "binary");
            
            out = response.getOutputStream();
            book.write(out);
           
            out.flush();
            out.close();

		}catch(UnsupportedEncodingException | SQLException e){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);			
			if(book != null) {
				book = null;
			}
						
			if(out != null) {
				out = null;
			}
		}
		
	}
	
	
	@RequestMapping(value="/myData/fileDownLoadSHP",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getSHPFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		FileInputStream fis = null;
		OutputStream out = null;
		try {
			Map retMap = mypageService.getMySHPFile(request.getParameter("data_id"));
			File file = (File) retMap.get("file");
			byte[] arBytes = new byte[(int)file.length()];
			fis = new FileInputStream(file);
			fis.read(arBytes);
			
			String filename = retMap.get("fileName").toString();
			String userAgent = request.getHeader("User-Agent");
			response.setContentType("application/zip; charset=utf-8");
			boolean ie = userAgent.indexOf("MSIE") > -1; // MSIE 6~10
            boolean ie11 = userAgent.indexOf("Trident") > -1; // MSIE 11

            if (ie || ie11) {
                      /*filename = URLEncoder.encode(filename, "EUC-KR").replaceAll("\\+", "%20");*/
            		//filename = new String(filename.getBytes("euc-kr"), "euc-kr");
            		filename = URLEncoder.encode(filename, "utf-8");
            } else {
            	filename = URLEncoder.encode(filename, "utf-8");
            }
            response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
            
            
           
            out = response.getOutputStream();
            out.write(arBytes);
            out.flush();
            out.close();
            
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.");	//2017.12.04 [개발팀] 시큐어코딩	
		}
		/*book = (HSSFWorkbook) retMap.get("file");*/
		catch (SQLException e) {
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.");	//2017.12.04 [개발팀] 시큐어코딩		 	
		} catch (FactoryException e) {
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.");	//2017.12.04 [개발팀] 시큐어코딩			
		} catch (ParseException e) {
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.");	//2017.12.04 [개발팀] 시큐어코딩			
		} catch (com.vividsolutions.jts.io.ParseException e) {
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.");	//2017.12.04 [개발팀] 시큐어코딩			
		}finally{
			if(fis != null){
				fis.close();
			}
			if(out != null){
				out.close();
			}
		}
			
		
	}
	
	@RequestMapping(value="/myData/sampleDownLoad",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getSampleFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		///view/mypage/myData/sampleDownLoad?type=sample."+type
		FileInputStream fis = null;
		OutputStream out = null;
		try{
			Map retMap = mypageService.getSampleFile(request.getParameter("type"));
			File file = (File) retMap.get("file");
			byte[] arBytes = new byte[(int)file.length()];
			fis = new FileInputStream(file);
			fis.read(arBytes);
			String filename = retMap.get("fileName").toString();
			String userAgent = request.getHeader("User-Agent");
			response.setContentType("application/file");
			boolean ie = userAgent.indexOf("MSIE") > -1; // MSIE 6~10
            boolean ie11 = userAgent.indexOf("Trident") > -1; // MSIE 11
            
            if (ie || ie11) {
                filename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
            } else {
                filename = new String(filename.getBytes("UTF-8"), "ISO-8859-1");
            }
            response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");         
            
            out = response.getOutputStream();
            out.write(arBytes);
            out.flush();
            out.close();
		}catch(FileNotFoundException e){
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.");	//2017.12.04 [개발팀] 시큐어코딩
		}finally{
			if(fis != null){
				fis.close();
			}
			if(out != null){
				out.close();
			}
		}
	}
	@RequestMapping(value="/myData/fileDownLoadKml",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getKmlFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		FileInputStream fis = null;
		OutputStream out = null;
		
		try{
			Map retMap = mypageService.getKmlFile(request.getParameter("data_id"));
			File file = (File) retMap.get("file");
			byte[] arBytes = new byte[(int)file.length()];
			fis = new FileInputStream(file);
			fis.read(arBytes);
			String filename = retMap.get("fileName").toString();
			String userAgent = request.getHeader("User-Agent");
			response.setContentType("application/file; charset=UTF-8");
			boolean ie = userAgent.indexOf("MSIE") > -1; // MSIE 6~10
            boolean ie11 = userAgent.indexOf("Trident") > -1; // MSIE 11
            
            if (ie || ie11) {
                /*filename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");*/
            	filename = new String(filename.getBytes(), "ISO-8859-1");
            } else {
                filename = new String(filename.getBytes(), "ISO-8859-1");
            }
            response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");         
            
            out = response.getOutputStream();
            out.write(arBytes);
            out.flush();
            out.close();
		}catch(FileNotFoundException | SQLException e){
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}finally{
			if(fis != null){
				fis.close();
			}
			if(out != null){
				out.close();
			}
		}
	}
	
	
	@RequestMapping(value="/myData/getMetaData",method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getMetaData(HttpServletRequest request,HttpServletResponse response) throws IOException{
		HttpSession session = request.getSession();
		String member_id =(String)session.getAttribute("member_id");
		//엑셀 업로드시 화면에 표출
		Map metaMap = new HashMap();
		response.setContentType("text/html;charset=utf-8");
		try{
			OutputStream out = response.getOutputStream();
			JSONObject obj = new JSONObject();
			obj.put("data", mypageService.getMetaData(request));
			obj.put("user_id", member_id);
			out.write(obj.toString().getBytes("utf-8")); 
	        out.flush();
	        out.close();
		}catch(JSONException e){
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
	}
	
	
	@RequestMapping(value="/myData/selectListMyData",method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void selectListMyData(HttpServletRequest request,HttpServletResponse response){
		
		Map metaMap = new HashMap();
		response.setContentType("text/html;charset=utf-8");
		/*System.out.println("index = " + request.getParameter("index"));*/
		HttpSession session = request.getSession();
		try{
			OutputStream out = response.getOutputStream();
			JSONObject obj = new JSONObject();
			obj.put("data", mypageService.selectListMyData(request.getParameter("index"),(String)session.getAttribute("member_id")));
			//용량추가
			obj.put("size", mypageService.selectMyDataTotalSize((String)session.getAttribute("member_id")));
			out.write(obj.toString().getBytes("utf-8")); 
	        out.flush();
	        out.close();
		}catch(JSONException | IOException | SQLException e){
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
	}
	
	@RequestMapping(value = "/myData/viewKml",method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void viewMapKmlData(HttpServletRequest request,HttpServletResponse response) throws IOException, SQLException{
		String data_id = request.getParameter("data_id");
		HttpSession session = request.getSession();
		String member_id =(String)session.getAttribute("member_id");
		
		//data_id,member_id
		String retString = mypageService.viewKmlFileCP(data_id, member_id);
		
		response.setContentType("text/html;charset=utf-8");
		try {
			OutputStream out = response.getOutputStream();
			JSONObject obj = new JSONObject();
			obj.put("realFile", retString);
			out.write(obj.toString().getBytes("UTF-8"));
			out.flush();
			out.close();
		} catch (JSONException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
	}
	
	@RequestMapping(value="/MainUpload/getMainUploadList",method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getMainUploadList(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map metaMap = new HashMap();
		response.setContentType("text/html;charset=utf-8");
		try{
			OutputStream out = response.getOutputStream();
			JSONObject obj = new JSONObject();
			obj.put("data", mypageService.getMainUploadList(request));
			out.write(obj.toString().getBytes("utf-8")); 
	        out.flush();
	        out.close();
		}catch(JSONException | SQLException e){
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
	}
	
	
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/bookmark")
	public ModelAndView bookMarkList(HttpServletRequest request, HttpServletResponse response){
		return new ModelAndView("mypage/bookmark/bookMarkList");
	}
	
	/**
	 * @description 마이페이지 나의 커뮤니티 리스트 화면
	 * @date 2016. 7. 27.
	 * @author (주)유코아시스템 나광흠 대리
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/community")
	public ModelAndView community(){		
		return new ModelAndView("mypage/myCommunity/communityList");
	}
	
}