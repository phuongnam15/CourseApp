import { sendPost } from "@/api/axiosClient";
import Notification from "@/components/components/Notification";
import * as SecureStore from "expo-secure-store";
import {
  Box,
  Button,
  ButtonText,
  Icon,
  Image,
  Input,
  InputField,
  ScrollView,
  Text,
  useToast,
} from "@gluestack-ui/themed";
import { Link, useRouter } from "expo-router";
import { CircleUser, Lock } from "lucide-react-native";
import React, { useState } from "react";
import { useGlobalState } from "@/context/globalContext";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(false);
  const { setIsLogin, setToken } = useGlobalState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const handleChange = (name: string, e: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  const handleLogin = async () => {
    setDisableButton(true);
    try {
      const res: any = await sendPost(`/user/auth/login`, formData);
      if (!res.success) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Notification
                id={toastId}
                description={res?.data?.error_msg}
                color="error"
                title="Lỗi"
              />
            );
          },
        });
      } else {
        await SecureStore.setItemAsync("token", res?.data?.token);
        setToken(res?.data?.token);
        setIsLogin(true);
        router.push("/tabs/roadmap");
      }
      setDisableButton(false);
    } catch (err: any) {
      // toast.show({
      //   placement: "top",
      //   render: ({ id }) => {
      //     const toastId = "toast-" + id;
      //     return (
      //       <Notification
      //         id={toastId}
      //         description={err?.response?.data?.error_msg}
      //         color="error"
      //         title="Lỗi"
      //       />
      //     );
      //   },
      // });
      setDisableButton(false);
    }
  };
  return (
    <Box style={{ position: "relative" }} flex={1} backgroundColor="$black">
      <ScrollView
        style={{ backgroundColor: "#f7f7f7" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              size="md"
              style={{
                width: "80%",
                height: 200,
              }}
              alt="loginImg"
              source={require("../../assets/images/loginImage.png")}
            />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                lineHeight: 40 * 0.75,
                paddingTop: 40 - 35 * 0.75,
                textTransform: "uppercase",
                color: "#230B41",
              }}
            >
              Đăng nhập
            </Text>
            <Text>
              Bạn chưa có tài khoản?{" "}
              <Link href='/register/register' style={{ fontWeight: "bold" }}>
                {" "}
                Đăng ký
              </Link>
            </Text>
            <Box
              style={{ marginTop: 40 }}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={CircleUser} size="xl" />
              <Input
                variant="outline"
                size="md"
                style={{ width: "60%", borderRadius: 20, marginLeft: 10 }}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  id="email"
                  value={formData.email}
                  onChangeText={(e) => {
                    handleChange("email", e);
                  }}
                  placeholder="Tên tài khoản"
                />
              </Input>
            </Box>

            <Box
              style={{ marginTop: 20 }}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={Lock} size="xl" />
              <Input
                variant="outline"
                size="md"
                style={{ width: "60%", borderRadius: 20, marginLeft: 10 }}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  id="password"
                  value={formData.password}
                  onChangeText={(e) => {
                    handleChange("password", e);
                  }}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Input>
            </Box>
            <Box
              style={{ marginTop: 20 }}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                onPress={() => {
                  // router.push('/tabs/(tabs)/roadmap')
                  handleLogin();
                }}
                size="md"
                variant="solid"
                action="primary"
                isDisabled={disableButton}
                isFocusVisible={false}
                style={{
                  borderRadius: 20,
                  backgroundColor: "#230B41",
                  paddingLeft: 25,
                  paddingRight: 25,
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ButtonText>Đăng nhập</ButtonText>
              </Button>
            </Box>
          </Box>
        </SafeAreaView>
      </ScrollView>
      <Image
        size="md"
        style={{
          width: 300,
          height: 300,
          position: "absolute",
          bottom: -150,
          left: -150,
        }}
        alt="loginCorner"
        source={require("../../assets/images/loginCorner.png")}
      />
      <Image
        size="md"
        style={{
          width: 300,
          height: 300,
          position: "absolute",
          bottom: -150,
          right: -150,
        }}
        alt="loginCorner"
        source={require("../../assets/images/loginCorner.png")}
      />
    </Box>
  );
};

export default index;
