import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, Colors } from '../../../../constant';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#f4f6fc'
    },
    scrollContent: {
        padding: 16,
        paddingBottom: hp(5)
    },
    header: {
        marginBottom: 12
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    status: {
        color: '#1976D2',
        fontWeight: '600'
    },
    woCode: {
        color: '#888'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16
    },
    cardTitle: {
        marginBottom: 8,
        fontFamily: Fonts.SemiBold,
        fontSize: scale( 14 ),
        color: Colors.HEADING,
        marginLeft: wp( 2 )
    },
    woDesc: {
        color: Colors.BODY,
        marginBottom: 12,
        fontFamily: Fonts.Medium,
        fontSize: scale( 12 )
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    infoBox: { flex: 1 },
    infoLabel: {
        color: Colors.BODY,
        fontFamily: Fonts.Medium,
        fontSize: scale( 12 )
    },
    infoValue: {
        fontFamily: Fonts.SemiBold,
        fontSize: scale( 14 ),
        color: Colors.HEADING
    },
    assetBox: {
        marginBottom: 10
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 10
    },
    badge: {
        backgroundColor: '#f44336',
        color: '#fff',
        paddingHorizontal: hp( 1 ),
        borderRadius: 4,
        paddingVertical: hp( 0.5 ),
        textAlign: 'center',
    },
    timerButtonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        // justifyContent: 'flex-end',
        flex: 1
    },
    timerText: {
        fontSize: 20,
        fontFamily: Fonts.SemiBold,
        color: Colors.PRIMARY[ 100 ],
        marginVertical: 8
    },
    startBtn: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: wp( 4 ),
        height: hp( 5 ),
        marginLeft: wp( 5 )
    },
    startBtnText: {
        color: '#fff',
        marginLeft: 6
    },
    imagePlaceholder: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10
    },
    placeholderText: {
        color: Colors.BODY,
        fontSize: scale( 14 ),
        fontFamily: Fonts.Medium,
        marginTop: 4
    },
    docButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    takePhotoBtn: {
        flex: 1,
        backgroundColor: Colors.PRIMARY[ 100 ],
        padding: 10,
        borderRadius: 6,
        marginRight: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    uploadBtn: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        marginLeft: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#000',
        fontFamily: Fonts.SemiBold,
        fontSize: scale( 12 ),
        textAlign: 'center',
        marginLeft: wp( 3 )
    },
    imagePreview: {
        height: 120,
        width: '100%',
        borderRadius: 10,
        marginBottom: 10
    },
    textArea: {
        borderColor: Colors.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: 6,
        height: 80,
        padding: 10,
        textAlignVertical: 'top',
    },
    partsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    partInput: {
        flex: 2,
        borderColor: Colors.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
        marginRight: 8
    },
    partQty: {
        width: 40,
        textAlign: 'center',
        backgroundColor: Colors.BORDERCOLOR,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8
    },
    addPartBtn: {
        marginLeft: 8
    },
    addPartText: {
        color: '#1976D2',
        fontFamily: Fonts.SemiBold,
        fontSize: scale( 12 )
    },
    completeBtn: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    completeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: Fonts.SemiBold,
    },
} );

export default styles;
