import { ajaxRequest, pathNameOfBoardNumber, firstContextPath} from '../../common/common.js';
import { createReplyBox } from './render.js';
let boardNo = pathNameOfBoardNumber();
// =====================================================================================
const replyShowContent = (() => {
   const data = { boardNo : boardNo };
   const callback = (data) => {
      createReplyBox(data);
   }
   ajaxRequest(firstContextPath + "/reply/music/reply-data", 'GET', data, callback);
})();

const replyInsert = (() => {
   let id = document.getElementById("replyWriter").innerText;
   let content = document.getElementById("replyTextrea").value;
   console.log("id: " + id + "content: " + content);
   const data = JSON.stringify({ 
      boardNo: boardNo,
		groupOrd: 0,
		groupLayer: 0,
		id: id,
		content: content,
   });
   const callback = () => {
      Swal.fire({
         title: "댓글을 등록 하시겠습니까?",
         icon: "question",
         showDenyButton: true,
         confirmButtonText: "Yes",
         denyButtonText: "No",
      }).then((result) => {
         if (result.isConfirmed) {
            Swal.fire({
               title: "등록 완료.",
               icon: "success",
            });
            
         } else if (result.isDenied) {
            Swal.fire({
               title: "취소되었습니다.",
               icon: "error",
            });
            return;
         }
      });
   }
   ajaxRequest(firstContextPath + "/reply/music", 'POST', data, callback);
});


// =====================================================================================
$().ready(() => {
   $("#goAllList").on("click", () => {
      location.href = firstContextPath + "/board/music"
   });

   $(document).on("click", ".commentWriteBtn", (e) => {
      $(".comment_write_area").addClass("displayNone");
      $(e.target).parent().parent().next().removeClass("displayNone");
   });

   $("#replyWriteBtn").on("click", () => {
      console.log("Button 작동함")
      replyInsert();
   })
})