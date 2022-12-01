
import Base from "./Base";
import SQL_Date from "../utilities/SQL_Date";

class User extends Base {
    static tableName = "users";

    // user_id  => database uuid

    constructor({
        roles  = ["CUSTOMER"],
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
        this.roles = roles
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at =  SQL_Date();
        this.updated_at = SQL_Date();
        this.avatar = avatar;
    }
}

export default User;
