// Payment Method CRUD methods
async getPaymentMethod(id: number): Promise<PaymentMethod | undefined> {
  return this.paymentMethods.get(id);
}

async getUserPaymentMethods(userId: number): Promise<PaymentMethod[]> {
  return Array.from(this.paymentMethods.values()).filter(
    method => method.userId === userId
  );
}

async createPaymentMethod(insertPaymentMethod: InsertPaymentMethod): Promise<PaymentMethod> {
  const id = this.currentPaymentMethodId++;
  const now = new Date();
  const paymentMethod: PaymentMethod = {
    ...insertPaymentMethod,
    id,
    metadata: insertPaymentMethod.metadata || {},
    billingAddress: insertPaymentMethod.billingAddress || {},
    createdAt: now,
    updatedAt: now
  };
  
  // If this is marked as default or if this is the first payment method for the user, make it default
  if (paymentMethod.isDefault || (await this.getUserPaymentMethods(paymentMethod.userId)).length === 0) {
    // Set existing default payment methods to non-default
    const existingMethods = await this.getUserPaymentMethods(paymentMethod.userId);
    for (const method of existingMethods) {
      if (method.isDefault) {
        method.isDefault = false;
        this.paymentMethods.set(method.id, method);
      }
    }
    paymentMethod.isDefault = true;
  }

  this.paymentMethods.set(id, paymentMethod);
  return paymentMethod;
}

async setDefaultPaymentMethod(userId: number, paymentMethodId: number): Promise<PaymentMethod | undefined> {
  const paymentMethod = Array.from(this.paymentMethods.values()).find(
    method => method.id === paymentMethodId && method.userId === userId
  );
  
  if (!paymentMethod) return undefined;
  
  // Set existing default payment methods to non-default
  const existingMethods = await this.getUserPaymentMethods(userId);
  for (const method of existingMethods) {
    const updatedMethod = { ...method, isDefault: method.id === paymentMethodId };
    this.paymentMethods.set(method.id, updatedMethod);
  }
  
  return this.paymentMethods.get(paymentMethodId);
}

// Payment CRUD methods
async getPayment(id: number): Promise<Payment | undefined> {
  return this.payments.get(id);
}

async getOrderPayments(orderId: number): Promise<Payment[]> {
  return Array.from(this.payments.values()).filter(
    payment => payment.orderId === orderId
  );
}

async createPayment(insertPayment: InsertPayment): Promise<Payment> {
  const id = this.currentPaymentId++;
  const now = new Date();
  const payment: Payment = {
    ...insertPayment,
    id,
    metadata: insertPayment.metadata || {},
    createdAt: now,
    updatedAt: now
  };
  
  this.payments.set(id, payment);
  return payment;
}

async updatePaymentStatus(id: number, status: string): Promise<Payment | undefined> {
  const payment = this.payments.get(id);
  if (!payment) return undefined;
  
  const now = new Date();
  const updatedPayment = { 
    ...payment, 
    status, 
    updatedAt: now 
  };
  
  this.payments.set(id, updatedPayment);
  return updatedPayment;
}

// Subscription CRUD methods
async getSubscription(id: number): Promise<Subscription | undefined> {
  return this.subscriptions.get(id);
}

async getUserSubscriptions(userId: number): Promise<Subscription[]> {
  return Array.from(this.subscriptions.values()).filter(
    subscription => subscription.userId === userId
  );
}

async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
  const id = this.currentSubscriptionId++;
  const now = new Date();
  const subscription: Subscription = {
    ...insertSubscription,
    id,
    metadata: insertSubscription.metadata || {},
    cancelAtPeriodEnd: insertSubscription.cancelAtPeriodEnd || false,
    createdAt: now,
    updatedAt: now
  };
  
  this.subscriptions.set(id, subscription);
  return subscription;
}

async updateSubscriptionStatus(id: number, status: string): Promise<Subscription | undefined> {
  const subscription = this.subscriptions.get(id);
  if (!subscription) return undefined;
  
  const now = new Date();
  const updatedSubscription = { 
    ...subscription, 
    status, 
    updatedAt: now 
  };
  
  this.subscriptions.set(id, updatedSubscription);
  return updatedSubscription;
}

async cancelSubscription(id: number): Promise<Subscription | undefined> {
  const subscription = this.subscriptions.get(id);
  if (!subscription) return undefined;
  
  const now = new Date();
  const updatedSubscription = { 
    ...subscription, 
    cancelAtPeriodEnd: true, 
    updatedAt: now 
  };
  
  this.subscriptions.set(id, updatedSubscription);
  return updatedSubscription;
}

// Email Notification CRUD methods
async getEmailNotification(id: number): Promise<EmailNotification | undefined> {
  return this.emailNotifications.get(id);
}

async getUserEmailNotifications(userId: number): Promise<EmailNotification[]> {
  return Array.from(this.emailNotifications.values()).filter(
    notification => notification.userId === userId
  );
}

async createEmailNotification(insertEmailNotification: InsertEmailNotification): Promise<EmailNotification> {
  const id = this.currentEmailNotificationId++;
  const now = new Date();
  const emailNotification: EmailNotification = {
    ...insertEmailNotification,
    id,
    metadata: insertEmailNotification.metadata || {},
    createdAt: now
  };
  
  this.emailNotifications.set(id, emailNotification);
  return emailNotification;
}

async updateEmailNotificationStatus(id: number, status: string, sentAt?: Date): Promise<EmailNotification | undefined> {
  const notification = this.emailNotifications.get(id);
  if (!notification) return undefined;
  
  const now = sentAt || new Date();
  const updatedNotification = { 
    ...notification, 
    status, 
    sentAt: status === 'sent' ? now : notification.sentAt 
  };
  
  this.emailNotifications.set(id, updatedNotification);
  return updatedNotification;
}