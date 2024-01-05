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

const clearContent = () => {
   const parentElement = document.getElementById("comment_area_box")
   while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
   }
};

const replyInsertAjax = ((id, content) => {
   const data = JSON.stringify({ 
      boardNo: boardNo,
		groupOrd: 0,
		groupLayer: 0,
		id: id,
		content: content,
   });
   const callback = () => {
      clearContent();
      replyShowContent();
      // let targetSection = document.getElementsByClassName("replyBox")[0];
      // console.log(targetSection);
      // targetSection.scrollIntoView({
      //    behavior: "smooth"
      // });
   }
   ajaxRequest(firstContextPath + "/reply/music", 'POST', data, callback);
});

const replyDeleteAjax = ((replyNo) => {
   const data = JSON.stringify({
      replyNo: replyNo,
   });
   const callback = () => {
      clearContent();
      replyShowContent();
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
      if (content.trim() !== "") {
         replyInsertAjax(id, content);
         Swal.fire({
            title: "등록 완료.",
            icon: "success",
         });
         document.getElementById("replyTextrea").value = "";
      } else {
         Swal.fire({
            title: "내용을 확인하세요!",
            icon: "warning",
         });
      }
      
   });

   $(document).on("click", ".commentModifyBtn", (e) => {
      let commentContent = $(e.target).closest(".comment_area").find('.commentContent').children().eq(0).text();
      let commentWriteAreaElemente = $(e.target).parent().parent().parent().parent().next();
      console.log(commentContent);

      $(".comment_write_area").addClass("displayNone");
      commentWriteAreaElemente.removeClass("displayNone");
      commentWriteAreaElemente.children().children().find(".comment_inbox").children().eq(1).find("textarea").val(commentContent);

      //console.log("comment_area: " + $(e.target).parent().parent().parent().parent().eq(0));
      //$(e.target).closest(".comment_area").find(".comment_write_area").removeClass("displayNone");
      // console.log("e.target" + $(e.target).closest('.comment_area').find('.comment_write_area').children().children().children().children());
   });

   $(document).on("click", ".commentDelBtn", (e) => {
      Swal.fire({
         title: "댓글을 삭제하시겠습니까?",
         icon: "warning",
         position: "center",
         showDenyButton: true,
         confirmButtonText: "Yes",
         denyButtonText: "No",
      }).then((result) => {
         if (result.isConfirmed) {
            let replyNo = parseInt($(e.target).parent().parent().attr("data-value"));
            replyDeleteAjax(replyNo);
            Swal.fire({
               title: "삭제되었습니다.",
               icon: "success",
            });
         } else if (result.isDenied) {
            Swal.fire({
               title: "취소되었습니다.",
               icon: "error",
            });
         }
      }); 
   });

   
})