import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wowpotatoes1@gmail.com',
            pass: 'pawel0009'
        }
    });

    const mailOptions = {
        from: 'wowpotatoes1@gmail.com',
        to: 'wowpotatos@gmail.com',
        subject: body.subject, // Тема письма
        text: body.message, // Текст письма
    };

    try {
        console.log('eeeee')
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});
