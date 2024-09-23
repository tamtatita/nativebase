import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Toast = ({ message, type, position }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Khởi tạo animation

  useEffect(() => {
    // Animation xuất hiện
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      // Animation ẩn
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        getToastStyle(type),
        getToastPosition(position),
        { opacity: fadeAnim },
      ]}
    >
      {type === "loading" ? (
        <View className="flex items-center flex-row gap-2">
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.toastMessage}>{message}</Text>
        </View>
      ) : (
        <Text style={styles.toastMessage}>{message}</Text>
      )}
    </Animated.View>
  );
};

// Hàm lấy style theo type
const getToastStyle = (type) => {
  switch (type) {
    case "success":
      return { backgroundColor: "#84cc16" };
    case "error":
      return { backgroundColor: "#f43f5e" };
    case "warning":
      return { backgroundColor: "#eab308" };
    case "loading":
      return { backgroundColor: "#0ea5e9" };
    default:
      return { backgroundColor: "#f5f5f5" };
  }
};

// Hàm lấy vị trí dựa trên props position
const getToastPosition = (position) => {
  switch (position) {
    case "top-right":
      return { top: 60, right: 20 };
    case "bottom-right":
      return { bottom: 50, right: 20 };
    case "top-left":
      return { top: 60, left: 20 };
    case "bottom-left":
      return { bottom: 50, left: 20 };
    default:
      return { bottom: 50, right: 20 };
  }
};

// Style cho Toast
const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
  },
  toastMessage: {
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },
});
export default Toast;
