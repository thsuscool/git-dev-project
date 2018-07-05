package kostat.sop.ServiceAPI.api.board;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

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
public class BoardDelete extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(BoardDelete.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8004";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
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
		board_cd,
		post_no
	}
	
	enum OptionParam
	{
		title,
		content,
		member_nm,
		low_rank_s_class_cd
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String regMemberId = (String)httpSession.getAttribute("member_id");
			if(regMemberId == null) {
//				throw new ApiException("로그인 후 작성이 가능 합니다.");
				regMemberId = "guest";
			}
			
			String id = (String) session.selectOne("board.boardRegIdCheck", mapParameter);
			if(id.equals(regMemberId)) {
				List fileList = session.selectList("board.boardFileIdCheck", mapParameter);
				
				session.delete("board.boardDelete", mapParameter);
				session.delete("board.boardDeleteReply", mapParameter);
				session.delete("board.boardDeleteFile", mapParameter);
				
				for(int i = 0; i < fileList.size(); i++) {
					Map tempMap = new HashMap();
					tempMap = (Map) fileList.get(i);
					
					ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
					Properties props = PropertiesLoaderUtils.loadProperties(resource);
					String slash = props.getProperty("Globals.Board.File.Path.slash");
					
					File deleteFile = new File(tempMap.get("file_path") + slash + tempMap.get("file_id") + "." + tempMap.get("file_extension"));
					deleteFile.delete();
				}
			} else {
				throw new ApiException("본인이 작성한 글만 삭제 가능 합니다.");
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