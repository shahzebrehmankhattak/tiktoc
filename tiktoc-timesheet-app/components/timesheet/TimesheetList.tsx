// components/timesheet/TimesheetList.tsx
"use client";

import { Task, Timesheet } from "@/types/Timesheet";
import { Ellipsis, Plus } from "lucide-react";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import TimesheetForm from "./TimesheetForm";

const PROJECTS = [
  "Homepage Development",
  "Mobile App",
  "API Integration",
  "Design System",
];
const WORK_TYPES = [
  "Bug Fixes",
  "Feature Development",
  "Code Review",
  "Testing",
  "Documentation",
];

const EMPTY_FORM = {
  project: "",
  workType: "Bug Fixes",
  description: "",
  hours: 1,
};

type ModalState = {
  open: boolean;
  dayKey: string;
  editId?: number;
};

const initialModal: ModalState = {
  open: false,
  dayKey: "",
  editId: undefined,
};


const TimesheetList = ({ timesheet }: { timesheet: Timesheet }) => {
  const [tasks, setTasks] = useState<Task[]>(timesheet.tasks);
  const [nextId, setNextId] = useState(1000);
const [modal, setModal] = useState<ModalState>(initialModal);
  const [form, setForm] = useState(EMPTY_FORM);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0);
  const progress = Math.min(100, (totalHours / 40) * 100);

  const openAdd = (dayKey: string) => {
  setForm(EMPTY_FORM);
  setModal({
    open: true,
    dayKey,
  });
};
  const openEdit = (task: Task) => {
  setForm({
    project: task.project,
    workType: task.workType,
    description: task.description,
    hours: task.hours,
  });

  setModal({
    open: true,
    dayKey: task.dayKey,
    editId: task.id,
  });

  setOpenMenu(null);
};
const closeModal = () => {
  setModal(initialModal);
};

  const handleSubmit = () => {
    if (!form.project || !modal) return;
    if (modal.editId) {
      setTasks(
        tasks.map((t) => (t.id === modal.editId ? { ...t, ...form } : t)),
      );
    } else {
      setTasks([...tasks, { id: nextId, dayKey: modal.dayKey, ...form }]);
      setNextId(nextId + 1);
    }
    closeModal();
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
    setOpenMenu(null);
  };
  const adj = (delta: number) =>
    setForm((f) => ({
      ...f,
      hours: Math.min(24, Math.max(1, f.hours + delta)),
    }));

  return (
    <div onClick={() => setOpenMenu(null)}>
      <main className="max-w-5xl mx-auto mt-2 px-4 pb-3">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-4">
          <div className="px-2 py-4 border-b border-gray-100 flex items-start justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-bold text-gray-900 text-2xl">
                This Week Timesheet
              </h2>
              <p className="text-xs text-[#6B7280] mt-3">
                {timesheet.startDate} – {timesheet.endDate}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-right text-[#FF8A4C] font-semibold mb-1">
                  {totalHours}/40 hrs
                </p>
                <div className="w-40 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1.5 bg-[#FF8A4C] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {timesheet.days.map((day) => {
            const dayTasks = tasks.filter((t) => t.dayKey === day.key);
            return (
              <div key={day.key} className=" border-gray-100 flex items-center">
                <p className="w-[100px] text-center pt-3 pb-1 text-sm font-semibold text-gray-700">
                  {day.label}
                </p>
                <div className="w-full">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className=" mt-2 flex items-center gap-3 px-6 py-2.5 border border-[#E5E7EB] hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      <span className="flex-1 text-sm text-gray-600 truncate">
                        {task.description || task.project}
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {task.hours} hrs
                      </span>
                      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-md truncate max-w-[120px]">
                        {task.project}
                      </span>

                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === task.id ? null : task.id)
                          }
                          className="cursor-pointer text-gray-400 hover:text-gray-700 px-1.5 py-0.5 rounded hover:bg-gray-100 text-sm"
                        >
                          <Ellipsis />
                        </button>
                        {openMenu === task.id && (
                          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[100px]">
                            <button
                              onClick={() => openEdit(task)}
                              className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="px-6 py-2 flex justify-center">
                    <button
                      onClick={() => openAdd(day.key)}
                      className="cursor-pointer w-full border border-dashed border-[#1A56DB] flex items-center justify-center gap-1.5 text-sm text-[#1A56DB] bg-[#E1EFFE] hover:bg-[#E1EFFE] px-2 py-1.5 rounded-lg transition"
                    >
                      <Plus />
                      Add new task
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal */}
      {modal && (

      <Modal
  open={modal.open}
  title={modal.editId ? "Edit Entry" : "Add New Entry"}
  onClose={closeModal}
>
  <TimesheetForm
    form={form}
    setForm={setForm}
    onSubmit={handleSubmit}
    onCancel={closeModal}
    isEdit={!!modal.editId}
    PROJECTS={PROJECTS}
    WORK_TYPES={WORK_TYPES}
  />
</Modal>
      )}
    </div>
  );
};

export default TimesheetList;
