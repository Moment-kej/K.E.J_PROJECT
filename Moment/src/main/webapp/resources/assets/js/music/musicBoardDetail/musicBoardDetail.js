import { ajaxRequest, pathNameOfBoardNumber, firstContextPath} from '../../common/common.js';
import { createReplyBox } from './render.js';
// =====================================================================================

const data = { boardNo : pathNameOfBoardNumber()};
const callback = (data) => {
   createReplyBox(data);
}

ajaxRequest(firstContextPath + "/reply/music/reply-data", 'GET', data, callback);

// =====================================================================================
$().ready(() => {
   $("#goAllList").on("click", () => {
      location.href = firstContextPath + "/board/music"
   });

   $(document).on("click", ".commentWriteBtn", (e) => {
      console.log("버튼 누르면 버튼 사라져야함ㅋ");
      $(".comment_write_area").addClass("displayNone");
      $(e.target).parent().parent().next().removeClass("displayNone");
   });
})