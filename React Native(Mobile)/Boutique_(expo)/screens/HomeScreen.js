import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import products from '../products.json';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = products.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <LinearGradient colors={['#000000', '#000000']} style={styles.container}>
      <Text style={styles.subtitle}>Best Sells</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={(text) => handleSearch(text)}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.noProductView}>
          <Text style={styles.noProductText}>No Product Found</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#F1FAC0',
    marginBottom: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 10,
    color: '#ffffff',
  },
  searchIcon: {
    padding: 10,
  },
  productList: {
    paddingBottom: 20,
  },
  noProductView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductText: {
    fontSize: 18,
    color: '#F1FAC0',
  },
});

export default HomeScreen;
