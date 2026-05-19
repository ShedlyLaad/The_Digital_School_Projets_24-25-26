import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';

const AddProductScreen = () => {
  const [image, setImage] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true });
      setImage(photo.uri);
      setCameraVisible(false);
    }
  };

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#00ff00', '#004800', '#d3d3d3']} style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Binevenu Dans Mon APP.</Text>

      {cameraVisible ? (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={cameraType}
            ref={cameraRef}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={takePicture} style={styles.capture}>
                <Text style={styles.captureText}>SNAP</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setCameraVisible(true)} style={styles.photoButton}>
          {image ? (
            <Image source={{ uri: image }} style={styles.photo} />
          ) : (
            <Text style={styles.photoButtonText}>Add Photo</Text>
          )}
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};
