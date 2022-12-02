

import {auth} from "../middlewares";
import {
    deleteNotification,
    getAllNotifications,
    markAsReadNotification
} from "../controllers/notificationController";


const router = require("express").Router();


// [GET] api/v1/loan/:loanId get all loans
router.get("/", auth, getAllNotifications);
router.post("/read", auth, markAsReadNotification);
router.delete("/", auth, deleteNotification);



export default router