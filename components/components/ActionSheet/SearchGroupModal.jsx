import { sendGet } from "@/api/axiosClient";
import {
  CloseIcon,
  FlatList,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  View,
} from "@gluestack-ui/themed";
import { SearchIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GroupItem from "../Group/GroupItem";
import { useGlobalState } from "@/context/globalContext";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const SearchGroupModal = ({ showModal, handleClose, listGroup }) => {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [groupList, setGroupList] = useState(listGroup);
  const router = useRouter();
  const { setGroupId } = useGlobalState();
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleChange = (name, e) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  useEffect(() => {
    setGroupList(listGroup);
  }, [listGroup]);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  const handleGetListGroup = async () => {
    try {
      const input = {
        name: formData.name,
      };
      const res = await sendGet("/user/group", input);
      if (res.success === true) {
        setGroupList(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => handleGetListGroup(), 500);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setIsLoading(true);
    }
  }, [formData.name]);
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
            <Input
              variant="rounded"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              width="90%"
              px={10}
              isHovered={true}
              ref={inputRef}
            >
              <InputSlot>
                <InputIcon>
                  <Icon as={SearchIcon} />
                </InputIcon>
              </InputSlot>

              <InputField
                id="name"
                value={formData.name}
                onChangeText={(e) => {
                  handleChange("name", e);
                }}
                placeholder="Tìm kiếm nhóm ..."
              />
            </Input>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody mt={10}>
            <Text fontWeight="$bold">Những nhóm liên quan nhất ...</Text>
            {groupList?.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setGroupId(item?.id);
                  router.push("/Group");
                }}
                key={index}
              >
                <View mt={10}>
                  <GroupItem data={item} />
                </View>
              </TouchableOpacity>
            ))}
          </ModalBody>
        </SafeAreaView>
      </ModalContent>
    </Modal>
  );
};

export default SearchGroupModal;
