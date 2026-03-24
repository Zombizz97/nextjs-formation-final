"use server";

import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";

const ApplicationSchema = z.object({
    email: z
        .string({ required_error: "L'email est requis" })
        .email("L'adresse email n'est pas valide"),
    message: z
        .string({ required_error: "Le message est requis" })
        .min(10, "Le message doit faire au moins 10 caractères")
        .max(2000, "Le message ne peut pas dépasser 2000 caractères"),
    jobTitle: z.string().optional(),
    jobUid: z.string().optional(),
    recipients: z.string().min(1, "Aucun destinataire configuré pour cette offre"),
});

export async function sendApplication(formData: FormData) {
    const rawEmail = formData.get("email")?.toString() ?? "";
    const rawMessage = formData.get("message")?.toString() ?? "";
    const jobTitle = formData.get("jobTitle")?.toString() ?? "";
    const jobUid = formData.get("jobUid")?.toString() ?? "";
    const rawRecipients = formData.get("recipients")?.toString() ?? "";

    const normalizedEmail = validator.normalizeEmail(rawEmail) || rawEmail;
    const sanitizedMessage = validator.escape(rawMessage);

    const validatedRecipients = rawRecipients
        .split(",")
        .map((e) => e.trim())
        .filter((e) => validator.isEmail(e))
        .map((e) => validator.normalizeEmail(e) || e);

    const parsed = ApplicationSchema.safeParse({
        email: normalizedEmail,
        message: sanitizedMessage,
        jobTitle,
        jobUid,
        recipients: validatedRecipients.join(","),
    });

    if (!parsed.success) {
        redirect("/error");
    }

    const email = parsed.data?.email;
    const message = parsed.data?.message;

    console.log("Email qui serait envoyé :", {
        to: validatedRecipients,
        replyTo: email,
        subject: `Nouvelle candidature : ${jobTitle}`,
        message,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    redirect("/thankyou");
}