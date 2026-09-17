import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {Colors, Fonts} from '../../constant';

const styles = StyleSheet.create({
  uploadButton: {
    width: wp(90),
    borderColor: Colors.BLACK,
    paddingVertical: hp(0.5),
    fontFamily: Fonts.Medium,
    height: wp(14),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
  },
  labelText: {
    color: Colors.PRIMARY[200],
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    marginBottom: moderateVerticalScale(7),
    marginLeft: wp(0.5),
    alignSelf: 'flex-start',
  },
  supportedFileContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportedFileText: {
    fontSize: 14,
    color: '#64748B', // slate-500
    fontFamily: Fonts.Medium,
    lineHeight: 20,
  },
  requiredIndicator: {
    color: '#EF4444', // red-500
    fontFamily: Fonts.Bold,
    marginRight: 4,
  },
  fileFormat: {
    fontFamily: Fonts.Bold,
    color: '#1E293B', // slate-800
    borderRadius: moderateScale(4),
    overflow: 'hidden',
    fontSize: moderateScale(14),
  },
});

export default styles;
