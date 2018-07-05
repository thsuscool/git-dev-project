package kostat.sop.ServiceAPI.common.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.ServerInternalException;

import kostat.sop.ServiceAPI.common.geom.Geometry;
import kostat.sop.ServiceAPI.common.geom.LineString;
import kostat.sop.ServiceAPI.common.geom.MultiPolygon;
import kostat.sop.ServiceAPI.common.geom.Polygon;
import kostat.sop.ServiceAPI.common.geom.WKBAdapter;
import kostat.sop.ServiceAPI.exception.ApiException;



public class GeojsonRenderer {
	
	
	public static String renderGeojson(Map bnd) throws AbsException  {
		
		List<Map> bndList = (List) bnd.get("result");

		List<Object> testList = (List) bnd.get("result");
		
		
		StringBuffer buf = new StringBuffer();
		buf.append("{\"type\": \"FeatureCollection\",");
		buf.append("\"id\": \""+bnd.get("id")+"\",");
		buf.append("\"errMsg\": \""+bnd.get("errMsg")+"\",");
		buf.append("\"errCd\": "+bnd.get("errCd")+",");
		buf.append("\"trId\": \""+bnd.get("trId")+"\",");
		buf.append("\"ts\": \""+bnd.get("ts")+"\",");
		buf.append(" \"features\": [");

		if(bndList!=null&&bndList.size()!=0){

			if(testList instanceof List){
				
				buf.append(generateByGeojsonModel(bndList));
				
			}else if(testList instanceof Map){

				buf.append(generateByGeojsonModel(bndList));
				
			}
			
		}else{
				buf.append("]}");
		}
		return buf.toString();
	}
	
	public static String renderGeojson(List<Map> bndList) {

		StringBuffer buf = new StringBuffer();
		buf.append("{\"type\": \"FeatureCollection\",");
		buf.append(" \"features\": [");
		if(bndList.size()!=0){
			buf.append(generateByGeojsonModel(bndList));
			}else{
				buf.append("]}");
			}
		return buf.toString();
	}
	
	private static String generateByGeojsonModel(List<Map> bndList) throws AbsException {
		StringBuffer buf = new StringBuffer();
		try {
			Map model = null;
			//Iterator<Map> itr = bndList.iterator();
			Iterator<Map> itr = bndList.iterator();
			
			while (itr.hasNext()) {
				
				Object obj = itr.next();
				if(obj instanceof List){
					Iterator<Map> itr2 = ((List)obj).iterator();
					
					while(itr2.hasNext()){
						model = (Map) itr2.next();
						buf.append(getGeojsonPiece(model));	
					}
				}else if(obj instanceof Map){

					//model = (Map) itr.next();
					model = (Map) obj;
					buf.append(getGeojsonPiece(model));	
				}
				
			}
		}catch(NullPointerException e){
			throw new ServerInternalException(e.getMessage());
		}catch (Exception e) {
			throw new ServerInternalException(e.getMessage());
		}
		if(buf.toString().equals("")){
			return "";
		}else{
			return buf.toString().substring(0,buf.toString().length()-1)+"]}";
		}
	}

	private static String getGeojsonPiece(Map model) {

		StringBuffer buf = new StringBuffer();
		buf.append("{\"type\":"+"\"Feature\",");
		
		
		

		String path_contents = "";
		byte[] geometrybyte =  (byte[]) model.get("geometry");
		Geometry geometry = WKBAdapter.wkbToGeometry(geometrybyte);
		
		if (geometry instanceof Polygon) {
			buf.append("\"geometry\":"+"{\"type\":\"Polygon\",");
			buf.append("\"coordinates\":[");
			path_contents = toPath((Polygon) geometry);

		} else if (geometry instanceof MultiPolygon) {
			MultiPolygon mpg = (MultiPolygon)geometry;
			
			int numpg = mpg.getNumGeometries();
			
			if(numpg == 1){
				buf.append("\"geometry\":"+"{\"type\":\"Polygon\",");
				buf.append("\"coordinates\":[");
				path_contents = toPath((Polygon)mpg.getGeometryN(0));
			}else{
				buf.append("\"geometry\":"+"{\"type\":\"MultiPolygon\",");
				buf.append("\"coordinates\":[");
				path_contents = toPath((MultiPolygon) geometry);
			}
			
			//buf.append("                \"geometry\":"+"{\"type\":\"Polygon\",\n");
			//buf.append("                            \"coordinates\":[\n                                           ");
			//toPath((MultiPolygon) geometry);
		}
		
		buf.append(path_contents);
		buf.append("]},");
		buf.append("\"properties\":{");
/*		
		buf.append("\"adm_cd\":\"" + model.get("adm_cd")+"\",");
		buf.append("\"adm_nm\":\""+model.get("adm_nm")+"\",");
		buf.append("\"lowest_flr\":\"" + model.get("lowest_flr")+"\",");
		buf.append("\"highest_flr\":\""+model.get("highest_flr")+"\",");
		buf.append("\"bd_naddr\":\""+model.get("bd_naddr")+"\",");
		buf.append("\"bd_nm\":\""+model.get("bd_nm")+"\",");
		buf.append("\"sufid\":\""+model.get("sufid")+"\"");
		*/
		
		model.remove("geometry");
		Iterator<String> keys = model.keySet().iterator();
		
		while(keys.hasNext()){
			String keyname = keys.next();
			
			buf.append("\""+keyname+"\":\"" + model.get(keyname)+"\"");
			
			if(keys.hasNext())buf.append(",");
		}
		
		buf.append("}");
		buf.append("},");

		return buf.toString();

	}

	
	private static String toPath(Polygon geometry) {
		StringBuffer buf = new StringBuffer();

		// 익스테리어 링을 그리고
		LineString exRing = geometry.getExteriorRing();

		buf.append("[");
		buf.append(ordinateArray2String(exRing.getCoordArray()));
		buf.append("]");

		// 인테리어 링이 존재한다면 인테리어링을 그리고
		int num_inLing = geometry.getNumInteriorRings();
		LineString inRings[] = new LineString[num_inLing];
		for (int i = 0; i < num_inLing; i++) {
			inRings[i] = geometry.getInteriorRingN(i);
			buf.append(",[");
			buf.append(ordinateArray2String(inRings[i].getCoordArray()));
			buf.append("]");
		}


		return buf.toString();
	}

	
	private static String toPath(MultiPolygon geometry) {
		StringBuffer buf = new StringBuffer();
		int num_pg = geometry.getNumGeometries();
		for (int i = 0; i < num_pg; i++) {
			if(i > 0) buf.append(",");
			buf.append("[");
			buf.append(toPath((Polygon) geometry.getGeometryN(i)));
			buf.append("]");
		}
		return buf.toString();
	}

	
	private static String ordinateArray2String(double[] ordinates) {

		int numpt = (int) (ordinates.length / 2) - 1;

		StringBuffer buf = new StringBuffer();
		buf.append("[");
		buf.append((double) ordinates[0]);
		buf.append(",");
		buf.append((double) ordinates[1]);
		buf.append("],");

		for (int i = 1; i < numpt; i++) {
			buf.append("[");
			buf.append((double) ordinates[(i * 2)]);
			buf.append(",");
			buf.append((double) ordinates[(i * 2) + 1]);
			buf.append("],");
		}
		buf.append("[");
		buf.append((double) ordinates[numpt * 2]);
		buf.append(",");
		buf.append((double) ordinates[(numpt * 2) + 1]);
		buf.append("]");
		return buf.toString();

	
	}

}
