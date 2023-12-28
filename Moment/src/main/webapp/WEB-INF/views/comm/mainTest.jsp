<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/eunae/mainPage.css">
    <div class="main-panel">
        <div class="content-wrapper">
            <!-- 사진 게시글 목록 -->
            <div class="row">  
                <div class="col-md-12 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">게시글 사진</p>
                            <div class="slide_wrapper">
                                <ul class="slides"></ul>
                            </div>
                            <div class="button-container" id="imgBntContainer">
                                <button class="img-prev hidden">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>
                                <button class="img-next">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 최근게시글 -->
            <div class="row">
                <div class="col-md-12 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">최신 게시글</p>
                            <!-- new board menu -->
                            <div id="newBoardMenu" class="d-flex justify-content-center">
                                <ul id="newBoardMainCategory">
                                    <li>
                                        <a data-cate="0" class="newBoardCategory selected">전체</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- new board rendering -->
                            <div id="newBoardList"></div>
                            <!-- new board pagenation -->
                            <div id="pagingBox" class="pagination d-flex justify-content-center align-items-center"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 인기게시글 -->
            <div class="row">
                <div class="col-md-12 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <div>
                                <p class="card-title">인기 게시글</p>
                                <!-- top board menu -->
                                <div id="menu" class="d-flex justify-content-center">
                                    <ul id="mainCategory">
                                        <li>
                                            <a data-cate="0" class="topBoardCategory selected">전체</a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- top board rendering -->
                                <div id="topBoardList"></div>
                                <!-- top board pagenation -->
                                <div id="topBoardListPagingBox" class="pagination d-flex justify-content-center align-items-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 도서 및 뉴스 -->
            <div class="row">
                <div class="col-md-5 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">추천도서</p>
                            <!-- https://velog.io/@dpdnjs402/uq0d5qph 이거보고 진행하자 -->
                            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
                                <!-- Navbar content -->
                                <div class="container-fluid">
                                    <div class="collapse navbar-collapse">
                                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li class="nav-item">
                                                <a onclick="createBookComponent('${pageContext.request.contextPath}', 1, 'all')" id="allLink" class="categoryLink nav-link" aria-current="page">전체</a>
                                            </li>
                                            <c:forEach var="cBoardlist" items="${code.CO}">
                                            <li class="nav-item">
                                                <a onclick="createBookComponent('${pageContext.request.contextPath}', 1, '${cBoardlist.commonDetailName}')" class="categoryLink nav-link">${cBoardlist.commonDetailName}</a>
                                            </li>
                                            </c:forEach>
                                        </ul>
                                        <div class="d-flex">
                                            <input class="form-control me-2" type="text" placeholder="입력해주세요" aria-label="Search" id="bookSerachName">
                                            <button type="button" id="bookSerachBnt">검색</button>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                            <!-- book list rendering -->
                            <ul class="icon-data-list mt-2" id="bookList"></ul>
                            <!-- book list rendering -->
                            <!-- d-flex justify-content-center inner-div -->
                            <div class="dookListBtn">
                                <button type="button" class="btn btn-social-icon btn-rounded bookLeftBnt"><iconify-icon icon="formkit:caretleft"></iconify-icon></button>
                                <button type="button" class="btn btn-social-icon btn-rounded bookRightBnt"><iconify-icon icon="formkit:caretright"></iconify-icon></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-7 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">뉴스<b>100</b></p>

                            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
                                <!-- Navbar content -->
                                <div class="container-fluid">
                                    <button class="navbar-toggler category-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li class="nav-item">
                                                <a onclick="createNewsComponent('/moment', 1, 'all')" id="allLink" class="categoryLink nav-link" aria-current="page">전체</a>
                                            </li>
                                            <c:forEach var="cBoardlist" items="${code.CO}">
                                            <li class="nav-item">
                                                <a onclick="createNewsComponent('/moment', 1, '${cBoardlist.commonDetailName}')" class="categoryLink nav-link">${cBoardlist.commonDetailName}</a>
                                            </li>
                                            </c:forEach>
                                        </ul>
                                    <div class="d-flex">
                                        <input class="form-control me-2" type="text" placeholder="입력해주세요" aria-label="Search" id="newsSerachName">
                                        <button type="button" id="newsSerachBnt">검색</button>
                                    </div>
                                    </div>
                                </div>
                            </nav>

                            <!-- news list rendering -->
                            <ul class="icon-data-list mt-2" id="newsList"></ul>
                            <!-- news list rendering -->

                            <!-- pagenation -->
                            <div class="pagenationDiv">
                                <div class="button-container">
                                    <button type="button" class="btn btn-outline-secondary btn-rounded btn-icon left-button">
                                        <iconify-icon icon="mdi:chevron-double-left"></iconify-icon>
                                    </button>
                                    
                                    <button type="button" class="btn btn-outline-secondary btn-rounded btn-icon right-button">
                                        <iconify-icon icon="mdi:chevron-double-right"></iconify-icon>
                                    </button>
                                </div> <!-- pagenation end -->
                                <div>
                                    <input type="hidden" name="currentPage" id="currentPage" value="${currenPage}">
                                    <input type="hidden" name="total" id="total" value="${totalPages}">
                                    <input type="hidden" name="querySearch" id="querySearch" value="${querySearch}">
                                    <input type="hidden" id="book_querySearch" value="${querySearch}">
                                    <input type="hidden" id="book_currentPage" value="1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="row">
                <div class="col-md-7 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title mb-0">Top Products</p>
                            <div class="table-responsive">
                            <table class="table table-striped table-borderless">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Referral Marketing</td>
                                        <td class="font-weight-bold">$283</td>
                                        <td>20 Mar 2018</td>
                                        <td class="font-weight-medium"><div class="badge badge-warning">Pending</div></td>
                                    </tr>
                                    <tr>
                                        <td>Social media marketing</td>
                                        <td class="font-weight-bold">$897</td>
                                        <td>26 Oct 2018</td>
                                        <td class="font-weight-medium"><div class="badge badge-success">Completed</div></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">To Do Lists</h4>
                            <div class="list-wrapper pt-2">
                                <ul class="d-flex flex-column-reverse todo-list todo-list-custom">
                                    <li>
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox">
                                                Meeting with Urban Team
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                    <li class="completed">
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox" checked>
                                                Duplicate a project for new customer
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox">
                                                Project meeting with CEO
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                    <li class="completed">
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox" checked>
                                                Follow up of team zilla
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox">
                                                Level up for Antony
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                </ul>
                            </div>
                            <div class="add-items d-flex mb-0 mt-2">
                                <input type="text" class="form-control todo-list-input"  placeholder="Add new task">
                                <button class="add btn btn-icon text-primary todo-list-add-btn bg-transparent"><i class="icon-circle-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <script type="module" src="${pageContext.request.contextPath}/assets/js/common/main/index.js"></script>