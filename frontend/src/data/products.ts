import { ProductCategory } from "../types/product";
import Amla from "../images/Amla_Pickles.jpg.jpeg";
import elephant from "../images/Elephant Foot Yam Pickles.png";
import gajar from "../images/Gajar&Muli_Pickle.webp";
import mangopickles from "../images/Mango_Pickles.jpg.jpeg";
import mirchi from "../images/Mirchi_Pickle.jpg.jpeg";
import nimbu from "../images/Nimbu Pickles.jpg.jpeg";
import haldipowder from "../images/Haldi Powder.jpg.jpeg";
import dhaniya from "../images/Dhaniya Powder.jpg.jpeg";
import mirchipowder from "../images/Mirchi Powder.jpg.jpeg";

export const products = [
  {
    id: 1,
    name: "Haldi Powder",
    description: "Pure turmeric powder with rich color and aroma.",
    prices: [
      { size: "250g", price: 79 },
      { size: "500g", price: 149 },
    ],
    category: ProductCategory.spices,
    image: { getDirectURL: () => haldipowder },
  },
  {
    id: 2,
    name: "Dhaniya Powder",
    description: "Fresh coriander powder made from premium seeds.",
    prices: [
      { size: "250g", price: 95 },
      { size: "500g", price: 179 },
    ],
    category: ProductCategory.spices,
    image: { getDirectURL: () => dhaniya },
  },
  {
    id: 3,
    name: "Mirchi Powder",
    description: "Spicy red chilli powder for authentic taste.",
    prices: [
      { size: "250g", price: 159 },
      { size: "500g", price: 299 },
    ],
    category: ProductCategory.spices,
    image: { getDirectURL: () => mirchipowder },
  },

  // 🥭 PICKLES
  {
    id: 4,
    name: "Mango Pickle",
    description: "Traditional homemade aam ka achar.",
    prices: [
      { size: "250g", price: 169 },
      { size: "500g", price: 319 },
    ],
    category: ProductCategory.pickles,
    image: { getDirectURL: () => mangopickles },
  },
  {
    id: 5,
    name: "Nimbu Pickle",
    description: "Tangy lemon pickle with authentic spices.",
    prices: [
      { size: "250g", price: 139 },
      { size: "500g", price: 249 },
    ],
    category: ProductCategory.pickles,
    image: { getDirectURL: () => nimbu },
  },
  {
    id: 6,
    name: "Mirchi Pickle",
    description: "Spicy green chilli pickle, full of flavour.",
    prices: [
      { size: "250g", price: 149 },
      { size: "500g", price: 289 },
    ],
    category: ProductCategory.pickles,
    image: { getDirectURL: () => mirchi },
  },
  {
    id: 7,
    name: "Amla Pickle",
    description: "Healthy amla pickle rich in vitamin C.",
    prices: [{ size: "250g", price: 249 }],
    category: ProductCategory.pickles,
    image: { getDirectURL: () => Amla },
  },
  {
    id: 8,
    name: "Elephant Foot Yam Pickle",
    description: "Traditional suran pickle with bold taste.",
    prices: [], // upcoming
    category: ProductCategory.pickles,
    image: { getDirectURL: () => elephant },
  },
  {
    id: 9,
    name: "Muli & Gajar Mix Pickle",
    description: "Crunchy radish and carrot mixed pickle.",
    prices: [
      { size: "250g", price: 169 },
      { size: "500g", price: 299 },
    ],
    category: ProductCategory.pickles,
    image: { getDirectURL: () => gajar },
  },
];

