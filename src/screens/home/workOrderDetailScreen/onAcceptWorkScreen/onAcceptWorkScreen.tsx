import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import styles from './onAcceptWorkScreen.styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackProps } from '../../../../@types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    Button,
    CommonImagePicker,
    Header,
    ImagePickerModal,
    TextView,
} from '../../../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Icon } from '../../../../constant';

type ScreenRouteProp = RouteProp<{ params: { item: any } }, 'params'>;
type OnAcceptWorkScreenNavigationType = NativeStackNavigationProp<HomeStackProps, "OnAcceptWorkScreen">;

const OnAcceptWorkScreen = () => {
    const route = useRoute<ScreenRouteProp>();
    const { item } = route.params;
    const navigation = useNavigation<OnAcceptWorkScreenNavigationType>();

    const [ secondsElapsed, setSecondsElapsed ] = useState( 0 );
    const [ isRunning, setIsRunning ] = useState( false );
    const [ hasStarted, setHasStarted ] = useState( false );
    const [ timer, setTimer ] = useState( '00:00:00' );
    const intervalRef = useRef<NodeJS.Timeout | null>( null );

    const [ workNote, setWorkNote ] = useState( '' );
    const [ partName, setPartName ] = useState( '' );
    const [ imageUri, setImageUri ] = useState<string | null>( null );
    const [ isModalVisible, setIsModalVisible ] = useState( false );

    const formatTime = ( totalSeconds: number ): string => {
        const hours = Math.floor( totalSeconds / 3600 );
        const minutes = Math.floor( ( totalSeconds % 3600 ) / 60 );
        const seconds = totalSeconds % 60;

        return [
            hours.toString().padStart( 2, '0' ),
            minutes.toString().padStart( 2, '0' ),
            seconds.toString().padStart( 2, '0' ),
        ].join( ':' );
    };

    const handleStart = () => {
        setIsRunning( true );
        setHasStarted( true );
    };

    const handlePause = () => {
        setIsRunning( false );
    };

    const handleStop = () => {
        setIsRunning( false );
        setHasStarted( false );
        setSecondsElapsed( 0 );
    };

    useEffect( () => {
        setTimer( formatTime( secondsElapsed ) );
    }, [ secondsElapsed ] );

    useEffect( () => {
        if ( isRunning ) {
            intervalRef.current = setInterval( () => {
                setSecondsElapsed( prev => prev + 1 );
            }, 1000 );
        } else if ( intervalRef.current ) {
            clearInterval( intervalRef.current );
            intervalRef.current = null;
        }

        return () => {
            if ( intervalRef.current ) {
                clearInterval( intervalRef.current );
                intervalRef.current = null;
            }
        };
    }, [ isRunning ] );

    const openUploadDocImagePicker = () => {
        setIsModalVisible( true );
    };

    const handleImagePicker = async ( type: 'Camera' | 'Gallery' ) => {
        setIsModalVisible( false );
        try {
            const image: any = await CommonImagePicker( type, 1, false );
            if ( image?.path ) {
                setImageUri( image.path );
            }
        } catch ( error: any ) {
            console.warn( 'Image pick error:', error?.message );
        }
    };

    return (
        <KeyboardAvoidingView
            style={ styles.container }
            behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
            keyboardVerticalOffset={ Platform.OS === 'ios' ? 100 : 0 }
        >
            <SafeAreaView style={ { flex: 1 } }>
                <Header title={ item?.title } />
                <ScrollView
                    contentContainerStyle={ styles.scrollContent }
                    showsVerticalScrollIndicator={ false }
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Work Order Details */ }
                    <View style={ styles.card }>
                        <TextView style={ styles.cardTitle }>Work Order Details</TextView>
                        <TextView style={ styles.woDesc }>
                            Perform routine maintenance on HVAC unit #A3-12. Check filters, clean coils,
                            inspect belts and test thermostat functionality.
                        </TextView>
                        <View style={ styles.infoRow }>
                            <View style={ styles.infoBox }>
                                <TextView style={ styles.infoLabel }>Location</TextView>
                                <TextView style={ styles.infoValue }>Building A, Floor 3</TextView>
                            </View>
                            <View style={ styles.infoBox }>
                                <TextView style={ styles.infoLabel }>Duration</TextView>
                                <TextView style={ styles.infoValue }>90min</TextView>
                            </View>
                        </View>
                        <View style={ styles.assetBox }>
                            <TextView style={ styles.infoLabel }>Asset ID:</TextView>
                            <TextView style={ styles.infoValue }>HVAC-A3-12</TextView>
                        </View>
                        <View style={ styles.badgeRow }>
                            <TextView style={ styles.badge }>High Priority</TextView>
                            <TextView style={ [ styles.badge, { backgroundColor: "#1976D2" } ] }>In Progress</TextView>
                        </View>
                    </View>

                    {/* Time Tracking */ }
                    <View style={ [ styles.card, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' } ] }>
                        <View style={ { flex: 1 } }>
                            <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                                <Icon family='MaterialCommunityIcons' name="timer" size={ 21 } color={ Colors.BODY } />
                                <TextView style={ [ styles.cardTitle, { marginLeft: 8 } ] }>Time Tracking</TextView>
                            </View>
                            <TextView style={ styles.timerText }>{ timer }</TextView>
                        </View>

                        <View style={ styles.timerButtonContainer }>
                            { !isRunning && !hasStarted && (
                                <TouchableOpacity style={ styles.startBtn } onPress={ handleStart }>
                                    <Icon family='MaterialCommunityIcons' name="play" color="#fff" size={ 20 } />
                                    <TextView style={ styles.startBtnText }>Start</TextView>
                                </TouchableOpacity>
                            ) }

                            { isRunning && (
                                <TouchableOpacity style={ styles.startBtn } onPress={ handlePause }>
                                    <Icon family='MaterialCommunityIcons' name="pause" color="#fff" size={ 20 } />
                                    <TextView style={ styles.startBtnText }>Pause</TextView>
                                </TouchableOpacity>
                            ) }

                            { hasStarted && !isRunning && (
                                <TouchableOpacity style={ styles.startBtn } onPress={ handleStart }>
                                    <Icon family='MaterialCommunityIcons' name="play" color="#fff" size={ 20 } />
                                    <TextView style={ styles.startBtnText }>Resume</TextView>
                                </TouchableOpacity>
                            ) }

                            { hasStarted && (
                                <TouchableOpacity
                                    style={ [ styles.startBtn, { backgroundColor: '#FF4C4C' } ] }
                                    onPress={ handleStop }
                                >
                                    <Icon family='MaterialCommunityIcons' name="stop" color="#fff" size={ 20 } />
                                    <TextView style={ styles.startBtnText }>Stop</TextView>
                                </TouchableOpacity>
                            ) }
                        </View>
                    </View>

                    {/* Documentation */ }
                    <View style={ styles.card }>
                        <Text style={ styles.cardTitle }>Documentation</Text>
                        { imageUri ? (
                            <Image source={ { uri: imageUri } } style={ styles.imagePreview } />
                        ) : (
                            <View style={ styles.imagePlaceholder }>
                                <Icon family='Feather' name="camera" size={ 30 } color="#999" />
                                <TextView style={ styles.placeholderText }>Take Photo</TextView>
                            </View>
                        ) }
                        <View style={ styles.docButtons }>
                            <TouchableOpacity style={ styles.takePhotoBtn } onPress={ openUploadDocImagePicker }>
                                <Icon family='Feather' name="camera" size={ 20 } color="#fff" />
                                <TextView style={ [ styles.buttonText, { color: "#fff" } ] }>Take Photo</TextView>
                            </TouchableOpacity>
                            <TouchableOpacity style={ styles.uploadBtn }>
                                <Icon family='Feather' name="upload" size={ 20 } color="#000" />
                                <TextView style={ styles.buttonText }>Upload</TextView>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Work Notes */ }
                    <View style={ styles.card }>
                        <TextView style={ styles.cardTitle }>Work Notes</TextView>
                        <TextInput
                            placeholder="Add work completion notes..."
                            value={ workNote }
                            onChangeText={ setWorkNote }
                            style={ styles.textArea }
                            placeholderTextColor={ Colors.BODY }
                            multiline
                        />
                    </View>

                    {/* Parts Used */ }
                    <View style={ styles.card }>
                        <TextView style={ styles.cardTitle }>Parts Used</TextView>
                        <View style={ styles.partsRow }>
                            <TextInput
                                placeholder="Part name"
                                value={ partName }
                                onChangeText={ setPartName }
                                style={ styles.partInput }
                                placeholderTextColor={ Colors.BODY }
                            />
                            <TextInput style={ styles.partQty } value="1" editable={ false } />
                            <TouchableOpacity style={ styles.addPartBtn }>
                                <TextView style={ styles.addPartText }>Add Part</TextView>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button title={ "Complete Job" } />
                    <ImagePickerModal
                        visible={ isModalVisible }
                        onClose={ () => setIsModalVisible( false ) }
                        onSelect={ handleImagePicker }
                    />
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default OnAcceptWorkScreen;
