import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../constant';
import styles from './styles';

const logo = require('../../assets/logo/logo.png');

const SplashScreen: React.FC = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 900,
        delay: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  }, [lineWidth, opacity, scale]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY[300]} />
      <Animated.View
        style={[styles.brandLockup, {opacity, transform: [{scale}]}]}>
        <View style={styles.logoFrame}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.brandName}>
          Repair<Text style={styles.brandAccent}>Mint</Text>
        </Text>
        <Text style={styles.tagline}>FIELD SERVICE, SIMPLIFIED</Text>
        <Animated.View style={[styles.progressTrack, {width: lineWidth.interpolate({inputRange: [0, 1], outputRange: [0, 92]})}]} />
      </Animated.View>
      <Text style={styles.footer}>TECHNICIAN WORKSPACE</Text>
    </View>
  );
};

export default SplashScreen;
