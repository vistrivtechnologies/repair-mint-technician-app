import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

// Trigger haptic feedback

export const AradaHaptics = {
  triggerLight: () => ReactNativeHapticFeedback.trigger('impactLight', options),
  triggerMedium: () => ReactNativeHapticFeedback.trigger('impactMedium', options),
  triggerHeavy: () => ReactNativeHapticFeedback.trigger('impactMedium', options),
  triggerRigid: () => ReactNativeHapticFeedback.trigger('rigid', options),
  triggerSoft: () => ReactNativeHapticFeedback.trigger('soft', options),
  triggerError: () => ReactNativeHapticFeedback.trigger('notificationError', options),
  triggerWarning: () => ReactNativeHapticFeedback.trigger('notificationWarning', options),
  triggerSuccess: () => ReactNativeHapticFeedback.trigger('notificationSuccess', options),
};
