package kostat.sop.ServiceAPI.api.communityMap;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 공지사항 파일 다운로드.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 나광흠, 1.0, 2016/01/19  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityNoticeFileDownload extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityNoticeFileDownload.class);
	@Override
	public String getApiId() {
		return "8010";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.ALL;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return null;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam
	{
		cmmnty_map_indvdlz_notice_atch_file_id
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		HashMap<String,Object> resultData = new HashMap<String,Object>();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			ClassPathResource resource = new ClassPathResource("/globals.properties");
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String filePath = props.getProperty("Globals.Community.File.Path");


			HashMap<String,Object> file = session.selectOne("communityNotice.selectCmmntyNoticeFile",mapParameter);
			if(file==null){
				throw new ApiException("파일이 존재하지 않습니다");
			}else{
				HashMap<String,Object> param = new HashMap<String,Object>();
				String originalName = file.get("ori_file_nm").toString();
				String save_file_nm = file.get("save_file_nm").toString();
				param.put("file_id", save_file_nm.substring(0,save_file_nm.lastIndexOf(".")));
				param.put("file_nm", originalName.substring(0,originalName.lastIndexOf(".")));
				param.put("file_path", filePath+file.get("path_nm"));
				param.put("file_extension", file.get("file_extn"));
				param.put("file_content_type", file.get("file_type"));
				resultData.put("params", param);
			}

			logger.info("END Query - TXID[" + getApiId() + "] ");
		} catch (AbsAPIException e) {
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
}