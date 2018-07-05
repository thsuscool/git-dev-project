/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kostat.sop.ServiceAPI.common.util;

import java.security.MessageDigest;

import kostat.sop.ServiceAPI.common.security.Security;
import sun.misc.BASE64Encoder;
import KISA.SHA256;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class EncryptPassword {
	private static final Log logger = LogFactory.getLog(EncryptPassword.class);
	
	public EncryptPassword() {
		super();
	}
	
	//비밀번호 암호화
	public String encryptPassword(String pm_sPasswd)
	{
		String lm_sEncryptedPasswd = null;
		
		try
		{
			if(pm_sPasswd == null)
			pm_sPasswd = "";
			MessageDigest lm_oMD = MessageDigest.getInstance("MD5");
			lm_oMD.reset();
			lm_oMD.update(pm_sPasswd.getBytes());
			byte lm_oHash[] = lm_oMD.digest();
			String d = "";
			for(int i = 0; i < lm_oHash.length; i++)
			{
				int v = lm_oHash[i] & 0xff;
				if(v < 16)
				d = d + "0";
				d = d + Integer.toString(v, 16);
			}
		
			BASE64Encoder encoder = new BASE64Encoder();
			lm_sEncryptedPasswd = encoder.encode(d.getBytes());
			return lm_sEncryptedPasswd;
		}
		catch(Exception e)
		{
			//2015-12-03 시큐어코딩
			//e.printStackTrace(); 
			logger.info(StringUtil.getErrMsg()+e);
			
			if(lm_sEncryptedPasswd != null) {
				lm_sEncryptedPasswd = null;
			}
		}
		
		return null;
	}
    
	/* 2014.10.07 회원 페스워드 암호화 모듈 변경으로 인한 추가 작업
	 * MD5 부분을 SHA_256으로 변경 작업 진행 한다. 
	 * 
	 */
	public String encryptPassword_SHA256(String pm_sPasswd)
	{
		StringBuffer sbuf = new StringBuffer(); 
		String lm_sEncryptedPasswd = null;
		BASE64Encoder encoder = new BASE64Encoder();
			
		    
		try
		{
			if(pm_sPasswd == null)
			pm_sPasswd = "";
			       
			String sPlainText = pm_sPasswd;
			SHA256 s = new SHA256(sPlainText.getBytes());
			lm_sEncryptedPasswd = encoder.encode(s.GetHashCode());
			        
			return lm_sEncryptedPasswd;
		}
		catch(Exception e)
		{
			//2015-12-03 시큐어코딩
			logger.info(StringUtil.getErrMsg()+e);
			//e.printStackTrace(); 
			
			if(sbuf != null) {
				sbuf = null;
			}
			
			if(lm_sEncryptedPasswd != null) {
				lm_sEncryptedPasswd = null;
			}
			
			if(encoder != null) {
				encoder = null;
			}
		}
		
		return null;
	
	}
	// end

}
