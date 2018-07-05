package kostat.sop.ServiceAPI.common.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.pool.http.HttpPool;

@SuppressWarnings("rawtypes")
public abstract class AbsApsConnectorApi extends AbsAuthAPI
{
	private static final Log logger = LogFactory.getLog(AbsApsConnectorApi.class);
	protected int connTimeoutInterval = 300000;
	
	/** APS URI 하위 클래스에서 생성 */
	public abstract String getApsUri();
	
	/** HttpPool 설정 */
	public abstract void setHttpClientPool(HttpPool pool);
	/** HttpPool 반환 */
	protected abstract HttpPool getHttpClientPool();
	
	/** APS Connection Info 설정 */
	public abstract void setApsAddressInfo(ApsHttpClient apsAddressInfo);
	/** APS Connection Info 반환 */
	public abstract ApsHttpClient getApsAddressInfo();
	
	/** 반환(RST_MSG) 메시지 하위 클래스에서 생성 */
	protected abstract String getResultMsg();
	/** Parameter Date 생성 */
	protected abstract String getParam() throws AbsException;
	
	
	/**
	 * HTPP 요청에 대한 응답상태 체크.
	 * @param response
	 * @throws IOException 
	 * @throws AbsNFException 
	 * @throws Exception
	 */
	protected String checkResponse(HttpResponse response) throws IOException, AbsException {
		if(response == null) {
			throw new ApiException( "응답 데이터가 존재하지 않습니다.", 
					ApiException.COMM_ERR_CODE.APS_ERR );
		}
		
		String resultMsg = null;
		if(response != null) {
			// 2015-12-03 시큐어코딩
			BufferedReader br = null;
			
			try {
				br = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
				if((resultMsg = br.readLine()) != null) {
					if(logger.isDebugEnabled()) {
						logger.debug("Result Data : " + resultMsg);
					}
				}
			} catch(IOException e) {
				logger.error(e);
			} finally {
				if(br!=null) {
					br.close();
					br = null;
				}
			}
		}
		
		return resultMsg;
	}

}
