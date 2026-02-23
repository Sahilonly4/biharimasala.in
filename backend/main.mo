import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  // Types
  type ProductId = Nat;
  type OrderId = Nat;
  type ProductCategory = {
    #spices;
    #pickles;
  };

  type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat;
    image : Storage.ExternalBlob;
    category : ProductCategory;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  type Order = {
    id : OrderId;
    customerName : Text;
    customerAddress : Text;
    products : [ProductId];
    totalAmount : Nat;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
  };

  // Persistent storage
  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let inquiries = List.empty<Inquiry>();
  let nextProductId = List.empty<Nat>();
  let nextOrderId = List.empty<Nat>();

  // Product Management
  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, image : Storage.ExternalBlob, category : ProductCategory) : async ProductId {
    let id = nextProductId.size();
    let product : Product = {
      id;
      name;
      description;
      price;
      image;
      category;
    };
    products.add(id, product);
    id;
  };

  public query ({ caller }) func getProduct(id : ProductId) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.category == category;
      }
    );
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public shared ({ caller }) func placeOrder(customerName : Text, customerAddress : Text, productIds : [ProductId], totalAmount : Nat) : async OrderId {
    let id = nextOrderId.size();
    let order : Order = {
      id;
      customerName;
      customerAddress;
      products = productIds;
      totalAmount;
    };
    orders.add(id, order);
    id;
  };

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      message;
    };
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllProductIds() : async [ProductId] {
    products.keys().toArray();
  };
};
