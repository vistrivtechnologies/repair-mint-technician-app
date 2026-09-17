// components/CircularProgressCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Fonts } from '../../constant';
import { scale } from 'react-native-size-matters';

interface Props {
  percentage: number;
}

const CircularProgressCard: React.FC<Props> = ({ percentage }) => {
  return (
        <AnimatedCircularProgress
          size={60}
          width={6}
          fill={percentage}
          tintColor="#ffffff"
          backgroundColor="#6e6893"
          rotation={0}
          lineCap="round"
        >
          {() => <Text style={styles.percentText}>{percentage}%</Text>}
        </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  percentText: {
    color: '#fff',
    fontFamily:Fonts.SemiBold,
    fontSize: scale(11),
  },
  textContainer: {
    marginLeft: 16,
  },

});

export default CircularProgressCard;
