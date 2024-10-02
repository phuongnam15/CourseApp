import { sendGet, sendPost } from "@/api/axiosClient";
import { formatCurrency } from "@/components/components/Course";
import Tab1 from "@/components/components/CourseInfo/Tab1";
import Tab2 from "@/components/components/CourseInfo/Tab2";
import Notification from "@/components/components/Notification";
import Transition from "@/components/components/Transition";
import { useGlobalState } from "@/context/globalContext";
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
  Spinner,
  Text,
  Textarea,
  TextareaInput,
  View,
  useToast,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ChevronLeftCircle } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [courseInfo, setCourseInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listReview, setListReview] = useState([]);
  const [rating, setRating] = useState<any>(5);
  const [value, setValue] = useState("");
  const toast = useToast();
  const { isLogin, setCartList, myCourseList } = useGlobalState();
  // Hàm xử lý sự kiện khi nội dung của Textarea thay đổi
  const handleChange = (event: any) => {
    setValue(event);
  };
  const ref = useRef(null);
  const handleChangeActiveTab = (i: number) => {
    setActiveTab(i);
  };
  const { globalState } = useGlobalState();
  const handlePostReview = async () => {
    try {
      const res: any = await sendPost(
        `/user/course/${globalState?.id}/review`,
        {
          content: value,
          star: rating,
        }
      );
      if (res.success === true) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Notification
                id={toastId}
                description="Cám ơn bạn đã đánh giá khoá học này"
                color="success"
                title="Thành công"
              />
            );
          },
        });
        setShowModal(false);
      }
    } catch (err: any) {
      console.log(err);
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
  };
  const handleGetListReview = async () => {
    try {
      const res = await sendGet(`/user/course/${globalState?.id}/list-review`);
      setListReview(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowCourse = async () => {
    try {
      const res = await sendGet(`/user/course/${globalState?.id}`);
      setCourseInfo(res?.data?.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowRating = async (rating: Number) => {
    setRating(rating);
  };

  useEffect(() => {
    if (globalState?.id) {
      handleGetListReview();
      handleShowCourse();
    }
  }, [globalState]);
  const handleAddCart = async () => {
    try {
      if (isLogin) {
        const res: any = await sendPost(`/user/cart`, {
          course_id: globalState.id,
        });
        if (res.success === true) {
          setCartList((prevState: any) => [...prevState, res.data.data]);
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Notification
                  id={toastId}
                  description="Thêm vào giỏ hàng thành công"
                  color="success"
                  title="Thành công"
                />
              );
            },
          });
          router.push("/Checkout/");
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
    } catch (err: any) {
      if (err.response.status === 409) {
        router.push("/Checkout/");
      } else {
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
    <SafeAreaView style={{paddingHorizontal: 20}}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          height: "100%",
          position: "relative",
          // backgroundColor: "#e7f1f5",
        }}
      >
        {isLoading === false ? (
          <>
            <Transition>
              <View
                style={{
                  width: "100%",
                  paddingRight: 20,
                  paddingBottom: 10,
                  // backgroundColor: "#e7f1f5",
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                  }}
                >
                  <Icon as={ChevronLeftCircle} size="lg" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    textTransform: "uppercase",
                    marginLeft: 10,
                  }}
                  numberOfLines={1}
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
                  overflow: "visible",
                  zIndex: 100,
                }}
              >
                <View
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="row"
                  mt={20}
                  mb={10}
                >
                  <View
                    display="flex"
                    flexDirection="column"
                    gap={10}
                    style={{
                      maxWidth: 220,
                    }}
                  >
                    <View
                      display="flex"
                      alignItems="stretch"
                      flexDirection="row"
                      gap={5}
                    >
                      <Image
                        source={{
                          uri: courseInfo?.author?.image?.url,
                        }}
                        alt="coverImg"
                        style={styles.avaImg}
                      />
                      <View display="flex">
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            textTransform: "uppercase",
                          }}
                          numberOfLines={2}
                        >
                          {courseInfo?.name}
                        </Text>
                        <Text fontSize="$xs" color="#94a3b8">
                          {courseInfo?.author?.name}
                        </Text>
                        <Text
                          fontSize="$xs"
                          color="#94a3b8"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {courseInfo?.lessions?.length} bài học -{" "}
                          {courseInfo?.categories
                            ?.map((item: any) => item.name)
                            .join(" - ")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Text mb={5} fontSize="$sm">
                  {courseInfo?.description}
                </Text>
                <Button
                  size="md"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  mb={10}
                  style={{
                    width: "100%",
                    borderRadius: 20,
                    overflow: "visible",
                    zIndex: 130,
                  }}
                  bg="#61bc84"
                  $hover-bg="#61bc84"
                  $active-bg="#61bc84"
                  $_text-hover-color="$white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onPress={() => {
                    // router.push("/CourseDetails/");
                    if (
                      !myCourseList
                        .map((item: any) => item.course.id)
                        .includes(globalState.id)
                    ) {
                      handleAddCart();
                    }
                  }}
                >
                  <ButtonText
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      lineHeight: 35 * 0.75,
                    }}
                  >
                    {myCourseList
                      .map((item: any) => item.course.id)
                      .includes(globalState.id)
                      ? "Đã mua"
                      : `Đăng ký - ${formatCurrency(
                          courseInfo?.is_promote === 1
                            ? Number(courseInfo?.promote_price)
                            : Number(courseInfo?.price)
                        )}`}
                  </ButtonText>
                </Button>
                <View
                  mt={5}
                  display="flex"
                  flexDirection="row"
                  alignItems="flex-end"
                  gap={15}
                  borderBottomWidth={1}
                  borderBottomColor="#6c757d"
                  pb={3}
                  // alignItems="stretch"
                  // style={{
                  //   backgroundColor: "#fff",
                  //   borderRadius: 30,
                  //   marginHorizontal: 10,
                  // }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handleChangeActiveTab(0);
                    }}
                  >
                    <Text style={[activeTab === 0 ? styles.textActive : null]}>
                      Bài Giảng
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleChangeActiveTab(3);
                    }}
                  >
                    <Text style={[activeTab === 3 ? styles.textActive : null]}>
                      Đánh giá
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <View
                    style={{
                      borderBottomColor: "black",
                      width: "50%",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  />
                </View>
                <View marginTop={5} marginBottom={15}>
                  {(activeTab == 0 && <Tab1 courseInfo={courseInfo} />) ||
                    (activeTab == 3 && (
                      <Tab2
                        listReview={listReview}
                        onSubmit={() => {
                          if (isLogin) {
                            setShowModal(true);
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
                      />
                    ))}
                </View>
              </Box>
            </Transition>
          </>
        ) : (
          <>
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
          </>
        )}
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
                  <Rating
                    onFinishRating={handleShowRating}
                    ratingCount={rating}
                    imageSize={20}
                  />
                </Box>
              </Box>
              <Textarea
                mt={10}
                size="md"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}
              >
                <TextareaInput
                  // onChangeText={(e: any) => handleChange(e)}
                  placeholder="Đánh giá của bạn về khoá học này..."
                />
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
                bg="#61bc84"
                $hover-bg="#61bc84"
                $active-bg="#61bc84"
                $_text-hover-color="$white"
                onPress={() => {
                  handlePostReview();
                }}
              >
                <ButtonText>Gửi đánh giá</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  coverImg: {
    width: "100%",
    // height: 250,
    height: 150,
    objectFit: "cover",
    borderRadius: 20,
  },
  avaImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  navTitle: {
    color: "#333",
    borderRadius: 20,
  },
  navTitleActive: {
    fontWeight: "bold",
    // fontFamily: "_600SemiBold",
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
  },
  lessonCount: {
    fontSize: 14,
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
    backgroundColor: "#61bc84",
    color: "#fff",
  },
  textActive: {
    color: "#61bc84",
    fontWeight: "bold",
    // fontSize: 18,
  },
});
export default index;
