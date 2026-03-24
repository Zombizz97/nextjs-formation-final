import { createClient } from "@/prismicio";
import JobCard from "@/components/JobCard";

export const revalidate = 60;

export const metadata = {
    title: "Toutes nos offres",
    description: "Parcourez l'ensemble de nos opportunités d'emploi",
};

export default async function OffresPage() {
    const client = createClient();

    const jobs = await client.getAllByType("job_offer", {
        orderings: [{ field: "my.job_offer.date", direction: "desc" }],
    });

    return (
        <>
            <div className="section-heading" style={{ marginTop: 40 }}>
                <h2>Toutes nos offres</h2>
            </div>

            {jobs.length > 0 ? (
                <div className="job-grid">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>Aucune offre disponible pour le moment.</p>
                </div>
            )}

            <div style={{ marginBottom: 60 }} />
        </>
    );
}