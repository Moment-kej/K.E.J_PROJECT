import { writingBntEvent, menuCategoryEvent, Change_valueNull } from "./pageLinkChange.js";
import { boardListFormChang, initCategory, initPage } from "./viewRender.js";

// ------pageLinkChange.js------
// select tag option:checked onChang Event
document                
    .getElementById('handleAmount')
    .addEventListener('change', Change_valueNull);

// id="writingBnt" -> 글쓰기 Bnt onClick Event
writingBntEvent();
// class="menuCategory" -> board category onChange Event     
menuCategoryEvent();
// class="boardListFormChangeBtn" -> a tag onClick Event
boardListFormChang();
// class="menuCategoryATag" -> board category font color change
initCategory();
// class="pageNumber" -> board pagenation font color change
initPage();