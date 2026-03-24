import { useState } from "react";
import Icon from "@/components/ui/icon";

const assignments = [
  {
    id: 1,
    subject: "Базы данных",
    title: "Курсовая работа: Проектирование БД интернет-магазина",
    deadline: "26 марта 2026",
    status: "pending",
    priority: "high",
    description: "Разработать концептуальную, логическую и физическую модели БД. ER-диаграмма, нормализация.",
  },
  {
    id: 2,
    subject: "Веб-разработка",
    title: "Лабораторная №6: REST API на Node.js",
    deadline: "28 марта 2026",
    status: "in_progress",
    priority: "medium",
    description: "Реализовать CRUD-операции, аутентификацию JWT, документацию Swagger.",
  },
  {
    id: 3,
    subject: "Алгоритмы",
    title: "Задача: Сортировка за O(n log n)",
    deadline: "1 апреля 2026",
    status: "pending",
    priority: "low",
    description: "Реализовать quicksort и mergesort, сравнить производительность на 10000 элементах.",
  },
  {
    id: 4,
    subject: "Математический анализ",
    title: "Контрольная работа №4",
    deadline: "20 марта 2026",
    status: "done",
    priority: "medium",
    description: "Интегралы, ряды Фурье, дифференциальные уравнения.",
  },
  {
    id: 5,
    subject: "Физика",
    title: "Лаб. работа: Электрические цепи",
    deadline: "15 марта 2026",
    status: "done",
    priority: "low",
    description: "Измерение характеристик RC и RL-цепей, построение графиков.",
  },
];

const statusMap = {
  pending: { label: "К выполнению", color: "bg-orange-50 text-orange-700 border-orange-200" },
  in_progress: { label: "В процессе", color: "bg-blue-50 text-blue-700 border-blue-200" },
  done: { label: "Сдано", color: "bg-green-50 text-green-700 border-green-200" },
};

const priorityDot = {
  high: "bg-red-400",
  medium: "bg-yellow-400",
  low: "bg-green-400",
};

type FilterType = "all" | "pending" | "in_progress" | "done";

export default function AssignmentsTab() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all" ? assignments : assignments.filter((a) => a.status === filter);
  const counts = {
    all: assignments.length,
    pending: assignments.filter((a) => a.status === "pending").length,
    in_progress: assignments.filter((a) => a.status === "in_progress").length,
    done: assignments.filter((a) => a.status === "done").length,
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-0.5">Задания</h2>
        <p className="text-gray-400 text-sm">Все задания и дедлайны</p>
      </div>

      {/* Фильтры */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {(["all", "pending", "in_progress", "done"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              filter === f
                ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {f === "all" ? "Все" : statusMap[f].label}
            <span className="ml-1.5 text-xs opacity-60">({counts[f]})</span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((task, i) => (
          <div
            key={task.id}
            className={`bg-white border border-gray-100 rounded-2xl p-5 card-clean-hover animate-fade-in ${
              task.status === "done" ? "opacity-50" : ""
            }`}
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    {task.subject}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[task.priority]}`} />
                    {task.priority === "high" ? "Срочно" : task.priority === "medium" ? "Обычный" : "Низкий"}
                  </span>
                </div>
                <h3 className={`font-semibold text-sm leading-snug ${task.status === "done" ? "line-through text-gray-400" : "text-gray-900"}`}>
                  {task.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{task.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold ${statusMap[task.status].color}`}>
                  {statusMap[task.status].label}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Icon name="Calendar" size={11} />
                  {task.deadline}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
