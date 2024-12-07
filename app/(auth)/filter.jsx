import { View } from "react-native";
import React, { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import "react-native-gesture-handler";
import { useFocusEffect } from "expo-router";
import { handleGetCriteriaAsyncThunk } from "../../store/search";
import { useDispatch } from "react-redux";
import FilterBody from "../../components/filter/FilterBody";
import FilterHeader from "../../components/filter/FilterHeader";
import FilterFooter from "../../components/filter/FilterFooter";
const FilterPage = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(handleGetCriteriaAsyncThunk());
    }, [dispatch])
  );

  return (
    <View className="bg-white p-5 flex-1">
      <FlashList
        estimatedItemSize={1}
        ListHeaderComponent={() => (
          <>
            <FilterHeader />

            <FilterBody />
          </>
        )}
      />

      <FilterFooter />
    </View>
  );
};

export default FilterPage;
