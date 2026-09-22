import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY[300],
  },
  brandLockup: {
    alignItems: 'center',
  },
  logoFrame: {
    width: 138,
    height: 138,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 38,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY[700],
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 9,
  },
  logo: {
    width: 112,
    height: 112,
  },
  brandName: {
    marginTop: 24,
    color: Colors.PRIMARY[100],
    fontFamily: Fonts.Bold,
    fontSize: 32,
    letterSpacing: 0.2,
  },
  brandAccent: {
    color: Colors.SECONDARY[100],
  },
  tagline: {
    marginTop: 8,
    color: Colors.BODY,
    fontFamily: Fonts.SemiBold,
    fontSize: 10,
    letterSpacing: 2.2,
  },
  progressTrack: {
    height: 3,
    marginTop: 24,
    borderRadius: 2,
    backgroundColor: Colors.SECONDARY[100],
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    color: Colors.GREY,
    fontFamily: Fonts.Medium,
    fontSize: 9,
    letterSpacing: 1.8,
  },
});

export default styles;
