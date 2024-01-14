import { ajaxRequest, pathNameOfBoardNumber, firstContextPath} from '../../common/common.js';
import { createReplyBox, createRelatedPost } from './render.js';

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

const relatedPostContent = (() => {
   const data = { boardNo : boardNo, code: 20};
   const callback = (data) => {
      createRelatedPost(data);
   }
   ajaxRequest(firstContextPath + "/board/music/relation-post", 'GET', data, callback);
});

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
   const callback = () => {
      clearContent();
      replyShowContent();
   };
   ajaxRequest(firstContextPath + "/reply/music", "PUT", data, callback);
});

export const replyDeleteAjax = ((replyNo) => {
   const data = JSON.stringify({
      replyNo: replyNo,
   });
   const callback = () => {
      clearContent();
      replyShowContent();
   }
   ajaxRequest(firstContextPath + "/reply/music/" + replyNo, "DELETE", data, callback);
});

export const countTextLength = ((target) => {
   let currentTextLength = target.closest(".comment_inbox").next().children().children().eq(0);

   if (target.val().length > 3000) {
      let inputText = target.val();
      Swal.fire({
         title: "3,000자까지 작성할 수 있습니다.",
         icon: "info",
      });
      target.val(target.val().substring(0, 3000));
      target.text(inputText.length);
   }
   $(currentTextLength).text(target.val().length); //실시간 글자수 카운팅
});

// =====================================================================================
$().ready(() => {
   replyShowContent();
   relatedPostContent();
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

   // ~ 부모 댓글 작성 폼에서 등록 Button
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

   // ~ 수정 폼 취소 버튼
   $(document).on("click", ".cancleBtn", (e) => {
      Swal.fire({
         title: "수정중인 내용을 취소 하겠습니까?",
         icon: "warning",
         position: "center",
         showDenyButton: true,
         confirmButtonText: "Yes",
         denyButtonText: "No",
      }).then((result) => {
         if (result.isConfirmed) {
            $(e.target).closest(".comment_write_area").addClass("displayNone");
         } 
      });
   })

   // ~ 댓글 수정 Button (기존 댓글 수정 폼 뜨게하기)
   $(document).on("click", ".modifyBtn", (e) => {
      let content = $(e.target).closest(".comment_attach").prev().children().eq(1).val();
      let writer = $(e.target).closest(".comment_attach").prev().children().eq(0).text();
      let replyNo = $(e.target).closest(".comment_modify_area").attr("id");
      replyNo = parseInt(replyNo.split("_").pop());
      replyUpdateAjax(content, replyNo)
   });
   
   //~ textarea 글자 수 체크
   $(document).on("input", ".textarea", (e) => {
      let target = $(e.target);
      let currentTextLength = target.closest(".comment_inbox").next().children().children().eq(0);

      if (target.val().length > 3000) {
         let inputText = target.val();
         Swal.fire({
            title: "3,000자까지 작성할 수 있습니다.",
            icon: "info",
         });
         target.val(target.val().substring(0, 3000));
         target.text(inputText.length);
      }
      $(currentTextLength).text(target.val().length); //실시간 글자수 카운팅
   });

})