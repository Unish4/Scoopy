import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../services/paymentService";
import { toast } from "sonner";
import { CheckCircle, Home, Package } from "lucide-react";

export function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      try {
        const transactionUuid = searchParams.get('transaction_uuid');
        const status = searchParams.get('status') || 'success';

        if (transactionUuid) {
          const result = await verifyPayment(transactionUuid, status);
          setOrderDetails(result);
          toast.success('Payment successful! Your order has been confirmed.');
        } else {
          toast.success('Payment successful!');
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Payment was successful but verification failed. Please contact support.');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPaymentStatus();
  }, [searchParams]);

  if (isVerifying) {
    return (
      <div className="py-20">
        <div className="container mx-auto mt-10 px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8956A] mx-auto mb-6"></div>
          <p className="text-[#6B5A4A]">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>

            <h1 className="font-serif text-4xl text-[#4A3828] mb-4">
              Payment Successful!
            </h1>

            <p className="text-[#6B5A4A] mb-8">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>

            {orderDetails && (
              <div className="bg-[#F5F1EB] rounded-xl p-6 mb-8 text-left">
                <h2 className="font-serif text-xl text-[#4A3828] mb-4">Order Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B5A4A]">Order ID:</span>
                    <span className="text-[#4A3828] font-mono">{orderDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5A4A]">Payment Status:</span>
                    <span className="text-green-600 font-semibold capitalize">{orderDetails.paymentStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5A4A]">Order Status:</span>
                    <span className="text-[#4A3828] font-semibold capitalize">{orderDetails.status}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/products')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105"
              >
                Continue Shopping
                <Package className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#B8956A] text-[#B8956A] rounded-full hover:bg-[#F5F1EB] transition-all duration-300"
              >
                Go to Homepage
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 bg-[#F5F1EB] rounded-xl p-6">
            <h3 className="font-serif text-lg text-[#4A3828] mb-2">What's Next?</h3>
            <ul className="text-sm text-[#6B5A4A] space-y-2 text-left">
              <li>• You will receive an order confirmation email shortly</li>
              <li>• Our team will prepare your order for shipping</li>
              <li>• You can track your order status in your profile</li>
              <li>• For any queries, contact our support team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
