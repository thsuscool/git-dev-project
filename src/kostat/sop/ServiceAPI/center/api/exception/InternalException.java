package kostat.sop.ServiceAPI.center.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR, reason="서버에서 에러가 발생하였습니다.")
public class InternalException extends HttpStatusException {
	public InternalException(String message) {
		super(message);
	}
}
