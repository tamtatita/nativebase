import React, { useState, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import debounce from "lodash.debounce";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "expo-router";
import { getItemsService } from "@/utils/services";
import lists from "@/utils/lists";
import { IconButton } from "@/components/ui";

const Location = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState({
    latitude: 21.028511,
    longitude: 105.804817,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [marker, setMarker] = useState(null);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      Alert.alert("Lỗi", "Không thể lấy danh sách gợi ý.");
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        Alert.alert(
          "Địa điểm của bạn",
          `Latitude: ${latitude}, Longitude: ${longitude}`
        );
      },
      (error) => {
        console.error("Error getting location:", error);
        Alert.alert(
          "Lỗi",
          "Không thể lấy địa điểm của bạn. Hãy kiểm tra cài đặt GPS."
        );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  // Sử dụng debounce để giảm số lần gọi API
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  const handleInputChange = (text) => {
    setSearchQuery(text);
    debouncedFetchSuggestions(text);
  };

  const handleSelectSuggestion = (item) => {
    const { lat, lon, display_name } = item;
    setLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setMarker({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      title: display_name,
    });
    setSuggestions([]);
    setSearchQuery(display_name);
  };

  const handleConfirmLocation = (marker) => {
    console.log("Selected location:", marker);
  };

  const FetchAllJobs = async () => {
    const response = await getItemsService(lists.Jobs, {
      expand: "Recruiter",
      filter: `Recruiter/GeoLocation ne null`,
      top: 10,
    });
    console.log(response?.value);
  };

  useFocusEffect(
    useCallback(() => {
      FetchAllJobs();
    }, [])
  );

  return (
    <View className="relative flex-1">
      <MapView style={styles.map} region={location}>
        {marker && (
          <Marker
            onPress={() => handleConfirmLocation(marker)}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        )}
      </MapView>

      <View className=" w-full flex flex-row absolute top-20 px-4">
        <IconButton
          size={"small"}
          classNames={"rounded-full mr-3"}
          icon={<Feather name="filter" size={24} color="black" />}
        ></IconButton>
        <View className="flex-1">
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm địa điểm"
            value={searchQuery}
            className="placeholder:text-black"
            onChangeText={handleInputChange}
          />
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSelectSuggestion(item)}
                >
                  <Text>{item.display_name}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={getCurrentLocation}
        className="absolute bottom-6 right-6 bg-white p-3 rounded-full border-2 border-black"
      >
        <Feather name="map-pin" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    // position: "absolute",
    // top: 10,
    // left: 10,
    // right: 10,
    // zIndex: 10,
  },
  input: {
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "black",
  },
  suggestionsList: {
    backgroundColor: "white",
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  map: {
    flex: 1,
    marginTop: 60,
  },
});

export default Location;
