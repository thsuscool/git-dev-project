package kostat.sop.ServiceAPI.view;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.Namespace;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.model.NFData;

public class KmlFormat extends AbsKmlFormat<Element> {
	final Log	__logger	= LogFactory.getLog(KmlFormat.class);
	
	private String __transferXMLToString(Element root) throws AbsException {		
		Document doc = new Document(root);
		//
		// XML 출력을 위한 outer를 정의한다.
		XMLOutputter outputter = new XMLOutputter();
		Format fm = outputter.getFormat();
		// fm.setIndent("  ");
		// fm.setLineSeparator("\r\n");
		fm.setEncoding(getCharset());
		outputter.setFormat(fm);
		
		return outputter.outputString(doc);
	}

	public Element makeHeader(NFData resultData) throws AbsException {
		Element root;
		Namespace atom = Namespace.getNamespace("http://www.opengis.net/kml/2.2"); 
		root = new Element("kml");
		root.setNamespace(atom);
//		root.setAttribute( "xmlns",  "http://www.opengis.net/kml/2.2");
		if(__logger.isDebugEnabled()) {
			__logger.debug("errCd : " + resultData.getInt(CommonTag.errCd.name()));
			__logger.debug("errMsg : " + resultData.getString(CommonTag.errMsg.name()));
			__logger.debug("id : " + resultData.getString(CommonTag.id.name()));
			__logger.debug("trId : " + resultData.getString(CommonTag.trId.name()));
//			__logger.debug("errCd : " + resultData.getString(CommonTag.ERRCD.name()));
		}
		_addAttr(root, CommonTag.errCd.name(), resultData.getInt(CommonTag.errCd.name()) + "");
		_addAttr(root, CommonTag.errMsg.name(), resultData.getString(CommonTag.errMsg.name()));
		_addAttr(root, CommonTag.id.name(), resultData.getString(CommonTag.id.name()));
		_addAttr(root, CommonTag.trId.name(), resultData.getString(CommonTag.trId.name()));
//		_addAttr(root, "", "http://www.opengis.net/kml/2.2");

		return root;	
	}

	@Override
	public String makeResult(NFData resultData, Element jobObj)
			throws AbsException {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
