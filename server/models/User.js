// const dbConnect = require("../database/dbConnect");

import Base from "./Base";

// import Joi from "joi";

class User extends Base {
    static tableName = "users";
    constructor({
        first_name,
        last_name,
        username,
        email,
        password,
        created_at,
        updated_at,
        avatar,
    }) {
        super("users");
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.avatar = avatar;
    }
}

export default User;
