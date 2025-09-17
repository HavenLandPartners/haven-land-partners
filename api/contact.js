import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { name, phone, email, county, notes } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS
      }
    });

    await transporter.sendMail({
      from: `"Haven Land Partners" <${process.env.ZOHO_USER}>`,
      to: "info@havenlandpartners.com",
      subject: "New Website Form Submission",
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        County & State: ${county}
        Notes: ${notes}
      `
    });

    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
}
