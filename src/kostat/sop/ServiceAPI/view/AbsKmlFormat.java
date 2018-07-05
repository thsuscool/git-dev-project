package kostat.sop.ServiceAPI.view;

import java.io.IOException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.util.KmlRenderer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jdom2.Element;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.exception.ServerInternalException;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.model.NFArray;
import com.neighborsystem.durian.restapi.model.NFData;
import com.neighborsystem.durian.restapi.model.NFString;
import com.neighborsystem.durian.restapi.view.AbsXmlFormat;

public abstract class AbsKmlFormat<T> extends com.neighborsystem.durian.restapi.view.AbsFormat<T>{

	final Log	_logger		= LogFactory.getLog(AbsXmlFormat.class);
	
	/**
	 * 부모 element에 자식 element 추가
	 * @param parent 부모 Element 객체
	 * @param xmlTag 추가될 자식 Element 태그명
	 * @return 추가된 자식 Element 객체
	 * @throws AbsNFException
	 */
	protected Element _addElement(Element parent, String xmlTag) throws AbsException {
		if (parent == null) throw new ServerInternalException("XML Element Add[" + xmlTag + "] parent is null");

		Element child = _createElement(xmlTag);
		parent.addContent(child);
		return child;
	}
	
	/**
	 * 태그 생성
	 * @param xmlTag
	 * @return
	 * @throws AbsNFException
	 */
	protected Element _createElement(String xmlTag) throws AbsException {
		if (xmlTag == null) throw new ServerInternalException("XML Element Add[" + xmlTag + "] is null");

		Element ele = new Element(xmlTag);
		return ele;
	}

	/**
	 * 부모 Element에 자식 Element를 추가하고 데이타 속성 추가기능
	 * @param parent 부모 Element 객체
	 * @param xmlTag 자식 Element 태그명
	 * @param text 추가된 자식 Element에 추가될 text속성 값
	 * @return 추가된 자식 Element 객체
	 * @throws AbsNFException
	 */
	protected Element _addText(Element parent, String xmlTag, String text) throws AbsException {
		if (parent == null) throw new ServerInternalException("XML Element Add[" + xmlTag + "] parent is null");
		if (xmlTag == null) throw new ServerInternalException("XML Text Add[" + text + "] xmlTag is null");

		Element child = _addElement(parent, xmlTag);
		child.setText(text);
		return child;
	}
	
	/**
	 * XML 태그의 속성 정보를 추가하는 함수
	 * @param element  대상 캐드 Object
	 * @param attrName attribute 속성명
	 * @param attrValue attrbute 속성값
	 * @throws AbsNFException
	 */
	protected void _addAttr(Element element, String attrName, String attrValue) throws AbsException {
		if( attrName == null) throw new ServerInternalException("XML Element attribute[" + attrName + "] is null");
		
		element.setAttribute(attrName, attrValue);
	}

	/**
	 * element의 text속성에 값을 추가하는 기능
	 * @param element 추가 대상 element 객체
	 * @param text text속성에 추가할 값(문자열)
	 * @throws AbsNFException
	 */
	protected void _addText(Element element, String text) throws AbsException {
		if (element == null) throw new ServerInternalException("XML Text Add[" + text + "] element is null");
		element.setText(text);
	}

	/**
	 * Number 값을 추가하는 기능
	 * @param element 값이 추가될 Element 객체
	 * @param num 추가될 값이 있는 객체
	 * @throws AbsNFException
	 */
	protected void _addNumber(Element element, Number num) throws AbsException {
		if (element == null)
			throw new ServerInternalException("XML Number Add[" + num.toString() + "] element is null");
		if (num == null) throw new ServerInternalException("Null Pointer");

		_validity(num);

		String s = num.toString();
		if (s.indexOf('.') > 0 && s.indexOf('e') < 0 && s.indexOf('E') < 0) {
			while (s.endsWith("0")) {
				s = s.substring(0, s.length() - 1);
			}
			if (s.endsWith(".")) {
				s = s.substring(0, s.length() - 1);
			}
		}

		_addText(element, s);
	}
	
