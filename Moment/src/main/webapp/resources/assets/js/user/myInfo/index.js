import { firstContextPath, ajaxRequest, formatTime_hhmm, formatTime_hhmmss } from "../../common/common.js";

const firstPath = firstContextPath;

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
const init = () => {
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
init();