import { useGlobalState } from "@/context/globalContext";
import { Box, Icon, Image, Text, useToast } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Clock1, PlayCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Notification from "./Notification";

const LessonItem = ({ data }) => {
  const toast = useToast();
  const router = useRouter();
  const { setIdLesson, isLogin, myCourseList } = useGlobalState();
  return (
    <TouchableOpacity
      onPress={() => {
        if (isLogin) {
          if (
            myCourseList
              .map((item) => item.course.id)
              .includes(data?.course_id) === false
          ) {
            toast.show({
              placement: "top",
              render: ({ id }) => {
                const toastId = "toast-" + id;
                return (
                  <Notification
                    id={toastId}
                    description="Bạn cần mua khóa học để tiếp tục"
                    color="error"
                    title="Lỗi"
                  />
                );
              },
            });
          } else {
            setIdLesson(data?.id);
            router.push("/lessonDetails/");
          }
        } else {
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Notification
                  id={toastId}
                  description="Bạn cần đăng nhập để tiếp tục"
                  color="error"
                  title="Lỗi"
                />
              );
            },
          });
        }
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        // marginHorizontal={10}
        marginVertical={5}
        paddingEnd={50}
        style={styles.lessonContainer}
      >
        <Box style={styles.container}>
          <Image
            source={{
              uri: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg",
            }}
            alt="lessonImg"
            style={styles.imgLesson}
          />
          <Icon style={styles.iconLesson} as={PlayCircle} size="xl" />
        </Box>
        <Box paddingLeft={5} display="flex"justifyContent="space-between">
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>{data?.name}</Text>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Icon as={Clock1} size="xs" />
            <Text style={{ fontSize: 10, marginLeft: 2 }}>
              {data?.time} phút
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  lessonContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  container: {
    position: "relative",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgLesson: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 15,
  },
});
export default LessonItem;
