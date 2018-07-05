package kostat.sop.ServiceAPI.view;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

import com.neighborsystem.durian.restapi.api.CommonTag;

public class DownloadView extends AbstractView {
	private static final String PROPERTY_PATH = "/globals.properties";
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, 
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException, IOException  {
		//		setContentType("applicaiton/download;charset=utf-8");

		Map result = model;
		File file = null;

		Map<String, Object> mapResult = (Map<String, Object>) result.get(CommonTag.result.name());
		mapResult = (Map<String, Object>) mapResult.get("params");

		String fileId = (String) mapResult.get("file_id");
		String fileName = (String) mapResult.get("file_nm");
		String filePath = (String) mapResult.get("file_path");
		String fileExtension = (String) mapResult.get("file_extension");
		String fileContenType = (String) mapResult.get("file_content_type");
		
//			fileId = new String (fileId.getBytes ("iso-8859-1"), "UTF-8"); 
//			fileName = new String (fileName.getBytes ("iso-8859-1"), "UTF-8");
//			filePath = new String (filePath.getBytes ("iso-8859-1"), "UTF-8");
//			fileExtension = new String (fileExtension.getBytes ("iso-8859-1"), "UTF-8");
//			fileContenType = new String (fileContenType.getBytes ("iso-8859-1"), "UTF-8");

		logger.debug("fileId :: " + fileId);
		logger.debug("fileName :: " + fileName);
		logger.debug("filePath :: " + filePath);
		logger.debug("fileExtension :: " + fileExtension);

		if(fileId.equals("tempUserForm")) {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			filePath = props.getProperty("Globals.Map.File.Path");
			
			file = new File(filePath + "userDataForm.xlsx");

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setContentLength((int)file.length());

			response.setHeader("Content-Disposition", "attachment;filename=\"userDataForm.xlsx\";");
			response.setHeader("Content-Transfer-Encoding", "binary");

			OutputStream out = response.getOutputStream();
			FileInputStream fis = null;
			
			try {
				fis = new FileInputStream(file);
				FileCopyUtils.copy(fis, out);
				out.flush();
			} catch (FileNotFoundException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			} catch(IOException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			} finally {
				if (fis != null) { 
					try { 
						fis.close(); 
					} catch (IOException e) {
						// 2015-12-03 시큐어코딩
						logger.error(e);
						
						if(fis != null) {
							fis = null;
						}
					}
				}
				
				if (out != null) { 
					try { 
						out.close(); 
					} catch (IOException e) {
						// 2015-12-03 시큐어코딩
						logger.error(e);
						out = null;
					}
				}
				
				if(file != null) {
					file = null;
				}
				
				if(result != null) {
					result.clear();
					result = null;
				}
			}
		} else {
			setContentType(fileContenType);
			
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String slash = props.getProperty("Globals.Board.File.Path.slash");
			
			FileInputStream fis = null;
//			FileOutputStream fos = null;
//
//			int data = 0;
//			
//			try {
//				fis = new FileInputStream(filePath + slash + fileId + "." + fileExtension);
//				fos = new FileOutputStream(filePath + slash + fileName + "." + fileExtension);
//				
//				while ((data = fis.read()) != -1) {
//					fos.write(data);
//				}
//			} catch(FileNotFoundException e) {
//				logger.error(e);
//				throw new ApiException(StringUtil.getErrMsg());
//			} catch(IOException e) {
//				logger.error(e);
//				throw new ApiException(StringUtil.getErrMsg());
//			} finally {
//				fos.close();
//				fis.close();
//			}
//			
//			file = new File(filePath + slash + fileName + "." + fileExtension);
			file = new File(filePath + slash + fileId + "." + fileExtension);

			response.setContentType(getContentType());
			response.setContentLength((int)file.length());
			// -1
			
			fileName += "." + fileExtension;
			
			String browserType = request.getHeader("user-agent");
			if(browserType.indexOf("Firefox") > -1) {
				fileName = new String (fileName.getBytes ("UTF-8"), "iso-8859-1");
				response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\";");
			} else if(browserType.indexOf("Safari") > -1 && browserType.indexOf("Chrome") < 0) {
				fileName = new String (fileName.getBytes ("UTF-8"), "iso-8859-1");
				response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\";");
			} else {
				response.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\";");
			}
			
//			response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\";");
			response.setHeader("Content-Transfer-Encoding", "binary");

			OutputStream out = response.getOutputStream();
			fis = null;

			try {
				fis = new FileInputStream(file);
				FileCopyUtils.copy(fis, out);
				out.flush();
			} catch (FileNotFoundException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			} catch(IOException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			} finally {
				/*if (fos != null) { 
					try { 
						fos.close(); 
					} catch (IOException e) {
						logger.error(e);
					}
				}*/
				
				if (fis != null) { 
					try { 
						fis.close(); 
					} catch (IOException e) {
						// 2015-12-03 시큐어코딩
						logger.error(e);
						fis = null;
					}
				}
				
				if (out != null) { 
					try { 
						out.close(); 
					} catch (IOException e) {
						// 2015-12-03 시큐어코딩
						logger.error(e);
						out = null;
					}
				}
				
//				if(file != null) {
//					file.delete();
//					file = null;
//				}
				
				if(result != null) {
					result.clear();
					result = null;
				}
			}
		}
	}
}

