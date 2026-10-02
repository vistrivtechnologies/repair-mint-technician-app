import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY[300],
  },
  mainContainer: {
    width: wp(90),
    alignSelf: 'center',
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    margin: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: scale(15),
    fontFamily: Fonts.Medium,
    color: Colors.HEADING,
  },
  method: {
    color: Colors.PRIMARY[100],
    fontFamily: Fonts.Medium,
    fontSize: scale(15),
  },
  description: {
    color: Colors.BODY,
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    marginBottom: 12,
  },
  amountCard: {
    backgroundColor: Colors.PRIMARY[600],
    borderRadius: 10,
    padding: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  subLabel: {
    fontSize: scale(13),
    fontFamily: Fonts.Medium,
    color: Colors.HEADING,
  },
  amount: {
    color: Colors.PRIMARY[100],
    fontFamily: Fonts.Medium,
    fontSize: scale(13),
  },
  date: {
    color: Colors.HEADING,
    fontFamily: Fonts.Medium,
    fontSize: scale(13),
  },
});

export default styles;
