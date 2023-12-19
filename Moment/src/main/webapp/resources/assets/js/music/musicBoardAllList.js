import { firstContextPath, formatTime_hhmm, createAndAppendElement } from '../common/common.js';

// =====================================================================================
const boardListContainer = document.getElementById("boardList");
// 게시글 List형태
const createSortListTypeComponent = (data) => {
   const table = createAndAppendElement(document.body, 'table', { class: 'boardSortListType container mx-auto' });
   createAndAppendElement(table, 'caption', { class: 'board_caption displyNone'}, '게시판 리스트입니다.');

   const thead = createAndAppendElement(table, 'thead');
   const trHead = createAndAppendElement(thead, 'tr');
   const columnMapping = {
      headerTitles: ['번호', '제목', '작성자', '작성일', '조회'],
      colData: ['board', 'title', 'id', 'write_dt', 'view_count'],
      rowDataKeys: ["boardNo", "title", "id", "writeDt", "viewCount"]
   };
   columnMapping.headerTitles.forEach((title, index) => {
      createAndAppendElement(trHead, 'th', { scope: 'col', class: 'td_' + columnMapping.colData[index] }, title);
   });

   const tbody = createAndAppendElement(table, 'tbody', { id: 'article_list' });
   data.map((item) => {
      item.writeDt = formatTime_hhmm(item.writeDt);
      const trBody = createAndAppendElement(tbody, 'tr');

      for (const key of columnMapping.rowDataKeys) {
         let tdContent = ""
         if (key === "title") {
            tdContent = '<a href=' + firstContextPath + "/board/music/" + item.boardNo + '>' + '<span class=' + key + '>' + item[key] + '</span></a>';
            // tdContent = '<span class="' + key + '"><a href="' + + '">' + item[key] + '</a></span>';
         } else {
            tdContent = '<span class="' + key + '">' + item[key] + '</span>';
         }
         createAndAppendElement(trBody, 'td', { scope: 'row', class: 'td_' + key + ' ' + item.boardNo }, tdContent);       
      }
      
      const titleElement = document.getElementsByClassName("td_title " + item.boardNo)[0];
      createAndAppendElement(titleElement, 'span', { class: 'reply_count'}, ' [' + item.replyCount + ']');
   });

   boardListContainer.appendChild(table);
}

// =====================================================================================
// 게시글 Card 형태
const createSortCardTypeComponent = (data) => {
   const boardSortCardType = createAndAppendElement(boardListContainer, 'ul', { id : 'boardSortCardType'});

   data.map((item) => { 
      const dateFormat = formatTime_hhmm(item.writeDt);
      // createAndAppendElement 함수를 사용하여 새로운 리스트 아이템 생성 및 추가
      const newListItem = createAndAppendElement(boardSortCardType, 'li');

      // 새로운 리스트 아이템 내부에 포함될 요소들 생성 및 추가
      const cardTypeArea = createAndAppendElement(newListItem, 'div', { class: 'cardTypeArea d-flex justify-content-between align-items-center' });
      const conTop = createAndAppendElement(cardTypeArea, 'div', { class: 'con_top' });
      const titleArea = createAndAppendElement(conTop, 'div', { class: 'title_area' });
      createAndAppendElement(titleArea, 'a', { href: '/app/board/music/' + item.boardNo, class: 'card_title' }, '<span class="">' + item.title + '</span>');

      const infoArea = createAndAppendElement(conTop, 'div', { class: 'info_area' });
      const userInfo = createAndAppendElement(infoArea, 'div', { class: 'user_info d-flex justify-content-start align-items-center' });
      createAndAppendElement(userInfo, 'div', { class: 'write_id' }, '<span>'+ item.id +'</span>');
      createAndAppendElement(userInfo, 'div', { class: 'write_dt' }, '<span class="date">' + dateFormat + '</span>');
      createAndAppendElement(userInfo, 'div', { class: 'view_count'}, '<span>조회</span><span>' + item.viewCount + '</span>');
      const commentDiv = createAndAppendElement(userInfo, 'div', { class: 'reply_count_info'});
      createAndAppendElement(commentDiv, 'i', { class: 'fa-regular fa-comment-dots' });
      createAndAppendElement(commentDiv, 'span', {class: 'reply_count'}, item.replyCount);

      const movieImg = createAndAppendElement(cardTypeArea, 'div', { class: 'movie-img' });
      const imgLink = createAndAppendElement(movieImg, 'a', { href: '#' });
      createAndAppendElement(imgLink, 'img', { src: '#', alt: '썸네일 이미지' });
   });

   boardListContainer.appendChild(boardSortCardType);
}

