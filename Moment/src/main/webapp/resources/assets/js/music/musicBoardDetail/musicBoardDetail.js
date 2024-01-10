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

function getTextLength(str) {
   var len = 0;

   for (var i = 0; i < str.length; i++) {
      if (escape(str.charAt(i)).length == 6) {
         len++;
      }
      len++;
   }
   return len;
}

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
   // ~ 댓글 수정
   $(document).on("click", ".modifyBtn", (e) => {
      let content = $(e.target).closest(".comment_attach").prev().children().eq(1).val();
      let writer = $(e.target).closest(".comment_attach").prev().children().eq(0).text();
      let replyNo = $(e.target).closest(".comment_modify_area").attr("id");
      replyNo = parseInt(replyNo.split("_").pop());

      console.log("content: ", content, "writer: ", writer, "replyNo: ", replyNo)
      replyUpdateAjax(content, replyNo)
   });
   
   // todo 글자수 체크하는거 해야함
   // $("#replyTextrea").keyup(function(e) {
   //    console.log("키업!");
   //    let content = $(this).val();
   //    let countNum = $(e.target).closest("comment_inbox");
   //    console.log(countNum);
   //    $(countNum).val("(" + content.length + "/ 200)"); //실시간 글자수 카운팅
   //    if (content.length > 500) {
   //       Alert("최대 500자까지 입력 가능합니다.");
   //       $(this).val(content.substring(0, 200));
   //       $('#replyTextrea').html("(200 / 최대 200자)");
   //    }
   // });

})