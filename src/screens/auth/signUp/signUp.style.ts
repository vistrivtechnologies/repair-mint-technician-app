import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts, Colors} from '../../../constant';
import {scale} from 'react-native-size-matters';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY[300],
  },
  brandHeader: {
    backgroundColor: Colors.PRIMARY[100],
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: hp(1.5),
    paddingBottom: hp(2),
    alignItems: 'center',
  },
  brandLogo: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
  },
  brandLabel: {
    marginTop: hp(0.8),
    color: Colors.WHITE,
    fontFamily: Fonts.SemiBold,
    fontSize: scale(13),
    letterSpacing: 0.5,
  },
  profileContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: wp(20),
    alignItems: 'center',
    alignSelf: 'center',

  },
  imageProfileContainer: {
    backgroundColor: Colors.SECONDARY[100],
    borderRadius: wp(50),
    alignItems: 'center',
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(5.6),
    alignSelf: 'center',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderIcon: {
    height: hp(6),
    width: wp(12),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 15,
  },
  cancelText: {
    textAlign: 'center',
    color: Colors.STATUS.DANGER,
    marginTop: 15,
    fontSize: 16,
  },
  infoContainer: {
    marginTop: hp(2),
    backgroundColor: Colors.PRIMARY[300],
    paddingBottom: hp(1),
  },
  inputView: {
    padding: hp(2),
    marginTop: hp(1),
  },
  welcomeTitle: {
    textAlign: 'center',
    color: Colors.HEADING,
    fontFamily: Fonts.Bold,
    fontSize: scale(26),
  },
  formCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    paddingTop: hp(1),
    paddingBottom: hp(1),
    shadowColor: Colors.PRIMARY[100],
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 12,
    elevation: 2,
  },
  instructionTitle: {
    textAlign: 'center',
    color: Colors.BODY,
    fontFamily: Fonts.Regular,
    fontSize: scale(14),
  },
  InputMainView: {
    marginTop: hp(3),
    width: wp(90),
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: hp(2),
  },
  textInput: {
    marginBottom: hp(1),
  },
  submitButton: {
    width: wp(90),
  },
  accountTitle: {
    textAlign: 'center',
    marginTop: hp(2),
    fontFamily: Fonts.Medium,
    color: Colors.BODY,
  },
  actionButton: {
    alignSelf: 'center',
    marginBottom: hp(0),
    marginTop: hp(2),
  },
});

export default styles;
