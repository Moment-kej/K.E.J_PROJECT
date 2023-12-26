import { ajaxRequest } from '../../common/common.js';
import { firstContextPath } from '../../common/common.js';

let pathNameOfBoardNo = parseInt(window.location.pathname.split("/").pop());

console.log(pathNameOfBoardNo);
// =====================================================================================
$.ajax({
   url : firstContextPath + "/reply/music/reply-data",
   method : "GET",
   data : { boardNo: pathNameOfBoardNo },
   contentType: "application/json", // 클라이언트 -> 서버로 전송할 데이터 타입
   dataType : "json", // 서버 -> 클라이언트로 받을 때 데이터 타입',
   success : (data) => {
      console.log("reply",data)
   },
   error:(error) => {
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: "통신 실패" + error
      });
   }
});
const callback = (data) => {
   console.log(data)
}

// ajaxRequest(firstPath + '/reply/music/reply-data', 'GET', data, callback);

// =====================================================================================
$().ready(() => {
   $("#goAllList").on("click", () => {
      //location.href = firstContextPath + "/board/music"
   })
})