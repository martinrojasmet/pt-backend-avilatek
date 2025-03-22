import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import m2s from "mongoose-to-swagger";

export const userSchema = m2s(User);
export const productSchema = m2s(Product);
export const orderSchema = m2s(Order);