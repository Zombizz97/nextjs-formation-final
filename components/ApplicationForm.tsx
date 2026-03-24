import Form from "next/form";
import { sendApplication } from "@/actions/sendApplication";

interface ApplicationFormProps {
    jobTitle: string | null;
    jobUid: string;
    recipients: string;
}

export default function ApplicationForm({
                                            jobTitle,
                                            jobUid,
                                            recipients,
                                        }: ApplicationFormProps) {
    return (
        <Form action={sendApplication} className="application-form">
            <input type="hidden" name="jobTitle" value={jobTitle ?? ""} />
            <input type="hidden" name="jobUid" value={jobUid} />
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