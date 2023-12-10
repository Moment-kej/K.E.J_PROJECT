<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">

            <style>
                .displyNone {
                    display: none;
                }
            </style>
            <!--게시글 전체 목록 장소-->
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <!--제목, 카테고리 div-->
                        <div class="boardCategoryInfo">
                            <div class="card-title"><h2>Music 게시판</h2></div>
                            <div class="d-flex justify-content-center menuCategoryDiv">
                                <ul class="menuCategory p-0">
                                    <li><a class="AllListView menuCategoryATag" data-category="0">전체보기</a></li>
                                    <c:forEach var="list" items="${code.CA}">
                                        <c:if test="${list.commonDetailEx eq '음악 카테고리'}">
                                            <li><a class="menuCategoryATag">${list.commonDetailName}</a></li>
                                        </c:if>
                                    </c:forEach>
                                </ul>
                            </div>
                        </div>
                        <!-- 게시글 보기 양식 정하는 장소 -->
                        <div class="boardListForm">
                            <div class="boardListFormBtn">
                                <a id="albumType" class="boardListFormChangeBtn"><img src="${pageContext.request.contextPath}/assets/icon/sortCard.svg" alt="sort_card"></a>
                                <a id="cardsType" class="boardListFormChangeBtn"><img src="${pageContext.request.contextPath}/assets/icon/sortAlbum.svg" alt="sort_album"></a>
                                <a id="listType" class="boardListFormChangeBtn"><img src="${pageContext.request.contextPath}/assets/icon/sortList.svg" alt="sort_list"></a>
                            </div>
                            <div class="listSizeSelect">
                                <!-- 한번에 보여줄 개수 정하기 -->
                                <form action="1" class="minisrch_form" name="actionForm" >
                                    <fieldset>
                                        <select id="handleAmount">
                                            <option value="10">10개씩</option>
                                            <option value="20">20개씩</option>
                                            <option value="30">30개씩</option>
                                            <option value="40">40개씩</option>
                                        </select>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                        <div id="boardList" style="width: 100%; clear:both;">
                            <!-- <table class="board_list_tbl">
                                <caption>게시판 리스트입니다.</caption>
                                <thead>
                                    <tr>
                                        <th scope="col" class="td_board">번호</th>
                                        <th scope="col" class="td_title">제목</th>
                                        <th scope="col" class="td_id">작성자</th>
                                        <th scope="col" class="td_write_dt">작성일</th>
                                        <th scope="col" class="td_view">조회수</th>
                                    </tr>
                                </thead>
                                <tbody id="article_list">
                                    <tr class="">
                                        <td scope="row" class="td_board_no">
                                            <div class="board_no">BOARD_NO</div>
                                        </td>
                                        <td scope="row" class="td_title">
                                            <span class="title">TITLE</span>
                                            <span class="reply_count">2</span>
                                        </td>
                                        <td scope="row" class="td_id">
                                            <span class="write_id">ID</span>
                                        </td>
                                        <td scope="row" class="td_write_dt">
                                            <span class="write_dt">WRITE_DT</span>
                                        </td>
                                        <td scope="row" class="td_view">
                                            <span class="view">VIEW</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> -->
                        </div>

                        <!--게시글 양식에 맞춰 게시글 목록 나오는 장소-->
                        <div class="contentNotData displyNone">
                            <div class="d-flex justify-content-center inner-div">
                                <h3> 데이터가 없을시 "조회할 게시글이 없습니다." 라는 문구가 나오게 하기</h3>
                            </div>
                        </div>
                        <div>
                            <div id="contentListTest"></div><!-- js로 렌더링 하는곳 -->
                        </div>
                        <!--글쓰기 버튼-->
                        <div class="writingBntDiv">
                            <button type="button" class="btn btn-inverse-success btn-md" id="writingBnt">글쓰기</button>
                        </div>
                        <!-- pagination -->
                        <div class="pagination d-flex justify-content-center">
                            <!-- 5. 맨 처음으로 -->
                            <a id="pageNumberOne" class="firstpage pbtn">&laquo;&laquo;</a>
                            
                            <!-- 3.이전페이지네이션 -->
                            <a id="pageStart" class="prevpage pbtn">&laquo;</a>
                            
                            <!-- 1.페이지네이션 -->
                            <a class="pageNumber"><span class="pagenum">1</span></a>
                            <a class="pageNumber"><span class="pagenum">2</span></a>
                            <a class="pageNumber"><span class="pagenum">3</span></a>
                            <a class="pageNumber"><span class="pagenum">4</span></a>
                            <a class="pageNumber"><span class="pagenum">5</span></a>
                            <!-- 2.다음페이지네이션 -->
                            <a id="pageNext" class="nextpage pbtn">&raquo;</a>
                            
                            <!-- 4. 맨 마지막으로 -->
                            <a id="pageRealEnd" class="lastpage pbtn">&raquo;&raquo;</a>
                        </div><!-- pagination end -->
                        <!-- search div -->
                        <div class="col-lg-12 pt-5">
                            <div class="d-flex justify-content-center grid-margin">
                                <div class="d-flex">
                                    <select name="category" id="boardCategory">
                                        <option value="0">카테고리</option>
                                        <option value="케이팝">케입팝</option>
                                        <option value="국악">국악</option>
                                        <option value="발라드">발라드</option>
                                        <option value="팝송">팝송</option>
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
<script type="module" src="${pageContext.request.contextPath}/assets/js/music/musicBoardAllList.js"></script>
