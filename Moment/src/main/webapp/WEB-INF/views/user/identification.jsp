<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="main-panel">
    <div class="content-wrapper backgroundColorChenge">
        <div class="iden-innerContainer">
            <div class="position-relative">
                <div class="position-absolute start-50 translate-middle iden-box">
                    <h6 class="iden-title">나의 정보 수정</h6>
                    <div class="d-flex align-content-center p-3 iden-input-containar">
                        <div class="iden-pw">
                            <p>고객님의 안전한 정보보호를 위하여 비밀번호를 다시 한 번 확인합니다. <br/>
                            비밀번호가 타인에게 노출되지 않도록 주의하여 주세요.</p>
                            <input type="password" placeholder="비밀번호" id="iden-pw-input">
                        </div>
                    </div>
                    <div class="mt-3 d-flex align-content-center">
                        <div class="iden-btn">
                            <button type="button" class="checkBtn mr-2">확인</button>
                            <button type="button" class="cancelBtn">취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="module" src="${pageContext.request.contextPath}/assets/js/user/identification/index.js"></script>