<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div class="card-body">
                <div class="contentCenterSetting">
                    <div class="contentWidthSetting">
                        <h4 class="card-title">게시판 수정 페이지</h4>
                        <!-- 게시판 등록 form -->
                        <form class="forms-sample">
                            <div class="form-group">
                                <label for="writer">작성자</label>
                                <input type="text" name="id" id="writer" class="form-control" disabled >
                            </div>
                            <div class="form-group">
                                <label for="title">제목</label>
                                <input type="text" name="title" class="form-control" id="title" placeholder="제목을 입력해주세요">
                            </div>
                            <!-- 카테고리 분류 -->
                            <div id="categoryLabel">
                                <label for="category">카테고리</label>
                            </div>
                            <div class="listCategorySelect">
                                <div class="form-group">
                                    <select class="form-control" id="mainCategory" name="code">
                                        <option name="" value="0">대분류</option>
                                        <c:forEach var="item" items="${code.CO}">
                                        <option name="${item.commonDetailCd}" id="${item.commonDetailCd}" value="${item.commonDetailCd}">${item.commonDetailName}</option> 
                                        </c:forEach>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" id="subCategory" name="cateogry">
                                        <option name="0" value="0">중분류</option>
                                        <c:forEach var="item" items="${code.CA}">
                                        <option name="${item.commonDetailCd}" class="${item.commonDetailCd}" value="${item.commonDetailCd}">${item.commonDetailName}</option> 
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <!-- 게시글 작성 장소 -->
                            <div class="form-group">
                                <div id="editor" name="content">
                                </div>
                            </div>
                            <div class="d-flex justify-content-center mt-2">
                                <button type="button" class="btn btn-outline-success btn-fw mr-2 btn-lg" id="boardModlfyBtn" >수정하기</button>
                                <button type="button" class="btn btn-outline-secondary btn-fw btn-lg" id="goBoardDetail">돌아가기</button>
                            </div>
                        </form>
                    </div>
                </div>  
            </div>
        </div>
    </div>
</div>
<script type="module" src="${pageContext.request.contextPath}/assets/js/ckeditor/ckaditorSuperBuild.js"></script>
<script type="module" src="${pageContext.request.contextPath}/assets/js/boardDressUpdatePage/index.js"></script>


