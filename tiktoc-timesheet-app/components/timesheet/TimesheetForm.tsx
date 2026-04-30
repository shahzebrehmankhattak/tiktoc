"use client";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
  PROJECTS: string[];
  WORK_TYPES: string[];
};

export default function TimesheetForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  isEdit,
  PROJECTS,
  WORK_TYPES,
}: Props) {
  const adj = (val: number) => {
    setForm((f: any) => ({
      ...f,
      hours: Math.min(24, Math.max(1, (f.hours || 1) + val)),
    }));
  };

  return (
    <>
      {/* Project */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-600 uppercase mb-1.5 block">
          Select Project
        </label>
        <select
          value={form.project}
          onChange={(e) => setForm((f: any) => ({ ...f, project: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Project Name</option>
          {PROJECTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Work Type */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-600 uppercase mb-1.5 block">
          Type of Work
        </label>
        <select
          value={form.workType}
          onChange={(e) => setForm((f: any) => ({ ...f, workType: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          {WORK_TYPES.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-600 uppercase mb-1.5 block">
          Task Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value }))}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
        />
      </div>

      {/* Hours */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-gray-600 uppercase mb-1.5 block">
          Hours
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => adj(-1)}
            className="w-8 h-8 border rounded-lg"
          >
            −
          </button>

          <input
            type="number"
            value={form.hours}
            onChange={(e) =>
              setForm((f: any) => ({
                ...f,
                hours: Number(e.target.value),
              }))
            }
            className="w-14 text-center border rounded-lg py-1.5 text-sm"
          />

          <button
            onClick={() => adj(1)}
            className="w-8 h-8 border rounded-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg"
        >
          {isEdit ? "Update entry" : "Add entry"}
        </button>

        <button
          onClick={onCancel}
          className="px-5 py-2.5 border rounded-lg"
        >
          Cancel
        </button>
      </div>
    </>
  );
}