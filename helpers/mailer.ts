import nodemailer from 'nodemailer';
import User from '@models/user';
import bcrypt from 'bcrypt';
import { emailType } from '@utils/emailType';
import { connectMongoDB } from '@app/lib/mongodb';

export const sendEmail = async (
  email: string, 
  typeOfEmail: emailType, 
  userId: string
  ) => {
    try {
      const hashedToken = await bcrypt.hash(userId.toString(), 10);
      await connectMongoDB();

      console.log(User.findById(userId))

      if (typeOfEmail == emailType.VERIFY) {
        await User.findByIdAndUpdate(userId , {
          verifyToken: hashedToken,
          verifyTokenExpiration: Date.now() + 3600000
        })
      } else if (typeOfEmail == emailType.RESETPW) {
        await User.findByIdAndUpdate(userId, {
          resetToken: hashedToken,
          resetTokenExpiration: Date.now() + 3600000
        })
      }

      const transporter = nodemailer.createTransport({
        host: 'mail.twicetrendy.hu',
        secure: true,
        port: 465,
        logger: true,
        debug: true,
        auth: {
          user: process.env.EMAIL_HOST_USER,
          pass: process.env.EMAIL_HOST_PASSWORD,
        },
      });

      const mailOptions = {
        from: 'admin@twicetrendy.hu',
        to: email,
        subject: 'TWICE TRENDY - Regisztráció visszaigazolása',
        html: `
        <body>
            <div style="text-align: center;">
                <h1>Köszönjük a regisztrációt!</h1>
                <p>Örömmel értesítjük, hogy sikeresen regisztrált a Twice Trendy webáruházban.</p>
                <p>A regisztráció visszaigazolásához kattintson a következő linkre:</p>
                <a href="http://${process.env.DOMAIN}/user/register/verifyemail?token=${hashedToken}">Regisztráció visszaigazolása</a>
            </div>
        </body>
      `,
      };

      const mailresponse =  await transporter.sendMail(mailOptions);

      return mailresponse;
    } catch (error: any) {
      console.log(error.message)
    }

};