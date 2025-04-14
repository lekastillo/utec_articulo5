import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// Categorías para agrupar las causas
const categorias = [
  "Todas",
  "Conducta deshonesta",
  "Conducta laboral deficiente",
  "Conducta irrespetuosa",
  "Daños y riesgos",
  "Inasistencias y ausencias",
  "Situaciones post-arresto",
  "Pérdida de confianza",
  "Actos inmorales",
  "Uso de sustancias"
];

// Datos de las causas
const causas = [
  {
    id: 1,
    titulo: "Certificados falsos",
    descripcion: "Por haber engañado el trabajador al patrono al celebrar el contrato, presentándole recomendaciones o certificados falsos sobre su aptitud. Esta causa dejará de tener efectos después de treinta días de prestar sus servicios el trabajador.",
    categoria: "Conducta deshonesta",
    imagen: "document"
  },
  {
    id: 2,
    titulo: "Negligencia reiterada",
    descripcion: "Por negligencia reiterada del trabajador.",
    categoria: "Conducta laboral deficiente",
    imagen: "x-circle"
  },
  {
    id: 3,
    titulo: "Pérdida de confianza",
    descripcion: "Por la pérdida de la confianza del patrono en el trabajador, cuando éste desempeña un cargo de dirección, vigilancia, fiscalización u otro de igual importancia y responsabilidad. El Juez respectivo apreciará prudencialmente los hechos que el patrono estableciere para justificar la pérdida de la confianza.",
    categoria: "Pérdida de confianza",
    imagen: "shield-off"
  },
  {
    id: 4,
    titulo: "Revelar secretos",
    descripcion: "Por revelar el trabajador secretos de la empresa o aprovecharse de ellos; o por divulgar asuntos administrativos de la misma que puedan causar perjuicios al patrono.",
    categoria: "Conducta deshonesta",
    imagen: "eye"
  },
  {
    id: 5,
    titulo: "Actos inmorales",
    descripcion: "Por actos graves de inmoralidad cometidos por el trabajador dentro de la empresa o establecimiento; o fuera de éstos, cuando se encontrare en el desempeño de sus labores.",
    categoria: "Actos inmorales",
    imagen: "alert-triangle"
  },
  {
    id: 6,
    titulo: "Irrespeto al patrono",
    descripcion: "Por cometer el trabajador, en cualquier circunstancia, actos de irrespeto en contra del patrono o de algún jefe de la empresa o establecimiento, especialmente en el lugar de trabajo o fuera de él, durante el desempeño de las labores. Todo sin que hubiere precedido provocación inmediata de parte del jefe o patrono.",
    categoria: "Conducta irrespetuosa",
    imagen: "thumbs-down"
  },
  {
    id: 7,
    titulo: "Irrespeto a familia del patrono",
    descripcion: "Por cometer el trabajador actos graves de irrespeto en contra del cónyuge, ascendiente, descendiente o hermanos del patrono, cuando el trabajador conociere el vínculo familiar y siempre que no haya precedido provocación inmediata de parte de dichas personas.",
    categoria: "Conducta irrespetuosa",
    imagen: "users"
  },
  {
    id: 8,
    titulo: "Perturbar el orden",
    descripcion: "Por cometer el trabajador actos que perturben gravemente el orden en la empresa o establecimiento, alterando el normal desarrollo de las labores.",
    categoria: "Conducta irrespetuosa",
    imagen: "shuffle"
  },
  {
    id: 9,
    titulo: "Daños materiales",
    descripcion: "Por ocasionar el trabajador, maliciosamente o por negligencia grave, perjuicios materiales en los edificios, maquinarias, materias primas, obras, instalaciones o demás objetos relacionados con el trabajo; o por lesionar con dolo o negligencia grave, cualquier otra propiedad o los intereses económicos del patrono.",
    categoria: "Daños y riesgos",
    imagen: "axe"
  },
  {
    id: 10,
    titulo: "Peligro a personas",
    descripcion: "Por poner el trabajador en grave peligro, por malicia o negligencia grave, la seguridad de las personas mencionadas en las causales 6ª y 7ª de este artículo, o la de sus compañeros de trabajo.",
    categoria: "Daños y riesgos",
    imagen: "skull"
  },
  {
    id: 11,
    titulo: "Peligro a instalaciones",
    descripcion: "Por poner el trabajador en grave peligro, por malicia o negligencia grave, la seguridad de los edificios, maquinarias, materias primas, obras, instalaciones y demás objetos relacionados con el trabajo.",
    categoria: "Daños y riesgos",
    imagen: "bomb"
  },
  {
    id: 12,
    titulo: "Faltar al trabajo",
    descripcion: "Por faltar el trabajador a sus labores sin el permiso del patrono o sin causa justificada, durante dos días laborales completos y consecutivos; o durante tres días laborales no consecutivos en un mismo mes calendario entendiéndose portales, en este último caso, no sólo los días completos sino aún los medios días.",
    categoria: "Inasistencias y ausencias",
    imagen: "calendar-x"
  },
  {
    id: 13,
    titulo: "No presentarse a labores",
    descripcion: "Por no presentarse el trabajador, sin causa justa, a desempeñar sus labores en la fecha convenida para iniciarlas; o por no presentarse a reanudarlas, sin justa causa dentro de los tres días a que se refiere el Art. 45.",
    categoria: "Inasistencias y ausencias",
    imagen: "clock-off"
  },
  {
    id: 14,
    titulo: "Post-arresto con falta contra patrono",
    descripcion: "Cuando no obstante presentarse el trabajador a reanudar sus labores dentro de los tres días siguientes a aquél en que fue puesto en libertad, después de haber cumplido pena de arresto, la falta cometida hubiere sido contra la persona o bienes del patrono o de su cónyuge, ascendientes, descendientes o hermanos, o contra la persona o propiedad de algún jefe de la empresa o establecimiento o de algún compañero de trabajo.",
    categoria: "Situaciones post-arresto",
    imagen: "gavel"
  },
  {
    id: 15,
    titulo: "Post-detención por delito",
    descripcion: "Cuando no obstante presentarse el trabajador a reanudar sus labores dentro de los tres días siguientes a aquél en que fue puesto en libertad, después de haber estado en detención provisional, el delito por el que se le procesa hubiere sido contra la persona del patrono, de su cónyuge, ascendientes, descendientes o hermanos, o en la persona de algún jefe de la empresa o establecimiento o compañero de trabajo; y en todo caso, cuando se trate de delitos contra la propiedad, contra la Hacienda Pública o de falsedad.",
    categoria: "Situaciones post-arresto",
    imagen: "handcuffs"
  },
  {
    id: 16,
    titulo: "Desobediencia",
    descripcion: "Por desobedecer el trabajador al patrono o a sus representantes en forma manifiesta, sin motivo justo y siempre que se trate de asuntos relacionados con el desempeño de sus labores.",
    categoria: "Conducta laboral deficiente",
    imagen: "hand"
  },
  {
    id: 17,
    titulo: "Contravenir medidas de seguridad",
    descripcion: "Por contravenir el trabajador en forma manifiesta y reiterada las medidas preventivas o los procedimientos para evitar riesgos profesionales.",
    categoria: "Conducta laboral deficiente",
    imagen: "alert-octagon"
  },
  {
    id: 18,
    titulo: "Uso de sustancias",
    descripcion: "Por ingerir el trabajador bebidas embriagantes o hacer uso de narcóticos o drogas enervantes en el lugar del trabajo, o por presentarse a sus labores o desempeñar las mismas en estado de ebriedad o bajo la influencia de un narcótico o droga enervante.",
    categoria: "Uso de sustancias",
    imagen: "wine"
  },
  {
    id: 19,
    titulo: "Infracciones reiteradas",
    descripcion: "Por infringir el trabajador algunas de las prohibiciones contenidas en el Art. 32, siempre que por igual motivo se le haya amonestado, dentro de los seis meses anteriores, por medio de la Dirección General de Inspección de Trabajo.",
    categoria: "Conducta laboral deficiente",
    imagen: "repeat"
  },
  {
    id: 20,
    titulo: "Incumplimiento grave",
    descripcion: "Por incumplir o violar el trabajador, gravemente, cualquiera de las obligaciones o prohibiciones emanadas de alguna de las fuentes a que se refiere el Art. 24.",
    categoria: "Conducta laboral deficiente",
    imagen: "ban"
  }
];

