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

	<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/> -->

	<!-- icon render : eunae -->
	<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

	<!-- plugins:css -->
	<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/feather/feather.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/ti-icons/css/themify-icons.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/css/vendor.bundle.base.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/js/select.dataTables.min.css"> --%>
	
	<!-- boardAllList Page Css -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/eunae/boardDressPage.css"/>
	<!-- Board Music All List Page Css-->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/music/boardMusicAllListPage.css"/>
	<!-- Board Detail Css -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/boardDetail/boardDetail.css">
	<!-- Board Insert Css -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/soomin/boardInsert.css">
	<!-- Board Update Css -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/soomin/boardUpdate.css">
	
	
	<!-- Plugin Css for this page -->
	<!-- <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css"> -->
	
	<!-- Injected CSS -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/vertical-layout-light/style.css">
	
	<!-- Favicon -->
	<%-- <link rel="shortcut icon" href="${pageContext.request.contextPath}/assets/images/favicon.png" /> --%>
	
	<!-- jQuery -->
	<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
	
	<!-- Bootstrap -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendors/ti-icons/css/themify-icons.css">

	<!-- w3schools -->
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

	<!-- SweetAlert -->
	<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css"> -->

	<!-- Fontawesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">

	<!-- CK Editor -->
	<script src="https://cdn.ckeditor.com/ckeditor5/40.1.0/super-build/ckeditor.js"></script>
	<script src="https://cdn.ckeditor.com/ckeditor5/40.1.0/super-build/translations/ko.js"></script>
	
</head>

<body>
	<tiles:insertAttribute name="header" />
	<tiles:insertAttribute name="content" />
	
	<!-- Kakao Map -->
	<!-- <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=796cf859ad3574f6a087d7c99ef6b404&libraries=services"></script> -->
	
	<!-- Sweetalert -->
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	
	<!-- Fontawesome -->
	<script src="https://kit.fontawesome.com/9fc370938e.js" crossorigin="anonymous"></script>
	
	<!-- plugins:js -->
	<script src="${pageContext.request.contextPath}/assets/vendors/js/vendor.bundle.base.js"></script>
	<script src="${pageContext.request.contextPath}/assets/vendors/chart.js/Chart.min.js"></script>
	<!-- <script src="${pageContext.request.contextPath}/assets/vendors/datatables.net-bs4/dataTables.bootstrap4.js"></script>
	<script src="${pageContext.request.contextPath}/assets/js/dataTables.select.min.js"></script> -->
	<!--<script src="assets/vendors/datatables.net/jquery.dataTables.js"></script>-->
	
	<!-- End plugin js for this page -->
	<!-- inject:js -->
	<script src="${pageContext.request.contextPath}/assets/js/off-canvas.js"></script>
	<script src="${pageContext.request.contextPath}/assets/js/hoverable-collapse.js"></script>
	<script src="${pageContext.request.contextPath}/assets/js/template.js"></script>
	<script src="${pageContext.request.contextPath}/assets/js/settings.js"></script>
	<script src="${pageContext.request.contextPath}/assets/js/todolist.js"></script>
	<!-- endinject -->
	
	<!-- Custom js for this page-->
	<!-- <script src="${pageContext.request.contextPath}/assets/js/dashboard.js"></script> -->
	<!--<script src="assets/js/Chart.roundedBarCharts.js"></script>-->
	
	
</body>

</html>