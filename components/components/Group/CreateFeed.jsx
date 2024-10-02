import { Image, Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import CreateFeedModal from "../ActionSheet/CreateFeed";
import { TouchableOpacity } from "react-native";

const CreateFeed = ({groupId, onSubmit}) => {
  const [createModal, setCreateModal] = useState(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setCreateModal(true);
        }}
      >
        <View
          display="flex"
          flexDirection="row"
          alignItems="center"
          px={10}
          py={10}
          backgroundColor="#fff"
          my={3}
          gap={3}
        >
          <Image
            source={require("../../../assets/images/avatar.jpg")}
            alt="avatarImg"
            width={40}
            height={40}
            rounded="$full"
          />

          <Text fontSize="$sm">Bạn viết gì đi ...</Text>
        </View>
      </TouchableOpacity>
      <CreateFeedModal
        onSubmit={onSubmit}
        groupId={groupId}
        showModal={createModal}
        handleClose={() => {
          setCreateModal(false);
        }}
      />
    </>
  );
};

export default CreateFeed;
