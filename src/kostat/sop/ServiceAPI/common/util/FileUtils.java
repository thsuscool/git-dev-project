package kostat.sop.ServiceAPI.common.util;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

public class FileUtils {
	private static final Log logger = LogFactory.getLog(FileUtils.class);
	private static final String IMAGE_EXP_REGEXP = "(?i)(jpe?g|png|gif|bmf)$";
	
	/**
	 * @Method 파일을 삭제한다.
	 * @MethodName deleteFile
	 * @date 2014. 11. 6.
	 * @author 나광흠
	 * @param path : {@link String}파일 풀 경로
	 * @return boolean
	 */  
	public boolean deleteFile(String path) {
		boolean check = false;
		File delFile = new File(path);
		if(delFile.isFile()) {
			check = delFile.delete();
		}else{
			throw new IllegalArgumentException("파일 존재하지 않습니다.");
		}
		return check;
	}
	/**
	 * @Method 파일 기본정보 얻기
	 * @MethodName getFileInfo
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @param bean : {@link MultipartFile}
	 * @return {@link UPLOAD_FILE}
	 */  
	private static UPLOAD_FILE getFileInfo(
			MultipartFile bean
			){
		UPLOAD_FILE file = new UPLOAD_FILE();
		String orginFileName = bean.getOriginalFilename();
		int index = orginFileName.lastIndexOf(".");
		String extension = orginFileName.substring(index + 1);
		file.setOriginalFilename(orginFileName);
		file.setContentType(bean.getContentType());
		file.setSize(bean.getSize());
		file.setExtension(extension.toLowerCase());
		return file;
	}
	
	/**
	 * @Method class를 HashMap으로 변경
	 * @MethodName getHashMap
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @param file : {@link Object}파일
	 * @return {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 */  
	private static HashMap<String,Object> getHashMap(
			Object file
			){
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		try {
			Field[] fields = file.getClass().getDeclaredFields();
			for(int i=0; i<fields.length;i++){
				fields[i].setAccessible(true);
				resultMap.put(fields[i].getName(), fields[i].get(file));
			}
			if(file instanceof UPLOAD_FILE){
				resultMap.put("originalName",((UPLOAD_FILE)file).getOriginalName());
				resultMap.put("saveName",((UPLOAD_FILE)file).getSaveName());
			}
		} catch (IllegalArgumentException e) {
			logger.info(e);
		} catch (IllegalAccessException e) {
			logger.info(e);
		}
		return resultMap;
	}
	
	/**
	 * @Method 폴더 생성
	 * @MethodName createFolder
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @param folder : {@link String}전체 경로
	 */  
	//20161013 나광흠 private에서 public으로 접근자 수정
	public static void createFolder(
			String folder
			){
		File saveFolder = new File(folder);
		if(!saveFolder.exists()){ 
			saveFolder.mkdir(); 
		}
	}
	
