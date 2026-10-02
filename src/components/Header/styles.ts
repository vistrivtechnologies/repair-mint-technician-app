import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors, Fonts } from "../../constant";



const styles = StyleSheet.create({
  headerContainer: {
    marginTop:hp(2),
    paddingHorizontal: wp(5),
  },
  headerTitle: {
    fontFamily:Fonts.Bold,
    marginTop:hp(2),
    color: Colors.HEADING,
    fontSize: 20,
  },
});

export default styles;
