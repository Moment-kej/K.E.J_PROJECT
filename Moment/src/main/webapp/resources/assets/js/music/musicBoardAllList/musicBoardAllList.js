import { firstContextPath } from '../../common/common.js';
import { createSortListTypeComponent, createSortCardTypeComponent, createSortAlbumTypeComponent, createPagination } from './render.js'

// =====================================================================================
const showContent = (viewType, amount, category, pageNumber) => {
   $.ajax({
      url : firstContextPath + "/board/music-data",
      method : "GET",
      data : { code: 20, amount: amount, listType: viewType, category: category, page: pageNumber },
      contentType: "application/json", // 클라이언트 -> 서버로 전송할 데이터 타입
      dataType : "json", // 서버 -> 클라이언트로 받을 때 데이터 타입',
      success : (data) => {
         clearContent();
         currentViewType = viewType;
         amount = amount;
         category = category;
         if(viewType == "cardType") {
            createSortCardTypeComponent(data.data);
         }
         if(viewType == "albumType") {
            createSortAlbumTypeComponent(data.data);
         } 
         if(viewType == "listType") {
            createSortListTypeComponent(data.data);
         }
         
         createPagination(data.paging);
      },
      error:(error) => {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "통신 실패" + error
         });
      }
   });
};

// =====================================================================================
const sortCardIcon = document.getElementById("sortCard");
const sortAlbumIcon = document.getElementById("sortAlbum")
const sortListIcon = document.getElementById("sortList");

const disableViewTypeBtn = () => {
   sortListIcon.setAttribute("src", firstContextPath + "/assets/icon/sortList.svg");
   sortCardIcon.setAttribute("src", firstContextPath + "/assets/icon/sortCard.svg");
   sortAlbumIcon.setAttribute("src", firstContextPath + "/assets/icon/sortAlbum.svg");
};

// =====================================================================================
const clearContent = () => {
   const parentElement = document.getElementById("boardList")
   while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
   }
};

// =====================================================================================
let currentViewType = "listType"; // 카드형, 앨범형, 리스트형 
let category = 0; // 국악, 발라드, k-pop 등
let amount = 10; // 게시글 몇개씩 보여줄건지?

const init = () => {
   let page = 1;
   document.getElementById("cardType").addEventListener("click", () => {
      disableViewTypeBtn();
      sortCardIcon.setAttribute("src", firstContextPath + "/assets/icon/sortCardSelected.svg");
      
      showContent("cardType", amount, category, page);
   });

   document.getElementById("albumType").addEventListener("click", () => {
      disableViewTypeBtn();
      sortAlbumIcon.setAttribute("src", firstContextPath + "/assets/icon/sortAlbumSelected.svg");
      showContent("albumType", amount, category, page);
   });

   document.getElementById("listType").addEventListener("click", () => {
      disableViewTypeBtn();
      sortListIcon.setAttribute("src", firstContextPath + "/assets/icon/sortListSelected.svg");
      showContent("listType", amount, category, page);
   });

   $("#handleAmount").on("change", (e) => {
      amount = e.target.value;
      showContent(currentViewType, amount, category, page);
   });

   $(".categoryTemp").on("click", (e) => {
      category = e.target.getAttribute("data-value");
      if(category == null || category == undefined) {
         category = 0
      }

      let element = document.getElementsByClassName("categoryTemp");

      for(let i=0; i < element.length; i++) {
         element[i].classList.remove("menuCategoryATagClick");
         element[i].classList.add("menuCategoryATag");
      }

      $(e.target).removeClass("menuCategoryATag").addClass("menuCategoryATagClick");
      showContent(currentViewType, amount, category, page);
   });

   sortListIcon.setAttribute("src", firstContextPath + "/assets/icon/sortListSelected.svg");

   showContent(currentViewType, amount, category, page);
};

// =====================================================================================
$().ready(() => {
   init();
   let pageNumber;
   $(document).on("click", ".pageNumBtn", (e) => {
      pageNumber = parseInt($(e.target).text());
      clearContent();
      showContent(currentViewType, amount, category, pageNumber);
   });

   $(document).on("click", "#firstPageBtn", () => {
      pageNumber = parseInt($(".pbtnClick").eq(0).text());
      if(1 == pageNumber) {
         Swal.fire({
            icon: 'info',
            title: 'First Page',
         });
         return;
      }
      pageNumber = parseInt(1);
      clearContent();
      showContent(currentViewType, amount, category, pageNumber);
   });

   $(document).on("click", "#prevPageBtn", () => {
      let pageNumBtnFirstElement = $(".pageNumBtn").first().eq(0).text();

      if (pageNumber > pageNumBtnFirstElement) {
         pageNumber = parseInt(pageNumber) - 1;

         clearContent();
         showContent(currentViewType, amount, category, pageNumber);
      } else {
         Swal.fire({
            icon: 'info',
            title: 'First Page',
         });
         return;
      }
      
   });

   let pageNumBtnLastElement;
   $(document).on("click", "#nextpageBtn", () => {
      pageNumber = parseInt($(".pbtnClick").eq(0).text());
      pageNumBtnLastElement = parseInt($(".pageNumBtn").last().eq(0).text());

      if (pageNumber < pageNumBtnLastElement) {
         pageNumber = parseInt(pageNumber) + 1;
         clearContent();
         showContent(currentViewType, amount, category, pageNumber);
      } else {
         Swal.fire({
            icon: 'info',
            title: 'Last Page',
         });
         return;
      }
   });
   
   $(document).on("click", "#lastPageBtn", () => {
      pageNumBtnLastElement = $(".pageNumBtn").last().eq(0).text();
      
      if(pageNumBtnLastElement == pageNumber) {
         Swal.fire({
            icon: 'info',
            title: 'Last Page',
         });
         return;
      }
      pageNumber = parseInt(pageNumBtnLastElement);
      console.log(pageNumber)
      
      clearContent();
      showContent(currentViewType, amount, category, pageNumber);
   });
});