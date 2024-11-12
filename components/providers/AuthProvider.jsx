import React, { createContext, useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { handleError } from "@/utils/helpers";
import { getAuth, refreshTokenService } from "@/utils/services";
import config from "@/utils/config";
import LoadingPage from "@/app/(public)/loadingpage";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loginType, setLoginType] = useState(null);
  const [isGettingUser, setIsGettingUser] = useState(true);
  const [isRefreshPage, setIsRefreshPage] = useState(true);
  const router = useRouter();

  const logout = async () => {
    await SecureStore.deleteItemAsync(config.LOCAL_ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(config.LOCAL_REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(config.LOCAL_PROFILE);
    setProfile(null);
    setLoginType(null);
    router.replace("/(public)/login");
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
    } catch (error) {
      if (handleError(error) === "401") {
        try {
          console.log("error", error);
          await handleRefreshToken();
          await fetchUser();
          return;
        } catch (error) {
          logout();
        }
      } else {
        console.log("error", error);
        logout();
      }
    }
    setIsGettingUser(false);
    setIsRefreshPage(false);
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
      logout();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isGettingUser && isRefreshPage) {
    return <LoadingPage open={true} />;
  }

  // if (profile && !isRefreshPage) {
  //   return (

  //   );
  // }

  if (!profile && !isGettingUser) {
    router.replace("/(public)/login");
  }

  return (
    <AuthContext.Provider value={{ profile, logout, fetchUser, loginType }}>
      <Slot />
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const { profile, logout, fetchUser, loginType } = useContext(AuthContext);
  return { profile, logout, fetchUser, loginType };
}

export default AuthProvider;
