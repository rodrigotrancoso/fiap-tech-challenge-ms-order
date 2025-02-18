import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./src/routes/order.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health-check", (req, res) => {
  res.send("Health check passed!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
