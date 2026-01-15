const express = require("express");
const app = express();

app.use(express.json());

const ordersByIdempotencyKey = new Map();

function chargeUser(amount) {
  // pretend this calls Stripe or Razorpay
  return {
    paymentId: "pay_" + Math.random().toString(36).slice(2),
    status: "success",
  };
}

app.post("/orders", async (req, res) => {
  const idempotencyKey = req.headers["idempotency-key"];

  if (!idempotencyKey) {
    return res.status(400).json({
      error: "Idempotency-Key header is required",
    });
  }

 
  if (ordersByIdempotencyKey.has(idempotencyKey)) {
    return res.status(200).json({
      message: "Order already processed",
      order: ordersByIdempotencyKey.get(idempotencyKey),
    });
  }

  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({
      error: "userId and amount are required",
    });
  }


  const order = {
    orderId: "order_" + Math.random().toString(36).slice(2),
    userId,
    amount,
    status: "pending",
  };


  const paymentResult = chargeUser(amount);

  order.status = "paid";
  order.paymentId = paymentResult.paymentId;

  ordersByIdempotencyKey.set(idempotencyKey, order);

  return res.status(201).json({
    message: "Order created successfully",
    order,
  });
});

app.listen(3000, () => {
  console.log("Order service running on http://localhost:3000");
});
