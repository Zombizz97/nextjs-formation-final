import Link from "next/link";
import type {Metadata} from 'next'

export const metadata: Metadata = {
    title: "Candidature envoyée",
};

export default function ThankYou() {
    return (
        <div className="detail-page" style={{ textAlign: "center", paddingTop: 80 }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: 12 }}>
                Candidature envoyée !
            </h1>
            <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                Votre candidature a bien été reçue. Nous vous recontacterons dans les plus brefs délais.
            </p>
            <Link href="/offers" className="btn-primary">
                Voir toutes les offres
            </Link>
        </div>
    );
}