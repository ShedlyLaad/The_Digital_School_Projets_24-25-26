import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const cartItems = [
  {
    id: '1',
    name: "Nike Blazer Mid '77",
    price: '$100.99',
    image: 'https://example.com/nike-blazer-mid.jpg',
  },
  {
    id: '2',
    name: "Nike Air Force 1 '07 LV8 Next Nature",
    price: '$320.11',
    image: 'https://example.com/nike-air-force-1.jpg',
  },
];

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>1</Text>
              <TouchableOpacity style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: $421.10</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
    color: '#F1FAC0',
  },
  productPrice: {
    fontSize: 14,
    color: '#2CDD0D',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#000000',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#F1FAC0',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F1FAC0',
  },
  checkoutButton: {
    backgroundColor: '#2CDD0D',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#000000',
    fontSize: 18,
  },
});

export default CartScreen;
