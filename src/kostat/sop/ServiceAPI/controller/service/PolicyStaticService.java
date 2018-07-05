//========== 2017.08.11 [개발팀] 정책통계지도 PolicyStaticService추가  START ==========//
package kostat.sop.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface PolicyStaticService {
	public List<Map> policyStaticCategoryList() throws SQLException;
}
//========== 2017.08.11 [개발팀] 정책통계지도 PolicyStaticService추가  END ==========//