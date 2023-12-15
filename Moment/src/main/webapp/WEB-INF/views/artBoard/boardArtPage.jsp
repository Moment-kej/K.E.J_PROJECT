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
                            <div class="card-title"><h2>Art 게시판</h2></div>
                            <div class="d-flex justify-content-center menuCategoryDiv">
                                <ul class="menuCategory p-0">
                                    <li><a class="AllListView menuCategoryATag" data-category="0">전체보기</a></li>
                                    <li><a class="menuCategoryATag">회화</a></li>
                                    <li><a class="menuCategoryATag">조각</a></li>
                                    <li><a class="menuCategoryATag">공예</a></li>
                                    <li><a class="menuCategoryATag">건축</a></li>
                                    <li><a class="menuCategoryATag">디자인</a></li>
                                    <li><a class="menuCategoryATag">판화</a></li>
                                    <li><a class="menuCategoryATag">소묘</a></li>
                                </ul>
                            </div>
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
                        <!--게시글 양식에 맞춰 게시글 목록 나오는 장소-->
                        <div id="contentList"></div>
                        <div class="contentNotData">
                        <!--글쓰기 버튼-->
                        <div class="writingBntDiv">
                            <button type="button" class="btn btn-inverse-success btn-md" id="writingBnt">글쓰기</button>
                        </div>
                        <!-- pagination -->
                        <div class="pagination d-flex justify-content-center">
                            <!-- 5. 맨 처음으로 -->
                            <a id="pageNumberOne" class="firstpage pbtn">
                                &laquo;&laquo;
                            </a>
                            
                            <!-- 3.이전페이지네이션 -->
                            <a id="pageStart" class="prevpage pbtn">
                                &laquo;
                            </a>
                            
                            <!-- 1.페이지네이션 -->
                            
                            <a class="pageNumber">
                                <span class="pagenum">1</span>
                            </a>
                            <a class="pageNumber">
                                <span class="pagenum">2</span>
                            </a>
                            <a class="pageNumber">
                                <span class="pagenum">3</span>
                            </a>
                            <a class="pageNumber">
                                <span class="pagenum">4</span>
                            </a>
                            <a class="pageNumber">
                                <span class="pagenum">5</span>
                            </a>
                            <!-- 2.다음페이지네이션 -->
                            <a id="pageNext" class="nextpage pbtn">
                                &raquo;
                            </a>
                            
                            <!-- 4. 맨 마지막으로 -->
                            <a id="pageRealEnd" class="lastpage pbtn">&raquo;&raquo;</a>
                        </div><!-- pagination end -->
                        <div>
                        	<!-- <p>확인용 >> ${criteria}</p>  ajax에 보낼 데이터 -->
                        	<input type="hidden" name="page" id="criteriaPage" value="${criteria.page}" />
                        	<input type="hidden" name="amount" id="criteriaAmount" value="${criteria.amount}" />
                        	<input type="hidden" name="category" id="criteriaCategory" value="${criteria.category}" />
                        	<input type="hidden" name="listType" id="criteriaListType" value="${criteria.listType}" />
                        	<input type="hidden" name="code" id="criteriaCode" value="30" />
                        	 <!-- <p>확인용 >> ${list}</p>  ajax로 보냈을때 가져오는 데이터 -->
                        </div>
                        <!-- search div -->
                        <div class="col-lg-12 pt-5">
                            <div class="d-flex justify-content-center grid-margin">
                                <div style="display: flex;">
                                    <select name="category" id="boardCategory">
                                        <option value="0">카테고리</option>
                                        <option value="300">회화</option>
                                        <option value="301">조각</option>
                                        <option value="302">공예</option>
                                        <option value="303">건축</option>
                                        <option value="304">디자인</option>
                                        <option value="305">판화</option>
                                        <option value="306">소묘</option>
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
<script>
/* 리스트, 카드, 앨범 타입 호출 */
 	function viewType(viewType){
 		let str1 = ``;
 		let str2 = ``;
 		let str3= `` ;
 		let data = {
 				page:$('#criteriaPage').val(),
 				amount:$('#criteriaAmount').val(),
 				category:$('#criteriaCategory').val(),
 				listType:$('#criteriaListType').val(),
 				code:$('#criteriaCode').val()
 					}; 
			 $.ajax({
				url: "/moment/board/artList",
				type: "GET",
				data: data,
				dataType: "json",
				success: function(data){
					console.log(data);
					$("#contentList").empty();
					// 리스트 타입일 때 나오도록
					if(viewType == "listType" || viewType == null){
						str1 = `<div>
							<div class="listType">
								<table class="table table-bordered" id="boardList">
									<colgroup><col style="width: 10%;">
										<col style="width: 35%;">
										<col style="width: 20%;">
										<col style="width: 20%;">
										<col style="width: 15%;">
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
								<tbody>`
						str3 =	`</tbody>
								</table>  
							</div>
					</div>`;
					}
					
					$.each(data, function(index, item) {
						// 리스트 타입일 떄 
						if(viewType == "listType" || viewType == null){
						    if (data != null) {
						        str2 += `<tr>
						                    <td>` + item.boardNo + `</td>
						                    <td>
						                        <a href="/moment/board/dress/all/35">` + item.title + ` 
						                            <span style="color:red;">[` + item.replyCount + `]</span>
						                        </a>
						                    </td>
						                    <td>` + item.id + `</td>
						                    <td>` + item.writeDt + `</td>
						                    <td>` + item.view + `</td>
						                </tr>`;
						    } else {
						        str2 = ` <h3>"조회할 게시글이 없습니다."</h3> `;
						    }
						}
					});
	
					$("#contentList").append(str1 + str2 + str3);
					
				}
			}) 
		}

	viewType();
	// 리스트 타입
	$("#listType").on("click", function(e) {
		e.preventDefault();// 버튼 submit
		viewType("listType");
	});
	// 카드 타입
	$("#cardsType").on("click", function(e) {
		e.preventDefault();// 버튼 submit
		viewType("listType");
	});
	// 앨범 타입
	$("#albumType").on("click", function(e) {
		e.preventDefault();// 버튼 submit
		viewType("listType");
	});
</script>