// Componente para mostrar cada ícono
const IconoCategoria = ({ nombre }) => {
  // Simulamos íconos con formas básicas
  const renderIcono = () => {
    switch (nombre) {
      case "document":
        return (
          <div className="bg-blue-500 p-2 rounded">
            <div className="w-6 h-8 bg-white rounded"></div>
          </div>
        );
      case "x-circle":
        return (
          <div className="bg-red-500 p-2 rounded-full">
            <div className="w-6 h-6 flex items-center justify-center text-white font-bold">X</div>
          </div>
        );
      case "shield-off":
        return (
          <div className="bg-yellow-500 p-2 rounded-lg">
            <div className="w-6 h-6 border-2 border-white"></div>
          </div>
        );
      case "eye":
        return (
          <div className="bg-purple-500 p-2 rounded-full">
            <div className="w-6 h-6 border-2 border-white rounded-full"></div>
          </div>
        );
      case "alert-triangle":
        return (
          <div className="bg-orange-500 p-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-white"></div>
          </div>
        );
      case "thumbs-down":
        return (
          <div className="bg-red-700 p-2 rounded">
            <div className="w-6 h-6 border-2 border-white"></div>
          </div>
        );
      case "users":
        return (
          <div className="bg-blue-700 p-2 rounded-full">
            <div className="w-6 h-6 flex items-center justify-center text-white">👪</div>
          </div>
        );
      case "shuffle":
        return (
          <div className="bg-green-500 p-2 rounded">
            <div className="w-6 h-6 flex items-center justify-center text-white">↔️</div>
          </div>
        );
      case "axe":
        return (
          <div className="bg-red-800 p-2 rounded">
            <div className="w-6 h-6 flex items-center justify-center text-white">🪓</div>
          </div>
        );
      case "skull":
        return (
          <div className="bg-gray-800 p-2 rounded-full">
            <div className="w-6 h-6 flex items-center justify-center text-white">💀</div>
          </div>
        );
      case "bomb":
        return (
          <div className="bg-gray-700 p-2 rounded-full">
            <div className="w-6 h-6 flex items-center justify-center text-white">💣</div>
          </div>
        );
      case "calendar-x":
        return (
          <div className="bg-blue-600 p-2 rounded">
            <div className="w-6 h-6 border-2 border-white">❌</div>
          </div>
        );
      case "clock-off":
        return (
          <div className="bg-cyan-500 p-2 rounded-full">
            <div className="w-6 h-6 border-2 border-white rounded-full">⏱️</div>
          </div>
        );
      case "gavel":
        return (
          <div className="bg-brown-500 p-2 rounded">
            <div className="w-6 h-6 flex items-center justify-center text-white">⚖️</div>
          </div>
        );
      case "handcuffs":
        return (
          <div className="bg-gray-600 p-2 rounded">
            <div className="w-6 h-6 flex items-center justify-center text-white">🔒</div>
          </div>
        );
      case "hand":
        return (
          <div className="bg-amber-500 p-2 rounded">
            <div className="w-6 h-6 flex items-center justify-center text-white">✋</div>
          </div>
        );
      case "alert-octagon":
        return (
          <div className="bg-red-500 p-2 rounded-lg">
            <div className="w-6 h-6 flex items-center justify-center text-white">⚠️</div>
          </div>
        );
      case "wine":
        return (
          <div className="bg-purple-800 p-2 rounded">
            <div className="w-6 h-6 flex items-center justify-center text-white">🍷</div>
          </div>
        );
      case "repeat":
        return (
          <div className="bg-green-700 p-2 rounded">
            <div className="w-6 h-6 flex items-center justify-center text-white">🔄</div>
          </div>
        );
      case "ban":
        return (
          <div className="bg-red-600 p-2 rounded-full">
            <div className="w-6 h-6 flex items-center justify-center text-white">🚫</div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-500 p-2 rounded">
            <div className="w-6 h-6"></div>
          </div>
        );
    }
  };

  return <div className="flex items-center justify-center">{renderIcono()}</div>;
};

