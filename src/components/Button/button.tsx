import {TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from './styles';
import {FC} from 'react';
import {TextView} from '../index';
import _ from 'lodash';
import Icon from '../../constant/Icon';
import {Colors} from '../../constant';

interface ButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  title?: string | null;
  leftIcon?: true;
  leftIconFamily?: any;
  leftIconName?: any;
  rightIcon?: true;
  rightIconFamily?: any;
  rightIconName?: any;
}

const Button: FC<ButtonProps> = ({
  onPress,
  style,
  buttonContainerStyle,
  title,
  leftIcon,
  leftIconFamily,
  leftIconName,
  rightIcon,
  rightIconFamily,
  rightIconName,
}) => {
  const {buttonContainer, buttonView, touchableOpacityStyle, buttonText} =
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
    <TouchableOpacity style={style} onPress={() => handleClick()}>
      <View
        style={[
          buttonContainer,
          ...[buttonContainerStyle && buttonContainerStyle],
        ]}>
        <View style={touchableOpacityStyle}>
          {leftIcon && (
            <View>
              <Icon
                family={leftIconFamily}
                name={leftIconName}
                size={20}
                color={Colors.PRIMARY[100]}
              />
            </View>
          )}

          <View style={buttonView}>
            <TextView style={buttonText}>{title}</TextView>
          </View>

          {rightIcon && (
            <View>
              <Icon
                family={rightIconFamily}
                name={rightIconName}
                size={20}
                color={Colors.PRIMARY[100]}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
