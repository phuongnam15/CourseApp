import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Image,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  Textarea,
  TextareaInput,
  View,
} from "@gluestack-ui/themed";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { ChevronDownIcon } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateGroupModal = ({ showModal, handleClose }) => {
  const ref = useRef(null);
  const [selectValue, setSelectValue] = useState("public");
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const handleChange = (name, e) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: ["image/*"],
      });
      if (!result.canceled) {
        setUploadImage(result.assets[0]);
        setImage(result.assets[0].uri);
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
      setUploadImage(result.assets[0]);
      setImage(result.assets[0].uri);
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
          reject("Request Failed");
        }
      };
      xhr.open("POST", "https://learning.amaiagency.com/api/author/group");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.setRequestHeader("Content-Type", `multipart/form-data`);
      xhr.send(data);
    });
  }
  const handleCreate = async () => {
    try {
      const formData = new FormData();
      const fileInfo = await FileSystem.getInfoAsync(uploadImage.uri);
      const fileData = await FileSystem.readAsStringAsync(uploadImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Tạo formData
      formData.append("avatar", {
        uri:
          Platform.OS === "ios"
            ? uploadImage.uri.replace("file://", "")
            : uploadImage.uri,
        name: fileInfo.uri.split("/").pop(),
        type: "image/jpeg",
      });
      formData.append("name", formData.name);
      formData.append("description", description);
      formData.append("status", selectValue === "public" ? 1 : 0);
      formData.append("fee", 0);
      formData.append("auto_approval", 1);
      formData.append("course_id", 1);
      const res = await sendXmlHttpRequest(formData);
      if (res.success === true) {
        setFormData({
          name: "",
          description: "",
        });
        setDescription("");
        setImage(null);
        setUploadImage(null);
        handleClose();
      }
    } catch (e) {
      console.log(e);
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
          height: "100%",
        }}
      >
        <SafeAreaView
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <ModalHeader borderBottomWidth={0.2}>
            <Heading size="lg">Tạo nhóm</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody mt={20}>
            <Text fontWeight="bold" mb={3}>
              Tên nhóm
            </Text>
            <Input
              variant="outline"
              size="md"
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
                placeholder="Nhập tên nhóm"
              />
            </Input>
            <Text fontWeight="bold" mb={3} mt={10}>
              Mô tả
            </Text>
            <Textarea
              mt={10}
              mb={3}
              size="md"
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}
            >
              <TextareaInput
                id="description"
                value={description}
                onChangeText={setDescription}
                // onChangeText={(e) => {
                //   handleChange("description", e);
                // }}
                placeholder="Viết mô tả về nhóm này..."
              />
            </Textarea>
            <Text fontWeight="bold" mb={3} mt={10}>
              Chọn quyền riêng tư
            </Text>
            <Select
              onValueChange={(value) => {
                setSelectValue(value);
              }}
              defaultValue="Công khai"
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select option" />
                <SelectIcon mr="$3">
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Công khai" value="public" />
                  <SelectItem label="Riêng tư" value="private" />
                </SelectContent>
              </SelectPortal>
            </Select>
            <View p={10} rounded={10} mt={30} backgroundColor="#CCCCCC">
              {selectValue === "public" ? (
                <Text fontSize="$xs">
                  Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những
                  gì họ đăng. Bạn có thể thay đổi nhóm thành riêng tư ngay hoặc
                  bất cứ lúc nào sau này.
                </Text>
              ) : (
                <Text fontSize="$xs">
                  Chỉ những thành viên mới nhìn thấy mọi người trong nhóm và
                  những gì họ đăng. Sau này bạn không thể thay đổi nhóm thành
                  công khai.
                </Text>
              )}
            </View>
            <Text fontWeight="bold" mb={3} mt={10}>
              Ảnh đại diện
            </Text>
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
              <View
                backgroundColor="#CCCCCC"
                width="100%"
                mt={10}
                rounded={10}
                aspectRatio={16 / 9}
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {image && image !== "" ? (
                  <Image
                    size="md"
                    alt="avatar"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                      top: 0,
                      right: 0,
                      objectFit: "cover",
                    }}
                    source={{ uri: image }}
                  />
                ) : (
                  <Text fontSize="$xs">Chọn ảnh đại diện</Text>
                )}
              </View>
            </TouchableOpacity>
          </ModalBody>
          <ModalFooter style={{ marginTop: "auto" }}>
            <Button
              size="sm"
              action="primary"
              borderWidth="$0"
              onPress={handleCreate}
              bg="$success700"
              $hover-bg="$success800"
              $active-bg="$success900"
              width="100%"
            >
              <ButtonText>Tạo nhóm</ButtonText>
            </Button>
          </ModalFooter>
        </SafeAreaView>
      </ModalContent>
    </Modal>
  );
};

export default CreateGroupModal;
