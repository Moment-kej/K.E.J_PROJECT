import { firstContextPath, ajaxRequest, formatTime_hhmm, boardNumber, formatTime_hhmmss } from "../common/common.js";

//--url pathname 추출------------------------------------
const firstPath = firstContextPath;   // '/moment' 가져오기

// --a tag------------------------------------------------
// 목록으로 a tag href 설정
const goAllListBtn = document.querySelectorAll('.goAllList');
goAllListBtn.forEach(button => {
    button.addEventListener('click', () => {
        location.href = firstPath + '/board/dress';
    });
});
document.getElementById('dressAllList').addEventListener('click', () => {location.href = firstPath + '/board/dress';});

// 댓글작성 a tag click event
const replyWriterBnt = (replyNo) => {
    // 클래스를 토글함으로써 댓글 작성란이 나타났다가 사라지게 됨.
    const replyWriterBnts = document.getElementById('replyWriterBnt_' + replyNo);
    replyWriterBnts.addEventListener('click', () => {
        document.getElementById('replyWriterContainal_' + replyNo).classList.toggle('hidden');
    });
};

// 이전글, 다음글 a tag href
const pageUpAndDown = () => {
    const callback = (data) => {
        if(parseInt(data[0].boardNo, 10) === boardNumber()) {
            document.getElementById('pageUp').className = 'noUpPage';
        } else {
            document.getElementById('pageUp').classList.remove('noUpPage');
            // 이전글
            document.getElementById('pageUp').addEventListener('click', () => {
                location.href = (firstPath + '/board/dress/all/' + parseInt(boardNumber() + 1, 10));
            });
        }
        // 다음글
        document.getElementById('pageDown').addEventListener('click', () => {
            location.href = (firstPath + '/board/dress/all/' + parseInt(boardNumber() - 1, 10));
        })
    }

    let data = {page : 1, amount : 1, code: 10, category: 0};

    ajaxRequest(firstPath + '/board/dress/all', 'GET', data, callback);
};

// 수정 또는 삭제 a tag href
const boardManagemantBnt = () => {
    let boadrWriter = document.querySelector('.userID').textContent;
    // 작성자와 매개변수로 들어갈 userId가 동일하면 버튼 활성화 시키기 !! 아직 못함
    console.log(boadrWriter);

    // 수정 페이지로 이동
    const modifyBtn = document.querySelectorAll('.modify');
    modifyBtn.forEach(button => {
        button.addEventListener('click', () => {
            location.href = firstContextPath + '/board/dress/modify/' + boardNumber();
        });
    }); 
}
// --a tag end------------------------------------------------

// board detail ajax
const boardDetail = () => {
    const data = {
        boardNo : boardNumber()
    }
    const callback = (data) => {
        document.querySelector('.userID').textContent = data.id;                     // 아이디
        document.querySelector('#title').textContent = data.title;                   // 제목
        document.querySelector('#content').innerHTML = data.content;                 // 내용
        document.querySelector('.date').textContent = formatTime_hhmmss(data.writeDt); // 등록일
        document.querySelector('.viewCount').textContent = data.viewCount;           // 조회수
        document.querySelector('.likeCount').textContent = data.likeCount;           // 좋아요 개수
        document.querySelector('.replyCount').textContent = data.replyCount;         // 댓글 개수
    }

    ajaxRequest(firstPath + '/board/dress/boardDetail', 'GET', data, callback);
};

// board delete ajax
const boardDelAtax = () => {
    document.getElementById('delete').addEventListener('click', () => {
        const data = JSON.stringify({
            boardNo: String(boardNumber()),
            yn: 0,
            id: document.querySelector('.userID').textContent
        });

        const callback = () => {
            Swal.fire({
                title: "게시글을 삭제하시겠습니까?",
                text: "삭제 시 되돌릴 수 없습니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "예",
                cancelButtonText: "아니요"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        title: "게시글 삭제가 완료되었습니다.",
                        didClose: function () {
                            location.href = firstPath + '/board/dress';
                        }
                    });
                }
            });
        };

        ajaxRequest(firstPath + '/board/dress/del', 'POST', data, callback);
    });
};