// =====================================================================================
// 게시글 Album 형태
const createSortAlbumTypeComponent = (data) => {
   const albumTypeArea = createAndAppendElement(boardListContainer, 'div', { class: 'albumType'} );
   data.map((item) => {
      const dateFormat = formatTime_hhmm(item.writeDt);
      const postTypeArea = createAndAppendElement(albumTypeArea, 'div', { class: 'postType'} );
      const cardTypeArea = createAndAppendElement(postTypeArea, 'div', { class: 'cardType'} )

      const imgArea = createAndAppendElement(cardTypeArea, 'div', { class: 'cardTypeImgArea' });
      const aLinkElement = createAndAppendElement(imgArea, 'a', { href: '/app/board/music/' + item.boardNo });
      createAndAppendElement(aLinkElement, 'img', { class: 'albumTypeImg', src: '/app/assets/images/noImages.png' });

      const titleArea = createAndAppendElement(cardTypeArea, 'div', { class: 'cardTypeTitleArea' });
      createAndAppendElement(titleArea, 'span', { class: 'album_title' }, item.title);

      const idArea = createAndAppendElement(cardTypeArea, 'div', { class: 'cardTypeIDArea' });
      createAndAppendElement(idArea, 'span', { class: 'writeID' }, item.id);

      const infoArea = createAndAppendElement(cardTypeArea, 'div', { class: 'cardTypeInfoArea d-flex justify-content-start align-items-center' });

      createAndAppendElement(infoArea, 'span', { class: 'writeDt' }, dateFormat);
      createAndAppendElement(infoArea, 'span', { class: 'viewCount' }, ' ⦁ 조회 ' + item.viewCount);
   });
}

// =====================================================================================
const createPagination = (data) => {

   const parentElement = document.getElementById('pagingBox'); // 부모 요소의 ID를 지정해야 합니다.

   while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
   };
   
   createAndAppendElement(parentElement, "button", { id: 'firstPageBtn', class: 'firstPage pbtn' }, '<i class="fa-solid fa-angles-left"></i>');

   createAndAppendElement(parentElement, "button", { id: 'prevPageBtn', class: 'prevPage pbtn' }, '<i class="fa-solid fa-angle-left"></i>');

   for (let i = 1; i <= data.pageCnt; i++) {
      const pageNumberLink = createAndAppendElement(parentElement, "button", { class: 'pageNumBtn pbtn' });
      createAndAppendElement(pageNumberLink, 'span', { class: 'pageNum' }, i);
   }

   createAndAppendElement(parentElement, "button", { id: 'nextpageBtn', class: 'nextpage pbtn' }, '<i class="fa-solid fa-angle-right"></i>');

   createAndAppendElement(parentElement, "button", { id: 'lastPageBtn', class: 'lastPage pbtn' }, '<i class="fa-solid fa-angles-right"></i>');
};

// ======================================================================
const showContent = (viewType, amount, category) => {
   $.ajax({
      url : firstContextPath + "/board/music-data",
      method : "GET",
      data : { code: 20, amount: amount, listType: viewType, category: category },
      contentType: "application/json", // 클라이언트 -> 서버로 전송할 데이터 타입
      dataType : "json", // 서버 -> 클라이언트로 받을 때 데이터 타입',
      success : (data) => {
         clearContent();
         currentViewType = viewType;
         amount = amount;
         category = category;

         if(viewType == "cardType") {
            createSortCardTypeComponent(data.data);
         }
         if(viewType == "albumType") {
            createSortAlbumTypeComponent(data.data);
         } 
         if(viewType == "listType") {
            createSortListTypeComponent(data.data);
         }
         createPagination(data.paging);
      },
      error:(error) => {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "통신 실패" + error
         });
      }
   });
}

// =====================================================================================
const sortCardIcon = document.getElementById("sortCard");
const sortAlbumIcon = document.getElementById("sortAlbum")
const sortListIcon = document.getElementById("sortList");

const disableViewTypeBtn = () => {
   sortListIcon.setAttribute("src", firstContextPath + "/assets/icon/sortList.svg");
   sortCardIcon.setAttribute("src", firstContextPath + "/assets/icon/sortCard.svg");
   sortAlbumIcon.setAttribute("src", firstContextPath + "/assets/icon/sortAlbum.svg");
};

// =====================================================================================
const clearContent = () => {
   const parentElement = document.getElementById("boardList")
   while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
   };
};

// =====================================================================================
let currentViewType = "listType"; // 카드형, 앨범형, 리스트형 
let category = 0; // 국악, 발라드, k-pop 등
let amount = 10; // 게시글 몇개씩 보여줄건지?
const init = () => {
   document.getElementById("cardType").addEventListener("click", () => {
      disableViewTypeBtn();
      sortCardIcon.setAttribute("src", firstContextPath + "/assets/icon/sortCardSelected.svg");
      showContent("cardType", amount, category);
   });

   document.getElementById("albumType").addEventListener("click", () => {
      disableViewTypeBtn();
      sortAlbumIcon.setAttribute("src", firstContextPath + "/assets/icon/sortAlbumSelected.svg");
      showContent("albumType", amount, category);
   });

   document.getElementById("listType").addEventListener("click", () => {
      disableViewTypeBtn();
      sortListIcon.setAttribute("src", firstContextPath + "/assets/icon/sortListSelected.svg");
      showContent("listType", amount, category);
   });

   $("#handleAmount").on("change", (e) => {
      amount = e.target.value;
      showContent(currentViewType, amount, category);
   });

   $(".menuCategoryATag").on("click", (e) => {
      category = e.target.getAttribute("data-value");
      if(category == null || category == undefined) {
         category = 0
      }
      showContent(currentViewType, amount, category);
   });

   sortListIcon.setAttribute("src", firstContextPath + "/assets/icon/sortListSelected.svg");

   showContent(currentViewType, amount, category);
}

// =====================================================================================
$().ready(() => {
   init();
   $(document).on("click", ".pageNumBtn", (e) => {
      // 페이지 번호 숫자 icon click했을 때
      if(e.target.tagName == "SPAN") {
         console.log(e.target);
      } else {
         console.log(e.target);
      }
      clearContent();
      showContent(currentViewType, amount, category);
   });
});