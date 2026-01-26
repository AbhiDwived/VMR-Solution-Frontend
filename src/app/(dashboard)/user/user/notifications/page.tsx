"use client";

import { useEffect, useState } from "react";
import Axios from "axios";
import { FaBell, FaInfoCircle, FaExclamationTriangle, FaCheck } from "react-icons/fa";
import UserSidebar from "@/app/(commonLayout)/components/shared/UserSidebar";

interface Notification {
  _id: string;
  type: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
  metadata?: {
    orderId?: string;
    productName?: string;
    quantity?: number;
    amount?: number;
    customerName?: string;
    paymentMethod?: string;
  };
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications?limit=100`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.data) {
        setNotifications(response.data.data.notifications || []);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications(prev =>
        prev.map(notif =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "commission_update":
        return <FaExclamationTriangle className="text-orange-500" />;
      case "order_update":
        return <FaInfoCircle className="text-blue-500" />;
      case "withdrawal_update":
        return <FaCheck className="text-green-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">All Notifications</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 h-20 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <UserSidebar 
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen}
            selectedSection="notifications"
          />
          
          <div className="flex-1 lg:ml-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">All Notifications</h1>
              
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <FaBell className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 rounded-lg border ${
                        !notification.isRead ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 mb-2">{notification.message}</p>
                          
                          {notification.metadata?.orderId && (
                            <div className="text-sm text-gray-600 space-y-1">
                              <p><span className="font-medium">Order:</span> #{notification.metadata.orderId.slice(-6)}</p>
                              {notification.metadata.customerName && (
                                <p><span className="font-medium">Customer:</span> {notification.metadata.customerName}</p>
                              )}
                              {notification.metadata.paymentMethod && (
                                <p><span className="font-medium">Payment:</span> {notification.metadata.paymentMethod.toUpperCase()}</p>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm text-gray-500">
                              {formatDate(notification.createdAt)}
                            </span>
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;