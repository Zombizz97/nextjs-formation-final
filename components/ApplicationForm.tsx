"use client";

import Form from "next/form";
import { useApplicationStore } from '@/store/application.store'
import { sendApplication } from "@/actions/sendApplication";
import { useRef } from "react";
import { JobOfferDocument } from "@/prismicio-types";

interface ApplicationFormProps {
    job: JobOfferDocument;
    recipients: string;
}

export default function ApplicationForm({ job, recipients }: ApplicationFormProps) {
    const addApplication = useApplicationStore((s) => s.addApplication);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
        const message = messageRef.current?.value ?? "";
        if (message.trim().length >= 10) {
            addApplication(job);
        }
    };

    return (
        <Form action={sendApplication} className="application-form" onSubmit={handleSubmit}>
            <input type="hidden" name="jobTitle" value={job.data.title ?? ""} />
            <input type="hidden" name="jobUid" value={job.uid} />
            <input type="hidden" name="recipients" value={recipients} />

            <div className="application-form__field">
                <input
                    type="email"
                    name="email"
                    placeholder="Votre adresse email"
                    required
                    className="application-form__input"
                />
            </div>

            <textarea
                ref={messageRef}
                name="message"
                placeholder="Postuler à cette offre ..."
                required
                minLength={10}
                maxLength={2000}
            />

            <div className="form-actions">
                <button type="submit" className="btn-send">
                    Envoyer
                </button>
            </div>
        </Form>
    );
}