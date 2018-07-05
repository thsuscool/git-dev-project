package kostat.sop.ServiceAPI.common.security;

import org.springframework.util.Assert;

public class AccessToken {
	private String token;
	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public AccessToken(String token) {
		this.token = token;
//		this.client = client;
		invariant();
	}

	private void invariant() {
		Assert.notNull(token, "Token may not be null");
	}

	@Override
	public String toString() {
		return token;
	}
}
