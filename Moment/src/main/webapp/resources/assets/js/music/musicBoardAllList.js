import { firstContextPath, formatTimestamp } from '../common/common.js';

// =====================================================================================
/**
 * Element를 만들고 append하는 함수
 * 
 * @param   parent  append할 부모 Element
 * @param   elementType  생성 할 elementType 
 * @param   attributes  elementType 속성
 * @param   content  내용
 * @returns element 만들어 진 Element를 return 합니다.
 * 
 */
const createAndAppendElement = (parent, elementType, attributes = {}, content = '') => {
   const element = document.createElement(elementType);

   for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
   }

   element.innerHTML = content;
   parent.appendChild(element);

   return element;
};
// =====================================================================================
const boardListContainer = document.getElementById("boardList");
// 게시글 List형태
const createSortListTypeComponent = (data) => {
   const table = createAndAppendElement(document.body, 'table', { class: 'boardSortListType container mx-auto' });
   createAndAppendElement(table, 'caption', { class: 'board_caption displyNone'}, '게시판 리스트입니다.');

   const thead = createAndAppendElement(table, 'thead');
   const trHead = createAndAppendElement(thead, 'tr');
   const columnMapping = {
      headerTitles: ['번호', '제목', '작성자', '작성일', '조회수'],
      colData: ['board', 'title', 'id', 'write_dt', 'view'],
      rowDataKeys: ["boardNo", "title", "id", "writeDt", "view"]
   };
   columnMapping.headerTitles.forEach((title, index) => {
      createAndAppendElement(trHead, 'th', { scope: 'col', class: 'td_' + columnMapping.colData[index] }, title);
   });

   const tbody = createAndAppendElement(table, 'tbody', { id: 'article_list' });
   data.map((item) => {
      item.writeDt = formatTimestamp(item.writeDt);
      const trBody = createAndAppendElement(tbody, 'tr');

      for (const key of columnMapping.rowDataKeys) {
         const tdContent = '<span class="' + key + '">' + item[key] + '</span>';
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
      const dateFormat = formatTimestamp(item.writeDt);
      // createAndAppendElement 함수를 사용하여 새로운 리스트 아이템 생성 및 추가
      const newListItem = createAndAppendElement(boardSortCardType, 'li');

      // 새로운 리스트 아이템 내부에 포함될 요소들 생성 및 추가
      const cardTypeArea = createAndAppendElement(newListItem, 'div', { class: 'cardTypeArea d-flex justify-content-between align-items-center' });
      const conTop = createAndAppendElement(cardTypeArea, 'div', { class: 'con_top' });
      const titleArea = createAndAppendElement(conTop, 'div', { class: 'title_area' });
      createAndAppendElement(titleArea, 'a', { href: '#', class: '' }, '<span class="">' + item.title + '</span>');

      const infoArea = createAndAppendElement(conTop, 'div', { class: 'info_area' });
      const userInfo = createAndAppendElement(infoArea, 'div', { class: 'user_info d-flex justify-content-start align-items-center' });
      createAndAppendElement(userInfo, 'div', { class: 'write_id' }, '<span>'+ item.id +'</span>');
      createAndAppendElement(userInfo, 'div', { class: 'write_dt' }, '<span class="date">' + dateFormat + '</span>');
      createAndAppendElement(userInfo, 'div', { class: 'view'}, '<span>조회</span><span>' + item.view + '</span>');
      const commentDiv = createAndAppendElement(userInfo, 'div', {});
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
   console.log("10개만 나타나게하는 방법", data.slice(0, 10))
   const albumTypeArea = createAndAppendElement(boardListContainer, 'div', { class: 'albumType'} );
   data.map((item) => {
      const dateFormat = formatTimestamp(item.writeDt);
      const postTypeArea = createAndAppendElement(albumTypeArea, 'div', { class: 'postType'} );
      const cardTypeArea = createAndAppendElement(postTypeArea, 'div', { class: 'cardType mr-3'} )

      const imgArea = createAndAppendElement(cardTypeArea, 'div', { class: 'cardTypeImgArea' });
      const aLinkElement = createAndAppendElement(imgArea, 'a', { href: '/app/board/dress/all/' + item.boardNo });
      const imgElement = createAndAppendElement(aLinkElement, 'img', { class: 'albumTypeImg', src: '/app/assets/images/noImages.png' });

      const titleArea = createAndAppendElement(cardTypeArea, 'div', { class: 'cardTypeTitleArea' });
      const titleSpan = createAndAppendElement(titleArea, 'span', { class: 'title' }, item.title);

      const idArea = createAndAppendElement(cardTypeArea, 'div', { class: 'cardTypeIDArea' });
      const idSpan = createAndAppendElement(idArea, 'span', { class: 'writeID' }, item.id);

      const infoArea = createAndAppendElement(cardTypeArea, 'div', { class: 'cardTypeInfoArea d-flex justify-content-start align-items-center' });

      const dateSpan = createAndAppendElement(infoArea, 'span', { class: 'writeDt' }, dateFormat);
      const viewSpan = createAndAppendElement(infoArea, 'span', { class: 'view' }, ' ⦁ 조회 ' + item.view);

   });
}  

// ======================================================================
const showContent = (viewType) => {
   $.ajax({
      url : firstContextPath + "/board/music-data",
      method : "GET",
      data :{ code : 20 },
      contentType: "application/json", // 클라이언트 -> 서버로 전송할 데이터 타입
      dataType : "json", // 서버 -> 클라이언트로 받을 때 데이터 타입',
      success : (data) => {
         clearContent();
         if(viewType == "cardType") {
            createSortCardTypeComponent(data);
         }
         if(viewType == "albumType") {
            createSortAlbumTypeComponent(data);
         } 
         if(viewType == "listType") {
            createSortListTypeComponent(data);
         }
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

const clearContent = () => {
   const parentElement = document.getElementById("boardList")
   while (parentElement.firstChild) { // 
      parentElement.removeChild(parentElement.firstChild);
   };
}

let currentViewType = "listType"
const viewTypeBtn = () => {
   showContent(currentViewType);
   document.getElementById("cardType").addEventListener("click", () => {
      showContent("cardType");
   });

   document.getElementById("albumType").addEventListener("click", () => {
      showContent("albumType")
   });

   document.getElementById("listType").addEventListener("click", () => {
      showContent("listType")
   });
}

let listSizeValue;
const listSizeSelect = () => {
   $("#handleAmount").on('change', (e) => {
      let listSizeValue = e.target.value.toString();
      console.log(listSizeValue);
   });
}

$().ready(function() {
   viewTypeBtn();
   listSizeSelect();
});