	/**
	 * @Method 유니크한 파일 이름 얻기
	 * @MethodName getUniqueFileName
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @param folder : {@link String}저장될 전체 경로
	 * @param fileExtension : {@link String}파일 확장자
	 * @return {@link String}
	 */  
	public static String getUniqueFileName(
			String folder,
			String fileExtension
			){
		//20160616 나광흠 수정
		Date today = new Date();
		SimpleDateFormat simple = new SimpleDateFormat("yyyyMMdd-HHmmss-SSS-", Locale.KOREA);
		String uniqFilename = simple.format(today)+UUID.randomUUID().toString();
		if(fileExtension==null){
			File dirFile=new File(folder);
			File []fileList=dirFile.listFiles();
			for(File tempFile : fileList) {
				if(tempFile.isFile()) {
					String tempFileName=tempFile.getName();
					String filename = tempFileName.substring(tempFileName.lastIndexOf("."));
					if(uniqFilename.equals(filename)){
						return getUniqueFileName(folder,fileExtension);
					}
				}
			}
			return uniqFilename;
		}else{
			String newFileNm = uniqFilename+"."+fileExtension;
			File saveFile = new File(folder+File.separator+newFileNm);
			if(saveFile.isFile()){
				return getUniqueFileName(folder,fileExtension);
			}else{
				return newFileNm;
			}
		}
	}
	
	
	/**
	 * @Method 서버사이드에서 이미지 얻을때 사용합니다.
	 * @MethodName getImageFile
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @param request : {@link HttpServletRequest}
	 * @param saveServerPath : {@link String}서버에 저장되는 기본 경로
	 * @param noImagePath : {@link String}이미지 없을때 뿌려줄 이미지
	 * @param folder : {@link String}세부 폴더
	 * @param photo : {@link String}파일 이름
	 * @return byte[]
	 */  
	public static byte[] getImageFile(
			HttpServletRequest request,
			String saveServerPath,
			String noImagePath,
			String folder,
			String photo
			){
		String file = null;
		String notFound = request.getSession().getServletContext().getRealPath(noImagePath);
		int index = photo.lastIndexOf(".");
		String extension = photo.substring(index + 1);
		if(!folder.contains(".")&&!folder.startsWith("/")&&extension.matches(IMAGE_EXP_REGEXP)){
			folder = (StringUtils.hasText(folder)?(folder.substring(folder.length()-1).equals(File.separator)?folder:folder+File.separator):"");
			file = saveServerPath+File.separator+folder+photo;
			File hasImage = new File(file);
			if(!hasImage.exists()){
				System.err.println("해당 파일은 서버에 존재하지 않습니다 요청 파일 위치 : "+file);
				file = notFound;
			}
		}else{
			if(folder.contains(".")){
				System.err.println("폴더에는 점(.) 을 사용할 수 없습니다");
			}else if(folder.startsWith("/")){
				System.err.println("폴더 시작은 root(/)로 시작할 수 없습니다");
			}else{
				System.err.println("요청한 파일은 이미지 파일이 아닙니다. 요청한 파일 이름 : "+photo);
			}
			folder = "";
			file = notFound;
		}
		return imageToByte(file);
	}
	
