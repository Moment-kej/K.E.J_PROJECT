<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <style>
      /* category Style */
      .contentCenterSetting {
        width: 1000px;
        margin: 0 auto;
      }
      .contentWidthSetting {
        width: 950px;
      }
      .listCategorySelect {
        display: flex;
      }
      .listCategorySelect > .form-group > select {
        width: 465px !important;
      }
      .listCategorySelect > .form-group {
        margin-right: 20px;
      }
      /* CKEdiotor Style */
      .ck-editor__editable { height: 400px; }
      .ck-content { font-size: 12px; }
    </style>
  <div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div cla ss="card-body">
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
                      <div class="form-group">
                        <textarea class="form-control"  id=content name=content rows="4" placeholder="내용을 입력해주세요!"></textarea>
                      </div>
                      <!-- 게시글 등록 또는 뒤로가기 -->
                      <button type="submit" class="btn btn-primary mr-2">등록</button>
                      <button class="btn btn-light">뒤로가기</button>

                    </form>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
      ClassicEditor.create( document.querySelector('#content'), {
        language: "ko"
      });
</script>

