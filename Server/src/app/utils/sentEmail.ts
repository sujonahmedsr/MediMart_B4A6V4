import nodemailer from "nodemailer";

export const sendEmail = async (to: string, orderId: string, status: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const subject = `Your Order #${orderId} is now ${status}`;
    const htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
            <h2 style="background: #007BFF; color: white; padding: 10px 20px; border-radius: 5px; text-align: center;">
                Order Update: ${status}
            </h2>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
                Dear Customer, <br><br>
                Your order <strong>#${orderId}</strong> status has been updated to <strong>${status}</strong>. 
                <br><br>
                Thank you for shopping with Medimart!
            </p>
            <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
            <p style="font-size: 14px; color: #777; text-align: center;">
                Best Regards, <br>
                <strong>Medimart Team</strong>
            </p>
        </div>
    `;

    console.log(to, subject, htmlTemplate, "from sendmail");

    console.log("Email User:", process.env.EMAIL_USER);
    console.log("Email Pass:", process.env.EMAIL_PASS);



    await transporter.sendMail({
        from: `"Medimart" ${process.env.EMAIL_USER}`,
        to,
        subject,
        text: `Your order #${orderId} status is now ${status}. Thank you for choosing Medimart!`, // plain text fallback
        html: htmlTemplate,
    });
};