	protected void _makeNFArray(NFArray array, Element element) throws AbsException {
		Element newDataTag = null;
		Object data = null;

		int arrSize = array.size();
		for (int i = 0; i < arrSize; i++) {
			data = array.get(i);
			if (data instanceof NFArray) {
				newDataTag = _addElement(element, "datas");
			}else{ 
				newDataTag = _addElement(element, "Document");
			}
			_valueToXML(data, newDataTag);
		}

	}
	
	/**
	 * 사용자 정의 data model을 XML로 만드는 기능
	 * @param userData IUserDefineData를 상속받은 사용자 정의 data model 객체
	 * @param element 추가될 상위 XML element
	 * @throws AbsNFException 이상발생시 발생시킬 Exception 타입
	 */
	protected void _makeNFData(NFData data, Element element) throws AbsException {
		// Element dataTag = __makeXML(data);
		// if (dataTag != null) element.addContent(dataTag);

		// Element parent = new Element(BaseTag.RESPONSE.name());
		Element child = null;
		Object key = null;

		try {
			Iterator keys = data.keys();

			while (keys.hasNext()) {
				key = keys.next();
				child = _addElement(element, key.toString());
				_valueToXML(data.get(key), child);
			}
		}catch(NullPointerException e){
			_logger.error(e.getMessage());
			throw new ServerInternalException("Error making XML data");
		}
		catch (Exception e) {
			_logger.error(e.getMessage());
			throw new ServerInternalException("Error making XML data");
		}
		// return parent;
	}
	
	/**
	 * 숫자형 객체가 정당한지 판단하는 기능
	 * @param o 판단할 객체로 숫자형 객체
	 * @throws AbsNFException
	 */
	protected void _validity(Object o) throws AbsException {
		if (o != null) {
			if (o instanceof Double) {
				if (((Double) o).isInfinite() || ((Double) o).isNaN()) { throw new ServerInternalException("NF does not allow non-finite numbers."); }
			}
			else if (o instanceof Float) {
				if (((Float) o).isInfinite() || ((Float) o).isNaN()) { throw new ServerInternalException("NF does not allow non-finite numbers."); }
			}
		}
	}
	
	protected void _makeUserDefineData(Object bean, Element element) throws AbsException {
		Element newChildElement = null;
		Class klass = bean.getClass();

		// If klass is a System class then set includeSuperClass to false.

		boolean includeSuperClass = klass.getClassLoader() != null;

		Method[] methods = (includeSuperClass) ? klass.getMethods() : klass.getDeclaredMethods();
		for(int i = 0; i < methods.length; i += 1)
		{
			try
			{
				Method method = methods[i];
				if(Modifier.isPublic(method.getModifiers()))
				{
					String name = method.getName();
					String key = "";
					if(name.startsWith("get"))
					{
						if(name.equals("getClass") || name.equals("getDeclaringClass"))
						{
							key = "";
						}
						else
						{
							key = name.substring(3);
						}
					}
					else if(name.startsWith("is"))
					{
						key = name.substring(2);
					}
					if(key.length() > 0 && Character.isUpperCase(key.charAt(0)) && method.getParameterTypes().length == 0)
					{
						if(key.length() == 1)
						{
							key = key.toLowerCase();
						}
						else if(!Character.isUpperCase(key.charAt(1)))
						{
							key = key.substring(0, 1).toLowerCase() + key.substring(1);
						}

						Object result = method.invoke(bean, (Object[]) null);
						
						newChildElement = _addElement(element, key);
						_valueToXML(result, newChildElement);
					}
				}
			}
			catch(NullPointerException e){
				_logger.error(e.getMessage());
				throw new ServerInternalException("Error making XML data");
			}catch(Exception ignore)
			{
				throw new ServerInternalException("Error making XML data");
			}
		}
	}
	
