import { firstContextPath, ajaxRequest, formatTime_hhmm, formatTime_hhmmss, createAndAppendElement } from "../common.js";

const firstPath = firstContextPath;   // '/moment' 가져오기
//------------------------------------------------------------------------
window.createBookComponent = (contextPath, PageNumber, query) => {  // 도서 리스트 랜더링 아작스
    const data = {page : PageNumber, query : query};
    const callback = (data) => {bookListRender(data);};
    ajaxRequest(contextPath + '/naverBook', 'GET', data, callback );
};
const bookSearch = () => {  // 도서 검색 아작스
    document.getElementById('bookSerachBnt').addEventListener('click', () => {
        const query = document.getElementById('bookSerachName').value;
        const data = {page: 1, query: query};
        const callback = (data) => {bookListRender(data);};
        ajaxRequest(firstPath + '/naverBook', 'GET', data, callback);
    });
};
const bookListRender = (data) => {  // 도서 리스트 랜더링
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
//------------------------------------------------------------------------
window.createNewsComponent = (contextPath, currentPageNumber, querySearch) => { // 뉴스 리스트 랜더링 아작스
    const data = {page: currentPageNumber, query: querySearch};
    const callback = (data) => {newsListRender(data);};
    ajaxRequest(contextPath + '/naverNews', 'GET', data, callback);
};
const newsSearch = () => {  // 뉴스 검색 아작스
    document.getElementById('newsSerachBnt').addEventListener('click', () => {
        let query = document.getElementById('newsSerachName').value;
        const data = {page: 1, query: query};
        const callback = (data) => {newsListRender(data);};
        ajaxRequest(firstPath + '/naverNews', 'GET', data, callback);
    });
};
const newsListRender = (data) => {  // 뉴스 리스트 랜더링
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
//------------------------------------------------------------------------
const newsPagenationCondition = (currentPageNumber) => {    // news pagenation 조건
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
const newsPageChangeBnt = () => {   // news pagenation button
    const querySearch = document.getElementById('querySearch').value;
    let currentPageNumber = parseInt(document.getElementById('currentPage').value);

    if(currentPageNumber === 1) {
        document.querySelector('.left-button').style.display = 'none';
    };
    
    document.querySelector('.left-button').addEventListener('click', function() {
        let pageDown = --currentPageNumber;
        newsPagenationCondition(pageDown);
        createNewsComponent(firstPath, pageDown, querySearch);
    });
    
    document.querySelector('.right-button').addEventListener('click', function() {
        let pageUp = ++currentPageNumber;
        newsPagenationCondition(pageUp);
        createNewsComponent(firstPath, pageUp, querySearch);
    });
    
};
//------------------------------------------------------------------------
const bookPagenationCondition = (bookPageNumber) => {   // book pagenation 조건
    const total = document.getElementById('total').value;
    const totalNumber = parseInt(total);

    console.log(bookPageNumber === 1);
    
    if(bookPageNumber === 1) {
        // book
        document.querySelector('.bookLeftBnt').style.display = 'none';
        document.querySelector('.bookRightBnt').style.display = 'block';
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
const bookPageChangeBnt = () => {   // book pagenation button
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
const postRedner = (data, mainContainal) => {    // new and top board render
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
                    tdContent = '<a class=no' + item.boardNo + '>'
                                +   '<span>' + item[key] + ' <span style="color: red;">[' + item.replyCount + ']</span>' + '</span>' 
                                + '</a>';
                } else {
                    tdContent = '<span class="' + key + '">'+ item[key] +'</span>'
                };
                
                let boardDetailLlnk = document.querySelector('.no' + item.boardNo);
                if(boardDetailLlnk !== null) {
                    if(item.code == 10 ) {
                        boardDetailLlnk.setAttribute('href', firstPath + '/board/dress/all/' + item.boardNo);
                    } else if(item.code == 20) {
                        boardDetailLlnk.setAttribute('href', firstPath + '/board/art/' + item.boardNo); 
                    } else if(item.code == 30) {
                        boardDetailLlnk.setAttribute('href', firstPath + '/board/music/' + item.boardNo);
                    };
                };

                createAndAppendElement(trBody, 'td', {}, tdContent);
            };
        });
    } else {
        const dataNotDiv = createAndAppendElement(innerContainal, 'div', {class : 'd-flex justify-content-center position-relative', style : 'height: 180px;'});
        createAndAppendElement(dataNotDiv, 'h3', {class : 'position-absolute top-50 start-50 translate-middle'}, '최근 등록된 게시글이 없습니다.');
    }
    containal.append(innerContainal);
};
const newBoardList = (code, category, page) => { // new board list ajax
    const data = {code: code, amount:5, category: category, page: parseInt(page)};
    const callback = (post) => {
        postRedner(post.data, '#newBoardList');
        pagenation(post.pagenation);
        newBoardMainCategoryClicked();
        if(post.data != '') {
            // pagenation click event
            newboard_init(post.pagenation.page, post.pagenation.realEnd);
        }
    };
    ajaxRequest(firstPath + '/board/newList', 'GET', data, callback);
};
const newBoardMainCategoryClicked = () => { // new board main cateogry click event
    const newBoardCategory = document.getElementsByClassName('newBoardCategory');
    const newBoardSubCategory = document.getElementsByClassName('newBoardSubCategory');
    Array.from(newBoardCategory).forEach((element) => {
        element.addEventListener('click', (e) => {
            const code = parseInt(e.target.getAttribute('data-cate'));
            Array.from(newBoardCategory).forEach(remove => {
                remove.classList.remove('selected');
            });
            Array.from(newBoardSubCategory).forEach(remove => {
                remove.classList.remove('subCategorySelected');
                remove.parentNode.classList.remove('subCategorySelected');
            });
            if(code === 0) {
                newBoardList(0,0,1);
            } else {
                newBoardList(code,0,1);
                element.classList.add('selected');
            };
        });
    });
};
const pagenation = (data) => { // new board pagenation
    const containal = document.getElementById('pagingBox');
    // 컨테이너의 첫번째 자식이면 삭제할 자식 중 첫번째 자식을 지워라.
    while (containal.firstChild) {
        containal.removeChild(containal.firstChild);
    };

    if(data.total !== 0) {
        // 순서 : <<,<,number,>,>>
        createAndAppendElement(containal, 'button', { id: 'firstPageBtn', class: 'firstPage pbtn' }, '<i class="fa-solid fa-angles-left"></i>');
        createAndAppendElement(containal, "button", { id: 'prevPageBtn', class: 'prevPage pbtn' }, '<i class="fa-solid fa-angle-left"></i>');
        for(let i = 1 ; i <= data.end ; i++) {  //8
            if (i >= data.start) {
                createAndAppendElement(containal, "button", { class: 'pageNumBtn pbtn', id: 'pageNumBtn' + i }, i);
            }
        };
        createAndAppendElement(containal, "button", { id: 'nextpageBtn', class: 'nextpage pbtn' }, '<i class="fa-solid fa-angle-right"></i>');
        createAndAppendElement(containal, "button", { id: 'lastPageBtn', class: 'lastPage pbtn' }, '<i class="fa-solid fa-angles-right"></i>');
        document.getElementById("pageNumBtn" + data.page).classList.add("pageSelected");
    } else {
        createAndAppendElement(containal, 'div', {style: 'height:32.222px;'});
    }
};
const newBoardCurrentCategory = () => { // new board main cateogry number return
    const currentCategoryElement = document.querySelector('.newBoardCategory.selected');
    let currentMainCategory;

    if(!currentCategoryElement) {
        currentMainCategory = 0;
    } else {
        currentMainCategory = parseInt(currentCategoryElement.getAttribute('data-cate'));
    };

    return currentMainCategory;
};
const newboard_init = (page, realEnd) => {  // new board pagenation click event
    const category = newBoardCurrentCategory();

    const prevButtonClick = () => {
        const clickedElement = document.getElementById('prevPageBtn');

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

    const nextButtonClick = () => {
        const clickedElement = document.getElementById('nextpageBtn');
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

    const lastButtonClick = () => {
        const clickedElement = document.getElementById('lastPageBtn');
        // >>
        clickedElement.addEventListener('click', () => {
            newBoardList(category, 0, realEnd);
        });
    };

    const firstButtonClick = () => {
        const clickedElement = document.getElementById('firstPageBtn');
        // <<
        clickedElement.addEventListener('click', () => {
            newBoardList(category, 0, 1);
        });
    };

    const pageNumberButtonClick = () => {
        const pageNumBtnElementList = document.querySelectorAll(".pageNumBtn");
        Array.from(pageNumBtnElementList).forEach((element) => {
            element.addEventListener("click", (e) => {
                newBoardList(
                    category, 
                    0, 
                    parseInt(e.target.innerText)
                );
            });
        });
    };

    prevButtonClick();
    nextButtonClick();
    lastButtonClick();
    firstButtonClick();
    pageNumberButtonClick();
};
//------------------------------------------------------------------------
const topBoardLsit = (code, category, page) => { // top board ajax
    const data = {code: code, amount:5, category: category, page: parseInt(page)};
    const callback = (data) => {
        postRedner(data.data, '#topBoardList');
        topBoardPagenation(data.paging);
        topBoardMainCategoryClicked();
        if(data.data != '') {
            topBoard_init(data.paging.page, data.paging.realEnd);
        }
    };
    ajaxRequest(firstPath + '/board/topList', 'GET', data, callback);
};
const topBoardMainCategoryClicked = () => { // top board main cateogry click event
    const topBoardCategory = document.getElementsByClassName('topBoardCategory');
    const topBoardSubCategory = document.getElementsByClassName('topBoardSubCategory');
    Array.from(topBoardCategory).forEach((element) => {
        element.addEventListener('click', (e) => {
            const code = parseInt(e.target.getAttribute('data-cate'));
            // 모든 링크에서 'selected' 클래스를 제거
            Array.from(topBoardCategory).forEach(remove => {
                remove.classList.remove('selected');
            });
            Array.from(topBoardSubCategory).forEach(remove => {
                remove.classList.remove('subCategorySelected');
                remove.parentNode.classList.remove('subCategorySelected');
            });

            if(code === 0) {
                topBoardLsit(0,0,1);
            } else {
                topBoardLsit(code,0,1);
                element.classList.add('selected');
            };
        });
    });
};
const topBoardPagenation = (data) => {      // top board pagenation render
    const containal = document.getElementById('topBoardListPagingBox');
    // 컨테이너의 첫번째 자식이면 삭제할 자식 중 첫번째 자식을 지워라.
    while (containal.firstChild) {
        containal.removeChild(containal.firstChild);
    };
    if(data.total !== 0) {
        // 순서 : <<,<,number,>,>>
        createAndAppendElement(containal, 'button', { id: 'top-firstPageBtn', class: 'firstPage pbtn' }, '<i class="fa-solid fa-angles-left"></i>');
        createAndAppendElement(containal, "button", { id: 'top-prevPageBtn', class: 'prevPage pbtn' }, '<i class="fa-solid fa-angle-left"></i>');
        for(let i = 1 ; i <= data.end ; i++) {
            // 페이지 번호가 페이지 스타트 번호보다 크거나 같으면 페이지네이션 랜더링
            if (i >= data.start) {
                createAndAppendElement(containal, "button", { class: 'top-pageNumBtn pbtn', id: 'top-pageNumBtn' + i }, i);
            }
        };
        createAndAppendElement(containal, "button", { id: 'top-nextpageBtn', class: 'nextpage pbtn' }, '<i class="fa-solid fa-angle-right"></i>');
        createAndAppendElement(containal, "button", { id: 'top-lastPageBtn', class: 'lastPage pbtn' }, '<i class="fa-solid fa-angles-right"></i>');
        document.getElementById("top-pageNumBtn" + data.page).classList.add("pageSelected");
    } else {
        createAndAppendElement(containal, 'div', {style: 'height:32.222px;'});
    };
};
const topBoardCurrentCategory = () => {            // top board main and sub category number return
    const currentTopBoardCategory = document.querySelector('.topBoardCategory.selected');
    const currentTopBoardSubCategory = document.querySelector('.topBoardSubCategory.subCategorySelected');

    let currentMainCategory;
    let currentSubCategory;

    if(!currentTopBoardCategory || !currentTopBoardSubCategory) {
        currentMainCategory = 0;
        currentSubCategory = 0;
    } else {
        currentMainCategory = parseInt(currentTopBoardCategory.getAttribute('data-cate'));
        currentSubCategory = parseInt(currentTopBoardSubCategory.id.split('_')[1]);
    }

    return {currentMainCategory: currentMainCategory, currentSubCategory: currentSubCategory};
};
const topBoard_init = (page, realEnd) => {  // top board pagenation click event
    const currnetCatgory = topBoardCurrentCategory();
    const currentMainCategory = currnetCatgory.currentMainCategory;
    const currentSubCategory = currnetCatgory.currentSubCategory;
    const prevButtonClick = () => {
        const element = document.getElementById('top-prevPageBtn');
        element.addEventListener('click', () => {
            // <
            if(page > 1) {
                topBoardLsit(currentMainCategory, currentSubCategory, page - 1);
                element.disabled = 'false';
            } else if(page === 1) {
                element.disabled = 'true';
            }
        });
    };
    const nextButtonClick = () => {
        const element = document.getElementById('top-nextpageBtn');
        element.addEventListener('click', () => {
            // >
            if (realEnd !== page) {
                topBoardLsit(currentMainCategory, currentSubCategory, page + 1);
                element.disabled = 'false';
            } else {
                element.disabled = 'true';
            }
        })
    };
    const lastButtonClick = () => {
        const element = document.getElementById('top-lastPageBtn');
        // >>
        element.addEventListener('click', () => {
            topBoardLsit(currentMainCategory, currentSubCategory, realEnd);
        });
    };
    const firstButtonClick = () => {
        const element = document.getElementById('top-firstPageBtn');
        // <<
        element.addEventListener('click', () => {
            topBoardLsit(currentMainCategory, currentSubCategory, 1);
        });
    };
    const pageNumberButtonClick = () => {
        const pageNumBtnElementList = document.querySelectorAll(".top-pageNumBtn");
        Array.from(pageNumBtnElementList).forEach((element) => {
            element.addEventListener("click", (e) => {
                topBoardLsit(
                    currentMainCategory, 
                    currentSubCategory, 
                    parseInt(e.target.innerText)
                );
            });
        });
    };

    prevButtonClick();
    nextButtonClick();
    lastButtonClick();
    firstButtonClick();
    pageNumberButtonClick();
};
//------------------------------------------------------------------------
const commonCodeAjax = () => {  // common code ajax
    const callback = (data) => {
        data.CO.map(item => {
            // main category render
            const commonDetailCd = item.commonDetailCd.toString()[0];
            // top board
            const topBoardMainCategory = document.querySelector('#mainCategory');   
            const topBoardMainCategoRy_li_element = createAndAppendElement(topBoardMainCategory, 'li');
            createAndAppendElement(topBoardMainCategoRy_li_element, 'a', {'data-cate': item.commonDetailCd, class: 'topBoardCategory'}, item.commonDetailName);
            createAndAppendElement(topBoardMainCategoRy_li_element, 'ul', {id: 'mainCate_' + parseInt(commonDetailCd)});

            // new board
            const newBoardMainCategory = document.querySelector('#newBoardMainCategory');
            const newBoardMainCatgory_li_element = createAndAppendElement(newBoardMainCategory, 'li');
            createAndAppendElement(newBoardMainCatgory_li_element, 'a', {'data-cate': item.commonDetailCd, class: 'newBoardCategory'}, item.commonDetailName);
            createAndAppendElement(newBoardMainCatgory_li_element, 'ul', {id: 'newBoardMainCate_' + parseInt(commonDetailCd)});

            data.CA.map(sub => {
                // sub category render
                // top board
                const topBoardMainCategoryContainal = document.querySelector('#mainCate_' + commonDetailCd);
                const topBoardMainCategoryFirstNumber = topBoardMainCategoryContainal.id.split('_')[1];
                if(topBoardMainCategoryFirstNumber == sub.commonDetailCd.toString()[0]) {
                    const topBoardSubCategory_li_element = createAndAppendElement(topBoardMainCategoryContainal, 'li');
                    createAndAppendElement(topBoardSubCategory_li_element, 'a', {id: 'sub_' + sub.commonDetailCd, class: 'topBoardSubCategory'}, sub.commonDetailName);
                    topBoardSubCategoryClicked(document.getElementById('sub_' + sub.commonDetailCd));
                };
                
                // new board
                const newBoardMainCategoryContainal = document.querySelector('#newBoardMainCate_' + commonDetailCd);
                const newBoardMainCategoryFirstNumber = newBoardMainCategoryContainal.id.split('_')[1];
                if(newBoardMainCategoryFirstNumber == sub.commonDetailCd.toString()[0]) {
                    const newBoardSubCategory_li_element = createAndAppendElement(newBoardMainCategoryContainal, 'li');
                    createAndAppendElement(newBoardSubCategory_li_element, 'a', {id: 'newSub_' + sub.commonDetailCd, class: 'newBoardSubCategory'}, sub.commonDetailName);
                    newBoardSubCategoryClicked(document.getElementById('newSub_' + sub.commonDetailCd));
                };
            });
        });
    }
    ajaxRequest(firstPath + '/code', 'GET', {}, callback);
};
const topBoardSubCategoryClicked = (subCategoryElement) => {   // sub category를 통한 top board list ajax 호출
    const topBoardCategory = document.getElementsByClassName('topBoardCategory');
    const topBoardSubCategory = document.getElementsByClassName('topBoardSubCategory');
    subCategoryElement.addEventListener('click', (e) => {
        const mainCategoryElement = e.target.closest('ul').previousSibling;
        const mainCategory = e.target.closest('ul').previousSibling.getAttribute('data-cate');
        const subCategory = e.target.id.split('_')[1];

        Array.from(topBoardCategory).forEach(remove => {
            remove.classList.remove('selected');
        });
        mainCategoryElement.classList.add('selected');

        Array.from(topBoardSubCategory).forEach(remove => {
            remove.classList.remove('subCategorySelected');
            remove.parentNode.classList.remove('subCategorySelected');
        });
        e.target.classList.add('subCategorySelected');
        e.target.parentNode.classList.add('subCategorySelected');

        topBoardLsit(mainCategory, subCategory, 1);
    });
};
const newBoardSubCategoryClicked = (subCategoryElement) => {
    const newBoardCategory = document.getElementsByClassName('newBoardCategory');
    const newBoardSubCategory = document.getElementsByClassName('newBoardSubCategory');
    subCategoryElement.addEventListener('click', (e) => {
        const mainCategoryElement = e.target.closest('ul').previousSibling;
        const mainCategory = e.target.closest('ul').previousSibling.getAttribute('data-cate');
        const subCategory = e.target.id.split('_')[1];

        Array.from(newBoardCategory).forEach(remove => {
            remove.classList.remove('selected');
        });
        mainCategoryElement.classList.add('selected');

        Array.from(newBoardSubCategory).forEach(remove => {
            remove.classList.remove('subCategorySelected');
            remove.parentNode.classList.remove('subCategorySelected');
        });
        e.target.classList.add('subCategorySelected');
        e.target.parentNode.classList.add('subCategorySelected');

        newBoardList(mainCategory, subCategory, 1);
    });
}
const formatMoney = (money) => {    // 금액 포맷
    // 숫자를 문자열로 변환 후 역순으로 만들기
    const reversed = money.toString().split('').reverse().join('');

    // 3자리마다 쉼표 추가
    const formatted = reversed.replace(/(\d{3})(?=\d)/g, '$1,');

    // 역순으로 된 문자열을 다시 뒤집어서 최종 결과 얻기
    return formatted.split('').reverse().join('');
};
//------------------------------------------------------------------------
const PostsWithImagesAjax = (page) => {
    const data = { page: parseInt(page), amount : 4 };
    const callback = (data) => {
        console.log(data.paging);
        const page = parseInt(data.paging.page);
        const realEnd = parseInt(data.paging.realEnd);
        imgPostsCurrentPage = page;
        document.querySelector('.slides').innerHTML = '';
        document.querySelector('.slides').id = 'totalPage_' + realEnd;
        if(data.data != ''){
            data.data.map(item => {
                PostsWithImagesRender(item, document.querySelector('.slides'));
            });
        } else {
            const container = document.querySelector('.slides');
            const innerContainer = createAndAppendElement(container, 'div', {class: "imgNotPostContainer position-relative"});
            createAndAppendElement(innerContainer, 'h3', {class: "imgNotPost position-absolute top-50 start-50 translate-middle"}, '사진이 포함된 게시글이 없습니다.');
            container.appendChild(innerContainer);
            document.querySelector('.img-next').classList.add("hidden");
        }
    };
    ajaxRequest(firstPath + '/board/imgIn', 'GET', data, callback);
};
const PostsWithImagesRender = (data, container) => {
    const content = extractContent(data);
    let content_img = content.thumbnail;

    const li = createAndAppendElement(container, 'li');
    // img
    const imgContainer = createAndAppendElement(li, 'div');
    const imgLink = createAndAppendElement(imgContainer, 'a', {id: data.code + '_' + data.boardNo});
    const imgInnerContainer = createAndAppendElement(imgLink, 'div', {style:'text-align: center;'});
    createAndAppendElement(imgInnerContainer, 'img', {class: 'boardImgStyle', src : content_img});
    // category and user info
    const boardInformation = createAndAppendElement(li, 'div', {class : 'boardInformation mt-2'});
    const boardCateAndTitle = createAndAppendElement(boardInformation, 'div', {class : 'boardCateAndTitle'});
    const boardCateAndTitleLink = createAndAppendElement(boardCateAndTitle, 'a', {id: 'title_' + data.boardNo, class : 'boardCateAndTitleLink'});
    createAndAppendElement(boardCateAndTitleLink, 'span', {id: 'category' + data.code + '_' + data.boardNo});
    createAndAppendElement(boardCateAndTitleLink, 'span', {class : 'boardTitle'}, data.title);
    const userInfoContainer = createAndAppendElement(boardInformation, 'div', {class : 'userInfoArea mb-1'});
    createAndAppendElement(userInfoContainer, 'span', {}, '작성자: ' + data.id);
    const boardWriteDtArea = createAndAppendElement(boardInformation, 'div', {class : 'boardWriteDtArea mb-1'});
    createAndAppendElement(boardWriteDtArea, 'span', {}, formatTime_hhmm(data.writeDt));
    const boardViewAndReplyArea = createAndAppendElement(boardInformation, 'div', {class : 'boardViewAndReplyArea'});
    createAndAppendElement(boardViewAndReplyArea,'span', {},
                                    '<i class="fa-regular fa-eye"></i> ' + data.viewCount + ' ' + 
                                    '<i class="fa-regular fa-comment-dots" aria-hidden="true"></i> ' + data.replyCount + ' ' + 
                                    '<i class="fa-regular fa-thumbs-up"></i> ' + data.likeCount);
    
    let boardTitleLink = document.getElementById('title_' + data.boardNo);
    let boardImgLink = document.getElementById(data.code + '_' + data.boardNo);
    let boardCategory = document.getElementById('category' + data.code + '_' + data.boardNo);
    if(data.code == 10) {
        boardTitleLink.setAttribute('href', firstPath + '/board/dress/all/' + data.boardNo);
        boardImgLink.setAttribute('href', firstPath + '/board/dress/all/' + data.boardNo);
        boardCategory.textContent = '[옷] ';
    } else if(data.code == 20) {
        boardTitleLink.setAttribute('href', firstPath + '/board/art/' + data.boardNo); 
        boardImgLink.setAttribute('href', firstPath + '/board/art/' + data.boardNo); 
        boardCategory.textContent = '[음악] ';
    } else if(data.code == 30) {
        boardTitleLink.setAttribute('href', firstPath + '/board/music/' + data.boardNo);
        boardImgLink.setAttribute('href', firstPath + '/board/music/' + data.boardNo);
        boardCategory.textContent = '[미술] ';
    };
    container.appendChild(li);
};
const extractContent = (data) => {
    let parser = new DOMParser();
    let content = parser.parseFromString(data.content, 'text/html');

    // 이미지는 첫 번째 이미지만 가져오기
    let firstImg = content.querySelector('figure.image img');
    let firstImgSrcHtml = firstImg ? firstImg.getAttribute('src') : '';

    // 단락은 모든 내용 가져오기
    let previewText = Array.from(content.querySelectorAll('p')).map(p => p.textContent).join(' ');
    let previewHtml = previewText ? '<p>' + previewText + '</p>' : '';

    return {
        thumbnail: firstImgSrcHtml || '<p>이미지 없음</p>',
        preview: previewHtml || '<p>내용 없음</p>'
    };
};
let imgPostsCurrentPage = 1;
const PostsWhthImagesPagenation = () => {
    const prevButton = document.querySelector('.img-prev');
    const nextButton = document.querySelector('.img-next');
    prevButton.addEventListener('click', () => {
        nextButton.classList.remove("hidden");
        const currentPage = --imgPostsCurrentPage;
        if(imgPostsCurrentPage === 1) {
            prevButton.classList.add("hidden");
        };
        PostsWithImagesAjax(currentPage);
    });
    
    nextButton.addEventListener('click', () => {
        const realEnd = parseInt(document.querySelector('.slides').getAttribute("id").split("_")[1]);
        const currentPage = ++imgPostsCurrentPage;
        prevButton.classList.remove("hidden");
        if(imgPostsCurrentPage == realEnd) {
            PostsWithImagesAjax(currentPage);
            nextButton.classList.add("hidden");
        } else {
            nextButton.classList.remove("hidden");
            PostsWithImagesAjax(currentPage);
        }
    });
};
//------------------------------------------------------------------------
// ajax list
commonCodeAjax();
bookSearch();
newsSearch();
createBookComponent(firstPath, 1, "all");
createNewsComponent(firstPath, 1, "all");

PostsWithImagesAjax(imgPostsCurrentPage);
PostsWhthImagesPagenation();
newBoardList(0, 0, 1);
topBoardLsit(0, 0, 1);

// 페이지 로드 후 데이터 가져오기
window.onload = function() {
    bookPageChangeBnt();
    newsPageChangeBnt();
};