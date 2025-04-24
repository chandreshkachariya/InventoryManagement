import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types/product';
import { Checkbox } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { TouchableWithoutFeedback } from 'react-native';

type ProductListItemProps = {
  product: Product;
  onPress: () => void;
  isSelected: boolean;
  onSelect: (id: string, isSelected: boolean) => void;
};

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onPress,
  isSelected,
  onSelect
}) => {
  const isLowStock = product.stockQuantity < 5;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <TouchableWithoutFeedback>
      <View style={styles.checkboxContainer}>
        <CheckBox
          style={styles.checkbox}
          value={isSelected}
          onValueChange={() => onSelect(product.id, !isSelected)}
        />
      </View>
      </TouchableWithoutFeedback>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
      </View>
      <View style={styles.stockContainer}>
        <Text style={[styles.stock, isLowStock && styles.lowStock]}>
          {product.stockQuantity} in stock
        </Text>
        {isLowStock && <View style={styles.lowStockIndicator} />}
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    margin: 10,
  },
  infoContainer: {
    flex: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  stockContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stock: {
    fontSize: 14,
  },
  lowStock: {
    color: 'red',
  },
  lowStockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginLeft: 4,
  },
  price: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductListItem;