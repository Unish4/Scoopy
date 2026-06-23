import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../services/paymentService";
import { toast } from "sonner";
import { XCircle, RefreshCw, Home, ShoppingCart } from "lucide-react";

export function PaymentFailure() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      try {
        const transactionUuid = searchParams.get('transaction_uuid');
        const status = searchParams.get('status') || 'failed';

        if (transactionUuid) {
          await verifyPayment(transactionUuid, status);
        }
        toast.error('Payment failed or was cancelled');
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Payment failed. Please try again.');
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
          <p className="text-[#6B5A4A]">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>

            <h1 className="font-serif text-4xl text-[#4A3828] mb-4">
              Payment Failed
            </h1>

            <p className="text-[#6B5A4A] mb-8">
              We're sorry, but your payment could not be processed. This could be due to a cancelled transaction or an issue with the payment method.
            </p>

            <div className="bg-[#F5F1EB] rounded-xl p-6 mb-8 text-left">
              <h2 className="font-serif text-xl text-[#4A3828] mb-4">What might have happened?</h2>
              <ul className="text-sm text-[#6B5A4A] space-y-2">
                <li>• The payment was cancelled by you</li>
                <li>• There was insufficient funds in your eSewa account</li>
                <li>• The transaction timed out</li>
                <li>• There was a network connectivity issue</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => navigate('/checkout')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105"
              >
                Try Again
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#B8956A] text-[#B8956A] rounded-full hover:bg-[#F5F1EB] transition-all duration-300"
              >
                View Cart
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 text-[#6B5A4A] hover:text-[#B8956A] transition-colors"
            >
              <Home className="w-5 h-5" />
              Return to Homepage
            </button>
          </div>

          <div className="mt-8 bg-[#F5F1EB] rounded-xl p-6">
            <h3 className="font-serif text-lg text-[#4A3828] mb-2">Need Help?</h3>
            <p className="text-sm text-[#6B5A4A]">
              If you continue to experience issues with payment, please contact our support team. We're here to help you complete your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
