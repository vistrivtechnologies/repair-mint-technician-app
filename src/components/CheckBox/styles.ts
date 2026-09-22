import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../constant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../constant/dimentions'
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        //width:wp(90),
        justifyContent: 'flex-start',
    },
    checkBoxImageView: {
        width: 24,
        height: 24
    },
    title: {
        left: 10,
        color: Colors.HEADING,
        fontFamily: Fonts.Medium,
        fontSize: scale( 12 ),
    },

} );

export default styles;