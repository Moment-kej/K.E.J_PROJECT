import { firstContextPath } from "../common/common.js";
const contextPath = firstContextPath;

export const pagenation = () => {
    if(document.getElementById('pageVORealEnd').value != 0) {
        // 페이지네이션 <<, <, >, >>
        const firstPage   = document.getElementById('firstPage');
        const beforePage  = document.getElementById('beforePage');
        const afterPage   = document.getElementById('afterPage');
        const lastPage    = document.getElementById('lastPage');
        // 전체보기 a tag 읽어옴
        const allListView = document.getElementById('0');
        // 페이징 값
        const pagerealEnd_v = parseInt(document.getElementById('pageVORealEnd').value);
        const pageNumber_v  = parseInt(document.getElementById('criteriaPage').value);
        // 검색 타입과 값
        const searchType = document.getElementById('searchType').value;
        const searchName = document.getElementById('searchName').value;
        // URL에 집어 넣을 값
        const category   = document.getElementById('criteriaCategory').value;
        const listType   = document.getElementById('criteriaListType').value;
        const amount     = document.getElementById('handleAmount').value;

        // <, > 조정
        pageNumber_v === 1 ? beforePage.classList.add('display') : "'<' bolck";
        pagerealEnd_v === pageNumber_v ? afterPage.classList.add('display') : "'>' bolck";
        

        // <<, <, >, >> a tag에 href 속성 추가
        allListView.addEventListener('click', () => {
            location.href = contextPath + '/board/dress?page=1&amount=' + amount + '&category=0' 
                                            + '&listType=' + listType + '&searchType=' + encodeURIComponent(searchType)
                                            + '&searchName=' + encodeURIComponent(searchName);
        });

        firstPage.addEventListener('click', () => {
            location.href = contextPath + '/board/dress?page=1&amount=' + amount + '&category=' + encodeURIComponent(category)
                                                + '&listType=' + listType + '&searchType=' + encodeURIComponent(searchType)
                                                + '&searchName=' + encodeURIComponent(searchName);
        });

        lastPage.addEventListener('click', () => {
            location.href = contextPath + '/board/dress?page=' + pagerealEnd_v 
                                                + '&amount=' + amount + '&category=' + encodeURIComponent(category)
                                                + '&listType=' + listType + '&searchType=' + encodeURIComponent(searchType)
                                                + '&searchName=' + encodeURIComponent(searchName);
        });
        beforePage.addEventListener('click', () => {
            location.href =  contextPath + '/board/dress?page=' + (pageNumber_v - 1)
                                            + '&amount=' + amount + '&category=' + encodeURIComponent(category)
                                            + '&listType=' + listType + '&searchType=' + encodeURIComponent(searchType)
                                            + '&searchName=' + encodeURIComponent(searchName);
        });

        afterPage.addEventListener('click', () => {
            location.href =  contextPath + '/board/dress?page=' + (pageNumber_v + 1)
                                            + '&amount=' + amount + '&category=' + encodeURIComponent(category)
                                            + '&listType=' + listType + '&searchType=' + encodeURIComponent(searchType)
                                            + '&searchName=' + encodeURIComponent(searchName);
        });
    } else {
        // 게시글이 없으면 페이지네이션 아이콘 전체 없애기
        firstPage.classList.add('display');
        beforePage.classList.add('display');
        afterPage.classList.add('display')
        lastPage.classList.add('display');
    };
};

export const pagenationNumber = () => {
    const pageNumber = document.querySelectorAll('.pageNumber');
    //페이지네이션 1,2,3,4... number
    pageNumber.forEach((anchor) => {
        // anchor -> 빈값
        const category    = document.getElementById('criteriaCategory').value;
        const searchType = document.getElementById('searchType').value;
        const searchName = document.getElementById('searchName').value;
        const amount = document.getElementById('handleAmount').value;
        const listType = document.getElementById('criteriaListType').value;
        
        // 클릭 이벤트 추가
        anchor.addEventListener('click', () => {
            const CURRENT_PAGE_NUMBER = anchor.getAttribute('data-page');
            // URL 변경 및 CSS 설정
            location.href = contextPath + '/board/dress?page=' + CURRENT_PAGE_NUMBER +  '&amount=' + amount + '&category=' + encodeURIComponent(category)
                            + '&listType=' + listType + '&searchType=' + encodeURIComponent(searchType) + '&searchName=' + encodeURIComponent(searchName);
        });
    });
}