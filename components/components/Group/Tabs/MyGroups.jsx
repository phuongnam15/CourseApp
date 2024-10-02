import { sendGet } from "@/api/axiosClient";
import { FlatList, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import GroupItem from "../GroupItem";
import { useRouter } from "expo-router";
import { useGlobalState } from "@/context/globalContext";
import { TouchableOpacity } from "react-native";

const MyGroups = () => {
  const [listGroup, setListGroup] = useState([]);
  const router = useRouter();
  const { setGroupId } = useGlobalState();
  const handleGetListMyGroups = async () => {
    try {
      const input = {
        perPage: 1000,
      };
      const res = await sendGet("/user/group/my-groups", input);
      setListGroup(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetListMyGroups();
  }, []);
  const renderGroup = ({ item, index }) => {
    return (
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
    );
  };
  return (
    <View
      px={20}
      py={20}
      mb={3}
      style={{
        height: "100%",
      }}
    >
      <Text fontWeight="$bold" fontSize="$xl">
        Nhóm bạn đã tham gia
      </Text>
      <FlatList
        data={listGroup}
        renderItem={renderGroup}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        contentContainerStyle={{
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default MyGroups;
