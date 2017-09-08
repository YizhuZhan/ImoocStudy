<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
登陆成功！
您好，欢迎您，<%=session.getAttribute("userName") %>
<%--您好，欢迎您，${userName} --%>
<!-- web.xml中的web-app要替换成2.4及以上版本才可以支持el，然而这个版本的maven不支持，
工程上有红叉，但可以编译、运行等，功能暂时没有问题 -->

</body>
</html>