<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
  <div class="main-panel">
    <div class="content-wrapper">
      <!-- Board Detail Page -->
      <div class="container-fluid"><!-- 은애언니, 수민 (class명 수정)-->
        <div class="container-fluid">
          <div class="mx-auto">
            <!-- Top Button -->
            <div class="d-flex justify-content-between align-items-center topBtnBox"><!-- 은애언니, 수민 여기 div안에 내용 바꼇어 확인해줭-->
              <div class="leftBtnBox">
                <button id="modify">수정</button>
                <button id="delete">삭제</button>
              </div>
              <div class="rightBtnBox">
                <button id="pageUp"><i class="fa-solid fa-angle-up"></i>이전글</button>
                <button id="pageDown"><i class="fa-solid fa-angle-down"></i>다음글</button>
                <button id="goAllList">목록</button>
              </div>
            </div><!-- 은애언니, 수민 여기 div안에 내용 바꼈어 확인해줭-->
            <!-- Top Button End -->
            
            <!-- Detail Content -->
            <div class="contentBox">
              <div class="cntnHeaderBox hrStyle">
                <div class="headerTitleBox">
                  <a href="${pageContext.request.contextPath}/board/music">Music 게시판 목록<i class="fa-solid fa-angle-right"></i></a>
                  <h3>${item.title}</h3>
                </div>
                <div class="writerInfoBox">
                  <div class="d-flex justify-content-start align-items-center ">
                    <div class="writerImgBox justify-content-start align-items-center">
                      <img src="${pageContext.request.contextPath}/assets/images/faces/face3.jpg" alt="사용자프로필">
                    </div>
                    <div class="writerInfo">
                      <div class="writerInfoID">
                        <span class="userID">${item.id}</span>
                      </div>
                      <div class="d-flex justify-content-center align-items-center">
                        <span class="date">${item.writeDt}</span>
                        <span class="view">조회<span class="viewCount">${item.viewCount}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contentViewer">${item.content}</div>
              <div class="replyBox">
                <div class="d-flex justify-content-start align-items-center mb-3">
                  <div class="likeBox d-flex justify-content-start align-items-center">
                    <span class="like fw-medium"><i class="fa-regular fa-face-kiss-wink-heart"></i><i class="fa-solid fa-face-kiss-wink-heart"></i>좋아요</span>
                    <span class="likeCount">${item.likeCount}</span>
                  </div>
                  <div class="replyCountBox d-flex justify-content-start align-items-center">
                    <span class="reply fw-medium"><i class="fa-regular fa-comment-dots"></i>댓글</span>
                    <span class="replyCount">${item.replyCount}</span>
                  </div>
                </div>
              </div>
              
              <!-- Reply -->
              <div class="commentBox">
                <ul id="comment_area_box" class="p-1">
                  <li class="commentItem">
                    <div class="comment_area">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-start align-items-center">
                          <div class="replyUserImgBox">
                            <img class="mx-auto" src="${pageContext.request.contextPath}/assets/images/faces/face3.jpg" alt="프로필 사진">
                          </div>
                          <div class="replyInfoBox ml-2">
                            <div id="reply_info_area">
                              <span class="replyInfoID">UserID</span>
                              <span class="replyInfoDate">2023.11.26. 18:14</span>
                            </div>
                          </div>
                        </div>
                        <div class="commentBtnBox">
                          <button class="modifyBtnBox">
                            <i class="fa-solid fa-pen-to-square commentModifyBtn"></i>
                          </button>
                          <button class="deleteBtnBox">
                            <i class="fa-solid fa-trash commentDelBtn"></i>
                          </button>
                        </div>
                      </div>
                      <div class="commentContent">
                        <span>여기 고민해봐야할 듯<br> 1. 엔터가 먹힐까? 엔터가 누르면 br태그가 들어가야하나..? <br>그리고 구분할 때 hr tag를 사용했는데 규칙 못찾았음..</span>
                      </div>
                      <div class="commentWirterBtnBox">
                        <button type="button">답글작성</button>
                      </div>
                    </div>
                    <!-- 답글 작성 폼 -->
                    <div class="comment_area">
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
                            <button class="button">취소</button>
                            <button class="button">등록</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <!-- 대댓글 -->
                  <li class="commentItem">
                    <div class="comment_area pl-5">
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
                        <button type="button">답글작성</button>
                      </div>
                    </div>
                  </li><!-- 대댓글 End -->
                  <li class="pl-5 commentItem">
                    <div class="comment_area">
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
                        <button type="button">답글작성</button>
                      </div>
                    </div>
                  </li><!-- 대댓글 End -->
                  <li class="commentItem">
                    <div class="comment_area">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-start align-items-center"> <!-- 은애언니, 수민 여기 부분 수정 (div 태그 추가)-->
                          <div class="replyUserImgBox">
                            <img class="mx-auto" src="${pageContext.request.contextPath}/assets/images/faces/face3.jpg" alt="프로필 사진">
                          </div>
                          <div class="replyInfoBox ml-2">
                            <div>
                              <span class="replyInfoID">UserID</span>
                              <span class="replyInfoDate">2023.11.26. 18:14</span>
                            </div>
                          </div>
                        </div><!-- 은애언니, 수민 여기 부분 수정 (div 태그 닫기)-->
                        <div class="commentBtnBox"><!-- 은애언니, 수민 수정이랑 삭제 버튼! (commentBtnBox이 div안에 내용까지 통채로 넣기!)-->
                          <button class="modifyBtnBox">
                            <i class="fa-solid fa-pen-to-square commentModifyBtn"></i>
                          </button>
                          <button class="deleteBtnBox">
                            <i class="fa-solid fa-trash commentDelBtn"></i>
                          </button>
                        </div><!-- 은애언니, 수민 수정이랑 삭제 버튼! (commentBtnBox이 div안에 내용까지 통채로 넣기!)-->
                      </div>
                      <div class="commentContent">
                        <span>여기 고민해봐야할 듯<br> 1. 엔터가 먹힐까? 엔터가 누르면 br태그가 들어가야하나..? <br>그리고 구분할 때 hr tag를 사용했는데 규칙 못찾았음..</span>
                      </div>
                      <div class="commentWirterBtnBox">
                        <button type="button">답글작성</button>
                      </div>
                    </div>
                  </li>
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
                      <button class="button">취소</button><!-- 은애언니, 수민 여기 a tag -> button tag-->
                      <button class="button">등록</button><!-- 은애언니, 수민 여기 a tag -> button tag-->
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
      </div> <!-- Board Detail Page End -->
    </div> <!-- content-wrapper ends -->
  </div>
  <script type="module" src="${pageContext.request.contextPath}/assets/js/music/musicBoardDetail/musicBoardDetail.js"></script>