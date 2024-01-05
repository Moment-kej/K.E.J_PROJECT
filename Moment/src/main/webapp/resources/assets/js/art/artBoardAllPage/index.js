import { formatTime_hhmm } from "../../common/common.js";

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
 		let page1 = ``;
 		let page2 = ``;
 		let page3 = ``;
 		let page4 = ``;
 		let page5 = ``;
 		let data = {
 				page:$('#criteriaPage').val(),
 				amount:$('#handleAmount').val(),
 				category:$('#boardCategory').val(),
 				code:30
 					};
 		
 		console.log(data);
			 $.ajax({
				url: "/moment/board/artList",
				type: "GET",
				data: data,
				dataType: "json",
				success: function(data){
					console.log(data.artBoardList);
					console.log(data.pageVO);
					$("#contentList").empty(); // 게시글 나올곳
					$("#pagingBox").empty(); // 페이징 할 곳
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
					$.each(data.artBoardList, function(index, item) {
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
						                    <td>` + formatTime_hhmm(item.writeDt) + `</td>
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
							    							<span>`+formatTime_hhmm(item.writeDt)+`</span>
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
							    			<span>`+formatTime_hhmm(item.writeDt)+`</span>
							    			<span> ⦁ 조회 `+item.viewCount+`</span>
							    		</p>
							    	</div>
							    </div>`;
							    } 
						}
					
					});
	
					$("#contentList").append(str1 + str2 + str3);
					
					page1 = `<!-- 5. 맨 처음으로 -->
                            <button id="firstPage" class="firstpage pbtn">
                                <i class="fa-solid fa-angles-left"></i>
                            </button>`;
                    page2 = `<!-- 3.이전페이지네이션 -->
                            <button id="beforePage" class="prevpage pbtn">
                                <i class="fa-solid fa-angle-left"></i>
                            </button>`; 
                    $.each(data.pageVO, function(index, item) {
                        if(item.page>=item.start){
                    page3 = `<!-- 1.페이지네이션 나는 백틱으로 구현하기 -->
                            <button class="pageNumBtn pbtn" id="pageNumBtn + `+item.page+`>
                            	`+item.page +`
                            </button>`;
                        }
                    });
                    page4 = `<!-- 2.다음페이지네이션 -->
                            <button id="afterPage" class="nextpage pbtn">
                                <i class="fa-solid fa-angle-right"></i>
                            </button>`;
                    page5 = `<!-- 4. 맨 마지막으로 -->
                            <button id="lastPage" class="lastpage pbtn">
                                <i class="fa-solid fa-angles-right"></i>
                            </button>`;
                    if(data.pageVO.total !== 0){
					$("#pagingBox").append(page1 + page2 + page3 + page4 + page5);
					}
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
		type = "albumType";
		viewType(type);
	});