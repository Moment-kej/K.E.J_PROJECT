import { renderPosts } from "./viewRender.js";

const contextPath = document.getElementById('contextPath').value;
const criteriaCode = document.getElementById('criteriaCode').value;

// 글쓰기 버튼 클릭 이벤트
export const writingBntEvent = () => {
    const writingBnt = document.getElementById('boardInsertBnt');
    if(writingBnt) {
        writingBnt.addEventListener('click', () => {
            window.location.href = contextPath + '/board/10/1'; // 현재 창으로 링크 열기
        });
    } else {
        console.error('Element with id writingBnt not found');
    }
};

// 카테고리를 변경할 때 마다 URL 변경하기
const Change = (category) => {
    let searchType = document.getElementById('searchType').value;
    let searchName = document.getElementById('searchName').value;
    
    renderPosts('1', category, searchType, searchName);
    location.href = contextPath + "/board/" + criteriaCode + '?category=' + category;
};

// a tag 읽어와서 Change 함수를 통해 category에 맞게 board list 반영
export const menuCategoryEvent = () => {
    var aTag = document.querySelectorAll('.menuCategory a');
    aTag.forEach( function(link) {
        link.addEventListener('click', function() {
            // 클릭한 요소의 ID 값을 가져온다.
            var clickedId = link.id;
            Change(clickedId);
        });
    });
};

// 게시글 목록개수 변경할 때 마다 URL 변경하기
export const Change_valueNull = () => {
    let category = document.getElementById('criteriaCategory').value;
    let searchType = document.getElementById('searchType').value;
    let searchName = document.getElementById('searchName').value;
    let amount = document.getElementById('handleAmount').value;

    renderPosts('1', category, searchType, searchName);
    location.href = contextPath + "/board/" + criteriaCode + "?amount=" + amount;
};

