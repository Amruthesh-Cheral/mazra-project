import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { createProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.post(
  '/',
  verifyToken,
  authorizeRoles('Admin'),
  upload.array('images', 5), // max 5 images
  createProduct
);

export default productRouter;