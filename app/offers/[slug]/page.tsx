import Link from "next/link";
import { notFound } from "next/navigation";
import { asDate } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ApplicationForm from "@/components/ApplicationForm";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const client = createClient();
    try {
        const job = await client.getByUID("job_offer", slug);
        return { title: `${job.data.title}` };
    } catch {
        return { title: "Offre introuvable" };
    }
}

export default async function JobDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const client = createClient();

    let job;
    try {
        job = await client.getByUID("job_offer", slug);
    } catch {
        notFound();
    }

    const title = job.data.title;
    const date = job.data.date ? asDate(job.data.date) : null;
    const technologies = job.data.technologies ?? [];

    const recipients = (job.data.recipients ?? [])
        .map((r: { email: string | null }) => r.email?.trim())
        .filter(Boolean)
        .join(",");

    const formattedDate = date
        ? date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : "";

    return (
        <div className="detail-page">
            <Link href="/offers" className="detail-back">
                &lt; Voir toutes les offres
            </Link>

            <h1 className="detail-title">{title}</h1>
            <div className="detail-divider" />

            {formattedDate && (
                <div className="detail-meta">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{formattedDate}</span>
                </div>
            )}

            {technologies.length > 0 && (
                <div className="detail-tags">
                    {technologies
                        .filter((t: { technology: string | null }) => t.technology)
                        .map((t: { technology: string | null }, i: number) => (
                            <span key={i} className="detail-tag">
                                {t.technology}
                            </span>
                        ))}
                </div>
            )}

            <div className="detail-description">
                <PrismicRichText field={job.data.description} />
            </div>

            <ApplicationForm
                jobTitle={title}
                jobUid={job.uid}
                recipients={recipients}
            />
        </div>
    );
}