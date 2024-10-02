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
import { LogIn, LogOut } from "lucide-react-native";
import React from "react";
const JoinActionSheet = ({ showActionsheet, handleClose, isLogin, handleSubmit }) => {
  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$72" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {isLogin ? (
          <ActionsheetItem onPress={handleSubmit}>
            <ActionsheetIcon>
              <Icon as={LogOut} />
            </ActionsheetIcon>
            <ActionsheetItemText>Rời nhóm</ActionsheetItemText>
          </ActionsheetItem>
        ) : (
          <ActionsheetItem onPress={handleSubmit}>
            <ActionsheetIcon>
              <Icon as={LogIn} />
            </ActionsheetIcon>
            <ActionsheetItemText>Tham gia nhóm</ActionsheetItemText>
          </ActionsheetItem>
        )}
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default JoinActionSheet;
