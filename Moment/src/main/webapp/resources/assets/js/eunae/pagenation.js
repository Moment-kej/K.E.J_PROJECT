import { renderPosts } from "./viewRender.js";

const contextPath = document.getElementById('contextPath').value;
const code = document.getElementById('criteriaCode').value;

export const pagenation = (listType) => {
    // 페이지네이션 <<, <, >, >> , 전체보기
    if(document.getElementById('pageVORealEnd').value != 0) {
        // 페이지네이션 <<, <, >, >> a tag 읽어옴
        let pageNumberOne  = document.getElementById('pageNumberOne');
        let pageStart      = document.getElementById('pageStart');
        let pageNext       = document.getElementById('pageNext');
        let pageRealEnd    = document.getElementById('pageRealEnd');
        // none을 block으로 변경
        pageNumberOne.style.display = 'block';
        pageRealEnd.style.display = 'block';
        // 전체보기 a tag 읽어옴
        let allListView    = document.getElementById('0');
        // 카테고리 값과 페이징 값 읽어옴
        let category       = document.getElementById('criteriaCategory').value;
        let pageStart_v    = document.getElementById('pageVOStart').value;
        let pageEnd_v      = document.getElementById('pageVOEnd').value;
        let pagerealEnd_v  = document.getElementById('pageVORealEnd').value;
        // 검색 타입과 값
        let searchType = document.getElementById('searchType').value;
        let searchName = document.getElementById('searchName').value;
        // <<, <, >, >> a tag에 href 속성 추가

        allListView.addEventListener('click', () => {
            console.log('click');
            renderPosts('1', '0', searchType, searchName);
            // allListView.setAttribute('href', contextPath + '/board/' + code + '?category=0'
            //                         + '&searchType=' + searchType + '&searchName=' + searchName);
        });

        pageNumberOne.addEventListener('click', () => {
            renderPosts('1', category, searchType, searchName);
            // pageNumberOne.setAttribute('href', contextPath + '/board/' + code + '?page=1'
            //                             + '&searchType=' + searchType + '&searchName=' + searchName);
        });

        pageRealEnd.addEventListener('click', () => {
            renderPosts(pagerealEnd_v, category, searchType, searchName);
            // pageRealEnd.setAttribute('href', contextPath + '/board/' + code + '?page=' + pagerealEnd_v
            //                         + '&searchType=' + searchType + '&searchName=' + searchName);
        });
        
        if(pageStart_v != false && pageEnd_v != false ) {
            pageStart.addEventListener('click', () => {
                renderPosts(pageStart_v, category, searchType, searchName);
                // pageStart.setAttribute('href', contextPath + '/board/' + code + '?page=' + pageStart_v
                //                     + '&searchType=' + searchType + '&searchName=' + searchName);
            });

            pageNext.addEventListener('click', () => {
                renderPosts(pageEnd_v, category, searchType, searchName);
                // pageNext.setAttribute('href', contextPath + '/board/' + code + '?page=' + pageEnd_v
                //                     + '&searchType=' + searchType + '&searchName=' + searchName);
            });
        }
    } else {
        // 맨 끝 페이지가 0이면 <<, >> display none
        pageNumberOne.style.display = 'none';
        pageRealEnd.style.display = 'none';
    };
};

export const pagenationNumber = (listType) => {
    //페이지네이션 1,2,3,4... number
    document.querySelectorAll('.pageNumber').forEach((anchor, index) => {
        // anchor -> 빈값
        let category    = document.getElementById('criteriaCategory').value;
        let pageNum     = index + 1 ;
        let searchType = document.getElementById('searchType').value;
        let searchName = document.getElementById('searchName').value;
        let amount = document.getElementById('handleAmount').value;
        
        // 각 숫자에 id 부여
        anchor.setAttribute('id', 'pageNumber_' + pageNum);
        
        // 클릭 이벤트 추가
        anchor.addEventListener('click', () => {
            // 클릭된 페이지 번호 가져오기
            let clickedPage = pageNum;
            // renderPosts(clickedPage, category, searchType, searchName);
            // URL 변경 및 CSS 설정
            let pageNumHref = contextPath + '/board/' + code + '?page=' + pageNum +  '&amount=' + amount +'&category=' + category
                            + '&searchType=' + encodeURIComponent(searchType) + '&searchName=' + encodeURIComponent(searchName);
            anchor.setAttribute('href', pageNumHref);
        });

    });
}