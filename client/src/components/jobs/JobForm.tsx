import { useState } from "react";
import { Briefcase, MapPin, Calendar, Link2, FileText, Building2 } from "lucide-react";
import type { Job } from "../../types/job"


import Button from "../ui/Button";
import Select from "../ui/Select";
import SalaryInput from "./JobSalaryInput";


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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const today = new Date();
            const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0];

            let formattedSalary = formData.salary?.trim() || "";

            // Remove dangling dash, trailing spaces,
            formattedSalary = formattedSalary.replace(/-\s*$/, "");
            formattedSalary = formattedSalary.replace(/^\s*-\s*/, "");

            const formattedFormData = {
            ...formData,
            applied_date: formData.applied_date || localDate,
            salary: formattedSalary, 
            };

            onSubmit(formattedFormData);
        } catch (error) {
            console.error("Error submitting job form", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        {/* Company & Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        name="company"
                        placeholder="e.g. Google"
                        value={formData.company || ""}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Position <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        name="position"
                        placeholder="e.g. Software Engineer"
                        value={formData.position || ""}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Status & Applied Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
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
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Applied Date</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="date"
                        name="applied_date"
                        value={formData.applied_date ? new Date(formData.applied_date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Salary */}
        <SalaryInput
        salary={formData.salary || ""}
        currency={formData.currency || "USD"}
        onSalaryChange={(salary) => {
            const regex = /^[0-9,]*\s*(-?\s*[0-9,]*)?$/;
            if (salary === "" || regex.test(salary)) {
            setFormData((prev) => ({ ...prev, salary }));
            }
        }}
        onCurrencyChange={(currency) => setFormData((prev) => ({ ...prev, currency }))}
        />

        {/* Location */}
        <div className="grid grid-cols-1 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        name="location"
                        placeholder="e.g. San Francisco, Remote"
                        value={formData.location || ""}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Job Link */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Link</label>
            <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    name="link"
                    type="url"
                    placeholder="https://..."
                    value={formData.link || ""}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
            </div>
        </div>

        {/* Description */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes / Description</label>
            <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                    name="description"
                    placeholder="Add any notes..."
                    value={formData.description || ""}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                    rows={3}
                    maxLength={2000}
                />
                <span className="absolute right-3 bottom-2 text-xs text-gray-400">
                    {formData.description?.length || 0}/2000
                </span>
            </div>
        </div>

        <Button
         type="submit" className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
            {submitLabel}
        </Button>
    </form>
    )
}