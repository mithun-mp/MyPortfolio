import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "mithunmp2004@gmail.com";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  if (!resend) {
    console.log("[Resend Mock] Email notification triggered:", data);
    return { success: true, mocked: true };
  }

  try {
    const response = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: receiverEmail,
      subject: `[Portfolio Transmission] New Message from ${data.name}`,
      html: `
        <div style="font-family: monospace; background: #050814; color: #00f0ff; padding: 24px; border-radius: 8px;">
          <h2 style="color: #00f0ff;">TRANSMISSION RECEIVED</h2>
          <p><strong>Sender Name:</strong> ${data.name}</p>
          <p><strong>Sender Email:</strong> ${data.email}</p>
          <p><strong>Company/Role:</strong> ${data.company || "N/A"}</p>
          <hr style="border-color: rgba(0, 240, 255, 0.2);" />
          <p><strong>Message Payload:</strong></p>
          <blockquote style="background: rgba(10, 15, 36, 0.8); padding: 16px; border-left: 4px solid #7000ff; color: #e0e0e0;">
            ${data.message.replace(/\n/g, "<br>")}
          </blockquote>
        </div>
      `,
    });
    return { success: true, id: response.data?.id };
  } catch (error) {
    console.error("Resend dispatch error:", error);
    return { success: false, error: (error as Error).message };
  }
}
