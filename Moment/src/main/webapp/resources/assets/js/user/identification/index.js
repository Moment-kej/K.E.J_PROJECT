document.querySelector('.cancelBtn').addEventListener('click', () => {
    history.back();
});

const passwordCheckBtnClick = () => {
    const checkBtn = document.querySelector('.checkBtn');
    checkBtn.addEventListener('click', () => {
        console.log("clicked");
    });
};

passwordCheckBtnClick();