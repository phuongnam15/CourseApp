import { Image, Text, View } from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { G, Path, Svg } from "react-native-svg";
import FeedComment from "./FeedComment";
import FbImage from "../FbImage/FbImage";
import FeedDetail from "../ActionSheet/FeedDetail";
import { sendPost } from "@/api/axiosClient";

const FeedsItem = ({ item }) => {
  const [feedDetail, setFeedDetail] = useState({});
  const [detailModal, setDetailModal] = useState(false);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  useEffect(() => {
    setFeedDetail(item);
  }, [item]);
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  function formatTimestamp(timestamp) {
    const currentDate = new Date();
    const date = new Date(timestamp);

    if (currentDate.toDateString() === date.toDateString()) {
      // Trường hợp trong ngày
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else if (
      currentDate.getFullYear().toLocaleString() ==
      date.getFullYear().toLocaleString()
    ) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${day.toString().padStart(2, "0")} / ${month
        .toString()
        .padStart(2, "0")}`;
    } else {
      // Trường hợp ngoài ngày
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${day.toString().padStart(2, "0")} / ${month
        .toString()
        .padStart(2, "0")}`;
    }
  }
  const handleReaction = async () => {
    try {
      const res = await sendPost(`/user/post/${item?.id}/reaction-post`, {
        type: 1,
      });
      if (res.success === true) {
        setFeedDetail({
          ...feedDetail,
          reacted: !feedDetail?.reacted,
          total_reactions: feedDetail?.total_reactions
            ? feedDetail?.total_reactions - 1
            : feedDetail?.total_reactions + 1,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.feedContainer}>
      <View
        px={10}
        display="flex"
        flexDirection="row"
        alignItems="stretch"
        gap={10}
      >
        <View style={styles.avatarContainer}>
          <Image
            style={styles.groupAvatar}
            source={{ uri: feedDetail?.group?.avatar }}
            alt="groupimg"
          />
          <Image
            style={styles.avatar}
            source={require("../../../assets/images/orange.jpg")}
            alt="avatar"
          />
        </View>
        <View
          display="flex"
          justifyContent="space-between"
          style={{
            width: "80%",
          }}
        >
          <Text
            fontSize="$xs"
            fontWeight="$bold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {feedDetail?.group?.name}
          </Text>
          <Text
            style={{
              fontSize: 10,
            }}
            numberOfLines={1}
            fontWeight="$bold"
            ellipsizeMode="tail"
            color="#94a3b8"
          >
            {feedDetail?.user?.name} - {formatTimestamp(feedDetail?.created_at)}
          </Text>
        </View>
      </View>
      <View mt={5}>
        <Text
          px={10}
          fontSize="$xs"
          onTextLayout={onTextLayout}
          lineHeight={16}
          numberOfLines={textShown ? undefined : 4}
        >
          {feedDetail?.content}
        </Text>

        {lengthMore ? (
          <Text
            px={10}
            fontSize="$xs"
            onPress={toggleNumberOfLines}
            style={{ lineHeight: 21, color: "#94a3b8", textAlign: "right" }}
          >
            {textShown ? "Thu gọn..." : "Xem thêm..."}
          </Text>
        ) : null}
        {feedDetail?.images && feedDetail?.images.length > 0 && (
          <FbImage image={feedDetail?.images?.map((item) => feedDetail?.url)} />
        )}
        <View
          px={10}
          mt={5}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <View display="flex" flexDirection="row" alignItems="center">
            <Image
              source={require("../../../assets/images/icons/like.png")}
              borderColor="#fff"
              rounded="$full"
              borderWidth={1}
              width={15}
              height={15}
              alt="likeIcons"
              zIndex={1}
            />
            <Image
              source={require("../../../assets/images/icons/love.png")}
              rounded="$full"
              width={15}
              height={15}
              alt="likeIcons"
              style={{
                marginLeft: -5,
              }}
            />
            <Text fontSize="$xs" ml={5}>
              {feedDetail?.total_reactions}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setDetailModal(true);
            }}
          >
            <View>
              <Text color="#94a3b8" fontSize="$xs" fontWeight="$bold">
                {feedDetail?.total_comments} bình luận
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          px={10}
          mt={10}
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={30}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              handleReaction();
            }}
          >
            <View display="flex" flexDirection="row" alignItems="center">
              {feedDetail?.reacted ? (
                <Svg
                  fill="#3b82f6"
                  id="Layer_2"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  height={20}
                  width={20}
                >
                  <G>
                    <Path d="m16.78003.5h-.28003c-1.15997 0-2.25.53998-2.90997 1.44l-5.30005 6.96997c-.32001-.14001-.66998-.21997-1.03998-.21997h-4.07001c-1.41998 0-2.57001 1.14996-2.57001 2.57001v15.94c0 1.41998 1.15002 2.56995 2.57001 2.56995h4.07001c.87 0 1.63-.42999 2.09998-1.07996l3.13 1.56c1.65002.82001 3.5 1.25 5.35004 1.25h6.60998c2.34003 0 4.31-1.67004 4.66998-3.98004l2.22003-13.75995c.21997-1.37-.16003-2.77002-1.06-3.82001-.90001-1.07-2.22002-1.67999-3.61004-1.67999h-5.14996v-3.03003c0-2.60998-2.13001-4.72998-4.72998-4.72998zm-9.95001 26.26996h-3.22003v-15.07996h3.22003z" />
                  </G>
                </Svg>
              ) : (
                <Svg
                  id="Layer_2"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  height={20}
                  width={20}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path d="m30.26881 9.93506c-.90088-1.06152-2.21582-1.67041-3.60742-1.67041h-5.15527v-3.03369c0-2.60889-2.12207-4.73096-4.73047-4.73096h-.28027c-1.15088 0-2.2417.54492-2.90625 1.44238l-5.30195 6.96588c-.31732-.14001-.66638-.22076-1.03497-.22076h-4.06739c-1.4209 0-2.57715 1.15625-2.57715 2.57715v15.93262c0 1.4209 1.15625 2.57666 2.57715 2.57666h4.06738c.86401 0 1.62567-.43085 2.09338-1.08533l3.13367 1.55652c1.65382.8208 3.5044 1.25488 5.35157 1.25488h6.6123c2.33984 0 4.30371-1.67334 4.66846-3.9751l2.21777-13.76904c.22559-1.36865-.16113-2.76172-1.06054-3.8208zm-23.43994 16.83887h-3.22119v-15.08643h3.22119zm21.53955-13.50049-2.21924 13.77783c-.13086.82568-.86426 1.44873-1.70606 1.44873h-6.6123c-1.38672 0-2.77588-.32568-4.01758-.94189l-3.98438-1.97864v-13.74243l6.15967-8.09387c.1128-.15235.30225-.24317.50684-.24317h.28027c.9541 0 1.73047.77637 1.73047 1.73096v4.53369c0 .82861.67139 1.5 1.5 1.5h6.65527c.5166 0 .98584.21729 1.32031.61133.33302.39257.47071.8872.38673 1.39746z" />
                </Svg>
              )}
              <Text fontSize="$xs" ml={5}>
                Thích
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setDetailModal(true);
            }}
          >
            <View display="flex" flexDirection="row" alignItems="center">
              <Svg
                id="Layer_1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                height={20}
                width={20}
              >
                <Path d="m478.841 10.706h-445.681a33.2 33.2 0 0 0 -33.16 33.16v314.6a33.2 33.2 0 0 0 33.16 33.159h74.647l52.093 101.002a16 16 0 0 0 13.674 8.657c.183.007.366.01.548.01a16 16 0 0 0 13.678-7.714l61.723-101.959h229.318a33.2 33.2 0 0 0 33.159-33.159v-314.596a33.2 33.2 0 0 0 -33.159-33.16zm1.159 347.756a1.221 1.221 0 0 1 -1.159 1.159h-238.332a16 16 0 0 0 -13.688 7.714l-51.589 85.218-43.454-84.265a16 16 0 0 0 -14.22-8.667h-84.398a1.206 1.206 0 0 1 -1.16-1.159v-314.596a1.206 1.206 0 0 1 1.16-1.16h445.681a1.221 1.221 0 0 1 1.159 1.16zm-48.852-157.3a16 16 0 0 1 -16 16h-318.296a16 16 0 1 1 0-32h318.3a16 16 0 0 1 15.996 16.002zm0 74.182a16 16 0 0 1 -16 16h-318.296a16 16 0 1 1 0-32h318.3a16 16 0 0 1 15.996 16.002zm0-148.365a16 16 0 0 1 -16 16h-318.296a16 16 0 0 1 0-32h318.3a16 16 0 0 1 15.996 16.002z" />
              </Svg>
              <Text fontSize="$xs" ml={5}>
                Bình luận
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View mt={10} px={10}>
          <FeedComment data={item} />
        </View>
      </View>
      <FeedDetail
        data={item}
        showModal={detailModal}
        handleClose={() => {
          setDetailModal(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  feedContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 3,
  },
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
export default FeedsItem;
