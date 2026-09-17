import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../constant/dimentions';
import {Colors, Fonts} from '../../constant';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const styles = StyleSheet.create({
  labelText: {
    color: Colors.PRIMARY[200],
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    marginBottom: moderateVerticalScale(7),
    marginLeft: wp(0.5),
    fontWeight: '500',
  },

  input: {
    color: Colors.SECONDARY[400],
    fontFamily: Fonts.Regular,
    paddingLeft: wp(3),
    fontSize: moderateScale(13),
  },
  label: {
    color: Colors.SECONDARY[400],
  },
  error: {
    marginTop: 4,
    marginLeft: wp(1),
    color: Colors.ERROR[100],
    maxWidth: wp(90),
  },
  // secureBtn: {
  //     position: 'absolute',
  //     right: 15,
  //     top: 20,
  // },
  eyeStyle: {
    height: wp(4),
    width: wp(4),
    resizeMode: 'contain',
  },
});

export default styles;
