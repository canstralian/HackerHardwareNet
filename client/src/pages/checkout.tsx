import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutForm } from "@/components/payment-form";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const [location, navigate] = useLocation();
  const [isComplete, setIsComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { toast } = useToast();

  // In a real app, this data would be passed via state management
  // or retrieved from a cart/session API
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "WiFi Pineapple Basic Kit",
      description: "Portable wireless auditing platform",
      price: 99.99,
      quantity: 1,
      imageUrl: "/assets/wifi-pineapple.png",
    },
    {
      id: 2,
      name: "RFID Hacking Fundamentals Course",
      description: "Comprehensive course on RFID security",
      price: 129.99,
      quantity: 1,
      imageUrl: "/assets/rfid-course.png",
    },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckoutComplete = (result: any) => {
    setIsComplete(true);
    setOrderDetails(result);
    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${result.id} has been confirmed.`,
    });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleContinueShopping = () => {
    navigate("/hardware-library");
  };

  const handleViewOrder = () => {
    navigate(`/dashboard`);
  };

  if (isComplete) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="w-full">
          <CardHeader className="bg-green-50 border-b">
            <CardTitle className="text-center text-green-700">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Order Complete
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Thank you for your order!
            </h2>
            <p className="text-gray-600 mb-6">
              Your order #{orderDetails?.id} has been successfully placed. You'll
              receive a confirmation email shortly.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button variant="outline" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
              <Button onClick={handleViewOrder}>View Order Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex border-b pb-4 last:border-b-0"
                  >
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span>${item.price.toFixed(2)}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-7">
          <CheckoutForm
            items={cartItems}
            total={calculateTotal()}
            onComplete={handleCheckoutComplete}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;