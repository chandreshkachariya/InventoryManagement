import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Text } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCategoryFilter, setInStockFilter, setLowStockFilter } from '../store/productsSlice';
import { ProductCategory } from '../types/product';

const ProductFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category, inStockOnly, lowStockOnly } = useAppSelector(state => state.products.filters);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const categories: (ProductCategory | 'All')[] = ['All', 'Electronics', 'Apparel', 'Food', 'Other'];

  return (
    <View style={styles.container}>
      <View style={styles.menuWrapper}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button onPress={() => setMenuVisible(true)} mode="outlined">
              Category: {category}
            </Button>
          }>
          {categories.map(cat => (
            <Menu.Item
              key={cat}
              onPress={() => {
                dispatch(setCategoryFilter(cat));
                setMenuVisible(false);
              }}
              title={cat}
            />
          ))}
        </Menu>
      </View>

      <View style={styles.filtersWrapper}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            value={inStockOnly}
            onValueChange={() => dispatch(setInStockFilter(!inStockOnly))}
          />
          <Text>In Stock Only</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            value={lowStockOnly}
            onValueChange={() => dispatch(setLowStockFilter(!lowStockOnly))}
          />
          <Text>Low Stock Only</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  menuWrapper: {
    marginBottom: 16,
  },
  filtersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    margin: 10,
  },
});

export default ProductFilters;