// ------------------------------------------------------------
// child reply insert ajax
const childReplyInsertAtax = (replyNo) => {
    const childReplyInsertBnt = document.querySelector('#childReplyInBtn_' + replyNo);
    const childReplyInsertArea = childReplyInsertBnt.closest('#childReplyArea_' + replyNo);

    childReplyInsertBnt.addEventListener('click', () => {
        const id = childReplyInsertArea.querySelector('.comment_inbox_name').textContent;
        const content = childReplyInsertArea.querySelector('.comment_inbox textarea').value;
        const groupNo = childReplyInsertArea.id.split('_')[1];

        const data = JSON.stringify({
            boardNo: boardNumber(),
            groupNo: parseInt(groupNo),
            groupLayer: 1,
            id: id,
            content: content
        });

        const callback = () => {
            replyList();            // 댓글 ajax 호출
            boardDetail();          // 상세조회 ajax 호출
            boardRelatedPosts();    // 관련글 ajax 호출

            Swal.fire({
                position: "center",
                icon: "success",
                title: "댓글 등록이 완료하였습니다.",
                showConfirmButton: false,
                timer: 1500
            });
        };

        ajaxRequest(firstPath + '/reply/dress/in', 'POST', data, callback);
    });
}
// parent reply insert ajax
const parentReplyInsertAjax = () => {
    document.getElementById('replyInsertBnt').addEventListener('click', () => {
        let id = document.getElementById('replyWriter').textContent;
        let boardNo = boardNumber();
        let content = document.getElementById('replyTextrea').value;

        const data = JSON.stringify({
            boardNo: boardNo,
            groupNo: 0,
            groupLayer: 0,
            id: id,
            content: content,
        });
        const callback = () => {
            document.getElementById('replyTextrea').value = '';     // 값 초기화
            boardDetail();          // 상세조회 ajax 호출
            replyList();            // 댓글 ajax 호출
            boardRelatedPosts();    // 관련글 ajax 호출
            Swal.fire({
                position: "center",
                icon: "success",
                title: "댓글 등록이 완료하였습니다.",
                showConfirmButton: false,
                timer: 1500
            });
        };

        if(content.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "게시글 내용을 입력해주세요",
                didClose: function () {
                    return false; // 제출 취소
                }
            });
        } else {
            ajaxRequest(firstPath + '/reply/dress/in', 'POST', data, callback);
        }
    });
};

const parentReplyDeleteAjax = (replyNo) => {
    const delBtn = document.querySelector('.deleteBtnBox[chre-data="' + replyNo + '"]');
    delBtn.addEventListener('click', () => {
        const data = {replyNo: String(replyNo)};
        // 부모 댓글 삭제하면 '삭제된 댓글입니다'라고 나오는건 어때?
        const callback = () => {
            Swal.fire({
                title: "댓글을 삭제하시겠습니까?",
                text: "삭제 시 되돌릴 수 없습니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "예",
                cancelButtonText: "아니요"
            }).then((result) => {
                if (result.isConfirmed) {
                    boardDetail();          // 상세조회 ajax 호출
                    replyList();            // 댓글 ajax 호출
                    boardRelatedPosts();    // 관련글 ajax 호출

                    Swal.fire({
                        icon: "success",
                        title: "삭제완료",
                        // didClose: function () {
                        // }
                    });
                }
            });
        };

        ajaxRequest(firstPath + '/reply/dress/del/' + replyNo, 'POST', data, callback);
    })
}

// ------------------------------------------------------------
// 댓글 textarea 글자수 표기 및 제한
const replyTextarea = () => {
    let textarea = document.getElementById('replyTextrea');
    let writeCount = document.getElementById('writeCount');
    let maxCount = 100;

    textarea.addEventListener('input', function () {
        let inputText = textarea.value;
        // 글자수가 100보다 크면
        if(inputText.length > maxCount) {
            // 101번째 글자부터 무시
            inputText = inputText.substring(0, maxCount);
            textarea.value = inputText;
        };
        writeCount.textContent = inputText.length;
    });
};

