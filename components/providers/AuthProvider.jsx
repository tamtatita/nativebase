import React, { createContext, useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { handleError } from "@/utils/helpers";
import { getAuth, refreshTokenService } from "@/utils/services";
import config from "@/utils/config";
import LoadingPage from "@/app/(public)/loadingpage";
import { authActions } from "@/store/auth";
import { useDispatch } from "react-redux";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loginType, setLoginType] = useState(null);
  const [isGettingUser, setIsGettingUser] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = async () => {
    await SecureStore.deleteItemAsync(config.LOCAL_ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(config.LOCAL_REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(config.LOCAL_PROFILE);
    setProfile(null);
    setLoginType(null);
    router.replace("/(public)/login"); // Điều hướng về trang login sau khi logout
  };

  const fetchUser = async () => {
    setIsGettingUser(true);

    try {
      const newProfile = await getAuth();
      setProfile(newProfile);
      await SecureStore.setItemAsync(
        config.LOCAL_PROFILE,
        JSON.stringify(newProfile)
      );
      dispatch(authActions.setCurrentUser(newProfile.user));
    } catch (error) {
      if (handleError(error) === "401") {
        try {
          // Nếu lỗi 401 (Unauthorized), thử làm mới token
          await handleRefreshToken();
          await fetchUser(); // Sau khi làm mới token, thử lại việc fetch user
          return;
        } catch (error) {
          // Nếu không thể làm mới token, logout
          logout();
        }
      } else {
        console.log("error", error);
        logout();
      }
    }
    setIsGettingUser(false);
  };

  const handleRefreshToken = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync(
        config.LOCAL_REFRESH_TOKEN
      );
      const accessToken = await SecureStore.getItemAsync(
        config.LOCAL_ACCESS_TOKEN
      );
      const newToken = await refreshTokenService(accessToken, refreshToken);

      await SecureStore.setItemAsync(
        config.LOCAL_ACCESS_TOKEN,
        newToken.accessToken
      );
      await SecureStore.setItemAsync(
        config.LOCAL_REFRESH_TOKEN,
        newToken.refreshToken
      );

      return newToken;
    } catch (error) {
      logout(); // Nếu không thể làm mới token, logout
    }
  };

  useEffect(() => {
    fetchUser(); // Gọi hàm fetchUser khi component mount
  }, []);

  useEffect(() => {
    if (profile && !isGettingUser) {
      router.replace("/(tabs)"); // Điều hướng về trang tabs sau khi fetch user
    } else if (!profile && !isGettingUser) {
      router.replace("/(public)/login"); // Điều hướng về trang login nếu không có profile
    }
  }, [profile, isGettingUser]);

  return (
    <AuthContext.Provider
      value={{ profile, logout, fetchUser, loginType, setProfile }}
    >
      {/* Hiển thị trang loading nếu đang fetching user */}
      {/* {isGettingUser ? <LoadingPage /> : null} */}
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const { profile, logout, fetchUser, loginType, setProfile } =
    useContext(AuthContext);
  return { profile, logout, fetchUser, loginType, setProfile };
}

export default AuthProvider;
