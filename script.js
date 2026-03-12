const dashboardStats = {
  activeAlerts: 3,
  availableUnits: 0,
  onRoute: 1,
  staffOnShift: 8,
};

const incidents = [
  {
    id: 1024,
    object: "Клуб «Гагарин»",
    address: "просп. Испытателей, 37",
    status: "Тревога",
    startTime: Date.now() - 12 * 60000,
  },
  {
    id: 1025,
    object: "Контакт Бар",
    address: "Коломяжский просп., 15, корп. 2",
    status: "На маршруте",
    startTime: Date.now() - 5 * 60000,
  },
  {
    id: 1026,
    object: "Квартира",
    address: "ул. Плесецкая, 2",
    status: "Тревога",
    startTime: Date.now() - 2 * 60000,
  },
];

let incidentFilter = "Все";

const units = [
  {
    id: "ГЗ-21",
    crewSize: 2,
    vehicle: "7311ОВ/15",
    status: "На тревоге",
    statusStartTime: Date.now() - 8 * 60000,
  },
  {
    id: "ГЗ-22",
    crewSize: 2,
    vehicle: "2161ОВ/15",
    status: "На тревоге",
    statusStartTime: Date.now() - 5 * 60000,
  },
  {
    id: "ГЗ-23",
    crewSize: 2,
    vehicle: "6241ОВ/15",
    status: "На маршруте",
    statusStartTime: Date.now() - 2 * 60000,
  },
  {
    id: "ГЗ-24",
    crewSize: 2,
    vehicle: "4111ОВ/15",
    status: "На тревоге",
    statusStartTime: Date.now() - 11 * 60000,
  },
];

let events = [
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
  {
    time: "21:19",
    text: "Получен дополнительный сигнал по адресу ул. Плесецкая, 2.",
  },
  {
    time: "21:24",
    text: "Экипаж ГЗ-22 направлен на проверку сигнала.",
  },
];

const analyticsData = {
  processedSignals: 6,
  activeSignals: 3,
  crewsOnAlert: 3,
  crewsOnRoute: 1,
  staffOnShift: 8,
  averageResponseTime: "7 мин",
};

function getCurrentTimeString() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function getIncidentTimer(startTime) {

  const diff = Date.now() - startTime;

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  return `${m}:${s}`;
}

function getStatusTimer(startTime) {
  const diff = Date.now() - startTime;

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  return `${m}:${s}`;
}

function updateTime() {
  const timeElement = document.getElementById("current-time");
  if (!timeElement) return;

  timeElement.textContent = getCurrentTimeString();
}

function getBadgeClass(status) {
  if (status === "Тревога" || status === "На тревоге") {
    return "badge badge-alert";
  }

  if (status === "На маршруте") {
    return "badge badge-route";
  }

  if (status === "Прибыл") {
    return "badge badge-arrived";
  }

  if (status === "Проверка") {
    return "badge badge-check";
  }

  if (status === "Свободен") {
    return "badge badge-neutral";
  }

  return "badge";
}

function renderStats() {
  const statsContainer = document.getElementById("stats");
  if (!statsContainer) return;

  statsContainer.innerHTML = `
    <div class="card stat-card">
      <div class="stat-top">
        <p class="card-label">Активные тревоги</p>
        <span class="stat-dot danger-dot"></span>
      </div>
      <div class="stat-value-row">
        <h3>${dashboardStats.activeAlerts}</h3>
        <span class="stat-note">сейчас</span>
      </div>
    </div>

    <div class="card stat-card">
      <div class="stat-top">
        <p class="card-label">Свободные экипажи</p>
        <span class="stat-dot neutral-dot"></span>
      </div>
      <div class="stat-value-row">
        <h3>${dashboardStats.availableUnits}</h3>
        <span class="stat-note">из 4</span>
      </div>
    </div>

    <div class="card stat-card">
      <div class="stat-top">
        <p class="card-label">На маршруте</p>
        <span class="stat-dot success-dot"></span>
      </div>
      <div class="stat-value-row">
        <h3>${dashboardStats.onRoute}</h3>
        <span class="stat-note">экипаж</span>
      </div>
    </div>

    <div class="card stat-card">
      <div class="stat-top">
        <p class="card-label">Сотрудников на смене</p>
        <span class="stat-dot neutral-dot"></span>
      </div>
      <div class="stat-value-row">
        <h3>${dashboardStats.staffOnShift}</h3>
        <span class="stat-note">в составе</span>
      </div>
    </div>
  `;
}

