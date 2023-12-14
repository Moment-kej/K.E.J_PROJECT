<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<style>
    .titleATag {
        color: #676767;
        font-weight: 400;
    }
    .noUpPage {
        opacity: 0;
        cursor: context-menu;
    }
    .hrStyle {
        border-bottom-style : inset;
        border-bottom-color: #E2E4F0;
        border-bottom-width: thin;
    }
    .hrStyleChildReply {
        border-top-style : inset;
        border-top-color: #ffffff4f;
        border-top-width: thin;
    }
    .hidden {
        display: none;
    }
    .selected, .selected a {
        color: black;
        background-color: #ebeef8;
        font-weight: bold !important;
    }
    .topBtn-board-management a{
        float: left;
        width: 50px;
        height: 35px;
        margin: 7px;
        line-height: 32px;
        color: #222f4e;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        border: 1px solid #d4dfe9;
        border-radius: 5px;
        background-color: #d4dfe9;
        transition: 0.5s;
    }
</style>
<div class="main-panel">
    <div class="content-wrapper">
    <div class="row">
        <!-- Board Detail Page -->
        <div class="container">
        <div class="container-fluid">
            <div class="mx-auto">
            <!-- Top Button -->
            <div class="containal">
                <div class="mb-2 topBtn-board-management board-management">
                    <a href="#" id="modify">수정</a>
                    <a href="#" id="delete">삭제</a>
                </div>
                <div class="topBtn">
                    <a href="#" id="pageUp"><i class="fa-solid fa-angle-up"></i>이전글</a>
                    <a href="#" id="pageDown"><i class="fa-solid fa-angle-down"></i>다음글</a>
                    <a href="#" id="goAllList">목록</a>
                </div>
            </div>
            <!-- Top Button End -->

            <!-- Detail Content -->
            <div class="contentBox">
                <div class="cntnHeaderBox hrStyle mb-3">
                    <div class="headerTitleBox">
                        <a id="dressAllList">해당 게시판 목록<i class="fa-solid fa-angle-right"></i></a>
                        <h3>${dress.title}</h3>
                    </div>
                    <div class="writerInfoBox">
                        <div class="d-flex justify-content-start align-items-center ">
                            <div class="writerImgBox justify-content-start align-items-center">
                                <img src="${pageContext.request.contextPath}/assets/images/faces/face3.jpg" alt="사용자프로필">
                            </div>
                            <div class="writerInfo">
                                <div class="writerInfoID">
                                    <span class="userID">${dress.id}</span>
                                </div>
                                <div class="d-flex justify-content-center align-items-center">
                                    <span class="date"><fmt:formatDate value="${dress.writeDt}" pattern="yy/MM/dd HH:mm:ss (EE)"/></span>
                                    <span class="view">조회
                                        <span class="viewCount">
                                            ${dress.view}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <hr> -->
                </div>
                <div class="contentViewer">
                    <div>
                        ${dress.content}
                    </div>
                </div>
                <div class="replyBox d-flex justify-content-start align-items-center hrStyle pb-4 mb-2">
                    <div class="likeBox d-flex justify-content-start align-items-center">
                        <span class="like"><i class="fa-regular fa-face-kiss-wink-heart"></i>좋아요</span>
                        <span class="likeCount">${dress.likeCount}</span>
                    </div>
                    <div class="replyCountBox d-flex justify-content-start align-items-center">
                        <span class="reply"><i class="fa-regular fa-comment-dots"></i>댓글</span>
                        <span class="replyCount">${dress.replyCount}</span>
                    </div>
                </div>
                
                <!-- Detail Reply -->
                <div class="commentBox">
                    <ul class="p-1">
                        <li id="replySection"></li>     <!-- 댓글, 대댓글, 댓글작성란 장소 -->
                    </ul>

                    <!-- 원댓글 작성 폼 -->
                    <div class="commentWriter">
                        <div class="comment_inbox">
                            <span class="comment_inbox_name" id="replyWriter">등록확인</span>
                            <textarea id="replyTextrea" placeholder="댓글을 남겨보세요"></textarea>
                        </div>
                        <div class="comment_attach d-flex justify-content-between align-items-center">
                            <div class="comment_box_write_count">
                                <strong class="fontSizeSmall comment_box_count_num" id="writeCount">0</strong>
                                <span class="fontSizeSmall">/</span>
                                <span class="fontSizeSmall comment_box_write_total">100</span>
                            </div>
                            <div class="register_box">
                                <a type="button" class="button" id="replyInsertBnt">등록</a>
                            </div>
                        </div>
                    </div><!-- 원댓글 작성 폼 End -->
                </div> <!-- Detail Reply End -->
            </div> <!-- Detail Content End -->

            <!-- 카테고리 관련글 보기 -->
            <div class="related_list_article">
                <div id="related_list_info">
                    <h2>
                        <c:if test="${dress.code == 10}">
                        <strong class="title">' 옷 >
                            <c:forEach var="item" items="${code.CA}">
                            <c:if test="${item.commonDetailCd == dress.category}">
                                <span class="inner categoryNumber" id="${item.commonDetailCd}">
                                    ${item.commonDetailName}
                                </span>' 
                            </c:if>
                            </c:forEach>
                        </strong>
                        </c:if>
                        <span class="text">게시판 글</span>
                    </h2>
                </div>
                <div class="relatedArticleTab"></div>   <!--관련글 랜더링 장소-->
            </div>  <!-- 카테고리 관련글 보기 End -->
            </div>
        </div>
        </div>
        <!-- Board Detail Page End -->
    </div>
    </div>
</div>

<script type="module" src="${pageContext.request.contextPath}/assets/js/boardDressDetailPage/index.js"></script>