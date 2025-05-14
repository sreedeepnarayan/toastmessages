import React from 'react';
import { useToast } from './ToastContext';
import ToastContainer from './ToastContainer';

const ToastDemo = () => {
  const { addToast } = useToast();

  const showSuccessToast = () => {
    addToast({
      type: 'success',
      title: 'Action Completed',
      message: 'Your action was completed successfully!',
    });
  };

  const showWarningToast = () => {
    addToast({
      type: 'warning',
      title: 'Warning',
      message: 'This action might have consequences. Please review before proceeding.',
    });
  };

  const showErrorToast = () => {
    addToast({
      type: 'danger',
      title: 'Error',
      message: 'An error occurred while processing your request.',
    });
  };

  const showCustomDurationToast = () => {
    addToast({
      type: 'success',
      title: 'Custom Duration',
      message: 'This toast will stay for 10 seconds',
      duration: 10000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Toast Notification Demo</h2>
        <div className="space-y-4">
          <button
            onClick={showSuccessToast}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Show Success Toast
          </button>
          <button
            onClick={showWarningToast}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Show Warning Toast
          </button>
          <button
            onClick={showErrorToast}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Show Error Toast
          </button>
          <button
            onClick={showCustomDurationToast}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Show Custom Duration Toast (10s)
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ToastDemo; 