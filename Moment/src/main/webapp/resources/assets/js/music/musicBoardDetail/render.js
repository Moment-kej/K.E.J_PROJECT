import { createAndAppendElement, formatTime_hhmmss, firstContextPath} from "../../common/common.js";
import { replyUpdateAjax, replyInsertAjax } from "./musicBoardDetail.js"

export const createReplyBox = (data) => {
   const comment_area_box = document.getElementById("comment_area_box");

   data.map((item) => {
      let writeDt = formatTime_hhmmss(item.writeDt)
      
      const listElement = createAndAppendElement(comment_area_box, "li", { class: "commentItem pt-1" });
      const commentArea = createAndAppendElement(listElement, "div", { class: "comment_area" });
      const firstContainer = createAndAppendElement(commentArea, "div", { class: "d-flex justify-content-between align-items-center" });
      const secondContainer = createAndAppendElement(firstContainer, "div", { class: "d-flex justify-content-start align-items-center" });
      const replyUserImgBox = createAndAppendElement(secondContainer, "div", { class: "replyUserImgBox" });
      createAndAppendElement(replyUserImgBox, "img", { class : "mx-auto", src: firstContextPath + "/assets/images/faces/face3.jpg", alt: "프로필 이미지" })
      const replyInfoBox = createAndAppendElement(secondContainer, "div", { class: "replyInfoBox ml-2" });
      const replyInfoArea = createAndAppendElement(replyInfoBox, "div", { id: "replyInfoArea" });
      createAndAppendElement(replyInfoArea, "span", { class: "replyInfoID" }, item.id);
      createAndAppendElement(replyInfoArea, "span", { class : "replyInfoDate" }, writeDt)
      const btnContainer = createAndAppendElement(firstContainer, "div", { class: "commentBtnBox", "data-value": item.replyNo });
      createAndAppendElement(btnContainer, "button", { class: "modifyBtnBox" }, '<i class="fa-solid fa-pen-to-square commentModifyBtn"></i>');
      createAndAppendElement(btnContainer, "button", { class: "deleteBtnBox" }, '<i class="fa-solid fa-trash commentDelBtn"></i>');
      const commentContent = createAndAppendElement(commentArea, "div", { class: "commentContent" });
      createAndAppendElement(commentContent, "span", {}, item.content)
      createAndAppendElement(commentArea, "div", { class: "commentWirterBtnBox" }, '<button type="button" class="commentWriteBtn">답글작성</button>');
      // 답글 작성 폼
      const comment_area = createAndAppendElement(listElement, "div", { class: "comment_write_area displayNone" });
      const commentWriteBox = createAndAppendElement(comment_area, "div", { class: "commentWriteBox"})
      const commentWriter = createAndAppendElement(commentWriteBox, "div", { class: "commentWriter" });
      const commentInbox = createAndAppendElement(commentWriter, "div", { class: "comment_inbox" });
      createAndAppendElement(commentInbox, "span", { class: "comment_inbox_name" }, item.id);
      createAndAppendElement(commentInbox, "textarea", { placeholder: "댓글을 남겨보세요." });
      
      const commentAttach = createAndAppendElement(commentWriter, "div", { class: "comment_attach d-flex justify-content-between align-items-center" });
      const commentBoxWriteCount = createAndAppendElement(commentAttach, "div", { class: "comment_box_write_count" });
      createAndAppendElement(commentBoxWriteCount, "strong", { class: "fontSizeSmall comment_box_count_num" }, "0");
      createAndAppendElement(commentBoxWriteCount, "span", { class: "fontSizeSmall" }, "/");
      createAndAppendElement(commentBoxWriteCount, "span", { class: "fontSizeSmall comment_box_write_total" }, "500");
      
      const registerBox = createAndAppendElement(commentAttach, "div", { class: "register_box" });
      const cancleBtn = createAndAppendElement(registerBox, "button", { class: "button cancleBtn" }, "취소");
      const registerBtn = createAndAppendElement(registerBox, "button", { class: "button registerBtn" }, "등록");
      cancleBtn.addEventListener ("click", (e) => { 
         
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
      });
      registerBtn.addEventListener ("click", (e) => { 
         let commentContent = $(e.target).closest(".commentWriter").children().children().eq(1).val();
         let replyNo = $(e.target).closest(".comment_write_area").prev().children().eq(0).children().eq(1).attr("data-value");
         replyUpdateAjax(commentContent, replyNo);
         Swal.fire({
            title: "수정 완료.",
            icon: "success",
         });
      });
   });
}