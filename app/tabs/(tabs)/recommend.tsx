import { sendGet } from "@/api/axiosClient";
import CreateActionSheet from "@/components/components/ActionSheet/CreateActionSheet";
import CreateGroupModal from "@/components/components/ActionSheet/CreateGroupModal";
import SearchGroupModal from "@/components/components/ActionSheet/SearchGroupModal";
import GroupCategory from "@/components/components/Group/GroupCategory";
import AnalystGroup from "@/components/components/Group/Tabs/AnalystGroup";
import GroupFeeds from "@/components/components/Group/Tabs/GroupFeeds";
import MyGroups from "@/components/components/Group/Tabs/MyGroups";
import { Icon, Text, View } from "@gluestack-ui/themed";
import { BadgePlus, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const recommend = () => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [createModal, setCreateModal] = React.useState(false);
  const [searchModal, setSearchModal] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);
  const insets = useSafeAreaInsets();
  const [groupList, setGroupList] = React.useState([]);
  const handleGetListGroup = async () => {
    try {
      const res: any = await sendGet("/user/group");
      if (res.success === true) {
        setGroupList(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleGetListGroup();
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingBottom: -insets.bottom,
      }}
    >
      <View
        borderBottomColor="#cbd5e1"
        backgroundColor="#fff"
        borderBottomWidth={0.5}
        pb={10}
      >
        <View px={20}>
          <View
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            position="relative"
            flexDirection="row"
          >
            <Text fontWeight="$bold" fontSize="$xl">
              Nhóm
            </Text>
            <View display="flex" flexDirection="row" gap={5}>
              <TouchableOpacity
                onPress={() => {
                  setShowActionsheet(true);
                }}
              >
                <Icon as={BadgePlus} size="xl" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSearchModal(true);
                }}
              >
                <Icon as={Search} size="xl" />
              </TouchableOpacity>
            </View>
          </View>
          <GroupCategory onSubmit={setActiveTab} />
        </View>
      </View>
      {(activeTab === 0 && <GroupFeeds groupList={groupList} />) ||
        (activeTab === 2 && <MyGroups />) ||
        (activeTab === 1 && <AnalystGroup />)}
      <CreateGroupModal
        showModal={createModal}
        handleClose={() => {
          setCreateModal(false);
        }}
      />
      <SearchGroupModal
        showModal={searchModal}
        listGroup={groupList}
        handleClose={() => {
          setSearchModal(false);
        }}
      />
      <CreateActionSheet
        handleCreateGroup={() => {
          setShowActionsheet(false);
          setCreateModal(true);
        }}
        showActionsheet={showActionsheet}
        handleClose={handleClose}
        handleCreatePost={() => {}}
      />
    </SafeAreaView>
  );
};
export default recommend;