	/**
	 * @Method 이미지 바이트화
	 * @MethodName imageToByte
	 * @date 2014. 12. 11.
	 * @author kwangheum
	 * @param file
	 * @return
	 */  
	private static byte[] imageToByte(
			String file
			){
		byte[] data = new byte[16384];
		byte[] result = null;
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		try{
			@SuppressWarnings("resource")
			InputStream inputStream = new FileInputStream(file);
			int nRead;
			while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
				buffer.write(data, 0, nRead);
			}
			buffer.flush();
			result = buffer.toByteArray();
		}catch(IOException e){
			logger.error(e);
		}finally {
			if(buffer!=null){
				try {
					buffer.close();
				} catch (IOException e) {
					logger.error(e);
				}
			}
		}
		return result;
	}
	/**
	 * @Method 서버에 저장하지않고 바로 리스트 이미지를 변형시켜주는 형태. 리턴은 {@link Base64}로 인코딩 한 {@link String} 입니다
	 * @MethodName getPreviewImage
	 * @date 2014. 12. 11.
	 * @author kwangheum
	 * @param request : {@link HttpServletRequest}
	 * @param noImagePath : {@link String} : 이미지를 업로드 될때 이미지가 아닐 경우나 이미지 얻을때 이미지가 없는 경우 뿌려줄 이미지
	 * @param files : {@link List}&lt;?&gt;
	 * @return {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 */  
	public static List<HashMap<String,Object>> getPreviewImage(
			HttpServletRequest request,
			String noImagePath,
			List<?> files
			){
		List<HashMap<String,Object>> result = new ArrayList<HashMap<String,Object>>();
		imageToBase64(request, noImagePath, result, files);
		return result;
	}
	/**
	 * @Method 서버에 저장하지않고 바로 단일 이미지를 변형시켜주는 형태. 리턴은 {@link Base64}로 인코딩 한 {@link String} 입니다
	 * @MethodName getPreviewImage
	 * @date 2014. 12. 11.
	 * @author kwangheum
	 * @param request : {@link HttpServletRequest}
	 * @param noImagePath : {@link String} : 이미지를 업로드 될때 이미지가 아닐 경우나 이미지 얻을때 이미지가 없는 경우 뿌려줄 이미지
	 * @param files : {@link MultipartFile}
	 * @return {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 */  
	public HashMap<String,Object> getPreviewImage(
			HttpServletRequest request,
			String noImagePath,
			MultipartFile files
			){
		HashMap<String,Object> result = new HashMap<String,Object>();
		result.put("image", imageToBase64(request,noImagePath,files));
		result.put("originalFilename", files.getOriginalFilename());
		return result;
	}
	private static void imageToBase64(
			HttpServletRequest request,
			String noImagePath,
			List<HashMap<String,Object>> result,
			List<?> files
			){
		if(files!=null&&files.size()>0){
			Iterator<?> listIter = files.iterator();
			while(listIter.hasNext()){
				Object data = listIter.next();
				if(data instanceof List){
					imageToBase64(request,noImagePath,result,(List<?>) data);
				}else{
					HashMap<String,Object> image = new HashMap<String,Object>();
					image.put("image", imageToBase64(request,noImagePath,data));
					MultipartFile bean = (MultipartFile)data;
					image.put("originalFilename", bean.getOriginalFilename());
					result.add(image);
				}
			}
		}
	}
	private static String imageToBase64(
			HttpServletRequest request,
			String noImagePath,
			Object data
			){
		MultipartFile bean = (MultipartFile)data;
		String base64String = null;
		try {
			if(getFileInfo(bean).getExtension().matches(IMAGE_EXP_REGEXP)){
				base64String = Base64.encodeBase64String(bean.getBytes());
			}else{
				base64String = Base64.encodeBase64String(imageToByte(request.getSession().getServletContext().getRealPath(noImagePath)));
			}
		} catch (IOException e) {
			logger.error(e);
		}
		return "data:image/png;base64,"+base64String;
	}
	/**
	 * @Method 다중 파일 업로드 HashMap에 ("error", boolean)과 오류면 ("message",String)가 담기고 오류가 아니면 ("fileList",List<HashMap<String,Object>>)가 담깁니다. file HashMap은 List<UPLOAD_FILE>입니다
	 * @MethodName fileUpload
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @param propertiesPath : {@link String}저장될 위치
	 * @param propertiesDivision : {@link String}WHITE,BLACK
	 * @param regularExpression : {@link String}정규표현식
	 * @param folder : {@link String}저장될 위치 안에서 폴더 지정
	 * @param files : {@link List}&gt;?&lt;파일
	 * @return {@link List}&gt;{@link String},{@link Object}&lt;
	 */  
	public static HashMap<String,Object> fileUpload(
			String propertiesPath,
			String propertiesDivision,
			String regularExpression,
			String folder,
			List<?> files
			) {
		HashMap<String,Object> validation = validationAttachment(
				propertiesDivision,
				regularExpression,
				files
				);
		if((Boolean)validation.get("error")){
			return validation;
		}else{
			List<HashMap<String,Object>> result= new ArrayList<HashMap<String,Object>>();
			fileUpload(
					propertiesPath,
					propertiesDivision,
					regularExpression,
					result, 
					files, 
					folder, 
					validation
					);
		}
		return validation;
	}
	private static void fileUpload(
			String propertiesPath,
			String propertiesDivision,
			String regularExpression,
			List<HashMap<String,Object>> result,
			List<?> files,
			String folder,
			HashMap<String,Object> validation
			){
		if(files!=null&&files.size()>0){
			Iterator<?> listIter = files.iterator();
			while(listIter.hasNext()){
				Object data = listIter.next();
				if(data instanceof List){
					fileUpload(
							propertiesPath,
							propertiesDivision,
							regularExpression,
							result, 
							(List<?>) data, 
							folder, 
							validation
							);
					
				}else{
					fileUpload(
							propertiesPath,
							propertiesDivision,
							regularExpression,
							result, 
							data, 
							folder
							);
				}
			}
			validation.remove("fileList");
			validation.put("fileList",result);
		}
	}
	private static void fileUpload(
			String propertiesPath,
			String propertiesDivision,
			String regularExpression,
			List<HashMap<String,Object>> result,
			Object data,
			String folder
			){
		folder = (StringUtils.hasText(folder)?(folder.substring(folder.length()-1).equals(File.separator)?folder:folder+File.separator):"");
		boolean whiteList = propertiesDivision.toUpperCase().equals("WHITE");
		MultipartFile bean = (MultipartFile)data;
		if(bean.getSize()>0){
			UPLOAD_FILE file = getFileInfo(bean);
			if(file.getExtension().matches(regularExpression)==whiteList){
				saveFile(
						propertiesPath,
						bean, 
						file, 
						folder
						);
				result.add(getHashMap(file));
			}
		}
	}
	/**
	 * @Method 단일 이미지 파일 업로드 HashMap에 ("error", boolean)과 오류면 ("message",String)가 담기고 오류가 아니면 ("file",HashMap<String,Object>)가 담깁니다. file HashMap은 UPLOAD_FILE입니다
	 * @MethodName imageUpload
	 * @date 2014. 11. 19.
	 * @author 나광흠
	 * @param propertiesPath : {@link String}저장될 위치
	 * @param folder : {@link String}저장될 위치 안에서 폴더 지정
	 * @param files : {@link String}파일
	 * @return {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 */  
	public static HashMap<String,Object> imageUpload(
			String propertiesPath,
			String folder,
			MultipartFile files
			) {
		HashMap<String,Object> validation = new HashMap<String,Object>();
		boolean error = true;
		if(files.getSize()>0){
			folder = (StringUtils.hasText(folder)?(folder.substring(folder.length()-1).equals(File.separator)?folder:folder+File.separator):"");
			if(!files.isEmpty()){
				UPLOAD_FILE fileInfo = getFileInfo(files);
				if(fileInfo.getExtension().matches(IMAGE_EXP_REGEXP)){
					saveFile(
							propertiesPath,
							files, 
							fileInfo, 
							folder
							);
					validation.put("file", getHashMap(fileInfo));
					error = false;
				}else{
					error = true;
					validation.put("message", "이미지 확장자가 아닙니다");
				}
			}
		}else{
			error = true;
			validation.put("message", "파일을 등록해주세요");
		}
		validation.put("error", error);
		return validation;
	}
	/**
	 * @Method 이미지 url에 있는 파일 업로드 HashMap에 ("error", boolean)과 오류면 ("message",String)가 담기고 오류가 아니면 ("file",HashMap<String,Object>)가 담깁니다. file HashMap은 UPLOAD_FILE입니다
	 * @MethodName imageUpload
	 * @date 2014. 11. 19.
	 * @author 나광흠
	 * @param propertiesPath -- {@link String} : 저장될 위치
	 * @param folder -- {@link String} : 저장될 위치 안에서 폴더 지정
	 * @param imageUrl --{@link String} : 파일
	 * @return {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 */
	public static HashMap<String,Object> imageUrlToFile(
			String propertiesPath,
			String folder,
			String imageUrl
			) {
		HashMap<String,Object> validation = new HashMap<String,Object>();
		boolean error = true;
		UPLOAD_FILE fileInfo = new UPLOAD_FILE();
		fileInfo.setOriginalFilename(imageUrl.substring(imageUrl.lastIndexOf("/")+1));
		fileInfo.setExtension(imageUrl.substring(imageUrl.lastIndexOf(".")+1));
		fileInfo.setContentType("image/"+fileInfo.getExtension().toLowerCase());
		if(fileInfo.getExtension().matches(IMAGE_EXP_REGEXP)){
			saveImageFile(propertiesPath, imageUrl, fileInfo, folder);
			validation.put("file", getHashMap(fileInfo));
			error = false;
		}else{
			error = true;
			validation.put("message", "이미지 확장자가 아닙니다");
		}
		validation.put("error", error);
		return validation;
	}
	/**
	 * @Method 단일 파일 업로드 HashMap에 ("error", boolean)과 오류면 ("message",String)가 담기고 오류가 아니면 ("file",HashMap<String,Object>)가 담깁니다. file HashMap은 UPLOAD_FILE입니다
	 * @MethodName fileUpload
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @param propertiesPath : {@link HashMap}장될 위치
	 * @param propertiesDivision : {@link HashMap}WHITE,BLACK
	 * @param regularExpression : {@link HashMap}정규표현식
	 * @param folder : {@link HashMap}저장될 위치 안에서 폴더 지정
	 * @param files : {@link HashMap}파일
	 * @return {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 */  
	public static HashMap<String,Object> fileUpload(
			String propertiesPath,
			String propertiesDivision,
			String regularExpression,
			String folder,
			MultipartFile files
			) {
		
		folder = (StringUtils.hasText(folder)?(folder.substring(folder.length()-1).equals(File.separator)?folder:folder+File.separator):"");
		boolean whiteList = propertiesDivision.toUpperCase().equals("WHITE");
		HashMap<String,Object> validation = new HashMap<String,Object>();
		boolean error = true;
		if(!files.isEmpty()){
			UPLOAD_FILE fileInfo = getFileInfo(files);
			if(fileInfo.getExtension().matches(regularExpression)==whiteList){
				saveFile(
						propertiesPath,
						files, 
						fileInfo, 
						folder
						);
				validation.put("file", getHashMap(fileInfo));
				error = false;
			}else{
				error = true;
				validation.put("message", "허용된 확장자가 아닙니다");
			}
		}
		validation.put("error", error);
		return validation;
	}
	private static void saveImageFile(
			String propertiesPath,
			String imageUrl,
			UPLOAD_FILE file,
			String saveFolder
			){
		URL url;
		InputStream is = null;
		OutputStream os = null;
		try {
			String savePath = propertiesPath+File.separator+saveFolder;
			createFolder(savePath);
			Date today = new Date();
			SimpleDateFormat simple = new SimpleDateFormat("yyyyMM", Locale.KOREA);
			String saveSubFolder = savePath+File.separator+simple.format(today);
			createFolder(saveSubFolder);
			String newFileNm = getUniqueFileName(savePath,file.getExtension());
			String newfile = saveSubFolder+File.separator+newFileNm;
			
			url = new URL(imageUrl);
			is = url.openStream();
			os = new FileOutputStream(newfile);
			
			byte[] b = new byte[2048];
			int length;
			int size=0;
			
			while ((length = is.read(b)) != -1) {
				size+=length;
				os.write(b, 0, length);
			}
			
			is.close();
			os.close();
			
			file.setSaveFilename(newFileNm);
			file.setSize(size);
			file.setSavePath(simple.format(today)+File.separator);
		} catch (MalformedURLException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		} finally {
			try {
				if(is!=null){
					is.close();
				}
				if(os!=null){
					os.close();
				}
			} catch (IOException e) {
				logger.error(e);
			}
		}
	}
	private static void saveFile(
			String propertiesPath,
			MultipartFile bean,
			UPLOAD_FILE file,
			String saveFolder
			){
		String savePath = propertiesPath+File.separator+saveFolder;
		createFolder(savePath);
		Date today = new Date();
		SimpleDateFormat simple = new SimpleDateFormat("yyyyMM", Locale.KOREA);
		String saveSubFolder = savePath+simple.format(today);
		createFolder(saveSubFolder);
		String newFileNm = getUniqueFileName(savePath,file.getExtension());
		String newfile = saveSubFolder+File.separator+newFileNm;
			try {
				bean.transferTo(new File(newfile));
				//20160530 나광흠 추가 시작
				if(file.getContentType().startsWith("image")){
					createThumbnail(saveSubFolder, newfile, newFileNm);
				}
				//20160530 나광흠 추가 종료
			} catch (IllegalStateException e) {
				logger.error(e);
			} catch (IOException e) {
				logger.error(e);
			}
		
		file.setSaveFilename(newFileNm);
		file.setSize(file.getSize());
		file.setSavePath(simple.format(today)+File.separator);
	}
	//20160530 나광흠 추가 시작
	//20161013 나광흠 private에서 public으로 접근자 수정
	public static void createThumbnail(
			String saveSubFolder,
			String newfile,
			String newFileNm
			){
		try {
			BufferedImage newImageFile = ImageIO.read(new File(newfile));
			if(newImageFile!=null){
				int width = newImageFile.getWidth();
				createFolder(saveSubFolder+File.separator+"thumbnail");
				String thumbnailPath = saveSubFolder+File.separator+"thumbnail"+File.separator;
				int thumbnailSize = 400;
				if(width>thumbnailSize){
					Thumbnails.of(new File(newfile)).size(thumbnailSize, thumbnailSize).toFile(thumbnailPath+"thumbnail-L-"+newFileNm);
				}else{
					fileCopy(newfile,thumbnailPath+"thumbnail-L-"+newFileNm);
				}
				if(width>(thumbnailSize/2)){
					Thumbnails.of(new File(newfile)).size(thumbnailSize/2, thumbnailSize/2).toFile(thumbnailPath+"thumbnail-M-"+newFileNm);
				}else{
					fileCopy(newfile,thumbnailPath+"thumbnail-M-"+newFileNm);
				}
				if(width>(thumbnailSize/4)){
					Thumbnails.of(new File(newfile)).size(thumbnailSize/4, thumbnailSize/4).toFile(thumbnailPath+"thumbnail-S-"+newFileNm);
				}else{
					fileCopy(newfile,thumbnailPath+"thumbnail-S-"+newFileNm);
				}
				if(width>23){
					Thumbnails.of(new File(newfile)).size(23, 28).toFile(thumbnailPath+"thumbnail-XS-"+newFileNm);
				}else{
					fileCopy(newfile,thumbnailPath+"thumbnail-XS-"+newFileNm);
				}
			}
		} catch (IOException e) {
			logger.error(e);
		}
	}
	//20160530 나광흠 추가 종료
	/**
	 * @Method 기존 파일을 새로운 위치에 COPY
	 * @MethodName fileCopy
	 * @date 2014. 11. 6.
	 * @author 나광흠
	 * @param oldFilePathName : {@link String}기존 파일 경로+이름
	 * @param newFilePathName : {@link String}새로운 파일 경로+이름
	 * @return MultipartFile
	 */  
	public static boolean fileCopy(
			String oldFilePathName, 
			String newFilePathName
			) {
		boolean runOk = true;  

		File SaveToFile  = null;  
		OutputStream fos = null;
		BufferedInputStream in = null; 
		SaveToFile = new File(oldFilePathName);	
		try{  
			if(SaveToFile.exists()){
				in = new BufferedInputStream(new FileInputStream(oldFilePathName)); //원본파일 
				fos = new FileOutputStream(newFilePathName); //수정파일
				int s1=0;

				while((s1=in.read())!=-1){
					fos.write(s1);
				}

				in.close();
				fos.close(); 
			}  
		} catch (FileNotFoundException e) {
			runOk = false;
		} catch (IOException e) {
			runOk = false;
		}finally {
			if(SaveToFile != null) {SaveToFile = null;}
			try {
				if(fos!=null){
					fos.close();
				}
				if(in!=null){
					in.close();
				}
			} catch (IOException e) {
				logger.error(e);
			}
		} 
		return runOk;
	} 
	/**
	 * @Method 업로드 파일 검사 ,HashMap에 ("error",boolean)과 ("fileList",List<UPLOAD_FILE>)가 담깁니다
	 * @MethodName validationAttachment
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @param propertiesDivision : {@link String}WHITE,BLACK
	 * @param regularExpression : {@link String}정규표현식
	 * @param files : {@link List}&lt;?&gt;파일
	 * @return {@link HashMap}&lt;{@link String},{@link Object}&gt;
	 */  
	private static HashMap<String,Object> validationAttachment(
			String propertiesDivision,
			String regularExpression,
			List<?> files
			){
		HashMap<String,Object> result = new HashMap<String, Object>();
		List<UPLOAD_FILE> fileList = new ArrayList<UPLOAD_FILE>();
		boolean error = false;
		if(files!=null&&files.size()>0){
			Iterator<?> listIter = files.iterator();
			while(listIter.hasNext()){
				Object data = listIter.next();
				if(data instanceof List){
					validationAttachment(
							propertiesDivision,
							regularExpression,
							(List<?>)data
							);
				}else{
					UPLOAD_FILE file = new UPLOAD_FILE();
					if(validationAttachment(
							propertiesDivision,
							regularExpression,
							fileList, 
							data, 
							file
							)){
						error = true;
						boolean whiteList = propertiesDivision.toUpperCase().equals("WHITE");
						if(whiteList){
							result.put("message", "업로드 가능한 확장자가 아닙니다.");
						}else{
							result.put("message", "업로드 불가능한 확장자입니다.");
						}
					}
				}
			}
		}
		result.put("error", error);
		result.put("fileList", fileList);
		return result;
	}
	private static boolean validationAttachment(
			String propertiesDivision,
			String regularExpression,
			List<UPLOAD_FILE> result,
			Object data,
			UPLOAD_FILE file
			){
		boolean error = true;
		boolean whiteList = propertiesDivision.toUpperCase().equals("WHITE");
		MultipartFile bean = (MultipartFile) data;
		if(!bean.isEmpty()){
			UPLOAD_FILE fileInfo = getFileInfo(bean);
			result.add(fileInfo);
			if(fileInfo.getExtension().matches(regularExpression)==whiteList){
				error = false;
			}
		}else{
			error = false;
		}
		return error;
	}
}
class UPLOAD_FILE {
	String originalFilename;//원본 파일 이름
	String contentType;//업로드 파일 타입
	long size;//업로드 파일 크기
	String extension;//업로드 파일
	String saveFilename;//저장 파일 이름
	String savePath;//저장위치
	
