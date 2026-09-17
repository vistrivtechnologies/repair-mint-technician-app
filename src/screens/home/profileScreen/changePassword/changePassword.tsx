import React, { FC, useContext, useState } from 'react';
import {
    ScrollView,
    View,
    ImageBackground,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import styles from './changePassword.styles';
import {
    Button,
    FloatingTextInput,
    Header,
    TextView,
} from '../../../../components';
import { HomeStackProps } from '../../../../@types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Colors, Images } from '../../../../constant';
import { changePasswordValidationSchema } from '../../../../helpers/validations';
import { useFormik } from 'formik';
import { UserData, UserDataContext } from '../../../../context/userDataContext';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';



type ChangePasswordNavigationType = NativeStackNavigationProp<
    HomeStackProps,
    'ChangePassword'
>;

const ChangePassword: FC = () => {
    const navigation = useNavigation<ChangePasswordNavigationType>();
    const { userData, setIsLoggedIn } = useContext<UserData>( UserDataContext );

    const [ isSecure, setIsSecure ] = useState<boolean>( true );
    const [ isConfirmSecure, setIsConfirmSecure ] = useState<boolean>( true );



    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
    } = useFormik( {
        validationSchema: changePasswordValidationSchema,
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: async ( data: any ) => {
            try {
                if ( data ) {





                }
            } catch ( error ) {
                console.log( 'This is error', error );
            }
        },
    } );

    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
            <SafeAreaView style={ styles.container }>

                <Header title='Change Password' />
                <ScrollView style={ { flex: 1 } } >


                    <View style={ styles.mainContainer }>


                        <View style={ styles.titleContainer }>
                            <TextView style={ styles.title }>
                                Your new password must be different from { '\n' } previous used password
                            </TextView>
                        </View>

                        <View style={ styles.inputContainer }>
                            {/* <FloatingTextInput

                                value={ values.oldPassword }
                                label="Old Password"
                                error={ errors.oldPassword }
                                onChangeText={ handleChange( 'oldPassword' ) }
                                touched={ touched.oldPassword }
                                keyboardType="default"
                                isSecure
                            /> */}

                            <FloatingTextInput

                                value={ values.newPassword }
                                label="New Password"
                                keyboardType="default"
                                error={ errors.newPassword }
                                onChangeText={ handleChange( 'newPassword' ) }
                                touched={ touched.newPassword }
                                isSecure={ isSecure }
                                onSecureTextPress={ () => setIsSecure( !isSecure ) }
                                rightIcon={ true }
                                rightImage={ isSecure ? Images.eye_close : Images.eye_open }
                            />
                            <View style={ { marginTop: hp( 1.5 ) } }>
                                <FloatingTextInput
                                    value={ values.confirmPassword }
                                    label="Confirm Password"
                                    keyboardType="default"
                                    error={ errors.confirmPassword }
                                    onChangeText={ handleChange( 'confirmPassword' ) }
                                    touched={ touched.confirmPassword }
                                    isSecure={ isConfirmSecure }
                                    onSecureTextPress={ () => setIsConfirmSecure( !isConfirmSecure ) }
                                    compareWith={ values.newPassword }
                                    rightIcon={ true }
                                    rightImage={ isConfirmSecure ? Images.eye_close : Images.eye_open }
                                />
                            </View>



                        </View>
                    </View>
                </ScrollView>
                <Button
                    title="Change Password"
                    onPress={ () => handleSubmit() }
                    style={ styles.signinButton }
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default ChangePassword;
