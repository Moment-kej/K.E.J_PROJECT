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

export const replyInsertAjax = ((id, content) => {
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

export const replyUpdateAjax = ((content, replyNo) => {
   const data = JSON.stringify({
      content: content,
      replyNo: replyNo,
   });
   console.log("content: ",content, "replyNo: ", replyNo);
   const callback = () => {
      clearContent();
      replyShowContent();
   };
   ajaxRequest(firstContextPath + "/reply/music", "PUT", data, callback);
});

const replyDeleteAjax = ((replyNo) => {
   const data = JSON.stringify({
      replyNo: replyNo,
   });
   const callback = () => {
      clearContent();
      replyShowContent();
   }
   ajaxRequest(firstContextPath + "/reply/music/" + replyNo, "DELETE", data, callback);
});

const pageUpDown = (() => {
   const data = {code: 20};
   const callback = (data) => {
      const firstBoardNo = parseInt(data.first.boardNo);
      const lastBoardNo = parseInt(data.last.boardNo);
      switch (true) {
         case lastBoardNo === boardNo:
            Swal.fire({
               title: "마지막 페이지 입니다.",
               icon: "info",
            });
            $("#pageUp").css("display", "none");
         break;
   
         case firstBoardNo === boardNo:
            Swal.fire({
               title: "첫번째 페이지 입니다.",
               icon: "info",
            });
            $("#pageDown").css("display", "none");
         break;
   
         default:
            // 기본 동작
            break;
      }
      if(lastBoardNo == boardNo) {
         Swal.fire({
            title: "마지막 페이지 입니다.",
            icon: "info",
         });
      } else if(lastBoardNo != boardNo) {
         location.href = firstContextPath + '/board/music/' + parseInt(boardNo + 1);
      }
   }
   ajaxRequest(firstContextPath + "/board/music-boardNo-number", "GET", data, callback);
})

// =====================================================================================
$().ready(() => {
   replyShowContent();
   
   $("#goAllList").on("click", () => {
      location.href = firstContextPath + "/board/music"
   });

   $("#pageUp").on("click", () => {
      const data = {code: 20};
      const callback = (data) => {
         const lastBoardNo = parseInt(data.last.boardNo);
         if(lastBoardNo == boardNo) {
            Swal.fire({
               title: "마지막 게시글 입니다.",
               icon: "info",
            });
            $("#pageUp").hide();
         } else if(lastBoardNo != boardNo) {
            location.href = firstContextPath + '/board/music/' + parseInt(boardNo + 1);
         }
      }
      ajaxRequest(firstContextPath + "/board/music-boardNo-number", "GET", data, callback);
   });

   $("#pageDown").on("click", () => {
      const data = {code: 20};
      const callback = (data) => {
         const firstBoardNo = parseInt(data.first.boardNo);
         if(firstBoardNo == boardNo) {
            Swal.fire({
               title: "첫번째 게시글 입니다.",
               icon: "info",
            });
            $("#pageDown").hide();
         } else if(firstBoardNo != boardNo) {
            location.href = firstContextPath + '/board/music/' + parseInt(boardNo - 1);
         }
      }
      ajaxRequest(firstContextPath + "/board/music-boardNo-number", "GET", data, callback);
   });

   $("#likeIcon").on("click", (e) => {
      console.log(e.target);
   });

   $(document).on("click", ".commentWriteBtn", (e) => {
      $(".comment_write_area").addClass("displayNone");
      $(e.target).parent().parent().next().removeClass("displayNone");
      let textareaElement = $(e.target).closest(".comment_area").next().children().children().children().children().eq(1);
      let registerBtnElement = $(e.target).closest(".comment_area").next().children().children().children().eq(1).children().eq(1).children().eq(1);
      textareaElement.val("");
      registerBtnElement.text("등록");
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
      let commentWriteAreaElement = $(e.target).parent().parent().parent().parent().next();

      $(".comment_write_area").addClass("displayNone");
      let registerBtnElement = $(e.target).closest(".comment_area").next().children().children().children().eq(1).children().eq(1).children().eq(1);
      registerBtnElement.text("저장");

      commentWriteAreaElement.removeClass("displayNone");
      commentWriteAreaElement.children().children().find(".comment_inbox").children().eq(1).val(commentContent);
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