import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        {product.isFlavorOfMonth && (
          <div className="absolute top-4 right-4 z-10 bg-[#B8956A] text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs">
            <Sparkles className="w-3 h-3" />
            <span>Flavor of the Month</span>
          </div>
        )}

        <div className="aspect-square overflow-hidden bg-[#F5F1EB]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-6">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wider text-[#B8956A]">
              {product.category}
            </span>
          </div>
          <h3 className="font-serif text-xl text-[#4A3828] mb-2 group-hover:text-[#B8956A] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#6B5A4A] text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-serif text-[#4A3828]">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleQuickAdd}
              className="p-3 bg-[#FAF8F5] rounded-full hover:bg-[#B8956A] hover:text-white transition-all duration-300 hover:scale-110 group/btn"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
