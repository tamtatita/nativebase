export default {
  getItems: (listName) => `/odata/${listName}/`,
  getItem: (listName, id) => `/odata/${listName}/${id}`,
  addItem: (listName) => `/odata/${listName}`,
  updateItem: (listName, id) => `/odata/${listName}/${id}`,
  deleteItem: (listName, id) => `/odata/${listName}/${id}`,
  // File
  getFile: (serverRelativeUrl) =>
    `api/store/get-file-content?serverRelativeUrl=${serverRelativeUrl}`,
  getFileInfo: (site, serverRelativeUrl) =>
    `${site}/_api/web/GetFileByServerRelativeUrl('${serverRelativeUrl}')`,
  addFile: (serverRelativeUrl, fileName, refID, dataSource) =>
    `/api/Store/create-file?serverRelativeUrl=${serverRelativeUrl}&&fileName=${fileName}&&refID=${refID}&&dataSource=${dataSource}`,
  updateFile: (site, serverRelativeUrl) =>
    `${site}/_api/web/GetFileByServerRelativeUrl('${serverRelativeUrl}')/$value`,
  deleteFile: (serverRelativeUrl) =>
    `api/store/delete-file?serverRelativeUrl=${serverRelativeUrl}`,
  addFolder: (site) => `${site}/_api/web/folders`,
  deleteFolder: (site, serverRelativeUrl) =>
    `${site}/_api/web/GetFolderByServerRelativeUrl('${serverRelativeUrl}')`,
};
