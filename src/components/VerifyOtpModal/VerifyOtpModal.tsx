import React, {useState, useEffect, useContext} from 'react';
import {Modal, View, Text, TouchableOpacity, Platform} from 'react-native';
import {Button, OtpInput, TextView} from '../index';
import {useFormik} from 'formik';
import {otpValidationSchema} from '../../helpers/validations';
import {Colors, Icon} from '../../constant';
import styles from './VerifyOtpModal.styles';
import {API} from '../../api/processApis';
import {usePopup} from '../../context/popupContext';
import {LocalStorage} from '../../helpers/localstorage';
import {UserData, UserDataContext} from '../../context/userDataContext';
import Loader from '../Loader/Loader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackProps} from '../../@types';
import {useNavigation} from '@react-navigation/native';

interface VerifyOTPModalProps {
  visible: boolean;
  onClose: () => void;
  contactInfo: {
    type: 'phone' | 'email';
    value: string;
    countryCode?: string;
    userName?: string;
    email?: string;
    address?: string;
    deviceId: any;
    region?: any;
  };
  isAuthFor?: 'register' | 'login';
  onResendOTP?: () => void;
  region?: any;
}

interface ISigninParams {
  phoneNumber: string;
  countryCode: string;
  email: string;
  userName: string;
  address: string;
  otp: string;
  deviceId: string;
  verificationMethod: string;
  region?: string;
}
type SignUpScreenNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  'SignUp'
>;
const VerifyOTPModal: React.FC<VerifyOTPModalProps> = ({
  visible,
  onClose,
  contactInfo,
  onResendOTP,
  region,
  isAuthFor = 'login',
}) => {
  const navigation = useNavigation<SignUpScreenNavigationType>();
  const [modalVisble, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalTimer, setGlobalTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const {callError} = usePopup();
  const {setUserData} = useContext<UserData>(UserDataContext);
  const {handleSubmit, setFieldValue, values} = useFormik({
    // validationSchema: otpValidationSchema,
    initialValues: {
      otp: '',
      email: '',
      userName: '',
      address: '',
      phoneNumber: '',
      countryCode: '',
      deviceId: '',
      verificationMethod: '',
    },
    onSubmit: async (data: ISigninParams) => {
      setIsLoading(true);
      const registerPayload = {
        email: data?.email,
        countryCode: data?.countryCode,
        phoneNumber: data?.phoneNumber,
        verificationMethod: 'otp',
        isLoginFor: 'technician-app',
        deviceId: 's89auja98suda98sud--as90ajs',
        secretCodeClient: data?.otp,
        role: 'technician',
        userName: data?.userName,
        addressInput: data?.address,
        latitude: region?.latitude,
        longitude: region?.longitude,
      };
      const loginPayload = {
        ...(data?.email
          ? {email: data?.email}
          : {
              countryCode: data?.countryCode,
              phoneNumber: data?.phoneNumber,
            }),
        verificationMethod: data?.email ? 'email' : 'otp',
        isLoginFor: 'technician-app',
        deviceId: 's89auja98suda98sud--as90ajs',
        secretCodeClient: data?.otp,
      };
      if (isAuthFor === 'register') {
        API.register(registerPayload)
          .then(async res => {
            if (res) {
              setIsLoading(false);
              callError({
                message: res?.message,
                isSuccess: true,
                isDelayModal: true,
              });
              setFieldValue('email', '');
              setFieldValue('deviceId', '');
              setFieldValue('phoneNumber', '');
              setFieldValue('countryCode', '');
              setFieldValue('verificationMethod', '');
              setFieldValue('userName', '');
              setFieldValue('address', '');
              navigation.navigate('SignIn');
            }
          })
          .catch(err => {
            setIsLoading(false);
            callError({
              message: err?.error?.message,
              isDelayModal: true,
            });
          });
      } else {
        API.login(loginPayload)
          .then(async res => {
            if (res) {
              setIsLoading(false);
              callError({
                message: res?.message,
                isSuccess: true,
                isDelayModal: true,
              });
              setFieldValue('email', '');
              setFieldValue('deviceId', '');
              setFieldValue('phoneNumber', '');
              setFieldValue('countryCode', '');
              setFieldValue('verificationMethod', '');
              setUserData(res?.data);
              await LocalStorage.save('@login', JSON.stringify(true));
              await LocalStorage.save(
                '@jwt_token',
                JSON.stringify(res?.data?.jwt_token),
              );
            }
          })
          .catch(err => {
            onClose();
            console.log('data: ', data);
            setIsLoading(false);
            setModalVisible(false);
            callError({
              message: err?.error?.message,
              isDelayModal: true,
              delayFor: 100,
            });
          });
      }
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible && globalTimer > 0) {
      timer = setTimeout(() => {
        setGlobalTimer(prev => prev - 1);
      }, 1000);
    } else if (globalTimer === 0) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, globalTimer]);

  const handleResend = () => {
    setGlobalTimer(30);
    setCanResend(false);
    onResendOTP?.();
  };

  const handleOTPComplete = (otp: string) => {
    setFieldValue('otp', otp);
    if (contactInfo?.type === 'phone') {
      if (isAuthFor === 'register') {
        setFieldValue('phoneNumber', contactInfo.value);
        setFieldValue('countryCode', contactInfo.countryCode);
        setFieldValue('deviceId', contactInfo.deviceId);
        setFieldValue('email', contactInfo.email);
        setFieldValue('userName', contactInfo.userName);
        setFieldValue('address', contactInfo.address);
        setFieldValue('verificationMethod', 'otp');
      } else {
        setFieldValue('phoneNumber', contactInfo.value);
        setFieldValue('countryCode', contactInfo.countryCode);
        setFieldValue('deviceId', contactInfo.deviceId);
        setFieldValue('email', '');
        setFieldValue('verificationMethod', 'otp');
      }
    } else if (contactInfo?.type === 'email') {
      setFieldValue('email', contactInfo.value);
      setFieldValue('deviceId', contactInfo.deviceId);
      setFieldValue('phoneNumber', '');
      setFieldValue('countryCode', '');
      setFieldValue('verificationMethod', 'email');
    }
  };

  const renderContactInfo = () => {
    if (contactInfo?.type === 'phone') {
      return `Phone : ${contactInfo.countryCode || ''} ${contactInfo.value}`;
    } else if (contactInfo?.type === 'email') {
      return `Email : ${contactInfo.value}`;
    }
    return '';
  };
  useEffect(() => {
    setModalVisible(visible);
    setTimeout(() => {
      setModalVisible(false);
      setTimeout(() => {
        setModalVisible(visible);
      }, 400);
    }, 400);
  }, [visible]);
  return (
    <>
      {modalVisble && visible && (
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setModalVisible(false);
            onClose();
          }}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  onClose();
                }}
                style={styles.crossBtn}>
                <Icon
                  family="Entypo"
                  name="cross"
                  size={24}
                  color={Colors.BLACK}
                />
              </TouchableOpacity>

              <TextView style={styles.title}>Verify OTP</TextView>
              <TextView style={styles.infoText}>
                Enter the OTP sent to{' '}
                <Text style={styles.contactText}>{renderContactInfo()}</Text>
              </TextView>
              <View>
                <OtpInput
                  numberOfInputs={6}
                  onOTPComplete={handleOTPComplete}
                />
              </View>

              {canResend ? (
                <TouchableOpacity onPress={handleResend}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.timerText}>
                  Resend OTP in {globalTimer}s
                </Text>
              )}
              <Button
                title="Verify"
                onPress={handleSubmit}
                buttonContainerStyle={styles.verifyButton}
              />
            </View>
          </View>
        </Modal>
      )}
      {Platform.OS !== 'ios' && <Loader visible={isLoading} />}
    </>
  );
};

export default VerifyOTPModal;
