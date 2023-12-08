export const Ajax = (URL, method, params, callBack) => {
    const hasCallback = $.isFunction(callBack) ? true : false;
    const Param = params ? params : {};
    
    let Obj = {
        url: URL,
        type: method,
        async: hasCallback,
        contentType : "application/json; charset=utf-8",
        dataType: "json",
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
export const ajaxRequest = (url, method, data=undefined, successCallback) => {
    const hasSuccessCallback = $.isFunction(successCallback);

    const ajaxOptions = {
        url: url,
        type: method,

        contentType : "application/json; charset=utf-8",
        success: function(response) {
            // 성공 콜백 호출
            if (hasSuccessCallback) {
                successCallback(response);
            }
        },
        error: function(error) {
            console.error('오류발생!' + error);
        }
    };

    // method가 'POST'인 경우에만 data를 설정
    if (method.toUpperCase() === 'POST') {
        ajaxOptions.data = data;
    }

    $.ajax(ajaxOptions);
}