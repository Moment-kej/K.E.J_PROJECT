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
                                <c:if test="${item.commonDetailCd == 10}">
                                    <div class="card-title"><h2>${item.commonDetailName} 게시판</h2></div>
                                    <div class="d-flex justify-content-center menuCategoryDiv">
                                        <ul class="menuCategory p-0">
                                            <li><a id="0" class="AllListView menuCategoryATag" data-category="0">전체보기</a></li>
                                            <c:forEach var="coDetailList" items="${code.CA}">
                                                <c:if test="${coDetailList.commonDetailEx eq '옷 카테고리'}">
                                                    <li>
                                                        <a id="${coDetailList.commonDetailCd}" class="menuCategoryATag" data-category="${coDetailList.commonDetailCd}">${coDetailList.commonDetailName}</a>
                                                    </li>
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
                                <a id="cardsType" class="boardListFormChangeBtn">
                                    <img src="${pageContext.request.contextPath}/assets/icon/sortCard.svg" class="boardType" data-type="cardsType" alt="sort_card">
                                </a>
                                <a id="albumType" class="boardListFormChangeBtn">
                                    <img src="${pageContext.request.contextPath}/assets/icon/sortAlbum.svg" class="boardType" data-type="albumType" alt="sort_album">
                                </a>
                                <a id="listType" class="boardListFormChangeBtn">
                                    <img src="${pageContext.request.contextPath}/assets/icon/sortList.svg" class="boardType" data-type="listType" alt="sort_list">
                                </a>
                            </div>
                            <div class="listSizeSelect">
                                <!-- 한번에 보여줄 개수 정하기 -->
                                <form action="1" class="minisrch_form" name="actionForm" >
                                    <fieldset>
                                        <select id="handleAmount">
                                            <option value="10" ${pageVO.amount == 10 ? 'selected' : ''}>10개씩</option>
                                            <option value="20" ${pageVO.amount == 20 ? 'selected' : ''}>20개씩</option>
                                            <option value="30" ${pageVO.amount == 30 ? 'selected' : ''}>30개씩</option>
                                            <option value="40" ${pageVO.amount == 40 ? 'selected' : ''}>40개씩</option>
                                        </select>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                        <!--게시글 양식에 맞춰 게시글 목록 나오는 장소-->
                        <div><div id="contentListTest"></div></div>
                        <!--글쓰기 버튼-->
                        <div class="writingBntDiv">
                            <button type="button" class="btn btn-inverse-success btn-md" id="boardInsertBnt">글쓰기</button>
                        </div>
                        <!--확인용 div-->
                        <div>
                            <p>확인용 >> ${criteria}</p>
                            <input type="hidden" name="page"        id="criteriaPage" value="${criteria.page}">
                            <input type="hidden" name="amount"      id="criteriaAmount" value="${criteria.amount}">
                            <input type="hidden" name="category"    id="criteriaCategory" value="${criteria.category}">
                            <input type="hidden" name="listType"    id="criteriaListType" value="${criteria.listType}">
                            <input type="hidden" name ="code"       id="criteriaCode" value="10">
                            <input type="hidden" name="pageStart"   id="pageVOStart" value="${pageVO.start-1}">
                            <input type="hidden" name="pageEnd"     id="pageVOEnd" value="${pageVO.end+1}">
                            <input type="hidden" name="pagerealEnd" id="pageVORealEnd" value="${pageVO.realEnd}">
                            <input type="text" name="pageTotal"     id="pageVOTotal" value="${pageVO.total}">
                            <input type="hidden" name="contextPath" id="contextPath" value="${pageContext.request.contextPath}">
                        </div>
                        <!-- pagination -->
                        <div class="pagination d-flex justify-content-center">
                            <!-- 5. 맨 처음으로 -->
                            <a id="pageNumberOne" class="firstpage pbtn">
                                &laquo;&laquo;
                            </a>
                            
                            <!-- 3.이전페이지네이션 -->
                            <c:if test="${pageVO.prev}">
                            <a id="pageStart" class="prevpage pbtn">
                                &laquo;
                            </a>
                            </c:if>
                            
                            <!-- 1.페이지네이션 -->
                            <c:forEach var="num" begin="${pageVO.start}" end="${pageVO.end}">
                            <a class="pageNumber" data-page="${num}">
                                <span class="pagenum ${pageVO.page == num ? 'currentpage' : '' }currentpage">${num}</span>
                            </a>
                            </c:forEach>
                            
                            <!-- 2.다음페이지네이션 -->
                            <c:if test="${pageVO.next}">
                            <a id="pageNext" class="nextpage pbtn">
                                &raquo;
                            </a>
                            </c:if>
                            
                            <!-- 4. 맨 마지막으로 -->
                            <a id="pageRealEnd" class="lastpage pbtn">
                                &raquo;&raquo;
                            </a>
                        </div><!-- pagination end -->
                        <!-- search div -->
                        <div class="col-lg-12 pt-5">
                            <div class="d-flex justify-content-center grid-margin">
                                <div style="display: flex;">
                                    <select name="category" id="boardCategory">
                                        <option value="0">카테고리</option>
                                        <c:forEach var="coDetailList" items="${code.CA}">
                                            <c:if test="${coDetailList.commonDetailEx eq '옷 카테고리'}">
                                                <option value="${coDetailList.commonDetailCd}">${coDetailList.commonDetailName}</option>
                                            </c:if>
                                        </c:forEach>
                                    </select>
                                    <select name="searchType" id="searchType">
                                        <option value="" ${pageVO.cri.searchType == '' ? 'selected' : ''}>분류</option>
                                        <option value="boTitCon" ${pageVO.cri.searchType == 'boTitCon' ? 'selected' : ''}>글작성자+게시글</option>
                                        <option value="boardTitle" ${pageVO.cri.searchType == 'boardTitle' ? 'selected' : ''}>글제목</option>
                                        <option value="boardContent" ${pageVO.cri.searchType == 'boardContent' ? 'selected' : ''}>글작성자</option>
                                        <option value="replyContent" ${pageVO.cri.searchType == 'replyContent' ? 'selected' : ''}>댓글내용</option>
                                    </select>

                                    <input type="hidden" id="searchPage" value="1">

                                    <input type="text" name="searchName" id="searchName" class="form-control boardSearchInput" placeholder="입력해주세요" aria-describedby="button-addon2">
                                    <button class="btn btn-outline-dark btn-fw" type="button" id="searchBnt">Search</button>
                                </div>
                            </div>
                        </div> <!-- search div end-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="module" src="${pageContext.request.contextPath}/assets/js/eunae/index.js"></script>