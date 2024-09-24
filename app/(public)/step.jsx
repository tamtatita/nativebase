import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { IconButton, Button } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";
import { Checkbox, List } from "@ant-design/react-native";
const CheckboxItem = Checkbox.CheckboxItem;
import { width } from "@/lib/InfoDevice";
import { router } from "expo-router";
const Step = () => {
  const steps = useMemo(() => {
    return [1, 2, 3, 4];
  }, []);
  const [currentStep, setCurrentStep] = useState(0);

  const dataRenderTest = useMemo(() => {
    return [
      {
        id: 1,
        title: "what type of job are you interested in?",
        children: [
          "full time",
          "part time",
          "contract",
          "temporary",
          "internship",
        ],
      },
      {
        id: 2,
        title: "what is your lever of experience ?",
        children: [
          "internship",
          "entry level",
          "associate",
          "mid-senior level",
          "director",
          "exec",
        ],
      },
      {
        id: 3,
        title: "preferred working model: your idels work structure ?",
        children: ["on site", "hybrid", "remote"],
      },

      {
        id: 4,
        title: "What job title are you seeking?",
        children: [
          "Accountant",
          "Administrative Assistant",
          "Business Analyst",
          "Business Development Manager",
          "Data Analyst",
          "Data Scientist",
          "Designer",
          "Developer",
          "Engineer",
          "Finance Manager",
          "Human Resources Manager",
        ],
      },
    ];
  }, []);

  const handleNextStep = () => {
    if (currentStep === steps.length - 1) {
      router.replace("/notification");
    }
    setCurrentStep((prev) => prev + 1);
  };

  const RenderProgress = useCallback(() => {
    const length = steps.length;

    return (
      <View className="flex flex-row items-center">
        <View className="bg-gray-200 h-6 rounded-full w-[calc(70%)] ">
          <View className="bg-primary h-6 rounded-full w-1/2">
            <Text></Text>
          </View>
        </View>
        <View className="ml-3">
          <Text className="font-bold text-primary">
            {currentStep + 1} / {length}
          </Text>
        </View>
      </View>
    );
  }, [currentStep, steps]);

  const RenderBody = useCallback(() => {
    return (
      <View>
        <View>
          <Text className="text-center text-slate-700 font-bold capitalize text-2xl my-4">
            {dataRenderTest[currentStep]?.title}
          </Text>
        </View>

        <View className="mt-5">
          <List style={{ width: width }}>
            {dataRenderTest[currentStep]?.children?.map((item) => (
              <CheckboxItem key={item}>
                <Text style={{ fontWeight: 600, textTransform: "capitalize" }}>
                  {item}
                </Text>
              </CheckboxItem>
            ))}
          </List>
        </View>
      </View>
    );
  }, [currentStep]);
  return (
    <View style={styles.container}>
      <SafeAreaView />

      {/* Header */}
      <View className="flex items-center flex-row justify-between w-full ">
        <View>
          <IconButton size={"small"} type={"back"} />
        </View>

        <View className="">
          <RenderProgress />
        </View>
      </View>

      {/* Body */}
      <View>
        <RenderBody />
      </View>

      {/* Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          borderTopLeftRadius: 10,
          borderTopWidth: 1,
          borderTopColor: "gray",
          justifyContent: "center",
          alignItems: "center",
          padding: 14,
        }}
      >
        <Button onPress={() => handleNextStep()} type="full" title="Next" />
      </View>
    </View>
  );
};

export default Step;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    padding: 20,
    backgroundColor: "white",
    position: "relative",
  },
});
