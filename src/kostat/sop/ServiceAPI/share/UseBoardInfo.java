package kostat.sop.ServiceAPI.share;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.bizStats.Houseprice;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import kostat.sop.ServiceAPI.common.security.Security;
/**
* 활용사례 정보
* <pre>
* input : useBoardInfo.json/xml
* output : json/xml
* Table : 
* </pre>
*
* <pre>
* <b></b>
* 이경현, 1.0, 2015/06/24 초기 작성
* </pre>
* 
* @author 이경현
* @version 1.0, 2015/0
* @see None
*/

public class UseBoardInfo extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(Houseprice.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10200";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.ALL;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return "useBoardInfo.useBoardList";
	}
	
	enum MustParam
	{
		gubun
	}
	
	enum OptionParam
	{
		code,
		sgisUseBoardTitle,
		sgisUseAreaCd,
		searchCont,
		searchGb,
		nowPage,
		startPageNum,
		endPageNum,
		sgisUseBoardSeq,
		sgisUserName,
		sgisUseGb,
		sgisUsePurpose,
		sgisUseData,
		sgisUseDataOther,
		sgisActCont,
		sgisSiteUrl,
		sgis_ref_data1,
		sgis_ref_data2,
		sgis_ref_data3,
		sgis_ref_data4,
		sgisRefImage,
		searchStartDate,
		searchEndDate,
		sgisProgressStat,
		rtnrsn,
		prioritize
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		
		String userId = (String)req.getSession().getAttribute("member_id");
		
		List result = null;
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			
			String gubun = (String)mapParameter.get("gubun");
			String searchCont = (String)mapParameter.get("searchCont");
			String sgisUseData = (String)mapParameter.get("sgisUseData");
			String sgisUseDataOther = (String)mapParameter.get("sgisUseDataOther");
			String sgisSiteUrl = (String)mapParameter.get("sgisSiteUrl");
			String sgis_ref_data1 = (String)mapParameter.get("sgis_ref_data1");
			String sgis_ref_data2 = (String)mapParameter.get("sgis_ref_data2");
			String sgis_ref_data3 = (String)mapParameter.get("sgis_ref_data3");
			String sgis_ref_data4 = (String)mapParameter.get("sgis_ref_data4");
			String sgisRefImage = (String)mapParameter.get("sgisRefImage");
			String sgisActCont = (String)mapParameter.get("sgisActCont");
			gubun = Security.sqlInjectionCheck(gubun);
			searchCont = Security.sqlInjectionCheck(searchCont);
			sgisUseData = Security.sqlInjectionCheck(sgisUseData);
			sgisUseDataOther = Security.sqlInjectionCheck(sgisUseDataOther);
			sgisSiteUrl = Security.sqlInjectionCheck(sgisSiteUrl);
			sgis_ref_data1 = Security.sqlInjectionCheck(sgis_ref_data1);
			sgis_ref_data2 = Security.sqlInjectionCheck(sgis_ref_data2);
			sgis_ref_data3 = Security.sqlInjectionCheck(sgis_ref_data3);
			sgis_ref_data4 = Security.sqlInjectionCheck(sgis_ref_data4);
			sgisRefImage = Security.sqlInjectionCheck(sgisRefImage);
			sgisActCont = Security.sqlInjectionCheck(sgisActCont);
			
			
			//활용사례 리스트 조회
			if(gubun.equals("useBoardList")){
				
				//paging처리 start
				int startPageNum = 0;
				int endPageNum = 0;
				int nowPage = Integer.parseInt((String) mapParameter.get("nowPage"));
				startPageNum = (nowPage-1)*5;
				endPageNum = (nowPage*5)+1;
				
				mapParameter.put("startPageNum", startPageNum);
				mapParameter.put("endPageNum", endPageNum);
				mapParameter.put("user_id", userId);
				//paging처리 end
				
				
				if(searchCont.equals("^^")){		//empty로 파라메터가 넘어오면 에러가 나기 때문에 ^^로 처리함
					mapParameter.put("searchCont", "");
					//		System.out.println(mapParameter.get("searchCont"));
				}

				result = session.selectList(getQueryStr(), mapParameter);
				
				
				//코드정보
			}else if(gubun.equals("getCode")){
				result = session.selectList("useBoardInfo.getCode", mapParameter);
			}else if(gubun.equals("useBoardListConfirm")){
							
						
				//paging처리 start
				int startPageNum = 0;
				int endPageNum = 0;
				int nowPage = Integer.parseInt((String) mapParameter.get("nowPage"));
				
				int pageSize = 10;
				
				startPageNum = (nowPage-1)*pageSize;
				endPageNum = (nowPage*pageSize)+1;
				
				mapParameter.put("startPageNum", startPageNum);
				mapParameter.put("endPageNum", endPageNum);
				mapParameter.put("user_id", userId);

				//searchStartDate
				
				//paging처리 end
				
				
			//	if(mapParameter.get("searchCont").equals("^^")){		//empty로 파라메터가 넘어오면 에러가 나기 때문에 ^^로 처리함
			//		mapParameter.put("searchCont", "");
					//		System.out.println(mapParameter.get("searchCont"));
			//	}

				result = session.selectList("useBoardInfo.useBoardListConfirm", mapParameter);
					
			}else if(gubun.equals("useBoardConfirm")){
				
				
					if(mapParameter.get("rtnrsn").equals("^^")){		//empty로 파라메터가 넘어오면 에러가 나기 때문에 ^^로 처리함
						mapParameter.put("rtnrsn", "");
						//System.out.println(mapParameter.get("searchCont"));
					}
				
					
				int rst = session.update("useBoardInfo.useBoardConfirm", mapParameter);
				

				if(result == null){
					result = new ArrayList();
				}
				
				result.add(rst);
						

			}else if(gubun.equals("getTotCnt")){
				mapParameter.put("user_id", userId);
				if(searchCont.equals("^^")){		//empty로 파라메터가 넘어오면 에러가 나기 때문에 ^^로 처리함
					mapParameter.put("searchCont", "");
			//		System.out.println(mapParameter.get("searchCont"));
				}
				mapParameter.put("endPageNum", userId);

				result = session.selectList("useBoardInfo.totalCount", mapParameter);
				
			}else if(gubun.equals("getTotCnt2")){
				
				result = session.selectList("useBoardInfo.totalCount2", mapParameter);
				
			}else if(gubun.equals("useBoardView")){
				
				result = session.selectList("useBoardInfo.useBoardView", mapParameter);
			}else if(gubun.equals("useBoardRegist")){
				//System.out.println("in bizlogic"); //2017.12.04 [개발팀] 시큐어코딩
				
				if(sgisUseData.equals("^^")){		
					mapParameter.put("sgisUseData", "");
				}
				if(sgisUseDataOther.equals("^^")){		
					mapParameter.put("sgisUseDataOther", "");
				}
				if(sgisSiteUrl.equals("^^")){		
					mapParameter.put("sgisSiteUrl", "");
				}
				if(sgis_ref_data1.equals("^^")){		
					mapParameter.put("sgis_ref_data1", "");
				}
				if(sgis_ref_data2.equals("^^")){		
					mapParameter.put("sgis_ref_data2", "");
				}
				if(sgis_ref_data3.equals("^^")){		
					mapParameter.put("sgis_ref_data3", "");
				}
				if(sgis_ref_data4.equals("^^")){		
					mapParameter.put("sgis_ref_data4", "");
				}
				if(sgisRefImage.equals("^^")){		
					mapParameter.put("sgisRefImage", "");
				}
				
				mapParameter.put("sgisActCont", sgisActCont.replaceAll("\n", "<br />"));
				
				
				mapParameter.put("user_id", userId);
				
				int rst = session.insert("useBoardInfo.useBoardInsert", mapParameter);
				
				if(result == null){
					result = new ArrayList();
				}
				
				result.add(rst);

			}else if(gubun.equals("useBoardUpdate")){
				
				mapParameter.put("user_id", userId);
				
				if(sgisUseData.equals("^^")){		
					mapParameter.put("sgisUseData", "");
				}
				if(sgisUseDataOther.equals("^^")){		
					mapParameter.put("sgisUseDataOther", "");
				}
				if(sgisSiteUrl.equals("^^")){		
					mapParameter.put("sgisSiteUrl", "");
				}
				if(sgis_ref_data1.equals("^^")){		
					mapParameter.put("sgis_ref_data1", "");
				}
				if(sgis_ref_data2.equals("^^")){		
					mapParameter.put("sgis_ref_data2", "");
				}
				if(sgis_ref_data3.equals("^^")){		
					mapParameter.put("sgis_ref_data3", "");
				}
				if(sgis_ref_data4.equals("^^")){		
					mapParameter.put("sgis_ref_data4", "");
				}
				if(sgisRefImage.equals("^^")){		
					mapParameter.put("sgisRefImage", "");
				}
				
				mapParameter.put("sgisActCont", sgisActCont.replaceAll("\n", "<br />"));
				
				
				int rst = session.update("useBoardInfo.useBoardUpdate", mapParameter);
				
				if(result == null){
					result = new ArrayList();
				}
				
				result.add(rst);
			}else if(gubun.equals("useBoardDelete")){
								
				mapParameter.put("user_id", userId);
				
				
				int rst = session.update("useBoardInfo.useBoardDelete", mapParameter);
				
				if(result == null){
					result = new ArrayList();
				}
					
				result.add(rst);
				
			}
			
			if(result.size()==0){
				throw new NoResultException();
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}
}

