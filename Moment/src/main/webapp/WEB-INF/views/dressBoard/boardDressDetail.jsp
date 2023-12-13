<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<style>
    .tit_area a {
        color: black;
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
    .hidden {
        display: none;
    }
    .selected {
        background-color: #ebeef8;
        font-weight: bold;
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
            <div class="topBtn d-flex align-content-between">
                <a id="pageUp"><i class="fa-solid fa-angle-up"></i>이전글</a>
                <a id="pageDown"><i class="fa-solid fa-angle-down"></i>다음글</a>
                <a id="goAllList">목록</a>
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
                        <!-- 댓글 -->
                        <li id="replySection">
                            <!--<div class="replyInnerSecion">
                                <div class="d-flex justify-content-start align-items-center">
                                    <div class="replyUserImgBox">
                                        <img class="mx-auto" src="${pageContext.request.contextPath}/assets/images/faces/face3.jpg" alt="프로필 사진">
                                    </div>
                                    <div class="replyInfoBox ml-2">
                                        <div>
                                            <span class="replyInfoID">UserID</span>
                                            <span class="replyInfoDate">2023.11.26. 18:14</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="commentContent">
                                    <span>여기 고민해봐야할 듯<br> 1. 엔터가 먹힐까? 엔터가 누르면 br태그가 들어가야하나..? <br>그리고 구분할 때 hr tag를 사용했는데 규칙 못찾았음..</span>
                                </div>
                                <div class="commentWirterBtnBox">
                                    <a class="replyWriterBnt">답글작성</a>
                                </div>
                                <hr>
                            </div>
                            <div class="pl-4 hidden" id="replyWriterContainal">
                                <div>
                                    <div class="commentWriter">
                                        <div class="comment_inbox">
                                            <span class="comment_inbox_name">똥심</span>
                                            <textarea placeholder="댓글을 남겨보세요 (여기는 버튼 누르면 나타나는 거임)"></textarea>
                                        </div>
                                        <div class="comment_attach d-flex justify-content-between align-items-center">
                                            <div class="comment_box_write_count">
                                                <strong class="fontSizeSmall comment_box_count_num">0</strong>
                                                <span class="fontSizeSmall">/</span>
                                                <span class="fontSizeSmall comment_box_write_total">500</span>
                                            </div>
                                            <div class="register_box">
                                                <a href="#" class="button">취소</a>
                                                <a href="#" class="button">등록</a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                </div>
                            </div>-->
                        </li>

                        <!-- 대댓글 -->
                        <!-- <li class="pl-4">
                            <div>
                                <div class="d-flex justify-content-start align-items-center">
                                    <div class="replyUserImgBox">
                                        <img class="mx-auto" src="${pageContext.request.contextPath}/assets/images/faces/face1.jpg" alt="프로필 사진">
                                    </div>
                                    <div class="replyInfoBox ml-2">
                                        <div>
                                            <span class="replyInfoID">UserID</span>
                                            <span class="replyInfoDate">2023.11.26. 18:14</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="commentContent">
                                    <span>여기 고민해봐야할 듯<br> 여기는 대댓글인데 대댓글이면 왼쪽에 살짝 안쪽으로 들어가야하는데 이걸 어떻게 해야할까..? 답글쓰기 작성 폼 처럼 안쪽으로 들어가야하는디... 쩝... <br>해결방법 <br>1.대댓글 폼일때는 li tag에 class="pl-3" 이걸 붙여주자!!</span>
                                </div>
                                <div class="commentWirterBtnBox">
                                <a href="#">답글작성</a>
                                </div>
                            </div>
                        </li> -->
                        <!-- 대댓글 End -->
                    </ul>
                    <!-- 원댓글 작성 폼 -->
                    <div class="commentWriter">
                        <div class="comment_inbox">
                            <span class="comment_inbox_name">똥심</span>
                            <textarea id="replyTextrea" placeholder="댓글을 남겨보세요"></textarea>
                        </div>
                        <div class="comment_attach d-flex justify-content-between align-items-center">
                            <div class="comment_box_write_count">
                                <strong class="fontSizeSmall comment_box_count_num" id="writeCount">0</strong>
                                <span class="fontSizeSmall">/</span>
                                <span class="fontSizeSmall comment_box_write_total">100</span>
                            </div>
                            <div class="register_box">
                                <!-- <a class="button">취소</a> -->
                                <a type="button" class="button">등록</a>
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
                <!--관련글 랜더링 장소-->
                <div class="relatedArticleTab"></div>
            </div>
            </div>
        </div>
        </div>
        <!-- Board Detail Page End -->
    </div>
    </div>
</div>

<script type="module" src="${pageContext.request.contextPath}/assets/js/boardDressDetailPage/index.js"></script>