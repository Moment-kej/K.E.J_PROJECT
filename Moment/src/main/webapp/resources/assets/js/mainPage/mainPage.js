import { firstContextPath, ajaxRequest, formatTime_hhmm, formatTime_hhmmss, createAndAppendElement } from "../common/common.js";

const firstPath = firstContextPath;   // '/moment' 가져오기
// 도서 리스트 랜더링 아작스
window.createBookComponent = (contextPath, PageNumber, query) => {
    const data = {page : PageNumber, query : query};
    const callback = (data) => {bookListRender(data);};
    ajaxRequest(contextPath + '/naverBook', 'GET', data, callback );
};
// 도서 검색 아작스
const bookSearch = () => {
    document.getElementById('bookSerachBnt').addEventListener('click', () => {
        const query = document.getElementById('bookSerachName').value;
        const data = {page: 1, query: query};
        const callback = (data) => {bookListRender(data);};
        ajaxRequest(firstPath + '/naverBook', 'GET', data, callback);
    });
};
// 도서 리스트 랜더링
const bookListRender = (data) => {
    const dataList = document.getElementById('bookList');
    dataList.textContent = "";      // 초기화
    // 초기화 후 렌더링
    data.map(item => {
        const listItem = document.createElement('li');

        let out_div = document.createElement('div');
        out_div.classList = 'd-flex';

        let img_a = document.createElement('a');
        img_a.setAttribute('href', item.link);
        img_a.target = "_blank";
        
        let img = document.createElement('img');
        img.setAttribute('src' , item.image);
        img.setAttribute('alt', item.title);
        
        img_a.appendChild(img);

        let inside_div = document.createElement('div');

        let title_div = document.createElement('div');
        title_div.className = 'titleDiv';

        let title_p = document.createElement('p');
        title_p.classList = 'bookTitle';
        title_p.innerHTML = '<b>' + item.title + '</b>';
        title_div.appendChild(title_p);
        inside_div.appendChild(title_div);

        let content_p = document.createElement('p');
        content_p.innerText = '가격: ' + formatMoney(item.discount) + ' 원';
        inside_div.appendChild(content_p);

        let date = document.createElement('small');
        date.innerText = '출판사: [' + item.publisher + '] | '
                        + '출간일: ' + item.pubdate;
        inside_div.appendChild(date);

        out_div.append(img_a);
        out_div.append(inside_div);
                
        listItem.append(out_div);
        dataList.append(listItem);
    });
};
// 뉴스 리스트 랜더링
const newsListRender = (data) => {
    document.querySelector("#newsList").innerHTML = '';

    data.map((item) => {
        const liTag = document.createElement("li");

        const parentDiv = document.createElement("div");
        parentDiv.className = "d-flex";

        const childDiv = document.createElement("div");

        const titlePTag = document.createElement("p");
        titlePTag.classList.add("text-info", "mb-1");
        
        const aTag = document.createElement("a");
        aTag.href = item.link;
        aTag.target = "_blank";
        
        const textBoldTag = document.createElement("b");
        textBoldTag.innerHTML = item.title;
        aTag.appendChild(textBoldTag);
        titlePTag.appendChild(aTag);
        
        const descriptionPTag = document.createElement("p");
        descriptionPTag.className = "mb-0";
        descriptionPTag.innerHTML = item.description
        
        const smallTag = document.createElement("small");
        smallTag.innerText = formatTime_hhmm(item.pubDate);

        childDiv.append(titlePTag);
        childDiv.append(descriptionPTag);
        childDiv.append(smallTag);
        parentDiv.append(childDiv);
        liTag.append(parentDiv);
        document.querySelector("#newsList").append(liTag);
    });
}
// 뉴스 리스트 랜더링 아작스
window.createNewsComponent = (contextPath, currentPageNumber, querySearch) => {
    const data = {page: currentPageNumber, query: querySearch};
    const callback = (data) => {newsListRender(data);};
    ajaxRequest(contextPath + '/naverNews', 'GET', data, callback);
};
// 뉴스 검색 아작스
const newsSearch = () => {
    document.getElementById('newsSerachBnt').addEventListener('click', () => {
        let query = document.getElementById('newsSerachName').value;
        const data = {page: 1, query: query};
        const callback = (data) => {newsListRender(data);};
        ajaxRequest(firstPath + '/naverNews', 'GET', data, callback);
    });
};
//------------------------------------------------------------------------
// news pagenation 조건
const newsPagenationCondition = (currentPageNumber) => {
    let total = document.getElementById('total').value;
    let total_number = parseInt(total);

    if(currentPageNumber === 1) {
        // news
        document.querySelector('.left-button').style.display = 'none';
        document.querySelector('.right-button').style.display = 'block';
    } else {
        if(currentPageNumber === total_number) {
            // news
            document.querySelector('.right-button').style.display = 'none';
            document.querySelector('.left-button').style.display = 'block';
        } else {
            // news
            document.querySelector('.right-button').style.display = 'block';
            document.querySelector('.left-button').style.display = 'block';
        }
    };
};
// news pagenation button
const newsPageChangeBnt = () => {
    let querySearch = document.getElementById('querySearch').value;
    // string -> number change
    let currentPageNumber = parseInt(document.getElementById('currentPage').value);

    
    if(currentPageNumber === 1) {
        document.querySelector('.left-button').style.display = 'none';
    }
    
    document.querySelector('.left-button').addEventListener('click', function() {
        let pageDown = --currentPageNumber;
        // console.log('pageDown>>>' + pageDown);
        newsPagenationCondition(pageDown);
        createNewsComponent(firstPath, pageDown, querySearch);
    });
    
    document.querySelector('.right-button').addEventListener('click', function() {
        let pageUp = ++currentPageNumber;
        // console.log('pageUp>>>' + pageUp);
        newsPagenationCondition(pageUp);
        createNewsComponent(firstPath, pageUp, querySearch);
    });
    
};
//------------------------------------------------------------------------
// book pagenation 조건
const bookPagenationCondition = (bookPageNumber) => {
    let total = document.getElementById('total').value;
    let totalNumber = parseInt(total);
    
    if(bookPageNumber === 1) {
        // book
        document.querySelector('.bookLeftBnt').style.display = 'none';
        document.querySelector('.bookLeftBnt').style.display = 'block';
    } else {
        if(bookPageNumber === totalNumber) {
            // book
            document.querySelector('.bookRightBnt').style.display = 'none';
            document.querySelector('.bookLeftBnt').style.display = 'block';
        } else {
            // book

            document.querySelector('.bookLeftBnt').style.display = 'block';
            document.querySelector('.bookRightBnt').style.display = 'block';
        }
    };
};
// book pagenation button
const bookPageChangeBnt = () => {
    let querySearch = document.getElementById('book_querySearch').value;
    
    // string -> number change
    let bookPageNumber = parseInt(document.getElementById('book_currentPage').value);

    if(bookPageNumber === 1) {
        document.querySelector('.bookLeftBnt').style.display = 'none';
    };

    document.querySelector('.bookLeftBnt').addEventListener('click', function() {
        let pageDown = --bookPageNumber;
        bookPagenationCondition(pageDown);
        createBookComponent(firstPath, pageDown, querySearch);
    });
    
    document.querySelector('.bookRightBnt').addEventListener('click', function() {
        let pageUp = ++bookPageNumber;
        bookPagenationCondition(pageUp);
        createBookComponent(firstPath, pageUp, querySearch);
    });
};
//------------------------------------------------------------------------
// 금액 포맷
const formatMoney = (money) => {
    // 숫자를 문자열로 변환 후 역순으로 만들기
    const reversed = money.toString().split('').reverse().join('');

    // 3자리마다 쉼표 추가
    const formatted = reversed.replace(/(\d{3})(?=\d)/g, '$1,');

    // 역순으로 된 문자열을 다시 뒤집어서 최종 결과 얻기
    return formatted.split('').reverse().join('');
};
//------------------------------------------------------------------------
// board render
const postRedner = (data, mainContainal) => {
    // parent, elementType, attributes = {}, content = '' 
    const containal = document.querySelector(mainContainal);
    containal.innerHTML = '';
    const innerContainal = createAndAppendElement(containal, 'div', {class : 'mt-3 border-top'});
    if(data != 0) {
        const table = createAndAppendElement(innerContainal, 'table', {class : 'table table-hover'});
        const colgroup = ['10%', '40%', '20%', '20%', '5%', '5%'];
        for(const key of colgroup) {
            createAndAppendElement(table, 'col', {style : 'width:' + key});
        };
        const thead = createAndAppendElement(table, 'thead', {class: 'text-center'});
        const trHead = createAndAppendElement(thead, 'tr', {class : 'mt-3'});
        const columnMapping = {
            headerTitles: ['번호', '제목', '작성자', '작성일', '조회', '좋아요'],        // 제목
            rowDataKeys: ["boardNo", "title", "id", "writeDt", "viewCount", "likeCount"] // 데이터
        };
        for(const title of columnMapping.headerTitles) {
            createAndAppendElement(trHead, 'th', {}, title);
        };
        const tbody = createAndAppendElement(table, 'tbody');
        data.map((item) => { // tbody 에 있는 tr에 ajax로 들고오는 값 불어넣기
            item.writeDt = formatTime_hhmm(item.writeDt);
            const trBody = createAndAppendElement(tbody, 'tr', {class : 'mainTable'});
            for(const key of columnMapping.rowDataKeys) {
                let tdContent = "";
                if(key === 'title') {
                    tdContent = '<a href="' + firstPath + '/board/dress/all/' + item.boardNo + '">'
                                +   '<span>' + item[key] + ' <span style="color: red;">[' + item.replyCount + ']</span>' + '</span>' 
                                + '</a>';
                } else {
                    tdContent = '<span class="' + key + '">'+ item[key] +'</span>'
                };
                createAndAppendElement(trBody, 'td', {}, tdContent);
            };
        });
    } else {
        const dataNotDiv = createAndAppendElement(innerContainal, 'div', {class : 'd-flex justify-content-center position-relative', style : 'height: 140px;'});
        createAndAppendElement(dataNotDiv, 'h3', {class : 'position-absolute top-50 start-50 translate-middle'}, '최근 등록된 게시글이 없습니다.');
    }
    containal.append(innerContainal);
};
// new board list ajax
const newBoardList = (code, category, page) => {
    const data = {code: code, amount:5, category: category, page: parseInt(page)};
    const callback = (post) => {
        console.log(post.pagenation); 
        postRedner(post.data, '#newBoardList');
        pagenation(post.pagenation);
        pageNumberButtonClick();
        let currentPageNumber = post.pagenation.page;
        let realEndPageNumber = post.pagenation.realEnd;

        if(post.data != '') {
            // pagenation click event
            prevButtonClick(currentPageNumber);
            nextButtonClick(currentPageNumber, realEndPageNumber);
            lastButtonClick(realEndPageNumber);
            firstButtonClick();
        }
    };
    ajaxRequest(firstPath + '/board/newList', 'GET', data, callback);
};
const newBoardListBtn = () => {
    const newBoardCategory = document.getElementsByClassName('newBoardCategory');
    Array.from(newBoardCategory).forEach((element) => {
        element.addEventListener('click', (e) => {
            const code = e.target.getAttribute('data-cate');
            Array.from(newBoardCategory).forEach(remove => {
                // 모든 링크에서 'selected' 클래스를 제거
                remove.classList.remove('selected');
            });
            // 현재 클릭된 링크에 'selected' 클래스 추가
            if(code === 0) {
                newBoardList('0', '0', 1);
            } else {
                newBoardList(code, '0', 1);
                element.classList.add('selected');
            };
        });
    });
};
const pagenation = (data) => {
    const containal = document.getElementById('pagingBox');
    // 컨테이너의 첫번째 자식이면 삭제할 자식 중 첫번째 자식을 지워라.
    while (containal.firstChild) {
        containal.removeChild(containal.firstChild);
    };

    if(data.total !== 0) {
        // 순서 : <<,<,number,>,>>
        createAndAppendElement(containal, 'button', { id: 'firstPageBtn', class: 'firstPage pbtn' }, '<i class="fa-solid fa-angles-left"></i>');
        createAndAppendElement(containal, "button", { id: 'prevPageBtn', class: 'prevPage pbtn' }, '<i class="fa-solid fa-angle-left"></i>');
        for(let i = 1 ; i <= data.end ; i++) {
            createAndAppendElement(containal, "button", { class: 'pageNumBtn pbtn', id: 'pageNumBtn' + i }, i);
        };
        createAndAppendElement(containal, "button", { id: 'nextpageBtn', class: 'nextpage pbtn' }, '<i class="fa-solid fa-angle-right"></i>');
        createAndAppendElement(containal, "button", { id: 'lastPageBtn', class: 'lastPage pbtn' }, '<i class="fa-solid fa-angles-right"></i>');
        document.getElementById("pageNumBtn" + data.page).classList.add("pageSelected");
    } else {
        createAndAppendElement(containal, 'div', {});
    }
};
const currentCategory = () => {
    const currentCategoryElement = document.querySelector('.newBoardCategory.selected');
    let currentMainCategory;

    if(!currentCategoryElement) {
        currentMainCategory = 0;
    } else {
        currentMainCategory = parseInt(currentCategoryElement.getAttribute('data-cate'));
    };

    return currentMainCategory;
};
const prevButtonClick = (page) => {
    const clickedElement = document.getElementById('prevPageBtn');
    const category = currentCategory();

    clickedElement.addEventListener('click', () => {
        // <
        if(page > 1) {
            newBoardList(category, 0, page - 1);
            clickedElement.disabled = 'false';
        } else if (page === 1) {
            clickedElement.disabled = 'true';
        };
    });
};
const nextButtonClick = (page, realEnd) => {
    const clickedElement = document.getElementById('nextpageBtn');
    const category = currentCategory();
    clickedElement.addEventListener('click', () => {
        // >
        if (realEnd !== page) {
            newBoardList(category, 0, page + 1);
            clickedElement.disabled = 'false';
        } else {
            clickedElement.disabled = 'true';
        }
    });
};
const lastButtonClick = (realEnd) => {
    const clickedElement = document.getElementById('lastPageBtn');
    const category = currentCategory();
    // >>
    clickedElement.addEventListener('click', () => {
        newBoardList(category, 0, realEnd);
    });
};
const firstButtonClick = () => {
    const clickedElement = document.getElementById('firstPageBtn');
    const category = currentCategory();
    // <<
    clickedElement.addEventListener('click', () => {
        newBoardList(category, '0', 1);
    });
};
const pageNumberButtonClick = () => {
    const pageNumBtnElementList = document.querySelectorAll(".pageNumBtn ");
    const category = currentCategory();
    Array.from(pageNumBtnElementList).forEach((element) => {
        element.addEventListener("click", (e) => {
            newBoardList(
                category, 
                '0', 
                parseInt(e.target.innerText)
            );
        });
    });
};
//------------------------------------------------------------------------
const topBoardLsit = (code, category, page) => {
    const data = {code: code, amount:5, category: category, page: parseInt(page)};
    const callback = (data) => {
        postRedner(data.data, '#topBoardList');
        topBoardPagenation(data.paging);
    };
    ajaxRequest(firstPath + '/board/topList', 'GET', data, callback);
};
const topBoardListBtn = () => {
    const topBoardCategory = document.getElementsByClassName('topBoardCategory');
    Array.from(topBoardCategory).forEach((element) => {
        element.addEventListener('click', (e) => {
            console.log(e);
            const code = e.target.getAttribute('data-cate');
            Array.from(topBoardCategory).forEach(remove => {
                // 모든 링크에서 'selected' 클래스를 제거
                remove.classList.remove('selected');
            });
            // 현재 클릭된 링크에 'selected' 클래스 추가
            if(code === 0) {
                topBoardLsit('0', '0', 1);
            } else {
                topBoardLsit(code, '0', 1);
                element.classList.add('selected');
            };
        });
    });
};
const topBoardPagenation = (data) => {
    const containal = document.getElementById('topBoardListPagingBox');
    // 컨테이너의 첫번째 자식이면 삭제할 자식 중 첫번째 자식을 지워라.
    while (containal.firstChild) {
        containal.removeChild(containal.firstChild);
    };
    if(data.total !== 0) {
        // 순서 : <<,<,number,>,>>
        createAndAppendElement(containal, 'button', { id: 'top-firstPageBtn', class: 'firstPage pbtn' }, '<i class="fa-solid fa-angles-left"></i>');
        createAndAppendElement(containal, "button", { id: 'top-prevPageBtn', class: 'prevPage pbtn' }, '<i class="fa-solid fa-angle-left"></i>');
        for(let i = 1 ; i <= data.realEnd ; i++) {
            createAndAppendElement(containal, "button", { class: 'top-pageNumBtn pbtn', id: 'top-pageNumBtn' + i }, i);
        };
        createAndAppendElement(containal, "button", { id: 'top-nextpageBtn', class: 'nextpage pbtn' }, '<i class="fa-solid fa-angle-right"></i>');
        createAndAppendElement(containal, "button", { id: 'top-lastPageBtn', class: 'lastPage pbtn' }, '<i class="fa-solid fa-angles-right"></i>');
        document.getElementById("top-pageNumBtn" + data.page).classList.add("pageSelected");
    } else {
        createAndAppendElement(containal, 'div', {});
    };
};
//------------------------------------------------------------------------
// common code ajax
const commonCodeAjax = () => {
    const callback = (data) => {
        const CO = data.CO;
        const CA = data.CA;

        CO.map(item => {
            CO_commonCodeRender(item);
            CA.map(sub => {
                // console.log(sub);
                CA_commonCodeReder(sub);
            })
        });
    }
    ajaxRequest(firstPath + '/code', 'GET', {}, callback);
};
// main category
const CO_commonCodeRender = (data) => {
    const mainCategory = document.querySelector('#mainCategory');
    const li = createAndAppendElement(mainCategory, 'li', {id: 'mainCate_' + parseInt(data.commonDetailCd.toString()[0])});
    createAndAppendElement(li, 'a', {'data-cate': data.commonDetailCd, class: 'topBoardCategory'}, data.commonDetailName);
};
// sub category
const CA_commonCodeReder = (data) => {
    const mainCategoryNumber = parseInt(data.commonDetailCd.toString()[0]);
    // console.log(document.querySelector('#mainCate_' + mainCategoryNumber));
}
//------------------------------------------------------------------------

// ajax list
commonCodeAjax();
bookSearch();
newsSearch();
createBookComponent(firstPath, 1, "all");
createNewsComponent(firstPath, 1, "all");

newBoardList(0, 0, 1);
newBoardListBtn();
topBoardLsit(0, 0, 1);

// 페이지 로드 후 데이터 가져오기
window.onload = function() {
    topBoardListBtn();
    bookPageChangeBnt();
    newsPageChangeBnt();
};