package kostat.sop.ServiceAPI.api.map;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.AbsAPI;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;
import com.neighborsystem.durian.utils.StrUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.ss.usermodel.Workbook;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import kostat.sop.ServiceAPI.api.board.BoardCnt;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * Created by htkim on 2014-10-29.
 */
public class CreateExcel extends AbsAPI<Map>{
	private static final Log logger = LogFactory.getLog(BoardCnt.class);
	
	@Override
	public String getApiId() {
		return "101";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.ALL;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String txId) throws AbsException {
		Map mapParameter = getParameterMap(req);
		decodeParams(mapParameter);
		
		String fileName = (String) mapParameter.get(MustParam.filename.name());
		String datas = (String) mapParameter.get(MustParam.datas.name());
		
		NFData nfDatas = new NFData(datas);
		
		// 엑셀변환중 오류가 발생 되었을 경우 예외처리가 필요함.
		ConvertMapToExcel converter = new ConvertMapToExcel(nfDatas);
		Workbook wb = converter.convert();

		Map mapResult = new HashMap<String, Object>();

		int idx = fileName.indexOf(".");
		if(idx > 0) {
			fileName = fileName.substring(0, idx);
		}
		//fileName.concat(".xls");

		// URL 인코딩 하지 않으면 파일명이 깨진다.
		mapResult.put("filename", StrUtil.encodeURL(fileName+".xls", "UTF-8"));
		mapResult.put("workbook", wb);

		return mapResult;
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


	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}

	private enum MustParam {
		filename,
		datas
	}
}