	public String getOriginalFilename() {
		return originalFilename;
	}
	public void setOriginalFilename(String originalFilename) {
		this.originalFilename = originalFilename;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public long getSize() {
		return size;
	}
	public void setSize(long size) {
		this.size = size;
	}
	public String getExtension() {
		return extension;
	}
	public void setExtension(String extension) {
		this.extension = extension;
	}
	public String getSaveFilename() {
		return saveFilename;
	}
	public void setSaveFilename(String saveFilename) {
		this.saveFilename = saveFilename;
	}
	public String getSavePath() {
		return savePath;
	}
	public void setSavePath(String savePath) {
		this.savePath = savePath;
	}
	
	/**
	 * @Method 확장자를 제외한 업로드 파일이름
	 * @MethodName getOriginalName
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @return {@link String}
	 */  
	public String getOriginalName() {
		if(StringUtils.hasText(originalFilename)){
			return originalFilename.substring(0,originalFilename.lastIndexOf("."));
		}else{
			return originalFilename;
		}
	}
	
	/**
	 * @Method 확장자를 제외한 저장된 파일이름 
	 * @MethodName getSaveName
	 * @date 2014. 10. 11.
	 * @author 나광흠
	 * @return {@link String}
	 */  
	public String getSaveName() {
		if(StringUtils.hasText(saveFilename)){
			return saveFilename.substring(0,saveFilename.lastIndexOf("."));
		}else{
			return saveFilename;
		}
	}
}
