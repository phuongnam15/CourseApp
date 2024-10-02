import { sendGet } from "@/api/axiosClient";
import { useGlobalState } from "@/context/globalContext";
import { FlatList, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import AnalystGroupItem from "../AnalystGroupItem";

const AnalystGroup = () => {
  const [listGroup, setListGroup] = useState([]);
  const router = useRouter();
  const { setGroupId } = useGlobalState();
  const handleGetListMyGroups = async () => {
    try {
      const input = {
        admin: 1,
        perPage: 1000,
        admin: 1,
      };
      const res = await sendGet("/user/group/my-groups", input);
        setListGroup(res?.data?.data);
        console.log(res?.data?.data, 'resdataaaa')
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetListMyGroups();
  }, []);
  const renderGroup = ({ item, index }) => {
    return <AnalystGroupItem key={index} data={item} />;
  };
  return (
    <View
      style={{
        backgroundColor: "#f7f7f7",
        // height: "100%",
        flex: 1,
      }}
    >
      <FlatList
        data={listGroup}
        renderItem={renderGroup}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
     
      />
    </View>
  );
};

export default AnalystGroup;
