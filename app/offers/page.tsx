import { createClient } from "@/prismicio";
import JobCard from "@/components/JobCard";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
    title: "Toutes nos offres",
    description: "Parcourez l'ensemble de nos opportunités d'emploi",
};

const PAGE_SIZE = 10;

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function Offers({ searchParams }: PageProps) {
    const { page: pageParam } = await searchParams;
    const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

    const client = createClient();

    const response = await client.getByType("job_offer", {
        orderings: [{ field: "my.job_offer.date", direction: "desc" }],
        pageSize: PAGE_SIZE,
        page: currentPage,
    });

    const jobs = response.results;
    const totalPages = response.total_pages;

    return (
        <>
            <div className="section-heading" style={{ marginTop: 40 }}>
                <h2>Toutes nos offres</h2>
            </div>

            {jobs.length > 0 ? (
                <>
                    <div className="job-grid">
                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <nav className="pagination" aria-label="Pagination">
                            {currentPage > 1 ? (
                                <Link href={`/offers?page=${currentPage - 1}`} className="pagination__btn" aria-label="Page précédente">
                                    <span className="material-symbols-outlined">
                                        keyboard_arrow_left
                                    </span>
                                </Link>
                            ) : (
                                <span className="pagination__btn pagination__btn--disabled" aria-disabled="true">
                                    <span className="material-symbols-outlined">
                                        keyboard_arrow_left
                                    </span>
                                </span>
                            )}

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                const isActive = page === currentPage;
                                const isVisible =
                                    page === 1 ||
                                    page === totalPages ||
                                    Math.abs(page - currentPage) <= 1;

                                if (!isVisible) {
                                    const prevVisible =
                                        page - 1 === 1 ||
                                        page - 1 === totalPages ||
                                        Math.abs(page - 1 - currentPage) <= 1;
                                    if (!prevVisible) return null;
                                    return (
                                        <span key={`ellipsis-${page}`} className="pagination__ellipsis">…</span>
                                    );
                                }

                                return isActive ? (
                                    <span key={page} className="pagination__page pagination__page--active" aria-current="page">
                                        {page}
                                    </span>
                                ) : (
                                    <Link key={page} href={`/offers?page=${page}`} className="pagination__page">
                                        {page}
                                    </Link>
                                );
                            })}

                            {currentPage < totalPages ? (
                                <Link href={`/offers?page=${currentPage + 1}`} className="pagination__btn" aria-label="Page suivante">
                                    <span className="material-symbols-outlined">
                                        keyboard_arrow_right
                                    </span>
                                </Link>
                            ) : (
                                <span className="pagination__btn pagination__btn--disabled" aria-disabled="true">
                                    <span className="material-symbols-outlined">
                                        keyboard_arrow_right
                                    </span>
                                </span>
                            )}
                        </nav>
                    )}
                </>
            ) : (
                <div className="empty-state">
                    <p>Aucune offre disponible pour le moment.</p>
                </div>
            )}

            <div style={{ marginBottom: 60 }} />
        </>
    );
}