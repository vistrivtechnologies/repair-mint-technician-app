import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../constant";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create( {
  buttonContainer: {
    borderRadius: 8,
    height: hp(6.8),
    width: wp( 90 ),
    flexDirection: 'row',
    alignSelf: "center",
    backgroundColor: Colors.PRIMARY[100],
  },


  buttonView: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: moderateScale( 14 ),
    marginLeft: hp( 1 ),
    marginRight: hp( 1 ),
    fontFamily: Fonts.Bold,
    lineHeight: 24,
  },

  touchableOpacityStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    width: "100%",
  },
} );

export default styles;
