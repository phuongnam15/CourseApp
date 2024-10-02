import {
  Box,
  Button,
  ButtonText,
  CloseCircleIcon,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollView,
  Text,
  Textarea,
  TextareaInput,
  View,
} from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import LessonItem from "@/components/components/LessonItem";
import Course, { CourseItem } from "@/components/components/Course";
import ReviewItem from "@/components/components/ReviewItem";
import { ChevronLeftCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useGlobalState } from "@/context/globalContext";
import { sendGet } from "@/api/axiosClient";
import { Rating } from "react-native-ratings";
const index = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [courseInfo, setCourseInfo] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const handleChangeActiveTab = (i: number) => {
    setActiveTab(i);
  };
  const { globalState } = useGlobalState();
  const handleShowCourse = async () => {
    try {
      const res = await sendGet(`/user/course/${globalState?.id}`);
      setCourseInfo(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (globalState?.id) {
      handleShowCourse();
    }
  }, [globalState]);
  return (
    <ScrollView
      style={{
        height: "100%",
        position: "relative",
        backgroundColor: "#e7f1f5",
      }}
    >
      <View
        style={{
          width: "100%",
          paddingLeft: 40,
          paddingRight: 40,
          paddingBottom: 15,
          backgroundColor: "#e7f1f5",
          marginTop: 60,
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
            top: 7.5,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <Icon as={ChevronLeftCircle} size="xl" />
        </TouchableOpacity>
        <Text
          // fontFamily="Poppins_700Bold"
          style={{
            fontWeight: "bold",
            fontSize: 21,
            textTransform: "uppercase",
            lineHeight: 35 * 0.75,
            paddingTop: 35 - 40 * 0.75,
          }}
          numberOfLines={2}
        >
          {courseInfo?.name}
        </Text>
      </View>
      <Image
        source={{
          uri: courseInfo?.image?.url,
        }}
        alt="coverImg"
        style={styles.coverImg}
      />
      <Box
        style={{
          marginTop: -90,
          overflow: "visible",
          zIndex: 100,
        }}
      >
        <Box
          style={{
            backgroundColor: "#e7f1f5",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            marginTop: 60,
            overflow: "visible",
            zIndex: 10,
            height: 30,
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            style={{
              marginTop: -19,
            }}
          >
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              style={{
                borderRadius: 20,
                backgroundColor: "#fff",
                paddingLeft: 30,
                paddingRight: 30,
                overflow: "visible",
                zIndex: 130,
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onPress={() => {
                router.push("/CourseDetails/");
              }}
            >
              <ButtonText
                style={{
                  color: "#000",
                  fontSize: 21,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  lineHeight: 35 * 0.75,
                }}
              >
                Đăng ký{" "}
              </ButtonText>
            </Button>
          </Box>
        </Box>
        <View
          mt={5}
          display="flex"
          flexDirection="row"
          alignItems="stretch"
          style={{
            backgroundColor: "#fff",
            borderRadius: 30,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleChangeActiveTab(0);
            }}
            style={[styles.tab, activeTab === 0 ? styles.tabActive : null]}
          >
            <Text
              style={activeTab === 0 ? styles.tabActive : null}
              // fontFamily="Poppins_400Regular"
            >
              Bài Giảng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChangeActiveTab(1);
            }}
            style={[styles.tab, activeTab === 1 ? styles.tabActive : null]}
          >
            <Text
              // fontFamily="Poppins_400Regular"
              style={activeTab === 1 ? styles.tabActive : null}
            >
              Giáo viên
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChangeActiveTab(2);
            }}
            style={[styles.tab, activeTab === 2 ? styles.tabActive : null]}
          >
            <Text
              // fontFamily="Poppins_400Regular"
              style={activeTab === 2 ? styles.tabActive : null}
            >
              Liên Quan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChangeActiveTab(3);
            }}
            style={[styles.tab, activeTab === 3 ? styles.tabActive : null]}
          >
            <Text
              style={activeTab === 3 ? styles.tabActive : null}

              // fontFamily="Poppins_400Regular"
            >
              Đánh giá
            </Text>
          </TouchableOpacity>
        </View>
        <View display="flex" justifyContent="center" alignItems="center">
          <View
            style={{
              borderBottomColor: "black",
              width: "50%",
              marginTop: 10,
              marginBottom: 10,
            }}
          />
        </View>
        <View marginHorizontal={10} marginTop={5} marginBottom={15}>
          {(activeTab == 0 && (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                style={{
                  marginHorizontal: 20,
                  marginBottom: 10,
                }}
              >
                <Text
                  // fontFamily="Poppins_600SemiBold"
                  style={styles.lessonTitle}
                >
                  Chi tiết khoá học:
                </Text>
                <Text
                  // fontFamily="Poppins_700Bold"
                  style={styles.lessonCount}
                >
                  {courseInfo?.total_lessions} videos
                </Text>
              </Box>
              <Text
                // fontFamily="Poppins_400Regular"
                paddingHorizontal={20}
                style={{
                  fontSize: 12,
                  color: "#000",
                }}
              >
                {courseInfo?.description}
                <Text
                  // fontFamily="Poppins_400Regular_Italic"
                  style={{
                    color: "#38B6FF",
                    fontSize: 12,
                    fontStyle: "italic",
                  }}
                >
                  Xem Thêm
                </Text>
              </Text>
              {courseInfo?.lessions?.map((item: any) => (
                <LessonItem data={item} key={item?.id} />
              ))}
            </>
          )) ||
            (activeTab == 1 && (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="row"
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    // fontFamily="Poppins_600SemiBold"
                    style={styles.lessonTitle}
                  >
                    Thông tin Giáo viên:
                  </Text>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: courseInfo?.author?.image?.url,
                    }}
                    alt="coverImg"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                    }}
                  />
                  <Text ml={5} fontWeight="bold">
                    {courseInfo?.author?.name}
                  </Text>
                </Box>
                <Text
                  // fontFamily="Poppins_400Regular"
                  paddingHorizontal={20}
                  style={{
                    fontSize: 12,
                    color: "#000",
                  }}
                >
                  {courseInfo?.author?.description}
                </Text>
              </>
            )) ||
            (activeTab == 2 && (
              <Box
                style={{
                  marginTop: 10,
                  rowGap: 20,
                  marginBottom: 20,
                }}
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                alignItems="stretch"
              ></Box>
            )) ||
            (activeTab == 3 && (
              <Box paddingHorizontal={20} marginBottom={20}>
                <Button
                  onPress={() => {
                    setShowModal(true);
                  }}
                  size="md"
                  variant="solid"
                  action="primary"
                  isFocusVisible={false}
                  style={{
                    borderRadius: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 10,
                  }}
                  bg="#56b7ea"
                  $hover-bg="#56b7ea"
                  $active-bg="#56b7ea"
                  $_text-hover-color="$white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ButtonText textTransform="uppercase">
                    Đánh giá của bạn
                  </ButtonText>
                </Button>
                <Text
                  // fontFamily="Poppins_600SemiBold"
                  style={{ marginBottom: 10 }}
                >
                  Tất cả đánh giá:
                </Text>
                <Box paddingHorizontal={20}>
                  <ReviewItem />
                  <ReviewItem />
                  <ReviewItem />
                  <ReviewItem />
                </Box>
              </Box>
            ))}
        </View>
      </Box>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent style={{ backgroundColor: "#fff" }}>
          <ModalHeader>
            <Heading size="lg">Đánh giá về khoá học này</Heading>
            <ModalCloseButton>
              <Icon as={CloseCircleIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody style={{ backgroundColor: "#fff" }}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Image
                size="md"
                alt="avatar"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
                source={require("../../assets/images/avatar.jpg")}
              />
              <Box ml={5}>
                <Text fontWeight="bold">Đatprs</Text>
                <Rating ratingCount={5} imageSize={20} />
              </Box>
            </Box>
            <Textarea
              mt={10}
              size="md"
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}
            >
              <TextareaInput placeholder="Đánh giá của bạn về khoá học này..." />
            </Textarea>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Huỷ bỏ</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              bg="#56b7ea"
              $hover-bg="#56b7ea"
              $active-bg="#56b7ea"
              $_text-hover-color="$white"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Gửi đánh giá</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
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
  },
  navTitleActive: {
    fontWeight: "bold",
    // fontFamily: "Poppins_600SemiBold",
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
  },
  lessonCount: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 35 * 0.75,
    color: "#78C1Ea",
  },
  tab: {
    width: "25%",
    backgroundColor: "transparent",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabActive: {
    backgroundColor: "#56b7ea",
    color: "#fff",
  },
});
export default index;
