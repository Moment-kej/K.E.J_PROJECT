// http://localhost:8080/app/board/20 -> /app/board/20 이것만 추출하는 함수
const currentPath = window.location.pathname;
// /app/board/20 -> /app 부분만 추출 -> /app 형태로 만들어주기
const firstSegment = "/" + currentPath.split('/')[1];

const Ajax = (url, method, configuration, requestData=undefined, callback) => {
   $.ajax({
      url : url,
      method : method,
      configuration : {configuration},
      success : callback(),
      // data :{ "chkPrCd" : addPrCd, "cnt" : 1 },
      // dataType : 'json',
      success : function(result){
         console.log("성공", result);
         // Swal.fire({
         //    icon: 'success',
         //    title: name + '상품이 추가 되었습니다.',
         // });
      },
   
      error:function(error) {
         console.log("에러", error);
         // Swal.fire({
         //    icon: 'error',
         //    title: 'Oops...',
         //    text: '서버요청 실패',
         // });
      }
   });
};

Ajax("/app/board/music", "get", {dataType: "json"}, {data: "test"}, () => {})

$.ajax({
   url : firstSegment + "/board/music",
   method : "GET",
   // data :{ "chkPrCd" : addPrCd, "cnt" : 1 },
   // dataType : 'json',
   success : function(result){
      console.log("성공", result);
      // Swal.fire({
      //    icon: 'success',
      //    title: name + '상품이 추가 되었습니다.',
      // });
   },

   error:function(error) {
      console.log("에러", error);
      // Swal.fire({
      //    icon: 'error',
      //    title: 'Oops...',
      //    text: '서버요청 실패',
      // });
   }
});
