package com.imooc.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.AsyncContext;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.imooc.servlet.Executor;


public class AsyncServlet extends HttpServlet {
	public void init(ServletConfig config) throws ServletException {
		
	}
	
	public void destroy() {
		
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		AsyncContext context = null;
		//AsyncContext context = request.startAsync();
		//context.getRequest();
		//context.getResponse();
		new Thread(new Executor(context)).start();
		System.out.println(new Date());
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}