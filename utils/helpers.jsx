export function handleError(error, from) {
  let message = "";

  // for fetching
  if (error.response) {
    message = error.response.data;

    if (
      message["odata.error"]?.code?.indexOf("SPDuplicateValuesFoundException") >
      -1
    ) {
      message = "Duplicate Value";
    }

    if (message["odata.error"]?.message?.value) {
      message = message["odata.error"]?.message?.value;
    }

    if (error?.response?.status === 401) {
      message = "401";
    }
  } else {
    // for system
    message = error.message;
  }

  message = JSON.stringify(message);
  if (message.indexOf("指定した名前は既に使用されています") > -1) {
    message = "Tên file đã tồn tại";
  }

  if (message.indexOf("The specified name is already in use.") > -1) {
    message = "Tên file đã tồn tại";
  }
  console.error(`[handleError/${from}]`, message);

  return message;
}

export const capitalizeKeys = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.charAt(0).toUpperCase() + key.slice(1);
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
};
