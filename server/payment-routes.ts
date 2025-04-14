import { Router } from 'express';
import { z } from 'zod';
import { storage } from './storage';
import { insertPaymentMethodSchema, insertPaymentSchema, insertOrderSchema, insertOrderItemSchema } from '../shared/schema';

const router = Router();

// Payment Method endpoints
router.get('/payment-methods', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const userId = req.user.id;
  const paymentMethods = await storage.getUserPaymentMethods(userId);
  
  res.json(paymentMethods);
});

router.post('/payment-methods', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const userId = req.user.id;
    const paymentMethodData = insertPaymentMethodSchema.parse({
      ...req.body,
      userId
    });
    
    const paymentMethod = await storage.createPaymentMethod(paymentMethodData);
    res.status(201).json(paymentMethod);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create payment method' });
  }
});

router.post('/payment-methods/:id/set-default', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const userId = req.user.id;
  const paymentMethodId = parseInt(req.params.id);
  
  if (isNaN(paymentMethodId)) {
    return res.status(400).json({ error: 'Invalid payment method ID' });
  }
  
  try {
    const updatedMethod = await storage.setDefaultPaymentMethod(userId, paymentMethodId);
    
    if (!updatedMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }
    
    res.json(updatedMethod);
  } catch (error) {
    res.status(500).json({ error: 'Failed to set default payment method' });
  }
});

// Orders endpoints
router.get('/orders', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const userId = req.user.id;
  const orders = await storage.getUserOrders(userId);
  
  // For each order, get the order items and payments
  const ordersWithDetails = await Promise.all(orders.map(async (order) => {
    const items = await storage.getOrderItems(order.id);
    const payments = await storage.getOrderPayments(order.id);
    
    return {
      ...order,
      items,
      payments
    };
  }));
  
  res.json(ordersWithDetails);
});

router.get('/orders/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const orderId = parseInt(req.params.id);
  
  if (isNaN(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID' });
  }
  
  const order = await storage.getOrder(orderId);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  // Check if the order belongs to the user
  if (order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  const items = await storage.getOrderItems(orderId);
  const payments = await storage.getOrderPayments(orderId);
  
  res.json({
    ...order,
    items,
    payments
  });
});

// Create a new order
router.post('/orders', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const userId = req.user.id;
    
    // Validate order data
    const orderData = insertOrderSchema.parse({
      ...req.body,
      userId,
      status: 'pending' // Initial status is always pending
    });
    
    // Create the order
    const order = await storage.createOrder(orderData);
    
    // Create order items
    if (Array.isArray(req.body.items)) {
      for (const item of req.body.items) {
        const orderItemData = insertOrderItemSchema.parse({
          ...item,
          orderId: order.id
        });
        
        await storage.createOrderItem(orderItemData);
      }
    }
    
    // If there's a payment method ID, create a payment
    if (req.body.paymentMethodId) {
      const paymentData = insertPaymentSchema.parse({
        userId,
        orderId: order.id,
        paymentMethodId: req.body.paymentMethodId,
        amount: req.body.amount,
        currency: req.body.currency || 'USD',
        status: 'processing'
      });
      
      await storage.createPayment(paymentData);
      
      // In a real app, we would call an external payment processor here
      // For now, we'll just simulate a successful payment
      // await processPayment(paymentData);
    }
    
    // Generate an order confirmation email notification
    await storage.createEmailNotification({
      userId,
      type: 'order_confirmation',
      recipientEmail: req.user.email,
      subject: `Order Confirmation #${order.id}`,
      content: `Thank you for your order!`,
      status: 'pending',
      metadata: { orderId: order.id }
    });
    
    // Get the complete order with items and payments
    const items = await storage.getOrderItems(order.id);
    const payments = await storage.getOrderPayments(order.id);
    
    res.status(201).json({
      ...order,
      items,
      payments
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
router.patch('/orders/:id/status', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const orderId = parseInt(req.params.id);
  
  if (isNaN(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID' });
  }
  
  const { status } = req.body;
  
  if (!status || typeof status !== 'string') {
    return res.status(400).json({ error: 'Status is required' });
  }
  
  // Validate status
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  try {
    const order = await storage.getOrder(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Only allow the user who created the order or an admin to update it
    if (order.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const updatedOrder = await storage.updateOrderStatus(orderId, status);
    
    // If the status changed to shipped, send a shipping notification
    if (status === 'shipped') {
      await storage.createEmailNotification({
        userId: order.userId,
        type: 'order_shipped',
        recipientEmail: req.user.email,
        subject: `Your Order #${orderId} Has Shipped`,
        content: `Your order has been shipped and is on its way!`,
        status: 'pending',
        metadata: { orderId }
      });
    }
    
    // If the status changed to delivered, send a delivery notification
    if (status === 'delivered') {
      await storage.createEmailNotification({
        userId: order.userId,
        type: 'order_delivered',
        recipientEmail: req.user.email,
        subject: `Your Order #${orderId} Has Been Delivered`,
        content: `Your order has been delivered. Thank you for shopping with us!`,
        status: 'pending',
        metadata: { orderId }
      });
    }
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Course purchase endpoint
router.post('/courses/:id/purchase', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const courseId = parseInt(req.params.id);
  
  if (isNaN(courseId)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }
  
  const { paymentMethodId } = req.body;
  
  if (!paymentMethodId) {
    return res.status(400).json({ error: 'Payment method ID is required' });
  }
  
  try {
    const userId = req.user.id;
    const course = await storage.getCourse(courseId);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    // Check if the user already has this course
    const existingUserCourse = await storage.getUserCourse(userId, courseId);
    if (existingUserCourse) {
      return res.status(400).json({ error: 'You already own this course' });
    }
    
    // Create an order for the course
    const order = await storage.createOrder({
      userId,
      status: 'pending',
      type: 'course',
      total: course.price,
      currency: 'USD',
      shippingAddress: null,
      notes: null
    });
    
    // Create an order item for the course
    await storage.createOrderItem({
      orderId: order.id,
      courseId,
      quantity: 1,
      price: course.price,
      merchandiseId: null
    });
    
    // Create a payment for the order
    const payment = await storage.createPayment({
      userId,
      orderId: order.id,
      paymentMethodId,
      amount: course.price,
      currency: 'USD',
      status: 'processing',
      metadata: {}
    });
    
    // In a real app, we would call an external payment processor here
    // For now, we'll just simulate a successful payment
    // await processPayment(payment);
    
    // Simulate a successful payment by updating payment status to succeeded
    await storage.updatePaymentStatus(payment.id, 'succeeded');
    
    // Update the order status to completed
    await storage.updateOrderStatus(order.id, 'processing');
    
    // Enroll the user in the course
    const userCourse = await storage.createUserCourse({
      userId,
      courseId,
      currentModuleId: null,
      isPublic: false,
      progress: 0
    });
    
    // Send a course enrollment email
    await storage.createEmailNotification({
      userId,
      type: 'course_enrollment',
      recipientEmail: req.user.email,
      subject: `Welcome to ${course.title}`,
      content: `Thank you for enrolling in ${course.title}. Start learning now!`,
      status: 'pending',
      metadata: { courseId, orderId: order.id }
    });
    
    res.status(201).json({
      success: true,
      userCourse,
      order,
      payment
    });
  } catch (error) {
    console.error('Course purchase error:', error);
    res.status(500).json({ error: 'Failed to purchase course' });
  }
});

export default router;