import { JobOfferDocument } from "@/prismicio-types";
import { create } from "zustand";

type applicationState = {
    applications: JobOfferDocument[];
    addApplication: (p: JobOfferDocument) => void;
    removeApplication: (p: JobOfferDocument) => void;
};

export const useApplicationStore = create<applicationState>((set) => ({
    applications: [],
    addApplication: (job) =>
        set((state) => ({
            applications: state.applications.includes(job)
                ? state.applications
                : [...state.applications, job],
        })),
    removeApplication: (job) =>
        set((state) => ({
            applications: state.applications.filter((application) => application !== job),
        })),
}));
