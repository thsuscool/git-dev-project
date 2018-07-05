package kostat.sop.ServiceAPI.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.neighborsystem.durian.exception.AbsHttpException;

/*
 * Http Status 502
 * (불량 게이트웨이): 서버가 게이트웨이나 프록시 역할을 하고 있거나 또는 업스트림 서버에서 잘못된 응답을 받았다.
 */
@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.UNPROCESSABLE_ENTITY, reason="SQL 파라미터 체크")
public class DurianSQLException extends AbsHttpException {
	public DurianSQLException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
}
