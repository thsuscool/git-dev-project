package kostat.sop.ServiceAPI.api.bizStats.dto;

import java.util.ArrayList;
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
		ArrayList arr = new ArrayList();
		arr.addAll(this.company_list);
		return arr;
	}
	public void setCompany_list(List company_list) {
		this.company_list = new ArrayList();
		this.company_list.addAll(company_list);
	} 
	
	
}
