import { useState } from "react";
import type { Job } from "../../types/job"
import Button from "../ui/Button";
import Select from "../ui/Select";


type JobFormProps = {
    initialData?: Partial<Job>;
    onSubmit: (data: Partial<Job>) => void;
    submitLabel?: string;
}

export default function JobForm({initialData = {}, onSubmit, submitLabel = "Save"}: JobFormProps) {
    const [formData, setFormData] = useState<Partial<Job>>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}))
    };

    const handleSubmit = async(e: React.FormEvent) => {
        try {
            e.preventDefault();
            onSubmit(formData);
        } catch (error) {
            console.error("Error submitting job form", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
            <input
                name="company"
                placeholder="Company"
                value={formData.company || ""}
                onChange={handleChange}
                className="border p-2 rounded"
            />
             <input
                name="position"
                placeholder="Position"
                value={formData.position || ""}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <Select
            options={[
                { label: "Applied", value: "Applied" },
                { label: "Interview", value: "Interview" },
                { label: "Offer", value: "Offer" },
                { label: "Rejected", value: "Rejected" },
            ]}
            value={formData.status || "Applied"}
             onChange={(val) => setFormData((prev) => ({ ...prev, status: val } as Partial<Job>))}
            />
            <input
                type="date"
                name="appliedDate"
                placeholder="Applied Date"
                value={formData.applieddate || ""}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="salary"
                placeholder="Salary"
                value={formData.salary || ""}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="location"
                placeholder="Location"
                value={formData.location || ""}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="link"
                placeholder="Job Link"
                value={formData.link || ""}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                {submitLabel}
            </Button>
        </form>
    )
}