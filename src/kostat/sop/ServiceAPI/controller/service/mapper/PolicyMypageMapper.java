package kostat.sop.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("policyMypageMapper")
public class PolicyMypageMapper extends EgovAbstractMapper {
	@Resource(name = "sqlSession2")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	public int SelectListMyDataCount(HashMap<String,Object> mapParameter) throws SQLException {
		return selectOne("policyStaticMypage.selectMyDataListCount",mapParameter);
	}
	public List<HashMap<String,Object>> SelectListMyData(HashMap<String,Object> mapParameter) throws SQLException {
		return selectList("policyStaticMypage.selectMyDataList",mapParameter);
	}
}