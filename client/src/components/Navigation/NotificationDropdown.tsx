import React, {useEffect, useRef} from 'react';
import dateTime from "../../utils/date";
import Dropdown from "../Dropdown/Dropdown";
import {markAsReadNotification} from "../../context/actions/accountAction";
import useStore from "../../context/useStore";

const NotificationDropdown = ({setDropdownMenu, dropdownMenu}) => {

    const [{ auth, notifications }, dispatch] = useStore();

    const notificationRef = useRef()
    const notificationViewsIds = useRef([])

    useEffect(()=>{
        if(dropdownMenu === ""){
            markAsReadNotification(notificationViewsIds.current)
        }
    }, [dropdownMenu])


    const observer = new IntersectionObserver(
        ([entry]) => {
            if(entry.isIntersecting) {
                console.log(entry.target)
                if (entry.target.dataset.id) {
                    if(!notificationViewsIds.current.includes(entry.target.dataset.id)) {
                        notificationViewsIds.current.push(entry.target.dataset.id)
                    }
                }
            }
        }
    )

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
    }, [notificationRef.current])



    return (
        <div>
            <Dropdown
                onClose={() => setDropdownMenu("")}
                isOpen={dropdownMenu === "notification"}
                className="!p-0 right-0 w-60 shadow-md max-h-64 h-screen overflow-y-auto"
            >
                <div className="flex flex-col gap-1" ref={notificationRef}>
                    {notifications.map(notification=>(
                        <div className={`notification ${notification.isRead ? 'notification-read': ''}`} data-id={ notification.isRead ? "" : notification._id}>
                            <p className="text-sm">{notification.label.substring(0, 30)}...</p>
                            <span className="text-xs font-semibold">{dateTime(notification.created_at)}
                                {!notification.isRead && <span className="!static badge ml-2 !text-white">new</span> }
                            </span>
                        </div>
                    ))}
                </div>
            </Dropdown>
        </div>
    );
};

export default NotificationDropdown;