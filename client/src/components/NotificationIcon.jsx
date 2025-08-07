import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

const NotificationIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);
    const { axios, user } = useAppContext();

    useEffect(() => {
        if (user) {
            fetchNotifications();
            fetchUnreadCount();
            
            // Poll for new notifications every 30 seconds
            const interval = setInterval(() => {
                fetchUnreadCount();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const { data } = await axios.get('/api/notifications');
            if (data.success) {
                setNotifications(data.notifications);
            }
        } catch (error) {
            console.log('Error fetching notifications:', error);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const { data } = await axios.get('/api/notifications/unread-count');
            if (data.success) {
                setUnreadCount(data.unreadCount);
            }
        } catch (error) {
            console.log('Error fetching unread count:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`/api/notifications/${notificationId}/read`);
            fetchNotifications();
            fetchUnreadCount();
        } catch (error) {
            console.log('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.put('/api/notifications/mark-all-read');
            fetchNotifications();
            fetchUnreadCount();
        } catch (error) {
            console.log('Error marking all notifications as read:', error);
        }
    };

    const handleNotificationClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchNotifications();
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'booking_created':
                return '📅';
            case 'booking_confirmed':
            case 'booking_booked':
                return '✅';
            case 'booking_cancelled':
                return '❌';
            case 'booking_completed':
                return '🏁';
            default:
                return '🔔';
        }
    };

    const formatTimeAgo = (date) => {
        const now = new Date();
        const created = new Date(date);
        const diffInHours = Math.floor((now - created) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return created.toLocaleDateString();
    };

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleNotificationClick}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                aria-label="Notifications"
            >
                <svg 
                    className="w-6 h-6 text-gray-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 17h5l-5.5-5.5c-.5-.5-1-1.5-1-2.5v-4c0-3-2-5-5-5s-5 2-5 5v4c0 1-0.5 2-1 2.5L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                    />
                </svg>
                {unreadCount > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium"
                    >
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </motion.div>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-sm text-primary hover:text-primary-dull transition-colors"
                                    >
                                        Mark all read
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5.5-5.5c-.5-.5-1-1.5-1-2.5v-4c0-3-2-5-5-5s-5 2-5 5v4c0 1-0.5 2-1 2.5L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <p>No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <motion.div
                                        key={notification._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                                            !notification.isRead ? 'bg-blue-50 border-l-4 border-l-primary' : ''
                                        }`}
                                        onClick={() => !notification.isRead && markAsRead(notification._id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl flex-shrink-0">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                                    {notification.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                {notification.booking?.car && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {notification.booking.car.brand} {notification.booking.car.model}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-400 mt-2">
                                                    {formatTimeAgo(notification.createdAt)}
                                                </p>
                                            </div>
                                            {!notification.isRead && (
                                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationIcon;
