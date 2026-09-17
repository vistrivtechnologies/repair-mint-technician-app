import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker'

export const CommonImagePicker = (
    from: 'Camera' | 'Gallery',
    maxFiles: number = 1,
    multiple: boolean = true
): Promise<ImageOrVideo | ImageOrVideo[]> => {
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
            if ( from === 'Camera' ) {
                ImagePicker.openCamera( {
                    width: 300,
                    height: 400,
                    cropping: false
                } )
                    .then( ( image ) => {
                        if ( image ) {
                            resolve( image )
                        } else {
                            reject( new Error( 'No image selected' ) )
                        }
                    } )
                    .catch( ( error ) => {
                        reject( error )
                    } )
            } else {
                ImagePicker.openPicker( {
                    multiple,
                    maxFiles,
                    width: 300,
                    height: 400,
                    cropping: true
                } )
                    .then( ( images ) => {
                        if ( images ) {
                            resolve( images )
                        } else {
                            reject( new Error( 'No image selected' ) )
                        }
                    } )
                    .catch( ( error ) => {
                        reject( error )
                    } )
            }
        }, 700 )
    } )
}
