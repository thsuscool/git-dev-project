package kostat.sop.ServiceAPI.common.util;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

import kostat.sop.ServiceAPI.common.geom.Geometry;
import kostat.sop.ServiceAPI.common.geom.LineString;
import kostat.sop.ServiceAPI.common.geom.MultiPolygon;
import kostat.sop.ServiceAPI.common.geom.Polygon;
import kostat.sop.ServiceAPI.common.geom.WKBAdapter;


public class KmlRenderer {

	
	public static String renderKml(Map bnd) {

		List<Map> bndList = (List) bnd.get("result");
		
		StringBuffer buf = new StringBuffer();
		buf.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		buf.append("<kml xmlns=\"http://www.opengis.net/kml/2.2\" ");
		buf.append("errCd = \"");
		buf.append(bnd.get("errCd"));
		buf.append("\" errMsg = \"");
		buf.append(bnd.get("errMsg"));
		buf.append("\" id = \"");
		buf.append(bnd.get("id"));
		buf.append("\" trId = \"");
		buf.append(bnd.get("trId"));
		buf.append("\">");
		buf.append("<Document>");
		buf.append(generateByKmlModel(bndList));
		buf.append("</Document>");
		buf.append("</kml>");

		return buf.toString();
	}
	
	public static String renderKml(List<Map> bndList) {

		StringBuffer buf = new StringBuffer();
		buf.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		buf.append("<kml xmlns=\"http://www.opengis.net/kml/2.2\">");
		buf.append("<Document>");
		buf.append(generateByKmlModel(bndList));
		buf.append("</Document>");
		buf.append("</kml>");

		return buf.toString();
	}

	private static String generateByKmlModel(List<Map> bndList) throws AbsException {
		StringBuffer buf = new StringBuffer();
		try {
			Map model = null;
			Iterator<Map> itr = bndList.iterator();
			while (itr.hasNext()) {
				model = (Map) itr.next();
				buf.append(getKmlPiece(model));
			}
		}catch (NullPointerException e) {
			throw new NullPointerException();
		} catch (Exception e) {
			throw new NullPointerException();
		}
		return buf.toString();
	}

	private static String getKmlPiece(Map model) {

		StringBuffer buf = new StringBuffer();
		buf.append("<Placemark>");
		buf.append("<adm_cd>" + model.get("adm_cd") + "</adm_cd>");

		buf.append("<adm_nm>" + model.get("adm_nm") + "</adm_nm>");

		String path_contents = "";
		byte[] geometrybyte =  (byte[]) model.get("geometry");
		Geometry geometry = WKBAdapter.wkbToGeometry(geometrybyte);
//		Geometry geometry = model.getGeometry();
		if (geometry instanceof Polygon) {
			path_contents = toPath((Polygon) geometry);

		} else if (geometry instanceof MultiPolygon) {
			path_contents = toPath((MultiPolygon) geometry);
		}
		buf.append(path_contents);

		buf.append("</Placemark>");

		return buf.toString();

	}

	
	private static String toPath(Polygon geometry) {
		StringBuffer buf = new StringBuffer();

		// 익스테리어 링을 그리고
		LineString exRing = geometry.getExteriorRing();

		buf.append("<Polygon>");
		buf.append("<outerBoundaryIs><LinearRing><coordinates>");
		buf.append(ordinateArray2String(exRing.getCoordArray()));
		buf.append("</coordinates></LinearRing></outerBoundaryIs>");

		// 인테리어 링이 존재한다면 인테리어링을 그리고
		int num_inLing = geometry.getNumInteriorRings();
		LineString inRings[] = new LineString[num_inLing];
		for (int i = 0; i < num_inLing; i++) {
			inRings[i] = geometry.getInteriorRingN(i);
			buf.append("<innerBoundaryIs><LinearRing><coordinates>");
			buf.append(ordinateArray2String(inRings[i].getCoordArray()));
			buf.append("</coordinates></LinearRing></innerBoundaryIs>");
		}

		buf.append("</Polygon>");

		return buf.toString();
	}

	
	private static String toPath(MultiPolygon geometry) {
		StringBuffer buf = new StringBuffer();
		buf.append("<MultiGeometry>");
		int num_pg = geometry.getNumGeometries();
		for (int i = 0; i < num_pg; i++) {
			buf.append(toPath((Polygon) geometry.getGeometryN(i)));
		}
		buf.append("</MultiGeometry>");
		return buf.toString();
	}

	
	private static String ordinateArray2String(double[] ordinates) {

		int numpt = (int) (ordinates.length / 2) - 1;

		StringBuffer buf = new StringBuffer();
		buf.append((int) ordinates[0]);
		buf.append(",");
		buf.append((int) ordinates[1]);
		buf.append(" ");

		for (int i = 1; i < numpt; i++) {
			buf.append((int) ordinates[(i * 2)]);
			buf.append(",");
			buf.append((int) ordinates[(i * 2) + 1]);
			buf.append(" ");
		}
		buf.append((int) ordinates[numpt * 2]);
		buf.append(",");
		buf.append((int) ordinates[(numpt * 2) + 1]);

		return buf.toString();

	
	}

}
