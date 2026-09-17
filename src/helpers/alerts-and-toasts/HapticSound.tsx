import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Sound from 'react-native-sound';
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

let soundInstance: Sound | null = null;

export const initializeHapticSound = () => {
  if (!soundInstance) {
    soundInstance = new Sound(
      require('../../assets/audios/hapticSound.mp3'),
      (error) => {
        if (error) {
          console.log('Failed to load haptic sound:', error);
        }
      }
    );
  }
};

export const triggerHapticAndSound = () => {
  ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
  if (soundInstance) {
    soundInstance.play((success) => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });
  }
};
