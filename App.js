import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsList } from "./src/screens/ProductList";
import { ProductDetails } from "./src/screens/ProductDetails";
import { Cart } from "./src/screens/Cart";
import { CartIcon } from "./src/components/CartIcon";
import { useState } from "react";
import { getProduct } from "./src/services/productsService";

const App = () => {
  const Stack = createNativeStackNavigator();
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [totalItens, setTotalItens] = useState(0);

  const addItemToCart = (id) => {
    const product = getProduct(id);
    setItensCarrinho((prevItems) => {
      const item = prevItems.find((item) => item.id == id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            product,
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id === id) {
            item.qty++;
          }
          return item;
        });
      }
    });

    // Incrementar o total de itens quando um item é adicionado
    setTotalItens((prevTotal) => prevTotal + 1);
  };

  const onRemoveFromCart = (productId) => {
    setItensCarrinho((prevItems) => {
      const updatedItems = prevItems.filter((item) => {
        if (item.id === productId) {
          setTotalItens((prevTotal) => prevTotal - item.qty);
          return false; 
        }
        return true; 
      });
      return updatedItems;
    });
  };

  const getTotalPrice = () => {
    return itensCarrinho.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={ProductsList}
          options={({ navigation }) => ({
            title: "Produtos",
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation} getItemsCount={totalItens} />,
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          options={({ navigation }) => ({
            title: "Detalhes do produto",
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation} getItemsCount={totalItens} />,
          })}
        >
          {(props) => <ProductDetails {...props} addItemToCart={addItemToCart} />}
        </Stack.Screen>
        <Stack.Screen
          name="Cart"
          options={({ navigation }) => ({
            title: "Meu carrinho",
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation} getItemsCount={totalItens} />,
          })}
        >
          {(props) => 
          <Cart {...props} 
            items={itensCarrinho} 
            getTotalPrice={getTotalPrice} 
            getItemsCount={totalItens}
            onRemoveFromCart={onRemoveFromCart}  
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  },
});

export default App;
