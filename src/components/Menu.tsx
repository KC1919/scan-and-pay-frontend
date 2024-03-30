import React from "react";
import { useQuery } from "@tanstack/react-query";
// import { CategoryRounded } from "@mui/icons-material";
import { Icategory } from "../types/categoryType";

const fetchCategories = async () => {
  const response = await (
    await fetch("http://localhost:3000/api/v1/products/category/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  console.log("Resonse:", response);
  return response.content.data;
};

const fetchProducts = async () => {
  const response = await (
    await fetch("http://localhost:3000/api/v1/products/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  console.log("Response fetch products:", response);
  return response.content.data;
};

const Menu = () => {
  // use Query hooks
  const {
    isPending: isPendingCategories,
    error: errorCategories,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10000,
    refetchOnMount: false,
  });

  const {
    isPending: isPendingProducts,
    error: errorProducts,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 10000,
    refetchOnMount: false,
  });

  console.log("Categories:", categories);
  console.log("Products:", products);

  if (isPendingCategories || isPendingProducts) return <>Loading</>;
  if (errorProducts || errorCategories) return <>Error</>;
  return (
    <div>
      {/* {categories.map((cat: Icategory) => {
        return <div> {cat.name}</div>;
      })} */}
      {products.map((product) => {
        return <div> {product.name}</div>;
      })}
    </div>
  );
};

export default Menu;
