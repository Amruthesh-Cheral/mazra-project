import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be positive'],
  },
  discountPercent: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100'],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Fruits", "Vegitables", "Plants", "Seeds", "Other"],
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

// Auto-generate slug from name before save
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
