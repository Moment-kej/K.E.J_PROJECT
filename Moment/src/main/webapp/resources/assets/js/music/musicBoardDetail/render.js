import { createAndAppendElement, formatDateTime_hhmmss, formatTime_hhmm, firstContextPath, pathNameOfBoardNumber} from "../../common/common.js";
import { replyDeleteAjax } from "./musicBoardDetail.js";

// ========================================================================================================================
export const createReplyBox = (data) => {
   const comment_area_box = document.getElementById("comment_area_box");

   data.map((item) => {
      let writeDt = formatDateTime_hhmmss(item.writeDt)
      
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
      // * 댓글 수정 및 삭제 Button
      const btnContainer = createAndAppendElement(firstContainer, "div", { class: "commentBtnBox", "data-value": item.replyNo } );
      const modifyBtnBox = createAndAppendElement(btnContainer, "button", { class: "modifyBtnBox" } );
      const commentModifyBtn = createAndAppendElement(modifyBtnBox, "i", { class: "fa-solid fa-pen-to-square commentModifyBtn"} )
      const deleteBtnBox = createAndAppendElement(btnContainer, "button", { class: "deleteBtnBox" } );
      const commentDelBtn = createAndAppendElement(deleteBtnBox, "i", { class: "fa-solid fa-trash commentDelBtn" } )
      const commentContent = createAndAppendElement(commentArea, "div", { class: "commentContent" });
      createAndAppendElement(commentContent, "span", {}, item.content)
      const commentWirterBtnBox = createAndAppendElement(commentArea, "div", { class: "commentWirterBtnBox" });
      const commentWriteBtn = createAndAppendElement(commentWirterBtnBox, "button", { type: "button", class: "commentWriteBtn" }, "답글작성")
      // * 답글 작성 폼
      const comment_area = createAndAppendElement(listElement, "div", { class: "comment_write_area displayNone" });
      const commentWriteBox = createAndAppendElement(comment_area, "div", { class: "commentWriteBox"})
      const commentWriter = createAndAppendElement(commentWriteBox, "div", { class: "commentWriter" });
      const commentInbox = createAndAppendElement(commentWriter, "div", { class: "comment_inbox" });
      createAndAppendElement(commentInbox, "span", { class: "comment_inbox_name" }, item.id);
      createAndAppendElement(commentInbox, "textarea", { id: "replyTextarea_"+item.replyNo, class: "textarea", placeholder: "댓글을 남겨보세요." });
      
      const commentAttach = createAndAppendElement(commentWriter, "div", { class: "comment_attach d-flex justify-content-between align-items-center" });
      const commentBoxWriteCount = createAndAppendElement(commentAttach, "div", { class: "comment_box_write_count" });
      createAndAppendElement(commentBoxWriteCount, "strong", { class: "fontSizeSmall comment_box_count_num" }, "0");
      createAndAppendElement(commentBoxWriteCount, "span", { class: "fontSizeSmall" }, " / ");
      createAndAppendElement(commentBoxWriteCount, "span", { class: "fontSizeSmall comment_box_write_total" }, "500");
      
      const registerBox = createAndAppendElement(commentAttach, "div", { class: "register_box" });
      const cancleBtn = createAndAppendElement(registerBox, "button", { type: "button", class: "button cancleBtn" }, "취소");
      const registerBtn = createAndAppendElement(registerBox, "button", { type: "button", class: "button registerBtn" }, "등록");
      // =====================================================================================      
      // * 댓글 취소버튼
      // todo 수정된 내용이 있으면 알림 띄워서 수정중인 내용 취소 할껀지 묻기, 없으면 걍 displayNone
      // cancleBtn.addEventListener ("click", (e) => {
      //    Swal.fire({
      //       title: "수정중인 내용을 취소 하겠습니까?",
      //       icon: "warning",
      //       position: "center",
      //       showDenyButton: true,
      //       confirmButtonText: "Yes",
      //       denyButtonText: "No",
      //    }).then((result) => {
      //       if (result.isConfirmed) {
      //          $(e.target).closest(".comment_write_area").addClass("displayNone");
      //       } 
      //    });
      // });
      // ========================================================================================================================
      // * 댓글 수정
      commentModifyBtn.addEventListener("click", (e) => {
         let commentContent = $(e.target).closest(".comment_area").find('.commentContent').children().eq(0).text();
         let replyNum = $(e.target).closest(".commentBtnBox").attr("data-value");
         $(".comment_area").show();
         $(".comment_modify_area").hide();
         $(e.target).closest(".comment_area").hide();
         let tempElement = e.target.closest(".commentItem");

         const modifyForm = document.createElement("div");
         modifyForm.setAttribute("id", "replyModifyForm_" + replyNum);
         modifyForm.classList.add("comment_modify_area");

         modifyForm.innerHTML = '<div class="commentWriteBox">' +
                                    '<div class="commentWriter">' +
                                       '<div class="comment_inbox">' +
                                          '<span class="comment_inbox_name">똥심</span>' +
                                          '<textarea id="modifyTextarea" class="textarea" placeholder="댓글을 남겨보세요.">' + commentContent + '</textarea>' +
                                       '</div>' +
                                       '<div class="comment_attach d-flex justify-content-between align-items-center">' +
                                          '<div class="comment_box_write_count">' +
                                             '<strong class="fontSizeSmall comment_box_count_num">' + commentContent.length + ' </strong>' +
                                             '<span class="fontSizeSmall"> / </span>' +
                                             '<span class="fontSizeSmall comment_box_write_total">3,000</span>' +
                                          '</div>' +
                                          '<div class="register_box">' +
                                             '<button type="button" class="button cancleBtn">취소</button>' +
                                             '<button type="button" class="button modifyBtn">저장</button>' +
                                          '</div>' +
                                       '</div>' +
                                    '</div>' +
                                 '</div>';
         tempElement.appendChild(modifyForm);
         
      });
      // ========================================================================================================================
      // ~ 댓글 삭제
      commentDelBtn.addEventListener("click", (e) => {
         // todo 해당 li만 지우기(현재는 전체 리로드 중)
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
      // ========================================================================================================================
      // ~ 답글 작성
      commentWriteBtn.addEventListener("click", (e) => {
         $(".comment_write_area").addClass("displayNone");
         $(e.target).parent().parent().next().removeClass("displayNone");
         let textareaElement = $(e.target).closest(".comment_area").next().children().children().children().children().eq(1);
         // let registerBtnElement = $(e.target).closest(".comment_area").next().children().children().children().eq(1).children().eq(1).children().eq(1);
         textareaElement.val("");
         // registerBtnElement.text("등록");
      });
   });
}
// ========================================================================================================================
export const createRelatedPost = (data) => {
   const relatePostList = document.getElementById('relatePostList');

   const relatedArticleTab = createAndAppendElement(relatePostList, 'div', { class: 'relatedArticleTab' });
   const ul = createAndAppendElement(relatedArticleTab, 'ul', { class: 'pl-1' });
   data.map((item) => {
      let writeDt = formatDateTime_hhmmss(item.writeDt)
      const li = createAndAppendElement(ul, 'li', { class: 'd-flex justify-content-between align-items-center', 'data-value': item.boardNo });
      const titArea = createAndAppendElement(li, 'div', { class: 'tit_area d-flex justify-content-start align-items-center' });
      const a = createAndAppendElement(titArea, 'a', { href: firstContextPath + '/board/music/' + item.boardNo });
      createAndAppendElement(a, 'span', { class: 'textColorTit' }, item.title);
      createAndAppendElement(titArea, 'span', { class: 'textColor count' }, '[' + item.replyCount + ']');

      const memberArea = createAndAppendElement(li, 'div', { class: 'member_area' });
      createAndAppendElement(memberArea, 'span', { class: 'text-right textColorGray' }, item.id);

      const dateArea = createAndAppendElement(li, 'div', { class: 'date_area' });
      createAndAppendElement(dateArea, 'span', { class: 'text-right textColorGray' }, writeDt);
      
      let selected = parseInt(li.getAttribute("data-value"));
      if (selected === pathNameOfBoardNumber()) {
         li.classList.add('currentSel');
      }
   });
}