import { firstContextPath, boardNumber, ajaxRequest } from "../../common/common.js";
import { getData, setData } from "../../ckeditor/ckaditorSuperBuild.js"

const firstPath = firstContextPath;   // '/moment' 가져오기

// 만약 기재한 내용이나 선택한 옵션이 있다면 알림창 띄우고 게시글 상세조회로 이동
const goBoardDetail = (post) => {
    document.getElementById('goBoardDetail').addEventListener('click', () => {
        let id = document.getElementById('writer').value;
        let title = document.getElementById('title').value;
        let code = document.getElementById('mainCategory').value;
        let category = document.getElementById('subCategory').value;
        let ckeditor = getData();

        // 원래 있던 내용에서 수정이 되었으면 알림 띄우기
        if(id !== post.id || title !== post.title || code != parseInt(post.code) || category != parseInt(post.category) || ckeditor != post.content) {
            Swal.fire({
                title: "수정된 이력이 있습니다",
                text: "내용이 저장되지 않습니다. 게시글로 돌아가시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "예",
                cancelButtonText: "아니요"
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = firstPath + '/board/dress/all/' + boardNumber();
                }
            });
        } else {
            location.href = firstPath + '/board/dress/all/' + boardNumber();
        };
    });
}

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

            // 대분류 선택 시, 중분류 value를 0으로 바꾸기 
            if(mainCategoryValue === '0') {
                subCategorySelect.value = '0';
            }

            if(mainCategoryValue == optionValueSubStr) {            // 메인 값과 서브 앞 숫자 2개의 값이 같으면
                option.style.display = 'block';                     // 서브 옵션 태그를 활성화
            } else {
                option.style.display = 'none';                      // 같지 않으면 서브 옵션 태그를 비활성화
            }
        });
    });
};
cateogryChange();   // 대분류 카테고리에 맞게 중분류 카테고리가 노출되는 함수

// 게시글 번호 기준 게시글 정보 들고오기
const boardModContent = () => {
    const data = {boardNo : boardNumber()};
    const callback = (data) => {
        document.getElementById('writer').value = data.id;
        document.getElementById('title').value = data.title;
        document.getElementById('mainCategory').value = data.code;
        document.getElementById('subCategory').value = data.category;
        setData(data.content);

        goBoardDetail(data);    // 돌아가기 버튼
    }
    ajaxRequest(firstPath + '/board/dress/modContent' , 'GET' , data, callback);

}
boardModContent();

// board modify ajax
const boardModAjax = () => {
    document.getElementById('boardModlfyBtn').addEventListener('click', () => {
        let boardNo = String(boardNumber());
        let id = document.getElementById('writer').value
        let code = document.getElementById('mainCategory').value;
        let category = document.getElementById('subCategory').value; 
        let title = document.getElementById('title').value;
        let content = getData();

        if(id.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "작성자를 입력해주세요",
                didClose: function () {
                    document.getElementById('writer').focus();
                    return false;
                }
            });
        } else if(title.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "제목을 입력해주세요",
                didClose: function () {
                    document.getElementById('title').focus();
                    return false;
                }
            });
        } else if(code === '0') {
            Swal.fire({
                icon: "warning",
                title: "대분류를 선택해주세요",
                didClose: function () {
                    document.getElementById('mainCategory').focus();
                    return false;
                }
            });
        } else if(category === '0') {
            Swal.fire({
                icon: "warning",
                title: "중분류를 선택해주세요",
                didClose: function () {
                    document.getElementById('subCategory').focus();
                    return false;
                }
            });
        } else if(content.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "게시글 내용을 입력해주세요",
                didClose: function () {
                    return false;
                }
            });
        } else {
            const data = JSON.stringify({
                            boardNo : boardNo,
                            id: id,
                            code: code,
                            category: category,
                            title: title,
                            yn : 1,
                            content: content
                        });

            const callback = (data) => {
                Swal.fire({
                    icon: "success",
                    title: "게시글 수정이 완료되었습니다",
                    didClose: function () {
                        location.href = firstPath + '/board/dress/all/' + boardNo;
                    }
                });
            };
            // url, method, data, successCallback
            ajaxRequest(firstPath + '/board/dress/mod', 'POST', data, callback);
        }
    })
}
boardModAjax();