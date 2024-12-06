import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import PropTypes from "prop-types";

const propTypes = {
  data: PropTypes.object,
  currentIndex: PropTypes.number,
  handleOnPressCriteria: PropTypes.func,
};

const CategoryItem = ({ data, selectedCriteria, handleOnPressCriteria }) => {
  return (
    <TouchableOpacity
      className={`px-4 py-3 rounded-full ${
        selectedCriteria?.Id === data?.Id ? "bg-primary" : "bg-white"
      } border-1 border-gray-400 mr-4 `}
      onPress={() => handleOnPressCriteria(data)}
    >
      <Text
        className={`${
          selectedCriteria?.Id === data?.Id ? "text-white" : "text-primary"
        } font-semibold text-sm`}
      >
        {data?.Title}
      </Text>
    </TouchableOpacity>
  );
};

CategoryItem.propTypes = propTypes;
export default memo(CategoryItem);

const styles = StyleSheet.create({});
