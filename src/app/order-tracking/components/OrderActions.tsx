'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderActionsProps {
  orderId: string;
  canCancel: boolean;
  canReturn: boolean;
  invoiceUrl: string;
}

const OrderActions = ({ orderId, canCancel, canReturn, invoiceUrl }: OrderActionsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleDownloadInvoice = () => {
    if (!isHydrated) return;
    window.open(invoiceUrl, '_blank');
  };

  const handleCancelOrder = () => {
    if (!isHydrated) return;
    setShowCancelModal(true);
  };

  const handleReportIssue = () => {
    if (!isHydrated) return;
    setShowReportModal(true);
  };

  const handleInitiateReturn = () => {
    if (!isHydrated) return;
    alert('Return process initiated. Our team will contact you within 24 hours.');
  };

  if (!isHydrated) {
    return (
      <div className="rounded-lg bg-card p-6 shadow-elevation-2">
        <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
          Order Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-smooth"
            disabled
          >
            <Icon name="DocumentArrowDownIcon" size={18} />
            <span>Download Invoice</span>
          </button>
          <button
            className="flex items-center justify-center space-x-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-smooth"
            disabled
          >
            <Icon name="ExclamationTriangleIcon" size={18} />
            <span>Report Issue</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg bg-card p-6 shadow-elevation-2">
        <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
          Order Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-smooth hover:scale-[0.97]"
          >
            <Icon name="DocumentArrowDownIcon" size={18} />
            <span>Download Invoice</span>
          </button>

          <button
            onClick={handleReportIssue}
            className="flex items-center justify-center space-x-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-smooth hover:bg-muted"
          >
            <Icon name="ExclamationTriangleIcon" size={18} />
            <span>Report Issue</span>
          </button>

          {canCancel && (
            <button
              onClick={handleCancelOrder}
              className="flex items-center justify-center space-x-2 rounded-md border border-error bg-background px-4 py-3 text-sm font-medium text-error transition-smooth hover:bg-error hover:text-error-foreground"
            >
              <Icon name="XCircleIcon" size={18} />
              <span>Cancel Order</span>
            </button>
          )}

          {canReturn && (
            <button
              onClick={handleInitiateReturn}
              className="flex items-center justify-center space-x-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-smooth hover:bg-muted"
            >
              <Icon name="ArrowUturnLeftIcon" size={18} />
              <span>Initiate Return</span>
            </button>
          )}
        </div>

        <div className="mt-4 rounded-md bg-muted p-4">
          <div className="flex items-start space-x-3">
            <Icon name="InformationCircleIcon" size={20} className="mt-0.5 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Need Help?</p>
              <p className="caption mt-1 text-muted-foreground">
                Contact our customer support team for any queries or assistance with your order.
              </p>
              <button className="mt-2 text-sm font-medium text-primary transition-smooth hover:underline">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-background/80 p-4">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-elevation-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Cancel Order
              </h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-muted-foreground transition-smooth hover:text-foreground"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <p className="caption mb-6 text-muted-foreground">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-muted"
              >
                Keep Order
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  alert('Order cancelled successfully. Refund will be processed within 5-7 business days.');
                }}
                className="flex-1 rounded-md bg-error px-4 py-2 text-sm font-medium text-error-foreground transition-smooth hover:scale-[0.97]"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-background/80 p-4">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-elevation-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Report Issue
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-muted-foreground transition-smooth hover:text-foreground"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Issue Type
              </label>
              <select className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Delayed Delivery</option>
                <option>Damaged Product</option>
                <option>Wrong Item Received</option>
                <option>Missing Items</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Please describe the issue in detail..."
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  alert('Issue reported successfully. Our team will contact you within 24 hours.');
                }}
                className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:scale-[0.97]"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderActions;
