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

    static createNotification({user_id, label, message = ""}) {
        return new Promise(async (resolve, reject) => {
            try {
                let newNot = {
                    user_id: user_id,
                    label: label,
                    message: message
                }
                let notification = new Notification(newNot)
                let doc = await notification.save()
                if (doc) {
                    resolve(doc)
                } else {
                    resolve(null)
                }

            } catch (ex) {
                resolve(null)
            }

        })
    }

}

export default Notification;
