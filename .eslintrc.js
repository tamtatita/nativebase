module.exports = {
  root: true,
  extends: [
    "expo", // Config mặc định của Expo
    "plugin:react/recommended", // Hỗ trợ React
    // "plugin:react-native/all", // Hỗ trợ React Native
    "plugin:@typescript-eslint/recommended", // Hỗ trợ TypeScript
  ],
  parser: "@typescript-eslint/parser", // Parser cho TypeScript
  plugins: ["react", "react-native", "@typescript-eslint", "react-hooks"],
  rules: {
    // Các rule tùy chỉnh
    "react-hooks/rules-of-hooks": "error", // Kiểm tra các rule của hooks
    "react-hooks/exhaustive-deps": "warn", // Kiểm tra dependencies của hooks
    "@typescript-eslint/no-unused-vars": ["warn"], // Cảnh báo biến không sử dụng
    "react/react-in-jsx-scope": "off", // Tắt React in scope
    "no-undef": "error", // Báo lỗi nếu có biến hoặc module không được định nghĩa
    "react-native/no-unused-styles": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
