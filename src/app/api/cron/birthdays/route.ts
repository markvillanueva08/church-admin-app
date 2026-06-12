import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // In production, you would want to secure this endpoint 
  // so that only the cron scheduler (like Vercel Cron) can trigger it.
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Get today's date and month
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // 1-12
    const todayDate = today.getDate(); // 1-31

    // Prisma doesn't support direct extraction of day and month in sqlite easily 
    // without raw queries, so we fetch users with a DOB and filter in memory 
    // for small/medium databases. For large DBs, use raw query.
    const users = await prisma.user.findMany({
      where: {
        dateOfBirth: { not: null }
      }
    });

    const birthdayUsers = users.filter(user => {
      if (!user.dateOfBirth) return false;
      const dob = new Date(user.dateOfBirth);
      return dob.getMonth() + 1 === todayMonth && dob.getDate() === todayDate;
    });

    if (birthdayUsers.length === 0) {
      return NextResponse.json({ message: "No birthdays today." });
    }

    // Set up Nodemailer transport
    // This uses ethereal email or your SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || 'ethereal_user',
        pass: process.env.SMTP_PASS || 'ethereal_pass'
      }
    });

    const emailsSent = [];

    for (const user of birthdayUsers) {
      if (user.email) {
        const mailOptions = {
          from: '"ServeLink System" <noreply@servelink.com>',
          to: user.email,
          subject: `Happy Birthday, ${user.name}! 🎉`,
          text: `Dear ${user.name},\n\nWe want to wish you a very Happy Birthday! Thank you for your continued service and dedication to the Church.\n\nBlessings,\nThe ServeLink Team`,
          html: `<p>Dear <strong>${user.name}</strong>,</p><p>We want to wish you a very <strong>Happy Birthday!</strong> 🎉</p><p>Thank you for your continued service and dedication to the Church.</p><p>Blessings,<br>The ServeLink Team</p>`,
        };

        try {
          await transporter.sendMail(mailOptions);
          emailsSent.push(user.email);
        } catch (emailError) {
          console.error(`Failed to send email to ${user.email}`, emailError);
        }
      }
    }

    return NextResponse.json({ message: `Sent ${emailsSent.length} birthday greetings.`, users: emailsSent });
  } catch (error) {
    console.error("Cron Birthday Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
