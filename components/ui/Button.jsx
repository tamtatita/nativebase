import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import PropTypes from "prop-types";

const propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["full", "link"]),
  onPress: PropTypes.func,
  classNames: PropTypes.string,
};

const Button = ({ title, type, onPress, classNames }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        type === "full" && styles.full,
        type === "link" && styles.link,
      ]}
      className={classNames}
    >
      <Text style={[styles.text, type === "link" && styles.textLink]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = propTypes;
export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
    width: "100%",
  },
  full: {
    backgroundColor: Colors.primary, // Thay thế bg-primary
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  link: {
    backgroundColor: "transparent",
    width: "fit-content",
    height: "fit-content",
    padding: 2,
  },
  textLink: {
    color: Colors.primary,
    fontSize: 16,
  },
});
