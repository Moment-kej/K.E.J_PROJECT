import { ajaxRequest, userInfo, firstContextPath } from "../../common/common.js";

document.querySelector('.cancelBtn').addEventListener('click', () => {
    history.back();
});

const passwordCheckBtnClick = () => {
    const checkBtn = document.querySelector(".checkBtn");
    const id = document.querySelector(".username").innerText.split("님")[0];
    checkBtn.addEventListener('click', () => {
        const idenPwInput = document.getElementById("iden-pw-input");
        const data = { id : id, pw : idenPwInput.value };
        const callback = (data) => {
            if(data) {  // DB의 값과 입력한 패스워드가 동일하면
                location.href = firstContextPath + "/user/my/" + id;
            } else {
                console.error("입력한 비밀번호와 현재 비밀번호가 동일하지 않음");
                idenPwInput.value = "";
                Swal.fire({
                    icon: "warning",
                    title: "비밀번호가 동일하지 않습니다.",
                    didClose: function () {
                        idenPwInput.focus();
                    }
                });
            }
        }
        ajaxRequest(firstContextPath+"/user/pwTest", "GET", data, callback);
    });
};
passwordCheckBtnClick();