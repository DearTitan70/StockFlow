import { useMemo, useState } from "react";

// Datos semilla usados para demostrar el flujo del módulo mientras se conecta la API real.
const inventoryItems = [
  {
    code: "EQ-001",
    name: "Laptop HP ProBook 450",
    category: "Laptops",
    quantity: 12,
    status: "Disponible",
    date: "2024-01-15",
  },
  {
    code: "EQ-002",
    name: "Monitor Dell P2419H",
    category: "Monitores",
    quantity: 8,
    status: "En Uso",
    date: "2024-02-10",
  },
  {
    code: "EQ-003",
    name: "Switch Cisco Catalyst",
    category: "Redes",
    quantity: 1,
    status: "Mantenimiento",
    date: "2023-11-05",
  },
  {
    code: "EQ-004",
    name: "Teclado Logitech K120",
    category: "Periféricos",
    quantity: 25,
    status: "Disponible",
    date: "2024-03-20",
  },
];

const users = [
  {
    name: "Carlos Jefe",
    document: "CC: 1.092.345.678",
    email: "carlos.jefe@sena.edu.co",
    role: "Jefe",
    status: "Activo",
  },
  {
    name: "Ana Supervisor",
    document: "CC: 1.123.456.789",
    email: "ana.supervisor@sena.edu.co",
    role: "Supervisor",
    status: "Activo",
  },
  {
    name: "Roberto Técnico",
    document: "CC: 1.234.567.890",
    email: "roberto.tecnico@sena.edu.co",
    role: "Técnico",
    status: "Activo",
  },
  {
    name: "María Exempleada",
    document: "CC: 1.000.111.222",
    email: "maria.ex@sena.edu.co",
    role: "Técnico",
    status: "Inactivo",
  },
];

// Perfiles y navegación separados por rol para cumplir el control de acceso del prototipo.
const roleProfiles = {
  jefe: {
    name: "Carlos Jefe",
    firstName: "Carlos",
    label: "Administrador Jefe",
    initials: "CJ",
    accent: "#3B82F6",
  },
  supervisor: {
    name: "Ana Supervisor",
    firstName: "Ana",
    label: "Supervisor",
    initials: "AS",
    accent: "#10B981",
  },
  tecnico: {
    name: "Roberto Técnico",
    firstName: "Roberto",
    label: "Técnico Operativo",
    initials: "RT",
    accent: "#F59E0B",
  },
};

const navByRole = {
  jefe: [
    { id: "dashboard", label: "Dashboard", icon: "▦" },
    { id: "inventario", label: "Gestión de Inventario", icon: "☰" },
    { id: "usuarios", label: "Gestión de Usuarios", icon: "◎" },
    { id: "reportes", label: "Reportes", icon: "▣" },
    { id: "configuracion", label: "Configuración", icon: "⚙" },
  ],
  supervisor: [
    { id: "supervisor", label: "Inicio", icon: "▦" },
    { id: "inventario", label: "Consultar Inventario", icon: "☰" },
    { id: "usuarios", label: "Consultar Usuarios", icon: "◎" },
  ],
  tecnico: [{ id: "tecnico", label: "Panel Técnico", icon: "▦" }],
};

