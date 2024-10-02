import { useGlobalState } from "@/context/globalContext";
import { Icon, Image, Text, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import {
  CalendarCheck2,
  MessageCircleWarning,
  Newspaper,
  UserRoundPlus,
} from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import ApproveMems from "../ActionSheet/ApproveMems";

const AnalystGroupItem = ({ data }) => {
  const [approveModal, setApproveModal] = useState(false);
  const router = useRouter();
  const { setGroupId } = useGlobalState();
  return (
    <View mb={10}>
      <TouchableOpacity
        onPress={() => {
          setGroupId(data?.id);
          router.push("/Group");
        }}
        activeOpacity={1}
      >
        <View backgroundColor="#fff" px={20} py={10}>
          <View display="flex" flexDirection="row" alignItems="center" gap={10}>
            <Image
              source={{ uri: data?.avatar }}
              style={{ width: 40, height: 40, borderRadius: 10 }}
              alt="groupAvatar"
            />
            <View>
              <Text fontWeight="$bold" fontSize="$sm">
                {data?.name}
              </Text>
              <Text fontSize="$xs">
                Nhóm {data?.statusText} - {data?.totalMembers} thành viên
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View px={20}>
        <Text my={10} fontSize="$lg" fontWeight="$bold">
          Thông tin nhóm
        </Text>
        <View backgroundColor="#fff" p={20} rounded={10}>
          <View
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={10}
            mb={10}
          >
            <Icon as={MessageCircleWarning} size="xl" />
            <View
              borderBottomWidth={0.2}
              pb={8}
              display="flex"
              alignItems="center"
              flexDirection="row"
              w={"85%"}
              justifyContent="space-between"
            >
              <View>
                <Text fontWeight="$bold" fontSize="$lg">
                  Nội dung bị báo cáo
                </Text>
                <Text fontSize="$xs">0 mục mới hôm nay</Text>
              </View>
              <Text fontSize="$xl">0</Text>
            </View>
          </View>
          <View
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={10}
            mb={10}
          >
            <Icon as={CalendarCheck2} size="xl" />
            <View
              borderBottomWidth={0.2}
              pb={8}
              display="flex"
              alignItems="center"
              flexDirection="row"
              w={"85%"}
              justifyContent="space-between"
            >
              <View>
                <Text fontWeight="$bold" fontSize="$lg">
                  Đang chờ phê duyệt
                </Text>
                <Text fontSize="$xs">0 mục mới hôm nay</Text>
              </View>
              <Text fontSize="$xl">0</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setApproveModal(true);
            }}
          >
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={10}
              mb={10}
            >
              <Icon as={UserRoundPlus} size="xl" />
              <View
                borderBottomWidth={0.2}
                pb={8}
                display="flex"
                alignItems="center"
                flexDirection="row"
                w={"85%"}
                justifyContent="space-between"
              >
                <View>
                  <Text fontWeight="$bold" fontSize="$lg">
                    Yêu cầu làm thành viên
                  </Text>
                  <Text fontSize="$xs">0 mục mới hôm nay</Text>
                </View>
                <Text fontSize="$xl">0</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View display="flex" flexDirection="row" alignItems="center" gap={10}>
            <Icon as={Newspaper} size="xl" />
            <View
              pb={8}
              display="flex"
              alignItems="center"
              flexDirection="row"
              w={"85%"}
              justifyContent="space-between"
            >
              <View>
                <Text fontWeight="$bold" fontSize="$lg">
                  Số bài đăng
                </Text>
                <Text fontSize="$xs">0 mục mới hôm nay</Text>
              </View>
              <Text fontSize="$xl">{data?.totalFeeds}</Text>
            </View>
          </View>
        </View>
      </View>
      <ApproveMems
        data={data}
        showModal={approveModal}
        handleClose={() => setApproveModal(false)}
      />
    </View>
  );
};

export default AnalystGroupItem;
