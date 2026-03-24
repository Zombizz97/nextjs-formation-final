import Link from "next/link";
import type {Metadata} from 'next'

export const metadata: Metadata = {
    title: "Erreur",
};

export default function Error() {
    return (
        <div className="detail-page" style={{ textAlign: "center", paddingTop: 80 }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>❌</div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: 12 }}>
                Une erreur est survenue
            </h1>
            <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                Votre candidature n&apos;a pas pu être envoyée. Vérifiez les informations saisies et réessayez.
            </p>
            <Link href="/" className="btn-primary">
                Retour à l&apos;accueil
            </Link>
        </div>
    );
}