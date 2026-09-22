import { StyleSheet } from 'react-native';
import { Colors, Fonts, } from '../../../../constant';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create( {

    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY[300],
    },
    mainContainer: {
        width: wp( 90 ),
        alignSelf: 'center',
    },
    titleContainer: {
        marginTop: hp( 2 ),
        marginBottom: hp( 1 ),
    },
    title: {
        fontFamily: Fonts.Medium,
        color: Colors.BODY,
        fontSize: scale( 12 )
    },
    inputContainer: {
        marginTop: hp( 2 ),
    },

    signinButton: {
        marginBottom: hp( 3 )
    }
} );

export default styles;
