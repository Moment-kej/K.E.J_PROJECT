<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/eunae/boardDressPage.css"/>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <!-- 게시판 구분 및 카테고리 나오는 장소 -->
            
            <!--게시글 전체 목록 장소-->
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="boardCategoryInfo">
                            <div class="card-title">
                                <h2>옷 게시판</h2>
                            </div>
                            <div class="d-flex justify-content-center menuCategoryDiv">
                                <ul class="menuCategory">
                                    <li><a href="#">전체보기</a></li>
                                    <li><a href="#">상의</a></li>
                                    <li><a href="#">하의</a></li>
                                    <li><a href="#">악세사리</a></li>
                                    <li><a href="#">가방</a></li>
                                </ul>
                            </div>
                        </div>
            
                        <!-- 게시글 보기 양식 정하는 장소 -->
                        <div class="boardAllList">
                            <div class="boardTempList">
                                <a href="#"><i class="fas fa-th-large"></i></a>
                                <a href="#"><i class="fas fa-th-list"></i></a>
                                <a href="#"><i class="fas fa-bars"></i></a>
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
                        <div style="clear:both"></div>
                        <!--게시글-->
                        <table id="boardList" class="table table-bordered">
                            <colgroup>
                                    <col width="10%">
                                    <col width="35%">
                                    <col width="20%">
                                    <col width="20%">
                                    <col width="15%">
                            </colgroup>
                            <thead>
                                <tr class="text-center">
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                    <th>조회수</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center pb-3 pt-3">1</td>
                                    <td class="pb-3 pt-3">
                                        <a href="#">제목1<span style="color: red;">[1]</span></a>
                                    </td>
                                    <td class="pb-3 pt-3">작성자</td>
                                    <td class="text-center pb-3 pt-3">2023.11.30 14:10</td>
                                    <td class="text-center pb-3 pt-3">0</td>
                                </tr>
                                <tr>
                                    <td class="text-center pb-3 pt-3">2</td>
                                    <td class="pb-3 pt-3">
                                        <a href="#">제목2<span style="color: red;">[1]</span></a>
                                    </td>
                                    <td class="pb-3 pt-3">작성자</td>
                                    <td class="text-center pb-3 pt-3">2023.11.30 14:10</td>
                                    <td class="text-center pb-3 pt-3">2</td>
                                </tr>
                                <tr>
                                    <td class="text-center pb-3 pt-3">3</td>
                                    <td class="pb-3 pt-3">
                                        <a href="#">제목3<span style="color: red;">[1]</span></a>
                                    </td>
                                    <td class="pb-3 pt-3">작성자</td>
                                    <td class="text-center pb-3 pt-3">2023.11.30 14:10</td>
                                    <td class="text-center pb-3 pt-3">2</td>
                                </tr>
                                <tr>
                                    <td class="text-center pb-3 pt-3">4</td>
                                    <td class="pb-3 pt-3">
                                        <a href="#">제목4<span style="color: red;">[1]</span></a>
                                    </td>
                                    <td class="pb-3 pt-3">작성자</td>
                                    <td class="text-center pb-3 pt-3">2023.11.30 14:10</td>
                                    <td class="text-center pb-3 pt-3">6</td>
                                </tr>
                            </tbody>
                        </table> <!--게시글-->
                        <div class="writingBntDiv">
                            <button type="button" class="btn btn-inverse-success btn-md" id="writingBnt">글쓰기</button>
                        </div>

                        <!-- 페이징 장소 -->
                        <div class="pagination d-flex justify-content-center">
                            <a href="#">&laquo;&laquo;</a>
                            <a href="#">&laquo;</a>
                            <a href="#"><span>1</span></a>
                            <a href="#"><span>2</span></a>
                            <a href="#"><span>3</span></a>
                            <a href="#"><span>4</span></a>
                            <a href="#"><span>5</span></a>
                            <a href="#">&raquo;</a>
                            <a href="#">&raquo;&raquo;</a>
                        </div><!-- 페이징 장소 -->
                        <!-- 검색 장소 -->
                        <div class="col-lg-12 pt-5">
                            <div class="d-flex justify-content-center grid-margin">
                                <div style="display: flex;">
                                    <select name="category" id="boardCategory">
                                        <option value="0">카테고리</option>
                                        <option value="">옵션1</option>
                                        <option value="">옵션2</option>
                                        <option value="">옵션3</option>
                                        <option value="">옵션4</option>
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
                        </div> <!-- 검색 장소 -->
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>


