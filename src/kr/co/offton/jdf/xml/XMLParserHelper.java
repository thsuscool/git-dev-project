package kr.co.offton.jdf.xml;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import oracle.xml.parser.v2.*;
import org.w3c.dom.*;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

import kr.co.offton.jdf.basis.GeneralObject;

/**
 * <pre>
 * PGM_NAME: OFFTON XMLParserHelper
 * DESC: XLM parsing Util.
 * author: (��)���� Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 *</pre>
 */

public final class XMLParserHelper extends GeneralObject
{

  public XMLParserHelper() { }

  public static Document parseFromString(String s, PrintWriter printwriter)
    throws SAXException, SAXParseException, IOException, MalformedURLException
  {
    return parse(new BufferedInputStream(new ByteArrayInputStream(s.getBytes())), null, printwriter);
  }

  public static Document parseFromString(StringBuffer stringbuffer, PrintWriter printwriter)
    throws SAXException, SAXParseException, IOException, MalformedURLException
  {
    return parseFromString(stringbuffer.toString(), printwriter);
  }

  public static Document parse(URL url, PrintWriter printwriter)
    throws SAXException, SAXParseException, IOException
  {
    DOMParser domparser = new DOMParser();
    domparser.showWarnings(false);
    domparser.setValidationMode(false);
    domparser.setPreserveWhitespace(true);
    domparser.setErrorStream(printwriter);
    domparser.parse(url);
    XMLDocument xmldocument = domparser.getDocument();
    Element element = xmldocument.getDocumentElement();
    if(element == null)
      throw new RuntimeException("Error Parsing the XML Document.");
    else
      return domparser.getDocument();
  }

  public static Document parse(InputStream inputstream, URL url, PrintWriter printwriter)
    throws SAXException, SAXParseException, IOException
  {
    DOMParser domparser = new DOMParser();
    if(url != null)
      domparser.setBaseURL(url);
    domparser.showWarnings(false);
    domparser.setValidationMode(false);
    domparser.setPreserveWhitespace(true);
    domparser.setErrorStream(printwriter);
    domparser.parse(inputstream);
    return domparser.getDocument();
  }

  public static Document parse(Reader reader, PrintWriter printwriter)
    throws SAXException, SAXParseException
  {
    DOMParser domparser = new DOMParser();
    domparser.showWarnings(false);
    domparser.setValidationMode(false);
    domparser.setPreserveWhitespace(true);
    try
    {
      domparser.setErrorStream(printwriter);
      domparser.parse(reader);
    }
    catch(IOException ioexception) {
    	// 2015-12-03 시큐어코딩
    	logger.error(ioexception);
    	
    	if(domparser != null) {
    		domparser = null;
    	}
    }
    XMLDocument xmldocument = domparser.getDocument();
    Element element = xmldocument.getDocumentElement();
    if(element == null)
      throw new RuntimeException("Error Parsing the XML Document.");
    else
      return domparser.getDocument();
  }

  public static Document newDocument()
  {
    return new XMLDocument();
  }

  public static void print(Document document, PrintWriter printwriter)
  {
    try
    {
      ((XMLDocument)document).print(printwriter);
    }
    catch(IOException ioexception) {
    	// 2015-12-03 시큐어코딩
    	logger.error(ioexception);
    	
    	if(document != null) {
    		document = null;
    	}
    	
    	if(printwriter != null) {
    		printwriter = null;
    	}
    }
  }

  private static String getNamespaceOfElement(Element element)
  {
    String s = element.getNodeName();
    boolean flag = s.indexOf(":") >= 0;
    if(flag)
      return ((XMLElement)element).getNamespace();
    else
      return s;
  }

  public static String getExpandedNameOfElement(Element element)
  {
    String s = element.getNodeName();
    boolean flag = s.indexOf(":") >= 0;
    if(flag)
      return ((XMLElement)element).getExpandedName();
    else
      return s;
  }

  public static String getExpandedNameOfAttribute(Attr attr, Element element)
  {
    String s = attr.getNodeName();
    boolean flag = s.indexOf(":") >= 0;
    if(flag)
      return ((XMLAttr)attr).getExpandedName();
    else
      return getNamespaceOfElement(element) + ":" + s;
  }
}