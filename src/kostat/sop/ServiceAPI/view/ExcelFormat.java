package kostat.sop.ServiceAPI.view;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.AbstractView;

import com.neighborsystem.durian.restapi.api.CommonTag;

/**
 * Created by htkim on 2014-10-30.
 * AbsAPI를 상속한 엑셀 다운로드 API 뷰 처리를 담당 한다.
 * 엑셀 다운로드 API 에서는 executeAPI 결과 값으로 Map 타입을 반환 해야 하고,
 * 반환 Map 구성은 아래와 같아야 한다.
 * {
 * 		filename: '다운로드 받을 파일 명',
 * 		workbook: org.apache.poi.ss.usermodel.Workbook
 *
 * }
 */
@SuppressWarnings("unchecked")
public class ExcelFormat extends AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws IOException  {

		if(logger.isDebugEnabled()) {
			logger.debug("render modes :[ " + model + " ]");
		}

		// JSON 으로 변환 하면 안된다.
		//NFData data = new NFData(model);
		Map data = model;
		Workbook wb;
		logger.info("getContentType() :: " + getContentType());
		res.setContentType(getContentType());

		if (logger.isDebugEnabled()) {
			logger.debug("ErrorCode[" + data.get(CommonTag.errCd.name()) + "]");
		}

		try {
			//setContentType("text/html;charset=UTF-8");
			Map<String, Object> mapResult = (Map<String, Object>) data.get(CommonTag.result.name());
			String fileName = (String) mapResult.get("filename");
			setContentDisposition(res, fileName);

			wb = (Workbook) mapResult.get("workbook");

			if (wb != null) {
				wb.write(res.getOutputStream());
			}

			res.getOutputStream().flush();
		} finally {
			data.clear();
			data = null;
			wb = null;
		}
	}

	private void setContentDisposition(HttpServletResponse res, String filename) {
		res.setHeader("Content-disposition", "attachment; filename=" + filename);
	}
}
