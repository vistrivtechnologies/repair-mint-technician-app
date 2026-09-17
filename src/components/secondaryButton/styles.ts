import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignSelf: 'center',
  },

  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.PRIMARY[400],
    marginLeft: hp(1.5),
    marginRight: hp(1),
    fontFamily: Fonts.Regular,
    fontSize: moderateScale(15),
  },

  touchableOpacityStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: wp(100),
    height: hp(3.5),
    borderRadius: 10
  },
});

export default styles;
