package kostat.sop.ServiceAPI.center.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.NOT_ACCEPTABLE, reason="접근이 불가능합니다.")

/**
 * @author rainmaker
 * 406 ����
 */
public class NotAcceptableException extends HttpStatusException {
	public NotAcceptableException(String message) {
		super(message);
	}
}