// 대댓글 textarea 글자수 표기 및 제한
const replySectionTwoTextarea = (replyNo) => {
    let textarea = document.getElementById('replySectionTwoTextarea_' + replyNo);
    let writeCount = document.getElementById('writeCount_' + replyNo);
    let maxCount = 100;

    textarea.addEventListener('input', function () {
        let inputText = textarea.value;
        // 글자수가 100보다 크면
        if(inputText.length > maxCount) {
            // 101번째 글자부터 무시
            inputText = inputText.substring(0, maxCount);
            textarea.value = inputText;
        };
        writeCount.textContent = inputText.length;
    });
};
// ------------------------------------------------------------
// child reply render
const ChildreplyRender = (post, containal) => {
    const outContainer = document.createElement("div");
    outContainer.classList.add('mb-2','pb-3','pt-3', 'hrStyleChildReply');
    outContainer.id = 'child_' + post.replyNo;

    const commentContainer = document.createElement("div");
    commentContainer.classList.add('d-flex', 'justify-content-start', 'align-items-center');

    // 프로필
    const userImgBox = document.createElement("div");
    userImgBox.className = "replyUserImgBox";
    const img = document.createElement("img");
    img.className = "mx-auto";
    img.setAttribute('src', firstPath + '/assets/images/faces/face1.jpg');
    img.setAttribute('alt', '프로필 사진');
    userImgBox.appendChild(img);

    const infoBox = document.createElement("div");
    infoBox.classList.add('replyInfoBox', 'ml-2');

    const infoDiv = document.createElement("div");

    // 아이디
    const userIDSpan = document.createElement("span");
    userIDSpan.className = "replyInfoID";
    userIDSpan.textContent = post.id;
    infoDiv.appendChild(userIDSpan);

    // 등록일
    const dateSpan = document.createElement("span");
    dateSpan.className = "replyInfoDate";
    dateSpan.textContent = formatTime_hhmm(post.writeDt);
    infoDiv.appendChild(dateSpan);

    infoBox.appendChild(infoDiv);

    // 댓글 내용
    const contentDiv = document.createElement("div");
    contentDiv.className = "commentContent";
    const contentSpan = document.createElement("span");
    contentSpan.innerHTML = post.content;
    contentDiv.appendChild(contentSpan);

    // 답글 작성 버튼
    const btnBox = document.createElement("div");
    btnBox.classList.add("commentWirterBtnBox");
    const replyLink = document.createElement("a");
    replyLink.href = "#";
    replyLink.textContent = "답글작성";
    btnBox.appendChild(replyLink);

    // 생성한 엘리먼트들을 컨테이너에 추가
    commentContainer.appendChild(userImgBox);
    commentContainer.appendChild(infoBox);
    
    outContainer.appendChild(commentContainer);
    outContainer.appendChild(contentDiv);
    outContainer.appendChild(btnBox);

    // 자식 댓글 컨테이너에 붙혀넣기
    document.querySelector(containal).appendChild(outContainer);
};

