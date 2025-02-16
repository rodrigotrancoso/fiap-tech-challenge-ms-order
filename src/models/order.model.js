import { PutCommand, GetCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import connectDB from "../../config/database.js";

class Order {
    constructor() {
        this.tableName = "orders";
    }

    async create(orderData) {
        const docClient = await connectDB();
        const timestamp = new Date().toISOString();

        const order = {
            orderId: uuidv4(), // Create a unique ID
            customerId: orderData.customerId || null,
            items: orderData.items,
            totalPrice: orderData.totalPrice,
            status: "PENDING",
            createdAt: timestamp,
            updatedAt: timestamp
        };

        const command = new PutCommand({
            TableName: this.tableName,
            Item: order
        });

        await docClient.send(command);
        return order;
    }

    async findById(orderId) {
        const docClient = await connectDB();
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { orderId }
        });

        const response = await docClient.send(command);
        return response.Item;
    }

    async updateStatus(orderId, status) {
        const docClient = await connectDB();
        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { orderId },
            UpdateExpression: "set #status = :status, updatedAt = :updatedAt",
            ExpressionAttributeNames: {
                "#status": "status"
            },
            ExpressionAttributeValues: {
                ":status": status,
                ":updatedAt": new Date().toISOString()
            },
            ReturnValues: "ALL_NEW"
        });

        const response = await docClient.send(command);
        return response.Attributes;
    }

    async findAll() {
        const docClient = await connectDB();
        const command = new ScanCommand({
            TableName: this.tableName,
        });

        const response = await docClient.send(command);
        return response.Items;
    }
}

export default new Order();