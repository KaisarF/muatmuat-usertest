'use client'

import Image from "next/image";
import api from "@/api"
import { useState, useEffect,useActionState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { createProductSchema } from "./utils/rules";
import { getInitialData } from "./utils/initialData";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Poke{
  name:string,
  url:string
}
const initialState = {
  errors: undefined,
  message: undefined,
};
export default function Home() {
  
  const[pokeData, setPokeData] = useState<Poke[]>([])
  const[productData, setProductData] = useState(getInitialData)
  const[formData, setFormData] = useState({
    title:'',
    price:'',
    stock:''
})
  useEffect(()=>{
    const getPokeData = async()=>{
      const response = await api.get('/ability/')
      setPokeData(response.data.results)
      
    }

    getPokeData()
  },[])

  const addProduct =(e)=>{

    const validatedData = createProductSchema.safeParse(formData)

    if(!validatedData.success){
      return {
      errors: validatedData.error.flatten().fieldErrors,
    };
    }

    e.preventDefault();
    console.log(formData)
    setProductData([...productData,{
      id: Date.now(),
        productTitle:validatedData.data.productTitle,
        productPrice:validatedData.data.productPrice,
        productStock:validatedData.data.productStock,
        createdAt:new Date().toISOString()
    }])
    
    setFormData({
      title:'',
      price:'',
      stock:''
    })
    console.log(productData)
  }

  // const editHandler=(product)=>{
  //   setFormData({
  //     title:product.title,
  //     price:product.price,
  //     stock:product.stock
  //   })
  // }

  // const editProduct=(id,e)=>{
  //   e.preventDefault()
  //   const editedProduct = productData.find((product)=>product.id ===id)
  //   editedProduct.productTitle=formData.title
  //   editedProduct.productPrice=formData.price
  //   editedProduct.productStock=formData.stock
  //   setFormData({
  //     title:'',
  //     price:'',
  //     stock:''
  //   })
  //   console.log(editedProduct)
  // }

  const deleteProduct = (id,e)=>{
    e.preventDefault()
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setProductData(productData.filter((product)=>product.id !==id))
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success"
        });
      }
});
    
  }

  const resetForm = () => {
      setFormData({ title: '', price: '', stock: '' });
    }

  return (
    <div className="flex flex-col gap-10 w-full h-full py-10 justify-center items-center">
      <div>
        <div className="flex justify-between my-10">
          <h1>Product List</h1>
          <Dialog>
            <DialogTrigger><Button className="bg-[#0046FF]" > tambah produk</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add product?</DialogTitle>
              </DialogHeader>
              <form onSubmit={addProduct} className="flex flex-col gap-5 p-5">
                <Label htmlFor="productName">nama produk</Label>
                <Input type="text" 
                value={formData.title} 
                onChange={(e)=>setFormData(prev => ({...prev, title: e.target.value}))}/>
                
                <Label htmlFor="productPrice">harga produk produk</Label>
                <Input type="text" 
                value={formData.price} 
                onChange={(e)=>setFormData(prev => ({...prev, price: e.target.value}))}/>
                
                <Label htmlFor="productStock">jumlah produk</Label>
                <Input type="text" 
                value={formData.stock}
                onChange={(e)=>setFormData(prev => ({...prev, stock: e.target.value}))} 
                />
                <Button type="submit" >Tambahkan</Button>
              </form>
              <DialogClose asChild>
                <Button type="button" onClick={resetForm}>
                  Batalkan
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          
        </div>
        <div>
          {productData.length > 0 ?(
            <div className="grid grid-cols-4 gap-4">
              {productData.map((product)=>(
                <Card key={product.id} className="p-10">
                  <CardHeader>{product.productTitle}</CardHeader>
                  <CardContent className="flex flex-col items-center justify-center" >
                    <h1>{product.productPrice}</h1>
                    <h1>{product.productStock}</h1>
                    <div className="flex my-5 flex-row gap-4" >
                      {/* edit data */}
                      {/* <Dialog>
                        <DialogTrigger><Button 
                          className="bg-[#7ADAA5]" 
                          onClick={()=>editHandler(product)}
                          >edit</Button></DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add product?</DialogTitle>
                          </DialogHeader>
                          <form  className="flex flex-col gap-5 p-5">
                            <Label htmlFor="productName">nama produk</Label>
                            <Input type="text" 
                            value={formData.title} 
                            onChange={(e)=>setFormData(prev => ({...prev, title: e.target.value}))}/>
                            
                            <Label htmlFor="productPrice">harga produk produk</Label>
                            <Input type="text" 
                            value={formData.price} 
                            onChange={(e)=>setFormData(prev => ({...prev, price: e.target.value}))}/>
                            
                            <Label htmlFor="productStock">jumlah produk</Label>
                            <Input type="text" 
                            value={formData.stock}
                            onChange={(e)=>setFormData(prev => ({...prev, stock: e.target.value}))} 
                            />

                            <Button type="submit" onClick={(e)=>editProduct(product.id,e)} >Tambahkan</Button>
                          </form>
                          <DialogClose asChild>
                            <Button type="button" onClick={resetForm}>
                              Batalkan
                            </Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog> */}

                      {/* delete data */}
                      <Button variant={"destructive"}
                      onClick={(e)=>deleteProduct(product.id,e)}
                      >hapus</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ):(
            <h1>there are no products</h1>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1>POKE abilty</h1>
        <div className=" flex w-[500px] h-[300px] overflow-y-scroll" >
          <Table className="w-56">
            <TableCaption>A list of your poke abilty</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>name</TableHead>
                <TableHead>link</TableHead>
                <TableHead>detail</TableHead>
                
              </TableRow>
            </TableHeader>
              {pokeData.length > 0 ? (
                <TableBody>
                  {pokeData.map((poke)=>(
                    <TableRow key={poke.url}>
                      <TableCell>{poke.name}</TableCell>
                      <TableCell>{poke.url}</TableCell>
                      <TableCell>
                          <Link href={`/pokeDetail/${poke.name}`}>
                            Detail
                          </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            ):(
              <TableRow>
                <TableCell colSpan={3} > data not found</TableCell>
              </TableRow>
            )}
              
          </Table>
        </div>
      </div>
    </div>
  );
}
