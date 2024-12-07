import PropTypes from "prop-types";
import React from "react";
import { Text, View } from "react-native";

const propTypes = {
  title: PropTypes.string.isRequired,
  iconTitle: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
};
const Section = ({ title, iconTitle, children }) => {
  return (
    <View className="p-4 border border-gray-400 rounded-xl ">
      <View className="flex-row items-center mb-2">
        {iconTitle}
        <Text className="ml-2 text-lg font-bold">{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

Section.propTypes = propTypes;
export default Section;
