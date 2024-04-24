
let currentUser;
const pageLoad = () => {
    const t = sessionStorage.getItem("currentUser");
    if (t) {
        currentUser = JSON.parse(t);
        document.getElementById("userImage").src = currentUser.image;
    }
}
pageLoad();

