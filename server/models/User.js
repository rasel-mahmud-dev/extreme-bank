import Base from "./Base";

class User extends Base {
    static collectionName = "users";

    // _id  => database uuid

    constructor({
        roles  = ["CUSTOMER"],
        first_name,
        googleId,
        last_name,
        username,
        email,
        password,
        country,
        upazila,
        NID,
        address,
        zipCode,
        division,
        created_at,
        updated_at,
        avatar,
    }) {
        super("users");
        this.roles = roles
        this.first_name = first_name;
        this.last_name = last_name;
        this.googleId = googleId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.avatar = avatar;
        this.country =  country
        this.upazila =  upazila
        this.NID =  NID
        this.address =  address
        this.zipCode =  zipCode
        this.division =  division
    }
}

export default User;
