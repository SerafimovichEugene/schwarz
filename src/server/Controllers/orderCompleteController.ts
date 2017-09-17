import Mailer from '../Mailer/Mailer';


const orderCompleteController = async (req, res, next) => {
    try {
        console.log(req.body);
        const {
            address,
            name,
            phone,
            orders,
        } = req.body;
        let names = orders.reduce((prev, cur) => {
            prev += ` ${cur.name}`;
        }, '');
        const email = 'fanfasiuss@gmail.com';
        const template = `
            hi there!
            ${name} just ordered ${names}
            his number is ${phone}
            his address is ${address}
            have a nice day.
        `;
        await new Mailer().sendEmail(Mailer.from, 'order complete', email, template);
        res.status(200).end();
    } catch (error) {
        console.log('FROM orderCompleteController error', error);
        res.status(500).end();
    }
};

export default orderCompleteController;
