module.exports = function (context, data) {
    // get config from environment
    var api_key = process.env["MailgunKey"];
    var domain = process.env["MailgunDomain"];

    // load Mailgun helper
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    // get request params
    var from = data.from;
    var to = data.to;
    var subject = data.subject;
    var body = data.body;

    var message = {
        from: from,
        to: to,
        subject: subject,
        text: body
    };
      
    mailgun.messages().send(message, function (error, body) {
        if (error) {
            context.res = {
                status: 500,
                body: error
            }
            context.done(error);
            return;
        } else {
            context.res = {
                status: 200,
                body: body
            }
            context.done(null, JSON.stringify(body));
        }
    });
};
