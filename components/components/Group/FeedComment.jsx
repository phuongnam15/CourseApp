import { Icon, Image, View, useToast } from "@gluestack-ui/themed";
import { SendHorizonal } from "lucide-react-native";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import Notification from "../Notification";
import { sendPost } from "@/api/axiosClient";

const FeedComment = ({ data, onSubmit, isReply, postId }) => {
  const [number, onChangeNumber] = React.useState("");
  const toast = useToast();
  const handleComment = async () => {
    try {
      if (number.length === 0) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Notification
                id={toastId}
                description={"Bạn chưa nhập nội dung bình luận"}
                color="error"
                title="Lỗi"
              />
            );
          },
        });
      } else {
        if (isReply === true) {
          const formData = new FormData();
          formData.append("comment", number);
          formData.append("parent_id", data?.id);
          const res = await sendPost(
            `/user/post/${postId}/comment-post`,
            formData
          );
          if (res.success === true) {
            toast.show({
              placement: "top",
              render: ({ id }) => {
                const toastId = "toast-" + id;
                return (
                  <Notification
                    id={toastId}
                    description={"Bình luận thành công"}
                    color="success"
                    title="Thành công"
                  />
                );
              },
            });
            onSubmit();
            onChangeNumber("");
          }
        } else {
          const formData = new FormData();
          formData.append("comment", number);
          const res = await sendPost(
            `/user/post/${data?.id}/comment-post`,
            formData
          );
          if (res.success === true) {
            toast.show({
              placement: "top",
              render: ({ id }) => {
                const toastId = "toast-" + id;
                return (
                  <Notification
                    id={toastId}
                    description={"Bình luận thành công"}
                    color="success"
                    title="Thành công"
                  />
                );
              },
            });
            onSubmit();
            onChangeNumber("");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      gap={10}
      justifyContent="space-between"
    >
      <Image
        source={require("../../../assets/images/avatar.jpg")}
        style={{ width: 30, height: 30, borderRadius: 15 }}
        alt="avatar"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Bình luận dưới tên Datprs"
        multiline
      />
      <TouchableOpacity onPress={handleComment}>
        <Icon as={SendHorizonal} width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    borderWidth: 0.2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 12,
    // minHeight: 30,
  },
});
export default FeedComment;
