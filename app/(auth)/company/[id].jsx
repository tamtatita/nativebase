import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Button } from "@/components/ui";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { height, width } from "@/lib/InfoDevice";
import { Colors } from "@/constants/Colors";
import {
  AboutPage,
  CompanyPage,
  ReviewPage,
  OpenJobs,
  People,
  Gallery,
} from "@/components";

const CompanyDetail = () => {
  const [clickTab, setClickTab] = useState("Open Jobs");
  const steps = ["Open Jobs", "About", "People", "Gallery"];
  const data = {
    companyName: "ABC",
    logo: "https://i.pinimg.com/564x/95/84/44/958444e438b319c037ad2b1098ade1a1.jpg",
    backgroundCompany:
      "https://i.pinimg.com/564x/ed/f9/d2/edf9d2b3b9d2990a26204407243ca6ee.jpg",
    website: "https://localhost:9000",
    type: "IT Solfware",
    email: null,
    about: {
      aboutJob:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    people: [
      {
        name: "John Doe",
        position: "CEO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
      {
        name: "Jane Doe",
        position: "CTO",
        avatar:
          "https://i.pinimg.com/564x/b7/02/45/b7024575606f0d961d5a4b523a4ba99d.jpg",
      },
    ],
    gallery: [
      "https://i.pinimg.com/564x/20/20/74/20207409af0484d8adbd205e0b4175ef.jpg",
      "https://i.pinimg.com/564x/20/20/74/20207409af0484d8adbd205e0b4175ef.jpg",
      "https://i.pinimg.com/564x/20/20/74/20207409af0484d8adbd205e0b4175ef.jpg",
      "https://i.pinimg.com/564x/20/20/74/20207409af0484d8adbd205e0b4175ef.jpg",
      "https://i.pinimg.com/564x/20/20/74/20207409af0484d8adbd205e0b4175ef.jpg",
      "https://i.pinimg.com/564x/20/20/74/20207409af0484d8adbd205e0b4175ef.jpg",
      "https://i.pinimg.com/564x/20/20/74/20207409af0484d8adbd205e0b4175ef.jpg",
    ],
    openJob: [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Google",
        image_company:
          "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
        location: "Hồ Chí Minh",
        salary: [1000000, 2000000],
        type: ["Full-time", "Remote", "Internship", "jao", "ó"],
        applicantsView: 432,
      },
      {
        id: 2,
        title: "Backend Developer",
        company: "Facebook",
        image_company:
          "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
        location: "Hà Nội",
        salary: [1000000, 2000000],
        type: ["Full-time", "On-site"],
        applicantsView: 987,
      },
      {
        id: 3,
        title: "UI/UX Designer",
        company: "Amazon",
        image_company:
          "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
        location: "Đà Nẵng",
        salary: [1000000, 2000000],
        type: ["Remote", "Part-time"],
        applicantsView: 654,
      },
    ],
  };

  const handleClickTab = (type) => {
    setClickTab(type);
  };
  const RenderHeader = useCallback(() => {
    return (
      <View className="p-5">
        <SafeAreaView />
        <View className="flex flex-row items-center justify-between">
          <IconButton type="back" />

          <Text className="text-black font-bold text-lg">Company Detail</Text>

          <View
            style={{ display: "flex", gap: "20px" }}
            className="flex flex-row items-center gap-2"
          >
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

  const RenderInfoCompany = () => {
    return (
      <View className="bg-white mt-7 rounded-tr-3xl rounded-tl-3xl flex items-center justify-center">
        <View className="flex items-center">
          <View className="absolute -top-[50px] ">
            <Image
              source={{ uri: data.logo }}
              width={40}
              height={40}
              className="w-[80px] h-[80px] object-cover rounded-full"
            />
          </View>
          <View className="flex flex-col items-center justify-center mt-10">
            <Text className="font-bold text-[19px] text-slate-800">
              {data?.companyName}
            </Text>
            <Text className="text-gray-600 my-1 font-semibold text-[15px]">
              {data?.type}
            </Text>

            <View className="flex flex-row items-center gap-x-2 my-2">
              <AntDesign name="link" size={20} color={Colors.primary} />
              <Text className="text-primary font-bold text-[16px]">
                {data?.website}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const RenderTabs = useCallback(() => {
    return (
      <View className="flex flex-row items-center justify-between mt-5  gap-x-3 pl-5">
        <FlashList
          estimatedItemSize={4}
          data={steps}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleClickTab(item)}
              className={`${
                clickTab === item ? "border-b-4 border-primary" : ""
              } w-[120px] px-3 `}
            >
              <Text
                className={`${
                  clickTab === item ? "text-primary" : ""
                } text-center font-semibold text-[16px] pb-4`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }, [clickTab]);

  return (
    <FlashList
      estimatedItemSize={6}
      ListHeaderComponent={() => (
        <>
          <RenderHeader />

          <View className="bg-white rounded-tr-3xl rounded-tl-3xl">
            <RenderInfoCompany />

            <View className="bg-white">
              <RenderTabs />
            </View>

            {/* Render nội dung dựa vào Tab  */}
            <View className=" bg-gray-100 ">
              {clickTab === "About" && <AboutPage data={data} />}
              {clickTab === "Open Jobs" && <OpenJobs data={data?.openJob} />}
              {clickTab === "Gallery" && <Gallery data={data?.gallery} />}

              {clickTab === "People" && <People data={data.people} />}
            </View>
          </View>
        </>
      )}
    />

    // </View>
  );
};

export default CompanyDetail;

const styles = StyleSheet.create({});
