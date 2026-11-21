// Contenido del CV. Edita aquí; el diseño se genera solo.
window.CV = {
  headline: "AI & Cloud Engineer · Estudiante de Ciencia de la Computación",
  roles: ["AI & Cloud Engineer", "Data Engineer", "Pipelines ETL / ELT", "Automatización con IA", "Estudiante de Ciencia de la Computación"],
  location: "Lima, Perú",
  about: "Estudiante de 9.º ciclo de Ciencia de la Computación en UTEC, especializado en el diseño e implementación de soluciones con Inteligencia Artificial y Computación en la Nube. Integro IA Generativa, arquitecturas agénticas y procesamiento inteligente de datos. Destaco por liderar comunidades tecnológicas y resolver desafíos de alta complejidad con infraestructuras cloud eficientes, escalables y orientadas al negocio.",
  experience: [
    {
      period: "oct. 2026 — actualidad",
      role: "AI & Cloud Engineer",
      org: "Consorcio Transporte Arequipa | Corredor Azul · Remoto",
      logo: "assets/logos/cta.png",
      bullets: [
        "Creación de aplicaciones para el control de estaciones y buses.",
        "Backend y base de datos de las aplicaciones con Supabase.",
        "Arquitectura e infraestructura cloud en AWS y Azure para alojar, almacenar y escalar los datos de la operación.",
        "Servicios de inteligencia artificial en Azure aplicados a la operación del transporte.",
        "Realización de un proyecto de machine learning para optimizar el cronograma de salida de buses."
      ],
      tags: ["Supabase", "AWS", "Azure", "Machine Learning", "Apps de control"]
    },
    {
      period: "jul. 2026 — oct. 2026",
      role: "Practicante de Tesorería",
      org: "Primax · Lima",
      logo: "assets/logos/primax.png",
      bullets: [
        "Sistema de lectura, registro y guardado automático de documentos digitales con IA y OCR en la plataforma IA Builder (Microsoft), con alertas según reglas de negocio y trazabilidad de los datos.",
        "Flujos inteligentes en Power Automate para automatizar procesos financieros y el control de gastos basados en reglas de negocio.",
        "Proceso ETL para datos bancarios masivos, con alertas de inconsistencias; extracción, limpieza y procesamiento automatizado para habilitar capas analíticas y de visualización.",
        "Dashboards ejecutivos para el seguimiento de flujos de caja y aplicaciones de escritorio personalizadas para requerimientos técnicos específicos.",
        "Bots de automatización, generación automática de PDFs masivos y reportes con actualización en tiempo real."
      ],
      tags: ["IA Builder", "OCR", "Power Automate", "Azure Databricks", "Power BI"]
    },
    {
      period: "may. 2026 — oct. 2026",
      role: "Data Engineer",
      org: "inmoba.app · Remoto, Latinoamérica",
      logo: "assets/logos/inmoba.png",
      bullets: [
        "Pipelines ETL/ELT robustos y automatizados con el ecosistema de Python (Pandas, GeoPandas, PyArrow, Shapely), garantizando integridad, calidad y consistencia de los datos.",
        "Lideré la migración de esquemas complejos desde formatos crudos (GeoJSON) hacia formatos binarios columnares de alta velocidad (GeoParquet / Parquet).",
        "Algoritmos de cruce espacial masivo (Spatial Joins) y datasets estructurados de alta pureza optimizados para modelos de Machine Learning.",
        "Reglas estrictas de calidad y gobernanza en memoria, con depuración de anomalías y reparación avanzada de topologías espaciales.",
        "Organización y seguridad de archivos masivos en AWS S3; gestión de base de datos y backend con Supabase."
      ],
      tags: ["Python", "GeoPandas", "Parquet", "Amazon S3", "Supabase"]
    },
    {
      period: "mar. 2026 — jun. 2026",
      role: "Practicante de Learning Lab",
      org: "Primax · Lima",
      logo: "assets/logos/primax.png",
      bullets: [
        "Base de datos en la nube según los requerimientos del equipo.",
        "ETL para registro masivo de datos bancarios, respetando las políticas de privacidad.",
        "Generación de dashboards."
      ],
      tags: ["Microsoft Excel", "Power BI"]
    }
  ],
  education: [
    {
      period: "ago. 2020 — nov. 2025",
      role: "Ciencia de la Computación",
      org: "UTEC - Universidad de Ingeniería y Tecnología",
      logo: "assets/logos/utec.png",
      text: "Ciencia de la Computación, 9.º ciclo. Desarrollo de software y de aplicaciones web."
    },
    {
      period: "jul. 2017 — dic. 2018",
      role: "Asistente en Diseño y Desarrollo de Apps",
      org: "IDAT",
      logo: "assets/logos/idat.png",
      text: "Diseño de aplicaciones móviles y desarrollo de aplicaciones web."
    }
  ],
  volunteering: [
    {
      period: "2024 — actualidad",
      role: "Representante Estudiantil de Ciencia de la Computación",
      org: "UTEC",
      text: ""
    },
    {
      period: "2024",
      role: "Datathon Cementos Pacasmayo",
      org: "UTEC",
      text: ""
    },
    {
      period: "nov. 2025 — abr. 2026",
      role: "Miembro del Consejo de Administración",
      org: "Club de Programación Competitiva · UTEC",
      text: "Planificación estratégica, liderazgo de equipos y gestión de eventos académicos de algoritmia. Organización de competencias y alianzas institucionales para crecer la comunidad."
    },
    {
      period: "abr. 2025 — dic. 2025",
      role: "Asistente del Consejo de Administración",
      org: "IEEE Computer Society · UTEC",
      text: "Promoción de la computación y las TI. Talleres especializados y proyectos de difusión tecnológica que fortalecieron el networking entre estudiantes y la industria."
    }
  ],
  skills: [
    { group: "IA & Data", items: ["IA Builder (OCR)", "IA Agéntica", "GenAI (Copilot, Gemini, Claude)", "ETL / ELT", "Pandas", "GeoPandas", "PyArrow", "Parquet", "Machine Learning"] },
    { group: "Cloud", items: ["Azure Databricks", "Azure Functions", "Cosmos DB", "Blob Storage", "API Management", "AWS Lambda", "AWS S3", "Athena", "DynamoDB", "API Gateway", "Supabase"] },
    { group: "BI & Herramientas", items: ["Power BI (Avanzado)", "Power Automate", "Excel (Avanzado)", "SAP", "Git"] },
    { group: "Lenguajes y DB", items: ["Python (Avanzado)", "SQL (Avanzado)", "VBA", "C++", "Java", "Transact-SQL"] },
    { group: "Idiomas", items: ["Español (Nativo)", "Inglés (Intermedio)"] }
  ],
  achievements: [
    { period: "2025", title: "Smart City Challenge Winner", org: "DARAT LATAM y UTEC Ventures", text: "Primer lugar en competencia de innovación tecnológica, desarrollando soluciones basadas en Inteligencia Artificial para ciudades inteligentes con impacto social." }
  ],
  journey: [
    { year: "2017", title: "Primeros pasos en apps", sub: "IDAT", text: "Diseño y desarrollo de aplicaciones móviles y web.", logo: "assets/logos/idat.png" },
    { year: "2020", title: "Ciencia de la Computación", sub: "UTEC", text: "Inicio de la carrera de Ciencia de la Computación en UTEC.", logo: "assets/logos/utec.png" },
    { year: "2025", title: "Smart City Challenge Winner", sub: "DARAT LATAM y UTEC Ventures", text: "Primer lugar con soluciones de Inteligencia Artificial para ciudades inteligentes con impacto social." },
    { year: "2026", title: "Primax", sub: "Learning Lab y Tesorería", text: "ETL bancario masivo, dashboards, IA con OCR y automatización de procesos financieros.", logo: "assets/logos/primax.png" },
    { year: "2026", title: "inmoba.app", sub: "Data Engineer", text: "Pipelines geoespaciales, spatial joins y migración de GeoJSON a GeoParquet.", logo: "assets/logos/inmoba.png" },
    { year: "2026", title: "Corredor Azul", sub: "AI & Cloud Engineer", text: "Apps de control de estaciones y buses, cloud en AWS y Azure, y machine learning para optimizar el cronograma de salida de buses.", logo: "assets/logos/cta.png" }
  ],
  graphLinks: [
    ["Python (Avanzado)", "Pandas"], ["Python (Avanzado)", "GeoPandas"], ["Pandas", "ETL / ELT"],
    ["PyArrow", "Parquet"], ["GeoPandas", "Parquet"], ["ETL / ELT", "Azure Databricks"], ["ETL / ELT", "AWS S3"],
    ["Power Automate", "IA Builder (OCR)"], ["Power BI (Avanzado)", "SQL (Avanzado)"], ["Supabase", "SQL (Avanzado)"],
    ["AWS Lambda", "Python (Avanzado)"], ["Azure Functions", "Python (Avanzado)"], ["Machine Learning", "Python (Avanzado)"],
    ["Machine Learning", "Pandas"], ["IA Agéntica", "GenAI (Copilot, Gemini, Claude)"], ["Azure Databricks", "Python (Avanzado)"],
    ["Excel (Avanzado)", "VBA"], ["Cosmos DB", "Azure Functions"], ["DynamoDB", "AWS Lambda"], ["Athena", "AWS S3"]
  ],
  certifications: [
    { title: "Introduction to AI applications and agents in Azure", org: "Microsoft", date: "feb. 2026", link: "https://learn.microsoft.com/api/achievements/share/es-es/JeffQuintana-1707/NMTHGYNF?sharingId=C4B278AEE00760EB" },
    { title: "Querying and modifying data with Transact-SQL", org: "Microsoft", date: "feb. 2026", link: "https://learn.microsoft.com/api/achievements/share/es-es/JeffQuintana-1707/UA4CY6G3?sharingId=C4B278AEE00760EB" },
    { title: "Data Analysis with Python", org: "freeCodeCamp", date: "ago. 2024", link: "https://www.freecodecamp.org/certification/jeffryhilarioquintana/data-analysis-with-python-v7" },
    { title: "Responsive Web Design", org: "freeCodeCamp", date: "nov. 2023", link: "https://freecodecamp.org/certification/jeffryhilarioquintana/responsive-web-design" },
    { title: "MapInfo Pro v17", org: "Intech Group Perú", date: "jul. 2019", link: "" },
    { title: "Mobile application design and development", org: "IDAT", date: "dic. 2018", link: "" },
    { title: "Web application design and development", org: "IDAT", date: "dic. 2018", link: "" }
  ],
  contact: [
    { label: "LinkedIn", value: "jeffryarturohilarioquintana", href: "https://www.linkedin.com/in/jeffryarturohilarioquintana/" },
    { label: "GitHub", value: "jeffHQ", href: "https://github.com/jeffHQ" },
    { label: "Ubicación", value: "Lima, Perú", href: "" }
  ]
};
