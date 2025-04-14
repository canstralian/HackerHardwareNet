import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

// Define validation schema for payment method form
const paymentMethodSchema = z.object({
  type: z.string().min(1, { message: "Payment type is required" }),
  provider: z.string().min(1, { message: "Provider is required" }),
  accountNumber: z.string()
    .min(13, { message: "Card number must be at least 13 digits" })
    .max(19, { message: "Card number must be at most 19 digits" })
    .regex(/^\d+$/, { message: "Card number must contain only digits" }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Must be in format MM/YY" }),
  cardholderName: z.string().min(1, { message: "Cardholder name is required" }),
  billingAddress: z.object({
    street: z.string().min(1, { message: "Street is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
    country: z.string().min(1, { message: "Country is required" }),
  }),
  isDefault: z.boolean().default(false),
});

type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>;

interface PaymentFormProps {
  onSuccess?: (paymentMethod: any) => void;
  onCancel?: () => void;
}

export function PaymentForm({ onSuccess, onCancel }: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form with default values
  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: "credit_card",
      provider: "visa",
      accountNumber: "",
      expiryDate: "",
      cardholderName: "",
      billingAddress: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      isDefault: true,
    },
  });

  // Handle form submission
  const onSubmit = async (values: PaymentMethodFormValues) => {
    setIsSubmitting(true);
    try {
      // Format the data for API submission
      const paymentMethodData = {
        type: values.type,
        provider: values.provider,
        accountNumber: values.accountNumber,
        expiryDate: values.expiryDate,
        billingAddress: values.billingAddress,
        isDefault: values.isDefault,
        metadata: {
          cardholderName: values.cardholderName,
        }
      };

      // Submit payment method to API
      const response = await apiRequest('/api/payment-methods', {
        method: 'POST',
        data: paymentMethodData,
      });

      // Invalidate payment methods query cache to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/payment-methods'] });

      toast({
        title: "Payment Method Added",
        description: "Your payment method has been successfully added.",
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast({
        title: "Error",
        description: "Failed to add payment method. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to format card number with spaces as user types
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Function to format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Payment Method</CardTitle>
        <CardDescription>
          Enter your payment details to complete your purchase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Type</FormLabel>
                  <FormControl>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      {...field}
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="amex">American Express</option>
                      <option value="discover">Discover</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="4111 1111 1111 1111" 
                      {...field} 
                      onChange={(e) => {
                        const formattedValue = formatCardNumber(e.target.value);
                        form.setValue('accountNumber', formattedValue.replace(/\s/g, ''));
                        e.target.value = formattedValue;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date (MM/YY)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="MM/YY" 
                      {...field} 
                      onChange={(e) => {
                        const formattedValue = formatExpiryDate(e.target.value);
                        form.setValue('expiryDate', formattedValue);
                        e.target.value = formattedValue;
                      }}
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <h3 className="text-md font-medium">Billing Address</h3>

              <FormField
                control={form.control}
                name="billingAddress.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="billingAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="billingAddress.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="billingAddress.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="billingAddress.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Make Default</FormLabel>
                    <p className="text-sm text-gray-500">
                      Set this as your default payment method
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Save Payment Method"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Component to display saved payment methods
interface PaymentMethodsListProps {
  paymentMethods: any[];
  onSelect?: (method: any) => void;
  selectedId?: number;
}

export function PaymentMethodsList({ 
  paymentMethods, 
  onSelect, 
  selectedId 
}: PaymentMethodsListProps) {
  if (!paymentMethods || paymentMethods.length === 0) {
    return (
      <Card className="p-4 text-center">
        <p className="text-gray-500">No payment methods available</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <Card 
          key={method.id} 
          className={`cursor-pointer hover:bg-gray-50 ${
            selectedId === method.id ? "border-2 border-primary" : ""
          }`}
          onClick={() => onSelect && onSelect(method)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="font-medium capitalize">{method.provider}</span>
                  {method.isDefault && (
                    <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  •••• •••• •••• {method.accountNumber.substring(method.accountNumber.length - 4)}
                </p>
                <p className="text-xs text-gray-500">Expires {method.expiryDate}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedId === method.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                    ✓
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Component to handle order checkout
interface CheckoutFormProps {
  items: any[];
  total: number;
  onComplete: (result: any) => void;
  onCancel: () => void;
}

export function CheckoutForm({ 
  items, 
  total, 
  onComplete, 
  onCancel 
}: CheckoutFormProps) {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Load payment methods on component mount
  React.useEffect(() => {
    const fetchPaymentMethods = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest('/api/payment-methods', {
          method: 'GET',
        });
        setPaymentMethods(response || []);
        
        // Select default payment method if available
        const defaultMethod = response.find((m: any) => m.isDefault);
        if (defaultMethod) {
          setSelectedMethodId(defaultMethod.id);
        } else if (response.length > 0) {
          setSelectedMethodId(response[0].id);
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        toast({
          title: "Error",
          description: "Failed to load payment methods.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [toast]);

  const handlePaymentMethodAdded = (method: any) => {
    setPaymentMethods([...paymentMethods, method]);
    setSelectedMethodId(method.id);
    setShowAddForm(false);
  };

  const handleProcessPayment = async () => {
    if (!selectedMethodId) {
      toast({
        title: "Payment Method Required",
        description: "Please select or add a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Prepare order data
      const orderData = {
        paymentMethodId: selectedMethodId,
        items: items.map(item => ({
          merchandiseId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        amount: total,
        currency: "USD",
        status: "pending"
      };

      // Submit order to API
      const response = await apiRequest('/api/orders', {
        method: 'POST',
        data: orderData,
      });

      toast({
        title: "Order Placed Successfully",
        description: `Your order #${response.id} has been placed.`,
      });

      // Call completion callback with order details
      onComplete(response);
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (showAddForm) {
    return (
      <div className="mt-4">
        <PaymentForm 
          onSuccess={handlePaymentMethodAdded}
          onCancel={() => setShowAddForm(false)}
        />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Complete your purchase</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(true)}
              size="sm"
            >
              Add New
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center p-4">Loading payment methods...</div>
          ) : (
            <PaymentMethodsList 
              paymentMethods={paymentMethods}
              onSelect={(method) => setSelectedMethodId(method.id)}
              selectedId={selectedMethodId || undefined}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleProcessPayment}
          disabled={isProcessing || !selectedMethodId}
        >
          {isProcessing ? "Processing..." : "Complete Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
}