// parent and child reply render
const replyRender = (post) => {
    // 댓글 컨테이너
    const replySection = document.getElementById('replySection');
    
    replySection.innerHTML = '';    // 댓글 목록 초기화
    
    //reply view render
    post.forEach((item) => {
        const replyInnerSection = document.createElement('div');
        replyInnerSection.classList.add('replyInnerSecion', 'hrStyle', 'pb-4', 'mb-2');
        replyInnerSection.id = 'originalComment_' + item.replyNo;

        // 부모댓글 감쌀 div 생성
        const parentReplyContainal = document.createElement('div');
        parentReplyContainal.className = 'parentReplyContainal';

        //userInfoContainal 감쌀 div 추가
        const userInfoContainal = document.createElement('div');
        userInfoContainal.classList.add('d-flex', 'justify-content-between', 'align-items-center');

        // 사용자 정보 부분 생성
        const userContainer = document.createElement('div');
        userContainer.classList.add('d-flex', 'justify-content-start', 'align-items-center');

        const replyUserImgBox = document.createElement('div');
        replyUserImgBox.classList.add('replyUserImgBox');

        // 프로필 사진
        const userImg = document.createElement('img');
        userImg.src = firstPath + "/assets/images/faces/face3.jpg";
        userImg.alt = "프로필";
        userImg.classList.add('mx-auto');

        replyUserImgBox.appendChild(userImg);
        userContainer.appendChild(replyUserImgBox);

        // 유저 아이디, 댓글 작성일
        const replyInfoBox = document.createElement('div');
        replyInfoBox.classList.add('replyInfoBox', 'ml-2');

        const infoContainer = document.createElement('div');
        // 아이디
        const replyInfoID = document.createElement('span');
        replyInfoID.classList.add('replyInfoID');
        replyInfoID.textContent = item.id;
        // 댓글 작성일
        const replyInfoDate = document.createElement('span');
        replyInfoDate.classList.add('replyInfoDate');
        replyInfoDate.textContent = formatTime_hhmm(item.writeDt);

        infoContainer.appendChild(replyInfoID);
        infoContainer.appendChild(replyInfoDate);

        replyInfoBox.appendChild(infoContainer);

        userContainer.appendChild(replyInfoBox);
        userInfoContainal.appendChild(userContainer);
        parentReplyContainal.appendChild(userInfoContainal);

        // 부모 댓글 수정, 삭제 버튼
        const bntContainer = document.createElement('div');
        bntContainer.className = 'commentBtnBox';
        // 부모 댓글 수정 버튼
        const modifyButton = document.createElement('button');
        modifyButton.classList.add('modifyBtnBox');
        const modifyButton_i = document.createElement('i');
        modifyButton_i.classList.add('fa-solid','fa-pen-to-square','commentModifyBtn');
        modifyButton.appendChild(modifyButton_i);
        // 부모 댓글 삭제 버튼
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteBtnBox');
        deleteButton.setAttribute('chre-data', item.replyNo);
        const deleteButton_i = document.createElement('i');
        deleteButton_i.classList.add('fa-solid','fa-trash', 'commentDelBtn');
        deleteButton.appendChild(deleteButton_i);

        bntContainer.appendChild(modifyButton);
        bntContainer.appendChild(deleteButton);

        userInfoContainal.appendChild(bntContainer);
        parentReplyContainal.appendChild(userInfoContainal);
        
        // 댓글 내용 부분 생성
        const commentContent = document.createElement('div');
        commentContent.classList.add('commentContent');
        const commentContent_span = document.createElement('span');
        if(item.yn === 0) {
            commentContent_span.textContent = '삭제 댓글입니다.';
            commentContent_span.className = 'parentReplyContent';
        } else {
            commentContent_span.textContent = item.content;
        }
        commentContent.appendChild(commentContent_span);
        parentReplyContainal.appendChild(commentContent);
        
        // 답글 작성 버튼 부분 생성
        const commentWirterBtnBox = document.createElement('div');
        commentWirterBtnBox.classList.add('commentWirterBtnBox','mt-2');
        
        const replyWriterBtn = document.createElement('a');
        replyWriterBtn.id = 'replyWriterBnt_' + item.replyNo;
        replyWriterBtn.textContent = '답글작성';
        replyWriterBtn.style.cursor = 'pointer';
        
        commentWirterBtnBox.appendChild(replyWriterBtn);
        parentReplyContainal.appendChild(commentWirterBtnBox);
        
        replyInnerSection.appendChild(parentReplyContainal);

        // 대댓글 작성 부분------------------------------------------
        const replyWriterContainer = document.createElement('div');
        replyWriterContainer.classList.add('pl-4', 'hidden', 'mb-4', 'hrStyle');
        replyWriterContainer.id = 'replyWriterContainal_' + item.replyNo;

        
        // 대댓글 목록----------------------------------------------
        const childReplyContent = document.createElement('div');
        childReplyContent.classList.add('childReplyContainal', 'pl-4', 'mt-3');
        childReplyContent.id = 'child_reply_' + item.replyNo;

        const childReplyinnerContainal = document.createElement('div');
        childReplyinnerContainal.classList.add('childReplyinnerContainal');
        childReplyinnerContainal.setAttribute('reply-append', item.replyNo);

        childReplyContent.appendChild(childReplyinnerContainal);

        const innerDiv1 = document.createElement('div');
        innerDiv1.classList.add('commentWriter');
        innerDiv1.id = 'childReplyArea_' + item.replyNo;

        const innerDiv2 = document.createElement('div');

        const commentWriterDiv = document.createElement('div');

        const commentInboxDiv = document.createElement('div');
        commentInboxDiv.classList.add('comment_inbox');

        const commentInboxNameSpan = document.createElement('span');
        commentInboxNameSpan.classList.add('comment_inbox_name');

        const textarea = document.createElement('textarea');
        textarea.setAttribute('placeholder', '댓글을 남겨보세요');
        textarea.id = 'replySectionTwoTextarea_' + item.replyNo;

        const commentAttachDiv = document.createElement('div');
        commentAttachDiv.classList.add('comment_attach', 'd-flex', 'justify-content-between', 'align-items-center');

        const commentBoxWriteCountDiv = document.createElement('div');
        commentBoxWriteCountDiv.classList.add('comment_box_write_count');

        const countNumStrong = document.createElement('strong');
        countNumStrong.classList.add('fontSizeSmall', 'comment_box_count_num');
        countNumStrong.id = 'writeCount_' + item.replyNo;
        countNumStrong.textContent = '0';
        
        const slashSpan = document.createElement('span');
        slashSpan.classList.add('fontSizeSmall');
        slashSpan.textContent = '/';

        const writeTotalSpan = document.createElement('span');
        writeTotalSpan.classList.add('fontSizeSmall', 'comment_box_write_total');
        writeTotalSpan.textContent = '100';
        
        commentBoxWriteCountDiv.appendChild(countNumStrong);
        commentBoxWriteCountDiv.appendChild(slashSpan);
        commentBoxWriteCountDiv.appendChild(writeTotalSpan);
        commentAttachDiv.appendChild(commentBoxWriteCountDiv);

        const registerBoxDiv = document.createElement('div');
        registerBoxDiv.classList.add('register_box');

        commentAttachDiv.appendChild(registerBoxDiv);
        
        const submitButton = document.createElement('a');
        submitButton.classList.add('button');
        submitButton.id = 'childReplyInBtn_' + item.replyNo;
        submitButton.textContent = '등록';
        
        // 텍스트 내용 추가
        commentInboxNameSpan.textContent = '똥심';

        registerBoxDiv.appendChild(submitButton);

        commentInboxDiv.appendChild(commentInboxNameSpan);
        commentInboxDiv.appendChild(textarea);

        commentWriterDiv.appendChild(commentInboxDiv);
        commentWriterDiv.appendChild(commentAttachDiv);

        innerDiv2.appendChild(commentWriterDiv);

        innerDiv1.appendChild(innerDiv2);

        replyWriterContainer.appendChild(innerDiv1);

        // 생성한 댓글 섹션을 컨테이너에 추가
        replySection.appendChild(replyInnerSection);
        replySection.appendChild(replyWriterContainer);
        replyInnerSection.appendChild(childReplyContent);
    });
};
// parent reply attribute create & parent modify button event & modify save button event
const parentReplyAttributeCreate_and_SaveButtonAjax = () => {
    // 이전 수정 폼을 저장할 변수
    let existingEditForm;
    // 각 댓글에 data-reply-no 속성을 추가
    let parentReplyContainal = document.querySelectorAll('.parentReplyContainal');
    for(let i = 0 ; i < parentReplyContainal.length ; i++) {
        parentReplyContainal[i].setAttribute("data-reply-no", i + 1);
    };
    // 각 댓글 수정 버튼에 data-reply-no 속성을 추가
    var editButtons = document.querySelectorAll(".modifyBtnBox");
    for(let i = 0 ; i < editButtons.length ; i++) {
        editButtons[i].setAttribute("data-reply-no", i + 1);
    };
    // 수정 버튼에 클릭 이벤트 추가
    editButtons.forEach(button => {
        button.addEventListener("click", parentReplyUpdateFormChange);
    });
};

