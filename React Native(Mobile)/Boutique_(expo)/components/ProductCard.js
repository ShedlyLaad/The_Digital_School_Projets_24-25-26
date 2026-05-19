import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333', // Adjusted background color
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    marginVertical: 5,
    color: '#F1FAC0', // Adjusted text color
  },
  productPrice: {
    fontSize: 14,
    color: '#2CDD0D', // Adjusted text color
  },
  productDescription: {
    fontSize: 12,
    color: '#F1FAC0', // Adjusted text color
  },
});

export default ProductCard;