function renderIncidents() {
  const incidentsContainer = document.getElementById("incidents-table");
  if (!incidentsContainer) return;

  const header = `
    <div class="table-row table-head incidents-head">
      <span>КУД</span>
      <span>Объект</span>
      <span>Адрес</span>
      <span>Статус</span>
      <span>Время</span>
    </div>
  `;

 const filteredIncidents = incidents.filter((incident) => {
  if (incidentFilter === "Все") return true;
  return incident.status === incidentFilter;
});

const rows = filteredIncidents
    .map((incident) => {
      const badgeClass =
        incident.status === "Тревога"
          ? "badge badge-alert"
          : incident.status === "На маршруте"
          ? "badge badge-route"
          : incident.status === "Прибыл"
          ? "badge badge-arrived"
          : incident.status === "Проверка"
          ? "badge badge-check"
          : incident.status === "На тревоге"
          ? "badge badge-alert"
          : incident.status === "Свободен"
          ? "badge badge-neutral"
          : "badge";

      const timer = incident.startTime
        ? getIncidentTimer(incident.startTime)
        : "00:00";

      return `
        <div class="table-row incident-row">
          <span class="incident-id">${incident.id}</span>
          <span class="incident-object">${incident.object}</span>
          <span class="incident-address">${incident.address}</span>
          <span class="${badgeClass}">${incident.status}</span>
          <span>${timer}</span>
        </div>
      `;
    })
    .join("");

  incidentsContainer.innerHTML = header + rows;
}

function setupIncidentForm() {
  const openButton = document.getElementById("open-incident-form");
  const form = document.getElementById("incident-form");
  const addButton = document.getElementById("add-incident-btn");

  if (openButton && form) {
    openButton.addEventListener("click", () => {
      form.classList.toggle("hidden");
    });
  }

  if (addButton) {
    addButton.addEventListener("click", addIncident);
  }
}

function addIncident() {
  const idInput = document.getElementById("incident-id");
  const objectInput = document.getElementById("incident-object");
  const addressInput = document.getElementById("incident-address");
  const statusInput = document.getElementById("incident-status");

  if (!idInput || !objectInput || !addressInput || !statusInput) return;

  const id = Number(idInput.value.trim());
  const object = objectInput.value.trim();
  const address = addressInput.value.trim();
  const status = statusInput.value;

  if (!id || !object || !address) return;

incidents.unshift({
  id,
  object,
  address,
  status,
  startTime: Date.now()
});

  events.unshift({
    time: getCurrentTimeString(),
    text: `Создан новый инцидент №${id} — ${object}.`,
  });

  renderIncidents();
  renderEvents();

  idInput.value = "";
  objectInput.value = "";
  addressInput.value = "";
  statusInput.value = "Тревога";
}

function changeUnitStatus(unitId, newStatus) {
  const unit = units.find((item) => item.id === unitId);

  if (!unit) return;

  unit.status = newStatus;
  unit.statusStartTime = Date.now();

  events.unshift({
    time: getCurrentTimeString(),
    text: `Экипаж ${unitId} переведён в статус «${newStatus}».`,
  });

  renderUnits();
  renderEvents();
}

function renderUnits() {
  const unitsContainer = document.getElementById("units-grid");
  if (!unitsContainer) return;

  const cards = units
    .map(
      (unit) => `
        <div class="unit-card">
          <div class="unit-card-top">
            <div>
              <h3 class="unit-card-title">${unit.id}</h3>
              <p class="unit-card-subtitle">${unit.crewSize} сотрудника</p>
            </div>
            <span class="${getBadgeClass(unit.status)}">${unit.status}</span>
          </div>

          <div class="unit-card-body">
            <div class="unit-card-row">
              <span class="unit-card-label">Транспорт</span>
              <span class="unit-card-value">${unit.vehicle}</span>
            </div>
            <div class="unit-card-row">
              <span class="unit-card-label">Смена</span>
              <span class="unit-card-value">20:00–08:00</span>
            </div>
            <div class="unit-card-row">
  <span class="unit-card-label">В статусе</span>
  <span class="unit-card-value">${getStatusTimer(unit.statusStartTime)}</span>
</div>
          </div>

          <div class="unit-actions">
            <button class="mini-btn mini-btn-danger" onclick="changeUnitStatus('${unit.id}', 'На тревоге')">
              Тревога
            </button>
            <button class="mini-btn mini-btn-success" onclick="changeUnitStatus('${unit.id}', 'На маршруте')">
              Маршрут
            </button>
            <button class="mini-btn mini-btn-neutral" onclick="changeUnitStatus('${unit.id}', 'Свободен')">
              Свободен
            </button>
          </div>
        </div>
      `
    )
    .join("");

  unitsContainer.innerHTML = cards;
}

