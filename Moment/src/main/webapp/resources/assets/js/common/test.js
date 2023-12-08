import { Ajax, ajaxRequest } from "./index.js";

// http://localhost:8080/app/board/20 -> /app/board/20 이것만 추출하는 함수
const currentPath = window.location.pathname;
// /app/board/20 -> /app 부분만 추출 -> /app 형태로 만들어주기
const firstSegment = "/" + currentPath.split('/')[1];

// 현재 페이지 URL의 쿼리 문자열을 가져옴
var queryString = window.location.search;

// URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱
var urlParams = new URLSearchParams(queryString);

// 특정 파라미터 값 가져오기
var paramValue = urlParams.get('yourParamName');

// 모든 파라미터 및 값 가져오기
console.log("전체 쿼리 문자열:", queryString);
urlParams.forEach(function(value, key) {
    console.log("파라미터:", key, "값:", value);
});


// 쿼리스트링 : ? 뒤에 오는 값 (obj 형태)
const params = {
    dataType: "json"
}

// 데이터를 성공적으로 들고 왔을 때 실행해야 하는 것들을 담으면 됨
const callback = (data) => {
    console.log(data);
}
let data = {
    page : 1,
    amount : 10,
    code: 10,
    category: 10,
    listType: 'cardsType',
    searchType: '',
    serachName: ''
}
// ajax common function 호출
Ajax("/moment/board/test2", "GET", params, callback);
ajaxRequest("/moment/board/temp", "GET", data, callback);