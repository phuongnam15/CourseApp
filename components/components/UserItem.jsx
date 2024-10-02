import { Icon, Image, Text, View } from "@gluestack-ui/themed";
import { EllipsisVertical } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import UserSheet from "./ActionSheet/UserSheet";
import { sendDelete, sendPost } from "@/api/axiosClient";

const UserItem = ({ data , onSubmit, onDelete }) => {
  const [actionSheetModal, setActionSheetModal] = useState(false);
  const handleSubmit = async (status) => {
    try {
      const input = {
        status: status,
      };
      const res = await sendPost(`author/group/members/${data?.id}`, input);
      console.log(res, "submitRes");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await sendDelete(`author/group/members/${data?.id}`);
      console.log(res, "deleteRes");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setActionSheetModal(true);
        }}
      >
        <View
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <View
            mb={5}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={5}
          >
            <Image
              size="md"
              alt="avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
              source={require("../../assets/images/avatar.jpg")}
            />
            <View>
              <Text fontSize="$sm" fontWeight="$bold">
                {data?.user?.name}
              </Text>
              <Text fontSize="$xs">{data?.user?.email}</Text>
            </View>
          </View>

          <Icon as={EllipsisVertical} size="lg" />
        </View>
      </TouchableOpacity>

      <UserSheet
        showActionsheet={actionSheetModal}
        handleClose={() => {
          setActionSheetModal(false);
        }}
        onSubmit={() => {
          handleSubmit(1);
        }}
        onBan={() => {
          handleSubmit(2);
        }}
        onReject={handleDelete}
      />
    </>
  );
};

export default UserItem;
