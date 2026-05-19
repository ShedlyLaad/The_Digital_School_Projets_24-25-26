import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function BoutiqueScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={{ color: '#fff' }}>Boutique Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  button: {
    backgroundColor: '#2CDD0D',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BoutiqueScreen;
