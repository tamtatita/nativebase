import { MotiView } from "@motify/components";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { Colors } from "@/constants/Colors";
import { Easing } from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const CompanyMap = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const snapPoints = useMemo(() => [80, "50%", "90%"], []);

  const generateRandomCoordinates = (latitude, longitude, radiusInKm) => {
    const radiusInDegrees = radiusInKm / 111.32; // 1 degree latitude ~ 111.32 km
    const u = Math.random();
    const v = Math.random();
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const deltaLat = w * Math.cos(t);
    const deltaLon = (w * Math.sin(t)) / Math.cos(latitude * (Math.PI / 180));

    const newLatitude = latitude + deltaLat;
    const newLongitude = longitude + deltaLon;

    return {
      latitude: newLatitude,
      longitude: newLongitude,
    };
  };

  const generateCompanies = (numCompanies, centerLatitude, centerLongitude) => {
    const companies = [];

    for (let i = 0; i < numCompanies; i++) {
      const { latitude, longitude } = generateRandomCoordinates(
        centerLatitude,
        centerLongitude,
        1
      ); // Tạo các tọa độ ngẫu nhiên trong bán kính 1 km

      companies.push({
        id: i + 1,
        name: `Company ${i + 1}`,
        description: `This is company number ${i + 1}`,
        latitude,
        longitude,
      });
    }

    return companies;
  };

  const companies = useMemo(() => {
    return generateCompanies(20, location?.latitude, location?.longitude);
  }, [location]);

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2, // Tăng zoom (giá trị nhỏ hơn)
      longitudeDelta: region.longitudeDelta / 2, // Tăng zoom (giá trị nhỏ hơn)
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2, // Giảm zoom (giá trị lớn hơn)
      longitudeDelta: region.longitudeDelta * 2, // Giảm zoom (giá trị lớn hơn)
    });
  };

  // Tính khoảng cách giữa 2 tọa độ bằng công thức Haversine
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Bán kính Trái Đất tính theo km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Khoảng cách tính theo km
    return distance;
  };

  // Lọc các công ty trong bán kính 1 km
  const companiesInRange = companies.filter((company) => {
    if (location) {
      const distance = getDistanceFromLatLonInKm(
        location.latitude,
        location.longitude,
        company.latitude,
        company.longitude
      );
      return distance <= 1; // Bán kính 1 km
    }
    return false;
  });

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }

  const CustomMarker = ({ coordinate, onPress, title, description }) => {
    return (
      <Marker
        onPress={onPress}
        title={title}
        description={description}
        coordinate={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }}
      >
        {/* <View style={([styles.dot], styles.center)}>
          {[...Array(2).keys()].map((index) => {
            return (
              <MotiView
                from={{ opacity: 0.2, scale: 1 }}
                animate={{ opacity: 0.6, scale: 4 }}
                transition={{
                  type: "timing",
                  duration: 2000,
                  easing: Easing.out(Easing.ease),
                  delay: index * 400,
                  loop: true,
                }}
                key={index}
                style={[StyleSheet.absoluteFillObject, styles.dot]}
              ></MotiView>
            );
          })}
        </View> */}

        <View className="bg-white p-2 rounded-full">
          <MaterialCommunityIcons
            name="warehouse"
            size={24}
            color={Colors.primary}
          />
        </View>
        {/* <View style={styles.dot}></View> */}
      </Marker>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        zoomEnabled={true} // Bật tính năng zoom
        scrollEnabled={true} // Bật tính năng di chuyển bản đồ
        showsUserLocation={true} // Hiển thị vị trí người dùng
        showsCompass
        showsScale
        zoomTapEnabled
        zoomControlEnabled
        scrollDuringRotateOrZoomEnabled
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Vẽ vị trí hiện tại của người dùng */}
        <CustomMarker coordinate={location} title="Your Location" />

        {/* Vẽ vòng tròn với bán kính 1 km */}
        <Circle
          center={location}
          radius={1000} // 1 km
          strokeColor={Colors.primary}
          strokeWidth={5}
          fillColor="rgba(58, 50, 168, 0.3)"
        />

        {/* Hiển thị các công ty trong bán kính 1 km */}
        {companiesInRange.map((company, index) => (
          // <Marker
          //   key={index}
          //   coordinate={{
          //     latitude: company.latitude,
          //     longitude: company.longitude,
          //   }}
          //   title={company.name}
          //   description={company.description}
          //   style={{ backgroundColor: "red" }}
          // />
          <CustomMarker
            key={index}
            coordinate={company}
            title={company.name}
            description={company.description}
          />
        ))}
      </MapView>
      {/* Nút tăng và giảm zoom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={zoomIn}>
          <Text>Zoom in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomOut} />
      </View>

      <BottomSheet index={0} snapPoints={snapPoints}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listTitle}>Over {companies?.length} places</Text>
          <BottomSheetFlatList
            data={companies}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default CompanyMap;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  listTitle: {
    textAlign: "center",
    fontFamily: "InterSemi",
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 20,
  },
  selectedContainer: {
    position: "absolute",
    bottom: 100,
    right: 10,
    left: 10,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: "#10bce3",
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
