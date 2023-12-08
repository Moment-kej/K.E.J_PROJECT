<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<style>
  #categoryLabel {
    font-size: 0.875rem;
    line-height: 1.4rem;
    vertical-align: top;
  }
  .ck-editor__editable[role="textbox"] {
    min-height: 300px;
  }
  .ck-content .image {
    max-width: 80%;
    margin: 20px auto;
  }
</style>
  <div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div class="card-body">
                <div class="contentCenterSetting">
                  <div class="contentWidthSetting">
                    <h4 class="card-title">게시판 등록 페이지</h4>
                    <!-- 게시판 등록 form -->
                    <form class="forms-sample" method="post">
                      <div class="form-group">
                        <label for="writer">작성자</label>
                        <input type="text" name="id" id="writer" placeholder="작성자 적으삼" value="작성자"  class="form-control">
                      </div>
                      <div class="form-group">
                        <label for="title">제목</label>
                        <input type="text" name="title" id="title" placeholder="제목을 입력해주세요!"  class="form-control">
                      </div>
                      <!-- 카테고리 분류 -->
                      <div id="categoryLabel">
                      <label for="category">카테고리</label>
                      </div>
                      <div class="listCategorySelect">
                        <div class="form-group">
                          <select id="mainCategory" name="code" class="form-control">
                            <option name="" value="0">대분류</option>
                            <c:forEach var="item" items="${code.CO}">
                              <option name="${item.commonDetailCd}" id="${item.commonDetailCd}" value="${item.commonDetailCd}">${item.commonDetailName}</option> 
                            </c:forEach>
                          </select>
                        </div>
                        <div class="form-group">
                          <select  name="category" id="subCategory" class="form-control">
                            <option name="0" value="0">중분류</option>
                            <c:forEach var="item" items="${code.CA}">
                              <option name="${item.commonDetailCd}" class="${item.commonDetailCd}" value="${item.commonDetailCd}">${item.commonDetailName}</option> 
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      <!-- 게시글 작성 장소 -->
                      <div class="form-group">
                        <div id="editor"></div>
                      </div>
                      <div>
                          <hr>
                          <button onclick="showData()">담긴 데이터 보기(debug)</button>
                      </div>
                      <!-- 게시글 등록 또는 뒤로가기 (임시저장 없음 알림창 띄우기) -->
                      <button type="submit" class="mr-2" id="submintBtn" >등록</button>
                      <button id="backBtn">뒤로가기</button>

                    </form>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="${pageContext.request.contextPath}/assets/js/ckeditor/ckaditorSuperBuild.js"></script>
<script>
      // const boardInsertAjax = () => {
      //   // #{code}, #{category}, #{id}, #{title}, #{content}
      //   let dataForm = {code : code.value,
      //                   category : category.value,
      //                   id : id.value,
      //                   title : title.value,
      //                   content : editor.getData()};

      //   $.ajax({
      //           url: "/moment/board/boardInsertSave",
      //           method: "POST",
      //           async: false,
      //           dataType: "JSON",
      //           data: dataForm,
      //           success: function (data) {
      //               console.log(data);
      //           },
      //           error: function (reject) {
      //               console.error(reject);
      //               alert('오류');
      //           },
      //       });
      // }

      // 대분류 카테고리에 맞게 중분류 카테고리가 노출되는 함수
      const cateogryChange = () => {
          // mainCategory와 subCategory select 요소 가져오기
          let mainCategorySelect = document.getElementById('mainCategory');   // 메인 카테고리 select tag
          let subCategorySelect = document.getElementById('subCategory');     // 서브 카테고리 select tag
          
          // mainCategory 변경 시 이벤트 처리
          mainCategorySelect.addEventListener('change', function() {
              let mainCategoryValue = mainCategorySelect.value;                       // 메인 카테고리 value
              let subCategoryOptions = subCategorySelect.querySelectorAll('option');  // subCategory에 해당되는 option들 가져오기
              // subCategory option을 반복해서 value 값추출
              subCategoryOptions.forEach(function(option) {
                  let optionValueSubStr = option.value.substring(0,2);    // option value 값 앞 숫자 2개만 가져온다
                  if(mainCategoryValue == optionValueSubStr) {            // 메인 값과 서브 앞 숫자 2개의 값이 같으면
                    option.style.display = 'block';                       // 서브 옵션 태그를 활성화
                  } else {
                    option.style.display = 'none';                         // 같지 않으면 서브 옵션 태그를 비활성화
                  }
              });
          });
      };

      // 뒤로가기 버튼
      const backBnt = () => {
        document.getElementById('backBtn').addEventListener('click', ()=> {
          // 만약 카테고리나 제목, 글 내용을 적어둔게 있다면 알림창 띄우고 뒤로가기 진행하기
          window.history.back();
        });
      };

      // ckeditor 담긴 값 보기 onclick event
      const showData = () => {
        let data = editor.getData();
        console.log(data);
      };

      backBnt();          // 뒤로가기 버튼 클릭 이벤트
      cateogryChange();   // 대분류 카테고리에 맞게 중분류 카테고리가 노출되는 함수

</script>

