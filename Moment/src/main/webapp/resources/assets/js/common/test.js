import { Ajax } from "./index.js";

// 쿼리스트링 : ? 뒤에 오는 값 (obj 형태)
const params = {
    dataType: "json"
}

// 데이터를 성공적으로 들고 왔을 때 실행해야 하는 것들을 담으면 됨
const callback = (data) => {
    console.log(data);
}

// ajax common function 호출
Ajax("/moment/board/test2", "GET", params, callback);
