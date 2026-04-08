import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { getProductById, products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";


const ProductDetails = () => {
  const { id } = useParams();
  const product = id ? getProductById(id) : undefined;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-serif text-3xl text-[#4A3828] mb-4">
          Product not found
        </h1>
        <Link to="/products" className="text-[#B8956A] hover:underline">
          Return to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log(`${quantity} x ${product.name} added to cart`);
    // TODO: Implement cart functionality
    addToCart(product, quantity);
      toast.success(`${quantity} x ${product.name} added to cart`);
    
  };
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          product.pairsWellWith?.includes(p.name)),
    )
    .slice(0, 3);

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-[#6B5A4A] hover:text-[#B8956A] mt-18 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-3xl overflow-hidden bg-[#F5F1EB] shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-150 object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#F5F1EB] text-[#B8956A] rounded-full text-xs uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h1 className="font-serif text-5xl text-[#4A3828] mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-serif text-[#4A3828] mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-lg text-[#6B5A4A] mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8 p-6 bg-[#F5F1EB] rounded-2xl">
              <h3 className="text-sm text-[#B8956A] mb-2 uppercase tracking-wide">
                Flavor Notes
              </h3>
              <p className="text-[#4A3828] italic">{product.flavorNotes}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-sm text-[#6B5A4A] mb-2 block uppercase tracking-wide">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full bg-[#F5F1EB] text-[#4A3828] hover:bg-[#E8D9C5] transition-all"
                >
                  −
                </button>
                <span className="text-xl text-[#4A3828] w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-[#F5F1EB] text-[#4A3828] hover:bg-[#E8D9C5] transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl text-[#4A3828] mt-8 mb-8">
              You May Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
