export type IncidentStatus = "Тревога" | "На маршруте";

export type Incident = {
  id: number;
  object: string;
  address: string;
  status: IncidentStatus;
};

export type UnitStatus = "На тревоге" | "На маршруте" | "Свободен";

export type Unit = {
  id: string;
  crewSize: number;
  vehicle: string;
  status: UnitStatus;
};

export type EventLog = {
  time: string;
  text: string;
};

export type DashboardStats = {
  activeAlerts: number;
  availableUnits: number;
  onRoute: number;
  staffOnShift: number;
};