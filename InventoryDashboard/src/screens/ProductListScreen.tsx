import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../store/store';
import ProductListItem from '../components/ProductListItem';
import ProductFilters from '../components/ProductFilters';
import CategoryChart from '../components/CategoryChart';
import { deleteMultipleProducts, deleteProduct } from '../store/productsSlice';
import { Button } from 'react-native-paper';

const ProductListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state: RootState) => state.products);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string, isSelected: boolean) => {
    setSelectedIds(prev => 
      isSelected ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => dispatch(deleteProduct(id)) },
      ]
    );
  };

  const handleDeleteMultiple = () => {
    if (selectedIds.length === 0) return;
    
    Alert.alert(
      'Delete Products',
      `Are you sure you want to delete ${selectedIds.length} selected products?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            dispatch(deleteMultipleProducts(selectedIds));
            setSelectedIds([]);
          } 
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CategoryChart />
      <ProductFilters />
      
      <View style={styles.actionsContainer}>
        <Button 
          mode="contained"
          onPress={() => navigation.navigate('ProductForm')}
          style={styles.button}
        >
          Add Product
        </Button>
        {selectedIds.length > 0 && (
          <Button 
            mode="contained"
            onPress={handleDeleteMultiple}
            style={[styles.button, styles.deleteButton]}
            labelStyle={styles.deleteButtonText}
          >
            Delete ({selectedIds.length})
          </Button>
        )}
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductListItem
            product={item}
            onPress={() => navigation.navigate('ProductForm', { productId: item.id })}
            isSelected={selectedIds.includes(item.id)}
            onSelect={handleSelect}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No products found</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  deleteButtonText: {
    color: 'white',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  }
});

export default ProductListScreen;