package kostat.sop.ServiceAPI.api.board;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.CaptchaServiceSingleton;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * 1. 기능 : 예제.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : j.h.Seok, 1.0, 2014/08/20  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : j.h.Seok
 * @version 1.0
 * @see
 * <p/>
 */
public class BoardModifyForm extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(BoardModifyForm.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	private FileOutputStream fos;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8011";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.ALL;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		post_no,
		input_code
	}
	
	enum OptionParam
	{
		post_title,
		post_title_en,
		post_content,
		priority_disp_yn,
		low_rank_s_class_cd,
		file_yn
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		Boolean isResponseCorrect = false;
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String captchaId = httpSession.getId();
			String response = (String) mapParameter.get(MustParam.input_code.name());
			isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response);
			
			if (!isResponseCorrect) {
				throw new ApiException("보안코드를 다시 입력하여 주세요.");
			}else {
				String regMemberId = (String)httpSession.getAttribute("member_id");
				if(regMemberId == null) {
//					throw new ApiException("로그인 후 작성이 가능 합니다.");
					regMemberId = "guest";
				}
				
				Map tempMap = new HashMap();
				mapParameter.put("board_cd", "BOARD_003");

				Integer postNo = Integer.parseInt((String) mapParameter.get(MustParam.post_no.name()));
				
				decodeParams(mapParameter);
				
				String fileYn = (String) mapParameter.get(OptionParam.file_yn.name());
				if(fileYn != null && fileYn.equals("Y")) {
					req.setCharacterEncoding("UTF-8");
					MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) req;
					MultipartFile multiFile;
					
					multiFile = multiReq.getFile("qna_file");
					if(multiFile == null) {
						multiFile = multiReq.getFile("thema_file");
					}
					
					if(multiFile != null) {
						
						String originName = multiFile.getOriginalFilename();
//						originName = new String (originName.getBytes ("8859_1"), "UTF-8");
						
						// 2016.12.02 시큐어코딩 삭제
						String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
						String fileName = originName.substring(0, originName.lastIndexOf("."));
						long fileSize = multiFile.getSize();
						int count = 0;		//허용된 확장자인지 체크
						
						if(fileSize > 22020096) {
							throw new ApiException("첨부파일 제한 용량은 20MB 입니다.");
						} else {
							for(String extd : getAllowExtension()) {
								if(fileExtension.equals(extd)) {
									count++;
									break;
								}
							}
						}
						if(count == 0) {
							throw new ApiException("허용 가능한 확장자가 아닙니다.");
						}
						
						ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
						Properties props = PropertiesLoaderUtils.loadProperties(resource);
						String filePath = props.getProperty("Globals.Board.File.Path");
//						String filePath = "D:\\";
//						String filePath = "/upload/board/";
						filePath += "BOARD_003";//(String) mapParameter.get(MustParam.board_cd.name());
						
						long curTime = System.currentTimeMillis();
						String fileId = fileName + Long.toString(curTime);
						String fileContentType = multiFile.getContentType();
						
						if (logger.isDebugEnabled()) {
							logger.debug("Name          : [ " + multiFile.getName() + " ]");
							logger.debug("Original Name : [ " + multiFile.getOriginalFilename() + " ]");
							logger.debug("Extension     : [ " + originName.substring(originName.lastIndexOf(".") + 1) + " ]");
							logger.debug("Content-Type  : [ " + multiFile.getContentType() + " ]");
							logger.debug("Size          : [ " + multiFile.getSize() + " ]");
						} else {
							logger.info("Name          : [ " + multiFile.getName() + " ]");
							logger.info("Original Name : [ " + multiFile.getOriginalFilename() + " ]");
							logger.info("Extension     : [ " + originName.substring(originName.lastIndexOf(".") + 1) + " ]");
							logger.info("Content-Type  : [ " + multiFile.getContentType() + " ]");
							logger.info("Size          : [ " + multiFile.getSize() + " ]");
							logger.info("ParamMap      : [ " + req.getParameterMap() + " ]");
						}
						
						// 2015-12-03 시큐어코딩
//						System.out.println("postNo :: " + postNo);
//						System.out.println("fileId :: " + fileId);
//						System.out.println("filePath :: " + filePath);
//						System.out.println("fileName :: " + fileName);
//						System.out.println("fileExtension :: " + fileExtension);
//						System.out.println("fileContentType :: " + fileContentType);
						
						if(writeFile(multiFile, filePath, fileId, fileExtension)) {
							session.delete("board.boardDeleteFile", mapParameter);
							
							Map tempParam = new HashMap();
							tempParam.put("board_cd", "BOARD_003");
							tempParam.put("post_no", postNo);
							tempParam.put("file_id", fileId);
							tempParam.put("file_path", filePath);
							tempParam.put("file_nm", fileName);
							tempParam.put("file_extension", fileExtension);
							tempParam.put("file_content_type", fileContentType);
							
							session.insert("board.boardRegistFile", tempParam);
						} else {
							throw new ApiException("파일 업로드에 실패 하였습니다.");
						}
					}
				}
				
				mapParameter.put("post_no", postNo);
				mapParameter.put("reg_member_id", regMemberId);
				
				String boardTitle = "";
				boardTitle = mapParameter.get(OptionParam.post_title.name()).toString();
				boardTitle = Security.cleanXss(boardTitle);
				mapParameter.put(OptionParam.post_title.name(), boardTitle);
				
				String boardContent = "";
				boardContent = mapParameter.get(OptionParam.post_content.name()).toString();
				boardContent = Security.cleanXss(boardContent);
				mapParameter.put(OptionParam.post_content.name(), boardContent);
				
				session.update("board.boardModify", mapParameter);
			}
		
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return resultData;
	}

	private void decodeParams(Map mapParameter) {
		Set<String> keySet = mapParameter.keySet();
		Iterator<String> itr = keySet.iterator();
		
		while(itr.hasNext()) {
			String key = itr.next();
			String value = (String) mapParameter.get(key);
			
			try {
				mapParameter.put(key, URLDecoder.decode(value, "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			}
		}
	}
	
	private Boolean writeFile(MultipartFile file, String path, String fileName, String extension){
		File f = new File(path);
		if(!f.exists()) {
			// 2016.12.02 시큐어코딩
			f.setExecutable(false, true);
			f.setReadable(true);
			f.setWritable(false, true);
			
			f.mkdirs();
		}
		
		Boolean returnValue = false;
		try {
			//2015-12-03 시큐어코딩
			path = StringUtil.specialCharCnvr(path);
			fileName = StringUtil.specialCharCnvr(fileName);
			extension = StringUtil.specialCharCnvr(extension);
			
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String slash = props.getProperty("Globals.Board.File.Path.slash");
			
			byte fileData[] = file.getBytes();
			fos = new FileOutputStream(path + slash + fileName + "." + extension);
			fos.write(fileData);
			
			returnValue = true;
		} catch(FileNotFoundException e){
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} catch(IOException e){
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}catch(Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
			if(fos != null) {
				try{
					fos.close();
				} catch(IOException e){
					logger.error(e);
					throw new ApiException(StringUtil.getErrMsg());
				}

			}
		}
		
		return returnValue;
	}
}