// parent reply 설정
const parentReplyUpdateFormChange = (button) => {
    // 댓글 번호 가져오기
    let number = button.currentTarget.getAttribute("data-reply-no");
    // 댓글 내용 가져오기
    let commentContent = button.currentTarget.closest('.parentReplyContainal').querySelector('.commentContent span').innerText;

    // 새로운 수정 폼 생성
    let editForm = document.createElement("div");
    editForm.classList.add("commentWriter");
    editForm.setAttribute("id", "parentReplyEditForm_" + number);
    editForm.style.display = "block";  // 수정 폼을 보이게 설정

    editForm.innerHTML = '<div class="comment_inbox"> ' +
                            '<span class="comment_inbox_name" id="replyWriter_mod">등록확인</span>' +
                            '<textarea id="replyTextrea_mod" placeholder="댓글을 남겨보세요">' + commentContent + '</textarea>' +
                        '</div>' +
                        '<div class="comment_attach d-flex justify-content-between align-items-center">' +
                            '<div class="register_box">' +
                                '<a type="button" class="button" id="replymodBnt" onclick="saveEditedComment(' + number + ')">저장</a>' +
                                '<a type="button" class="button" id="replymodCancel" onclick="cancelEditedComment(' + number + ')">취소</a>' +
                            '</div>' +
                        '</div>';
    
    // 이전 댓글 영역 숨기기
    let parentReplyContainer = button.currentTarget.closest('.parentReplyContainal[data-reply-no="' + number + '"]');
    parentReplyContainer.style.display = "none";
    
    // 수정 폼 삽입
    parentReplyContainer.insertAdjacentElement("afterend", editForm);
};

