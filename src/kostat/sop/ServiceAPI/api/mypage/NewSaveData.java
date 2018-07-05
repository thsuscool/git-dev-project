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

public class NewSaveData extends AbsQuery<List> {
private static final Log logger = LogFactory.getLog(NewSaveData.class);
	

	@Resource(name="mypageService")
	private MypageService mypageService;

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "12004";
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
		data_title,
		geoDataArray,
		usr_data,
		meta_data,
		map_disp_type,
		dispData,
		tooltipSetting,
		file_nm_real,
		tot_type,
		gioField
	}
	
	//2017 07 31 [개발팀] 수정
	enum OptionParam
	{
		yearList
	}
	//2017 07 31 [개발팀] 수정 종료
	
	
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
			
			mapParameter.put("subject", req.getParameter("data_title"));
			mapParameter.put("geoDataArray", req.getParameter("geoDataArray"));
			
			mapParameter.put("usr_data", req.getParameter("usr_data"));
			mapParameter.put("meta_data", req.getParameter("meta_data"));
			mapParameter.put("map_disp_type", req.getParameter("map_disp_type"));
			mapParameter.put("dispData", req.getParameter("dispData"));
			mapParameter.put("tooltipSetting", req.getParameter("tooltipSetting"));
			mapParameter.put("file_nm_real", req.getParameter("file_nm_real"));
			mapParameter.put("member_id",(String)httpSession.getAttribute("member_id"));
			mapParameter.put("member_nm",(String)httpSession.getAttribute("member_nm"));
			mapParameter.put("tot_type",req.getParameter("tot_type"));
			mapParameter.put("gioField", req.getParameter("gioField"));
			
			//2017 07 31 [개발팀] 수정
			
			if( req.getParameter("yearList") != null && !("null").equals( req.getParameter("yearList") ) ){
				mapParameter.put("yearList",req.getParameter("yearList"));
			} else {
				mapParameter.put("yearList","");
			}
			
			//2017 07 31 [개발팀] 수정 종료
			
			mypageService.newSaveMyData(mapParameter);
			
			if(result.size()==0){
				throw new NoResultException();
			}
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
			e.printStackTrace();
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
			throw new ApiException(StringUtil.getErrMsg());
		}
		
		return result;
	}

}