// Componente de tarjeta animada
const TarjetaCausa = ({ causa }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="bg-blue-600 p-4 text-white flex items-center space-x-4">
        <IconoCategoria nombre={causa.imagen} />
        <h3 className="font-bold text-lg">{causa.titulo}</h3>
      </div>
      <div className="p-4">
        <div className="text-xs text-blue-600 mb-2 bg-blue-100 inline-block px-2 py-1 rounded-full">
          {causa.categoria}
        </div>
        <p className="text-gray-700 text-sm">{causa.descripcion}</p>
      </div>
    </div>
  );
};

// Componente Header
const Header = () => {
  return (
    <div className="bg-white shadow-md p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img 
          src="https://www.utec.edu.sv/assets/img/commons/utec_brand.png" 
          alt="UTEC Logo" 
          className="h-12"
        />
        <h1 className="text-xl md:text-2xl font-bold text-blue-800">
          Tarea Luis Castillo - Ilustración del artículo 50 del código de Trabajo
        </h1>
      </div>
    </div>
  );
};

// Componente Sidebar
const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'stats', label: 'Estadísticas' },
    { id: 'guide', label: 'Presentación Guiada' }
  ];

  return (
    <div className="bg-blue-800 text-white w-64 p-4 h-full fixed left-0 top-0 overflow-y-auto">
      <div className="py-4 mb-6 text-center">
        <h2 className="text-xl font-bold">Menú</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`w-full text-left p-3 rounded transition-colors ${
                  activePage === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-700'
                }`}
                onClick={() => setActivePage(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-0 right-0 px-4 text-center text-xs text-blue-300">
        <p>© 2025 Luis Castillo</p>
        <p>Derechos Reservados</p>
      </div>
    </div>
  );
};

