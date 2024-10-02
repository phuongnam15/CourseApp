import { useGlobalState } from "@/context/globalContext";
import {
  Button,
  ButtonText,
  Icon,
  Image,
  Input,
  InputField,
  ScrollView,
  Text,
  View,
  useToast,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { CircleUser, Mail, Phone, Route } from "lucide-react-native";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Notification from "@/components/components/Notification";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Tab() {
  const {
    userData,
    setUserData,
    setIsLogin,
    setToken,
    isLogin,
    setMyCourseList,
  } = useGlobalState();
  const [image, setImage] = useState<any>(null);
  const [uploadImage, setUploadImage] = useState<any>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const toast = useToast();
  const handleChange = (name: string, e: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  const pickFile = async () => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: ["image/*"],
      });
      if (!result.canceled) {
        setUploadImage(result.assets[0]);
        setImage(result.assets[0].uri);
      }
    } catch (err: unknown) {
      console.log(err, "errror");
      // see error handling
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setUploadImage(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };
  const handleLogout = async () => {
    try {
      setToken("");
      setIsLogin(false);
      setUserData(null);
      setMyCourseList([]);
      await SecureStore.deleteItemAsync("token");
      router.push("/login/");
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        email: userData.email,
      });
      if (userData.avatar) {
        setImage(userData.avatar);
      }
    }
  }, [userData]);
  async function sendXmlHttpRequest(data: any) {
    let token = await SecureStore.getItemAsync("token");

    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("Request Failed");
        }
      };
      xhr.open(
        "POST",
        "https://learning.amaiagency.com/api/user/update-info"
      );
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.setRequestHeader("Content-Type", `multipart/form-data`);
      xhr.send(data);
    });
  }
  const handleUpdateProfile = async () => {
    try {
      if (isLogin) {
        const formUploadData: any = new FormData();
        if (uploadImage) {
          // Lấy thông tin file từ uri
          const fileInfo = await FileSystem.getInfoAsync(uploadImage.uri);

          // Đọc nội dung file
          const fileData = await FileSystem.readAsStringAsync(uploadImage.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Tạo formData
          formUploadData.append("avatar", {
            uri:
              Platform.OS === "ios"
                ? uploadImage.uri.replace("file://", "")
                : uploadImage.uri,
            name: fileInfo.uri.split("/").pop(),
            type: "image/jpeg",
          });
        }
        formUploadData.append("phone", formData.phone);
        formUploadData.append("name", formData.name);
        formUploadData.append("address", formData.address);
        const res: any = await sendXmlHttpRequest(formUploadData);
        if (res.success === true) {
          setUserData(res?.data);
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Notification
                  id={toastId}
                  description="Cập nhật thông tin cá nhân thành công"
                  color="success"
                  title="Thành công"
                />
              );
            },
          });
        }
      } else {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Notification
                id={toastId}
                description="Bạn cần đăng nhập để tiếp tục"
                color="error"
                title="Lỗi"
              />
            );
          },
        });
      }
    } catch (err) {
      console.log(err, "######ERRRRRORRRR");
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f7f7f7",
      }}
    >
      <ScrollView style={{ backgroundColor: "#f7f7f7", height: "100%" }}>
        <View
          style={{
            width: "100%",
            paddingLeft: 10,
            paddingRight: 10,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              textTransform: "uppercase",
              lineHeight: 35 * 0.75,
              paddingTop: 35 - 35 * 0.75,
            }}
          >
            Thông tin cá nhân
          </Text>
          <Image
            mt={15}
            size="md"
            alt="avatar"
            style={styles.avaImage}
            source={
              image && image !== ""
                ? { uri: image }
                : require("../../../assets/images/avatar.jpg")
            }
          />
          <TouchableOpacity
            onPress={() => {
              if (isLogin) {
                if (Platform.OS === "android") {
                  pickFile();
                } else {
                  pickImage();
                }
              } else {
                toast.show({
                  placement: "top",
                  render: ({ id }) => {
                    const toastId = "toast-" + id;
                    return (
                      <Notification
                        id={toastId}
                        description="Bạn cần đăng nhập để tiếp tục"
                        color="error"
                        title="Lỗi"
                      />
                    );
                  },
                });
              }
            }}
            style={{ marginTop: 5 }}
          >
            <Text color="#61bc84">Chọn ảnh đại diện</Text>
          </TouchableOpacity>
          <View
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            rowGap={15}
            style={{ width: "100%" }}
            mt={15}
          >
            <View
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Text>Họ và tên</Text>
              <View
                display="flex"
                flexDirection="row"
                alignItems="center"
                mt={3}
                style={{
                  borderRadius: 20,
                  borderWidth: 0.3,
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                <Icon as={CircleUser} size="xl" />
                <Input
                  variant="outline"
                  size="md"
                  style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField
                    id="name"
                    value={formData.name}
                    onChangeText={(e) => {
                      handleChange("name", e);
                    }}
                    placeholder="Họ và tên"
                  />
                </Input>
              </View>
            </View>
            <View
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Text>Email</Text>
              <View
                display="flex"
                flexDirection="row"
                alignItems="center"
                mt={3}
                style={{
                  borderRadius: 20,
                  borderWidth: 0.3,
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                <Icon as={Mail} size="xl" />
                <Input
                  variant="outline"
                  size="md"
                  style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
                  isDisabled={true}
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
              </View>
            </View>
            <View
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Text>Số điện thoại</Text>
              <View
                display="flex"
                flexDirection="row"
                alignItems="center"
                mt={3}
                style={{
                  borderRadius: 20,
                  borderWidth: 0.3,
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                <Icon as={Phone} size="xl" />
                <Input
                  variant="outline"
                  size="md"
                  style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
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
              </View>
            </View>
            <View
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Text>Địa chỉ</Text>
              <View
                display="flex"
                flexDirection="row"
                alignItems="center"
                mt={3}
                style={{
                  borderRadius: 20,
                  borderWidth: 0.3,
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                <Icon as={Route} size="xl" />
                <Input
                  variant="outline"
                  size="md"
                  style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField
                    id="address"
                    value={formData.address}
                    onChangeText={(e) => {
                      handleChange("address", e);
                    }}
                    placeholder="Địa chỉ"
                  />
                </Input>
              </View>
            </View>
            <Button
              size="md"
              variant="solid"
              action="primary"
              isFocusVisible={false}
              bg="#61bc84"
              $hover-bg="#61bc84"
              $active-bg="#61bc84"
              $_text-hover-color="$white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={"100%"}
              mt={20}
              onPress={handleUpdateProfile}
            >
              <ButtonText textTransform="uppercase">Lưu</ButtonText>
            </Button>
            <Button
              size="md"
              variant="solid"
              action="primary"
              isFocusVisible={false}
              bg="#ef4444"
              $hover-bg="#ef4444"
              $active-bg="#ef4444"
              $_text-hover-color="$white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={"100%"}
              mb={70}
              onPress={handleLogout}
            >
              <ButtonText textTransform="uppercase">Đăng xuất</ButtonText>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  avaImage: {
    width: 120,
    height: 120,
    objectFit: "cover",
    borderRadius: 9999,
  },
});
