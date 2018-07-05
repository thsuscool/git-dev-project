package kostat.sop.ServiceAPI.center.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="파일을 찾을 수 없습니다.")
/**
 * @author rainmaker
 * 404 ����
 */
public class NotFoundException extends HttpStatusException {
	public NotFoundException(String message) {
		super(message);
	}
}
