<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="main-panel">
    <div class="content-wrapper backgroundColorChenge">
        <div class="center">
            <!-- nav -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="userInfo-tab" data-bs-toggle="tab" data-bs-target="#userInfo" type="button" role="tab" aria-controls="userInfo" aria-selected="true">회원정보</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="userDropOut-tab" data-bs-toggle="tab" data-bs-target="#userDropOut" type="button" role="tab" aria-controls="userDropOut" aria-selected="false">회원탈퇴</button>
                </li>
            </ul>
            <div id="myTabContent">
                <!-- 정보수정 탭 -->
                <div class="tab-pane fade show active" id="userInfo" role="tabpanel" aria-labelledby="userInfo-tab">
                    <div class="user-area">
                        <div class="user-info">
                            <div class="img-area mt-4">
                                <img src="${pageContext.request.contextPath}/assets/images/noProfile.jpg" id="profileImage" alt="프로필 이미지">
                                <input type="file" id="imageInput" accept="image/*" class="hidden">
                                <div class="img-btn-area">
                                    <button type="button" class="img-chg-btn mr-2" id="img-change-btn">변경하기</button>
                                    <button type="button" class="img-del-btn" id="img-delete-btn">삭제하기</button>
                                </div>
                            </div>
                            <div class="form-area center mt-3 mb-3">
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
                            <div class="pt-4 d-flex align-content-center btn-containar">
                                <div class="btn-area">
                                    <button type="button" class="cancelBtn" id="cancelBtn">메인으로</button>
                                    <button type="button" class="checkBtn" id="modBtn">수정완료</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 회원탈퇴 탭 -->
                <div class="tab-pane fade" id="userDropOut" role="tabpanel" aria-labelledby="userDropOut-tab">
                    <div class="userOut-area">
                        <div class="user-info">
                            <!-- 탈퇴약관 -->
                            <div class="center userDropOutContainer pt-3">
                                <div class="termsContainer">
                                    <h5>탈퇴약관</h5>
                                    <div class="terms mb-3">
                                        <h6>제7조 (회원탈퇴 및 자격상실 등)</h6>
                                        <ul class="termsDetail">
                                            <li>회원은 언제든지 탈퇴신청을 할 수 있으며, 이 경우 moment는 즉시 회원탈퇴를 처리합니다.</li>
                                            <li>회원이 다음 각 호의 사유에 해당하는 경우 moment은 서비스 이용을 제한 또는 해지시킬 수 있습니다.</li>
                                            <ul class="termsDeepDetail">
                                                <li>회원 사망 시</li>
                                                <li>가입 신청 시 허위 내용을 기재하거나 2개 이상의 I.D.로 이중 등록한 경우</li>
                                                <li>온라인 플랫폼에서 구매한 항공권 등의 대금지급채무 및 기타 사이트 이용과 관련하여 회원이 부담하는 채무를 불이행하는 경우</li>
                                                <li>타인의 온라인 플랫폼 이용을 방해하거나 타인의 개인정보를 도용하는 등 전자거래질서를 침해·위협하는 경우</li>
                                                <li>온라인 플랫폼을 이용하여 이 약관이 금지하는 행위 또는 법령, 공서양속 등에 반하는 행위를 하는 경우</li>
                                                <li>회원가입 후, 연속하여 1년 동안 온라인 플랫폼을 이용하기 위해 로그인한 기록이 없는 경우</li>
                                            </ul>
                                            <li>moment는 서비스 이용을 제한·정지하고자 할 때에는 미리 그 사유, 일시, 기간을 전자우편, 전화, 서면 등으로 이용자에게 통지합니다. 다만 긴급을 요할 경우에는 조치 후에 통지할 수 있습니다.</li>
                                            <li>moment는 서비스이용을 제한·정지시킨 후 그 제재사유가 된 행위가 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 대한항공은 회원자격을 상실시킬 수 있습니다.</li>
                                            <li>moment는 회원자격을 상실시키는 경우에는 회원등록을 말소하며, 이 경우 말소 전에 회원에게 이를 통지합니다. 단, 상기 2항의 6에 의하여 이용자의 회원자격을 상실시킬 경우에는 자격 상실 30일 전까지 동 내용에 대한 안내문을 제 8조에 의거 통지하며, 자격이 상실된 회원의 개인정보는 인터넷 개인정보처리방침 사항에 따라 파기합니다.</li>
                                            <li>서비스이용의 제한, 정지, 회원자격의 상실로 인한 손해에 대해서 moment 책임을 지지 않습니다.</li>
                                        </ul>
                                    </div>
                                    <label for="dropOutAgreeOrNot">
                                        <input type="checkbox" id="dropOutAgreeOrNot">
                                        회원 탈퇴 동의
                                    </label>
                                </div>
                                <!-- 탈퇴이유 -->
                                <div class="mt-5">
                                    <h5>탈퇴사유</h5>
                                    <div class="mt-3 dropContainer">
                                        <div class="dropOutGuide mb-5">
                                            <p>
                                                저희 사이트의 부족했던 점과 아쉬웠던 점을 적어주십시오. 더욱 좋은 모습으로 발전하도록 최선을 다하겠습니다.<br>
                                                앞으로 더 나은 모습으로 회원님을 다시 만날 수 있도록 노력하겠습니다. 그동안 이용해주신 것을 진심으로 감사드립니다.
                                            </p>
                                            <p>탈퇴 사유를 적어주시면 운영에 적극 반영하겠습니다.</p>
                                        </div>
                                        <div class="dropOutReason"></div>
                                    </div>
                                </div>
                                <!-- 탈퇴버튼 -->
                                <div class="dropBtnContainer mt-3">
                                    <button type="button" class="checkBtn" id="userDropOutBtn">탈퇴하기</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="module" src="${pageContext.request.contextPath}/assets/js/user/myInfo/index.js"></script>