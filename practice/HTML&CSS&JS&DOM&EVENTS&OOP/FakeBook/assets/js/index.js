(function () {
    let homePage = document.getElementById("homePage");
    let likedPage = document.getElementById("likedPage");
    let blockedPage = document.getElementById("blockedPage");
    let homeResults = document.getElementById("filter-result");

    let loggedUser = new LoggedUser();
    let userManager = new UserManager();

    for (let i = 0; i < fakeUsers.length; i++) {
        let obj = fakeUsers[i];
        let user = new User(
            obj.id,
            obj.firstName,
            obj.lastName,
            obj.email,
            obj.title,
            obj.picture
        );
        userManager.addUser(user);
    }

    printUsers(userManager.users, homeResults);

    let printCurrentPage = function () {
        let hash = location.hash.slice(1); //gets from the first element to the last (Like substring())

        switch (hash) {
            case "home":
                homePage.style.display = "block";
                likedPage.style.display = "none"; //Hidden
                blockedPage.style.display = "none" //Hidden
                printUsers(userManager.users, homeResults);
                break;
            case "liked":
                homePage.style.display = "none"; //Hidden
                likedPage.style.display = "flex";
                blockedPage.style.display = "none"; //Hidden
                printUsers(loggedUser.liked, likedPage);
                break;
            case "blocked":
                homePage.style.display = "none"; //Hidden
                likedPage.style.display = "none"; //Hidden
                blockedPage.style.display = "flex";
                printUsers(loggedUser.blocked, blockedPage);
                break;
            default:
                homePage.style.display = "none"; //Hidden
                likedPage.style.display = "none"; //Hidden
                blockedPage.style.display = "block";
                printUsers(loggedUser.blocked, homeResults);
                break;
        }
    };

    window.addEventListener("load", printCurrentPage);
    window.addEventListener("hashchange", printCurrentPage);

    function printUsers(users, container) {
        container.innerHTML = "";
        container.classList.add("results");

        users = users.sort((u1, u2) => (u1.firstName + u1.lastName).localeCompare((u2.firstName + u2.lastName)));

        for (let i = 0; i < users.length; i++) {
            let user = users[i];

            let div = document.createElement("div");
            div.classList.add("card");

            let img = document.createElement("img");
            img.src = user.imgUrl;
            img.alt = "user";

            let h3 = document.createElement("h3");
            h3.innerHTML = user.firstName + " " + user.lastName;

            let h4 = document.createElement("h4");
            h4.innerHTML = user.email;

            let likeUnlikeButton = "";
            let blockUnblockButton = "";

            if (!loggedUser.hasLiked(user)) {
                let likeButton = document.createElement("button");
                likeButton.innerText = "like";
                likeButton.addEventListener("click", function () {
                    loggedUser.likeUser(user);
                    printCurrentPage();
                });
                likeUnlikeButton = likeButton;
            } else {
                div.classList.add("liked");
                let unlikeButton = document.createElement("button");
                unlikeButton.innerText = "unlike";
                unlikeButton.addEventListener("click", function () {
                    loggedUser.unlikeUser(user);
                    printCurrentPage();
                });
                likeUnlikeButton = unlikeButton;
            }

            if (!loggedUser.hasBlocked(user)) {
                let blockButton = document.createElement("button");
                blockButton.innerText = "block";
                blockButton.addEventListener("click", function () {
                    loggedUser.blockUser(user);
                    printCurrentPage();
                });
                blockUnblockButton = blockButton;
            } else {
                div.classList.add("blocked");
                let unblockButton = document.createElement("button");
                unblockButton.innerText = "unblock";
                unblockButton.addEventListener("click", function () {
                    loggedUser.unblockUser(user);
                    printCurrentPage();
                });
                blockUnblockButton = unblockButton;
            }

            if (!loggedUser.hasLiked(user) && !loggedUser.hasBlocked(user)) {
                div.classList.add("neutral");
            }

            div.append(img, h3, h4, likeUnlikeButton, blockUnblockButton);
            container.append(div);
        }
    }

    let search = document.getElementById("filter-field");
    search.addEventListener("keyup", function (event) {
        let text = event.target.value;

        let filtered = userManager.filterBy(text);

        printUsers(filtered, homeResults);
    });
})(); //Immediatly invoked function expression (IIFE)

