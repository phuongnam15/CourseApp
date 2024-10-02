import {
  CloseIcon,
  FlatList,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryItems from "../Group/CategoryItems";
import { sendGet } from "@/api/axiosClient";
import UserItem from "../UserItem";
const ApproveMems = ({ showModal, handleClose, data }) => {
  const ref = useRef(null);
  const [entries, setEntries] = useState([
    {
      id: 2,
      text: "Đã báo cáo",
      count: data?.member_blocked_count,
      key: "member_blocked_count",
    },
    {
      text: "Phê duyệt",
      id: 0,
      count: data?.member_pending_count,
      key: "member_pending_count",
    },
    {
      text: "Thành viên",
      id: 1,
      count: data?.member_count,
      key: "member_count",
    },
  ]);
  const [activeId, setActiveId] = useState(1);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Kiểm soát việc có dữ liệu để tải thêm không

  const loadMoreData = async () => {
    if (loading || !hasMore) return; // Nếu đang tải hoặc không còn dữ liệu thì không tải thêm
    setLoading(true);
    console.log('scrolll')
    // const moreData = await fetchMoreData(); // Hàm fetchMoreData sẽ gọi API
    // if (moreData.length > 0) {
    //   setItems([...items, ...moreData]); // Thêm dữ liệu mới vào danh sách hiện tại
    // } else {
    //   setHasMore(false); // Không còn dữ liệu để tải thêm
    // }
    setLoading(false);
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isCloseToBottom) {
      loadMoreData(); // Gọi API khi gần chạm tới đáy
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <CategoryItems
        key={index}
        activeId={activeId}
        setActiveId={() => {
          setActiveId(item.id);
        }}
        item={item}
      />
    );
  };
  const handleGetListUser = async () => {
    try {
      const input = {
        status: activeId,
        page: page,
        perPage: 1000,

      };
      const res = await sendGet(`/author/group/${data?.id}/members`, input);
      setUserList(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setPage(1);
    if (showModal === true) {
      handleGetListUser();
    }else{
      setActiveId(1)
    }
  }, [activeId, showModal]);
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
          backgroundColor: "#fff",
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
          <ModalHeader borderBottomWidth={0.2} position="relative">
            <View
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignContent="center"
              gap={10}
              flexGrow={1}
            >
              <View display="flex" alignItems="center">
                <Text fontSize="$lg" fontWeight="$bold">
                  Cần xét duyệt
                </Text>
                <Text fontSize="$xs">{data?.name}</Text>
              </View>
            </View>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <View
            borderBottomWidth={0.2}
            pb={10}
            style={{
              borderColor: "rgb(148 163 184)",
            }}
          >
            <FlatList
              data={entries}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              contentContainerStyle={{
                marginTop: 10,
                paddingHorizontal: 10,
              }}
            />
          </View>
          <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={16}>
            <ModalBody mt={10}>
              {userList?.length > 0 &&
                userList?.map((item, index) => (
                  <UserItem data={item} key={index} />
                ))}
            </ModalBody>
          </ScrollView>
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
    position: "absolute",
    top: 0,
    left: 0,
    width: 35,
    height: 35,
    borderRadius: 10,
  },
  avatar: {
    position: "absolute",
    bottom: 0,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
export default ApproveMems;
