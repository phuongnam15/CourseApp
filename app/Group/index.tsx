import { sendGet, sendPost } from "@/api/axiosClient";
import JoinActionSheet from "@/components/components/ActionSheet/JoinActionSheet";
import CreateFeed from "@/components/components/Group/CreateFeed";
import Feed from "@/components/components/Group/Feed";
import Notification from "@/components/components/Notification";
import { useGlobalState } from "@/context/globalContext";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Icon,
  Image,
  Spinner,
  Text,
  View,
  useToast,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ChevronLeft, Globe, Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  const router = useRouter();
  const [groupInfo, setGroupInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionSheetModal, setActionSheetModal] = useState(false);
  const { groupId, setGroupId } = useGlobalState();
  const toast = useToast();
  const [listFeed, setListFeed] = useState<any>([]);
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
      const res: any = await sendGet(`/user/group/${groupId}/feed`, input);
      setListFeed((prev: any) => [...prev, ...res?.data]);
      setPage((prev: any) => prev + 1);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleGetInfoGroup = async () => {
    try {
      const res: any = await sendGet(`/user/group/${groupId}`);
      if (res.success === true) {
        setIsLoading(false);
        setGroupInfo(res?.data?.data);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetListFeed();
    handleGetInfoGroup();
  }, [groupId]);
  const handleSubmit = async () => {
    try {
      if (groupInfo?.isMember === true) {
        const res: any = await sendPost(`user/group/${groupId}/leave`);
        if (res.success === true) {
          setGroupInfo({
            ...groupInfo,
            isMember: false,
          });
          setActionSheetModal(false);
        }
      } else {
        const res: any = await sendPost(`user/group/${groupId}/join`);
        if (res.success === true) {
          setGroupInfo({
            ...groupInfo,
            isMember: true,
          });
        }
        setActionSheetModal(false);
      }
    } catch (err: any) {
      if (err) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Notification
                id={toastId}
                description={err?.response?.data?.error_msg}
                color="error"
                title="Lỗi"
              />
            );
          },
        });
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading === true ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner size="large" color="#2E8B57" />
        </View>
      ) : (
        <>
          <View
            bgColor="#fff"
            display="flex"
            flexDirection="row"
            alignItems="center"
            px={10}
            py={5}
            borderBottomWidth={0.3}
            gap={7}
          >
            <TouchableOpacity
              onPress={() => {
                setGroupId(null);
                router.push("../tabs/(tabs)/recommend");
              }}
            >
              <Icon as={ChevronLeft} size="xl" />
            </TouchableOpacity>
            <View
              style={{
                maxWidth: "80%",
              }}
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={3}
            >
              <Image
                source={{
                  uri: groupInfo?.avatar,
                }}
                style={styles.groupImg}
                alt="groupImg"
              />
              <Text
                fontWeight="$bold"
                fontSize="$sm"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {groupInfo?.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#f7f7f7",
              flex: 1,
            }}
          >
            <Image
              source={{
                uri: groupInfo?.avatar,
              }}
              style={styles.coverImg}
              alt="coverImg"
            />
            <View px={10} py={10} backgroundColor="#fff">
              <Text
                fontWeight="$bold"
                fontSize="$xl"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {groupInfo?.name}
              </Text>
              <View
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
                mt={2}
              >
                <Icon as={Globe} size="xs" />
                <Text fontSize="$xs">Nhóm {groupInfo?.statusText}</Text>
              </View>

              <View
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
                mt={2}
              >
                <Text fontWeight="$bold" fontSize="$xs">
                  {groupInfo?.totalMembers}
                </Text>
                <Text fontSize="$xs">thành viên</Text>
              </View>
              <Button
                onPress={() => {
                  setActionSheetModal(true);
                }}
                size="sm"
                variant="outline"
                action="primary"
                mt={10}
              >
                <ButtonIcon as={Users} mr={5} />
                <ButtonText>
                  {groupInfo?.isMember === true ? "Đã" : "Chưa"} tham gia
                </ButtonText>
              </Button>
            </View>
            <CreateFeed onSubmit={handleGetListFeed} groupId={groupId} />
            <Feed onSubmit={handleGetListFeed} entries={listFeed} />
          </View>
        </>
      )}
      <JoinActionSheet
        showActionsheet={actionSheetModal}
        handleClose={() => {
          setActionSheetModal(false);
        }}
        isLogin={groupInfo?.isMember}
        handleSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  groupImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  coverImg: {
    width: "100%",
    height: 200,
  },
});
export default index;
