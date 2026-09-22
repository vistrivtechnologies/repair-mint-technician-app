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
  profileContainer: {
    backgroundColor: Colors.PRIMARY[100],
    borderRadius: wp(20),
    alignItems: 'center',
    alignSelf: 'center',

  },
  imageProfileContainer: {
    backgroundColor: Colors.PRIMARY[700],
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
    backgroundColor: '#fff',
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
    color: 'red',
    marginTop: 15,
    fontSize: 16,
  },
  infoContainer: {
    marginTop: hp(2),
    backgroundColor: Colors.PRIMARY[300],
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
