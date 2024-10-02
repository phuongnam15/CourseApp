import { sendPost } from "@/api/axiosClient";
import { Image, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import FeedComment from "./FeedComment";

const CommentItem = ({ data, postId, onSubmit, isChild }) => {
  const [commentDetail, setCommentDetail] = useState({});
  const [commentState, setCommentState] = useState(false);
  useEffect(() => {
    setCommentDetail(data);
  }, [data]);
  const handleReaction = async () => {
    try {
      const res = await sendPost(
        `/user/post/${postId}/comment/${data?.id}/reaction`,
        {
          type: 1,
        }
      );
      if (res.success === true) {
        setCommentDetail({
          ...commentDetail,
          reacted: !commentDetail?.reacted,
          count_reactions: commentDetail?.reacted
            ? commentDetail?.count_reactions - 1
            : commentDetail?.count_reactions + 1,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
  return (
    <View
      display="flex"
      flexDirection="row"
      gap={5}
      mb={10}
      style={{ width: "100%" }}
    >
      <Image
        source={require("../../../assets/images/avatar.jpg")}
        style={{ width: 30, height: 30, borderRadius: 15 }}
        alt="avatar"
      />
      <View display="flex" style={{ flexGrow: 1 }}>
        <View
          py={5}
          px={10}
          backgroundColor="#f7f7f7"
          style={{ flexGrow: 1 }}
          rounded={10}
        >
          <Text fontWeight="$bold" fontSize="$sm">
            {commentDetail?.user_name}
          </Text>
          <Text fontSize="$xs" mt={3}>
            {commentDetail?.comment}
          </Text>
        </View>
        {!isChild ? (
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={5}
            px={10}
          >
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={5}
            >
              <TouchableOpacity onPress={handleReaction} activeOpacity={1}>
                <Text
                  fontSize={10}
                  ml={5}
                  style={{
                    color: commentDetail?.reacted ? "blue" : "black",
                    fontWeight: commentDetail?.reacted ? "bold" : "normal",
                  }}
                >
                  Thích
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCommentState(!commentState)}
                activeOpacity={1}
              >
                <Text fontSize={10} ml={5}>
                  Bình luận
                </Text>
              </TouchableOpacity>
              <Text fontSize={10}>
                {formatTimestamp(commentDetail?.created_at)}
              </Text>
            </View>
            <View display="flex" flexDirection="row" alignItems="center">
              <Image
                source={require("../../../assets/images/icons/like.png")}
                borderColor="#fff"
                rounded="$full"
                borderWidth={1}
                width={14}
                height={14}
                alt="likeIcons"
                zIndex={1}
              />
              <Text fontSize={12}>{commentDetail?.count_reactions}</Text>
            </View>
          </View>
        ) : (
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={5}
            px={10}
          >
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={5}
            >
              <TouchableOpacity onPress={handleReaction} activeOpacity={1}>
                <Text
                  fontSize={10}
                  ml={5}
                  style={{
                    color: commentDetail?.reacted ? "blue" : "black",
                    fontWeight: commentDetail?.reacted ? "bold" : "normal",
                  }}
                >
                  Thích
                </Text>
              </TouchableOpacity>
              <Text fontSize={10}>
                {formatTimestamp(commentDetail?.created_at)}
              </Text>
            </View>
            <View display="flex" flexDirection="row" alignItems="center">
              <Image
                source={require("../../../assets/images/icons/like.png")}
                borderColor="#fff"
                rounded="$full"
                borderWidth={1}
                width={14}
                height={14}
                alt="likeIcons"
                zIndex={1}
              />
              <Text fontSize={12}>{commentDetail?.count_reactions}</Text>
            </View>
          </View>
        )}

        {commentState === true && (
          <View px={10} mt={10}>
            <FeedComment
              postId={postId}
              data={data}
              isReply={true}
              onSubmit={onSubmit}
            />
          </View>
        )}
        <View mt={10}>
          {commentDetail?.replies?.map((reply) => (
            <CommentItem
              key={reply.id}
              data={reply}
              postId={postId}
              isChild={true}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
