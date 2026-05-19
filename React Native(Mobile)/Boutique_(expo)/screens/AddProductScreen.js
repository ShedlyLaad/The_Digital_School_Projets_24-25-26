import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';

const AddProductScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState(CameraType.back);
  const cameraRef = useRef(null);

  // Request camera permissions
  const openCamera = async () => {
    const { status } = await requestPermission();
    if (status !== 'granted') {
      alert('Camera permission is required to use the camera');
      return;
    }
    setCameraVisible(true);
  };

  // Function to take a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
      setCameraVisible(false);
    }
  };

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Function to handle adding product
  const handleAddProduct = () => {
    console.log({
      name,
      price,
      image,
      storeName,
      location,
    });
    navigation.navigate('Store');
  };

  // Render camera or image picker
  return (
    <LinearGradient colors={['#00ff00', '#004800', '#d3d3d3']} style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <Text style={styles.subtitle}>Enter the details of your product.</Text>

      {cameraVisible ? (
        <Camera style={styles.camera} type={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={watchAsync}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCameraVisible(false)}>
              <Text style={styles.text}>Close Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back))}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
          {image ? <Image source={{ uri: image }} style={styles.photo} /> : <Text style={styles.photoButtonText}>Add Photo</Text>}
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
        <Text style={styles.cameraButtonText}>Open Camera</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Product Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Store Name" value={storeName} onChangeText={setStoreName} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  photoButton: {
    width: 100,
    height: 100,
    backgroundColor: '#e1e1e1',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    margin: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoButtonText: {
    color: '#888',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0000ff',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
}); 
export default AddProductScreen;
