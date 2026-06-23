import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { initiatePayment } from "../services/paymentService";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, ShoppingBag, Truck, Shield } from "lucide-react";

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, loading } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handlePayment = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsProcessing(true);
      const paymentData = await initiatePayment(total);

      // Create a form and submit it to eSewa
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentData.paymentUrl;

      Object.keys(paymentData.paymentData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paymentData.paymentData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to initiate payment');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto mt-10 px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8956A] mx-auto mb-6"></div>
          <p className="text-[#6B5A4A]">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto mt-10 px-6 text-center">
          <ShoppingBag className="w-20 h-20 text-[#E8D9C5] mx-auto mb-6" />
          <h1 className="font-serif text-4xl text-[#4A3828] mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-[#6B5A4A] mb-8">
            Add some items to your cart before checkout.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105"
          >
            Browse Products
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-[#6B5A4A] hover:text-[#B8956A] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cart
        </button>

        <h1 className="font-serif text-4xl text-[#4A3828] mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-serif text-2xl text-[#4A3828] mb-6">Order Items</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.productId} className="flex gap-4 pb-4 border-b border-[#E8D9C5] last:border-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5F1EB] shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-[#4A3828]">{item.name}</h3>
                      <p className="text-sm text-[#6B5A4A]">{item.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-[#6B5A4A]">Qty: {item.quantity}</p>
                        <p className="text-[#4A3828] font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-serif text-2xl text-[#4A3828] mb-6">Payment Method</h2>
              <div className="flex items-center gap-4 p-4 border-2 border-[#B8956A] rounded-xl bg-[#F5F1EB]">
                <CreditCard className="w-8 h-8 text-[#B8956A]" />
                <div>
                  <p className="font-semibold text-[#4A3828]">eSewa</p>
                  <p className="text-sm text-[#6B5A4A]">Pay securely with eSewa</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-serif text-2xl text-[#4A3828] mb-6">Why eSewa?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4">
                  <Shield className="w-8 h-8 text-[#B8956A] mb-2" />
                  <p className="text-sm text-[#6B5A4A]">Secure Payment</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <Truck className="w-8 h-8 text-[#B8956A] mb-2" />
                  <p className="text-sm text-[#6B5A4A]">Fast Processing</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <CreditCard className="w-8 h-8 text-[#B8956A] mb-2" />
                  <p className="text-sm text-[#6B5A4A]">Easy to Use</p>
                </div>
              </div>
            </div>
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

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Pay with eSewa
                    <CreditCard className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-[#6B5A4A] text-center mt-4">
                By proceeding, you agree to eSewa's terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
