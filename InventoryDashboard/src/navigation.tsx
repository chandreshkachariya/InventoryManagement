import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductFormScreen from './screens/ProductFormScreen';
import ProductListScreen from './screens/ProductListScreen';

export type RootStackParamList = {
  ProductList: undefined;
  ProductForm: { productId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen 
          name="ProductList" 
          component={ProductListScreen} 
          options={{ title: 'Inventory Dashboard' }}
        />
        <Stack.Screen 
          name="ProductForm" 
          component={ProductFormScreen} 
          options={{ title: 'Add/Edit Product' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;