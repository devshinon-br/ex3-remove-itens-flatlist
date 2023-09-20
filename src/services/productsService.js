const PRODUCTS = [
  {
    id: 100,
    name: "Aspirador de pó",
    price: 150,
    image: require("../../assets/products/aspirador.jpg"),
    description:
      "Aspirador de Pó Vertical e Portátil de Mão 2 em 1 WAP HIGH SPEED 1000W 1,2 litros Filtro HEPA 127V",
  },
  {
    id: 101,
    name: "Power Bank",
    price: 60.99,
    image: require("../../assets/products/power-bank.jpg"),
    description: "Belkin BPB006BT USB-C 10000mAh Power Bank",
  },
  {
    id: 102,
    name: "Smartphone",
    price: 2000,
    image: require("../../assets/products/smartphone.jpg"),
    description:
      "Smartphone Samsung Galaxy A32 128GB Violeta 4G - 4GB RAM Tela 6,4” Câm. Quádrupla + Selfie 20MP",
  },
];

export const getProducts = () => {
  return PRODUCTS;
};

export const getProduct = (id) => {
  return PRODUCTS.find((product) => product.id == id);
};
