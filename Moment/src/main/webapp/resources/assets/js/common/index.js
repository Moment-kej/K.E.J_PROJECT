export const Ajax = (URL, method, params, callBack) => {
    const hasCallback = $.isFunction(callBack) ? true : false;
    const Param = params ? params : {};
    
    let Obj = {
        url: URL,
        type: method,
        async: hasCallback,
        contentType : "application/json; charset=utf-8",
        dataType : "json",
        data: params
    }
    
    // success 함수
    if(hasCallback) Obj.success = callBack;

    // Obj과 params 값을 가져와 묶는다.
    Obj = $.extend(Obj, params);

    // obj를 ajax를 통해 값을 랜더링
    const Result = $.ajax(Obj);
    
    // callBack이 있으면
    if(!hasCallback) {
        switch(Param.dataType) {
            case 'text' :
                return Result.responseText;      
            break;
            
            case 'xml' :
                return $(Result.responseXML);      
            break;
            
            case 'json' :
                return eval("("+Result.responseText+")");     
            break;
            
            default :
                return $(Result.responseXML);      
            break;
        }
    }
};

// 은애 - 지선생과 함께 만든 ajax function ... 만드는 중
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
    if (method.toUpperCase() === 'POST' && data) {
        ajaxOptions.contentType = "application/json; charset=utf-8";    // 클라이언트가 서버로 데이터를 전송할 때의 타입을 지정하는 것
        data = JSON.stringify(data);
    };

    console.log(ajaxOptions);
    $.ajax(ajaxOptions);
};