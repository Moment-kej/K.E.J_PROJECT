<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/eunae/boardDressPage.css"/>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <!--게시글 전체 목록 장소-->
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <!--제목, 카테고리 div-->
                        <div class="boardCategoryInfo">
                            <c:forEach var="item" items="${code.CO}">
                                <c:if test="${item.commonDetailCd == 10}">
                                    <div class="card-title"><h2>${item.commonDetailName} 게시판</h2></div>
                                    <div class="d-flex justify-content-center menuCategoryDiv">
                                        <ul class="menuCategory">
                                            <li><a id="0" class="AllListView">전체보기</a></li>
                                            <c:forEach var="coDetailList" items="${code.CA}">
                                                <c:if test="${coDetailList.commonDetailEx eq '옷 카테고리'}">
                                                    <li>
                                                        <a id="${coDetailList.commonDetailCd}">${coDetailList.commonDetailName}</a>
                                                    </li>
                                                </c:if>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                </c:if>
                            </c:forEach>
                        </div>
                        <!-- 게시글 보기 양식 정하는 장소 -->
                        <div class="boardListForm">
                            <div class="boardListFormBtn">
                                <a onclick="showPosts('albumType')" class="boardListFormChangeBtn"><i class="fas fa-th-large"></i></a>
                                <a onclick="showPosts('cardsType')" class="boardListFormChangeBtn"><i class="fas fa-th-list"></i></a>
                                <a onclick="showPosts('listType')" class="boardListFormChangeBtn"><i class="fas fa-bars"></i></a>
                            </div>
                            <div class="listSizeSelect">
                                <!-- 한번에 보여줄 개수 정하기 -->
                                <form action="1" class="minisrch_form" name="actionForm" >
                                    <fieldset>
                                        <select id="handleAmount" onchange="Change(1, ${criteria.category})">
                                            <option value="10" ${pageVO.amount == 10 ? 'selected' : ''}>10개씩</option>
                                            <option value="20" ${pageVO.amount == 20 ? 'selected' : ''}>20개씩</option>
                                            <option value="30" ${pageVO.amount == 30 ? 'selected' : ''}>30개씩</option>
                                            <option value="40" ${pageVO.amount == 40 ? 'selected' : ''}>40개씩</option>
                                        </select>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                        <div style="clear:both"></div>

                        <!--게시글 양식에 맞춰 게시글 목록 나오는 장소-->
                        <c:if test="${list.isEmpty()}">
                            <div class="contentNotData">
                                <div class="d-flex justify-content-center inner-div">
                                    <h3>조회할 게시글이 없습니다.</h3>
                                </div>
                            </div>
                        </c:if>
                        <div>
                            <div id="contentListTest"></div>
                        </div>
                        <!--글쓰기 버튼-->
                        <div class="writingBntDiv">
                            <button type="button" class="btn btn-inverse-success btn-md" id="writingBnt">글쓰기</button>
                        </div>
                        <!--확인용 div-->
                        <div>
                            <p>확인용 >> ${criteria}</p>
                            <!-- <input type="text" name="contextPath" id="contextPath" value="${pageContext.request.contextPath}"> -->
                            <input type="hidden" name="page" id="criteriaPage" value="${criteria.page}">
                            <input type="hidden" name="amount" id="criteriaAmount" value="${criteria.amount}">
                            <input type="hidden" name="category" id="criteriaCategory" value="${criteria.category}">
                            <input type="hidden" name="listType" id="criteriaListType" value="${criteria.listType}">
                            <input type="hidden" name="pageStart" id="pageVOStart" value="${pageVO.start-1}">
                            <input type="hidden" name="pageEnd" id="pageVOEnd" value="${pageVO.end+1}">
                            <input type="hidden" name="pagerealEnd" id="pageVORealEnd" value="${pageVO.realEnd}">
                        </div>
                        <!-- pagination -->
                        <div class="pagination d-flex justify-content-center">
                            <!-- 5. 맨 처음으로 -->
                            <a id="pageNumberOne" class="firstpage pbtn">
                                &laquo;&laquo;
                            </a>
                            
                            <!-- 3.이전페이지네이션 -->
                            <c:if test="${pageVO.prev}">
                            <a id="pageStart" class="prevpage pbtn">
                                &laquo;
                            </a>
                            </c:if>
                            
                            <!-- 1.페이지네이션 -->
                            <c:forEach var="num" begin="${pageVO.start}" end="${pageVO.end}">
                            <a class="pageNumber">
                                <span class="pagenum ${pageVO.page == num ? 'currentpage' : '' }currentpage">${num}</span>
                            </a>
                            </c:forEach>
                            
                            <!-- 2.다음페이지네이션 -->
                            <c:if test="${pageVO.next}">
                            <a id="pageNext" class="nextpage pbtn">
                                &raquo;
                            </a>
                            </c:if>
                            
                            <!-- 4. 맨 마지막으로 -->
                            <a id="pageRealEnd" class="lastpage pbtn">
                                &raquo;&raquo;
                            </a>
                        </div><!-- pagination end -->
                        <!-- search div -->
                        <div class="col-lg-12 pt-5">
                            <div class="d-flex justify-content-center grid-margin">
                                <div style="display: flex;">
                                    <select name="category" id="boardCategory">
                                        <option value="0">카테고리</option>
                                        <c:forEach var="coDetailList" items="${code.CA}">
                                            <c:if test="${coDetailList.commonDetailEx eq '옷 카테고리'}">
                                                <option value="${coDetailList.commonDetailCd}">${coDetailList.commonDetailName}</option>
                                            </c:if>
                                        </c:forEach>
                                    </select>
                                    <select name="searchType" id="searchType">
                                        <option value="">게시글 + 댓글</option>
                                        <option value="">제목만</option>
                                        <option value="">글작성자</option>
                                        <option value="">댓글내용</option>
                                        <option value="">댓글작성자</option>
                                    </select>
                                    <input type="text" class="form-control boardSearchInput" placeholder="입력해주세요" aria-describedby="button-addon2">
                                    <button class="btn btn-outline-dark btn-fw" type="button" id="button-addon2">Search</button>
                                </div>
                            </div>
                        </div> <!-- search div end-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    const contentContainer = document.getElementById('contentListTest');
    let currentView = 'albumType'; // 기본적으로 앨범형으로 시작

    function showPosts(view) {
        let listTypeValue = document.getElementById('criteriaListType');

        currentView = view;
        listTypeValue.value = view;
        pagenation(view);
        pagenationNumber(view);
        renderPosts();
    };

    function createTable(posts) {
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

            // if(posts == null || posts == '' || posts == undefined){
            //     let notDataTr = document.createElement('tr');
            //     notDataTr.setAttribute('colspan', 5);
            //     let notDataTd = document.createElement('td');
            //     notDataTd.setAttribute('colspan', 5);
            //     notDataTd.setAttribute('id', 'boardNotList');
            //     let notDataH3 = document.createElement('h3');
            //     notDataH3.innerText = '조회할 게시글이 없습니다.';

            //     notDataTd.appendChild(notDataH3);
            //     notDataTr.appendChild(notDataTd);
            //     tbody.appendChild(notDataTr);
            // } else {
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
            // };

            table.appendChild(tbody);
            listTypeDiv.appendChild(table);
        };
        return listTypeDiv;
    };

    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = 'postType';

        let boardTitle = post.title;    //제목
        let boardContent = post.content;
        let boardContentEx = '글내용놔둘곳';
        let boardImg = post.Img;        //이미지
        let boardWriter = post.writer;  //닉네임
        let boardWriteDt = formatTimestamp(post.writeDt);//시간
        let boardView = post.view;      //조회수
        let boardReplyCount = post.replyCount;  //댓글개수

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

                albumTypeDiv_1_2_2_sapn_1 = document.createElement('span');     // 시간
                albumTypeDiv_1_2_2_sapn_1.innerText = boardWriteDt;
                albumTypeDiv_1_2_2.appendChild(albumTypeDiv_1_2_2_sapn_1);

                albumTypeDiv_1_2_2_sapn_2 = document.createElement('span');     // 조회수
                albumTypeDiv_1_2_2_sapn_2.innerText = '조회 ' + boardView;
                albumTypeDiv_1_2_2.appendChild(albumTypeDiv_1_2_2_sapn_2);
                
                albumTypeDiv_1_2_2_sapn_3 = document.createElement('span');     // 댓글수
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
                albumTypeDiv_2_1_1.setAttribute('src', '${pageContext.request.contextPath}/assets/images/스크린샷 2023-09-06 163745.png');
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

                // postElement.innerHTML
                //     = `<img class="boardListImg" src="${pageContext.request.contextPath}/assets/images/스크린샷 2023-09-06 163745.png" alt="${post.title}"><p>${post.title}</p>`;
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
                cardsImg.setAttribute('src' , '${pageContext.request.contextPath}/assets/images/스크린샷 2023-09-06 163745.png');
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

    function renderPosts() {
        // Ajax로 서버에서 데이터 가져오기
        let page = $('#criteriaPage').val();
        let amount = $('#criteriaAmount').val();
        let category = $('#criteriaCategory').val();
        const dataForm = {page : page , amount : amount, category : category, code : 10};
        
        $.ajax({
            url: '${pageContext.request.contextPath}/board/temp',
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
    renderPosts();

    // ajax를 통해 받아온 data를 forEach 돌려서 리스트 양식에 맞게 화면을 뿌림.
    function renderPostsContent(posts) {
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

    //시간포맷
    function formatTimestamp(timestamp) {
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
    }
</script>

<script type="text/javascript">
    //폼변경
    let criteriaListType = document.getElementById('criteriaListType');

    if(criteriaListType.value == '') {
        // 위에서 앨범형을 기본으로 셋팅했기 때문에 따로 지정해줄 필요없음.
        pagenation('');
        pagenationNumber('');
    } else {
        showPosts(criteriaListType.value);
    };

    // 글쓰기 버튼 클릭 이벤트
    $("#writingBnt").click(()=>{
        let writingLink = '${pageContext.request.contextPath}/board/3/1';
        window.location.href = writingLink;     // 현재 창으로 링크 열기
    });

    // a tag 읽어와서 Change 함수를 통해 category에 맞게 board list 반영
    var aTag = document.querySelectorAll('.menuCategory a');
    aTag.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // 클릭한 요소의 ID 값을 가져온다.
            var clickedId = link.id;
            Change(1, clickedId);
        });
    });
    
    // 페이지네이션 <<, <, >, >> , 전체보기
    function pagenation(listType) {
        // 맨 끝 페이지 수가 0이 아니라면 <<, >> 화면에 표시하기
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
                                        '${pageContext.request.contextPath}/board/1?page=1&amount=' + selectedValue +
                                        '&category=0' +
                                        '&listType=' + listType);
            pageNumberOne.setAttribute('href',
                                        '${pageContext.request.contextPath}/board/1?page=1&amount=' + selectedValue +
                                        '&category=' + 0 +
                                        '&listType=' + listType);
            pageRealEnd.setAttribute('href',
                                        '${pageContext.request.contextPath}/board/1?page=' + pagerealEnd_v +
                                        '&amount=' + selectedValue +
                                        '&category=' + category +
                                        '&listType=' + listType);
            if(pageStart_v != false && pageEnd_v != false ) {
                pageStart.setAttribute('href', 
                                            '${pageContext.request.contextPath}/board/1?page=' + pageStart_v +
                                                '&amount=' + selectedValue +
                                                '&category=' + category +
                                                '&listType=' + listType);
                pageNext.setAttribute('href', 
                                            '${pageContext.request.contextPath}/board/1?page=' + pageEnd_v +
                                                '&amount=' + selectedValue +
                                                '&category=' + category +
                                                '&listType=' + listType);
            }
        } else {
            // 맨 끝 페이지가 0이면 <<, >> display none
            pageNumberOne.style.display = 'none';
            pageRealEnd.style.display = 'none';
        }
    };

    //페이지네이션 1,2,3,4... number
    function pagenationNumber(listType) {
        document.querySelectorAll('.pageNumber').forEach((anchor, index) => {
            // anchor -> 빈값
            let category    = document.getElementById('criteriaCategory').value;
            let pagenum     = document.getElementById('criteriaPage').value;
            let nowPaging   = document.querySelector('#handleAmount option:checked');
            let selectedValue = nowPaging.value;
            let listType    = document.getElementById('criteriaListType').value;
            let pageNum     = index + 1 ;
            
            anchor.setAttribute('id', 'pageNumber_' + pageNum);
            let pageNumHref = '${pageContext.request.contextPath}/board/1?page=' + pageNum 
                            + '&amount=' + selectedValue 
                            + '&category=' + category
                            + '&listType=' + listType;
            anchor.setAttribute('href', pageNumHref);
        });
    };

    // 게시글 목록 수 : 10개씩, 20개씩 ... 40개씩
    function Change(idx, category) {
        let listType = document.getElementById('criteriaListType').value;
        let pagenum = idx;
        let nowPaging_el   = document.querySelector('#handleAmount option:checked');
        let nowPaging = nowPaging_el.value;

        if(nowPaging == 10){
            location.href="${pageContext.request.contextPath}/board/1?page="+pagenum+"&amount="+nowPaging+"&category=" + category + "&listType=" + listType;
        }else if(nowPaging == 20){
            location.href="${pageContext.request.contextPath}/board/1?page="+pagenum+"&amount="+nowPaging+"&category=" + category + "&listType=" + listType;    
        }else if(nowPaging == 30){
            location.href="${pageContext.request.contextPath}/board/1?page="+pagenum+"&amount="+nowPaging+"&category=" + category + "&listType=" + listType;    
        }else if(nowPaging == 40){
            location.href="${pageContext.request.contextPath}/board/1?page="+pagenum+"&amount="+nowPaging+"&category=" + category + "&listType=" + listType;    
        }
    };
</script>