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
        // 게시글 목록 개수 읽어옴
        let nowPaging      = document.querySelector('#handleAmount option:checked');
        let selectedValue  = nowPaging.value;
        // <<, <, >, >> a tag에 href 속성 추가
        allListView.setAttribute('href',
                                    contextPath + '/board/' + code + '?page=1&amount=' + selectedValue +
                                    '&category=0' +
                                    '&listType=' + listType);
        pageNumberOne.setAttribute('href',
                                    contextPath + '/board/' + code + '?page=1&amount=' + selectedValue +
                                    '&category=' + 0 +
                                    '&listType=' + listType);
        pageRealEnd.setAttribute('href',
                                    contextPath + '/board/' + code + '?page=' + pagerealEnd_v +
                                    '&amount=' + selectedValue +
                                    '&category=' + category +
                                    '&listType=' + listType);
        if(pageStart_v != false && pageEnd_v != false ) {
            pageStart.setAttribute('href', 
                                        contextPath + '/board/' + code + '?page=' + pageStart_v +
                                            '&amount=' + selectedValue +
                                            '&category=' + category +
                                            '&listType=' + listType);
            pageNext.setAttribute('href', 
                                        contextPath + '/board/' + code + '?page=' + pageEnd_v +
                                            '&amount=' + selectedValue +
                                            '&category=' + category +
                                            '&listType=' + listType);
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
        let pagenum     = document.getElementById('criteriaPage').value;
        let nowPaging   = document.querySelector('#handleAmount option:checked');
        let selectedValue = nowPaging.value;
        let listType    = document.getElementById('criteriaListType').value;
        let pageNum     = index + 1 ;
        
        anchor.setAttribute('id', 'pageNumber_' + pageNum);
        let pageNumHref = contextPath + '/board/' + code + '?page=' + pageNum 
                        + '&amount=' + selectedValue 
                        + '&category=' + category
                        + '&listType=' + listType;
        anchor.setAttribute('href', pageNumHref);
    });
}