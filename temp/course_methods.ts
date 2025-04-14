// Course CRUD methods
async getCourse(id: number): Promise<Course | undefined> {
  return this.courses.get(id);
}

async getAllCourses(): Promise<Course[]> {
  return Array.from(this.courses.values());
}

async getCoursesByCategory(category: string): Promise<Course[]> {
  return Array.from(this.courses.values()).filter(
    course => course.category.toLowerCase() === category.toLowerCase()
  );
}

async getCoursesByAuthor(authorId: number): Promise<Course[]> {
  return Array.from(this.courses.values()).filter(
    course => course.authorId === authorId
  );
}

async createCourse(insertCourse: InsertCourse): Promise<Course> {
  const id = this.currentCourseId++;
  const now = new Date();
  const course: Course = {
    ...insertCourse,
    id,
    createdAt: now,
    imageUrl: insertCourse.imageUrl || null,
    price: insertCourse.price || 0,
    duration: insertCourse.duration || null,
    authorId: insertCourse.authorId || null,
    difficulty: insertCourse.difficulty || 'beginner',
    enrollmentCount: 0,
    rating: 0,
    tags: Array.isArray(insertCourse.tags) ? insertCourse.tags : []
  };
  
  this.courses.set(id, course);
  return course;
}

// Course Module CRUD methods
async getCourseModule(id: number): Promise<CourseModule | undefined> {
  return this.courseModules.get(id);
}

async getCourseModules(courseId: number): Promise<CourseModule[]> {
  return Array.from(this.courseModules.values()).filter(
    module => module.courseId === courseId
  );
}

async createCourseModule(insertCourseModule: InsertCourseModule): Promise<CourseModule> {
  const id = this.currentCourseModuleId++;
  const module: CourseModule = {
    ...insertCourseModule,
    id,
    moduleNumber: insertCourseModule.moduleNumber || 1,
    duration: insertCourseModule.duration || null
  };
  
  this.courseModules.set(id, module);
  return module;
}

// User Course CRUD methods
async getUserCourse(userId: number, courseId: number): Promise<UserCourse | undefined> {
  return Array.from(this.userCourses.values()).find(
    userCourse => userCourse.userId === userId && userCourse.courseId === courseId
  );
}

async getUserCourses(userId: number): Promise<UserCourse[]> {
  return Array.from(this.userCourses.values()).filter(
    userCourse => userCourse.userId === userId
  );
}

async createUserCourse(insertUserCourse: InsertUserCourse): Promise<UserCourse> {
  const id = this.currentUserCourseId++;
  const now = new Date();
  const userCourse: UserCourse = {
    ...insertUserCourse,
    id,
    enrolledAt: now,
    lastAccessedAt: now,
    completedAt: null,
    progress: 0,
    certificate: null
  };
  
  this.userCourses.set(id, userCourse);
  
  // Update course enrollment count
  const course = this.courses.get(userCourse.courseId);
  if (course) {
    const updatedCourse = { 
      ...course, 
      enrollmentCount: (course.enrollmentCount || 0) + 1 
    };
    this.courses.set(course.id, updatedCourse);
  }
  
  return userCourse;
}

async updateUserCourseProgress(userId: number, courseId: number, progress: number): Promise<UserCourse | undefined> {
  const userCourse = await this.getUserCourse(userId, courseId);
  
  if (!userCourse) {
    // Create a new user course if it doesn't exist
    return this.createUserCourse({
      userId,
      courseId,
      progress,
      currentModuleId: null,
      isPublic: false
    });
  }
  
  const now = new Date();
  const updatedUserCourse = { 
    ...userCourse, 
    progress, 
    lastAccessedAt: now,
    completedAt: progress >= 100 ? now : userCourse.completedAt
  };
  
  this.userCourses.set(userCourse.id, updatedUserCourse);
  return updatedUserCourse;
}

// Merchandise CRUD methods
async getMerchandise(id: number): Promise<Merchandise | undefined> {
  return this.merchandise.get(id);
}

async getAllMerchandise(): Promise<Merchandise[]> {
  return Array.from(this.merchandise.values());
}

async getMerchandiseByCategory(category: string): Promise<Merchandise[]> {
  return Array.from(this.merchandise.values()).filter(
    item => item.category.toLowerCase() === category.toLowerCase()
  );
}

async createMerchandise(insertMerchandise: InsertMerchandise): Promise<Merchandise> {
  const id = this.currentMerchandiseId++;
  const now = new Date();
  const merchandise: Merchandise = {
    ...insertMerchandise,
    id,
    createdAt: now,
    imageUrl: insertMerchandise.imageUrl || null,
    inventory: insertMerchandise.inventory || 0,
    isAvailable: insertMerchandise.isAvailable !== false,
    discountPrice: insertMerchandise.discountPrice || null
  };
  
  this.merchandise.set(id, merchandise);
  return merchandise;
}

async updateMerchandiseInventory(id: number, inventory: number): Promise<Merchandise | undefined> {
  const merchandise = this.merchandise.get(id);
  if (!merchandise) return undefined;
  
  const updatedMerchandise = { 
    ...merchandise, 
    inventory,
    isAvailable: inventory > 0 && merchandise.isAvailable
  };
  
  this.merchandise.set(id, updatedMerchandise);
  return updatedMerchandise;
}

// Order CRUD methods
async getOrder(id: number): Promise<Order | undefined> {
  return this.orders.get(id);
}

async getUserOrders(userId: number): Promise<Order[]> {
  return Array.from(this.orders.values()).filter(
    order => order.userId === userId
  );
}

async createOrder(insertOrder: InsertOrder): Promise<Order> {
  const id = this.currentOrderId++;
  const now = new Date();
  const order: Order = {
    ...insertOrder,
    id,
    createdAt: now,
    updatedAt: now,
    shippingAddress: insertOrder.shippingAddress || null,
    notes: insertOrder.notes || null,
    shippedAt: null,
    deliveredAt: null
  };
  
  this.orders.set(id, order);
  return order;
}

async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
  const order = this.orders.get(id);
  if (!order) return undefined;
  
  const now = new Date();
  const updatedOrder = { 
    ...order, 
    status, 
    updatedAt: now,
    shippedAt: status === 'shipped' ? now : order.shippedAt,
    deliveredAt: status === 'delivered' ? now : order.deliveredAt
  };
  
  this.orders.set(id, updatedOrder);
  return updatedOrder;
}

// Order Item CRUD methods
async getOrderItems(orderId: number): Promise<OrderItem[]> {
  return Array.from(this.orderItems.values()).filter(
    item => item.orderId === orderId
  );
}

async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
  const id = this.currentOrderItemId++;
  const orderItem: OrderItem = {
    ...insertOrderItem,
    id
  };
  
  this.orderItems.set(id, orderItem);
  
  // If this is a merchandise order, update the inventory
  if (orderItem.merchandiseId) {
    const merchandise = this.merchandise.get(orderItem.merchandiseId);
    if (merchandise) {
      const newInventory = (merchandise.inventory || 0) - orderItem.quantity;
      await this.updateMerchandiseInventory(orderItem.merchandiseId, Math.max(0, newInventory));
    }
  }
  
  return orderItem;
}