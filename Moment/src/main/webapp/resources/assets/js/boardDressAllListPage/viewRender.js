import { pagenation, pagenationNumber } from "./pagenation.js";
import { formatTimestamp } from "../common/common.js";

const contentContainer = document.getElementById('contentListTest');
const contextPath = document.getElementById('contextPath').value;
let currentView = 'cardsType'; // 기본적으로 앨범형으로 시작
let criteriaListType = document.getElementById('criteriaListType').value;

// 이미지와 단락을 추출하는 함수
function extractContent(data) {
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
}

// 리스트형 렌더링
const createTable = (posts) => {
    let listTypeDiv = document.createElement('div');
    if(posts.length != 0) {
        listTypeDiv.className = 'listType';
        const table = document.createElement('table');
        table.classList.add('table','table-bordered');
        table.id = 'boardList';

        // colgroup 추가
        const colgroup = document.createElement('colgroup');
        const colWidths = ['10%', '35%', '20%', '20%', '15%'];
        colWidths.forEach(width => {
            const col = document.createElement('col');
            col.style.width = width;
            colgroup.appendChild(col);
        });
        table.appendChild(colgroup);

        //테이블 제목
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        tr.className = 'text-center';
        const headers = ['번호', '제목', '작성자', '작성일', '조회수'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);

        //테이블 내용(게시글)
        const tbody = document.createElement('tbody');

        posts.forEach(post => {
            let replyCount = post.replyCount;
            const row = document.createElement('tr');
            const data = [post.boardNo, post.title, post.id, formatTimestamp(post.writeDt), post.view];

            data.forEach((cellText, index) => {
                const td = document.createElement('td');
                if (index === 1) { // 제목 열인 경우
                    const titleA = document.createElement('a');
                    titleA.setAttribute('href', contextPath + '/board/dress/all/' + (post.boardNo));
                    titleA.innerHTML = cellText +
                                        ' <span style="color:red;">[' + replyCount +  ']</span>';
                    td.appendChild(titleA);
                } else {
                    td.textContent = cellText;
                };
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        listTypeDiv.appendChild(table);
    };
    return listTypeDiv;
};

// 앨범형, 카드형 렌더링
const createPostElement = (post) => {
    const postElement = document.createElement('div');
    postElement.className = 'postType';
    const extractedContent = extractContent(post);

    let boardNo = post.boardNo;
    let boardTitle = post.title;                  // 제목
    let boardImg = extractedContent.thumbnail;   // 게시글 이미지
    let boardContent = extractedContent.preview; // 게시글 내용

    let boardWriter = post.id;                          // 닉네임
    let boardWriteDt = formatTimestamp(post.writeDt);   // 시간
    let boardView = post.view;                          // 조회수
    let boardReplyCount = post.replyCount;              // 댓글개수

    switch (currentView) {
        case 'cardsType':
            //카드형에 적용되어있는 css 클래스 삭제
            postElement.classList.remove('postType');
            postElement.classList.add('postAlbumType');
            /*  전체                       -> card_area
                제목,내용,닉넴...           -> con
                제목,내용                  -> con_top
                닉넴/작성일/조회/댓글        -> con_bottom
                이미지                     -> movie-img

                제목                            |
                내용                            | 이미지
                닉넴 / 작성일 / 조회 / 댓글       |
            */

            //
            let albumTypeUi = document.createElement('ui');
            let albumTypeIl = document.createElement('li');
            
            let albumTypeDiv = document.createElement('div');       //card_area
            albumTypeDiv.className = 'card_area';
            
            let albumTypeDiv_1 = document.createElement('div');     //con
            albumTypeDiv_1.className = 'con';
            
            let albumTypeDiv_1_1 = document.createElement('div');   //con_top
            albumTypeDiv_1_1.className = 'con_top';

            let albumTypeDiv_1_1_1 = document.createElement('div');
            albumTypeDiv_1_1_1.className = 'tit_area';
            albumTypeDiv_1_1_1.innerHTML = '<a href="' + (contextPath + '/board/dress/all/' + boardNo) +  '">' + boardTitle +'</a>';
            albumTypeDiv_1_1.appendChild(albumTypeDiv_1_1_1);

            albumTypeDiv_1_1.innerHTML += '<a href="#">' + boardContent + '</a>'
            // con = con + con_top
            albumTypeDiv_1.appendChild(albumTypeDiv_1_1);
            
            let albumTypeDiv_1_2 = document.createElement('div');   //con_bottom
            albumTypeDiv_1_2.className = 'con_bottom';

            //user_info
            let albumTypeDiv_1_2_1 = document.createElement('div');
            albumTypeDiv_1_2_1.className = 'user_info';
            albumTypeDiv_1_2_1.innerHTML = boardWriter + ' ';
            albumTypeDiv_1_2.appendChild(albumTypeDiv_1_2_1);

            //date_num
            let albumTypeDiv_1_2_2 = document.createElement('div');
            albumTypeDiv_1_2_2.className = 'date_num';

            let albumTypeDiv_1_2_2_sapn_1 = document.createElement('span');     // 시간
            albumTypeDiv_1_2_2_sapn_1.innerText = boardWriteDt;
            albumTypeDiv_1_2_2.appendChild(albumTypeDiv_1_2_2_sapn_1);

            let albumTypeDiv_1_2_2_sapn_2 = document.createElement('span');     // 조회수
            albumTypeDiv_1_2_2_sapn_2.innerText = '조회 ' + boardView;
            albumTypeDiv_1_2_2.appendChild(albumTypeDiv_1_2_2_sapn_2);
            
            let albumTypeDiv_1_2_2_sapn_3 = document.createElement('span');     // 댓글수
            albumTypeDiv_1_2_2_sapn_3.innerText = '댓글 ' + boardReplyCount;
            albumTypeDiv_1_2_2.appendChild(albumTypeDiv_1_2_2_sapn_3);

            albumTypeDiv_1_2.appendChild(albumTypeDiv_1_2_2);               // con_bottom 최종

            // con = con + con_top + con_bottom
            albumTypeDiv_1.appendChild(albumTypeDiv_1_2);                   // con 최종
            
            // card_area = card_area + con(con_top + con_bottom)
            albumTypeDiv.appendChild(albumTypeDiv_1);                       // card_area 최종
            
            let albumTypeDiv_2 = document.createElement('div');     //movie-img
            albumTypeDiv_2.className = 'movie-img';

            // <a><a/>
            let albumTypeDiv_2_1 = document.createElement('a');
            albumTypeDiv_2_1.setAttribute('href', '#');
            if(boardImg === '<p>이미지 없음</p>') {
                albumTypeDiv_2.style.opacity = '0';
                albumTypeDiv_2_1.removeAttribute('href');
            } else {
                // <a><img/></a>
                let albumTypeDiv_2_1_1 = document.createElement('img');
                albumTypeDiv_2_1_1.setAttribute('src', boardImg);
                albumTypeDiv_2_1_1.setAttribute('alt', boardTitle);
                albumTypeDiv_2_1_1.setAttribute('width', 120);
                albumTypeDiv_2_1_1.setAttribute('height', 120);
                albumTypeDiv_2_1.appendChild(albumTypeDiv_2_1_1);
            }
            
            albumTypeDiv_2.appendChild(albumTypeDiv_2_1);

            // card_area = card_area + con(con_top + con_bottom) + movie-img
            albumTypeDiv.appendChild(albumTypeDiv_2);
            
            // li = li + card_area + con(con_top + con_bottom) + movie-img
            albumTypeIl.appendChild(albumTypeDiv);
            // ul = ul + li + card_area + con(con_top + con_bottom) + movie-img
            albumTypeUi.appendChild(albumTypeIl);

            //최종 div 붙혀넣기
            postElement.appendChild(albumTypeUi);

            break;

        case 'albumType':
            let cardsTypeDiv = document.createElement('div');
            cardsTypeDiv.classList.add('cardType', 'mr-3');
            /* 이미지
                제목
                작성자
                시간/조회수
            */
            //이미지
            let cardsImgAtag = document.createElement('a');
            cardsImgAtag.setAttribute('href', contextPath + '/board/dress/all/' + boardNo);

            let cardsImg = document.createElement('img');
            cardsImg.className = 'albumTypeImg';
            if(boardImg === '<p>이미지 없음</p>') {
                cardsImg.setAttribute('src', contextPath + '/assets/images/noImages.png');
            } else {
                // <a><img/></a>
                cardsImg.setAttribute('src', boardImg);
                cardsImg.setAttribute('alt', boardTitle);
            }
            cardsImgAtag.appendChild(cardsImg);
            cardsTypeDiv.appendChild(cardsImgAtag);
            
            //제목
            let cardsP = document.createElement('p');
            cardsP.innerText = boardTitle;
            cardsP.className = 'cardsPStyle';
            cardsTypeDiv.appendChild(cardsP);

            //작성자
            let cardsWriter = document.createElement('p');
            cardsWriter.innerText = boardWriter;
            cardsTypeDiv.appendChild(cardsWriter);

            //시간&조회수
            let coardsDtAndView = document.createElement('p');
            coardsDtAndView.style.fontSize = '11px';

            //시간
            let coardsDt = document.createElement('span');
            coardsDt.innerText = boardWriteDt + ' ';
            coardsDtAndView.appendChild(coardsDt);

            //조회수
            let coardsView = document.createElement('span');
            coardsView.innerText = ' ⦁ 조회 ' + boardView;
            coardsDtAndView.appendChild(coardsView);

            cardsTypeDiv.appendChild(coardsDtAndView);

            //전체 붙혀넣기
            postElement.appendChild(cardsTypeDiv);
            break;
    };
    return postElement;
};

// ajax를 통해 받아온 data를 forEach 돌려서 리스트 양식에 맞게 화면을 뿌림.
const renderPostsContent = (posts) => {
    // 기존 내용 지우기 : currentView는 기본 albumType으로 설정되어 있음.
    contentContainer.innerHTML = '';
    switch (currentView) {
        case 'albumType':
            const albumContainer = document.createElement('div');
            albumContainer.className = 'albumType';
            posts.forEach(post => {
                const postElement = createPostElement(post);
                albumContainer.appendChild(postElement);
            });
            contentContainer.appendChild(albumContainer);
            break;
        case 'cardsType':
            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'cardsType';
            posts.forEach(post => {
                const postElement = createPostElement(post);
                cardsContainer.appendChild(postElement);
            });
            contentContainer.appendChild(cardsContainer);
            break;
        case 'listType':
            const table = createTable(posts);
            contentContainer.appendChild(table);
            break;
    };
};

export const renderPosts = (page, category, searchType, searchName) => {
    // Ajax로 서버에서 데이터 가져오기
    let amount = $('#criteriaAmount').val();

    // const dataForm = {page : page , amount : amount, category : category, code : code, searchType : searchType, searchName : searchName};
    
    $.ajax({
        url: contextPath + '/board/dress/all?page=' + page + '&amount=' + amount + '&category=' + category + '&code=10&searchType=' + searchType + '&searchName=' + searchName ,
        method: 'GET',
        // data : dataForm,
        dataType: 'json',
        success: function(posts) {
            if(posts == 0 || posts == ''){
                let containerInDiv = document.createElement('div');
                containerInDiv.className = 'contentNotData';

                let containerInInDiv = document.createElement('div');
                containerInInDiv.classList.add('d-flex','justify-content-center','inner-div');

                let containerInInDivH3 = document.createElement('h3');
                containerInInDivH3.innerText = '조회할 게시글이 없습니다.';

                containerInInDiv.append(containerInInDivH3);
                containerInDiv.append(containerInInDiv);
                contentContainer.append(containerInDiv);
            } else {
                renderPostsContent(posts);
            }
        },
        error: function(error) {
            console.error('데이터를 가져오는 중 에러가 발생했습니다.', error);
        }
    });
};

// 페이지 로딩 시 검색어 설정
const setPageValues = () => {
    let searchNameInput = document.getElementById('searchName');
    // 현재 URL의 쿼리 문자열을 파싱하여 URLSearchParams 객체를 생성
    // window.location.search는 현재 URL의 쿼리 문자열을 나타냅니다.
    let urlParams = new URLSearchParams(window.location.search);
    //URLSearchParams 객체에서 'searchName'이라는 파라미터의 값을 가져온다. 이는 검색어를 가져온다.
    let searchName = urlParams.get('searchName');

    // URL에서 검색어가 있을 경우, 입력란에 설정
    // 검색어가 URL에 존재하는 경우에만 아래의 코드 블록을 실행
    if (searchName !== null) {
        // URL에서 가져온 검색어를 디코딩한 후 검색 입력란에 설정한다.
        // decodeURIComponent 함수 : URL 인코딩된 문자열을 디코딩하는 함수
        // URL에서는 일반적으로 한글이나 특수 문자 등을 안전하게 전달하기 위해 인코딩
        searchNameInput.value = decodeURIComponent(searchName);
    }
};

// 페이지 로딩 시 호출
setPageValues();

const showPosts = (view) => {
    let listTypeValue = document.getElementById('criteriaListType');
    let page = document.getElementById('criteriaPage').value;
    let category = document.getElementById('criteriaCategory').value;
    let searchType = document.getElementById('searchType').value;
    let searchName = document.getElementById('searchName').value;

    currentView = view;
    listTypeValue.value = view;
    pagenation(view);
    pagenationNumber(view);
    renderPosts(page, category, searchType, searchName);
};

if(criteriaListType == ''){
    // pagenation.js
    pagenationNumber('');
    pagenation('');
    
    showPosts(currentView);
} else {
    showPosts(criteriaListType);
};

// 게시글 양식에 맞춰 렌더링
export const boardListFormChang = () => {
    let boardListFormChang = document.querySelectorAll('.boardListFormChangeBtn');

    boardListFormChang.forEach( function(link) {
        link.addEventListener('click', function() {
            // 클릭한 요소의 ID 값을 가져온다.
            let clickedId = link.id;
            showPosts(clickedId);
            resetIcons();           //모든 아이콘 원래대로 돌림

            let typeElement = document.querySelector('.boardType[data-type="' + clickedId + '"]');
            let contextPath = document.getElementById('contextPath').value;

            if(clickedId) {
                contentContainer.innerHTML = '';
                let dataTypeAttribute = typeElement.getAttribute('data-type');

                if (dataTypeAttribute == 'listType') {
                    typeElement.setAttribute('src', contextPath + '/assets/icon/sortListSelected.svg');
                } else if (dataTypeAttribute == 'albumType') {
                    typeElement.setAttribute('src', contextPath + '/assets/icon/sortAlbumSelected.svg');
                } else if (dataTypeAttribute == 'cardsType') {
                    typeElement.setAttribute('src', contextPath + '/assets/icon/sortCardSelected.svg');
                }
            }
        });
    });

    // 모든 아이콘을 원래대로 돌리는 함수
    function resetIcons() {
        var allIcons = document.querySelectorAll('.boardType');
        var contextPath = document.getElementById('contextPath').value;

        allIcons.forEach(function (icon) {
            contentContainer.innerHTML = '';
            var dataTypeAttribute = icon.getAttribute('data-type');

            if (dataTypeAttribute === 'listType') {
                icon.setAttribute('src', contextPath + '/assets/icon/sortList.svg');
            } else if (dataTypeAttribute === 'albumType') {
                icon.setAttribute('src', contextPath + '/assets/icon/sortAlbum.svg');
            } else if (dataTypeAttribute === 'cardsType') {
                icon.setAttribute('src', contextPath + '/assets/icon/sortCard.svg');
            }
        });
    }
};

// 선택된 카테고리 색상 변경
export const initCategory = () => {
    let category = document.getElementById('criteriaCategory').value;
    if (category) {
        // URL에서 추출한 카테고리에 해당하는 요소에 선택 클래스 추가
        let categoryElement = document.querySelector('.menuCategoryATag[data-category="' + category + '"]');
        if (categoryElement) {
            categoryElement.classList.add('selected');
        }
    }
};

// 선택된 페이지 색상 변경
export const initPage = () => {
    let category = document.getElementById('criteriaPage').value;
    if (category) {
        // URL에서 추출한 카테고리에 해당하는 요소에 선택 클래스 추가
        let categoryElement = document.querySelector('.pageNumber[data-page="' + category + '"]');
        if (categoryElement) {
            categoryElement.classList.add('selected');
        }
    }
};