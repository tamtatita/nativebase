import React, { useEffect } from "react";
import { useState } from "react";
import { Button, FlatList, TextInput } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import {
  addListItemService,
  deleteListItemService,
  getItemsService,
  updateListItemService,
} from "./../../utils/services";
import lists from "../../utils/lists";
import { handleError } from "../../utils/helpers";

function demo() {
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [tests, setTests] = useState([]);
  const handleOnPress = async () => {
    try {
      const newTest = await addListItemService(lists.Tests, {
        Name: text,
      });

      console.log(newTest);
    } catch (error) {
      const message = handleError(error);
    }
  };

  const handleGetTests = async () => {
    try {
      let filter = "";
      if (searchText) {
        filter = `contains(Name, '${searchText}')`;
      }
      const tests = await getItemsService(lists.Tests, {
        filter,
      });
      setTests(tests.value);
    } catch (error) {
      const message = handleError(error);
    }
  };

  const handleGetTestDetails = async () => {
    try {
      const test = await getItemsService(lists.TestDetails, {
        expand: "TestA",
      });
      console.log(test);
    } catch (error) {
      const message = handleError(error);
    }
  };

  const handleUpdate = async (testId) => {
    try {
      const updatedTest = await updateListItemService(lists.Tests, testId, {
        Name: text,
      });
      handleGetTests();
    } catch (error) {
      const message = handleError(error);
    }
  };

  const handleDelete = async (testId) => {
    try {
      const deletedTest = await deleteListItemService(lists.Tests, testId);
      handleGetTests();
    } catch (error) {
      const message = handleError(error);
    }
  };

  useEffect(() => {
    handleGetTests();
    handleGetTestDetails();
  }, []);

  useEffect(() => {
    handleGetTests();
  }, [searchText]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>demo</Text>
      <View>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder="Basic usage"
        />
        <Button title="Press me" onPress={handleOnPress} />
      </View>
      <View>
        <TextInput
          value={searchText}
          onChangeText={(searchText) => setSearchText(searchText)}
          placeholder="Search"
        />
        <FlatList
          data={tests}
          renderItem={({ item }) => (
            <View>
              <Text>{item.Name}</Text>
              <Button title="Update" onPress={() => handleUpdate(item.Id)} />
              <Button title="Delete" onPress={() => handleDelete(item.Id)} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default demo;
