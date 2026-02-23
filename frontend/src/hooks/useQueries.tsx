import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { products } from "../data/products";
import { ProductCategory } from "../types/product";
const API_URL = "http://localhost:5000/api"; // change later if needed

export function useGetAllProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => products,
  });
}
export function usePlaceOrder() {
  return useMutation({
    mutationFn: async (orderData: any) => {
      const res = await axios.post(`${API_URL}/orders`, orderData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order placed successfully");
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (inquiryData: any) => {
      const res = await axios.post(`${API_URL}/inquiries`, inquiryData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Inquiry submitted");
    },
    onError: () => {
      toast.error("Failed to submit inquiry");
    },
  });
}


export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/products`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product added");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useGetProductsByCategory(category: ProductCategory) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () =>
      products.filter((p) => p.category === category),
  });
}