import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.PRIMARY[100],
  },
  backgroundGlow: {
    position: 'absolute',
    width: 340,
    height: 340,
    top: -170,
    right: -130,
    borderRadius: 170,
    backgroundColor: Colors.PRIMARY[400],
    opacity: 0.72,
  },
  backgroundGlowSecondary: {
    position: 'absolute',
    width: 280,
    height: 280,
    bottom: -170,
    left: -135,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: Colors.SECONDARY[100],
    opacity: 0.35,
  },
  topLabel: {
    position: 'absolute',
    top: 54,
    color: Colors.PRIMARY[700],
    fontFamily: Fonts.SemiBold,
    fontSize: 9,
    letterSpacing: 2.6,
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
    borderColor: Colors.SECONDARY[100],
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
    marginTop: 22,
    color: Colors.WHITE,
    fontFamily: Fonts.Bold,
    fontSize: 34,
    letterSpacing: 0.2,
  },
  brandAccent: {
    color: Colors.SECONDARY[100],
  },
  tagline: {
    marginTop: 8,
    color: Colors.PRIMARY[700],
    fontFamily: Fonts.SemiBold,
    fontSize: 10,
    letterSpacing: 2.2,
  },
  progressRail: {
    width: 92,
    height: 4,
    marginTop: 25,
    borderRadius: 2,
    backgroundColor: Colors.PRIMARY[400],
    overflow: 'hidden',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.SECONDARY[100],
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerDot: {
    width: 5,
    height: 5,
    marginRight: 8,
    borderRadius: 3,
    backgroundColor: Colors.SECONDARY[100],
  },
  footerText: {
    color: Colors.PRIMARY[700],
    fontFamily: Fonts.Medium,
    fontSize: 9,
    letterSpacing: 1.8,
  },
});

export default styles;
