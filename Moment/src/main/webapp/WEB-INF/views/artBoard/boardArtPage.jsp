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
                            <!-- 5. 맨 처음으로 -->
                            <button id="firstPage" class="firstpage pbtn">
                                <i class="fa-solid fa-angles-left"></i>
                            </button>
                            
                            <!-- 3.이전페이지네이션 -->
                            <button id="beforePage" class="prevpage pbtn">
                                <i class="fa-solid fa-angle-left"></i>
                            </button>
                            
                            <!-- 1.페이지네이션 -->
                            <c:forEach var="num" begin="${pageVO.start}" end="${pageVO.end}">
                            <button class="pageNumber pbtn" data-page="${num}">
                                <span class="pagenum ${pageVO.page == num ? 'currentpage' : '' }currentpage">${num}</span>
                            </button>
                            </c:forEach>
                            
                            <!-- 2.다음페이지네이션 -->
                            <button id="afterPage" class="nextpage pbtn">
                                <i class="fa-solid fa-angle-right"></i>
                            </button>
                            
                            <!-- 4. 맨 마지막으로 -->
                            <button id="lastPage" class="lastpage pbtn">
                                <i class="fa-solid fa-angles-right"></i>
                            </button>
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
<script>
let category;
let type;
let amount;
	function amountType(){
		amount = $('#handleAmount').val();
		viewType(type);
	}
	function categoryType(categoryType){
		category = categoryType;
		viewType(type);
	}
/* 리스트, 카드, 앨범 타입 호출 */
 	function viewType(viewType){
 		let str1 = ``;
 		let str2 = ``;
 		let str3 = ``;
 		let data = {
 				page:$('#criteriaPage').val(),
 				amount:amount,
 				category:category,
 				code:30
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
					}else if(viewType == "albumType"){
						str1 = `<div class = "cardsType" >`
						str3 = `</div class = "cardsType" >`
					}else if(viewType == "cardsType"){
						str1 = ``
						srt3 = ``
					}
					if(data.length == 0){
						if(viewType == "listType" || viewType == null){
							 str2 = ` <tr>
							 			<td colspan="5">"조회할 게시글이 없습니다."</td>
							 		  </tr>`;
						}else if(viewType == "albumType" || viewType == "cardsType"){
							str2 = ` <h3>"조회할 게시글이 없습니다."</h3> `;
						}
					}
					$.each(data, function(index, item) {
						// 리스트 타입일 떄 
						if(viewType == "listType" || viewType == null){
						    if (data != null) {
						        str2 += `<tr>
						                    <td>` + item.boardNo + `</td>
						                    <td>
						                        <a href="/moment/board/art/`+item.boardNo+`">` + item.title + ` 
						                            <span style="color:red;">[` + item.replyCount + `]</span>
						                        </a>
						                    </td>
						                    <td>` + item.id + `</td>
						                    <td>` + item.writeDt + `</td>
						                    <td>` + item.viewCount + `</td>
						                </tr>`;
						    }
						}else if(viewType == "albumType"){
							 if (data != null) {
							        str2 += `<div class="postAlbumType">
							        	<ui>
							    		<li>
							    			<div class="card_area">
							    				<div class="con">
							    					<div class="con_top">
							    						<div class="tit_area">
							    							<a href="/moment/board/art/`+item.boardNo+`">`+item.title+`</a>
							    						</div>
							    							<p>`+item.content+`</p>
							    					</div>
							    					<div class="con_bottom">
							    						<div class="user_info">`+item.id+`</div>
							    						<div class="date_num">
							    							<span>`+item.writeDt+`</span>
							    							<span>조회 `+item.viewCount+`</span>
							    							<span>댓글 `+item.replyCount+`</span>
							    						</div>
							    					</div>
							    				</div>
							    				<div class="movie-img" style="opacity: 0;">
							    					<a>
							    					</a>
							    				</div>
							    			</div>
							    		</li>
							    	</ui>
							    </div>`;
							    }
						}else if(viewType == "cardsType"){
							 if (data != null) {
							        str2 += `<div class="postType">
							        	<div class="cardType mr-3">
							    		<a href="/moment/board/art/`+item.boardNo+`">
							    			<img class="albumTypeImg" src="/moment/assets/images/noImages.png">
							    		</a>
							    		<p class="cardsPStyle">`+item.title+`</p>
							    		<p>`+item.id+`</p>
							    		<p style="font-size: 11px;">
							    			<span>`+item.writeDt+`</span>
							    			<span> ⦁ 조회 `+item.viewCount+`</span>
							    		</p>
							    	</div>
							    </div>`;
							    } 
						}
					
					console.log("data" + data.length);
					});
	
					$("#contentList").append(str1 + str2 + str3);
					
				}
			}) 
		}

	viewType();
	// 리스트 타입
	$("#listType").on("click", function(e) {
		e.preventDefault();// 새로고침 방지
		type = "listType";
		viewType(type);
	});
	// 카드 타입
	$("#cardsType").on("click", function(e) {
		e.preventDefault();
		type = "cardsType";
		viewType(type);
	});
	// 앨범 타입
	$("#albumType").on("click", function(e) {
		e.preventDefault();
		type = "cardsType";
		viewType(type);
	});
</script>
