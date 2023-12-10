<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<style>
  #categoryLabel {
    font-size: 0.875rem;
    line-height: 1.4rem;
    vertical-align: top;
  }
  .ck-editor__editable[role="textbox"] {
    min-height: 300px;
  }
  .ck-content .image {
    max-width: 80%;
    margin: 20px auto;
  }
</style>
  <div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div class="card-body">
                <div class="contentCenterSetting">
                  <div class="contentWidthSetting">
                    <h4 class="card-title">게시판 등록 페이지</h4>
                    <!-- 게시판 등록 form -->
                    <form class="forms-sample" name="boardForm" id="boardForm">
                      <div class="form-group">
                        <label for="writer">작성자</label>
                        <input type="text" name="id" id="writer" placeholder="작성자 적으삼" value="작성자"  class="form-control">
                      </div>
                      <div class="form-group">
                        <label for="title">제목</label>
                        <input type="text" name="title" id="title" placeholder="제목을 입력해주세요!"  class="form-control">
                      </div>
                      <!-- 카테고리 분류 -->
                      <div id="categoryLabel">
                      <label for="category">카테고리</label>
                      </div>
                      <div class="listCategorySelect">
                        <div class="form-group">
                          <select id="mainCategory" name="code" class="form-control">
                            <option name="" value="0">대분류</option>
                            <c:forEach var="item" items="${code.CO}">
                              <option name="${item.commonDetailCd}" id="${item.commonDetailCd}" value="${item.commonDetailCd}">${item.commonDetailName}</option> 
                            </c:forEach>
                          </select>
                        </div>
                        <div class="form-group">
                          <select  name="category" id="subCategory" class="form-control">
                            <option name="0" value="0">중분류</option>
                            <c:forEach var="item" items="${code.CA}">
                              <option name="${item.commonDetailCd}" class="${item.commonDetailCd}" value="${item.commonDetailCd}">${item.commonDetailName}</option> 
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      <!-- 게시글 작성 장소 -->
                      <div class="form-group">
                        <div id="editor" name="content"></div>
                      </div>
                      <div class="mb-2 mt-2">
                          <hr>
                          <button type="button" id="ckeditorTest">담긴 데이터 보기(debug)</button>
                          <hr>
                      </div>
                      <div class="d-flex justify-content-center">
                        <!-- 게시글 등록 또는 게시글 목록으로 (임시저장 없음 알림창 띄우기) -->
                        <button type="button" class="btn btn-outline-success btn-fw mr-2 btn-lg" id="boardInsertBtn" >등록</button>
                        <button type="button" class="btn btn-outline-secondary btn-fw btn-lg" id="goAllListBnt">목록으로</button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="module" src="${pageContext.request.contextPath}/assets/js/ckeditor/ckaditorSuperBuild.js"></script>
<script type="module" src="${pageContext.request.contextPath}/assets/js/boardDressInsertPage/index.js"></script>
