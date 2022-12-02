import {ObjectId} from "mongodb";
import Notification from "../models/Notification";
import response from "../response";


export async function markAsReadNotification(req, res, next) {
    let {notificationIds} = req.body

    notificationIds = notificationIds.map(item => new ObjectId(item))
    try {
        let docs = await (await Notification.collection).updateMany(
            {
                user_id: new ObjectId(req.user.user_id),
                _id: {$in: notificationIds}

            }, {
                $set: {isRead: true}
            }
        )

        if (docs.modifiedCount) {
            response(res, "notifications", 201)
        } else {
            response(res, "No update", 200)
        }
    } catch (ex) {
        next(ex)
    }
}

export async function getAllNotifications(req, res, next) {
    try {
        let notifications = await (await Notification.collection).find({
            user_id: new ObjectId(req.user.user_id)
        }).sort({created_at: -1}).toArray();

        response(res, notifications, 200)

    } catch (ex) {
        next(ex)
    }
}

export async function deleteNotification(req, res, next) {
    try {
        let doc = await Notification.deleteOne({_id: new ObjectId(req.params.id)})
        if (doc.deletedCount) {
            response(res, "notification delete successfully", 201)
        }
    } catch (ex) {
        next(ex)
    }
}