	protected void _valueToXML(Object value, Element element) throws AbsException {
		if (value == null || value.equals(null)) { return; }
		if (value instanceof NFString) {
			Object o;
			try {
				o = ((NFString) value).toNFString();
			}
			catch(NullPointerException e){
				_logger.error(e.getMessage());
				throw new ServerInternalException("Error making XML data");
			}catch (Exception e) {
				throw new ServerInternalException(e.getMessage());
			}
			if (o instanceof String) {
				_addText(element, (String) o);
				return;
			}
			throw new ServerInternalException("Bad value from toNFString: " + o);
		}
		
		if(value instanceof Character) { _addText(element, ((Character) value).toString()); return;}
		if(value instanceof Short || value instanceof Integer || value instanceof Long || value instanceof Float || value instanceof Double) {
			_addNumber(element, (Number) value);
			return;
		}
		if(value instanceof String) { _addText(element, (String)value); return;}
		
		
		if (value instanceof Number) { _addNumber(element, (Number) value); return;}
		if (value instanceof Boolean) {	_addText(element, ((Boolean) value).toString()); return;}
		if (value instanceof NFData) { _makeNFData((NFData) value, element); return;}
		if (value instanceof NFArray) { _makeNFArray((NFArray) value, element); return; }
		if (value instanceof Map) { _makeNFData(new NFData((Map) value), element); return; }
		if (value instanceof Collection) { _makeNFArray(new NFArray((Collection) value), element); return; }
		if (value.getClass().isArray()) { _makeNFArray(new NFArray(value), element); return; }
		if (value instanceof Object) { _makeUserDefineData(value, element); return; }
		_addText(element, value.toString());
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> map, HttpServletRequest req,	HttpServletResponse res) throws IOException {
		T element = null;
		String sendText = null;
//		Map kmlmap = makekmlhash(map);
		NFData data = new NFData(map);
//		NFData kmldata = new NFData(kmlmap);
		res.setContentType(getContentType());
		//res.addHeader("Access-Control-Allow-Origin", "*");
		//res.setCharacterEncoding("UTF-8");

		if (_logger.isDebugEnabled()) {
			_logger.debug("ErrorCode[" + data.get(CommonTag.errCd.name()) + "]");
		}

		try {
//			element = makeHeader(data);
			sendText = makeResult(map, null);
			//doFormat(data, sbFormat);

			if (_logger.isDebugEnabled()) {
				_logger.debug("----------------------------------[RESPONSE]----------------------------------");
				_logger.debug(sendText);
				_logger.debug("------------------------------------------------------------------------------");
			}
			
			if( sendText != null )
			{
				res.getOutputStream().write(sendText.getBytes());
			}
			
			res.getOutputStream().flush();
		}
		catch (AbsHttpException e) {
			_logger.error(e);
			throw e;
		}
		finally {
			data.clear();
			sendText = null;
			data = null;
		}
	}
	
	public String makeResult(Map resultData, Element root) throws AbsException {
		return KmlRenderer.renderKml(resultData);
	}

	
//	public Map makekmlhash(Map mapdata){
//		Map mapresult= (Map) mapdata.get("result");
//		NFData result = new NFData();
//		List resultlist = new ArrayList();
//		NFData Document = new NFData();
//		NFData Placemark = new NFData();
//		Placemark.put("name", mapresult.get("name"));
//		Placemark.put("description", mapresult.get("description"));
//		NFData MultiGeometry = new NFData();
//		NFData Polygon = new NFData();
//		NFData outerBoundaryIs = new NFData();
//		NFData LinearRing = new NFData();
//		LinearRing.put("coordinates", mapresult.get("coordinates"));
//		
//		outerBoundaryIs.put("LinearRing", LinearRing);
//		Polygon.put("outerBoundaryIs", outerBoundaryIs);
//		MultiGeometry.put("Polygon", Polygon);
//		Placemark.put("MultiGeometry", MultiGeometry);
//		Document.put("Placemark",Placemark);
//		resultlist.add(Document);
//		result.put(CommonTag.result.name(), resultlist);
//		return result;
//	}
}
