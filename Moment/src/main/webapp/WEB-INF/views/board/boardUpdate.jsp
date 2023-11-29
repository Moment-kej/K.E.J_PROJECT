<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
		    <div class="card-body">
                  <h4 class="card-title">게시판 등록 페이지</h4>
                  <p class="card-description">
                    작성자
                  </p>
                  <form class="forms-sample">
                    <div class="form-group">
                      <label for="exampleInputName1">제목</label>
                      <input type="text" class="form-control" id="exampleInputName1" placeholder="제목을 입력해주세요!">
                    </div>
                    <div class="d-flex">
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
                    <div class="form-group">
                      <textarea class="form-control"  id=content name=content rows="4" placeholder="내용을 입력해주세요!"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                    <button class="btn btn-light">Cancel</button>
                  </form>
                </div>
        </div>
    </div>
</div>
<script>
      ClassicEditor.create( document.querySelector( '#content' ) );
</script>

