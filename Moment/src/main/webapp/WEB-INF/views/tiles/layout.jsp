<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Moment</title>

	<!-- Google Font -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
	
	<!-- Css All Link -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/style.css">
	
	<!-- jQuery -->
	<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
	
	<!-- Bootstrap -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

	<!-- w3schools -->
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

	<!-- icon render : eunae -->
	<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

	<!-- Fontawesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
	
	<!-- TUI 에디터 CSS CDN -->
    <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
	<!-- Toast UI Editor -->
	<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>

	<!-- CK Editor -->
	<script src="https://cdn.ckeditor.com/ckeditor5/40.1.0/super-build/ckeditor.js"></script>
	<script src="https://cdn.ckeditor.com/ckeditor5/40.1.0/super-build/translations/ko.js"></script>
	
	<!-- kakao address api -->
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	
</head>

<body>
	<tiles:insertAttribute name="header" />
	<tiles:insertAttribute name="content" />
	
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
	<!-- End Inject -->
	
	<!-- Custom js for this page-->
	<!-- <script src="${pageContext.request.contextPath}/assets/js/dashboard.js"></script> -->
	<!--<script src="assets/js/Chart.roundedBarCharts.js"></script>-->
	
	
</body>

</html>