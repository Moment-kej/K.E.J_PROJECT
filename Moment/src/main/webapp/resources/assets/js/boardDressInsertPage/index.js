import { firstContextPath, ajaxRequest } from "../common/common.js";
import { getData } from "../ckeditor/ckaditorSuperBuild.js"

const firstPath = firstContextPath;   // '/moment' 가져오기

// 대분류 카테고리에 맞게 중분류 카테고리가 노출되는 함수
const cateogryChange = () => {
    // mainCategory와 subCategory select 요소 가져오기
    let mainCategorySelect = document.getElementById('mainCategory');   // 메인 카테고리 select tag
    let subCategorySelect = document.getElementById('subCategory');     // 서브 카테고리 select tag
    
    // mainCategory 변경 시 이벤트 처리
    mainCategorySelect.addEventListener('change', function() {
        let mainCategoryValue = mainCategorySelect.value;                       // 메인 카테고리 value
        let subCategoryOptions = subCategorySelect.querySelectorAll('option');  // subCategory에 해당되는 option들 가져오기

        // 대분류 선택 시, 중분류 value를 0으로 바꾸기 
        if(mainCategoryValue === '0') {
            subCategorySelect.value = '0';
        }
        
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
cateogryChange();   // 대분류 카테고리에 맞게 중분류 카테고리가 노출되는 함수

// 목록으로 버튼
// 만약 기재한 내용이나 선택한 옵션이 있다면 알림창 띄우고 전체 게시판으로 이동
const goAllListBnt = () => {
    document.getElementById('goAllListBnt').addEventListener('click', ()=> {
        let id = document.getElementById('writer').value;
        let title = document.getElementById('title').value;
        let code = document.getElementById('mainCategory').value;
        let category = document.getElementById('subCategory').value;
        let ckeditor = getData();

        if(id.trim() !== '' || title.trim() !== '' || code.trim() !== '0' || category.trim() !== '0' || ckeditor.trim() !== '' || ckeditor !== '') {
            Swal.fire({
                title: "기재한 내용이 있습니다",
                text: "내용이 저장되지 않습니다. 목록으로 돌아가시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "예",
                cancelButtonText: "아니요"
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = firstPath + '/board/dress';
                }
            });
        } else {
            location.href = firstPath + '/board/dress';
        }
    });
};
goAllListBnt();      // 목록으로 버튼 클릭 이벤트
//--AJAX--------------------------------------------------------------------
// 선택한 폼 엘리먼트의 데이터를 URL-encoded된 문자열로 직렬화
// const dataForm = $('#boardForm').serialize();

// board Insert button click event
document.getElementById('boardInsertBtn').addEventListener('click', () => {
    let id = document.getElementById('writer').value;
    let title = document.getElementById('title').value;
    let code = document.getElementById('mainCategory').value;
    let category = document.getElementById('subCategory').value;
    let ckeditor = getData();

    if(id.trim() === '') {
        Swal.fire({
            icon: "warning",
            title: "작성자를 입력해주세요",
            didClose: function () {
                document.getElementById('writer').focus();
                return false; // 제출 취소
            }
        });
    } else if(title.trim() === '') {
        Swal.fire({
            icon: "warning",
            title: "제목을 입력해주세요",
            didClose: function () {
                document.getElementById('title').focus();
                return false; // 제출 취소
            }
        });
    } else if(code === '0') {
        Swal.fire({
            icon: "warning",
            title: "대분류를 선택해주세요",
            didClose: function () {
                document.getElementById('mainCategory').focus();
                return false; // 제출 취소
            }
        });
    } else if(category === '0') {
        Swal.fire({
            icon: "warning",
            title: "중분류를 선택해주세요",
            didClose: function () {
                document.getElementById('subCategory').focus();
                return false; // 제출 취소
            }
        });
    } else if(ckeditor.trim() === '') {
        Swal.fire({
            icon: "warning",
            title: "게시글 내용을 입력해주세요",
            didClose: function () {
                return false; // 제출 취소
            }
        });
    } else {
        const dataForm = JSON.stringify({
            id: id,
            title: title,
            code: code,
            category: category,
            content: ckeditor
        });
        
        const callback = (data) => {
            Swal.fire({
                icon: "success",
                title: "게시글 등록이 완료되었습니다",
                didClose: function () {
                    location.href = firstPath + '/board/dress';
                }
            });
        };
        // url, method, data, successCallback
        ajaxRequest(firstPath + '/board/dress/insert', 'POST', dataForm, callback); // AJAX POST 성공
    }
});
//--AJAX END--------------------------------------------------------------------