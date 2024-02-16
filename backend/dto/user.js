class UserDto {
    constructor(user){
        this.id = user._id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email
        this.role = user.role;
    }
}

module.exports = UserDto;