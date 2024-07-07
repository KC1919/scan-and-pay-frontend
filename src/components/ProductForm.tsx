import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Icategory } from '@/types/categoryType';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { TProduct, TProductCreate } from '@/types/productType';
import { AppContext } from './Context/AppContext';

// call back
const createProduct = async (data: TProductCreate) => {
  // console.log('name in createProductCB', name);
  try {
    const response = await (
      await fetch('http://localhost:3000/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })
    ).json();

    if (response.success === true) {
      console.log('Product created');
      alert('Product created');
    } else {
      console.log('Failed to create product');
      alert('Failed to create product');
    }
  } catch (error) {
    console.log('failed to create product');
  }
};

const updateProduct = async (data: TProductCreate) => {
  try {
    const response = await (
      await fetch(`http://localhost:3000/api/v1/products/update/${data.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    ).json();

    if (response.success === true) {
      console.log('Product updated');
      alert('Product updated');
    } else {
      console.log('Failed to update product');
      alert('Failed to update product');
    }
  } catch (error) {
    console.log('Failed to update product', error);
    alert('Failed to update product');
  }
};

const fetchCategories = async (): Promise<Icategory[]> => {
  const response = await (
    await fetch('http://localhost:3000/api/v1/category/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  ).json();

  console.log('Resonse fetch categories :', response);
  return response.content.data;
};

const fetchProducts = async (): Promise<TProduct[]> => {
  const response = await (
    await fetch('http://localhost:3000/api/v1/products/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  ).json();

  console.log('Response fetch products:', response);
  return response.content.data;
};

export function ProductForm() {
  const { state } = useLocation();

  const [createText, setCreateText] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  // const [sp, setSp] = useState(0.0);
  // const [quantity, setQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [vegTagCreate, setVegTagCreate] = useState(true);

  // const { updateProduct, handleUpdateProduct } = useContext(AppContext);

  useEffect(() => {
    if (state != null) {
      setIsUpdate(state.update);
      setCreateText(state.product.name);
      setCategoryId(state.product.categoryId);
    }
  }, [state]);

  const handleAddQuantity = (e) => {
    try {
      e.preventDefault();
      const quantityPriceContainerElem = document.getElementById(
        'quantity-price-container'
      );
      const quantityPriceDivsCount =
        quantityPriceContainerElem?.childNodes.length;
      const original = document.getElementById(
        'quantity-price-div'
      ) as HTMLDivElement;
      const clone = original.cloneNode(true); // "deep" clone
      clone.id = 'quantity-price-div' + quantityPriceDivsCount; // there can only be one element with an ID
      original.parentNode?.appendChild(clone);
    } catch (error) {
      console.log('Failed to add quantity-price div');
      alert('Failed to add quantity-price div');
    }
  };

  const handleRemoveQuantity = (e) => {
    try {
      e.preventDefault();
      const quantityPriceContainerElem = document.getElementById(
        'quantity-price-container'
      );
      const quantityPriceDivsCount = quantityPriceContainerElem?.childNodes.length;

      if(quantityPriceDivsCount && quantityPriceDivsCount>1){
        quantityPriceContainerElem?.removeChild(quantityPriceContainerElem.lastChild)
      }
      
    } catch (error) {
      console.log('Failed to remove quantity', error);
      alert('Failed to remove quantity');
    }
  };

  const handleProductCreate = (e) => {
    try {
      e.preventDefault();
      const quantityPriceContainerElem = document.getElementById(
        'quantity-price-container'
      ) as HTMLDivElement;

      interface quantityPriceDataInterface {
        quantity: string;
        price: number;
      }

      const quantityPriceData: Array<quantityPriceDataInterface> = [];

      quantityPriceContainerElem.childNodes.forEach((child) => {
        const prodQuantity = child.childNodes[0].childNodes[1].value;
        const prodPrice = Number(child.childNodes[1].childNodes[1].value);
        quantityPriceData.push({
          quantity: prodQuantity,
          price: Number(prodPrice),
        });
      });

      createProductMutation.mutate({
        name: createText,
        sellingPrice: quantityPriceData,
        vegTag: vegTagCreate,
        categoryId: categoryId,
      });

      e.target.reset();
    } catch (error) {
      console.log('Failed to create product', error);
      alert('Failed to create product');
    }
  };

  const handleProductUpdate = (e) => {
    try {
      e.preventDefault();
      const quantityPriceContainerElem = document.getElementById(
        'quantity-price-container'
      ) as HTMLDivElement;

      interface quantityPriceDataInterface {
        quantity: string;
        price: number;
      }

      const quantityPriceData: Array<quantityPriceDataInterface> = [];

      quantityPriceContainerElem.childNodes.forEach((child) => {
        const prodQuantity = child.childNodes[0].childNodes[1].value;
        const prodPrice = Number(child.childNodes[1].childNodes[1].value);
        quantityPriceData.push({
          quantity: prodQuantity,
          price: Number(prodPrice),
        });
      });

      updateProductMutation.mutate({
        id: state.product.id,
        name: createText,
        sellingPrice: quantityPriceData,
        vegTag: vegTagCreate,
        categoryId: categoryId,
      });

      e.target.reset();
    } catch (error) {
      console.log('Failed to update product', error);
      alert('Failed to update product');
    }
  };

  // set category id
  const handleSelectCategory = (categoryId: string) => {
    try {
      setCategoryId(categoryId);
    } catch (error) {
      console.log('Error selecting category', error);
      alert('Error selecting category');
    }
  };

  // Tansatck query hooks
  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
  });

  const {
    isPending: isPendingCategories,
    error: errorCategories,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 600000,
    refetchOnMount: false,
  });

  const {
    isPending: isPendingProducts,
    error: errorProducts,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 600000,
    refetchOnMount: false,
  });

  if (createProductMutation.isPending) {
    return <div> Creating...</div>;
  }

  if (createProductMutation.error) {
    return (
      <div>
        Error in creating product: {createProductMutation.error.message}
      </div>
    );
  }

  if (updateProductMutation.isPending) {
    return <div> Updating...</div>;
  }

  if (updateProductMutation.error) {
    return (
      <div>
        Error in updating product: {updateProductMutation.error.message}
      </div>
    );
  }

  if (isPendingCategories || isPendingProducts) return <>Loading</>;
  if (errorProducts || errorCategories) {
    return (
      <>
        {errorProducts && <div>Error in Products: {errorProducts.message}</div>}
        {errorCategories && (
          <div>Error in Categories: {errorCategories.message}</div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col justify-between p-4">
      <div className="m-2">
        <Card className="w-6/7">
          <CardHeader>
            {isUpdate === false ? (
              <CardTitle className="text-base">Create Product</CardTitle>
            ) : (
              <CardTitle className="text-base">Update Product</CardTitle>
            )}
            <CardDescription>Enter Product details</CardDescription>
          </CardHeader>

          <CardContent>
            <form
              id="product-form"
              onSubmit={isUpdate ? handleProductUpdate : handleProductCreate}
            >
              <div className="grid w-full items-center gap-4">
                {/** NAME PRODUCT */}
                <div
                  className="flex flex-col space-y-1.5"
                  id="product-name-div"
                >
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name of your product"
                    value={createText}
                    onChange={(e) => {
                      setCreateText(e.target.value);
                    }}
                    disabled={isUpdate}
                    required
                  />
                </div>

                <div id="quantity-price-container">
                  <div
                    id="quantity-price-div"
                    className="mb-5 quantity-price-div"
                  >
                    {/** QUANTITY PRODCUT */}
                    <div className="flex flex-col space-y-1.5">
                      {isUpdate ? (
                        <Label htmlFor="quantity">
                          Quantity Size (Optional)
                        </Label>
                      ) : (
                        <Label htmlFor="quantity">Quantity Size</Label>
                      )}
                      <Input
                        placeholder="Example: quarter, half, full, small, medium, large, etc..."
                        type="text"
                        required={!isUpdate}
                      />
                    </div>
                    {/* Product Selling Price */}
                    <div className="flex flex-col space-y-1.5 mt-2">
                      {isUpdate ? (
                        <Label htmlFor="sellingPrice">
                          Selling Price (Optional)
                        </Label>
                      ) : (
                        <Label htmlFor="sellingPrice">Selling Price</Label>
                      )}
                      <Input
                        id="sellingPrice"
                        placeholder="Price in number. example: 90.67"
                        type="number"
                        min={0.0}
                        required={!isUpdate}
                      />
                    </div>
                  </div>
                </div>

                <div
                  id="add-remove-container"
                  className="flex justify-around w-1/6"
                >
                  <div id="add-quantity-btn">
                    <Button onClick={handleAddQuantity}>Add</Button>
                  </div>
                  <div id="remove-quantity-btn">
                    <Button onClick={handleRemoveQuantity}>Remove</Button>
                  </div>
                </div>

                {/** CATEGORY PRODUCT */}
                <div
                  className="flex flex-col space-y-1.5"
                  id="product-category-div"
                >
                  <Label htmlFor="categoryId">Category</Label>
                  <Select required onValueChange={handleSelectCategory}>
                    <SelectTrigger id="categoryCreate">
                      <SelectValue placeholder="Click to Select" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/** veg tag PRODUCT */}
                <div
                  className="flex flex-col space-y-1.5"
                  id="product-veg-tag-div"
                >
                  <Label htmlFor="isVeg">Tag</Label>
                  <RadioGroup required defaultValue="veg">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="veg"
                        id="veg"
                        onClick={() => {
                          setVegTagCreate(true);
                        }}
                      />
                      <Label htmlFor="veg">Veg</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="non-veg"
                        id="non-veg"
                        onClick={() => {
                          setVegTagCreate(false);
                        }}
                      />
                      <Label htmlFor="Non-veg">Non-Veg</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <CardFooter className="flex justify-end">
                {isUpdate === false ? (
                  <Button>Create</Button>
                ) : (
                  <Button>Update</Button>
                )}
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* end: CREATE product */}

      {/* UPDATE PRODUCT */}
      {/* <div className="m-2">
        <Card className="w-6/7">
          <CardHeader>
            <CardTitle>Update Product</CardTitle>
            <CardDescription>
              Select the product to update. Leave blank if youdon't want to
              update.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Select Product to Update</Label>
                  <Select>
                    <SelectTrigger id="productUpdate">
                      <SelectValue placeholder="Click to select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="New Name of Category" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Done</Button>
          </CardFooter>
        </Card>
      </div> */}
      {/* end: update category CATEGORY */}
    </div>
  );
}
