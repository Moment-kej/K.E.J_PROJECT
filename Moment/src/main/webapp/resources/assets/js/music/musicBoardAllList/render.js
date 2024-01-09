import { firstContextPath, formatTime_hhmm, createAndAppendElement } from '../../common/common.js';

// =====================================================================================
const boardListContainer = document.getElementById("boardList");

// 게시글 List형태
export const createSortListTypeComponent = (data) => {
   const table = createAndAppendElement(document.body, 'table', { class: 'boardSortListType container mx-auto' });
   createAndAppendElement(table, 'caption', { class: 'board_caption displayNone'}, '게시판 리스트입니다.');

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
};

// =====================================================================================
// 게시글 Card 형태
export const createSortCardTypeComponent = (data) => {
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
};

// =====================================================================================
// 게시글 Album 형태
export const createSortAlbumTypeComponent = (data) => {
   
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
};

// =====================================================================================
export const createPagination = (data) => {
   
   const parentElement = document.getElementById('pagingBox'); // 부모 요소의 ID를 지정해야 합니다.

   while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
   };
   if(data.start != data.end) {
      createAndAppendElement(parentElement, "button", { id: 'firstPageBtn', class: 'firstPage pbtn' }, '<i class="fa-solid fa-angles-left"></i>');
   
      createAndAppendElement(parentElement, "button", { id: 'prevPageBtn', class: 'prevPage pbtn' }, '<i class="fa-solid fa-angle-left"></i>');
   }
   
   for (let i=1; i <= data.end; i++) {
      createAndAppendElement(parentElement, "button", { id: 'pageNumBtn' + i, class: 'pageNumBtn pbtn' }, i);
      //createAndAppendElement(pageNumberLink, 'span', { class: 'pageNum' }, i);
   }

   if(data.start != data.end) {
      document.getElementById("pageNumBtn" + data.page).classList.add("pbtnClick")
      createAndAppendElement(parentElement, "button", { id: 'nextpageBtn', class: 'nextpage pbtn' }, '<i class="fa-solid fa-angle-right"></i>');

      createAndAppendElement(parentElement, "button", { id: 'lastPageBtn', class: 'lastPage pbtn' }, '<i class="fa-solid fa-angles-right"></i>');
   }
};