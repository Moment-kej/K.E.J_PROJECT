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
});

const replyInsert = ((id, content) => {
   const data = JSON.stringify({ 
      boardNo: boardNo,
		groupOrd: 0,
		groupLayer: 0,
		id: id,
		content: content,
   });
   const callback = () => {
      content = "";
   }
   ajaxRequest(firstContextPath + "/reply/music", 'POST', data, callback);
});

const replyDelete = ((replyNo) => {
   console.log("ajax",replyNo);
   const data = JSON.stringify({
      replyNo: replyNo,
   });
   const callback = () => {
      console.log("삭제성공")
   }
   ajaxRequest(firstContextPath + "/reply/music/" + replyNo, 'DELETE', data, callback);
});

// =====================================================================================
$().ready(() => {
   replyShowContent();
   $("#goAllList").on("click", () => {
      location.href = firstContextPath + "/board/music"
   });

   $(document).on("click", ".commentWriteBtn", (e) => {
      $(".comment_write_area").addClass("displayNone");
      $(e.target).parent().parent().next().removeClass("displayNone");
   });

   $("#replyWriteBtn").on("click", () => {
      let id = document.getElementById("replyWriter").innerText;
      let content = document.getElementById("replyTextrea").value;

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
            replyInsert(id, content);
            
         } else if (result.isDenied) {
            Swal.fire({
               title: "취소되었습니다.",
               icon: "error",
            });
         }
      }); 
   });

   $(document).on("click", ".deleteBtnBox", (e) => {

      if(e.target.tagName == "I") {
         $(e.target).parent().click();
         let replyNo = parseInt($(e.target).parent().attr("data-value"));
         console.log("i tag"+replyNo);
         replyDelete(replyNo);
      } else if(e.target.tageName == "BUTTON") {
         let replyNo = $(e.target).attr("data-value");
         replyDelete(replyNo);
         console.log("button"+replyNo);
      }
   });
})