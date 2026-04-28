const Notification = require("../../models/Notification");

class NotificationObserver {
  async update(data) {
    try {
      const { recipient, message, type } = data;
      
      // If no recipient is provided, we log it (default behavior)
      if (!recipient) {
        console.log("🔔 Global Notification (No recipient):", message);
        return;
      }

      const notification = new Notification({
        recipient,
        message,
        type: type || "general"
      });

      await notification.save();
      console.log(`🔔 Notification saved for user ${recipient}: ${message}`);
    } catch (error) {
      console.error("Failed to save notification:", error);
    }
  }
}

module.exports = NotificationObserver;
