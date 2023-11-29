<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/eunae/boardDressPage.css"/>
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <!-- 게시판 구분 및 카테고리 나오는 장소 -->
            
            <!--게시글 전체 목록 장소-->
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="boardCategoryInfo">
                            <c:forEach var="item" items="${code.CO}">
                                <c:if test="${item.commonDetailCd == 10}">
                                    <div class="card-title">
                                        <h2>${item.commonDetailName} 게시판</h2>
                                    </div>
                                    <div class="d-flex justify-content-center menuCategoryDiv">
                                        <ul class="menuCategory">
                                            <li><a id="0" href="${pageContext.request.contextPath}/board/1?page=1&amount=${pageVO.amount}">전체보기</a></li>
                                            <c:forEach var="coDetailList" items="${code.CA}">
                                                <c:if test="${coDetailList.commonDetailEx eq '옷 카테고리'}">
                                                    <li>
                                                        <a id="${coDetailList.commonDetailCd}">${coDetailList.commonDetailName}</a>
                                                    </li>
                                                </c:if>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                </c:if>
                            </c:forEach>
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
                                        <select id="handleAmount" onchange="Change(1, ${criteria.category})">
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
                                <c:if test="${list != null}">
                                    <c:forEach var="item" items="${list}">
                                        <tr>
                                            <td class="text-center pb-3 pt-3">${item.boardNo}</td>
                                            <td class="pb-3 pt-3">
                                                <a href="#">
                                                    ${item.title}
                                                    <span style="color: red;">[${item.replyCount}]</span>
                                                </a>
                                            </td>
                                            <td class="pb-3 pt-3">${item.writer}</td>
                                            <td class="text-center pb-3 pt-3">
                                                <fmt:formatDate value="${item.writeDt}" pattern="yyyy.MM.dd HH:mm" />
                                                
                                            </td>
                                            <td class="text-center pb-3 pt-3">${item.view}</td>
                                        </tr>
                                    </c:forEach>
                                </c:if>
                                <c:if test="${list.isEmpty()}">
                                    <tr colspan="5">
                                        <td colspan="5" id="boardNotList">
                                            <h3>조회할 게시글이 없습니다.</h3>
                                        </td>
                                    </tr>
                                </c:if>
                            </tbody>
                        </table> <!--게시글-->
                        <div class="writingBntDiv">
                            <button type="button" class="btn btn-inverse-success btn-md" id="writingBnt">글쓰기</button>
                        </div>

                        <div>
                            <p>확인용 >> ${criteria}</p>
                            <input type="hidden" name="page" id="criteriaPage" value="${criteria.page}">
                            <input type="hidden" name="amount" id="criteriaAmount" value="${criteria.amount}">
                            <input type="hidden" name="category" id="criteriaCategory" value="${criteria.category}">
                        </div>
                        <!-- 페이징 장소 -->

                            <div class="pagination d-flex justify-content-center">
                                <!-- 5. 맨 처음으로 -->
                                <c:if test="${pageVO.end != 0}">
                                <a href="${pageContext.request.contextPath}/board/1?page=1&amount=${pageVO.amount}&category=${pageVO.cri.category}"
                                    class="firstpage pbtn">
                                    <!--<img src="${pageContext.request.contextPath }/resources/img/btn_firstpage.png" alt="첫 페이지로 이동">-->
                                    &laquo;&laquo;
                                </a>
                                </c:if>
                                
                                <!-- 3.이전페이지네이션 -->
                                <c:if test="${pageVO.prev }">
                                <a href="${pageContext.request.contextPath}/board/1?page=${pageVO.start-1 }&amount=${pageVO.amount}&category=${pageVO.cri.category}" class="prevpage pbtn">
                                    <!--<img src="${pageContext.request.contextPath }/resources/img/btn_prevpage.png" alt="이전 페이지로 이동">-->
                                    &laquo;
                                </a>
                                </c:if>
                                
                                <!-- 1.페이지네이션 -->
                                <c:forEach var="num" begin="${ pageVO.start}" end="${ pageVO.end}">
                                <a href="${pageContext.request.contextPath}/board/1?page=${num }&amount=${pageVO.amount}&category=${pageVO.cri.category}">
                                    <span class="pagenum ${pageVO.page == num ? 'currentpage' : '' }currentpage">${num}</span>
                                </a>
                                </c:forEach>
                                
                                <!-- 2.다음페이지네이션 -->
                                <c:if test="${pageVO.next }">
                                <a href="${pageContext.request.contextPath}/board/1?page=${pageVO.end+1 }&amount=${pageVO.amount}&category=${pageVO.cri.category}" class="nextpage pbtn">
                                    <!--<img src="${pageContext.request.contextPath }/resources/img/btn_nextpage.png" alt="다음 페이지로 이동">-->
                                    &raquo;
                                </a>
                                </c:if>
                                
                                <!-- 4. 맨 마지막으로 -->
                                <c:if test="${pageVO.end != 0}">
                                <a href="${pageContext.request.contextPath}/board/1?page=${pageVO.realEnd }&amount=${pageVO.amount}&category=${pageVO.cri.category}" class="lastpage  pbtn">
                                    <!--<img src="${pageContext.request.contextPath }/resources/img/btn_lastpage.png" alt="마지막 페이지로 이동">-->
                                    &raquo;&raquo;
                                </a>
                                </c:if>
                            </div>
                        </div> <!-- 페이징 장소 -->

                        <!-- 검색 장소 -->
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

                        <div class="testDiv col-lg-12">
                            <ul id="itemList"></ul>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script type="text/javascript">
    // 글쓰기 버튼 클릭 이벤트
    $("#writingBnt").click(()=>{
        let writingLink = '${pageContext.request.contextPath}/board/3/1';

        // 현재 창으로 링크 열기
        window.location.href = writingLink;
        // 새로운 창으로 링크 열기
        // window.open(writingLink, '_blank');
    });

    var aTag = document.querySelectorAll('.menuCategory a');
    // NodeList를 순회하여 각 요소에 이벤트 리스너를 추가합니다.
    aTag.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // 클릭한 요소의 ID 값을 가져온다.
            var clickedId = link.id;
            Change(1, clickedId);
        });
    });

    // 게시글 목록 수 : 10개씩, 20개씩 ... 40개씩
    function Change(idx, category) {
        var pagenum = idx;
        var nowPaging = $("#handleAmount option:selected").val();
        if(nowPaging == 10){
            location.href="${pageContext.request.contextPath}/board/1?page="+pagenum+"&amount="+nowPaging+"&category=" + category;
        }else if(nowPaging == 20){
            location.href="${pageContext.request.contextPath}/board/1?page="+pagenum+"&amount="+nowPaging+"&category=" + category;    
        }else if(nowPaging == 30){
            location.href="${pageContext.request.contextPath}/board/1?page="+pagenum+"&amount="+nowPaging+"&category=" + category;    
        }else if(nowPaging == 40){
            location.href="${pageContext.request.contextPath}/board/1?page="+pagenum+"&amount="+nowPaging+"&category=" + category;    
        }
    };
</script>
