const Subject = require("./subject");
const NotificationObserver = require("./notificationObserver");

const subject = new Subject();
const observer = new NotificationObserver();

subject.subscribe(observer);

module.exports = subject;
