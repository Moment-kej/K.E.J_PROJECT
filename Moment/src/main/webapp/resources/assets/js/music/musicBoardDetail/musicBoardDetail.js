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
   })
})