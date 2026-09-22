import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts, Colors} from '../../../constant';
import {moderateScale, scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY[300],
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: hp(4),
    paddingBottom: 40,
    paddingHorizontal: wp(6),
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Fonts.Bold,
    fontSize: scale(28),
    color: Colors.HEADING,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.BODY,
    fontFamily: Fonts.Regular,
    fontSize: scale(13),
  },
  inputContainer: {
    marginBottom: hp(2.2),
  },
  input: {
    flex: 1,
    height: 50,
  },
  inputIcon: {
    color: '#999',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberText: {
    marginLeft: 5,
    flex: 1,
  },
  forgotPassword: {
    marginLeft: 'auto',
  },
  forgotText: {
    color: Colors.SECONDARY[100],
    fontWeight: '500',
    fontFamily: Fonts.SemiBold,
  },
  loginButton: {
    backgroundColor: '#5F4BC7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: hp(2),
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  signupText: {
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(14),
    color: Colors.BODY,
  },
  signupLink: {
    color: Colors.SECONDARY[100],
    fontFamily: Fonts.SemiBold,
    marginLeft: wp(1),
    fontSize: scale(12),
    textDecorationLine: 'underline',
  },
  dividerContainerInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.3),
    marginBottom: hp(1.2),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(5),
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.BORDERCOLOR,
  },
  orText: {
    marginHorizontal: 10,
    color: Colors.BODY,
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(14),
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  iconCircle: {
    backgroundColor: Colors.PRIMARY[600],
    borderRadius: 50,
    padding: 12,
    marginHorizontal: 10,
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  informationView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  toggleText: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(14),
    color: Colors.BODY,
    marginHorizontal: wp(2),
  },
  toggleSwitch: {
    transform: Platform.OS === 'ios' ? [{scaleX: 0.8}, {scaleY: 0.8}] : [],
  },
});
export default styles;
