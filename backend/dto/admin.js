class AdminDto {
    constructor(admin){
        this.name = admin.name;
        this.username = admin.username;
        this.email = admin.email;
    }
}

module.exports = AdminDto;