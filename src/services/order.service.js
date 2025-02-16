import Order from '../models/order.model.js';

const OrderService = {
  createOrder: async (customerId, items) => {
    let totalPrice = 0;

    await Promise.all(items.map(async (item) => {
      const productDetails = await OrderService.fetchProductDetails(item.productId);
      if (!productDetails) {
        throw new Error(`Product details not found for ID: ${item.productId}`);
      }
      totalPrice += productDetails.price * item.quantity;
    }));

    const order = await Order.create({
      customerId,
      items,
      totalPrice
    });
    return order;
  },

  getOrders: async () => {
    return await Order.findAll();
  },

  getOrderById: async (id) => {
    return await Order.findById(id);
  },

  updateOrderStatus: async (id, status) => {
    return await Order.updateStatus(id, { status });
  },

  fetchProductDetails: async (productId) => {
    try {
      // Using the internal k8s service DNS
      const response = await fetch(`http://ms-product/api/v1/products/${productId}`);
      if (!response.ok) {
        const error = new Error(`Failed to fetch product details for ID: ${productId}`);
        if (response.status === 404) {
          error.statusCode = 404;
        }
        throw error;
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product details: ${error.message}`);
      throw error;
    }
  }
};
export default OrderService;
