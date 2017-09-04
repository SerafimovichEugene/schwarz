"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
class Mailer {
    constructor() {
        this._generateTransport();
    }
    static generateTemplate(url, token) {
        return `Hi there!
                Please, verefy your accaunt!
                link: <a href="http://localhost:3000${url}/${token}">http://localhost:3000${url}/${token}</a>`;
    }
    _generateTransport() {
        const { MAILGUN_LOGIN, MAILGUN_PASSWORD, MAILGUN_SERVICE } = process.env;
        this.transport = nodemailer_1.createTransport({
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
    sendEmail(from, subject, to, html) {
        return new Promise((resolve, reject) => {
            this.transport.sendMail({ from, subject, to, html }, (err, info) => {
                if (err) {
                    reject(err);
                }
                resolve(info);
            });
        });
    }
}
Mailer.from = 'mailer@myawesomeshop.com';
exports.default = Mailer;
