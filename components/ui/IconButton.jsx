import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

const propTypes = {
  shape: PropTypes.oneOf(["circle", "square", "roundedSquare"]),
  color: PropTypes.string,
  icon: PropTypes.element,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  danger: PropTypes.bool,
  onPress: PropTypes.func,
  classNames: PropTypes.string,
  type: PropTypes.string,
};

const IconButton = ({
  shape,
  color,
  icon,
  size,
  danger,
  onPress,
  classNames,
  type,
  ...rest
}) => {
  // Chuyển đổi kích thước button dựa trên prop size
  const sizeStyle = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 80, height: 80 },
  }[size] || { width: 60, height: 60 }; // Mặc định là medium nếu không có size

  // Định nghĩa hình dạng button dựa trên prop shape
  const shapeStyle = {
    circle: { borderRadius: 100 },
    square: { borderRadius: 0 },
    roundedSquare: { borderRadius: 10 },
  }[shape] || { borderRadius: 0 }; // Mặc định là square nếu không có shape

  // Đổi màu nếu prop danger có giá trị
  const buttonColor = danger ? "red" : color || "#f2f4f7";

  return (
    <TouchableOpacity
      className={`${classNames} `}
      style={[
        styles.button,
        sizeStyle,
        shapeStyle,
        {
          backgroundColor: buttonColor,
          borderRadius: type === "back" ? 99 : 1,
        },
      ]}
      onPress={
        type === "back"
          ? async () => {
              if (onPress) {
                await onPress();
              }
              router.back();
            }
          : onPress
      }
      {...rest}
    >
      {/* Render component icon */}
      {type === "back" ? (
        <Ionicons name="arrow-back" size={30} color="black" />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

IconButton.propTypes = propTypes;
export default IconButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
