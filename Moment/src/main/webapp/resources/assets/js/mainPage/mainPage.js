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
// new board list ajax
const newBoardListWithin3Days = (code, category, page) => {
    let data = {code: code, amount:5, category: category, page: page};
    const callback = (post) => {
        newBoardRender(post.data);
        pagenation(post.pagenation);
    };
    ajaxRequest(firstPath + '/board/newList', 'GET', data, callback);
};
const newBoardListWithin3DaysBtn = () => {
    const newBoardCategory = document.getElementsByClassName('newBoardCategory');
    Array.from(newBoardCategory).forEach((element) => {
        element.addEventListener('click', (e) => {
            const code = e.target.getAttribute('cate-data');
            Array.from(newBoardCategory).forEach(remove => {
                // 모든 링크에서 'selected' 클래스를 제거
                remove.classList.remove('selected');
            });
            // 현재 클릭된 링크에 'selected' 클래스 추가
            if(code === 0) {
                newBoardListWithin3Days('0', '0', 1);
            } else {
                newBoardListWithin3Days(code, '0', 1);
            };
            element.classList.add('selected');
        });
    });
};
// new board render
const newBoardRender = (data) => {
    // parent, elementType, attributes = {}, content = ''
    const containal = document.querySelector('#newBoardList');
    containal.innerHTML = '';
    const innerContainal = createAndAppendElement(containal, 'div', {class : 'mt-3 border-top'});
    const table = createAndAppendElement(innerContainal, 'table', {class : 'table table-hover'});
    const colgroup = ['10%','40%','20%','20%','10%'];
    for(const key of colgroup) {
        createAndAppendElement(table, 'col', {style : 'width:' + key});
    };
    const thead = createAndAppendElement(table, 'thead', {class: 'text-center'});
    const trHead = createAndAppendElement(thead, 'tr', {class : 'mt-3'});
    const columnMapping = {
        headerTitles: ['번호', '제목', '작성자', '작성일', '조회'],        // 제목
        rowDataKeys: ["boardNo", "title", "id", "writeDt", "viewCount"] // 데이터
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
                            +   '<span>' + item[key] + '</span>' 
                            + '</a>';
            } else {
                tdContent = '<span class="' + key + '">'+ item[key] +'</span>'
            };
            createAndAppendElement(trBody, 'td', {}, tdContent);
        };
    });
    containal.append(innerContainal);
};

const pagenation = (data) => {
    const containal = document.getElementById('pagingBox');
    // 컨테이너의 첫번째 자식이면 삭제할 자식 중 첫번째 자식을 지워라.
    while (containal.firstChild) {
        containal.removeChild(containal.firstChild);
    };
    // 순서 : <<,<,number,>,>>
    createAndAppendElement(containal, 'button', { id: 'firstPageBtn', class: 'firstPage pbtn' }, '<i class="fa-solid fa-angles-left"></i>');
    createAndAppendElement(containal, "button", { id: 'prevPageBtn', class: 'prevPage pbtn' }, '<i class="fa-solid fa-angle-left"></i>');
    for(let i = 1 ; i <= data.realEnd ; i++) {
        const pageNumberLink = createAndAppendElement(containal, "button", { class: 'pageNumBtn pbtn' });
        createAndAppendElement(pageNumberLink, 'span', { class: 'pageNum'}, i);
    };
    createAndAppendElement(containal, "button", { id: 'nextpageBtn', class: 'nextpage pbtn' }, '<i class="fa-solid fa-angle-right"></i>');
    createAndAppendElement(containal, "button", { id: 'lastPageBtn', class: 'lastPage pbtn' }, '<i class="fa-solid fa-angles-right"></i>');
};

const pagenationWork = () => {
    const pagenationDiv = document.getElementById('pagingBox');
    pagenationDiv.addEventListener('click', (e) => {
        const currentCategoryElement = document.querySelector('.newBoardCategory.selected');
        let currentMainCategory;
        
        if(e.target.classList.contains('pageNumBtn')) {
            let currentPage = e.target.textContent;
            // 현재 페이지 값을 가져오기
            // 클릭된 카테고리 값 가져오기
            if(!currentCategoryElement){
                currentMainCategory = 0;
            } else {
                currentMainCategory = currentCategoryElement.getAttribute('cate-data');
            }
            newBoardListWithin3Days(currentMainCategory, '0', currentPage);
        } else if(e.target.classList.contains('firstPage')) {
            newBoardListWithin3Days(currentMainCategory, '0', 1);
        } else if(e.target.classList.contains('prevPage')) {
            const prevPage = e.target.textContent-1;
            
            console.log('prevPage:',prevPage);
            if(prevPage > 0) {
                document.getElementById('prevPageBtn').disabled = 'false';
                newBoardListWithin3Days(currentMainCategory, '0', prevPage);
            } else {
                document.getElementById('prevPageBtn').disabled = 'ture';
            }
        }
    })
    

};
//------------------------------------------------------------------------
// ajax list
bookSearch();
newsSearch();
createBookComponent(firstPath, 1, "all");
createNewsComponent(firstPath, 1, "all");
pagenationWork();

newBoardListWithin3Days('0', '0', 1);
newBoardListWithin3DaysBtn('0', '0', 1);

// 페이지 로드 후 데이터 가져오기
window.onload = function() {
    bookPageChangeBnt();
    newsPageChangeBnt();
};