function renderEvents() {
  const eventsContainer = document.getElementById("events-list");
  if (!eventsContainer) return;

  const rows = events
    .map(
      (event) => `
        <div class="event-log-row">
          <div class="event-log-time">${event.time}</div>
          <div class="event-log-content">${event.text}</div>
        </div>
      `
    )
    .join("");

  eventsContainer.innerHTML = rows;
}

function renderAnalytics() {
  const analyticsStatsContainer = document.getElementById("analytics-stats");
  const incidentSummaryContainer = document.getElementById("incident-summary");
  const unitsSummaryContainer = document.getElementById("units-summary");

  if (analyticsStatsContainer) {
    analyticsStatsContainer.innerHTML = `
      <div class="card stat-card">
        <div class="stat-top">
          <p class="card-label">Обработано сигналов</p>
          <span class="stat-dot neutral-dot"></span>
        </div>
        <div class="stat-value-row">
          <h3>${analyticsData.processedSignals}</h3>
          <span class="stat-note">за смену</span>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-top">
          <p class="card-label">Активные сигналы</p>
          <span class="stat-dot danger-dot"></span>
        </div>
        <div class="stat-value-row">
          <h3>${analyticsData.activeSignals}</h3>
          <span class="stat-note">сейчас</span>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-top">
          <p class="card-label">Среднее время реагирования</p>
          <span class="stat-dot success-dot"></span>
        </div>
        <div class="stat-value-row">
          <h3>${analyticsData.averageResponseTime}</h3>
          <span class="stat-note">в среднем</span>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-top">
          <p class="card-label">Сотрудников на смене</p>
          <span class="stat-dot neutral-dot"></span>
        </div>
        <div class="stat-value-row">
          <h3>${analyticsData.staffOnShift}</h3>
          <span class="stat-note">в составе</span>
        </div>
      </div>
    `;
  }

  if (incidentSummaryContainer) {
    incidentSummaryContainer.innerHTML = `
      <div class="analytics-item">
        <span class="analytics-label">Активных тревог</span>
        <span class="analytics-value">${analyticsData.activeSignals}</span>
      </div>
      <div class="analytics-item">
        <span class="analytics-label">Сигналов обработано</span>
        <span class="analytics-value">${analyticsData.processedSignals}</span>
      </div>
      <div class="analytics-item">
        <span class="analytics-label">Среднее время реагирования</span>
        <span class="analytics-value">${analyticsData.averageResponseTime}</span>
      </div>
    `;
  }

  if (unitsSummaryContainer) {
    unitsSummaryContainer.innerHTML = `
      <div class="analytics-item">
        <span class="analytics-label">Экипажей на тревоге</span>
        <span class="analytics-value">${analyticsData.crewsOnAlert}</span>
      </div>
      <div class="analytics-item">
        <span class="analytics-label">Экипажей на маршруте</span>
        <span class="analytics-value">${analyticsData.crewsOnRoute}</span>
      </div>
      <div class="analytics-item">
        <span class="analytics-label">Личный состав на смене</span>
        <span class="analytics-value">${analyticsData.staffOnShift}</span>
      </div>
    `;
  }
}

function setupIncidentFilters() {

  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {

    btn.addEventListener("click", () => {

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      incidentFilter = btn.dataset.filter;

      renderIncidents();

    });

  });

}

window.changeUnitStatus = changeUnitStatus;

updateTime();
setInterval(updateTime, 1000);

renderStats();
renderIncidents();
renderUnits();
renderEvents();
renderAnalytics();
setupIncidentForm();
setupIncidentFilters();

setInterval(renderIncidents, 1000);
setInterval(renderUnits, 1000);