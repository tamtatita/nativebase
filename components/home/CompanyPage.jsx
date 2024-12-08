import { Image, Text, View } from "react-native";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { MODULE_JOBDETAIL } from "@/store/jobdetail";
const CompanyPage = () => {
  const { jobDetail } = useSelector((state) => state[MODULE_JOBDETAIL]);

  return (
    <View className="bg-white p-5">
      {/* About */}
      <Text className="font-semibold text-[16px] my-2">About company</Text>

      <Text className="text-gray-500 tracking-wider">
        {jobDetail?.CompanyDescription || "No description"}
      </Text>

      {/* <TouchableOpacity
        onPress={() => router.push(`(auth)/company/${data?.id}`)}
        className="bg-primary p-3 rounded-md my-3"
      >
        <Text className="text-white font-bold text-center">Xem thêm</Text>
      </TouchableOpacity> */}

      {/* Contact */}
      <Text className="font-semibold text-[16px] my-2">Company Contact</Text>

      <View className="flex flex-row items-center justify-between my-4">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            }}
            width={40}
            height={40}
            className="w-[50px] h-[50px] object-cover rounded-full"
          />

          <View>
            <Text className="font-semibold text-[16px] text-slate-700">
              Email : {jobDetail?.Recruiter?.Email || "Not available"}
            </Text>
            <Text className="text-gray-600">
              Phone : {jobDetail?.Recruiter?.Phone || "Not available"}
            </Text>
          </View>
        </View>

        {/* <View className="flex flex-row items-center gap-3">
          <IconButton
            size={"small"}
            icon={<MaterialIcons name="message" size={24} color="black" />}
            shape={"circle"}
            classNames={"rounded-full"}
            // color={Colors.primary}
          />
        </View> */}
      </View>
    </View>
  );
};

export default memo(CompanyPage);
