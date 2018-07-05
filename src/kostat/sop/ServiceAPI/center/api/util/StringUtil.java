package kostat.sop.ServiceAPI.center.api.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class StringUtil
{
	public static synchronized String getRandomString(int length)
	{
		StringBuilder buffer = new StringBuilder();
		Random random = new Random();

		String chars[] = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9,=,*,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");

		for(int i = 0; i < length; i++)
		{
			buffer.append(chars[random.nextInt(chars.length)]);
		}
		
		return buffer.toString();
	}
	
	public static String encodeURL(String args, String charset)
	{
		if(args == null) return "";

		String strEncoded = null;
		try
		{
			strEncoded = URLEncoder.encode(args, charset);
		}
		catch(UnsupportedEncodingException e)
		{
			return "";
		}
		return strEncoded;
	}
	
	public static String decodeURL(String args, String charset)
	{
		if(args == null) return "";

		String strEncoded = null;
		try
		{
			strEncoded = URLDecoder.decode(args, charset);
		}
		catch(UnsupportedEncodingException e)
		{
			return "";
		}
		return strEncoded;
	}
}
