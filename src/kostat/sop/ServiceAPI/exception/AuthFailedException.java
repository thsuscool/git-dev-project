package kostat.sop.ServiceAPI.exception;



public class AuthFailedException extends ApiException {
	private static final long serialVersionUID = -3796391880227709432L;

	public AuthFailedException(String msg) 
	{
		super(msg, COMM_ERR_CODE.AUTH_FAILE.getErrCode());
	}
	
	public AuthFailedException() 
	{
		super("로그인이 필요합니다.", COMM_ERR_CODE.AUTH_FAILE.getErrCode());
	}

}
