import { StyleSheet } from "react-native";
import { Colors, Fonts, } from "../../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf:'center',
        borderRadius: 8,
        paddingHorizontal: wp(2),
        marginVertical: hp(3),
        height: hp(7),
        width:wp(87)
      },
      searchInput: {
        
        width:wp(80),
        marginLeft:wp(2)
      },
  });
  export default styles;