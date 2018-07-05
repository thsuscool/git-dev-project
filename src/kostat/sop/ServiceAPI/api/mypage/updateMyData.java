package kostat.sop.ServiceAPI.api.mypage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.MypageService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class updateMyData extends AbsQuery<List> {
private static final Log logger = LogFactory.getLog(updateMyData.class);
	

	@Resource(name="mypageService")
	private MypageService mypageService;

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "12003";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
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
		return null;
	}
	
	enum MustParam
	{
		data_uid,
		subject,
		usr_data,
		meta_data,
		rdOption,
		map_disp_type,
		dispData,
		tooltipSetting
	}
	//2017 07 31 [개발팀] 수정
	enum OptionParam
	{
		gioField,
		yearList
	}
	
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		List result = new ArrayList();
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			
			Map mapParameter = getParameterMap(req);
			
			
			
			_checkNullParameterValue(mapParameter);
			mapParameter.put("year", Properties.getDefult_bnd_year());
			mapParameter.put("data_uid", req.getParameter("data_uid"));
			mapParameter.put("subject", req.getParameter("subject"));
			mapParameter.put("usr_data", req.getParameter("usr_data"));
			mapParameter.put("meta_data", req.getParameter("meta_data"));
			mapParameter.put("rdOption",req.getParameter("rdOption"));

			mapParameter.put("map_disp_type", req.getParameter("map_disp_type"));
			mapParameter.put("dispData", req.getParameter("dispData"));
			mapParameter.put("tooltipSetting", req.getParameter("tooltipSetting"));
			mapParameter.put("gioField",req.getParameter("gioField"));
			if(req.getParameter("gioField").equals("null")){
				mapParameter.put("gioField",req.getParameter(null));
			}
			
			//2017 07 31 [개발팀] 수정
			if(!req.getParameter("yearList").equals("null") || !req.getParameter("yearList").equals(null)){
				mapParameter.put("yearList",req.getParameter("yearList"));
			}else{
				mapParameter.put("yearList","");
			}
			/*mypageService.deleteMyData(req.getParameter("data_uid"),(String)httpSession.getAttribute("member_id") );*/
			/*result.add(mypageService.selectMyData(req.getParameter("data_uid")));*/
			
			mypageService.updateMyData(mapParameter);
			
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
