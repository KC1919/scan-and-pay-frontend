import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { Icategory } from '../types/categoryType';

export function CategoryForm() {
  const [createText, setCreateText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [selectedCategory, setSelectCategory] = useState('');

  const createCategory = async (name: string) => {
    try {
      const categoryNameInputElem = document.getElementById(
        'category-name-input'
      ) as HTMLInputElement;

      categoryNameInputElem.innerText = '';

      const response = await (
        await fetch('http://localhost:3000/api/v1/category/create', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        })
      ).json();

      console.log(response);

      if (response.success === true) {
        alert('Category created successfully');
      } else if (response.success === false) {
        alert('Failed to creaete category');
      }
    } catch (error) {
      console.log('Failed to create category', error);
      alert('Failed to create category');
    }
  };

  const updateCategory = async ({ categoryId, categoryName }) => {
    try {
      const response = await (
        await fetch(
          `http://localhost:3000/api/v1/category/update/${categoryId}`,
          {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),
          }
        )
      ).json();

      if (response.success === true) {
        alert('Category updated successfully');
      } else if (response.success === false) {
        alert('Failed to update category');
      }
    } catch (error) {
      console.log('Failed to update category', error);
      alert('Failed to update category');
    }
  };

  const fetchCategories = async () => {
    const response = await (
      await fetch('http://localhost:3000/api/v1/category/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

    console.log('Resonse:', response);
    return response.content.data;
  };

  const handleCategorySelect = (categoryId: string) => {
    try {
      setSelectCategory(categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryCreate = (e) => {
    e.preventDefault();
    createCategoryMutation.mutate(createText);
  };

  const handleCategoryUpdate = (e) => {
    e.preventDefault();
    updateCategoryMutation.mutate({
      categoryId: selectedCategory,
      categoryName: updateText,
    });
  };

  const {
    isPending: isCategoryPending,
    error: isCategoryError,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 600000,
    refetchOnMount: false,
  });

  // mutation to create catgeory
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
  });

  if (isCategoryPending) {
    return <div className="m-4 text-center w-auto">Fetching Categories...</div>;
  }

  if (isCategoryError) {
    return (
      <div className="m-4 text-center w-auto">Error Fetching Categories...</div>
    );
  }

  if (createCategoryMutation.isPending) {
    return <div className="m-4 text-center w-auto"> Creating...</div>;
  }

  if (createCategoryMutation.error) {
    return (
      <div className="m-4 text-center w-auto">
        {' '}
        Error: {createCategoryMutation.error.message}
      </div>
    );
  }

  if (updateCategoryMutation.isPending) {
    return <div className="m-4 text-center w-auto"> Updating...</div>;
  }

  if (updateCategoryMutation.error) {
    return (
      <div className="m-4 text-center w-auto">
        {' '}
        Error: {updateCategoryMutation.error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between p-4">
      <div className="m-2">
        <Card className="w-6/7">
          <CardHeader>
            <CardTitle className="base">Create Category</CardTitle>
            <CardDescription>Write the name of NEW category.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="category-create-form" onSubmit={handleCategoryCreate}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="category-name-input"
                    required
                    placeholder="Name of your project"
                    value={createText}
                    onChange={(e) => {
                      setCreateText(e.target.value);
                    }}
                  />
                </div>
              </div>
              <CardFooter className="flex justify-end">
                <Button className="mt-7">Create</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* end: CREATE CATEGORY */}

      <div className="m-2">
        <Card className="w-6/7">
          <CardHeader>
            <CardTitle>Rename Category</CardTitle>
            <CardDescription>Update name of category.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCategoryUpdate}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Select category to Rename</Label>
                  <Select onValueChange={handleCategorySelect}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Click to Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categories
                        ? categories.map((cat: Icategory) => {
                            return (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            );
                          })
                        : null}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="update-category-input"
                    placeholder="New Name of Category"
                    value={updateText}
                    required
                    onChange={(e) => {
                      setUpdateText(e.target.value);
                    }}
                  />
                </div>
              </div>
              <CardFooter className="flex justify-end">
                <Button className="mt-2">Update</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* end: update category CATEGORY */}
    </div>
  );
}
