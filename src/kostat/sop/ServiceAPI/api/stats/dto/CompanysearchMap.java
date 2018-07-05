package kostat.sop.ServiceAPI.api.stats.dto;

import java.util.List;

public class CompanysearchMap {
	private int totalcount; 
	private int returncount; 
	private int pagenum; 
	private List company_list;
	
	
	public int getReturncount() {
		return returncount;
	}
	public void setReturncount(int returncount) {
		this.returncount = returncount;
	}
	public int getPagenum() {
		return pagenum;
	}
	public void setPagenum(int pagenum) {
		this.pagenum = pagenum;
	}
	public int getTotalcount() {
		return totalcount;
	}
	public void setTotalcount(int totalcount) {
		this.totalcount = totalcount;
	}
	public List getCompany_list() {
		return company_list;
	}
	public void setCompany_list(List company_list) {
		this.company_list = company_list;
	} 
	
	
}
