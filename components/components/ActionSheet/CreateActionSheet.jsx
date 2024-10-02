import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
  Icon,
} from "@gluestack-ui/themed";
import { StickyNote, Users } from "lucide-react-native";
import React from "react";
const CreateActionSheet = ({ showActionsheet, handleClose, handleCreateGroup, handleCreatePost }) => {
  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$72" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={handleCreateGroup}>
          <ActionsheetIcon>
            <Icon as={Users} />
          </ActionsheetIcon>
          <ActionsheetItemText>Tạo nhóm mới</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleCreatePost}>
          <ActionsheetIcon>
            <Icon as={StickyNote} />
          </ActionsheetIcon>
          <ActionsheetItemText>Tạo bài viết mới</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default CreateActionSheet;
