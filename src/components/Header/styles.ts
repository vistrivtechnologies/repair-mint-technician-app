import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Fonts } from "../../constant";



const styles = StyleSheet.create({
  headerContainer: {
    marginTop:hp(2)
  },
  headerTitle: {
    fontFamily:Fonts.Bold,
    marginTop:hp(2)
  },
});

export default styles;
