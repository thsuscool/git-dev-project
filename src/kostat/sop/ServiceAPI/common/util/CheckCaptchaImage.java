package kostat.sop.ServiceAPI.common.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.octo.captcha.service.CaptchaServiceException;

public class CheckCaptchaImage extends HttpServlet {

	public void init(ServletConfig servletConfig) throws ServletException {

		super.init(servletConfig);

	}

	protected void doGet(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException, IOException {
		Boolean isResponseCorrect = Boolean.FALSE;
		
		try {
			String captchaId = httpServletRequest.getSession().getId();

			//remenber that we need an id to validate!
			//retrieve the response
			String response = httpServletRequest.getParameter("j_captcha_response");
			
			isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response);
		} catch (IllegalArgumentException e) {
			httpServletResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		} catch (CaptchaServiceException e) {
			httpServletResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}

		// flush it in the response
		httpServletResponse.setContentType("text/html; charset=UTF-8");
		ServletOutputStream responseOutputStream = httpServletResponse.getOutputStream();
		if(isResponseCorrect) {
			responseOutputStream.write(0);
		} else {
			responseOutputStream.write(1);
		}
		responseOutputStream.flush();
		responseOutputStream.close();
	}
}
