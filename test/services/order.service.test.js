import { expect, jest } from '@jest/globals';
import OrderService from '../../src/services/order.service';
import Order from '../../src/models/order.model';

jest.mock('../../src/models/order.model');

describe('OrderService', () => {
    const productId = '12345';
    const productDetailsMock = {
        name: 'Test Product',
        price: 100,
        description: 'A sample product',
        category: 'Food'
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('createOrder', () => {
        it('should create an order', async () => {
            const customerId = '123';
            const items = [
                { price: 10, quantity: 2 },
                { price: 20, quantity: 1 }
            ];
            const totalPrice = 40;

            global.fetch = jest.fn().mockResolvedValue(new Response(JSON.stringify(productDetailsMock), { status: 200 }));
            Response.prototype.json = jest.fn().mockResolvedValue(productDetailsMock);

            Order.create.mockResolvedValue({ customerId, items, totalPrice });

            const order = await OrderService.createOrder(customerId, items);

            expect(Order.create).toHaveBeenCalled();
            expect(order).toEqual({ customerId, items, totalPrice });
        });
    });

    describe('getOrders', () => {
        it('should return all orders', async () => {
            const orders = [
                { customerId: '123', items: [], totalPrice: 0 },
                { customerId: '456', items: [], totalPrice: 0 }
            ];

            Order.find.mockResolvedValue(orders);

            const result = await OrderService.getOrders();

            expect(result).toEqual(orders);
        });
    });

    describe('getOrderById', () => {
        it('should return an order by id', async () => {
            const id = '123';
            const order = { customerId: '123', items: [], totalPrice: 0 };

            Order.findById.mockResolvedValue(order);

            const result = await OrderService.getOrderById(id);

            expect(result).toEqual(order);
        });
    });

    describe('updateOrderStatus', () => {
        it('should update an order status', async () => {
            const id = '123';
            const status = 'DELIVERED';
            const order = { customerId: '123', items: [], totalPrice: 0 };

            Order.findByIdAndUpdate.mockResolvedValue(order);

            const result = await OrderService.updateOrderStatus(id, status);

            expect(result).toEqual(order);
        });
    });

    describe('fetchProductDetails', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return product details when fetch is successful', async () => {
            global.fetch = jest.fn().mockResolvedValue(new Response(JSON.stringify(productDetailsMock), { status: 200 }));

            const result = await OrderService.fetchProductDetails(productId);
            expect(result).toEqual(productDetailsMock);
            expect(fetch).toHaveBeenCalledWith(`http://ms-product:8080/api/v1/products/${productId}`);
        });

        it('should throw an error when product is not found (404)', async () => {
            global.fetch = jest.fn().mockResolvedValue(new Response(null, { status: 404 }));

            await expect(OrderService.fetchProductDetails(productId)).rejects.toThrow(`Failed to fetch product details for ID: ${productId}`);
            expect(fetch).toHaveBeenCalledWith(`http://ms-product:8080/api/v1/products/${productId}`);
        });

        it('should throw an error when fetch fails (network issue)', async () => {
            global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

            await expect(OrderService.fetchProductDetails(productId)).rejects.toThrow('Network Error');
            expect(fetch).toHaveBeenCalledWith(`http://ms-product:8080/api/v1/products/${productId}`);
        });
    });
});