function StatusBadge({ status }) {
  const className =
    {
      Disponible: "badge-success",
      Activo: "badge-success",
      "En Uso": "badge-primary",
      Jefe: "badge-primary",
      Mantenimiento: "badge-warning",
      Supervisor: "badge-warning",
      Inactivo: "badge-danger",
    }[status] || "badge-neutral";

  return <span className={`badge ${className}`}>{status}</span>;
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(role, username.trim());
  }

  return (
    <main className="login-screen">
      <section className="login-container" aria-labelledby="login-title">
        <div className="login-logo" aria-hidden="true">
          ◈
        </div>
        <h1 id="login-title" className="login-title">
          Bienvenido
        </h1>
        <p className="login-subtitle">Sistema de Gestión de Inventarios SENA</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-group">
            <span className="form-label">Usuario</span>
            <input
              className="form-control"
              type="text"
              value={username}
              placeholder="Ingrese su usuario"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label className="form-group">
            <span className="form-label">Contraseña</span>
            <input
              className="form-control"
              type="password"
              value={password}
              placeholder="Ingrese su contraseña"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <label className="form-group">
            <span className="form-label">Rol (Para Demostración)</span>
            <select
              className="form-control"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value="" disabled>
                Seleccione el rol a simular
              </option>
              <option value="jefe">Jefe</option>
              <option value="supervisor">Supervisor</option>
              <option value="tecnico">Técnico</option>
            </select>
          </label>

          <div className="login-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              Recordarme
            </label>
            <button className="text-button" type="button">
              ¿Olvidó su contraseña?
            </button>
          </div>

          <button className="btn btn-primary login-btn" type="submit">
            ↪ Ingresar
          </button>
        </form>
      </section>
    </main>
  );
}

function Shell({ activeView, children, onLogout, onNavigate, role, sidebarOpen, setSidebarOpen }) {
  const profile = roleProfiles[role];
  const navItems = navByRole[role];

  return (
    <div className="app-container">
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <span className="brand-icon" aria-hidden="true">
            ◈
          </span>
          <h2>SENA Inv</h2>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeView === item.id ? "active" : ""}`}
              onClick={() => {
                onNavigate(item.id);
                setSidebarOpen(false);
              }}
              type="button"
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-link logout-link" onClick={onLogout} type="button">
            <span aria-hidden="true">↩</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Cerrar menú"
          onClick={() => setSidebarOpen(false)}
          type="button"
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-toggle"
            aria-label="Abrir menú"
            onClick={() => setSidebarOpen(true)}
            type="button"
          >
            ☰
          </button>

          {role === "tecnico" && (
            <div className="quick-search">
              <span aria-hidden="true">⌕</span>
              <input placeholder="Búsqueda rápida código/nombre..." />
            </div>
          )}

          <div className="topbar-spacer" />
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">{profile.name}</div>
              <div className="user-role">{profile.label}</div>
            </div>
            <div className="avatar" style={{ backgroundColor: profile.accent }}>
              {profile.initials}
            </div>
          </div>
        </header>

        <div className="content-wrapper">{children}</div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, tone, value }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`} aria-hidden="true">
        {icon}
      </div>
      <div className="stat-details">
        <h3>{label}</h3>
        <p>{value}</p>
      </div>
    </article>
  );
}

function Dashboard({ onNavigate, role }) {
  const profile = roleProfiles[role];

  if (role === "supervisor") {
    return <SupervisorPanel />;
  }

  if (role === "tecnico") {
    return <TecnicoPanel />;
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Bienvenido, {profile.firstName}</h1>
        <button className="btn btn-primary" onClick={() => onNavigate("inventario")} type="button">
          + Registrar Nuevo Elemento
        </button>
      </div>

      <section className="dashboard-cards" aria-label="Resumen de inventario">
        <StatCard icon="▥" label="Total de Elementos" tone="primary" value="1,245" />
        <StatCard icon="✓" label="Elementos Disponibles" tone="success" value="856" />
        <StatCard icon="⌘" label="En Mantenimiento" tone="warning" value="42" />
        <StatCard icon="◎" label="Usuarios Activos" tone="violet" value="18" />
      </section>

      <section className="dashboard-grid">
        <article className="panel chart-panel">
          <div className="panel-header">
            <h2 className="panel-title">Estado del Inventario por Categoría</h2>
          </div>
          <div className="panel-body">
            <BarChart />
          </div>
        </article>

        <RecentActivity />
      </section>
    </>
  );
}

