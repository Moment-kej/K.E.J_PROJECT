import { firstContextPath, ajaxRequest, formatTimestamp, boardNumber } from "../common/common.js";

//--url pathname 추출------------------------------------
const firstPath = firstContextPath;   // '/moment' 가져오기

// --a tag------------------------------------------------
// 목록으로 a tag href 설정
document.getElementById('goAllList').addEventListener('click', () => {
    location.href = firstPath + '/board/dress';
})
document.getElementById('dressAllList').addEventListener('click', () => {
    location.href = firstPath + '/board/dress';
})

// 댓글작성 a tag click event
const replyWriterBnt = (replyNo) => {
    // 클래스를 토글함으로써 댓글 작성란이 나타났다가 사라지게 됨.
    const replyWriterBnts = document.getElementById('replyWriterBnt_' + replyNo);
    replyWriterBnts.addEventListener('click', () => {
        document.getElementById('replyWriterContainal_' + replyNo).classList.toggle('hidden');
    })
}

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
    document.getElementById('modify').addEventListener('click', () => {
        location.href = firstContextPath + '/board/dress/modify/' + boardNumber();
    })
}
// --a tag end------------------------------------------------

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
boardDelAtax();

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
// reply render
const replyRender = (post) => {
    // 댓글 컨테이너
    const replySection = document.getElementById('replySection');
    
    replySection.innerHTML = '';    // 댓글 목록 초기화
    
    //reply view render
    post.forEach((item) => {
        const replyInnerSection = document.createElement('div');
        replyInnerSection.classList.add('replyInnerSecion', 'hrStyle', 'pb-4', 'mb-2');

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

        const replyInfoID = document.createElement('span');
        replyInfoID.classList.add('replyInfoID');
        replyInfoID.textContent = item.id;

        const replyInfoDate = document.createElement('span');
        replyInfoDate.classList.add('replyInfoDate');
        replyInfoDate.textContent = formatTimestamp(item.writeDt);

        infoContainer.appendChild(replyInfoID);
        infoContainer.appendChild(replyInfoDate);
        replyInfoBox.appendChild(infoContainer);

        userContainer.appendChild(replyInfoBox);
        replyInnerSection.appendChild(userContainer);

         // 댓글 내용 부분 생성
        const commentContent = document.createElement('div');
        commentContent.classList.add('commentContent');
        commentContent.innerHTML = '<span>' + item.content +'</span>';
        replyInnerSection.appendChild(commentContent);

        // 답글 작성 버튼 부분 생성
        const commentWirterBtnBox = document.createElement('div');
        commentWirterBtnBox.classList.add('commentWirterBtnBox');

        const replyWriterBtn = document.createElement('a');
        replyWriterBtn.id = 'replyWriterBnt_' + item.replyNo;
        replyWriterBtn.textContent = '답글작성';
        replyWriterBtn.style.cursor = 'pointer';

        commentWirterBtnBox.appendChild(replyWriterBtn);
        replyInnerSection.appendChild(commentWirterBtnBox);

        // 대댓글 부분----------------------------------------------
        const replyWriterContainer = document.createElement('div');
        replyWriterContainer.classList.add('pl-4', 'hidden', 'mb-4', 'hrStyle');
        replyWriterContainer.id = 'replyWriterContainal_' + item.replyNo;

        // 내부 요소 생성
        const innerDiv1 = document.createElement('div');
        const innerDiv2 = document.createElement('div');
        const commentWriterDiv = document.createElement('div');
        const commentInboxDiv = document.createElement('div');
        const commentInboxNameSpan = document.createElement('span');
        const textarea = document.createElement('textarea');
        const commentAttachDiv = document.createElement('div');
        const commentBoxWriteCountDiv = document.createElement('div');
        const countNumStrong = document.createElement('strong');
        const slashSpan = document.createElement('span');
        const writeTotalSpan = document.createElement('span');
        const registerBoxDiv = document.createElement('div');
        const submitButton = document.createElement('a');

        // 각 요소에 클래스 추가
        innerDiv1.classList.add('commentWriter');
        commentInboxDiv.classList.add('comment_inbox');
        commentInboxNameSpan.classList.add('comment_inbox_name');
        textarea.setAttribute('placeholder', '댓글을 남겨보세요');
        textarea.id = 'replySectionTwoTextarea_' + item.replyNo;
        commentAttachDiv.classList.add('comment_attach', 'd-flex', 'justify-content-between', 'align-items-center');
        commentBoxWriteCountDiv.classList.add('comment_box_write_count');
        countNumStrong.classList.add('fontSizeSmall', 'comment_box_count_num');
        countNumStrong.id = 'writeCount_' + item.replyNo;
        slashSpan.classList.add('fontSizeSmall');
        writeTotalSpan.classList.add('fontSizeSmall', 'comment_box_write_total');
        registerBoxDiv.classList.add('register_box');
        submitButton.classList.add('button');

        // 텍스트 내용 추가
        commentInboxNameSpan.textContent = '똥심';
        countNumStrong.textContent = '0';
        slashSpan.textContent = '/';
        writeTotalSpan.textContent = '100';
        submitButton.textContent = '등록';

        // 구조에 맞게 요소들을 조합
        commentBoxWriteCountDiv.appendChild(countNumStrong);
        commentBoxWriteCountDiv.appendChild(slashSpan);
        commentBoxWriteCountDiv.appendChild(writeTotalSpan);

        commentAttachDiv.appendChild(commentBoxWriteCountDiv);
        commentAttachDiv.appendChild(registerBoxDiv);

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
    })
};

// reply ajax
const replyList = () => {
    // formatTimestamp -> 시간포맷
    let data = {boardNo : boardNumber()}

    let callback = (data) => {
        replyRender(data);

        // 댓글번호로 대댓글 div toggle 생성, 대댓글 글자수 표기 및 제한
        data.forEach(item => {
            const replyNo = item.replyNo;
            replyWriterBnt(replyNo);
            replySectionTwoTextarea(replyNo);
        })
    }
    
    ajaxRequest(firstPath + '/board/dress/replyList', 'GET', data, callback);
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
        div_3_span.classList.add('text-right','textColorGray');
        div_3_span.innerText = formatTimestamp(post.writeDt);

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
// 함수 호출
window.onload = () => {
    boardManagemantBnt();       // security로 id 들고오면 수정 해야 함.
    pageUpAndDown();
    replyTextarea();
    replyList();
    boardRelatedPosts();
}