// 부모 댓글 수정 클릭 이벤트 (update ajax 포함)
window.saveEditedComment = (number) => {
    // 수정된 댓글 내용 가져오기
    const editedCommentText = document.getElementById("replyTextrea_mod").value;
    const parentReplyContainer = document.querySelector(".parentReplyContainal[data-reply-no='" + number + "']");
    const replyNo = parseInt(parentReplyContainer.parentNode.id.split('_')[1]);
    
    // 수정된 댓글 내용으로 댓글 업데이트
    // const parentReplyContent = parentReplyContainer.children[1];
    // parentReplyContent.querySelector("span").innerText = editedCommentText;

    // reply update ajac
    const data = JSON.stringify({
        replyNo : replyNo,
        content : editedCommentText,
    });
    const callback = () => {
        replyList();
    };
    ajaxRequest(firstPath + '/reply/dress/mod', 'POST', data, callback);

    // 이전 댓글 영역 다시 표시
    parentReplyContainer.style.display = "block";
    // 수정 폼 제거
    document.getElementById("parentReplyEditForm_" + number).remove();
};
// 부모 댓글 수정 취소 클릭 이벤트
window.cancelEditedComment = (number) => {
    let parentReplyContainer = document.querySelector(".parentReplyContainal[data-reply-no='" + number + "']");
    // 이전 댓글 영역 다시 표시
    parentReplyContainer.style.display = "block";
    // 수정 폼 제거
    document.getElementById("parentReplyEditForm_" + number).remove();
};

