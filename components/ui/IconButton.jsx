import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Icon từ FontAwesome, bạn có thể dùng Icon khác nếu cần.

const IconButton = ({ shape, color, icon, size, danger, onPress }) => {
  // Chuyển đổi kích thước button dựa trên prop size
  const sizeStyle =
    {
      small: { width: 40, height: 40 },
      medium: { width: 60, height: 60 },
      large: { width: 80, height: 80 },
    }[size] || sizeStyle.medium;

  // Định nghĩa hình dạng button dựa trên prop shape
  const shapeStyle =
    {
      circle: { borderRadius: sizeStyle.width / 2 },
      square: { borderRadius: 0 },
      roundedSquare: { borderRadius: 10 },
    }[shape] || shapeStyle.square;

  // Đổi màu nếu prop danger có giá trị
  const buttonColor = danger ? "red" : color || "gray";
  const iconColor = danger ? "white" : "black";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyle,
        shapeStyle,
        { backgroundColor: buttonColor },
      ]}
      onPress={onPress}
    >
      <FontAwesome
        name={icon}
        size={size === "small" ? 20 : size === "medium" ? 30 : 40}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
