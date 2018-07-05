package kostat.sop.ServiceAPI.view;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.model.NFData;

/**
 * 데이타를 출력하기 위한 최상위 인터페이스
 * @author rainmaker
 */
public interface IFormat<T>
{
	T makeHeader(NFData resultData) throws AbsException;
	String makeResult(NFData resultData, T jobObj) throws AbsException;
}
