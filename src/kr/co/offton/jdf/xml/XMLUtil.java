package kr.co.offton.jdf.xml;

import java.io.*;
import java.net.URL;
import java.util.Dictionary;
import java.util.Enumeration;
import oracle.xml.parser.v2.*;
import org.w3c.dom.*;

import kr.co.offton.jdf.basis.GeneralObject;

/**
 * <pre>
 * PGM_NAME: OFFTON XMLUtil
 * DESC: XLM parsing Util.
 * author: (��)���� Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 */
public final class XMLUtil  extends GeneralObject
{
  public XMLUtil() { }

  public static NodeList select(Document document, String s)
  {
    return select((XMLDocument)document, s);
  }

  public static NodeList select(XMLDocument xmldocument, String s)
  {
    try
    {
      NodeList nodelist = xmldocument.selectNodes(s, (NSResolver)xmldocument.getDocumentElement());
      return nodelist;
    }
    catch(XSLException xslexception)
    {
      NodeList nodelist1 = null;
      return nodelist1;
    }
  }

  public static NodeList select(Element element, String s)
  {
    return select((XMLElement)element, s);
  }

  public static NodeList select(XMLElement xmlelement, String s)
  {
    try
    {
      NodeList nodelist = xmlelement.selectNodes(s, xmlelement);
      return nodelist;
    }
    catch(XSLException xslexception)
    {
      NodeList nodelist1 = null;
      return nodelist1;
    }
  }

  public static Node selectFirst(Document document, String s)
  {
    return selectFirst((XMLDocument)document, s);
  }

  public static Node selectFirst(XMLDocument xmldocument, String s)
  {
    Node node1 = null;
    try
    {
      NodeList nodelist = xmldocument.selectNodes(s, (NSResolver)xmldocument.getDocumentElement());
      if(nodelist != null) {
    	  node1 = nodelist.getLength() <= 0 ? null : nodelist.item(0);  
      }
    }
    catch(XSLException xslexception)
    {
      node1 = null;
    }
    return node1;
  }

  public static Node selectFirst(Element element, String s)
  {
    return selectFirst((XMLElement)element, s);
  }

  public static Node selectFirst(XMLElement xmlelement, String s)
  {
    Node node1 = null;
    try
    {
      NodeList nodelist = xmlelement.selectNodes(s, xmlelement);
      if(nodelist != null) {
    	  node1 = nodelist.getLength() <= 0 ? null : nodelist.item(0);  
      }
    }
    catch(XSLException xslexception)
    {
      node1 = null;
    }
    return node1;
  }

  public static String valueOf(Element element, String s)
  {
    return valueOf((XMLNode)element, s);
  }

  public static String valueOf(Node node, String s)
  {
    return valueOf((XMLNode)node, s);
  }

  public static String valueOf(XMLElement xmlelement, String s)
  {
    return valueOf(xmlelement, s);
  }

  public static String valueOf(XMLNode xmlnode, String s)
  {
    try
    {
        NSResolver nsresolver = null;
        if(xmlnode instanceof XMLElement)
          nsresolver = (NSResolver)xmlnode;
        
        if(nsresolver != null) {
        	NodeList nodelist = xmlnode.selectNodes(s, nsresolver);
            if(nodelist != null && nodelist.getLength() > 0)
            {
              XMLNode xmlnode1 = (XMLNode)nodelist.item(0);
              if(xmlnode1 instanceof XMLText)
              {
                String s3 = xmlnode1.getNodeValue();
                return s3;
              }
              if(xmlnode1 instanceof XMLAttr)
              {
                String s4 = ((XMLAttr)xmlnode1).getNodeValue();
                return s4;
              }
              if(xmlnode1 instanceof XMLElement)
              {
                ((XMLElement)xmlnode1).normalize();

                String s5 = content((XMLElement)xmlnode1);
                return s5;
              }
            }
            else
            {
              return "";
            }
        }
    }
    catch(XSLException xslexception)
    {
      return "";
    }
    return "";
  }

  private static String content(XMLElement xmlelement)
  {
    StringBuffer stringbuffer = new StringBuffer();
    NodeList nodelist = xmlelement.getChildNodes();

    if(nodelist != null && nodelist.getLength() > 0)
    {
      int i = nodelist.getLength();
      for(int j = 0; j < i; j++)
      {
        XMLNode xmlnode = (XMLNode)nodelist.item(j);
        short word0 = xmlnode.getNodeType();
        if(word0 == 3)
            stringbuffer.append(xmlnode.getNodeValue());
        else if(word0 == 1)
            stringbuffer.append(content((XMLElement)xmlnode));
      }
    }
    return stringbuffer.toString();
  }

  public static XMLDocument DictionaryOfParamsAsXMLDocument(Dictionary dictionary)
  {
    XMLDocument xmldocument1;
    Element element1;
    String s;
    StringWriter stringwriter;
    try
    {
        Enumeration enumeration = null;
        if(dictionary != null)
            enumeration = dictionary.keys();

        XMLDocument xmldocument = new XMLDocument();
        Element element = xmldocument.createElement("request");
        xmldocument.appendChild(element);
        Element element2 = xmldocument.createElement("parameters");
        element.appendChild(element2);
        if(enumeration != null)
        {
          Element element3;
          org.w3c.dom.Text text1;
          for(; enumeration.hasMoreElements(); element3.appendChild(text1))
          {
            String s1 = (String)enumeration.nextElement();
            String s2 = (String)dictionary.get(s1);
            element3 = xmldocument.createElement(s1);
            element2.appendChild(element3);
            text1 = xmldocument.createTextNode(s2);
          }
        }
        XMLDocument xmldocument2 = xmldocument;
        return xmldocument2;
      }
      catch(Exception exception)
      {
        xmldocument1 = new XMLDocument();
        element1 = xmldocument1.createElement("request");
        s = exception.getMessage();
        stringwriter = new StringWriter();
        PrintWriter printwriter = new PrintWriter(stringwriter);
      }
      if(s != null)
        s = s + stringwriter.toString();
      else
        s = stringwriter.toString();
      org.w3c.dom.Text text = xmldocument1.createTextNode(s == null ? "" : s);
      element1.appendChild(text);
      xmldocument1.appendChild(element1);
      XMLDocument xmldocument3 = xmldocument1;
      return xmldocument3;
  }

  public static String XL(String s, String s1)
  {
    try
    {
      String s2 = new String(s.getBytes("8859_1"), s1);
      return s2;
    }
    catch(UnsupportedEncodingException unsupportedencodingexception)
    {
      String s3 = "-?-";
      return s3;
    }
  }

  public static String safeURLAsString(URL url)
  {
    String s = url.toExternalForm();
    if(s.startsWith("file:/"))
      return "file:///" + s.substring(6);
    else
      return s;
  }

  public static String translate(String s, String s1)
  {
    try
    {
      if(!s.startsWith("file:/") && !s.startsWith("http:/"))
          s = "file:///" + s;
      String s2 = translate(new URL(s), s1);
      return s2;
    }
    catch(Exception exception)
    {
      String s3 = null;
      return s3;
    }
  }

  public static String translate(URL url, String s) throws Exception
  {
    try
    {
      String s1 = safeURLAsString(new URL(url, s));
      return s1;
    }
    catch(Exception exception)
    {
      String s2 = null;
      return s2;
    }
  }

  public static String stringParamValue(Object obj)
  {
    if(obj == null)
      return null;
    if(obj instanceof String)
      return (String)obj;
    if(obj instanceof String[])
    {
      String as[] = (String[])obj;
      if(as.length > 0)
        return as[0];
      else
        return null;
    }
    else
    {
      return null;
    }
  }
}