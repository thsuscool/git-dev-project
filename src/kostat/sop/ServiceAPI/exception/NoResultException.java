package kostat.sop.ServiceAPI.exception;



public class NoResultException extends ApiException {
	private static final long serialVersionUID = -3796391880227709432L;

	public NoResultException(String msg) 
	{
		super(msg, COMM_ERR_CODE.NO_RESULT.getErrCode());
	}
	
	public NoResultException() 
	{
		super("검색결과가 존재하지 않습니다.", COMM_ERR_CODE.NO_RESULT.getErrCode());
	}

}
