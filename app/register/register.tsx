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
import { CircleUser, Lock, Mail, Phone } from "lucide-react-native";
import { useState } from "react";
import { sendPost } from "../../api/axiosClient";
import Notification from "@/components/components/Notification";
export default function Home() {
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
  });
  const toast = useToast();
  const handleChange = (name: string, e: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  const handleRegister = async () => {
    setDisableButton(true);
    try {
      const res: any = await sendPost(`user/auth/register`, formData);
      if (res.status !== 200) {
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
        router.push("/login/");
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
    <Box style={{ position: "relative", backgroundColor: "#f7f7f7" }} flex={1}>
      <ScrollView
        style={{ backgroundColor: "#f7f7f7", marginBottom: 20, height: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box
          style={{ marginTop: 40 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
            // fontFamily="Poppins_400Regular"
            style={{
              fontWeight: "bold",
              fontSize: 30,
              lineHeight: 40 * 0.75,
              paddingTop: 40 - 35 * 0.75,
              textTransform: "uppercase",
              color: "#230B41",
            }}
          >
            Đăng ký
          </Text>
          <Text 
          // fontFamily="Poppins_400Regular"
          >
            Đã có tài khoản?{" "}
            <Link href={"/login/"} style={{ fontWeight: "bold" }}>
              {" "}
              Đăng nhập
            </Link>
          </Text>
        </Box>
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
              id="username"
              value={formData.username}
              onChangeText={(e) => {
                handleChange("username", e);
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
          <Icon as={Mail} size="xl" />
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
              placeholder="Email"
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
              id="password_confirmation"
              value={formData.password_confirmation}
              onChangeText={(e) => {
                handleChange("password_confirmation", e);
              }}
              type="password"
              placeholder="Nhập lại mật khẩu"
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
          <Icon as={Phone} size="xl" />
          <Input
            variant="outline"
            size="md"
            style={{ width: "60%", borderRadius: 20, marginLeft: 10 }}
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              id="phone"
              value={formData.phone}
              onChangeText={(e) => {
                handleChange("phone", e);
              }}
              placeholder="Số điện thoại"
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
              // router.push("/login/");
              handleRegister();
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
            <ButtonText>Đăng ký </ButtonText>
          </Button>
        </Box>
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
}
