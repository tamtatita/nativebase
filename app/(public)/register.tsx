import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack } from "expo-router";
import {
  Button,
  Form,
  Icon,
  Input,
  Radio,
  WhiteSpace,
  WingBlank,
  Flex as Row,
} from "@ant-design/react-native";

const Register = () => {
  const [form] = Form.useForm();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            doorNumber: "",
            username: "",
            phoneNumber: "",
            isDefault: false,
          }}
          renderHeader="水平布局菜单"
        >
          <Form.Item
            label="收货人"
            name="username"
            extra={
              <Form.Item name="gender" noStyle>
                <Radio.Group>
                  <Row>
                    <Radio value={1}>先生</Radio>
                    <Radio value={2}>女士</Radio>
                  </Row>
                </Radio.Group>
              </Form.Item>
            }
          >
            <Input placeholder="请输入收货人姓名" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phoneNumber"
            hasFeedback
            validateDebounce={500}
            rules={[{ pattern: /^1[3456789]\d{9}$/ }, { required: true }]}
          >
            <Input type="number" placeholder="请输入手机号" />
          </Form.Item>
        </Form>

        <View>
          <Text style={{ fontSize: "18px", fontWeight: 700 }}>Email</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="simon@galaxies.dev"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
        </View>

        <View>
          <Text style={{ fontSize: "18px", fontWeight: 700 }}>
            Nhập mật khẩu
          </Text>
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />
        </View>

        <View>
          <Text style={{ fontSize: "18px", fontWeight: 700 }}>
            Xác nhận mật khẩu
          </Text>
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />
        </View>
        <Button type="primary">Hello</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default Register;
