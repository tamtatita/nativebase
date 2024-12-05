import _ from "lodash";

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

export const removeGuidFromFileName = (fileName) => {
  if (fileName?.includes("_")) {
    return fileName.split("_").slice(1).join("_");
  }
  return fileName;
};

const toPascalCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Tách chữ cái hoa liền nhau
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()) // Xóa ký tự không phải chữ và viết hoa ký tự đầu
    .replace(/^./, (chr) => chr.toUpperCase()); // Viết hoa ký tự đầu tiên
};

export const deepCapitalKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(deepCapitalKeys); // Đệ quy cho mảng
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const capitalKey = toPascalCase(key);
      acc[capitalKey] = deepCapitalKeys(obj[key]); // Đệ quy cho object lồng nhau
      return acc;
    }, {});
  }
  return obj; // Trả về giá trị nguyên bản nếu không phải object hoặc array
};

export function toCamelCaseKey(obj) {
  if (Array.isArray(obj)) {
    // Nếu là mảng, áp dụng đệ quy cho từng phần tử
    return obj.map(toCamelCaseKey);
  } else if (obj && typeof obj === "object") {
    // Nếu là object, áp dụng lodash camelCase cho key
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = _.camelCase(key); // Sử dụng lodash để chuyển key sang camelCase
      result[camelKey] = toCamelCaseKey(obj[key]); // Đệ quy nếu value là object hoặc array
      return result;
    }, {});
  }
  return obj;
}