// Componente Home Page
const HomePage = ({ busqueda, setBusqueda, categoriaActual, setCategoriaActual }) => {
  // Filtramos las causas según búsqueda y categoría
  const causasFiltradas = causas.filter(causa => {
    const coincideBusqueda = causa.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
                            causa.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincidenCategoria = categoriaActual === "Todas" || causa.categoria === categoriaActual;
    
    return coincideBusqueda && coincidenCategoria;
  });

  return (
    <div>
      {/* Panel de control */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Buscar por título o descripción..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={categoriaActual}
              onChange={(e) => setCategoriaActual(e.target.value)}
            >
              {categorias.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Lista de causas filtradas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          Causas de Terminación ({causasFiltradas.length} resultados)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {causasFiltradas.map(causa => (
            <TarjetaCausa key={causa.id} causa={causa} />
          ))}
          
          {causasFiltradas.length === 0 && (
            <div className="col-span-full text-center p-8 bg-gray-100 rounded-lg">
              <p className="text-gray-500">No se encontraron causas que coincidan con la búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente Stats Page
const StatsPage = () => {
  // Preparamos los datos para el gráfico
  const categoriasUnicas = [...new Set(causas.map(causa => causa.categoria))];
  const datosPastel = categoriasUnicas.map(cat => ({
    name: cat,
    value: causas.filter(causa => causa.categoria === cat).length
  }));

  // Colores para el gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#666'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Distribución por Categorías</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={datosPastel}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {datosPastel.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} causas`, `Cantidad`]} />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold text-blue-800 mb-4">Resumen de categorías</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {datosPastel.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: COLORS[index % COLORS.length] }}>
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-gray-600">{item.value} causas - {((item.value / causas.length) * 100).toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Guide Page
const GuidePage = () => {
  const [pasoActual, setPasoActual] = useState(0);
  
  // Causas para el stepper (elegimos 5 principales)
  const causasImportantes = [causas[0], causas[2], causas[3], causas[8], causas[17]];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Causas Principales - Presentación Guiada</h2>
      
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {causasImportantes.map((_, index) => (
            <div 
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer text-lg
                ${pasoActual === index ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setPasoActual(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 relative rounded-full">
          <div 
            className="absolute h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(pasoActual / (causasImportantes.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 min-h-64 flex items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex-shrink-0">
            <IconoCategoria nombre={causasImportantes[pasoActual].imagen} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-blue-800 mb-2">{causasImportantes[pasoActual].titulo}</h3>
            <div className="text-sm text-blue-600 my-2 bg-blue-100 inline-block px-3 py-1 rounded-full">
              {causasImportantes[pasoActual].categoria}
            </div>
            <p className="text-gray-700 text-lg mt-4">{causasImportantes[pasoActual].descripcion}</p>
            <div className="mt-6">
              <p className="text-gray-600">
                <strong>Causa {pasoActual + 1} de 5</strong> - Esta es una de las causales más relevantes para el despido sin responsabilidad patronal.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button 
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-medium"
          onClick={() => setPasoActual(prev => Math.max(0, prev - 1))}
          disabled={pasoActual === 0}
        >
          Anterior
        </button>
        <button 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
          onClick={() => setPasoActual(prev => Math.min(causasImportantes.length - 1, prev + 1))}
          disabled={pasoActual === causasImportantes.length - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

// Componente principal
export default function App() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActual, setCategoriaActual] = useState("Todas");
  const [activePage, setActivePage] = useState("home");
  
  // Contenido según la página activa
  const renderContent = () => {
    switch (activePage) {
      case 'stats':
        return <StatsPage />;
      case 'guide':
        return <GuidePage />;
      default:
        return <HomePage 
          busqueda={busqueda} 
          setBusqueda={setBusqueda} 
          categoriaActual={categoriaActual} 
          setCategoriaActual={setCategoriaActual} 
        />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <div className="ml-64 min-h-screen">
        <Header />
        
        <main className="container mx-auto p-4">
          {renderContent()}
        </main>
        
        <footer className="bg-white p-4 text-center text-gray-500 text-sm border-t">
          <p>Aplicación desarrollada para ilustrar el artículo 50 del Código de Trabajo</p>
          <p>© 2025 Luis Castillo - Universidad Tecnológica de El Salvador</p>
        </footer>
      </div>
    </div>
  );
}