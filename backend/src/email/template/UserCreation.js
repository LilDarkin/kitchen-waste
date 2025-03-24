require("dotenv").config();
const APP_URL = process.env.APP_URL;
const nodemailer = require("nodemailer");
const logoUrl = `${APP_URL}/src/assets/nutricare.svg`;

const sendVerificationEmail = async (
    recipientEmail,
    recipientName,
    verificationLink
) => {
    try {
        console.log("Sending email to:", recipientEmail);
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });


        const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Account</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
              body{font-family:'Poppins',sans-serif;margin:0;padding:0;color:#4a4a4a;background-color:#f5f5f5;line-height:1.6}
              .container{max-width:600px;margin:0 auto;background-color:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05)}
              .header{background-color:#34A853;padding:30px 20px;text-align:center}
              .logo-container{margin-bottom:15px}
              .welcome-text{color:white;font-size:22px;font-weight:600;margin:0;text-shadow:0 1px 2px rgba(0,0,0,0.1)}
              .content{padding:35px 30px}
              h2{color:#34A853;font-size:24px;margin-top:0;border-bottom:2px solid #f0f0f0;padding-bottom:12px}
              .message{background-color:#f8f9fa;border-left:4px solid #34A853;padding:15px;margin:20px 0;border-radius:0 8px 8px 0}
              .button-container{text-align:center;margin:30px 0}
              .button{display:inline-block;background-color:#34A853;color:white;text-decoration:none;padding:12px 30px;border-radius:50px;font-weight:500;box-shadow:0 4px 6px rgba(52,168,83,0.2);transition:all 0.3s}
              .button:hover{background-color:#2d9249;box-shadow:0 6px 8px rgba(52,168,83,0.3)}
              .link-fallback{text-align:center;margin:20px 0;padding:15px;background-color:#f8f9fa;border-radius:8px;word-break:break-all;font-size:13px;color:#666}
              .expiry-note{font-size:14px;color:#888;font-style:italic;text-align:center;margin-top:25px}
              .divider{height:1px;background-color:#f0f0f0;margin:30px 0}
              .signature{font-weight:500;color:#34A853}
              .footer{padding:20px;text-align:center;color:#888;font-size:12px;background-color:#f9f9f9;border-top:1px solid #eee}
              .social-icons{margin:15px 0}
              .social-icons a{display:inline-block;margin:0 8px;width:32px;height:32px;background-color:#34A853;border-radius:50%;line-height:32px;text-align:center;color:white;text-decoration:none;font-size:14px}
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <div class="logo-container">
                      <img src="${logoUrl}" alt="NutriCycle" height="50" />
                  </div>
                  <div class="welcome-text">Account Verification</div>
              </div>
              <div class="content">
                  <h2>Hello, ${recipientName}!</h2>
                  
                  <div class="message">
                      Thank you for joining NutriCycle. We're excited to have you on board!
                  </div>
                  
                  <p>To get started, please verify your email address by clicking the button below:</p>
                  
                  <div class="button-container">
                      <a href="${verificationLink}" class="button">Verify My Account</a>
                  </div>
                  
                  <div class="link-fallback">
                      If the button doesn't work, copy and paste this link:
                      <br>${verificationLink}
                  </div>
                  
                  <div class="expiry-note">
                      This verification link will expire in 24 hours for security reasons.
                  </div>
                  
                  <div class="divider"></div>
                  
                  <p>If you didn't create this account, you can safely ignore this email.</p>
                  
                  <p>Best regards,<br><span class="signature">The NutriCycle Team</span></p>
              </div>
              <div class="footer">
                  <div class="social-icons">
                      <a href="#">f</a>
                      <a href="#">in</a>
                      <a href="#">t</a>
                  </div>
                  <p>© 2025 NutriCycle. All rights reserved.</p>
                  <p>Questions? Contact us at <a href="mailto:support@nutricycle.com" style="color:#34A853;">support@nutricycle.com</a></p>
              </div>
          </div>
      </body>
      </html>
    `;

        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: recipientEmail,
            subject: "NutriCycle: Verify Your Account",
            html: emailTemplate,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = sendVerificationEmail;