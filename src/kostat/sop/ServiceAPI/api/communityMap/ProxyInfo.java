package kostat.sop.ServiceAPI.api.communityMap;

public class ProxyInfo {
	private String fromURL;
	private String toURL;
	
	public ProxyInfo(String from, String to) {
		fromURL = from;
		toURL = to;
	}
	
	public String getFromUrl() {
		return fromURL;
	}
	
	public String getToUrl() {
		return toURL;
	}
	

}
