import { View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import GroupList from "../GroupList";
import Feed from "../Feed";
import { sendGet } from "@/api/axiosClient";

const GroupFeeds = ({ groupList }) => {
  const [listFeed, setListFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleGetListFeed = async () => {
    if (loading === true) {
      return;
    }
    setLoading(true);
    try {
      const input = {
        page: page,
      };
      const res = await sendGet(`/user/feed`, input);
      setListFeed((prev) => [...prev, ...res?.data?.data]);
      setPage((prev) => prev + 1);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetListFeed();
  }, []);
  return (
    <View
      style={{
        backgroundColor: "#f7f7f7",
        flex: 1,
      }}
    >
      {groupList.length !== 0 && (
        <View px={20} py={20} mb={3} backgroundColor="#fff">
          <GroupList groupList={groupList} />
        </View>
      )}
      <Feed entries={listFeed} onSubmit={handleGetListFeed} />
    </View>
  );
};

export default GroupFeeds;
