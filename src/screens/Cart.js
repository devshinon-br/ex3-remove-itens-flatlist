import { Text, StyleSheet, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-web";
import { numberFormat } from "../services/numberFormat";
import { getProduct } from "../services/productsService";

export const Cart = ({items, getTotalPrice, onRemoveFromCart}) => {

  const renderItem = ({ item }) => {
    const product = getProduct(item.id);

    return (
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Valor unitário: {numberFormat(product.price)}</Text>
        <Text style={styles.qtd}>Quantidade: {item.qty}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Button
          color={"red"}
          onPress={() => onRemoveFromCart(product.id)}
          title="Deletar"
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text style={styles.totalValue}>Valor total: {numberFormat(getTotalPrice())}</Text>
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        keyExtractor={(item) => item.id.toString()}
        data={items}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 22
  },
  itemsList: {
    backgroundColor: "#eee",
  },
  itemsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  qtd: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 16,
  },
});
