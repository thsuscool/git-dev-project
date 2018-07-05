package kostat.sop.ServiceAPI.center.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.SERVICE_UNAVAILABLE, reason="서비스가 중단되었습니다.")
public class ServiceUnavailableException extends HttpStatusException {
	public ServiceUnavailableException(String message) {
		super(message);
	}
}
