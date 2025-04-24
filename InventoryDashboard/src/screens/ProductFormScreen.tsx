import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addProduct, updateProduct } from '../store/productsSlice';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { ProductCategory } from '../types/product';
import { Picker } from '@react-native-picker/picker';

const ProductFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductForm'>>();
  const dispatch = useAppDispatch();
  
  const products = useAppSelector(state => state.products.products);
  const product = route.params?.productId 
    ? products.find(p => p.id === route.params.productId)
    : null;

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState<ProductCategory>(product?.category || 'Electronics');
  const [stockQuantity, setStockQuantity] = useState(product?.stockQuantity.toString() || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setStockQuantity(product.stockQuantity.toString());
      setPrice(product.price.toString());
    }
  }, [product]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!stockQuantity.trim()) newErrors.stockQuantity = 'Stock quantity is required';
    if (isNaN(Number(stockQuantity)) || Number(stockQuantity) < 0) 
      newErrors.stockQuantity = 'Invalid stock quantity';
    if (!price.trim()) newErrors.price = 'Price is required';
    if (isNaN(Number(price)) || Number(price) <= 0) 
      newErrors.price = 'Invalid price';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const productData = {
      id: product?.id || Date.now().toString(),
      name,
      category,
      stockQuantity: Number(stockQuantity),
      price: Number(price),
    };

    if (product) {
      dispatch(updateProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        error={!!errors.name}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue as ProductCategory)}
        style={styles.picker}
      >
        <Picker.Item label="Electronics" value="Electronics" />
        <Picker.Item label="Apparel" value="Apparel" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <TextInput
        label="Stock Quantity"
        value={stockQuantity}
        onChangeText={setStockQuantity}
        keyboardType="numeric"
        style={styles.input}
        error={!!errors.stockQuantity}
      />
      {errors.stockQuantity && <Text style={styles.error}>{errors.stockQuantity}</Text>}

      <TextInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        error={!!errors.price}
      />
      {errors.price && <Text style={styles.error}>{errors.price}</Text>}

      <Button 
        mode="contained" 
        onPress={handleSubmit} 
        style={styles.button}
      >
        {product ? 'Update Product' : 'Add Product'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    color: '#666',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    padding: 8,
  },
});

export default ProductFormScreen;