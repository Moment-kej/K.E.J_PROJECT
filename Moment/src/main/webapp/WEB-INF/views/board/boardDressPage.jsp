<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style>
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

<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
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
                </tbody>
            </table>
            <div>
                <button type="button">글쓰기</button>
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
                    <select name="searchType" id="searchType">
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
        </div>
    </div>
</div>
