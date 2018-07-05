package kostat.sop.ServiceAPI.center.api.interceptor.annotation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

public class InterceptorMappingHandler extends RequestMappingHandlerMapping {
	private static final Log log = LogFactory.getLog(InterceptorMappingHandler.class);
	
	@Override
	protected HandlerExecutionChain getHandlerExecutionChain(Object handler, HttpServletRequest req) {
		if(log.isWarnEnabled())
			log.warn("### [111] getHandlerExecutionChain is called");
		HandlerExecutionChain chain = super.getHandlerExecutionChain(handler, req);
		
		if(handler instanceof HandlerMethod) {
			HandlerMethod handlerMethod = (HandlerMethod) handler;
			chain.addInterceptors(detectControllerInterceptors(handlerMethod));
		}
		return chain;
	}
	
	protected HandlerInterceptor[] detectControllerInterceptors(HandlerMethod handlerMethod) {
		if(log.isWarnEnabled())
			log.warn("### detectControllerInterceptors is called");
		List<String> nameList = new ArrayList<String>();
		
		Interceptor classInterceptor = AnnotationUtils.findAnnotation(handlerMethod.getBeanType(), Interceptor.class);
		if(classInterceptor != null) {
			nameList.addAll(Arrays.asList(classInterceptor.value()));
		}
		
		Interceptor methodInterceptor = AnnotationUtils.findAnnotation(handlerMethod.getMethod(), Interceptor.class);
		if(methodInterceptor != null) {
			nameList.addAll(Arrays.asList(methodInterceptor.value()));
		}
		
		if(log.isWarnEnabled())
			log.warn("### interceptor size = " + nameList.size());
		
		if(nameList.size() > 0) {
			List<HandlerInterceptor> interceptorList = new ArrayList<HandlerInterceptor>();
			for(String name:nameList) {
				try {
					HandlerInterceptor interceptor = getApplicationContext().getBean(name, HandlerInterceptor.class);
					interceptorList.add(interceptor);
					
					if(log.isDebugEnabled())
						log.debug("### Loaded Interceptor : {" + name + "}");
				}
				catch(BeansException bex) {
					if(log.isWarnEnabled())
						log.warn("### Not loaded HandlerInterceptor : {" + name + "}");
				}
			}
			
			int returnSize = interceptorList.size();
			if(returnSize > 0)
				return interceptorList.toArray(new HandlerInterceptor[returnSize]);
		}
		return null;
	}
}
