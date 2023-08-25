class LoggedUser {
    
    constructor(){
        this.liked = [];
        this.blocked = [];
    }

    likeUser(user){
        let blockedIdx = this.blocked.indexOf(user);

        if (blockedIdx !== -1){
            this.blocked.splice(blockedIdx, 1);
        }

        if(this.liked.indexOf(user) === -1){
            this.liked.push(user);
        }
    }

    unlikeUser(user){
        let unlikedIdx = this.liked.indexOf(user);

        if (unlikedIdx !== -1){
            this.liked.splice(unlikedIdx, 1);
        }
    }

    hasLiked(user){
        return this.liked.indexOf(user) !== -1;
    }

    blockUser(user){
        let likedIdx = this.liked.indexOf(user);

        if (likedIdx !== -1){
            this.liked.splice(likedIdx, 1);
        }
        if(this.blocked.indexOf(user) === -1){
            this.blocked.push(user);
        }
    }

    unblockUser(user){
        let unblockedIdx = this.blocked.indexOf(user);
        if (unblockedIdx !== -1){
            this.blocked.splice(unblockedIdx, 1);
        }
    }
    
    hasBlocked(user){
        return this.blocked.indexOf(user) !== -1;
    }
}