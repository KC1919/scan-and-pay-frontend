import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

import { Icategory } from '../types/categoryType';

// call back
const createCategory = async (name: string) => {
  console.log('name in createCategoryCB', name);
  await axios
    .post(
      'http://localhost:3000/api/v1/products/category',
      { name },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      console.log('Response creating catgeory:', response.data);
    })
    .catch((error) => {
      console.log('ERROR creating catgeory:', error);
    });
  // fetch("http://localhost:3000/api/v1/products/category", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ name }),
  // });
};

const fetchCategories = async () => {
  const response = await (
    await fetch('http://localhost:3000/api/v1/products/category/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  console.log('Resonse:', response);
  return response.content.data;
};

export function CategoryForm2() {
  const [createText, setCreateText] = useState('');

  const {
    isPending: isCategoryPending,
    error: isCategoryError,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10000,
    refetchOnMount: false,
  });

  // mutation to create catgeory
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
  });

  if(isCategoryPending){
    return <div>Fetching Categories...</div>
  }

  if(isCategoryError){
    return <div>Error Fetching Categories...</div>
  }

  if (createCategoryMutation.isPending) {
    return <div> Creating...</div>;
  }

  if (createCategoryMutation.error) {
    return <div> Error: {createCategoryMutation.error.message}</div>;
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
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of your project"
                    value={createText}
                    onChange={(e) => {
                      setCreateText(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => createCategoryMutation.mutate(createText)}>
              Done
            </Button>
          </CardFooter>
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
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Select category to Rename</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Click to Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categories
                        ? categories.map((cat: Icategory) => {
                            return (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            );
                          })
                        : null}
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
      </div>
      {/* end: update category CATEGORY */}
    </div>
  );
}
