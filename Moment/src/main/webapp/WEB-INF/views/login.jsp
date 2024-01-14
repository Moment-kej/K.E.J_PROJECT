<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="kr" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Moment</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/vertical-layout-light/style.css">
</head>

<body>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
            <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                <div class="brand-logo">
                    <img src="${pageContext.request.contextPath}/assets/images/logo.svg" alt="logo">
                </div>
                <h4>환영합니다!</h4>
                <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                <form class="pt-3" action="${pageContext.request.contextPath}/login" method="POST">
                    <div class="form-group">
                        <input type="text" name="loginId" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username">
                    </div>
                    <div class="form-group">
                        <input type="password" name="loginPwd" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="mt-3">
                        <button type="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Sign In</button>
                    </div>
                    <div class="mt-3">
                        <button type="button" class="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn" id="pageBack">Page Back</button>
                    </div>
                    <input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}">
                    <div class="my-2 d-flex justify-content-between align-items-center">
                    <div class="form-check">
                        <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input">
                        Keep me signed in
                        </label>
                    </div>
                    <a href="#" class="auth-link text-black">Forgot password?</a>
                    </div>
                    <div class="mb-2">
                    <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                        <i class="ti-facebook mr-2"></i>Connect using facebook
                    </button>
                    </div>
                    <div class="text-center mt-4 font-weight-light">
                    Don't have an account? <a href="register.html" class="text-primary">Create</a>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>

    <script>
        document.getElementById("pageBack").addEventListener("click", () => {
            window.history.back();
        })
    </script>

</body>
</html>
