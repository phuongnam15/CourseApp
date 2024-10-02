import { Box, Image, Text } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

const ReviewItem = ({ data, userName, avatar, content, isComment }) => {
  return (
    <Box>
      <Box style={styles.reviewContainer}>
        <Image
          size="md"
          alt="avatar"
          style={styles.reviewAvatar}
          source={require("../../assets/images/avatar.jpg")}
        />
        <Box
          style={{
            marginTop: 10,
            marginLeft: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            {userName}
          </Text>
          <Text style={{ fontSize: 12, lineHeight: 16 }}>{content}</Text>
        </Box>
      </Box>
      {data?.replies && data?.replies.length > 0 && (
        <>
          {data?.replies?.map((reply) => (
            <Box key={reply.id} style={styles.subReviewContainer}>
              <Image
                size="md"
                alt="avatar"
                style={styles.reviewAvatar}
                source={
                  avatar
                    ? {
                        uri: avatar,
                      }
                    : require("../../assets/images/avatar.jpg")
                }
              />
              <Box
                style={{
                  marginTop: 10,
                  marginLeft: 15,
                }}
              >
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  {isComment === true ? reply?.user_name : "Admin"}
                </Text>
                <Text style={{ fontSize: 12, lineHeight: 16 }}>
                  {isComment === true ? reply?.comment : reply?.content}
                </Text>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};
const styles = StyleSheet.create({
  reviewContainer: {
    position: "relative",
    width: "100%",
    // minHeight: 100,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f1f5f9",
    marginTop: 10,
  },
  subReviewContainer: {
    position: "relative",
    width: "100%",
    // minHeight: 100,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f1f5f9",
    marginLeft: 20,
    marginTop: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    position: "absolute",
    left: -20,
    top: 10,
  },
});
export default ReviewItem;
