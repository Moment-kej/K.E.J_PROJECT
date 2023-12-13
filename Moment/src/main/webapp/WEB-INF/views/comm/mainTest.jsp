<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/eunae/mainPage.css">
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="row">
                <div class="col-md-5 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">추천도서</p>
                            <!-- book category -->
                            <div class="newsCategoryChange mb-2">
                                <a onclick="createBookComponent('/moment', 1, 'all')" id="allLink" class="categoryLink">전체</a>
                                <c:forEach var="cBoardlist" items="${code.CO}">
                                <a onclick="createBookComponent('/moment', 1, '${cBoardlist.commonDetailName}')" class="categoryLink">${cBoardlist.commonDetailName}</a>
                                </c:forEach>
                            </div>  <!-- book category end -->
                            <!-- book list rendering -->
                            <ul class="icon-data-list mt-5" id="bookList"></ul>
                            <!-- book list rendering -->

                            <div class="d-flex justify-content-center inner-div">
                                <button type="button" class="btn btn-social-icon btn-rounded bookLeftBnt"><iconify-icon icon="formkit:caretleft"></iconify-icon></button>
                                <button type="button" class="btn btn-social-icon btn-rounded bookRightBnt"><iconify-icon icon="formkit:caretright"></iconify-icon></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-7 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">뉴스<b>100</b></p>
                            <!-- news category -->
                            <div class="newsCategoryChange mb-2">
                                <a onclick="createNewsComponent('/moment', 1, 'all')" id="allLink" class="categoryLink">전체</a>
                                <c:forEach var="cBoardlist" items="${code.CO}">
                                <a onclick="createNewsComponent('/moment', 1, '${cBoardlist.commonDetailName}')" class="categoryLink">${cBoardlist.commonDetailName}</a>
                                </c:forEach>
                            </div>  <!-- news category end -->

                            <!-- news list rendering -->
                            <ul class="icon-data-list" id="newsList"></ul>
                            <!-- news list rendering -->

                            <!-- pagenation -->
                            <div class="pagenationDiv">
                                <div class="button-container">
                                    <button type="button" class="btn btn-outline-secondary btn-rounded btn-icon left-button">
                                        <iconify-icon icon="mdi:chevron-double-left"></iconify-icon>
                                    </button>
                                    
                                    <button type="button" class="btn btn-outline-secondary btn-rounded btn-icon right-button">
                                        <iconify-icon icon="mdi:chevron-double-right"></iconify-icon>
                                    </button>
                                </div> <!-- pagenation end -->
                                <div>
                                    <input type="hidden" name="contextPath" id="contextPath" value="${pageContext.request.contextPath}">
                                    <input type="hidden" name="currentPage" id="currentPage" value="${currenPage}">
                                    <input type="hidden" name="total" id="total" value="${totalPages}">
                                    <input type="hidden" name="querySearch" id="querySearch" value="${querySearch}">
                                    <input type="hidden" id="book_querySearch" value="${querySearch}">
                                    <input type="hidden" id="book_currentPage" value="1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-7 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title mb-0">Top Products</p>
                            <div class="table-responsive">
                            <table class="table table-striped table-borderless">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Referral Marketing</td>
                                        <td class="font-weight-bold">$283</td>
                                        <td>20 Mar 2018</td>
                                        <td class="font-weight-medium"><div class="badge badge-warning">Pending</div></td>
                                    </tr>
                                    <tr>
                                        <td>Social media marketing</td>
                                        <td class="font-weight-bold">$897</td>
                                        <td>26 Oct 2018</td>
                                        <td class="font-weight-medium"><div class="badge badge-success">Completed</div></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">To Do Lists</h4>
                            <div class="list-wrapper pt-2">
                                <ul class="d-flex flex-column-reverse todo-list todo-list-custom">
                                    <li>
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox">
                                                Meeting with Urban Team
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                    <li class="completed">
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox" checked>
                                                Duplicate a project for new customer
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox">
                                                Project meeting with CEO
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                    <li class="completed">
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox" checked>
                                                Follow up of team zilla
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-flat">
                                            <label class="form-check-label">
                                                <input class="checkbox" type="checkbox">
                                                Level up for Antony
                                            </label>
                                        </div>
                                        <i class="remove ti-close"></i>
                                    </li>
                                </ul>
                            </div>
                            <div class="add-items d-flex mb-0 mt-2">
                                <input type="text" class="form-control todo-list-input"  placeholder="Add new task">
                                <button class="add btn btn-icon text-primary todo-list-add-btn bg-transparent"><i class="icon-circle-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        //------------------------------------------------------------------------
        const createBookComponent = (contextPath, PageNumber, query) => {
            $.ajax({
                url: contextPath + '/naverBook?page=' + PageNumber + '&query=' + query,
                method : 'GET',
                dataType : 'json',
                success: (data) => {
                    bookListRender(data);
                },
                error: (err) => {
                    console.error('naver_book >>> 오류', err);
                }
            });
        };
        
        // 책 리스트 랜더링
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

        const createNewsComponent = (contextPath, currentPageNumber, querySearch) => {
            const newsList = document.querySelector("#newsList");
            newsList.textContent = "";
            $.ajax({
                url: contextPath + '/naverNews?page=' + currentPageNumber + '&query=' + querySearch,
                method : 'GET',
                dataType : 'json',
                success: (data) => {
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
                        textBoldTag.innerText = item.title;
                        aTag.appendChild(textBoldTag);
                        titlePTag.appendChild(aTag);
                        
                        const descriptionPTag = document.createElement("p");
                        descriptionPTag.className = "mb-0";
                        descriptionPTag.innerHTML = item.description
                        
                        const smallTag = document.createElement("small");
                        smallTag.innerText = formatTimestamp(item.pubDate);

                        childDiv.append(titlePTag);
                        childDiv.append(descriptionPTag);
                        childDiv.append(smallTag);
                        parentDiv.append(childDiv);
                        liTag.append(parentDiv);
                        document.querySelector("#newsList").append(liTag);
                    });
                },
                error: (err) => {
                    console.error(err);
                }
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
            let contextPath = document.getElementById('contextPath').value;
            // string -> number change
            let currentPageNumber = parseInt(document.getElementById('currentPage').value);

            
            if(currentPageNumber === 1) {
                document.querySelector('.left-button').style.display = 'none';
            }
            
            document.querySelector('.left-button').addEventListener('click', function() {
                let pageDown = --currentPageNumber;
                // console.log('pageDown>>>' + pageDown);
                newsPagenationCondition(pageDown);
                createNewsComponent(contextPath, pageDown, querySearch);
            });
            
            document.querySelector('.right-button').addEventListener('click', function() {
                let pageUp = ++currentPageNumber;
                // console.log('pageUp>>>' + pageUp);
                newsPagenationCondition(pageUp);
                createNewsComponent(contextPath, pageUp, querySearch);
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
            let contextPath = document.getElementById('contextPath').value;
            
            // string -> number change
            let bookPageNumber = parseInt(document.getElementById('book_currentPage').value);

            if(bookPageNumber === 1) {
                document.querySelector('.bookLeftBnt').style.display = 'none';
            };

            document.querySelector('.bookLeftBnt').addEventListener('click', function() {
                let pageDown = --bookPageNumber;
                bookPagenationCondition(pageDown);
                createBookComponent(contextPath, pageDown, querySearch);
            });
            
            document.querySelector('.bookRightBnt').addEventListener('click', function() {
                let pageUp = ++bookPageNumber;
                bookPagenationCondition(pageUp);
                createBookComponent(contextPath, pageUp, querySearch);
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
        //------------------------------------------------------------------------

        // 페이지 로드 후 데이터 가져오기
        window.onload = function() {
            let contextPath = document.getElementById('contextPath').value;
            bookPageChangeBnt();
            newsPageChangeBnt();
            createBookComponent(contextPath, 1, "IT");
            createNewsComponent(contextPath, 1, "IT");
        };
    </script>