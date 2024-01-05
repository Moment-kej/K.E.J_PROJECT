<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <!--게시글 전체 목록 장소-->
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <!--제목, 카테고리 div-->
                        <div class="boardCategoryInfo">
                        	<c:forEach var="item" items="${code.CO}">
                                <c:if test="${item.commonDetailCd == 30}">
		                            <div class="card-title"><h2>${item.commonDetailName} 게시판</h2></div>
		                            <div class="d-flex justify-content-center menuCategoryDiv">
		                                <ul class="menuCategory p-0">
		                                    <li><a class="AllListView menuCategoryATag" data-category="0" onclick="categoryType(0)">전체보기</a></li>
		                                    <c:forEach var="coDetailList" items="${code.CA}">
                                                <c:if test="${coDetailList.commonDetailEx eq '미술 카테고리'}">
				                                    <li><a id="${coDetailList.commonDetailCd}" class="menuCategoryATag" data-category="${coDetailList.commonDetailCd}" onclick="categoryType('${coDetailList.commonDetailCd}')">${coDetailList.commonDetailName}</a></li>
		                                    	</c:if>
                                            </c:forEach>
		                                </ul>
		                            </div>
                            	</c:if>
                           </c:forEach>
                        </div>
                        <!-- 게시글 보기 양식 정하는 장소 -->
                        <div class="boardListForm">
                            <div class="boardListFormBtn">
                                <a id="albumType" class="boardListFormChangeBtn"><img src="${pageContext.request.contextPath}/assets/icon/sortCard.svg" alt="sort_card"></a>
                                <a id="cardsType" class="boardListFormChangeBtn"><img src="${pageContext.request.contextPath}/assets/icon/sortAlbum.svg" alt="sort_card"></a>
                                <a id="listType" class="boardListFormChangeBtn"><img src="${pageContext.request.contextPath}/assets/icon/sortList.svg" alt="sort_card"></a>
                            </div>
                            <div class="listSizeSelect">
                                <!-- 한번에 보여줄 개수 정하기 -->
                                <form action="1" class="minisrch_form" name="actionForm" >
                                    <fieldset>
                                        <select id="handleAmount" onchange="amountType()">
                                            <option value="10">10개씩</option>
                                            <option value="20">20개씩</option>
                                            <option value="30">30개씩</option>
                                            <option value="40">40개씩</option>
                                        </select>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                        <!--게시글 양식에 맞춰 게시글 목록 나오는 장소-->
                        <div id="contentList"></div>
                        <div class="contentNotData">
                        <!--글쓰기 버튼-->
                        <div class="writingBntDiv">
                            <button type="button" class="btn btn-inverse-success btn-md" id="writingBnt">글쓰기</button>
                        </div>
                       <!-- pagination -->
                        <div class="pagination d-flex justify-content-center" id="pagingBox">
                        </div>
                        <!-- pagination end -->
                         <div>
                        	<input type="hidden" name="page" id="criteriaPage" value="${criteria.page}" />
                        </div>
                        <!-- search div -->
                        <div class="col-lg-12 pt-5">
                            <div class="d-flex justify-content-center grid-margin">
                                <div style="display: flex;">
                                    <select name="category" id="boardCategory">
                                        <option value="0">카테고리</option>
                                        <c:forEach var="coDetailList" items="${code.CA}">
                                                <c:if test="${coDetailList.commonDetailEx eq '미술 카테고리'}">
			                                        <option value="${coDetailList.commonDetailCd}">${coDetailList.commonDetailName}</option>
                                        	</c:if>
                                        </c:forEach>
                                    </select>
                                    <select name="searchType" id="searchType">
                                        <option value="">게시글 + 댓글</option>
                                        <option value="">제목만</option>
                                        <option value="">글작성자</option>
                                        <option value="">댓글내용</option>
                                        <option value="">댓글작성자</option>
                                    </select>
                                    <input type="text" class="form-control boardSearchInput" placeholder="입력해주세요" aria-describedby="button-addon2">
                                    <button class="btn btn-outline-dark btn-fw" type="button" id="button-addon2">Search</button>
                                </div>
                            </div>
                        </div> <!-- search div end-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="module" src="${pageContext.request.contextPath}/assets/js/art/artBoardAllPage/index.js"></script>
