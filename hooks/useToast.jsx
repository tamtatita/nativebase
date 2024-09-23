import { Toast } from "@/components/ui";
import React, { createContext, useState, useContext, useCallback } from "react";
// Tạo Context để quản lý Toast
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  // Hàm xử lý khi toast có promise
  const showPromiseToast = useCallback(
    ({ promise, message, timeClose = 3000, position = "bottom-right" }) => {
      // Hiển thị trạng thái loading
      setToast({ message: "Loading...", type: "loading", position });

      promise
        .then(() => {
          // Khi promise thành công
          setToast({ message, type: "success", position });
        })
        .catch(() => {
          // Khi promise thất bại
          setToast({ message: "Error occurred", type: "error", position });
        })
        .finally(() => {
          // Tự động đóng toast sau timeClose
          setTimeout(() => {
            setToast(null);
          }, timeClose);
        });
    },
    []
  );

  // Hàm showToast thông thường
  const showToast = useCallback(
    ({ message, type, timeClose = 3000, position = "top-right" }) => {
      setToast({ message, type, position });

      // Tự động đóng sau timeClose
      setTimeout(() => {
        setToast(null);
      }, timeClose);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast, showPromiseToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          position={toast.position}
        />
      )}
    </ToastContext.Provider>
  );
};

// Hook để sử dụng toast ở các component khác
export const useToast = () => {
  return useContext(ToastContext);
};
