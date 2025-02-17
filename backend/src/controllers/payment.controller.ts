import { Request, Response } from "express";
import stripe from "../services/stripeInit";

export const paymentHandler = async (req: Request, res: Response) => {
    const baseUrl = process.env.BASE_URL;
    const { id, name, code, amount, profilePic } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: name,
                            description: code,
                            images: [profilePic]
                        },
                        unit_amount: amount * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            phone_number_collection: {
                enabled: true
            },
            success_url: `${baseUrl}/donate/complete-payment?session_id={CHECKOUT_SESSION_ID}&id=${id}&name=${name}&referenceCode=${code}&amount=${amount}`,
            cancel_url: `${baseUrl}/donate/cancel-payment?reason=user_cancelled`,
            metadata: {
                orderId: id,
            },
            allow_promotion_codes: true
        });

        res.json({ url: session.url });
    } catch (err) {
        console.log("Error in paymentHandler", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}