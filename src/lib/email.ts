import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com", // cambia si tu región es otra
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const verifyUrl = `https://creaapp.xyz/verify-email?token=${token}`;

  const html = `
    <p>Hola,</p>
    <p>Gracias por registrarte. Haz clic en el siguiente botón para verificar tu correo:</p>
    <a href="${verifyUrl}" style="background:#4f46e5;color:white;padding:10px 20px;border-radius:4px;text-decoration:none;">
      Verificar correo
    </a>
    <p>O copia y pega este enlace en tu navegador:</p>
    <p>${verifyUrl}</p>
  `;

  await transporter.sendMail({
    from: '"CreaApp" <noreply@creaapp.xyz>',
    to,
    subject: "Verifica tu correo en CreaApp",
    html,
  });
};

// e9fa66b6b6cccf885f7b2dcf0d7a2dd5
// e844f40d57ccf9e0f698b549349ecd67f7c87
// https://e9fa66b6b6cccf885f7b2dcf0d7a2dd5.r2.cloudflarestorage.com/crea-files
