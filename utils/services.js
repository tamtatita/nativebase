import { fetchAuth } from "./fetch";
import { fetchAxios } from "./fetch";
import endpoints from "./endpoints";
import * as SecureStore from "expo-secure-store";
import config from "./config";

// #region auth
export const loginService = async (userName, password) =>
  fetchAxios({
    url: "/api/Auth/login",
    method: "post",
    data: { userName, password },
  });

export const hashPasswordService = async (password) =>
  fetchAuth({
    url: "/api/Auth/hash",
    params: { rawstring: password },
    method: "post",
  });
export const registerServiceForUser = async (userName, password) =>
  fetchAxios({
    url: "/api/Auth/register",
    method: "post",
    data: { userName, password },
  });

export const changePasswordService = async (oldPassword, newPassword) =>
  fetchAuth({
    url: "/api/Auth/change-password",
    method: "put",
    data: { oldPassword, newPassword },
  });

export const requestResetPasswordService = async (email) =>
  fetchAxios({
    url: "/users/reset/request",
    method: "post",
    data: { email },
  });

export const verifyResetService = async (email, verifyCode) =>
  fetchAxios({
    url: "/users/reset/verify",
    method: "post",
    data: { email, verifyCode },
  });

export const office365AuthService = async (token) =>
  fetchAxios({
    url: "/api/Auth/office365",
    method: "post",
    data: { token },
  });

export const getAuth = async () => {
  const authenticated = JSON.parse(
    await SecureStore.getItemAsync(config.LOCAL_AUTHENTICATED)
  );

  const getMe = await fetchAuth({
    ignore401: true,
    url: "/api/Auth/me",
    method: "post",
    data: authenticated?.token,
  });

  if (getMe?.token) {
    // need to reset token
    await SecureStore.setItemAsync(
      config.LOCAL_ACCESS_TOKEN,
      getMe.token.accessToken
    );
    await SecureStore.setItemAsync(
      config.LOCAL_REFRESH_TOKEN,
      getMe.token.refreshToken
    );
    await SecureStore.setItemAsync(
      config.LOCAL_AUTHENTICATED,
      JSON.stringify(getMe)
    );
  }

  const newProfile = {
    authenticated,
    user: getMe?.user,
    account: getMe?.account,
    permission: getMe?.permission,
  };

  return newProfile;
};

export const refreshTokenService = async (accessToken, refreshToken) =>
  fetchAxios({
    url: "/api/Auth/refresh",
    method: "post",
    data: { accessToken, refreshToken },
  });
// #endregion auth

// #region File
export const getAttachmentFileService = async (list, storeID, fileName) =>
  fetchAuth({
    url: "/Sharepoints/",
    params: {
      url: endpoints.getAttachment(list.site, list.listName, storeID, fileName),
    },
    method: "get",
    responseType: "blob",
  });

export const getAttachmentInfoService = async (list, storeID, fileName) =>
  fetchAuth({
    url: "/Sharepoints/",
    params: {
      url: endpoints.getAttachmentInfo(
        list.site,
        list.listName,
        storeID,
        fileName
      ),
    },
    method: "get",
  });

export const getFilesService = async (
  list,
  {
    filter = "",
    orderBy = "",
    select = "",
    expand = "",
    top = config.PAGE_SIZE,
  } = {}
) =>
  fetchAuth({
    url: "/Sharepoints/",
    params: {
      url:
        endpoints.list(list.site, list.listName) +
        `/files?$expand=${expand}&$select=${select}&$filter=${filter}&$orderby=${orderBy}&$top=${top}`,
    },
    method: "get",
    headers: {
      Accept: "application/json;odata=nometadata",
    },
  });

export const getFileService = async (serverRelativeUrl) =>
  fetchAuth({
    url: endpoints.getFile(serverRelativeUrl),

    method: "get",
    responseType: "blob",
  });

export const getFileInfoService = async (site, serverRelativeUrl) =>
  fetchAuth({
    url: "/Sharepoints/",
    params: { url: endpoints.getFileInfo(site, serverRelativeUrl) },
    method: "get",
  });

export const uploadFileToDocLibService = async (
  serverRelativeUrl,
  fileName,
  refID,
  dataSource,
  file
) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchAuth({
    url: endpoints.addFile(
      serverRelativeUrl,
      encodeURIComponent(fileName),
      refID,
      dataSource
    ),
    data: formData,
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteFileService = async (serverRelativeUrl) =>
  fetchAuth({
    url: endpoints.deleteFile(serverRelativeUrl),
    method: "delete",
    headers: { "Content-Type": "multipart/form-data" },
  });

// Attachemnt
export const getAttachmentsService = async (list, storeID) =>
  fetchAuth({
    url: "/Sharepoints/",
    params: {
      url: endpoints.getAttachments(list.site, list.listName, storeID),
    },
    method: "get",
  });

export const addFolderService = async (site, serverRelativeUrl) => {
  return fetchAuth({
    url: "/Sharepoints/item",
    params: { url: endpoints.addFolder(site) },
    data: {
      ServerRelativeUrl: serverRelativeUrl,
    },
    method: "post",
  });
};

export const deleteFolderService = async (site, serverRelativeUrl) =>
  fetchAuth({
    url: "/Sharepoints/",
    params: { url: endpoints.deleteFolder(site, serverRelativeUrl) },
    method: "delete",
  });
// #endregion File

// #region ListItem
export const getItemsService = async (
  list,
  {
    filter = "",
    orderBy = "",
    select = "",
    expand = "",
    top = config.PAGE_SIZE,
    skip = 0,
    count = true,
  } = {}
) => {
  let url = "?";

  if (filter) {
    url += "&$filter=" + filter;
  }
  if (orderBy) {
    url += "&$orderby=" + orderBy;
  }
  if (select) {
    url += "&$select=" + select;
  }
  if (expand) {
    url += "&$expand=" + expand;
  }
  if (top) {
    url += "&$top=" + top;
  }
  if (skip) {
    url += "&$skip=" + skip;
  }
  if (count) {
    url += "&$count=true";
  }

  return fetchAuth({
    url: endpoints.getItems(list.listName) + url,
    method: "get",
    headers: {
      Accept: "application/json;odata=nometadata",
    },
  });
};

export const getItemService = async (list, id) =>
  fetchAuth({
    url: endpoints.getItem(list.listName, id),
    method: "get",
  });

export const addListItemService = async (list, item) =>
  fetchAuth({
    url: endpoints.addItem(list.listName),
    data: item,
    method: "post",
  });

export const deleteListItemService = async (list, id) =>
  fetchAuth({
    url: endpoints.deleteItem(list.listName, id),
    method: "delete",
  });

export const updateListItemService = async (list, id, item) =>
  fetchAuth({
    url: endpoints.updateItem(list.listName, id),
    data: item,
    method: "patch",
  });
// #endregion ListItem