function BarChart() {
  const categories = [
    ["Laptops", 150, 15],
    ["Monitores", 230, 5],
    ["Escritorios", 45, 2],
    ["Servidores", 12, 1],
    ["Redes", 80, 4],
    ["Periféricos", 339, 15],
  ];
  const max = 360;

  return (
    <div className="bar-chart" aria-label="Gráfico de barras de inventario por categoría">
      {categories.map(([label, available, maintenance]) => (
        <div className="bar-row" key={label}>
          <span className="bar-label">{label}</span>
          <div className="bar-track">
            <span className="bar available" style={{ width: `${(available / max) * 100}%` }} />
            <span className="bar maintenance" style={{ width: `${(maintenance / max) * 100}%` }} />
          </div>
          <strong>{available}</strong>
        </div>
      ))}
      <div className="chart-legend">
        <span>
          <i className="legend-dot available" /> Cantidad Disponible
        </span>
        <span>
          <i className="legend-dot maintenance" /> En Mantenimiento
        </span>
      </div>
    </div>
  );
}

function RecentActivity() {
  const activity = [
    ["+", "Ingreso de 10 Laptops HP", "Hace 2 horas por Técnico 1", "success"],
    ["⌘", "Mantenimiento Servidor A", "Hace 5 horas por Supervisor 2", "warning"],
    ["−", "Baja Monitor Dell XPS", "Ayer por Jefe", "danger"],
  ];

  return (
    <article className="panel">
      <div className="panel-header">
        <h2 className="panel-title">Actividad Reciente</h2>
      </div>
      <div className="panel-body activity-list">
        {activity.map(([icon, title, meta, tone]) => (
          <div className="activity-item" key={title}>
            <span className={`activity-icon ${tone}`} aria-hidden="true">
              {icon}
            </span>
            <div>
              <p>{title}</p>
              <small>{meta}</small>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function InventoryTable({ editable = false, showDate = false }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Estado</th>
            {showDate && <th>Fecha Ingreso</th>}
            {editable && <th className="text-right">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <StatusBadge status={item.status} />
              </td>
              {showDate && <td>{item.date}</td>}
              {editable && (
                <td className="actions-cell">
                  <button className="action-btn edit" title="Editar" type="button">
                    ✎
                  </button>
                  <button
                    className="action-btn delete"
                    title="Eliminar"
                    onClick={() => window.confirm("¿Desea eliminar este registro?")}
                    type="button"
                  >
                    ×
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Inventario() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Gestión de Inventario</h1>
        <button className="btn btn-primary" type="button">
          + Agregar Nuevo Elemento
        </button>
      </div>

      <section className="panel">
        <div className="panel-body">
          <div className="form-row filters-row">
            <label className="form-group wide-field">
              <span className="form-label">Buscar por Código o Nombre</span>
              <input className="form-control" placeholder="Ej: Laptop, EQ-001..." />
            </label>
            <label className="form-group">
              <span className="form-label">Categoría</span>
              <select className="form-control">
                <option>Todas</option>
                <option>Laptops</option>
                <option>Monitores</option>
                <option>Periféricos</option>
              </select>
            </label>
            <label className="form-group">
              <span className="form-label">Estado</span>
              <select className="form-control">
                <option>Todos</option>
                <option>Disponible</option>
                <option>Mantenimiento</option>
                <option>Dado de baja</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="panel">
        <InventoryTable editable />
        <div className="panel-footer">
          <span>Mostrando 1 a 4 de 24 registros</span>
          <div className="pagination">
            <button className="btn btn-outline" disabled type="button">
              Anterior
            </button>
            <button className="btn btn-primary compact" type="button">
              1
            </button>
            <button className="btn btn-outline compact" type="button">
              2
            </button>
            <button className="btn btn-outline compact" type="button">
              3
            </button>
            <button className="btn btn-outline" type="button">
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Usuarios() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Gestión de Usuarios Activos</h1>
        <button className="btn btn-primary" type="button">
          + Crear Nuevo Usuario
        </button>
      </div>

      <section className="panel">
        <div className="panel-header responsive-panel-header">
          <h2 className="panel-title">Directorio de Personal</h2>
          <input className="form-control search-input" placeholder="Buscar usuario..." />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre y Documento</th>
                <th>Correo Electrónico</th>
                <th>Rol Asignado</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>
                    <strong>{user.name}</strong>
                    <br />
                    <small>{user.document}</small>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <StatusBadge status={user.role} />
                  </td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn edit" title="Editar usuario" type="button">
                      ✎
                    </button>
                    <button className="action-btn" title="Restablecer contraseña" type="button">
                      ⚿
                    </button>
                    <button className="action-btn delete" title="Eliminar" type="button">
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function Reportes() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Generación de Reportes</h1>
        <div className="button-group">
          <button className="btn btn-outline" type="button">
            PDF Exportar PDF
          </button>
          <button className="btn btn-success" type="button">
            XLS Exportar Excel
          </button>
        </div>
      </div>

      <section className="panel">
        <div className="panel-header slim-header">
          <h2 className="panel-title muted-title">Configuración del Reporte</h2>
        </div>
        <div className="panel-body">
          <div className="form-row filters-row">
            <label className="form-group">
              <span className="form-label">Tipo de Reporte</span>
              <select className="form-control" defaultValue="general">
                <option value="general">Inventario General</option>
                <option value="movimientos">Movimientos Recientes</option>
                <option value="mantenimiento">Equipos en Mantenimiento</option>
                <option value="bajas">Equipos Dados de Baja</option>
              </select>
            </label>
            <label className="form-group">
              <span className="form-label">Fecha Inicio</span>
              <input className="form-control" type="date" defaultValue="2024-01-01" />
            </label>
            <label className="form-group">
              <span className="form-label">Fecha Fin</span>
              <input className="form-control" type="date" defaultValue="2024-12-31" />
            </label>
            <div className="form-group align-end">
              <button className="btn btn-primary full-width" type="button">
                Generar Reporte
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="reports-grid">
        <article className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Distribución por Estado</h2>
          </div>
          <div className="panel-body chart-center">
            <div className="donut-chart" aria-label="856 disponibles, 320 en uso, 42 en mantenimiento, 27 bajas" />
            <div className="donut-legend">
              <span>Disponibles</span>
              <span>En Uso</span>
              <span>Mantenimiento</span>
              <span>Bajas</span>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Movimientos Mensuales</h2>
          </div>
          <div className="panel-body">
            <LineChart />
          </div>
        </article>
      </section>
    </>
  );
}

function LineChart() {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
  const entries = [65, 59, 80, 81, 56, 55, 40];
  const exits = [28, 48, 40, 19, 86, 27, 90];

  return (
    <div className="line-chart" aria-label="Movimientos mensuales">
      {months.map((month, index) => (
        <div className="line-point" key={month}>
          <span className="line-column">
            <i className="entry-bar" style={{ height: `${entries[index]}%` }} />
            <i className="exit-bar" style={{ height: `${exits[index]}%` }} />
          </span>
          <small>{month}</small>
        </div>
      ))}
      <div className="chart-legend">
        <span>
          <i className="legend-dot entry" /> Ingresos
        </span>
        <span>
          <i className="legend-dot exit" /> Salidas/Bajas
        </span>
      </div>
    </div>
  );
}

function SupervisorPanel() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Panel de Supervisión</h1>
      </div>

      <section className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Filtros de Búsqueda</h2>
        </div>
        <div className="panel-body">
          <div className="form-row filters-row">
            <label className="form-group">
              <span className="form-label">Categoría</span>
              <select className="form-control">
                <option>Todas</option>
                <option>Laptops</option>
                <option>Monitores</option>
                <option>Equipos de Red</option>
              </select>
            </label>
            <label className="form-group">
              <span className="form-label">Estado</span>
              <select className="form-control">
                <option>Todos</option>
                <option>Disponible</option>
                <option>En Uso</option>
                <option>Mantenimiento</option>
              </select>
            </label>
            <label className="form-group">
              <span className="form-label">Fecha de Ingreso</span>
              <input className="form-control" type="date" />
            </label>
            <div className="form-group align-end">
              <button className="btn btn-primary full-width" type="button">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Lista de Elementos</h2>
        </div>
        <InventoryTable showDate />
      </section>
    </>
  );
}

function TecnicoPanel() {
  const quickItems = [
    ["CBL-01", "Cable HDMI 2m", 45],
    ["MSE-04", "Mouse Inalámbrico Genius", 12],
    ["TON-12", "Tóner Impresora HP 25A", 3],
  ];

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Gestión Operativa de Inventario</h1>
      </div>

      <section className="technician-grid">
        <article className="panel quick-register">
          <div className="panel-header tinted-header">
            <h2 className="panel-title">Registro Rápido de Equipo</h2>
          </div>
          <form className="panel-body">
            <label className="form-group">
              <span className="form-label">Código de Barras o Serial</span>
              <input className="form-control" placeholder="Ej: SN-492948X" required />
            </label>
            <label className="form-group">
              <span className="form-label">Nombre del Elemento</span>
              <input className="form-control" placeholder="Ej: Mouse inalámbrico" required />
            </label>
            <div className="form-row">
              <label className="form-group">
                <span className="form-label">Categoría</span>
                <select className="form-control" required>
                  <option value="">Seleccione</option>
                  <option>Periféricos</option>
                  <option>Accesorios</option>
                  <option>Repuestos</option>
                </select>
              </label>
              <label className="form-group">
                <span className="form-label">Cantidad a ingresar</span>
                <input className="form-control" type="number" min="1" defaultValue="1" required />
              </label>
            </div>
            <label className="form-group">
              <span className="form-label">Observaciones</span>
              <textarea className="form-control" rows="3" placeholder="Estado del equipo o detalles..." />
            </label>
            <button className="btn btn-primary full-width large-button" type="submit">
              Guardar Elemento
            </button>
          </form>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Edición Rápida de Inventario</h2>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Cantidad Actual</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {quickItems.map(([code, name, quantity]) => (
                  <tr key={code}>
                    <td>{code}</td>
                    <td>{name}</td>
                    <td>
                      <input className="form-control quantity-input" type="number" defaultValue={quantity} />
                    </td>
                    <td>
                      <button className="btn btn-success compact-action" type="button">
                        ✓ Actualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </>
  );
}

function Placeholder({ title }) {
  return (
    <section className="panel">
      <div className="panel-body empty-state">
        <h1 className="page-title">{title}</h1>
        <p>Esta sección queda lista para conectar sus formularios y reglas de negocio.</p>
      </div>
    </section>
  );
}

function App() {
  const [session, setSession] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Normaliza la primera vista según el rol autenticado para mantener una sola experiencia SPA.
  const currentView = useMemo(() => {
    if (!session) return null;
    if (session.role === "supervisor" && activeView === "dashboard") return "supervisor";
    if (session.role === "tecnico" && activeView === "dashboard") return "tecnico";
    return activeView;
  }, [activeView, session]);

  function handleLogin(role, username) {
    setSession({ role, username });
    setActiveView(role === "jefe" ? "dashboard" : role);
  }

  function handleLogout() {
    setSession(null);
    setActiveView("dashboard");
    setSidebarOpen(false);
  }

  if (!session) {
    return <Login onLogin={handleLogin} />;
  }

  const view = currentView;

  return (
    <Shell
      activeView={view}
      onLogout={handleLogout}
      onNavigate={setActiveView}
      role={session.role}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      {view === "dashboard" && <Dashboard onNavigate={setActiveView} role={session.role} />}
      {view === "supervisor" && <SupervisorPanel />}
      {view === "tecnico" && <TecnicoPanel />}
      {view === "inventario" && <Inventario />}
      {view === "usuarios" && <Usuarios />}
      {view === "reportes" && <Reportes />}
      {view === "configuracion" && <Placeholder title="Configuración" />}
    </Shell>
  );
}

export default App;
