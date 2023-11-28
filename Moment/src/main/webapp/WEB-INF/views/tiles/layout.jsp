<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<html>
<head>
  	<!-- Required meta tags -->
  	<meta charset="utf-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  	<title>Moment</title>
  	
  	<!-- plugins:css -->
  	<link rel="stylesheet" href="vendors/feather/feather.css">
 	<link rel="stylesheet" href="vendors/ti-icons/css/themify-icons.css">
  	<link rel="stylesheet" href="vendors/css/vendor.bundle.base.css">
  	
  	<!-- endinject -->
  	<!-- Plugin css for this page -->
  	<link rel="stylesheet" href="vendors/datatables.net-bs4/dataTables.bootstrap4.css">
  	<link rel="stylesheet" href="vendors/ti-icons/css/themify-icons.css">
  	<link rel="stylesheet" type="text/css" href="js/select.dataTables.min.css">
  	
  	<!-- End plugin css for this page -->
  	<!-- inject:css -->
  	<link rel="stylesheet" href="css/vertical-layout-light/style.css">
  	
  	<!-- endinject -->
  	<link rel="shortcut icon" href="images/favicon.png" />
  	
	<!-- jQuery Js -->
    <script src="assets/js/jquery-1.10.2.js"></script>
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
    
	<!-- w3schools -->
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    
	<!-- SweetAlert -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
    
	<!-- Bootstrap Js -->
    <script src="assets/js/bootstrap.min.js"></script>
    
    <!-- Bootstrap Styles-->
    <link href="assets/css/bootstrap.css" rel="stylesheet" />
    
	<!-- Fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <script src="https://kit.fontawesome.com/9fc370938e.js" crossorigin="anonymous"></script>
</head>
<body>
	<tiles:insertAttribute name="header" />
	<tiles:insertAttribute name="content" />
	<tiles:insertAttribute name="side" />
</body>
</html>