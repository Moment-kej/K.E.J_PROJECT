<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="main-panel">
    <div class="content-wrapper backgroundColorChenge">
        <div class="position-relative">
            <div class="position-absolute start-50 translate-middle user-info-box">
                <div class="d-flex align-content-center p-3 user-area pb-4">
                    <div class="user-info">
                        <div class="img-area">
                            <img src="${pageContext.request.contextPath}/assets/images/noProfile.jpg" id="profileImage" alt="프로필 이미지">
                            <input type="file" id="imageInput" accept="image/*" class="hidden">
                            <div class="img-btn-area">
                                <button type="button" class="img-chg-btn mr-2" id="img-change-btn">변경하기</button>
                                <button type="button" class="img-del-btn" id="img-delete-btn">삭제하기</button>
                            </div>
                        </div>
                        <div class="mt-3 form-area">
                            <div class="info-guide-area mb-3">
                                <span id="info-guide">* 표시는 필수 입력입니다.</span>
                            </div>
                            <div style="clear:both"></div>
                            <div>
                                <label>이름</label>
                                <input type="text" id="info-name" disabled value="USER">
                            </div>
                            <div>
                                <label>아이디</label>
                                <input type="text" id="info-id" disabled value="USER1234">
                            </div>
                            <div>
                                <label>비밀번호 재설정</label>
                                <input type="password" placeholder="비밀번호 재설정" id="info-pw">
                            </div>
                            <div>
                                <label>비밀번호 확인</label>
                                <input type="password" placeholder="비밀번호 재설정 확인" id="info-pw-check">
                            </div>
                            <div class="info-post-area">
                                <label>우편번호</label>
                                <input type="text" placeholder="우편번호" id="info-post">
                                <button type="button" id="postSearch">검색</button>
                            </div>
                            <div>
                                <label>주소</label>
                                <input type="text" placeholder="주소" id="info-addr">
                            </div>
                            <div>
                                <label>상세주소</label>
                                <input type="text" placeholder="상세주소" id="info-addr-detail">
                            </div>
                            <div>
                                <label>전화번호</label>
                                <input type="tel" placeholder="전화번호" id="info-phone">
                            </div>
                            <div class="info-email-area">
                                <label>이메일</label>
                                <input type="text" placeholder="이메일" id="info-email">
                                <span>@</span>
                                <select>
                                    <option>kakao</option>
                                    <option>naver</option>
                                    <option>nate</option>
                                    <option>...</option>
                                    <option>...</option>
                                    <option>...</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-3 d-flex align-content-center btn-containar">
                    <div class="btn-area">
                        <button type="button" class="cancelBtn" id="cancelBtn">메인으로</button>
                        <button type="button" class="checkBtn" id="modBtn">수정완료</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="module" src="${pageContext.request.contextPath}/assets/js/user/myInfo/index.js"></script>