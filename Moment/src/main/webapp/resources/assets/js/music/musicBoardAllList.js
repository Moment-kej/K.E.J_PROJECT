import { firstContextPath } from '../common/common.js';

const firstPath = firstContextPath();

$.ajax({
   url : firstPath + "/board/music",
   method : "GET",
   data :{ code : 20 },
   dataType : 'json',
   success : function(result){
      console.log("성공", result);

      
   },

   error:function(error) {
      console.log("에러", error);
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: '서버요청 실패',
      });
   }
});

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
// List형 목록 
// 부모 엘리먼트, 어떤 엘리먼트인지, 속성, 내용
const createAndAppendElement = (parent, elementType, attributes = {}, content = '') => {
   const element = document.createElement(elementType);

   for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
   }

   element.innerHTML = content;
   parent.appendChild(element);

   return element;
};

// Create table element
const table = createAndAppendElement(document.body, 'table', { class: 'board_list_tbl container mx-auto' });

// Create caption element
createAndAppendElement(table, 'caption', { class: 'board_caption displyNone'}, '게시판 리스트입니다.');

// Create thead element
const thead = createAndAppendElement(table, 'thead');
const trHead = createAndAppendElement(thead, 'tr');

// Header titles
const headerTitles = ['번호', '제목', '작성자', '작성일', '조회수'];
const colData = ['board', 'title', 'id', 'write_dt', 'view']
// title => headerTitles('번호', '제목', '작성자', '작성일', '조회수')
headerTitles.forEach((title, index) => {
   // ex) <th scope="col", class="td_board">번호</th>
   createAndAppendElement(trHead, 'th', { scope: 'col', class: 'td_' + colData[index] }, title);
});

// Create tbody element
const tbody = createAndAppendElement(table, 'tbody', { id: 'article_list' });

// Create tr element for the body
const trBody = createAndAppendElement(tbody, 'tr');

// Data for the body row
const rowData = {
   board_no: 'BOARD_NO',
   title: 'TITLE',
   id: 'ID',
   writeDt: 'WRITE_DT',
   view: 'VIEW',
};

// Create td elements for the body row using data
for (const key in rowData) {
   const tdContent = '<span class="' + key + '">' + rowData[key] + '</span>';
   createAndAppendElement(trBody, 'td', { scope: 'row', class: 'td_' + key }, tdContent);
}

const class_td_title_element_find = document.getElementsByClassName("td_title")[1];
const className = document.getElementsByClassName("td_title")[1].className;
if(className == "td_title") {
   createAndAppendElement(class_td_title_element_find, 'span', { class: 'reply_count'}, ' [ 555 ]');
}

// const boardListContainer = createAndAppendElement(document.body, 'div', { id: 'boardList' });
const boardListContainer = document.getElementById("boardList");
// Append the table to the boardListContainer
boardListContainer.appendChild(table);
// ======================================================================
const createElementAndAppend = (parent, elementType, attributes = {}, content = '') => {
   const element = document.createElement(elementType);

   for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
   }

   element.innerHTML = content;
   parent.appendChild(element);

   return element;
}