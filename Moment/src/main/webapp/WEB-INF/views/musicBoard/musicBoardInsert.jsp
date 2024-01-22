<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
  <div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div class="card-body">
                <div class="contentCenterSetting">
                  <div class="contentWidthSetting">
                    <h4 class="card-title">게시판 등록 페이지</h4>
                    <p class="card-description">작성자</p>
                    <!-- 게시판 등록 form -->
                    <form class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputName1">제목</label>
                        <input type="text" class="form-control" id="exampleInputName1" placeholder="제목을 입력해주세요!">
                      </div>
                      <!-- 카테고리 분류 -->
                      <div class="listCategorySelect">
                        <div class="form-group">
                          <label for="exampleSelectGender">대분류</label>
                          <select class="form-control" id="exampleSelectGender">
                            <option>대분류</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="exampleSelectGender">중분류</label>
                          <select class="form-control" id="exampleSelectGender">
                            <option>중분류</option>
                          </select>
                        </div>
                      </div>
                      <!-- 게시글 작성 장소 -->
                      <div id="content"></div>
                      <!-- 게시글 등록 또는 뒤로가기 (임시저장 없음 알림창 띄우기) -->
                      <button type="submit" class="mr-2" id="submintBtn" >등록</button>
                      <button id="backBtn" >뒤로가기</button>
                    </form>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
	/* https://congsong.tistory.com/67 */
	const editor = new toastui.Editor({
	    el: document.querySelector('#content'), // 에디터를 적용할 요소 (컨테이너)
	    height: '500px',                        // 에디터 영역의 높이 값 (OOOpx || auto)
	    initialEditType: 'wysiwyg',             // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
	    initialValue: '내용을 입력해 주세요.',       // 내용의 초기 값으로, 반드시 마크다운 문자열 형태여야 함
	    previewStyle: 'vertical',               // 마크다운 프리뷰 스타일 (tab || vertical)
      hideModeSwitch:true
	});
</script>

