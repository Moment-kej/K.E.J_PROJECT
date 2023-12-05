import { pagenation, pagenationNumber } from "./pagenation.js";

const contentContainer = document.getElementById('contentListTest');
const contextPath = document.getElementById('contextPath').value;
let currentView = 'albumType'; // 기본적으로 앨범형으로 시작
let criteriaListType = document.getElementById('criteriaListType').value;

//시간포맷
const formatTimestamp = (timestamp) => {
    // 밀리초로 표현된 시간 데이터를 Date 객체로 변환
    const date    = new Date(timestamp);
    // 날짜 및 시간 정보 추출
    const year    = date.getFullYear();
    const month   = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day     = String(date.getDate()).padStart(2, '0');
    const hours   = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // 포맷에 맞게 문자열 반환
    const formattedDate = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes;

    return formattedDate;
};

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
            // th.style.border = '1px solid #ddd';
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
            const data = [post.boardNo, post.title, post.writer, formatTimestamp(post.writeDt), post.view];

            data.forEach((cellText, index) => {
                const td = document.createElement('td');
                // td.style.border = '1px solid #ddd';
                // td.style.padding = '8px';
                // td.style.textAlign = 'left';
                if (index === 1) { // 제목 열인 경우
                    const titleA = document.createElement('a');
                    titleA.setAttribute('href','#');
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

    let boardTitle = post.title;                        // 제목
    let boardContent = post.content;                    // 게시글 내용
    let boardContentEx = '글내용놔둘곳';                   // 게시글 내용 대타
    let boardImg = post.Img;                            // 이미지
    let boardWriter = post.writer;                      // 닉네임
    let boardWriteDt = formatTimestamp(post.writeDt);   // 시간
    let boardView = post.view;                          // 조회수
    let boardReplyCount = post.replyCount;              // 댓글개수

    switch (currentView) {
        case 'albumType':
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
            albumTypeDiv_1_1_1.innerHTML = '<a href="#">' + boardTitle +'</a>';
            albumTypeDiv_1_1.appendChild(albumTypeDiv_1_1_1);

            albumTypeDiv_1_1.innerHTML += '<a href="#">' + boardContentEx + '</a>'
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

            // <a><img/></a>
            let albumTypeDiv_2_1_1 = document.createElement('img');
            albumTypeDiv_2_1_1.setAttribute('src', contextPath + '/assets/images/스크린샷 2023-09-06 163745.png');
            albumTypeDiv_2_1_1.setAttribute('alt', boardTitle);
            albumTypeDiv_2_1_1.setAttribute('width', 120);
            albumTypeDiv_2_1_1.setAttribute('height', 120);
            
            albumTypeDiv_2_1.appendChild(albumTypeDiv_2_1_1);
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

        case 'cardsType':
            let cardsTypeDiv = document.createElement('div');
            cardsTypeDiv.className = 'cardType';
            /* 이미지
                제목
                작성자
                시간/조회수
            */
            //이미지
            let cardsImg = document.createElement('img');
            cardsImg.className = 'boardListImg';
            cardsImg.setAttribute('src' , contextPath + '/assets/images/스크린샷 2023-09-06 163745.png');
            cardsImg.setAttribute('alt', boardTitle);
            cardsTypeDiv.appendChild(cardsImg);
            
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

const renderPosts = () => {
    // Ajax로 서버에서 데이터 가져오기
    let page = $('#criteriaPage').val();
    let amount = $('#criteriaAmount').val();
    let category = $('#criteriaCategory').val();
    let code = $('#criteriaCode').val();

    const dataForm = {page : page , amount : amount, category : category, code : code};
    
    $.ajax({
        url: contextPath + '/board/temp',
        method: 'GET',
        data : dataForm,
        dataType: 'json',
        success: function(posts) {
            renderPostsContent(posts);
        },
        error: function(error) {
            console.error('데이터를 가져오는 중 에러가 발생했습니다.', error);
        }
    });
};

const showPosts = (view) => {
    let listTypeValue = document.getElementById('criteriaListType');

    currentView = view;
    listTypeValue.value = view;
    pagenation(view);
    pagenationNumber(view);
    renderPosts();
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
    var boardListFormChang = document.querySelectorAll('.boardListFormChangeBtn');
    boardListFormChang.forEach( function(link) {
        link.addEventListener('click', function() {
            // 클릭한 요소의 ID 값을 가져온다.
            var clickedId = link.id;
            showPosts(clickedId);
        });
    });
};