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
  pending: { label: "К выполнению", color: "text-orange-300 bg-orange-500/10 border-orange-500/25" },
  in_progress: { label: "В процессе", color: "text-blue-300 bg-blue-500/10 border-blue-500/25" },
  done: { label: "Сдано", color: "text-green-300 bg-green-500/10 border-green-500/25" },
};

const priorityMap = {
  high: { label: "Срочно", dot: "bg-red-400" },
  medium: { label: "Обычный", dot: "bg-yellow-400" },
  low: { label: "Низкий", dot: "bg-green-400" },
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
        <h2 className="text-2xl font-montserrat font-bold text-white mb-1">Задания</h2>
        <p className="text-muted-foreground text-sm">Все задания и дедлайны</p>
      </div>

      {/* Фильтры */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(["all", "pending", "in_progress", "done"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              filter === f
                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                : "glass border-white/8 text-muted-foreground hover:text-white"
            }`}
          >
            {f === "all" ? "Все" : statusMap[f].label}
            <span className="ml-2 text-xs opacity-60">({counts[f]})</span>
          </button>
        ))}
      </div>

      {/* Список заданий */}
      <div className="space-y-3">
        {filtered.map((task, i) => (
          <div
            key={task.id}
            className={`glass glass-hover rounded-2xl p-5 animate-fade-in ${
              task.status === "done" ? "opacity-60" : ""
            }`}
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-medium text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                    {task.subject}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full ${priorityMap[task.priority].dot}`} />
                    {priorityMap[task.priority].label}
                  </span>
                </div>
                <h3 className={`font-semibold text-sm leading-snug ${task.status === "done" ? "line-through text-muted-foreground" : "text-white"}`}>
                  {task.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{task.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${statusMap[task.status].color}`}>
                  {statusMap[task.status].label}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Calendar" size={12} />
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
