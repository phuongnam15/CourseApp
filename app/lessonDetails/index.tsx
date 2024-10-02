import { Box, Icon, Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ChevronLeftCircle } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import VideoPlayer from "@/components/components/VideoPlayer";
import LessonItem from "@/components/components/LessonItem";
import ReviewItem from "@/components/components/ReviewItem";
import { useGlobalState } from "@/context/globalContext";
import { sendGet, sendPost } from "@/api/axiosClient";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  const [lessonInfo, setLessonsInfo] = useState<any>({});
  const router = useRouter();
  const [activeState, setActiveState] = useState(0);
  const [infoCourse, setInfoCourse] = useState<any>({});
  const [listReview, setListReview] = useState<any>([]);
  const { idLesson } = useGlobalState();
  const [courseId, setCourseId] = useState(null);
  const handleShowInfoLesson = async () => {
    try {
      const res: any = await sendGet(`/user/lesson/${idLesson}`);
      setLessonsInfo(res.data.data);
      setCourseId(res?.data?.data?.course_id);
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleCompleteLesson = async () => {
    try {
      await sendPost(`/user/lesson/${idLesson}/complete`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowInfoCourse = async () => {
    try {
      const res: any = await sendGet(`/user/course/${courseId}`);
      setInfoCourse(res.data.data);
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleGetListReview = async () => {
    try {
      const res: any = await sendGet(`/user/lesson/${idLesson}/comment`);
      if (res.success === true) {
        setListReview(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleShowInfoLesson();
    handleGetListReview();
  }, []);
  useEffect(() => {
    if (courseId && courseId != null) {
      handleShowInfoCourse();
    }
  }, [courseId]);
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          height: "100%",
          position: "relative",
          // backgroundColor: "#e7f1f5",
        }}
      >
        <View
          style={{
            width: "100%",
            paddingLeft: 40,
            paddingRight: 40,
            paddingBottom: 10,
            // backgroundColor: "#e7f1f5",
            // marginTop: 40,
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 15,
              // top: 7.5,
            }}
            onPress={() => {
              router.back();
            }}
          >
            <Icon as={ChevronLeftCircle} size="xl" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              textTransform: "uppercase",
              marginLeft: 10,
            }}
            numberOfLines={2}
          >
            {lessonInfo?.name}
          </Text>
        </View>
        <View>
          <VideoPlayer
            onSubmit={handleCompleteLesson}
            src={lessonInfo?.video?.url}
          />
        </View>
        <View
          display="flex"
          flexDirection="row"
          alignContent="center"
          justifyContent="space-between"
          paddingHorizontal={20}
          marginVertical={15}
        >
          <View display="flex" alignItems="center" flexDirection="row">
            <Image
              size="md"
              alt="avatar"
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
              source={require("../../assets/images/avatar.jpg")}
            />
            <Text marginLeft={5} style={{ color: "#000" }}>
              {lessonInfo?.course?.author?.name}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 21,
              fontWeight: "bold",
              color: "#000",
              lineHeight: 35 * 0.75,
              paddingTop: 35 - 35 * 0.75,
            }}
          >
            {lessonInfo?.time} Phút
          </Text>
        </View>

        <Text
          paddingHorizontal={20}
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#000",
          }}
        >
          Mô tả
        </Text>
        <Text
          paddingHorizontal={20}
          style={{
            fontSize: 12,
            color: "#000",
          }}
        >
          {lessonInfo?.description}
        </Text>
        <Box
          marginTop={5}
          display="flex"
          flexDirection="row"
          alignItems="center"
          paddingHorizontal={20}
        >
          <TouchableOpacity
            onPress={() => {
              setActiveState(0);
            }}
          >
            <Text
              style={[
                styles.navTitle,
                activeState === 0 ? styles.navActive : null,
              ]}
            >
              Bài Giảng
            </Text>
            <Box style={activeState === 0 ? styles.lineActive : null}></Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveState(1);
            }}
          >
            <Text
              style={[
                styles.navTitle,
                activeState === 1 ? styles.navActive : null,
              ]}
            >
              Đánh giá
            </Text>
            <Box style={activeState === 1 ? styles.lineActive : null}></Box>
          </TouchableOpacity>
        </Box>
        {(activeState == 0 && (
          <Box paddingHorizontal={10} marginTop={10}>
            {infoCourse?.lessions?.map((item: any, index: any) => (
              <LessonItem key={index} data={item} />
            ))}
          </Box>
        )) ||
          (activeState == 1 && (
            <Box paddingHorizontal={20} marginTop={10} marginBottom={20}>
              <Text style={{ marginBottom: 10 }}>Tất cả đánh giá:</Text>
              <Box paddingHorizontal={20}>
                {listReview?.map((item: any, index: any) => (
                  <ReviewItem
                    userName={item?.user_name}
                    content={item?.comment}
                    avatar={item?.avatar}
                    isComment={true}
                    data={item}
                    key={index}
                  />
                ))}
              </Box>
            </Box>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  coverImg: {
    width: "100%",
    height: 250,
    objectFit: "cover",
  },
  navTitle: {
    color: "#333",
    borderRadius: 20,
    paddingBottom: 8,
    marginRight: 20,
  },
  navActive: {
    fontWeight: "bold",
  },
  lineActive: {
    fontWeight: "bold",
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    width: "40%",
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 35 * 0.75,
  },
});
export default index;
