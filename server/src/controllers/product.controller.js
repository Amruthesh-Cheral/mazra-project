import cloudinary from '../config/cloudinary.js';
import catchAsync from '../middlewares/catchAsync.js';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';
import sharp from 'sharp';
import fs from 'fs/promises';

export const createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    price,
    discountPercent,
    category,
    stock,
    isFeatured,
  } = req.body;

  if (!name || !description || !price || !category || !stock) {
    return next(new ApiError(400, 'Missing required product fields'));
  }

  if (!req.files || req.files.length === 0) {
    return next(new ApiError(400, 'Product images are required'));
  }

  const uploadedImages = [];

  try {
    for (const file of req.files) {
  const compressedPath = `uploads/compressed-${file.filename}`;

  await sharp(file.path)
    .resize(1024) // resize width (auto height)
    .jpeg({ quality: 70 }) // compress
    .toFile(compressedPath);

  const result = await cloudinary.uploader.upload(compressedPath, {
    folder: 'products',
  });

  uploadedImages.push({
    url: result.secure_url,
    public_id: result.public_id,
  });

  // Delete both original and compressed files
  await fs.unlink(file.path);
  await fs.unlink(compressedPath);
}
  } catch (error) {
    console.log(error);
    
    return next(new ApiError(500, 'Image upload failed'));
  }

  const product = await Product.create({
    name,
    description,
    price,
    discountPercent,
    category,
    stock,
    isFeatured,
    images: uploadedImages,
  });

  res.status(201).json({
    success: true,
    data: product,
    message: 'Product created successfully',
  });
});
