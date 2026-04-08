import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

export function Cart() {
  const { items, updateQuantity, removeFromCart, getTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SCOOPY04") {
      toast.success("Promo code applied! 10% discount");
    } else if (promoCode) {
      toast.error("Invalid promo code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto mt-10 px-6 text-center">
          <ShoppingBag className="w-20 h-20 text-[#E8D9C5] mx-auto mb-6" />
          <h1 className="font-serif text-4xl text-[#4A3828] mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-[#6B5A4A] mb-8">
            Discover our collection of handcrafted artisan ice cream.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="font-serif text-4xl text-[#4A3828] mt-18 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#F5F1EB] shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/products/${item.product.id}`}
                        className="font-serif text-xl text-[#4A3828] hover:text-[#B8956A] transition-colors mb-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-[#6B5A4A] mb-2">
                        {item.product.category}
                      </p>
                      <p className="text-lg text-[#4A3828]">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-[#F5F1EB] text-[#4A3828] hover:bg-[#E8D9C5] transition-all"
                        >
                          −
                        </button>
                        <span className="text-[#4A3828] w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[#F5F1EB] text-[#4A3828] hover:bg-[#E8D9C5] transition-all"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#6B5A4A] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="font-serif text-2xl text-[#4A3828] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#6B5A4A]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B5A4A]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-[#B8956A]">
                    Spend ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t border-[#E8D9C5] pt-4">
                  <div className="flex justify-between text-lg text-[#4A3828]">
                    <span>Total</span>
                    <span className="font-serif text-2xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-[#6B5A4A] mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-[#E8D9C5] rounded-lg text-sm focus:outline-none focus:border-[#B8956A] transition-colors"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-[#F5F1EB] text-[#4A3828] rounded-lg text-sm hover:bg-[#E8D9C5] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105 shadow-lg mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/products"
                className="block text-center text-[#6B5A4A] hover:text-[#B8956A] text-sm transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
