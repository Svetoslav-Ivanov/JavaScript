class UserManager {

    constructor() {
        this.users = [];
    }

    addUser(user) {
        if (this.users.indexOf(user) === -1) {
            this.users.push(user);
        }
    }

    filterBy(text) {
        text = text.toLowerCase();
        let filtered = [];
        for (let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if (user.firstName.toLowerCase().includes(text) ||
                user.lastName.toLowerCase().includes(text) ||
                user.email.toLowerCase().includes(text)) {
                filtered.push(user);
            }
        }
        return filtered;
    }
}