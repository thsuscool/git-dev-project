package kostat.sop.ServiceAPI.center.api.exception;

@SuppressWarnings("serial")
public class HttpStatusException extends RuntimeException {
	public HttpStatusException(String message) {
		super(message);
	}
}
