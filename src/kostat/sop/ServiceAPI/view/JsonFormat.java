package kostat.sop.ServiceAPI.view;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.model.NFData;

public class JsonFormat extends AbsFormat<Object> {
	final Log logger = LogFactory.getLog(JsonFormat.class);

	/**
	 * 공통헤더를 처리하는 부분으로 json에서는 makeResult()에서 일괄처리
	 * @param resultData API 결과 데이터 (데이타 + 두리안 헤더) ※참고 데이터 형식은 com.neighborsystem.durian.restapi.api.CommonTag 참고
	 * @return Object
	 */
	public Object makeHeader(NFData resultData) throws AbsException {
		return null;
	}

	/**
	 * Object형식을 json 문자열 형식으로 변환한다.
	 * @param resultData  API 결과 데이터 (데이타 + 두리안 헤더) ※참고 데이터 형식은 com.neighborsystem.durian.restapi.api.CommonTag 참고
	 * @param jobObj
	 * @return json형식으로 text로 변환된 문자열을 리펀한다. 해당 문자열이 그대로 클라이언트에 제공된다.
	 */
	public String makeResult(NFData resultData, Object jobObj) throws AbsException {
		return resultData.toString();
	}
}
