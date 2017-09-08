package com.imooc.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginFilter implements Filter {
	private FilterConfig config;
	public void destroy() {
		// TODO Auto-generated method stub

	}

	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		HttpServletResponse response = (HttpServletResponse)arg1;
		HttpSession session = request.getSession();
		//solve the problem of first fail by not filting it.
		String str = config.getInitParameter("notLoginPath");
		String[] args = null;
		if(str != null){
			args = str.split(";");
		}
		if(null!=args && 0!=args.length){
			for(String s : args){
				if(null == s || "".equals(s)) continue;
				if(request.getRequestURI().indexOf(s)!=-1){
					arg2.doFilter(arg0, arg1);
					return;
				}
			}
		}
		/*
		//test str.indexOf
		String str = "abc";
		System.out.println("indexOf null:"+str.indexOf("null"));//-1
		System.out.println("indexOf '':"+str.indexOf(""));//0
		*/
		
		//login页面session可以没userName
		if(request.getRequestURI().indexOf("login.jsp")!=-1 || request.getRequestURI().indexOf("/servlet/LoginServlet")!=-1){
			arg2.doFilter(arg0, arg1);
			return;
		}
		//session里有userName才能进
		if(null!=session.getAttribute("userName")){
			arg2.doFilter(arg0, arg1);
		}else{
			response.sendRedirect("/login.jsp");
		}

	}

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		this.config = arg0;
	}

}
