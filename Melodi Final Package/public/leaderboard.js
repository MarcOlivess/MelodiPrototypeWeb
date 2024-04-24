const apiUrl = localStorage.getItem("MelodyAPIUrl");

const tbodyRankList = document.getElementById("tbodyRankList");
let rankList = [];
const RANKS = ["n/a", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
let currentUser;
const pageLoad = async () => {
    const temp = sessionStorage.getItem("currentUser");
    if (temp) {
        currentUser = JSON.parse(temp);
    } else {
        window.location.replace("login");
    }
    document.getElementById("divCurrentUser").innerHTML = currentUser.username;
    const img = currentUser.image === "" || currentUser.image === null ? "dog.jpg" : currentUser.image;
    document.getElementById("userImage").src = "images/" + img;
    const resp = await fetch(apiUrl + "topRank/5");
    rankList = await resp.json();
    console.log("rankList:", rankList);
    let rows = "";
    for (let i in rankList) {
        const p = rankList[i];
        rows += "<tr>";
        if (i == 0) {
            rows += `<td><img src='images/leader1.jpeg'/></td>`;
        } else {
            rows += "<td></td>"
        }
        const img = (p.image == null || p.image === "") ? "dog.jpg" : p.image
        const nameRank = p.name + ": " + RANKS[p.highestRank];
        rows += `<td></td><td class='imageCell'><img src='images/${img}'/></td><td class='nameRank'>${nameRank}</td></tr>`;
    }
    tbodyRankList.innerHTML = rows;
}

pageLoad();