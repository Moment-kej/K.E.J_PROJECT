<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <div class="main-panel">
      <div class="content-wrapper">
        <div class="row">
          <!-- Board Detail Page -->
          <div class="container">
            <div class="container-fluid">
              <div class="mx-auto">
                <!-- Top Button -->
                <div class="topBtn d-flex align-content-between">
                  <a href="#"><i class="fa-solid fa-angle-up"></i>이전글</a>
                  <a href="#"><i class="fa-solid fa-angle-down"></i>다음글</a>
                  <a href="#">목록</a>
                </div>
                <!-- Top Button End -->
                
                <!-- Detail Content -->
                <div class="contentBox">
                  <div class="cntnHeaderBox">
                    <div class="headerTitleBox">
                      <a href="#">해당 게시판 목록<i class="fa-solid fa-angle-right"></i></a>
                      <h3>게시글 Title</h3>
                    </div>
                    <div class="writerInfoBox">
                      <div class="d-flex justify-content-start align-items-center ">
                        <div class="writerImgBox justify-content-start align-items-center">
                          <img src="${pageContext.request.contextPath}/assets/images/faces/face3.jpg" alt="사용자프로필">
                        </div>
                        <div class="writerInfo">
                          <div class="writerInfoID">
                            <span class="userID">사용자ID</span>
                          </div>
                          <div class="d-flex justify-content-center align-items-center">
                            <span class="date">2023.11.29 16:0:00</span>
                            <span class="view">조회<span class="viewCount">5</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr>
                  </div>
                  <div class="contentViewer">
                    게시글 본문 </br>
                    게시글 본문 </br>
                    게시글 본문 </br>
                    게시글 본문 </br>
                    게시글 본문 </br>
                    게시글 본문 </br>
                    게시글 본문 </br>
                    게시글 본문 </br>
                    게시글 본문 </br>
                    게시글 본문 </br>
                  </div>
                  <div class="replyBox d-flex justify-content-start align-items-center">
                    <div class="likeBox d-flex justify-content-start align-items-center">
                      <span class="like"><i class="fa-regular fa-face-kiss-wink-heart"></i>좋아요</span>
                      <span class="likeCount">10</span>
                    </div>
                    <div class="replyCountBox d-flex justify-content-start align-items-center">
                      <span class="reply"><i class="fa-regular fa-comment-dots"></i>댓글</span>
                      <span class="replyCount">1</span>
                    </div>
                  </div>
                  <hr>
                  
                  <!-- Detail Reply -->
                  <div class="commentBox">
                    <ul class="p-1">
                      <!-- 댓글 -->
                      <li>
                        <div>
                          <div class="d-flex justify-content-start align-items-center">
                            <div class="replyUserImgBox">
                              <img class="mx-auto" src="images/faces/face3.jpg" alt="프로필 사진">
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
                            <a href="#">답글작성</a>
                          </div>
                          <hr>
                        </div>
                      </li>
                      <!-- 답글 작성 폼 -->
                      <li class="pl-4">
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
                      </li> <!-- 답글 작성 폼 End -->
                      <!-- 대댓글 -->
                      <li class="pl-4">
                        <div>
                          <div class="d-flex justify-content-start align-items-center">
                            <div class="replyUserImgBox">
                              <img class="mx-auto" src="images/faces/face1.jpg" alt="프로필 사진">
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
                      </li><!-- 대댓글 End -->
                    </ul>
                    <!-- 원댓글 작성 폼 -->
                    <div class="commentWriter">
                      <div class="comment_inbox">
                        <span class="comment_inbox_name">똥심</span>
                        <textarea placeholder="댓글을 남겨보세요 (여기는 기본 댓글 창)"></textarea>
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
                    </div><!-- 원댓글 작성 폼 End -->
                  </div> <!-- Detail Reply End -->
                </div> <!-- Detail Content End -->

                <!-- 관련 게시글? 추천 게시글? -->
                <div class="related_list_article">
                  <h2>
                    <strong class="title"> '<span class="inner">Music</span>' </strong>
                    <span class="text">게시판 글</span>
                  </h2>
                  <div class="relatedArticleTab">
                    <ul class="pl-1">
                      <li class="d-flex justify-content-between align-items-center">
                        <div class="tit_area d-flex justify-content-start align-items-center">
                          <a href="#"><span class="textColorTit">게시글 제목이 들어갈 곳</span></a>
                          <span class="ml-1 textColor count">[3]</span>
                        </div>
                        <div class="member_area">
                          <span class="text-right textColorGray">UserID</span>
                        </div>
                        <div class="date_area">
                          <span class="text-right textColorGray">2023.12.06</span>
                        </div>
                      </li>
                      <li class="d-flex justify-content-between align-items-center">
                        <div class="tit_area d-flex justify-content-start align-items-center">
                          <a href="#"><span class="textColorTit">게시글 제목이 들어갈 곳</span></a>
                          <span class="ml-1 textColor count">[3]</span>
                        </div>
                        <div class="member_area">
                          <span class="text-right textColorGray">UserID</span>
                        </div>
                        <div class="date_area">
                          <span class="text-right textColorGray">2023.12.06</span>
                        </div>
                      </li>
                      <li class="d-flex justify-content-between align-items-center">
                        <div class="tit_area d-flex justify-content-start align-items-center">
                          <a href="#"><span class="textColorTit">게시글 제목이 들어갈 곳</span></a>
                          <span class="ml-1 textColor count">[3]</span>
                        </div>
                        <div class="member_area">
                          <span class="text-right textColorGray">UserID</span>
                        </div>
                        <div class="date_area">
                          <span class="text-right textColorGray">2023.12.06</span>
                        </div>
                      </li>
                      <li class="d-flex justify-content-between align-items-center">
                        <div class="tit_area d-flex justify-content-start align-items-center">
                          <a href="#"><span class="textColorTit">게시글 제목이 들어갈 곳</span></a>
                          <span class="ml-1 textColor count">[3]</span>
                        </div>
                        <div class="member_area">
                          <span class="text-right textColorGray">UserID</span>
                        </div>
                        <div class="date_area">
                          <span class="text-right textColorGray">2023.12.06</span>
                        </div>
                      </li>
                      <li class="d-flex justify-content-between align-items-center">
                        <div class="tit_area d-flex justify-content-start align-items-center">
                          <a href="#"><span class="textColorTit">게시글 제목이 들어갈 곳</span></a>
                          <span class="ml-1 textColor count">[3]</span>
                        </div>
                        <div class="member_area">
                          <span class="text-right textColorGray">UserID</span>
                        </div>
                        <div class="date_area">
                          <span class="text-right textColorGray">2023.12.06</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Board Detail Page End -->
        </div>
      </div>
    </div>