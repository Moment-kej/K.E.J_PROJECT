// import { Ajax, ajaxRequest } from "./ajaxTest.js";

export const firstContextPath = () => {
    // http://localhost:8080/app/board/20 -> /app/board/20 이것만 추출하는 함수
    const currentPath = window.location.pathname;
    // /app/board/20 -> /app 부분만 추출 -> /app 형태로 만들어주기
    const firstSegment = "/" + currentPath.split('/')[1];
    
    return firstSegment;
};

export const getUrlParam = (paramName) => {
    // 현재 페이지 URL의 쿼리 문자열을 가져옴
    var queryString = window.location.search;

    // URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱
    var urlParams = new URLSearchParams(queryString);

    // 특정 파라미터 값 가져오기
    var paramValue = urlParams.get(paramName);

    return  paramValue;

    // 모든 파라미터 및 값 가져오기
    // console.log("전체 쿼리 문자열:", queryString);
    // urlParams.forEach(function(value, key) {
    //     console.log("파라미터:", key, "값:", value);
    // });
};

//시간포맷 : yyyy.MM.dd HH:mm
export const formatTimestamp = (timestamp) => {
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

// 사용방법 : 데이터를 성공적으로 들고 왔을 때 실행해야 하는 것들을 담으면 됨
// const callback = (data) => {
//     console.log(data);
// }
// let data = {
//     page : 1,
//     amount : 10,
//     code: 10,
//     category: 10,
//     listType: 'cardsType',
//     searchType: '',
//     serachName: ''
// }

// ajax 공통함수 / 만든이 외 사용금지
export const ajaxRequest = (url, method, data, successCallback) => {
    const hasSuccessCallback = $.isFunction(successCallback) ? true : false;
    const datas = data ? data : {};

    const ajaxOptions = {
        url: url,
        type: method,
        data : datas,
        dataType : "json",                // 서버로부터 받을 데이터의 타입을 지정하는 것
        contentType : "application/json; charset=utf-8",
        error: function(error) {
            console.error('오류발생!' + error);
        }
    };
    
    // success 함수
    if(hasSuccessCallback) ajaxOptions.success = successCallback;

    // 'POST' 메서드이면서 데이터가 존재하는 경우에만 contentType을 설정
    // if (method.toUpperCase() === 'POST' && datas) {
    //     ajaxOptions.contentType = "application/json; charset=utf-8"    // 클라이언트가 서버로 데이터를 전송할 때의 타입을 지정하는 것
    // };

    console.log(ajaxOptions);
    $.ajax(ajaxOptions);
};