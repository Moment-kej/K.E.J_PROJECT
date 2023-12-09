import { firstContextPath } from "../common/common.js";

const firstPath = firstContextPath();   // '/moment' 가져오기

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
const goAllListBnt = () => {
    document.getElementById('goAllListBnt').addEventListener('click', ()=> {
        console.log("목록으로 클릭!!");
        // 만약 카테고리나 제목, 글 내용을 적어둔게 있다면 알림창 띄우고 뒤로가기 진행하기
        location.href = firstPath + '/board/10';
    });
};

goAllListBnt();      // 목록으로 버튼 클릭 이벤트
cateogryChange();   // 대분류 카테고리에 맞게 중분류 카테고리가 노출되는 함수