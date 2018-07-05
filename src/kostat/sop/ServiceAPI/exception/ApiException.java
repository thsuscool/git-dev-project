package kostat.sop.ServiceAPI.exception;


import kostat.sop.ServiceAPI.common.util.StringUtil;

import com.neighborsystem.durian.exception.AbsAPIException;

public class ApiException extends AbsAPIException {
	private static final long serialVersionUID = 1131008660666875779L;
	
	public ApiException(String message, int errCd) {
		super(message, errCd);
	}
	
	public ApiException(String message, int errCd, Throwable t) {
		super(message, errCd, t);
	}
	
	// Custom exception function
	public ApiException(String msg) 
	{
		super(msg, COMM_ERR_CODE.ERR_DEFAULT.getErrCode());
	}
	
	public ApiException(String message, COMM_ERR_CODE parmErrCd) {
		super(message, parmErrCd.getErrCode());
	}
	
	public ApiException(Throwable t) {
		super("서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.ERR_DEFAULT.getErrCode(), t);
	}	

	public ApiException(COMM_ERR_CODE parmErrCd, Throwable t) {
		super(StringUtil.getErrMsg(), parmErrCd.getErrCode(), t);
	}
	
	public enum COMM_ERR_CODE
	{
		SUCCESS				(0)
		,ERR_DEFAULT		(-1)
		, NO_RESULT		(-100)	// 로그인 실패 관련		
		, ERR_PARAM			(-200)	// 파라메터 이상
		, EXECUTE_FAILE		(-201)	// 실행(요청)실패.				
		, ERR_COORD_CONVERT_FAIL (-202)	// 좌표변환실패.				
		, ERR_SQL			(-400)	// DB작업 오류.
		, AUTH_FAILE		(-401)	// 결과 없음.
		, KAIROS_TIME_OUT	(-402)	// KAIROS TIME OUT.
		, TOKEN_TIME_OUT	(-500)	// access token 유효시간 초과.
		
		// APS 연동 관련 오류.
		, APS_ERR				(-2010)			
		;
		
		private int intCode;
		
		private COMM_ERR_CODE(int errcode)
		{
			intCode = errcode;
		}
		
		public int getErrCode()
		{
			return intCode;
		}
	}	


}
