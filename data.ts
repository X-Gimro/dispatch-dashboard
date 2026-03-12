import type { DashboardStats, EventLog, Incident, Unit } from "./types";

export const dashboardStats: DashboardStats = {
  activeAlerts: 3,
  availableUnits: 0,
  onRoute: 1,
  staffOnShift: 8,
};

export const incidents: Incident[] = [
  {
    id: 1024,
    object: "Клуб «Гагарин»",
    address: "просп. Испытателей, 37",
    status: "Тревога",
  },
  {
    id: 1025,
    object: "Контакт Бар",
    address: "Коломяжский просп., 15, корп. 2",
    status: "На маршруте",
  },
  {
    id: 1026,
    object: "Квартира",
    address: "ул. Плесецкая, 2",
    status: "Тревога",
  },
];

export const units: Unit[] = [
  {
    id: "ГЗ-21",
    crewSize: 2,
    vehicle: "7311ОВ/15",
    status: "На тревоге",
  },
  {
    id: "ГЗ-22",
    crewSize: 2,
    vehicle: "2161ОВ/15",
    status: "На тревоге",
  },
  {
    id: "ГЗ-23",
    crewSize: 2,
    vehicle: "6241ОВ/15",
    status: "На маршруте",
  },
  {
    id: "ГЗ-24",
    crewSize: 2,
    vehicle: "4111ОВ/15",
    status: "На тревоге",
  },
];

export const events: EventLog[] = [
  {
    time: "20:00",
    text: "Начало ночной смены. Заступили 4 экипажа.",
  },
  {
    time: "21:03",
    text: "Получен сигнал по объекту «Клуб Гагарин».",
  },
  {
    time: "21:05",
    text: "Экипаж ГЗ-21 назначен на выезд.",
  },
  {
    time: "21:12",
    text: "Экипаж ГЗ-21 прибыл на объект.",
  },
];