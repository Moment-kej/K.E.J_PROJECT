import { firstContextPath } from '../common/common.js';

const firstPath = firstContextPath();

// ======================================================================
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

// ======================================================================
$.ajax({
   url : firstPath + "/board/music",
   method : "GET",
   data :{ code : 20 },
   dataType : 'json',
   success : (data) => {
      //createSortListTypeComponent(data);
      createSortCardTypeComponent(data);
   },
   error:(error) => {
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: '서버요청 실패',
      });
   }
});

// ======================================================================
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

   const boardListContainer = document.getElementById("boardList");
   boardListContainer.appendChild(table);
}

const createSortCardTypeComponent = (data) => {
   // 부모 요소 찾기
   const boardListFind = document.getElementById("boardList");
   const boardSortCardType = createAndAppendElement(boardListFind, 'ul', { id : 'boardSortCardType'});
   // createAndAppendElement 함수를 사용하여 새로운 리스트 아이템 생성 및 추가
   const newListItem = createAndAppendElement(boardSortCardType, 'li');

   // 새로운 리스트 아이템 내부에 포함될 요소들 생성 및 추가
   const cardTypeArea = createAndAppendElement(newListItem, 'div', { class: 'cardTypeArea d-flex justify-content-between align-items-center' });
   const conTop = createAndAppendElement(cardTypeArea, 'div', { class: 'con_top' });
   const titleArea = createAndAppendElement(conTop, 'div', { class: 'title_area' });
   createAndAppendElement(titleArea, 'a', { href: '#', class: '' }, '<span class="">TITLE</span>');

   const infoArea = createAndAppendElement(conTop, 'div', { class: 'info_area' });
   const userInfo = createAndAppendElement(infoArea, 'div', { class: 'user_info d-flex justify-content-start align-items-center' });
   createAndAppendElement(userInfo, 'div', { class: 'write_dt' }, '<span>USER_ID</span>');
   createAndAppendElement(userInfo, 'div', { class: 'write_dt' }, '<span class="date">2023.12.09.</span>');
   createAndAppendElement(userInfo, 'div', {}, '<span>조회</span><span>5</span>');
   const commentDiv = createAndAppendElement(userInfo, 'div', {});
   createAndAppendElement(commentDiv, 'i', { class: 'fa-regular fa-comment-dots' });
   createAndAppendElement(commentDiv, 'span', {}, '10');

   const movieImg = createAndAppendElement(cardTypeArea, 'div', { class: 'movie-img' });
   const imgLink = createAndAppendElement(movieImg, 'a', { href: '#' });
   createAndAppendElement(imgLink, 'img', { src: '#', alt: '썸네일 이미지' });

   boardListContainer.appendChild(boardSortCardType);

   // 새로운 리스트 아이템이 추가된 후의 HTML 출력
   console.log(boardSortCardType.innerHTML);

}