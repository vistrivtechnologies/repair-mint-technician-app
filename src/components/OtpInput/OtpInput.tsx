import React, { useState, useRef, useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { UserData, UserDataContext } from '../../context/userDataContext';
import { Colors } from '../../constant';

interface CustomOTPInputProps {
  numberOfInputs?: number;
  onOTPComplete?: ( otp: string ) => void;
  borderColor?: string;
}

const OtpInput: React.FC<CustomOTPInputProps> = ( {
  numberOfInputs = 4,
  borderColor,
  onOTPComplete,
} ) => {
  const [ otp, setOtp ] = useState<string[]>( new Array( numberOfInputs ).fill( '' ) );
  const [ focusedInput, setFocusedInput ] = useState<number | null>( null );
  const inputs = useRef<TextInput[]>( [] );

  const { isDarkMode } = useContext<UserData>( UserDataContext );

  const background = isDarkMode === 'dark' ? Colors.PRIMARY[ 400 ] : Colors.PRIMARY[ 800 ];
  const textColor = isDarkMode === 'dark' ? Colors.PRIMARY[ 400 ] : Colors.PRIMARY[ 300 ];

  const handleChangeText = ( text: string, index: number ) => {
    const numericText = text.replace( /[^0-9]/g, '' );

    const newOtp = [ ...otp ];
    newOtp[ index ] = numericText;
    setOtp( newOtp );


    if ( numericText && index < numberOfInputs - 1 ) {
      inputs.current[ index + 1 ].focus();
    }


    if ( newOtp.every( ( digit ) => digit !== '' ) ) {
      onOTPComplete?.( newOtp.join( '' ) );
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if ( e.nativeEvent.key === 'Backspace' && !otp[ index ] && index > 0 ) {
      // Move to previous input on backspace if current input is empty
      const newOtp = [ ...otp ];
      newOtp[ index - 1 ] = '';
      setOtp( newOtp );
      inputs.current[ index - 1 ].focus();
    }
  };

  const handleFocus = ( index: number ) => {
    setFocusedInput( index );
  };

  const handleBlur = () => {
    setFocusedInput( null );
  };

  return (
    <View style={ styles.otpContainer }>
      { otp.map( ( digit, index ) => (
        <TextInput
          key={ index }
          value={ digit }
          ref={ ( ref ) => ( inputs.current[ index ] = ref as TextInput ) }
          onChangeText={ ( text ) => handleChangeText( text, index ) }
          onKeyPress={ ( e ) => handleKeyPress( e, index ) }
          onFocus={ () => handleFocus( index ) }
          onBlur={ handleBlur }
          placeholder='.'
          placeholderTextColor={ Colors.GREY }
          keyboardType="numeric"
          maxLength={ 1 }
          style={ [
            styles.otpInput,
            {

              borderColor: borderColor ?? '#E0E0E0',
              color: Colors.GREY,
              backgroundColor: isDarkMode === 'dark' ? Colors.PRIMARY[ 800 ] : '#FFFFFF',
            },
            focusedInput === index && [
              styles.focusedOtpInput,
              { borderColor: borderColor ?? Colors.PRIMARY[ 400 ] }
            ],
          ] }
          selectionColor={ Colors.PRIMARY[ 400 ] }
          returnKeyType={ index === numberOfInputs - 1 ? 'done' : 'next' }
        />
      ) ) }
    </View>
  );
};

const styles = StyleSheet.create( {
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  focusedOtpInput: {
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
} );

export default OtpInput;