import { firstContextPath, ajaxRequest, createAndAppendElement, formatTime_hhmm, formatTime_hhmmss } from "../../common/common.js";

const firstPath = firstContextPath;

const dropOutRadioAjax = () => {    // * 탈퇴사유 가져오기
    const callback = (data) => {
        const dropOutReasonContainer = document.querySelector(".dropOutReason");
        data.DR.map(item => {
            const label = createAndAppendElement(dropOutReasonContainer, "label", {for : "DR" + item.commonDetailCd, class : "radio_box"}, item.commonDetailName);
            createAndAppendElement(label, "input", {type: "radio", name: "DR", id: "DR" + item.commonDetailCd, value: item.commonDetailCd});
            createAndAppendElement(label, "span", {class: "on"});
        });
        document.getElementById("DR1100").setAttribute("checked", "checked");
        createAndAppendElement(dropOutReasonContainer, "input", {type: "text", id: "type7Detail", class: "hidden", placeholder: "50자 이내로 작성해주세요"});
    };
    ajaxRequest(firstPath+"/getCode", "GET", {code : "DR"}, callback);
};
dropOutRadioAjax();
const dropOut_init = () => {
    const radio_event = () => { 
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        const additionalInput = document.getElementById("type7Detail");
        radioButtons.forEach(function(radio) {
            radio.addEventListener('click', () => {
                // radio checked all remove
                radioButtons.forEach(remove => {
                    remove.removeAttribute("checked");
                });
                radio.setAttribute("checked", "checked");   // * radio 클릭 시 checked 속성 부여
                if(radio.id === "DR1700") {                 // * 기타를 클릭했을 시 input 활성화
                    additionalInput.classList.remove("hidden");
                } else {
                    additionalInput.classList.add("hidden");
                }
            });
        });
    };
    const userDropDetailInput_event = () => {   // * 탈퇴사유 기타일 경우 input의 값을 50자로 맞추는 함수
        const userDropOutDetailInput = document.getElementById("type7Detail");
        if(userDropOutDetailInput) {
            userDropOutDetailInput.addEventListener("input", () => {
                if(userDropOutDetailInput.value.length > 50) {
                    userDropOutDetailInput.value = userDropOutDetailInput.value.slice(0,50);
                }
            });
        }
    };
    const userDropBtn_event = () => {          // * 탈퇴하기 버튼 클릭 이벤트
        const userDropOutBtn = document.getElementById("userDropOutBtn");
        userDropOutBtn.addEventListener('click', () => {
            const userDropOutDetailInput = document.getElementById("type7Detail");
            const checked = document.getElementById("dropOutAgreeOrNot").checked;
            const reason = document.querySelector("input[type='radio']:checked");
            let data = {};
            if(checked === false) {
                Swal.fire({
                    icon: "warning",
                    title: "회원 탈퇴 동의가 필요합니다.",
                    didClose: function () {
                        return false; // 제출 취소
                    }
                });
            } else {
                if(userDropOutDetailInput.getAttribute("class") != 'hidden') {
                    console.log("input이 있는 상태");
                    if(userDropOutDetailInput.value == "" || userDropOutDetailInput.trim() == "") {
                        Swal.fire({
                            icon: "warning",
                            title: "탈퇴 사유를 적어주세요",
                            didClose: function () {
                                userDropOutDetailInput.focus();
                                return false; // 제출 취소
                            }
                        });
                    } else {
                        data = {
                            id : "test",    // ! 아이디는 스프링 시큐리티를 통해 값을 넣어주어야 한다.
                            reason : reason.value,
                            reasonDetail : userDropOutDetailInput.value
                        };
                    }
                } else {
                    console.log("input이 없는 상태");
                    data = {
                        id : "test",       // ! 아이디는 스프링 시큐리티를 통해 값을 넣어주어야 한다.
                        reason : reason.value
                    };
                };
                const callback = (success) => {
                    console.log(success);
                };
                ajaxRequest(firstPath + "/user/dropOut", "POST", JSON.stringify(data), callback);
            };
        });
    };

    document.getElementById('userDropOut-tab').addEventListener('shown.bs.tab', function () {
        // console.log('회원탈퇴 탭이 활성화되었습니다.');
        radio_event();
        userDropDetailInput_event();
        userDropBtn_event();
    });
};
//----------------------------------------------------------------------------------
const emailAjax = () => {       // * 이메일 가져오기
    const callback = (data) => {
        const emailSelectElement = document.getElementById("email");
        data.EM.map(item => {
            createAndAppendElement(emailSelectElement, "option", {value: item.commonDetailCd}, item.commonDetailName);
        })
    }
    ajaxRequest(firstPath+"/getCode", "GET", {code : "EM"}, callback);
}
emailAjax();
const handleFileSelect = () => {    // 프로필 사진 수정 버튼 이벤트
    const fileInput = document.getElementById('imageInput');
    fileInput.addEventListener('change', () => {
        if(fileInput.isDefaultNamespace.length > 0) {   // 선택한 파일이 있는지 확인
            const selectedFile = fileInput.files[0];      // 선택한 파일
            const reader = new FileReader();              // FileReader 객체 생성
            // 파일을 읽었을 때의 이벤트 처리
            reader.onload = function (e) {
                // 읽은 파일의 내용을 이미지로 설정
                document.getElementById('profileImage').src = e.target.result;
            };
        
            // 파일 읽기
            reader.readAsDataURL(selectedFile);
        } else {
            Swal.fire({
                icon: "warning",
                title: "프로필 사진을 선택해주세요."
            });
        };
    });
};
const formatPhoneNumber = () => {
    const phoneNumberInput = document.getElementById('info-phone');
    phoneNumberInput.addEventListener('input', (e) => {
        let phoneNumber = e.target.value.replace(/\D/g, '');
        // 전화번호를 ###-###-#### 형식으로 포맷
        if(phoneNumber.length <= 10) {
            phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            e.target.value = phoneNumber;
        } else {
            phoneNumber = phoneNumber.slice(0, 10);
            phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            e.target.value = phoneNumber;
        };
    })
};
const kakaoAddressAPI = () => {
    new daum.Postcode({
        oncomplete: function(data) {
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let addr = '';      // 주소 변수
            let extraAddr = ''; // 참고항목 변수
            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }
            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                // document.getElementById("sample6_extraAddress").value = extraAddr;
            } else {
                // document.getElementById("sample6_extraAddress").value = '';
            }
            document.getElementById('info-post').value = data.zonecode;     // 우편번호
            document.getElementById("info-addr").value = addr + extraAddr; // 주소 정보
            // 커서를 상세주소 필드로 이동
            document.getElementById("info-addr-detail").focus();
        }
    }).open();
}
const userInfo_init = () => {
    document.getElementById('img-change-btn').addEventListener('click', () => {
        document.getElementById('imageInput').click();  // 파일 선택 input 요소 트리거
        handleFileSelect();
    });
    document.getElementById('img-delete-btn').addEventListener('click', () => {
        document.getElementById('profileImage').setAttribute('src', firstPath + '/assets/images/noProfile.jpg');
    })
    document.getElementById('cancelBtn').addEventListener('click', () => {
        location.href = firstPath + '/';
    });
    document.getElementById('postSearch').addEventListener('click', () => {
        kakaoAddressAPI();
    });
};
formatPhoneNumber();
userInfo_init();
dropOut_init();