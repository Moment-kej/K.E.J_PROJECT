<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
        <!-- <script src="https://kit.fontawesome.com/9fc370938e.js" crossorigin="anonymous"></script> -->
        <style>
        .pagination {
            display: inline-block;
        }

        .pagination a {
            color: black;
            float: left;
            padding: 8px 16px;
            text-decoration: none;
        }
        .boardAllList {
            float: right;
        }
        .boardTempList {
            display: inline-block;
            margin-right: 10px;
        }
        .listSizeSelect {
            display: inline-block;
        }
        
</style>
<meta charset="UTF-8">
<title>Board Test Page</title>
</head>
<body>
    <!-- 게시판 구분 및 카테고리 나오는 장소 -->
    <div class="boardCategoryInfo">
        <c:forEach var="item" items="${code.CO}">
            <c:if test="${item.commonDetailCd == 10}">
                <h3>${item.commonDetailName} 게시판</h3>
                <a href="#">전체보기</a> <span> | </span>
                <c:forEach var="coDetailList" items="${code.CA}">
                    <c:if test="${coDetailList.commonDetailEx eq '옷 카테고리'}">
                        <a href="#" >${coDetailList.commonDetailName}</a> <span> | </span>
                    </c:if>
                </c:forEach>
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
            <select name="contentnum" id="cotentnum" onchange="page(1)">
                <option value="10" <c:if test="${page.getContentnum() == 10 }">selected="selected"</c:if> >10개씩</option>
                <option value="20" <c:if test="${page.getContentnum() == 20 }">selected="selected"</c:if> >20개씩</option>
                <option value="30" <c:if test="${page.getContentnum() == 30 }">selected="selected"</c:if> >30개씩</option>
                <option value="40" <c:if test="${page.getContentnum() == 40 }">selected="selected"</c:if> >40개씩</option>
            </select>
        </div>
    </div>
    <div style="clear:both"></div>

    <!--게시글 전체 목록 장소-->
    <table id="boardList" class="table table-bordered">
        <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach var="item" items="${list}">
                <tr>
                    <td>${item.boardNo}</td>
                    <td>
                        ${item.title}
                        <span style="color: red;">[${item.replyCount}]</span>
                    </td>
                    <td>${item.writer}</td>
                    <td>${item.writeDt}</td>
                    <td>${item.view}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
    <div>
        <button type="button">글쓰기</button>
    </div>

    <!-- 페이징 장소 -->
    <div class="pagination">
        <c:if test="${page.prev}">
            <a href="javascript:page(${page.getStartPage()-1});">&laquo;</a>
        </c:if>
        <c:forEach begin="${page.getStartPage()}" end="${page.getEndPage()}" var="idx">
            <a href="javascript:page(${idx});">${idx}</a>
        </c:forEach>
        <c:if test="${page.next}">
            <a href="javascript:page(${page.getEndPage()+1});">&raquo;</a>
        </c:if>
    </div>

    <!-- 검색 장소 -->
    <div>
        <form>
            <select name="category" id="boardCategory">
                <option value="0">카테고리</option>
                <option value="">아우터</option>
                <option value="">상의</option>
                <option value="">하의</option>
            </select>
            <select name="category" id="boardCategory">
                <option value="">게시글 + 댓글</option>
                <option value="">제목만</option>
                <option value="">글작성자</option>
                <option value="">댓글내용</option>
                <option value="">댓글작성자</option>
            </select>
            <input>
            <button type="submit" class="boardSearchBnt">검색</button>
        </form>
    </div>
    <script type="text/javascript">
        // 한페이지당 게시물
        function page(idx) {
            var pagenum = idx;
            var contentnum = $("#contentnum option:selected").val();

            if(contentnum == 10) {
                location.href="${pageContext.request.contextPath}/board/1?pagenum="+pagenum+"&contentnum="+contentnum;
            } else if(contentnum == 20) {
                location.href="${pageContext.request.contextPath}/board/1?pagenum="+pagenum+"&contentnum="+contentnum;
            } else if(contentnum == 30) {
                location.href="${pageContext.request.contextPath}/board/1?pagenum="+pagenum+"&contentnum="+contentnum;
            } else if(contentnum == 40) {
                location.href="${pageContext.request.contextPath}/board/1?pagenum="+pagenum+"&contentnum="+contentnum;
            }
        }
    </script>
</body>
</html>