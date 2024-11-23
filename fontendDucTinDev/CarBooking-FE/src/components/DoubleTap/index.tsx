import React, { ReactNode } from "react";
import {
  HandlerStateChangeEvent,
  TapGestureHandlerEventPayload,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";

const DoubleTapComponent = React.memo(
  ({ children, onPress }: { children: ReactNode; onPress: Function }) => {
    const doubleTapRef = React.useRef(null);

    const onDoubleTapEvent = (
      event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
    ) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        if (onPress) onPress();
      }
    };
    return (
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}
      >
        {children}
      </TapGestureHandler>
    );
  }
);

DoubleTapComponent.displayName = "DoubleTapComponent";
export default DoubleTapComponent;
