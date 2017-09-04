import { createTransport } from 'nodemailer';
export default class Mailer {
    public transport;
    constructor() {
        this._generateTransport();
    }
    public static from = 'mailer@myawesomeshop.com';
    public static generateTemplate(url, token) {
        return `Hi there!
                Please, verefy your accaunt!
                link: <a href="http://localhost:3000${url}/${token}">http://localhost:3000${url}/${token}</a>`;
    }
    private _generateTransport() {
        const { MAILGUN_LOGIN, MAILGUN_PASSWORD, MAILGUN_SERVICE } = process.env;
        this.transport = createTransport({
            service: MAILGUN_SERVICE,
            auth: {
                user: MAILGUN_LOGIN,
                pass: MAILGUN_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    public sendEmail(from, subject, to, html) {
        return new Promise((resolve, reject) => {
            this.transport.sendMail({from , subject, to, html }, (err, info) => {
                if(err) {
                    reject(err);
                }
                resolve(info);
            });
        });
    }
}
