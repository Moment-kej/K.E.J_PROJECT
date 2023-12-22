const contextPath = document.getElementById('contextPath').value;
const contentContainer = document.getElementById('boardList');

// 글쓰기 버튼 클릭 이벤트
export const writingBntEvent = () => {
    const writingBnt = document.getElementById('writeBnt');
    if(writingBnt) {
        writingBnt.addEventListener('click', () => {
            window.location.href = contextPath + '/board/dress/write'; // 현재 창으로 링크 열기
        });
    } else {
        console.error('Element with id writingBnt not found');
    }
};

// 카테고리를 변경할 때 마다 URL 변경하기
const Change = (category) => {
    let searchType = document.getElementById('searchType').value;
    let searchName = document.getElementById('searchName').value;
    let listType = document.getElementById('criteriaListType').value;

    location.href = contextPath + '/board/dress?page=1&category=' + category
    + '&listType=' + listType +'&searchType=' + encodeURIComponent(searchType) + '&searchName=' + encodeURIComponent(searchName);
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
    let listType = document.getElementById('criteriaListType').value;

    location.href = contextPath + "/board/dress?amount=" + amount + '&category=' + category
                + '&listType=' + listType +'&searchType=' + encodeURIComponent(searchType) + '&searchName=' + encodeURIComponent(searchName);
};


// 검색버튼
export const search = () => {
    document.getElementById('searchBnt').addEventListener('click', () => {
        contentContainer.innerHTML = '';    // 게시글 div 초기화
        // let page = document.getElementById('criteriaPage').value;
        let contextPath = document.getElementById('contextPath').value;
        let amount = document.getElementById('criteriaAmount').value;
        // let category = document.getElementById('boardCategory').value;
        // let code = document.getElementById('criteriaCode').value;
        let searchType = document.getElementById('searchType').value;
        let searchName = document.getElementById('searchName').value;
        let listType = document.getElementById('criteriaListType').value;

        // total 값이 제대로 나오지 않는다.
        location.href = contextPath + '/board/dress?page=1&amount=' + amount + '&category=0&listType=' + listType + '&searchType=' + encodeURIComponent(searchType) + '&searchName=' + encodeURIComponent(searchName);
    });
};