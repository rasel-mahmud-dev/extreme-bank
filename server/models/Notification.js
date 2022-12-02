import Base from "./Base";
import {ObjectId} from "mongodb";

class Notification extends Base {
    static collectionName = "notifications";
    _id
    user_id
    label = ""
    message = ""
    isRead = false
    created_at = new Date()
    updated_at = new Date()


    constructor(data) {
        super(Notification.collectionName);
        this.user_id = new ObjectId(data.user_id);
        this.message = data.message;
        this.label = data.label;
    }
}

export default Notification;
