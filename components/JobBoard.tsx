"use client";

import { useState, useMemo } from "react";
import JobCard from "@/components/JobCard";
import type { JobOfferDocument } from "@/prismicio-types";

interface JobBoardProps {
    jobs: JobOfferDocument[];
}

export default function JobBoard({ jobs }: JobBoardProps) {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const job of jobs) {
            for (const t of job.data.technologies ?? []) {
                const tech = t.technology as string | null;
                if (tech) counts[tech] = (counts[tech] ?? 0) + 1;
            }
        }
        return counts;
    }, [jobs]);

    const tags = Object.keys(tagCounts).sort();

    const filteredJobs = useMemo(() => {
        if (!activeTag) return jobs;
        return jobs.filter((job) =>
            (job.data.technologies ?? []).some(
                (t) => (t.technology as string | null) === activeTag
            )
        );
    }, [jobs, activeTag]);

    return (
        <>
            {tags.length > 0 && (
                <div className="tag-cloud">
                    <button
                        className={`tag-cloud__item${!activeTag ? " tag-cloud__item--active" : ""}`}
                        onClick={() => setActiveTag(null)}
                    >
                        Toutes les offres
                        <span className="tag-cloud__count">{jobs.length}</span>
                    </button>

                    {tags.map((tag) => (
                        <button
                            key={tag}
                            className={`tag-cloud__item${activeTag === tag ? " tag-cloud__item--active" : ""}`}
                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                        >
                            {tag}
                            <span className="tag-cloud__count">{tagCounts[tag]}</span>
                        </button>
                    ))}
                </div>
            )}

            {filteredJobs.length > 0 ? (
                <div className="job-grid">
                    {filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>Aucune offre pour la technologie « {activeTag} ».</p>
                </div>
            )}
        </>
    );
}