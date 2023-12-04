const contextPath = document.getElementById('contextPath').value;

// 글쓰기 버튼 클릭 이벤트
export const writingBntEvent = () => {
    const writingBnt = document.getElementById('writingBnt');
    if(writingBnt) {
        writingBnt.addEventListener('click', () => {
            let writingLink = contextPath + '/board/3/1';
            window.location.href = writingLink;     // 현재 창으로 링크 열기
        });
    } else {
        console.error('Element with id writingBnt not found');
    }
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

// 카테고리를 변경할 때 마다 URL 변경하기
export const Change = (category) => {
    let contextPath = document.getElementById('contextPath').value;
    let criteriaCode = document.getElementById('criteriaCode').value;
    let listType = document.getElementById('criteriaListType').value;
    let nowPaging_el   = document.querySelector('#handleAmount option:checked');
    let nowPaging = nowPaging_el.value;
    
    location.href = contextPath + "/board/" + criteriaCode + "?page=1&amount="+nowPaging+"&category=" + category + "&listType=" + listType;
};

// 게시글 목록개수 변경할 때 마다 URL 변경하기
export const Change_valueNull = () => {
    let contextPath = document.getElementById('contextPath').value;
    let criteriaCode = document.getElementById('criteriaCode').value;
    let listType = document.getElementById('criteriaListType').value;
    let category = document.getElementById('criteriaCategory').value;
    let nowPaging_el   = document.querySelector('#handleAmount option:checked');
    let nowPaging = nowPaging_el.value;

    location.href = contextPath + "/board/" + criteriaCode + "?page=1&amount="+nowPaging+"&category=" + category + "&listType=" + listType;
};

