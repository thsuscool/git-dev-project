package kostat.sop.ServiceAPI.center.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.UNAUTHORIZED, reason="권한이 없습니다.")
/**
 * @author rainmaker
 * 401 ����
 */
public class UnauthorizedException extends HttpStatusException {
	public UnauthorizedException(String message) {
		super(message);
	}
}
