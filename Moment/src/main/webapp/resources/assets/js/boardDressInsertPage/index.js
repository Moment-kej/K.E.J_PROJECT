import { firstContextPath, ajaxRequest } from "../common/common.js";
import { getData } from "../ckeditor/ckaditorSuperBuild.js"

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
//--AJAX--------------------------------------------------------------------
// 선택한 폼 엘리먼트의 데이터를 URL-encoded된 문자열로 직렬화
// const dataForm = $('#boardForm').serialize();

function getSelectedValue(mySelect) {
    // select 요소를 가져옴
    var selectElement = document.getElementById(mySelect);

    // 선택된 옵션의 값(value)을 가져옴
    var selectedValue = selectElement.value;

    // 선택된 옵션의 텍스트 내용을 가져옴
    var selectedText = selectElement.options[selectElement.selectedIndex].text;

    // 결과를 콘솔에 출력
    console.log("Selected Value:", selectedValue);
    console.log("Selected Text:", selectedText);
};

let code = getSelectedValue('mainCategory');
let category = getSelectedValue('subCategory');

const dataForm = {
    id: document.getElementById('writer').value,
    title: document.getElementById('title').value,
    code: code,
    category: category,
    content: getData()
};

const callback = (data) => {
    console.log(data);
};

// board Insert button click event
document.getElementById('boardInsertBtn').addEventListener('click', () => {
    // url, method, data, successCallback
    // ajaxRequest(firstPath + '/board/10/1', 'POST', dataForm, callback); // 아직 안돌려봄
    console.log(dataForm);
});
//--AJAX END--------------------------------------------------------------------
