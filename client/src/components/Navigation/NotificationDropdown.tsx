import React, {useEffect, useRef} from 'react';
import dateTime from "../../utils/date";
import Dropdown from "../Dropdown/Dropdown";
import {markAsReadNotification} from "../../context/actions/accountAction";
import useStore from "../../context/useStore";
import {ACTION_TYPES} from "../../types";

const NotificationDropdown = ({setDropdownMenu, dropdownMenu}) => {

    const [{ auth, notifications }, dispatch] = useStore();

    const notificationRef = useRef()
    const notificationViewsIds = useRef([])

    useEffect(()=>{
        if(dropdownMenu === "" && notificationViewsIds?.current.length){
            markAsReadNotification(notificationViewsIds.current)

            let updateNotifications = [...notifications]
            notificationViewsIds.current?.map(id=>{
               let newNotificationIndex = updateNotifications.findIndex(n=> n._id === id)
                if(newNotificationIndex !== -1) {
                    updateNotifications[newNotificationIndex].isRead = true
                }
            })

            dispatch({
                type: ACTION_TYPES.FETCH_NOTIFICATION,
                payload: updateNotifications
            })
            notificationViewsIds.current = []
        }
    }, [dropdownMenu])


    const observer = new IntersectionObserver(
        ([entry]) => {
            if(entry.isIntersecting) {
                if (entry.target.dataset.id) {
                    if(!notificationViewsIds.current.includes(entry.target.dataset.id)) {
                        notificationViewsIds.current.push(entry.target.dataset.id)
                    }
                }
            }
        }
    )

    // observe notification item when mount notification panel
    // and only observer whose that new.
    useEffect(() => {
        if(notificationRef.current) {
            let notificationItem = notificationRef.current.children
            for (const notificationItemElement of notificationItem) {
                if(notificationItemElement.dataset.id) {
                    observer.observe(notificationItemElement)
                }
            }

            // Remove the observer as soon as the component is unmounted
            return () => {
                observer.disconnect()
            }
        }
    }, [notifications, notificationRef.current])



    return (
        <div>
            <Dropdown
                onClose={() => setDropdownMenu("")}
                isOpen={dropdownMenu === "notification"}
                className="!p-0 right-0 w-60 shadow-card max-h-64 h-screen overflow-y-auto"
            >
                <div className="flex flex-col gap-1" ref={notificationRef}>
                    {notifications.map(notification=>(
                        <div key={notification._id} className={`notification ${notification.isRead ? 'notification-read': ''}`} data-id={ notification.isRead ? "" : notification._id}>
                            <p className="text-sm">{notification.label.substring(0, 65)}...</p>
                            <span className="text-xs font-semibold">{dateTime(notification.created_at)}
                                {!notification.isRead && <span className="!static badge ml-2">new</span> }
                            </span>
                        </div>
                    ))}
                </div>
            </Dropdown>
        </div>
    );
};

export default NotificationDropdown;