// reply and child reply ajax
const replyList = () => {
    let data = {boardNo : boardNumber()};
    let callback = (data) => {
        replyRender(data);      // 부모 댓글 랜더링, 자식 댓글 랜더링 할 div 생성
        parentReplyAttributeCreate_and_SaveButtonAjax();
        
        // 서버에서 가져오는 댓글 중 자식 댓글 리스트 가져오기
        data.forEach(item => {
            const replyNo = item.replyNo;       // 댓글 번호
            let child = item.childReplyList;    // 자식 댓글 리스트

            replyWriterBnt(replyNo);            // 댓글 작성란 토글 이벤트
            parentReplyDeleteAjax(replyNo);     // 댓글 삭제
            childReplyInsertAtax(replyNo);      // 대댓글 등록
            replySectionTwoTextarea(replyNo);   // 대댓글 작성란 글자수 표기 및 제한

            child.map(child_item => {
                ChildreplyRender(child_item, '.childReplyinnerContainal[reply-append="' + replyNo + '"]');
            });
            // let removeElement = document.getElementById('child_reply_' + item.replyNo);
            // removeElement.style.display = 'none';
        });
    };
    ajaxRequest(firstPath + '/reply/dress/replyList', 'GET', data, callback);
};

// ------------------------------------------------------------
// 관련글 랜더링
const relatedListRender = (posts) => {
    // 댓글 컨테이너
    const relatedArticleTab = document.querySelector('.relatedArticleTab');
    
    relatedArticleTab.innerHTML = '';    // 관련 게시글 목록 초기화

    const ul = document.createElement('ul');
    ul.className = 'pl-1';
    
    //related list view render
    posts.forEach((post) => {

        const li = document.createElement('li');
        li.classList.add('d-flex','justify-content-between','align-items-center');

        const div_1 = document.createElement('div');
        div_1.classList.add('tit_area','d-flex','justify-content-start','align-items-center');

        const a = document.createElement('a');
        a.className = 'titleATag';
        a.setAttribute('href', firstPath + '/board/dress/all/' + post.boardNo);
        a.setAttribute('data-title', post.boardNo);
        a.innerText = post.title;

        const div_1_span = document.createElement('span');
        div_1_span.classList.add('ml-1','textColor','count');
        div_1_span.innerText = '[' + post.replyCount + ']';

        div_1.appendChild(a);
        div_1.appendChild(div_1_span);    // div_1 최종

        const div_2 = document.createElement('div');
        div_2.className = 'member_area';

        const div_2_span = document.createElement('span');
        div_2_span.classList.add('text-right','textColorGray');
        div_2_span.innerText = post.id;

        div_2.appendChild(div_2_span);    // div_2 최종

        const div_3 = document.createElement('div');
        div_3.className = 'date_area';

        const div_3_span = document.createElement('span');
        div_3_span.classList.add('text-right','textColorGray','pr-2');
        div_3_span.innerText = formatTime_hhmm(post.writeDt);

        div_3.appendChild(div_3_span);   // div_3 최종

        li.appendChild(div_1);
        li.appendChild(div_2);
        li.appendChild(div_3);

        ul.append(li);
    });

    relatedArticleTab.append(ul);
};

// 관련글 랜더링 된 장소에서 현재 게시글 표시하기
const RelatedAt = () => {
    let boardNumer = boardNumber();
    if(boardNumer) {
        let titleElement = document.querySelector('.titleATag[data-title="' + boardNumer + '"]');
        const li = titleElement.closest("li");
        if(titleElement) {
            li.classList.add('selected');
        }
    }
}

// 관련글 ajax
const boardRelatedPosts = () => {
    let categoryElement = document.querySelector('.title > span');
    let category = parseInt(categoryElement.id);
    let data = {boardNo : boardNumber(), category : category};
    let callback = (data) => {
        relatedListRender(data);
        RelatedAt();
    }
    ajaxRequest(firstPath + '/board/dress/boardRelatedPosts', 'GET', data, callback);
}
// ------------------------------------------------------------

// ajax function
// board
boardDetail();
boardDelAtax();
pageUpAndDown();
// board related post
boardRelatedPosts();
// reply
replyList();
parentReplyInsertAjax();

// 함수 호출
window.onload = () => {
    boardManagemantBnt();   // security로 id 들고오면 수정 해야 함.
    replyTextarea();        // 댓글 작성란 글자수 표기 및 제한
};