// import { Ajax, ajaxRequest } from "./ajaxTest.js";

// http://localhost:8080/app/board/20 -> /app 이것만 추출해서 /app/ 형태로 만듦 
export const firstContextPath = "/" + window.location.pathname.split("/")[1];

// =====================================================================================
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

// =====================================================================================
// 시간포맷 : yyyy.MM.dd HH:mm (EE)
export const formatTime_hhmm = (timestamp) => {
    // 밀리초로 표현된 시간 데이터를 Date 객체로 변환
    const inData    = new Date(timestamp);
    // 날짜 및 시간 정보 추출
    const year    = inData.getFullYear();
    const month   = String(inData.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day     = String(inData.getDate()).padStart(2, '0');
    const hours   = String(inData.getHours()).padStart(2, '0');
    const minutes = String(inData.getMinutes()).padStart(2, '0');
    // 오늘 날짜와 month, day가 같으면 'HH:mm' 형식으로 표시
    if (isToday(inData)) {
        return hours + ':' + minutes;
    } else {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = daysOfWeek[inData.getDay()];
        // 포맷에 맞게 문자열 반환
        return year + '.' + month + '.' + day + ' ' + hours + ':' + minutes + ' (' + dayOfWeek + ')';
    }
};

// =====================================================================================
// 시간포맷 : yyyy.MM.dd HH:mm:ss (EE)
export const formatTime_hhmmss = (timestamp) => {
    // addLeadingZero() : 주어진 숫자가 한 자리 숫자일 경우에 앞에 0을 추가하여 두 자리로 만들어주는 함수
    const inData = new Date(timestamp);
    const year = inData.getFullYear();
    const month = addLeadingZero(inData.getMonth() + 1);
    const day = addLeadingZero(inData.getDate());
    const hours = addLeadingZero(inData.getHours());
    const minutes = addLeadingZero(inData.getMinutes());
    const second = addLeadingZero(inData.getSeconds());
    
    // 오늘 날짜와 month, day가 같으면 'HH:mm' 형식으로 표시
    if (isToday(inData)) {
        return hours + ':' + minutes;
    } else {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = daysOfWeek[inData.getDay()];
        return year + '.' + month + '.' + day + ' ' + hours + ':' + minutes + ':' + second + ' (' + dayOfWeek + ')';
    }
};
const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};
// 한 자리 숫자에는 앞에 0을 추가하는 함수
const addLeadingZero = (number) => {
    return number < 10 ? '0' + number : number;
};

// =====================================================================================
// url board number 추출
export const boardNumber = () => {
    let pathname = window.location.pathname;
    let match = pathname.match(/\/(\d+)$/);
    let boardNumber;
    if (match) {
        var lastNumber = match[1];
        //parseInt 함수가 문자열을 10진수로 변환하도록 지정
        boardNumber = parseInt(lastNumber, 10);
    };
    return boardNumber;
}

// =====================================================================================
export const pathNameOfBoardNumber = () => {
    const pathNameOfBoardNo = parseInt(window.location.pathname.split("/").pop());
    
    return pathNameOfBoardNo;
}
// =====================================================================================
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

// =====================================================================================
// ajax 공통함수 / GET, POST 확인완료
export const ajaxRequest = (url, method, data, successCallback) => {
    const hasSuccessCallback = $.isFunction(successCallback) ? true : false;
    const datas = data ? data : {};

    const ajaxOptions = {
        url: url,
        type: method,
        data : datas,
        dataType : "json", // 서버로부터 받을 데이터의 타입을 지정하는 것
        error: function(error) {
            console.error('오류발생!' + error);
        }
    };
    
    // success 함수
    if(hasSuccessCallback) ajaxOptions.success = successCallback;

    // 'POST' 메서드이면서 데이터가 존재하는 경우에만 contentType을 설정
    if (method.toUpperCase() === 'POST' && datas) {
        // 클라이언트가 서버로 데이터를 전송할 때의 타입을 지정하는 것
        ajaxOptions.contentType = "application/json; charset=utf-8"
    };

    $.ajax(ajaxOptions);
};

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
**/
export const createAndAppendElement = (parent, elementType, attributes = {}, content = '') => {
    const element = document.createElement(elementType);

    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    element.innerHTML = content;
    parent.appendChild(element);

    return element;
};