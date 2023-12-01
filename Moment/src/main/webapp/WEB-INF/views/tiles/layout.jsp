<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  	<!-- Required meta tags -->
  	<meta charset="utf-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  	<title>Moment</title>

  	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>

  	<!-- plugins:css -->
  	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/feather/feather.css">
 	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/ti-icons/css/themify-icons.css">
  	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/css/vendor.bundle.base.css">
  	
  	<!-- endinject -->
  	<!-- Plugin css for this page -->
  	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css">
  	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/ti-icons/css/themify-icons.css">
  	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/js/select.dataTables.min.css">
  	
  	<!-- End plugin css for this page -->
  	<!-- inject:css -->
  	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/vertical-layout-light/style.css">
  	
  	<!-- endinject -->
  	<link rel="shortcut icon" href="${pageContext.request.contextPath}/assets/images/favicon.png" />
    
	<!-- w3schools -->
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    
	<!-- SweetAlert -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
    
	<!-- Bootstrap -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    
	<!-- Fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <script src="https://kit.fontawesome.com/9fc370938e.js" crossorigin="anonymous"></script>
    
    <!-- CK Editor -->
    <script src="https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/ckeditor.js"></script>
	<script src="https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/translations/ko.js"></script>
</head>

<body>
	<tiles:insertAttribute name="header" />
	<tiles:insertAttribute name="content" />
	<tiles:insertAttribute name="footer" />
</body>

</html>