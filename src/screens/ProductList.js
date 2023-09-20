import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Product } from "../components/Product.js";
import { getProducts } from "../services/productsService.js";

export const ProductsList = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  });

  const renderProduct = ({ item: product }) => {
    return (
      <Product
        {...product}
        onPress={() => {
          navigation.navigate("ProductDetails", {
            productId: product.id,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={renderProduct}
    />
  );
};

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: "#eee",
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
