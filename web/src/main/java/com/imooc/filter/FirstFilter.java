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

public class FirstFilter implements Filter {

	public void destroy() {
		System.out.println("destroy---firstFilter");

	}

	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("start---dofilter-----firstFilter");
		chain.doFilter(arg0, arg1);
		//HttpServletRequest request = (HttpServletRequest)arg0;
		//HttpServletResponse response = (HttpServletResponse)arg1;
		//request.getRequestDispatcher("main.jsp").forward(request, response);
		//response.sendRedirect(request.getContextPath()+"/main.jsp");
		System.out.println("end---dofilter-----firstFilter");
	}

	public void init(FilterConfig arg0) throws ServletException {
		System.out.println("init---firstFilter");

	}

}
