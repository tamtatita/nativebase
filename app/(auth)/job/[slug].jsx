import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Button } from "@/components/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatCurrencyRange } from "@/utils";
import { AboutPage, CompanyPage, ReviewPage } from "@/components";
import { height } from "@/lib/InfoDevice";
import { router } from "expo-router";
import ApplicantsListPage from "../../../components/home/ApplicantsListPage";

const mockPeople = [
  {
    id: "1",
    name: "Jenny Wilson",
    role: "UI/UX Designer",
    avatar: "https://example.com/jenny.jpg",
  },
  {
    id: "2",
    name: "Brooklyn Simmons",
    role: "Graphics Designer",
    avatar: "https://example.com/brooklyn.jpg",
  },
  {
    id: "3",
    name: "Jane Cooper",
    role: "React Native Developer",
    avatar: "https://example.com/jane.jpg",
  },
  {
    id: "4",
    name: "Ronald Richards",
    role: "Flutter Developer",
    avatar: "https://example.com/ronald.jpg",
  },
  {
    id: "5",
    name: "Marvin McKinney",
    role: "React JS Developer",
    avatar: "https://example.com/marvin.jpg",
  },
  {
    id: "6",
    name: "Arlene McCoy",
    role: "Product Designer",
    avatar: "https://example.com/arlene.jpg",
  },
];

const JobDetail = () => {
  const [clickTab, setClickTab] = useState("About");
  const tabs = ["About", "Company", "Applicants"];

  const handleChangeTab = (type) => {
    setClickTab(type);
  };
  const data = {
    title: "Frontend Developer",
    company: "Google",
    image_company:
      "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
    location: "Hồ Chí Minh",
    salary: [1000000, 2000000],
    job_type: ["Full-time", "Remote", "Internship", "jao", "ó"],
    working_model: ["Remote"],
    lever: ["Internship"],
    applicantsView: 432,
    company_contact: {
      name: "Nguyễn Văn A",
      position: "HR",
      avatar:
        "https://i.pinimg.com/564x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
    },
    about: {
      aboutJob:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
      job_desc: ["số 1", "số 2", "số 3", "số 4", "số 5", "số 6"],
    },
  };
  const RenderHeader = useCallback(() => {
    return (
      <View className="p-5">
        <SafeAreaView />
        <View className="flex flex-row items-center justify-between">
          <IconButton type="back" />

          <View
            style={{ display: "flex", gap: "20px" }}
            className="flex flex-row items-center gap-2"
          >
            <IconButton
              shape="circle"
              color="white"
              size="small"
              classNames="rounded-full"
              icon={
                <Ionicons name="bookmark-outline" size={24} color="black" />
              }
            />

            <IconButton
              shape="circle"
              color="white"
              size="small"
              classNames="rounded-full"
              icon={<AntDesign name="sharealt" size={24} color="black" />}
            />
          </View>
        </View>
      </View>
    );
  }, []);

  const RenderContent = useCallback(() => {
    const dataFetch = [
      {
        id: 1,
        name: "Salary ( Monthly)",
        icon: (
          <FontAwesome5
            name="money-bill-wave"
            size={24}
            color={Colors.primary}
          />
        ),
      },
      {
        id: 2,
        name: "Job Type",
        icon: (
          <MaterialIcons
            name="type-specimen"
            size={24}
            color={Colors.primary}
          />
        ),
      },
      {
        id: 3,
        name: "Working Model",
        icon: (
          <FontAwesome5 name="network-wired" size={24} color={Colors.primary} />
        ),
      },
      {
        id: 4,
        name: "Level",
        icon: (
          <MaterialCommunityIcons
            name="spirit-level"
            size={24}
            color={Colors.primary}
          />
        ),
      },
    ];
    return (
      <View className="bg-white rounded-tl-3xl rounded-tr-3xl relative w-full">
        <View className="flex items-center justify-center absolute -top-[50px] w-full">
          <Image
            source={{ uri: data?.image_company }}
            width={60}
            height={60}
            className="w-[80px] h-[80px] object-cover rounded-full"
          />
        </View>

        {/* Tiêu đề bài đăng */}
        <View
          className="flex flex-col items-center justify-center p-4 mt-10 "
          style={{ gap: 10 }}
        >
          <Text className="font-bold text-[19px] text-slate-800">
            {data?.title}
          </Text>
          <Text className="text-gray-600 font-semibold text-[15px]">
            {data?.company}
          </Text>

          <View className="flex items-center flex-row gap-3">
            <FontAwesome5
              name="map-marker-alt"
              size={24}
              color={Colors.primary}
            />
            <Text className="font-semibold text-gray-500 text-[15px]">
              {data?.location}
            </Text>
          </View>
        </View>

        {/* Danh sách lương, loại công việc */}
        <View className="flex flex-row flex-wrap gap-2 px-3 justify-between">
          {dataFetch.map((item, index) => (
            <View
              style={{ width: `${50 - 2}%` }}
              className="flex items-center flex-row flex-wrap p-2 bg-white border-[1px] border-gray-300 rounded-lg"
              key={index}
            >
              <View className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                {item.icon}
              </View>
              <View className="ml-3 gap-y-1">
                <Text className="font-semibold text-gray-500">{item.name}</Text>
                {index === 0 && (
                  <Text className="text-primary font-semibold">
                    {formatCurrencyRange(data?.salary)}
                  </Text>
                )}

                {index === 1 && (
                  <Text className="text-primary font-semibold">
                    {data?.job_type[0]}
                  </Text>
                )}

                {index === 2 && (
                  <Text className="text-primary font-semibold">
                    {data?.working_model[0]}
                  </Text>
                )}

                {index === 3 && (
                  <Text className="text-primary font-semibold">
                    {data?.lever[0]}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }, []);

  const RenderTabs = useCallback(() => {
    return (
      <View className="flex flex-row items-center justify-between mt-5  gap-x-3 border-b-[1px] border-gray-300">
        {tabs.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleChangeTab(item)}
            style={{
              borderBottomWidth: 4,
              borderBottomColor:
                item === clickTab ? Colors.primary : "transparent",
            }}
            className="w-[calc(93%/3)]  text-center flex items-center justify-center p-3"
            key={item}
          >
            <View>
              <Text
                className={`${
                  item === clickTab ? "text-primary" : "text-slate-700"
                } font-semibold`}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [clickTab]);
  return (
    <View style={{ position: "relative", flex: 1 }}>
      <View style={{ height: height - 100 }}>
        <FlashList
          contentContainerStyle={{}}
          estimatedItemSize={1}
          ListHeaderComponent={() => {
            return (
              <>
                <RenderHeader />

                <View className="bg-white">
                  <RenderContent />

                  <RenderTabs />
                </View>

                {/* Render nội dung dựa vào Tab */}
                <View>
                  {clickTab === "About" && <AboutPage data={data} />}
                  {clickTab === "Company" && <CompanyPage data={data} />}
                  {clickTab === "Applicants" && (
                    <ApplicantsListPage data={mockPeople} />
                  )}
                </View>
              </>
            );
          }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          borderTopWidth: 1,
          borderTopColor: "gray",
          borderTopLeftRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          padding: 14,
          backgroundColor: "white",
        }}
      >
        <Button
          onPress={() => router.push("/(auth)/jobapplicationform/1")}
          type="full"
          title="Apply for Job"
        />
      </View>
    </View>
  );
};

export default JobDetail;

const styles = StyleSheet.create({});
