import { TRPCError } from "@trpc/server";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const trimValue = (value: string): string => value.trim();
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validatePayload = (input: NotificationPayload): NotificationPayload => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Notification title is required." });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Notification content is required." });
  }

  const title = trimValue(input.title);
  const content = trimValue(input.content);

  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({ code: "BAD_REQUEST", message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.` });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({ code: "BAD_REQUEST", message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.` });
  }

  return { title, content };
};

/**
 * Notifies the site owner/admin of an important event.
 *
 * This app no longer depends on any third-party notification service.
 * By default it just logs to the console. To wire up real notifications,
 * set NOTIFY_WEBHOOK_URL to any endpoint that accepts a JSON POST
 * ({ title, content }) — e.g. a Slack incoming webhook, a Discord webhook,
 * or your own email-sending endpoint.
 */
export async function notifyOwner(payload: NotificationPayload): Promise<boolean> {
  const { title, content } = validatePayload(payload);
  const webhookUrl = process.env.NOTIFY_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log(`[Notification] ${title}: ${content}`);
    return true;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      console.warn(`[Notification] Webhook failed (${response.status})`);
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Notification] Error calling webhook:", error);
    return false;
  }
}
