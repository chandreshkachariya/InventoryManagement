import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CategoryChart = () => {
  const { width } = useWindowDimensions();
  const products = useSelector((state: RootState) => state.products.products);

  // Return null or loading indicator if products is undefined
  if (!products) {
    return null; // or <ActivityIndicator /> if you prefer
  }

  // Handle empty products array
  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No products available</Text>
      </View>
    );
  }

  // Process data for chart
  const categoryData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([name, count]) => ({
    name,
    population: count,
    color: getCategoryColor(name),
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products by Category</Text>
      <PieChart
        data={chartData}
        width={width - 32} // Account for padding
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

// Helper function for consistent category colors
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    'Electronics': '#FF6384',
    'Apparel': '#36A2EB',
    'Food': '#FFCE56',
    'Other': '#4BC0C0',
  };
  return colorMap[category] || '#9966FF'; // Default color
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default CategoryChart;