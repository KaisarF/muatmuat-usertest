import { z } from 'zod'; 

export const createProductSchema = z.object({
  productTitle: z.string().min(4, { message: "Please enter your product name" }),
  productPrice: z.number().min(1, { message: "please enter your product price" }),
  productStock: z.number().min(1, { message: "please enter your product stock" }),
  

});