import {
  Button,
  ButtonText,
  CloseIcon,
  Icon,
  Image,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollView,
  Text,
  View,
  useToast,
} from "@gluestack-ui/themed";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { ImageIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Notification from "../Notification";
const CreateFeedModal = ({ showModal, handleClose, groupId, onSubmit }) => {
  const ref = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [uploadImage, setUploadImage] = useState([]);
  const toast = useToast();

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: ["image/*"],
      });
      if (!result.canceled) {
        setUploadImage((prevState) => [...prevState, result.assets[0]]);
        setImage((prevState) => [...prevState, result.assets[0].uri]);
      }
    } catch (err) {
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
      //   setUploadImage(result.assets[0]);
      //   setImage(result.assets[0].uri);
      setUploadImage((prevState) => [...prevState, result.assets[0]]);
      setImage((prevState) => [...prevState, result.assets[0].uri]);
    }
  };
  async function sendXmlHttpRequest(data) {
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
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Notification
                  id={toastId}
                  description={JSON.parse(xhr.responseText)?.error_msg}
                  color="error"
                  title="Lỗi"
                />
              );
            },
          });
          reject("Request Failed");
        }
      };
      xhr.open(
        "POST",
        `https://learning.amaiagency.com/api/user/group/${groupId}/create-post`
      );
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.setRequestHeader("Content-Type", `multipart/form-data`);
      xhr.send(data);
    });
  }
  const handleCreatePost = async () => {
    try {
      const formData = new FormData();
      if (uploadImage && uploadImage.uri) {
        const fileInfo = await FileSystem.getInfoAsync(uploadImage.uri);
        const fileData = await FileSystem.readAsStringAsync(uploadImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        formData.append("avatar", {
          uri:
            Platform.OS === "images"
              ? uploadImage.uri.replace("file://", "")
              : uploadImage.uri,
          name: fileInfo.uri.split("/").pop(),
          type: "image/jpeg",
        });
      }
      formData.append("content", content);
      const res = await sendXmlHttpRequest(formData);
      if (res.success === true) {
        onSubmit();
        handleClose();
      }
    } catch (err) {
      console.log(err, "errror");
    }
  };
  return (
    <Modal
      isOpen={showModal}
      onClose={handleClose}
      size="full"
      finalFocusRef={ref}
    >
      <ModalBackdrop />
      <ModalContent
        style={{
          borderRadius: 0,
        }}
      >
        <SafeAreaView
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            paddingBottom: "30px",
          }}
        >
          <ModalHeader borderBottomWidth={0.2}>
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={10}
            >
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.groupAvatar}
                  source={require("../../../assets/images/orange.jpg")}
                  alt="groupimg"
                />
              </View>

              <View
                display="flex"
                flexDirection="column"
                width="80%"
                justifyContent="space-between"
              >
                <Text
                  fontWeight="$bold"
                  fontSize="$sm"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  Hội những người ăn gì cũng được Hội những người ăn gì cũng
                  được
                </Text>
              </View>
            </View>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ScrollView style={{ flex: 1 }}>
            <ModalBody mt={20}>
              <View
                gap={5}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Image
                  style={styles.avatar}
                  source={require("../../../assets/images/avatar.jpg")}
                  alt="avatar"
                />
                <Text
                  style={{
                    fontSize: 12,
                  }}
                  numberOfLines={1}
                  fontWeight="$bold"
                  ellipsizeMode="tail"
                  // color="#94a3b8"
                >
                  Hoàng Tiến Đạt
                </Text>
              </View>
              <View mt={10}>
                <View
                  position="relative"
                  display="flex"
                  justifyContent="flex-end"
                  flexDirection="row"
                  style={{ width: "100%" }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      if (Platform.OS === "android") {
                        pickFile();
                      } else {
                        pickImage();
                      }
                    }}
                  >
                    <Icon as={ImageIcon} size="xl" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setContent(text)}
                  defaultValue={content}
                  placeholder="Tạo bài viết công khai ..."
                  multiline
                />
              </View>
              {image && image.length !== 0 && (
                <View mt={20}>
                  {image.map((item, index) => (
                    <View
                      position="relative"
                      style={{
                        width: "fit-content",
                      }}
                      mt={10}
                    >
                      <Image
                        size="md"
                        alt="avatar"
                        style={{
                          borderRadius: 10,
                          objectFit: "cover",
                          width: "100%",
                          height: "auto",
                          minHeight: 100,
                        }}
                        source={{ uri: item }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setImage((prevState) =>
                            prevState.filter((_, i) => i !== index)
                          );
                          setUploadImage((prevState) =>
                            prevState.filter((_, i) => i !== index)
                          );
                        }}
                        activeOpacity={1}
                        zIndex={10}
                        style={{
                          position: "absolute",
                          top: -5,
                          right: -5,
                        }}
                      >
                        <Icon
                          top={0}
                          right={5}
                          zIndex={10}
                          as={CloseIcon}
                          bg="#fff"
                          size="sm"
                          color="#000"
                          rounded="$full"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </ModalBody>
          </ScrollView>
          <ModalFooter style={{ marginTop: "auto" }}>
            <Button
              size="sm"
              action="primary"
              borderWidth="$0"
              onPress={handleCreatePost}
              bg="$success700"
              $hover-bg="$success800"
              $active-bg="$success900"
              width="100%"
            >
              <ButtonText>Tạo bài đăng</ButtonText>
            </Button>
          </ModalFooter>
        </SafeAreaView>
      </ModalContent>
    </Modal>
  );
};
const styles = StyleSheet.create({
  avatarContainer: {
    position: "relative",
    width: 35,
    height: 35,
    borderRadius: 10,
  },
  groupAvatar: {
    top: 0,
    left: 0,
    width: 35,
    height: 35,
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  input: {
    borderRadius: 10,
    fontSize: 12,
    // minHeight: 30,
  },
});
export default CreateFeedModal;
