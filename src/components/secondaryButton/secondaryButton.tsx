import React, { FC } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './styles';
import { TextView } from '../index';
import _ from 'lodash';
import Icon from '../../constant/Icon';
import { Colors } from '../../constant';

interface SecondaryButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
  title?: string | null;
  textColor?: string;
  bgColor?: string;
  brColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  showIcon?: boolean;
  disabled?: boolean;
  opacity?: number;
  fontSize?: number;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  onPress,
  style,
  title,
  textColor = Colors.NEUTRAL[100],
  bgColor = Colors.PRIMARY[300],
  borderRadius = 10,
  brColor = Colors.PRIMARY[700],
  borderWidth,
  showIcon = false,
  disabled = false,
  opacity = 1,
  fontSize
}) => {
  const { buttonContainer, buttonView, touchableOpacityStyle, buttonText } =
    styles;

  const handleClick = () => {
    try {
      if (onPress) {
        _.debounce(onPress, 500)();
      }
    } catch (error) {
      console.warn('handleClick', error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: bgColor,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: brColor,
          opacity,
        },
      ]}
      disabled={disabled}
      onPress={handleClick}>
      <View style={buttonContainer}>
        <View style={touchableOpacityStyle}>
          <View style={buttonView}>
            {showIcon && <Icon family="Octicons" name="upload" size={18} color={Colors.GREY} />}
            <TextView style={[buttonText, {
              color: textColor,
              fontSize: fontSize, color: Colors.GREY
            }]}>
              {title}
            </TextView>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SecondaryButton);
