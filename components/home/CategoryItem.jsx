import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CategoryItem = ({ data, currentIndex }) => {
  return (
    <TouchableOpacity
      className={`px-4 py-3 rounded-full ${
        currentIndex === data?.id ? "bg-primary" : "bg-white"
      } border-1 border-gray-400 mr-4 `}
    >
      <Text
        className={`${
          currentIndex === data?.id ? "text-white" : "text-primary"
        } font-semibold text-sm`}
      >
        {data?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
