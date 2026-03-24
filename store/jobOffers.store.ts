import { JobOfferDocument } from "@/prismicio-types";
import { create } from "zustand";

type JobOfferState = {
    jobOffers: JobOfferDocument[];
    addJobOffer: (p: JobOfferDocument) => void;
    removeJobOffer: (p: JobOfferDocument) => void;
};

export const useJobOffersStore = create<JobOfferState>((set) => ({
    jobOffers: [],
    addJobOffer: (job) =>
        set((state) => ({
            jobOffers: state.jobOffers.includes(job)
                ? state.jobOffers
                : [...state.jobOffers, job],
        })),
    removeJobOffer: (job) =>
        set((state) => ({
            jobOffers: state.jobOffers.filter((jobOffer) => jobOffer !== job),
        })),
}));
