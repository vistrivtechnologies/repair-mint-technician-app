// import {StyleSheet} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {Fonts, Colors} from '../../../constant';
// import {scale} from 'react-native-size-matters';
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   profileContainer: {
//     backgroundColor: Colors.PRIMARY[100],
//     borderRadius: wp(20),
//     alignItems: 'center',
//     alignSelf: 'center',
//
//   },
//   imageProfileContainer: {
//     backgroundColor: Colors.PRIMARY[100],
//     borderRadius: wp(50),
//     alignItems: 'center',
//     paddingVertical: hp(2.5),
//     paddingHorizontal: wp(5.6),
//     alignSelf: 'center',
//   },
//   profile: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   placeholderIcon: {
//     height: hp(6),
//     width: wp(12),
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   modalTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   optionText: {
//     marginLeft: 10,
//     fontSize: 15,
//   },
//   cancelText: {
//     textAlign: 'center',
//     color: 'red',
//     marginTop: 15,
//     fontSize: 16,
//   },
//   infoContainer: {
//     marginTop: hp(2),
//     backgroundColor: '#fff',
//   },
//   inputView: {
//     padding: hp(2),
//     marginTop: hp(1),
//   },
//   welcomeTitle: {
//     textAlign: 'center',
//     color: Colors.HEADING,
//     fontFamily: Fonts.Medium,
//     fontSize: scale(18),
//   },
//   instructionTitle: {
//     textAlign: 'center',
//     color: Colors.BODY,
//     fontFamily: Fonts.Medium,
//     fontSize: scale(14),
//   },
//   InputMainView: {
//     marginTop: hp(3),
//     width: wp(90),
//     alignSelf: 'center',
//   },
//   inputContainer: {
//     marginBottom: hp(2),
//   },
//   textInput: {
//     marginBottom: hp(1),
//   },
//   submitButton: {
//     width: wp(90),
//   },
//   accountTitle: {
//     textAlign: 'center',
//     marginTop: hp(2),
//     fontFamily: Fonts.Medium,
//     color: Colors.BODY,
//   },
//   actionButton: {
//     alignSelf: 'center',
//     marginBottom: hp(0),
//     marginTop: hp(2),
//   },
// });
//
// export default styles;




















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
    backgroundColor: '#FFFFFF',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(4),
  },

  infoContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: hp(2),
  },

  /* =========================
     PROFILE IMAGE
  ========================= */

  profileContainer: {
    width: wp(23),
    height: wp(23),
    backgroundColor: Colors.PRIMARY[100],
    borderRadius: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  imageProfileContainer: {
    width: wp(23),
    height: wp(23),
    backgroundColor: Colors.PRIMARY[100],
    borderRadius: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  profile: {
    width: '100%',
    height: '100%',
    borderRadius: wp(12),
    resizeMode: 'cover',
  },

  placeholderIcon: {
    width: wp(11),
    height: wp(11),
    resizeMode: 'contain',
  },

  /* =========================
     HEADER
  ========================= */

  welcomeContainer: {
    marginTop: hp(2),
    marginBottom: hp(2.8),
    paddingHorizontal: wp(6),
    alignItems: 'center',
  },

  welcomeTitle: {
    textAlign: 'center',
    color: Colors.HEADING,
    fontFamily: Fonts.SemiBold,
    fontSize: scale(23),
    lineHeight: scale(29),
    letterSpacing: 0.1,
  },

  instructionTitle: {
    textAlign: 'center',
    color: Colors.BODY,
    fontFamily: Fonts.Medium,
    fontSize: scale(13.5),
    lineHeight: scale(20),
    marginTop: hp(0.7),
    opacity: 0.75,
  },

  /* =========================
     FORM
  ========================= */

  InputMainView: {
    width: wp(88),
    alignSelf: 'center',
  },

  inputContainer: {
    width: '100%',
    marginBottom: hp(1.8),
  },

  documentContainer: {
    width: '100%',
    marginTop: hp(0.3),
    marginBottom: hp(1.8),
  },

  termsContainer: {
    width: '100%',
    marginTop: hp(0.8),
    marginBottom: hp(0.8),
  },

  textInput: {
    marginBottom: hp(1),
  },

  /* =========================
     ACTION BUTTON
  ========================= */

  actionButton: {
    width: '100%',
    alignItems: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
  },

  signUpButton: {
    width: '100%',
    minHeight: hp(6.2),
    borderRadius: 12,
  },

  submitButton: {
    width: '100%',
  },

  /* =========================
     SIGN IN LINK
  ========================= */

  accountTitle: {
    textAlign: 'center',
    marginTop: hp(2),
    fontFamily: Fonts.Medium,
    color: Colors.BODY,
    fontSize: scale(13),
    lineHeight: scale(19),
  },

  signInText: {
    color: Colors.PRIMARY[100],
    fontFamily: Fonts.SemiBold,
    fontSize: scale(13),
    textDecorationLine: 'underline',
  },

  /* =========================
     PROFILE IMAGE MODAL
  ========================= */

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.48)',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp(6),
    paddingTop: hp(2.5),
    paddingBottom: hp(3),
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  modalTitle: {
    fontSize: scale(17),
    color: Colors.HEADING,
    fontFamily: Fonts.SemiBold,
    marginBottom: hp(1.5),
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  optionText: {
    marginLeft: wp(3),
    fontSize: scale(15),
    color: Colors.BODY,
    fontFamily: Fonts.Medium,
  },

  cancelText: {
    textAlign: 'center',
    color: '#D9534F',
    marginTop: hp(2),
    fontSize: scale(15),
    fontFamily: Fonts.SemiBold,
  },
});

export default styles;