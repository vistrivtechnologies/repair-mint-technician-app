import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, Fonts} from '../../constant';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {usePopup} from '../../context/popupContext';
import {moderateScale} from 'react-native-size-matters';

interface PopupMessageModalProps {
  visible: boolean;
  title?: string;
}

const PopupMessageModal = ({
  visible,
  title = 'Alert',
}: PopupMessageModalProps) => {
  const {
    errorMessage,
    isSuccess,
    isPopAlert,
    onClickPrimaryBtn,
    clearError,
    isDelayModal,
    delayFor
  } = usePopup();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const [modalVisble, setModalVisible] = useState<boolean>(false);

  const animatedStyle = {
    opacity,
    transform: [{scale}],
  };

  const backdropStyle = {
    opacity: opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.4],
    }),
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.back(1)),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        clearError();
        setModalVisible(false);
      });
    }
  }, [visible]);

  const dismissModal = () => {
    setModalVisible(false);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      clearError();
      setModalVisible(false);
    });
  };
  useEffect(() => {
    if (isDelayModal) {
      setTimeout(() => {
        setModalVisible(false);
        setTimeout(() => {
          setModalVisible(visible);
        }, delayFor);
      }, delayFor);
    }
  }, [visible, isDelayModal]);
  if (!modalVisble) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        clearError();
        dismissModal();
      }}>
      <Animated.View style={[styles.backdrop, backdropStyle]} />

      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          {/* Header with title and close button */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.title}>{isSuccess ? 'Success' : title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={dismissModal}>
                <Icon name="close" size={24} color={Colors.GREY} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Message content */}
          <View style={styles.content}>
            {!isSuccess ? (
              <Icon
                name="error-outline"
                size={hp(6)}
                color={'#d32f2f'}
                style={styles.icon}
              />
            ) : (
              <AntDesign
                name="checkcircleo"
                size={hp(6)}
                style={styles.icon}
                color="green"
              />
            )}
            <View style={{maxHeight: hp(50), alignSelf: 'stretch'}}>
              <ScrollView contentContainerStyle={{padding: 10}}>
                <Text style={styles.message}>{errorMessage}</Text>
              </ScrollView>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {isPopAlert && (
              <TouchableOpacity
                style={[styles.button, {width: '35%'}]}
                onPress={() => {
                  dismissModal();
                }}>
                <Text style={styles.primaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, {width: isPopAlert ? '35%' : '100%'}]}
              onPress={() => {
                onClickPrimaryBtn();
                dismissModal();
                console.log("shak");
                
              }}>
              <Text style={styles.primaryButtonText}>
                {isPopAlert ? 'Yes' : isSuccess ? 'Ok' : 'Try Again'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    maxWidth: moderateScale(350),
    backgroundColor: Colors.WHITE,
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    paddingVertical: hp(2),
    paddingHorizontal: hp(2.5),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    padding: moderateScale(4),
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.Bold,
    color: Colors.BLACK,
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.LIGHT_GREY,
    marginHorizontal: hp(1),
  },
  content: {
    paddingVertical: hp(2),
    paddingHorizontal: hp(3),
    alignItems: 'center',
  },
  icon: {
    marginBottom: hp(2),
  },
  message: {
    fontSize: moderateScale(16),
    color: Colors.GREY,
    lineHeight: moderateScale(22),
    fontFamily: Fonts.Medium,
    textAlign: 'center',
    marginTop: hp(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: hp(2),
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GREY,
  },
  button: {
    paddingVertical: hp(1.5),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(6),
    marginLeft: moderateScale(10),
    minWidth: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY[100],
    height: hp(6),
  },
  primaryButtonText: {
    color: Colors.WHITE,
    fontSize: moderateScale(15),
    fontFamily: Fonts.Medium,
  },
});

export default PopupMessageModal;
