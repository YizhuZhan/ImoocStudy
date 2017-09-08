package com.imooc.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		//test encoding problem
		System.out.println(userName);
		HttpSession session = request.getSession();
		if("admin".equals(userName) && "admin".equals(password)){
			
			session.setAttribute("userName", userName);
			response.sendRedirect(request.getContextPath()+"/success.jsp");
		}else{
			session.setAttribute("userName", null);
			response.sendRedirect(request.getContextPath()+"/fail.jsp");
		}
	}

}
