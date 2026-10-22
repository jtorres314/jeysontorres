import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  JurisprudenciaItem,
  SimulatorCase,
  AcademicResource,
  NormaCategory,
  NormaItem,
  RequerimientoPericial,
  MenuItemConfig,
} from '../types';

interface AppContextType {
  // Menu configuration
  menuItems: MenuItemConfig[];
  toggleMenuItemVisibility: (id: string) => void;
  updateMenuItemLabel: (id: string, label: string) => void;
  resetMenuItems: () => void;

  // Auth state
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;

  // Articles (Blog Ciberseguridad)
  articles: Article[];
  addArticle: (art: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, art: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Jurisprudencia (Análisis Jurídico)
  jurisprudencias: JurisprudenciaItem[];
  addJurisprudencia: (item: Omit<JurisprudenciaItem, 'id'>) => void;
  updateJurisprudencia: (id: string, item: Partial<JurisprudenciaItem>) => void;
  deleteJurisprudencia: (id: string) => void;

  // Simuladores
  simulators: SimulatorCase[];
  addSimulator: (sim: Omit<SimulatorCase, 'id'>) => void;
  updateSimulator: (id: string, sim: Partial<SimulatorCase>) => void;
  deleteSimulator: (id: string) => void;

  // Aula Abierta / Recursos
  academicResources: AcademicResource[];
  addAcademicResource: (res: Omit<AcademicResource, 'id'>) => void;
  updateAcademicResource: (id: string, res: Partial<AcademicResource>) => void;
  deleteAcademicResource: (id: string) => void;

  // Rincón Normativo
  normaCategories: NormaCategory[];
  addNormaCategory: (cat: Omit<NormaCategory, 'id'>) => void;
  updateNormaCategory: (id: string, cat: Partial<NormaCategory>) => void;
  deleteNormaCategory: (id: string) => void;
  addSubcategoryToCategory: (categoryId: string, subcategoryTitle: string) => void;
  deleteSubcategoryFromCategory: (categoryId: string, subcategoryTitle: string) => void;

  normaItems: NormaItem[];
  addNormaItem: (item: Omit<NormaItem, 'id'>) => void;
  updateNormaItem: (id: string, item: Partial<NormaItem>) => void;
  deleteNormaItem: (id: string) => void;

  // Requerimientos
  requerimientos: RequerimientoPericial[];
  addRequerimiento: (req: Omit<RequerimientoPericial, 'id'>) => void;
  updateRequerimientoStatus: (id: string, status: RequerimientoPericial['estado']) => void;
}

const DEFAULT_ARTICLES: Article[] = [
  {
    id: 'art-1',
    category: 'forense',
    categoryLabel: 'INFORMÁTICA FORENSE',
    title: 'Estándares ISO/IEC 27037 y la Preservación de Evidencia en Dispositivos Móviles iOS/Android',
    summary: 'Guía metodológica sobre la adquisición física vs. lógica, superación de cifrado por hardware (Secure Enclave / TEE) y aseguramiento de la cadena de custodia con hash SHA-256 inmutable.',
    fullContent: `El rápido avance en los mecanismos de seguridad de los sistemas operativos móviles ha transformado radicalmente la práctica forense digital. En la actualidad, el Secure Enclave de iOS y el Trusted Execution Environment (TEE) en Android impiden las extracciones físicas tradicionales por chip-off o BGA en dispositivos modernos.

Principios de la ISO/IEC 27037:
1. Relevancia y Admisibilidad: El perito debe garantizar que la evidencia recopilada sea directamente vinculante al hecho investigado.
2. Repetibilidad y Auditabilidad: Cualquier extracción debe poder ser replicada por un segundo perito con idénticos resultados hash.
3. Preservación del Estado Volátil: Aplicación inmediata de aislamientos de Faraday para evitar comandos remotos de borrado (Wipe).

Procedimiento Técnico Recomendado:
- Extracción Lógica Avanzada utilizando agentes firmados con llaves de desarrollo.
- Generación instantánea de firmas criptográficas (SHA-256/SHA-3) para las imágenes extraídas.
- Inserción del acta de transferencia de custodia con sellado de tiempo RFC 3161.`,
    readTime: '12 MIN',
    date: '15 ENE 2026',
    ref: 'ISO/IEC 27037:2012 • RFC 3227',
    tag: 'TÉCNICO & PROBATORIO',
    imageUrl: '',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'art-2',
    category: 'ia-derecho',
    categoryLabel: 'IA & DERECHO',
    title: 'Deepfakes y Manipulación Sintética: Impugnación de Pruebas Audiovisuales en el Proceso Penal',
    summary: 'Análisis dogmático de las técnicas de detección espectrográfica, artefactos en el dominio de la frecuencia y falta de metadatos EXIF para desvirtuar evidencias alteradas mediante inteligencia artificial generativa.',
    fullContent: `Con la proliferación de modelos difusivos y redes generativas antagónicas (GANs), la manipulación de audio y video ha alcanzado niveles de fotorrealismo inéditos. En el escenario procesal penal, la presentación de grabaciones de voz o video sin verificar representa un riesgo crítico para las garantías fundamentales.

Técnicas de Verificación Forense Audiovisual:
- Análisis Espectrográfico de Frecuencias: Evaluación de la continuidad de frecuencias de fondo y ambiente acústico.
- Artefactos de Compresión y Resampling: Detección de inconsistencias en el dominio de los coeficientes DCT.
- Verificación de Estructura de Contenedores MP4/WAV: Presencia de átomos no estándar generados por librerías sintéticas de síntesis vocal (FFmpeg modificado, ElevenLabs, etc.).`,
    readTime: '18 MIN',
    date: '10 ENE 2026',
    ref: 'LEY 1273 DE 2009 • CSJ SP-1284',
    tag: 'JURISPRUDENCIAL & TÉCNICO',
    imageUrl: '/assets/aistudio/Image_11_57816b99.png',
    hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'art-3',
    category: 'evidencia-digital',
    categoryLabel: 'EVIDENCIA DIGITAL',
    title: 'Cortejo e Impugnación de Capturas de Pantalla (Screenshots) en Procesos Civiles y Laborales',
    summary: 'La ineficacia probatoria de las imágenes estáticas sin archivo de datos subyacente. Inaplicación del principio de mismisidad y criterios del CGP Art. 247 para tacha de falsedad e inspección judicial.',
    fullContent: `Las simples capturas de pantalla impresas en papel o aportadas como PDF estáticos carecen de la estructura técnica de un verdadero mensaje de datos. Al carecer de encabezados SMTP, tokens de sesión o códigos fuente HTML asociados, una captura puede ser creada en segundos editando el DOM en cualquier navegador web.

Criterios de Impugnación Procesal:
1. Vulneración del Principio de Mismisidad: Imposibilidad de cotejar que la imagen corresponda fielmente al registro en el servidor de origen.
2. Tacha de Falsedad (Art. 269 CGP): La sola manifestación de no reconocer el contenido impone a la parte aportante la carga de solicitar peritaje técnico sobre el dispositivo emisor.
3. Solución Técnica: Exhibición del dispositivo o volcado forense en formato E01/AFF4.`,
    readTime: '10 MIN',
    date: '02 ENE 2026',
    ref: 'CGP ART. 247 • LEY 527 DE 1999',
    tag: 'DERECHO PROBATORIO',
    imageUrl: '/assets/aistudio/Image_9_91b12981.png',
    hash: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b'
  },
  {
    id: 'art-4',
    category: 'ciberdelincuencia',
    categoryLabel: 'CIBERDELINCUENCIA',
    title: 'Ransomware Industrial y Responsabilidad Penal del Oficial de Ciberseguridad (CISO)',
    summary: 'Tipicidad de los delitos de daño informático (Art. 269D) y obstrucción a redes (Art. 269E). El debate sobre la posición de garante y el cumplimiento del deber objetivo de cuidado.',
    fullContent: `Frente a incidentes de Ransomware Doble Extorsión (exfiltración de datos confidenciales y cifrado de volúmenes LUN/SAN), los entes investigadores han comenzado a auditar las acciones previas de las directivas de TI para determinar negligencias graves o dolo eventual en la custodia de datos sensibles.

Aspectos Dogmáticos Relevantes:
- Delito de Daño Informático (Art. 269D C.P.): Destrucción, alteración o inutilización de datos lógicos.
- Deber Objetivo de Cuidado: Implementación de esquemas de respaldo inmutable (Air-Gapped), arquitectura Zero Trust y monitoreo SIEM/EDR activo las 24 horas.`,
    readTime: '15 MIN',
    date: '20 DIC 2024',
    ref: 'NIST SP 800-61 • ART. 269D C.P.',
    tag: 'DOGMÁTICA PENAL',
    imageUrl: '/assets/aistudio/Image_13_4bcab5da.jpeg',
    hash: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666ec13ab110'
  }
];

const DEFAULT_JURISPRUDENCIA: JurisprudenciaItem[] = [
  {
    id: 'jur-1',
    radicado: 'SP-1284-2023 / Rad. 58192',
    title: 'Inadmisibilidad de Capturas Simples de WhatsApp sin Preservación de Metadatos',
    court: 'Corte Suprema de Justicia',
    sala: 'Sala de Casación Penal',
    magistrado: 'Dr. Gerson Chaverra Castro',
    year: 2023,
    courtType: 'suprema',
    categoryTag: 'EVIDENCIA DIGITAL & PROCESAL PENAL',
    sintesisHechos: 'En proceso por extorsión, la Fiscalía aportó imágenes impresas de conversaciones de WhatsApp sin el dispositivo celular emisor ni informe de extracción forense mediante software especializado (Cellebrite / Oxygen). La defensa tachó las impresiones alegando manipulación digital y ruptura de mismisidad.',
    ratioDecidendi: 'La Sala reiteró que las simples capturas de pantalla son representaciones gráficas vulnerables a la manipulación directa en navegadores o aplicaciones de edición. Para ostentar pleno valor probatorio como mensaje de datos (Ley 527/99, Art. 10 y CPP, Art. 247), se exige la verificación de la integridad del soporte de origen, los metadatos de envío/recepción y la observancia estricta de la cadena de custodia (CPP, Art. 254).',
    comentarioTorres: 'Análisis Pericial de Jeyson Torres: Esta providencia sienta un hito fundamental para la práctica forense colombiana. Obliga a los investigadores y apoderados a abandonar la mala práctica de adjuntar PDFs o screenshots. Toda evidencia de mensajería instantánea debe ser fijada mediante volcado físico/lógico o mediante inspección judicial con extracción del hash SHA-256 del archivo db.crypt14/15.',
    reglaProbatoria: 'Toda prueba digital consistente en texto o multimedia generada en redes sociales o mensajería instantánea requiere la aportación del mensaje de datos original o una copia forensicamente válida respaldada con cadena de custodia.',
    hash: '4a8f9c1e02a5d...7b9e3a102c',
    tags: ['WhatsApp', 'Cadena de Custodia', 'Capturas de Pantalla', 'Mensajes de Datos']
  },
  {
    id: 'jur-2',
    radicado: 'Sentencia C-604/19',
    title: 'Exclusión Probatoria de Información Obtenida sin Orden Judicial Cifrada',
    court: 'Corte Constitucional',
    sala: 'Pleno de la Corte',
    magistrado: 'Dr. Alejandro Linares Cantillo',
    year: 2019,
    courtType: 'constitucional',
    categoryTag: 'DERECHOS FUNDAMENTALES & PRIVACIDAD',
    sintesisHechos: 'Demanda de inconstitucionalidad contra normas del Código Penal que permitían la inspección técnica de servidores web y bases de datos privadas en investigaciones administrativas sin control de garantías previo.',
    ratioDecidendi: 'El derecho a la intimidad y al debido proceso (Art. 15 y 29 C.P.) se extiende plenamente a la dimensión digital, incluyendo el entorno de la nube, discos duros remotos y comunicaciones cifradas. Cualquier intromisión en un sistema informático requiere orden judicial previa emitida por juez de control de garantías salvo caso de flagrancia o consentimiento expreso.',
    comentarioTorres: 'Análisis Pericial de Jeyson Torres: La Corte Constitucional alinea la doctrina patria con los precedentes internacionales (Riley v. California). Los datos alojados en infraestructuras de cloud computing gozan de la misma protección reservada a la correspondencia física y al domicilio personal.',
    reglaProbatoria: 'La evidencia digital obtenida mediante inspección o volcado de servidores sin la debida autorización judicial o sin control posterior estricto está afectada de nulidad de pleno derecho por vulneración de la cláusula de exclusión (Art. 29 C.P.).',
    hash: '82c0f1a9b43e7...112a9bc401',
    tags: ['Garantías Constitucionales', 'Cómputo en Nube', 'Control Judicial', 'Exclusión Probatoria']
  },
  {
    id: 'jur-3',
    radicado: 'CE-SU-2024-0012',
    title: 'Firma Digital, Equivalencia Funcional y Validez del Documento Electrónico Público',
    court: 'Consejo de Estado',
    sala: 'Sala de lo Contencioso Administrativo',
    magistrado: 'Dra. María Adriana Marín',
    year: 2024,
    courtType: 'estado',
    categoryTag: 'DERECHO ADMINISTRATIVO & CONTRATACIÓN',
    sintesisHechos: 'Controversia contractual sobre la validez de un contrato administrativo firmado mediante plataforma web de suscripción con firma mecánica y estampilla de tiempo sin certificado de entidad de certificación acreditada por ONAC.',
    ratioDecidendi: 'El Consejo de Estado diferenció formalmente la firma electrónica simple de la firma digital acreditada (Ley 527/99, Art. 28). Si bien ambas son válidas bajo el principio de libertad de medios, la firma digital con certificado emitido por entidad abierta ONAC goza de la presunción legal de no repudio e integridad del documento.',
    comentarioTorres: 'Análisis Pericial de Jeyson Torres: Clarificación esencial para litigios administrativos. La firma electrónica requiere prueba pericial para demostrar la atribuibilidad si es tachada, mientras que la firma digital invierte la carga probatoria hacia quien la niega.',
    reglaProbatoria: 'Los actos administrativos y contratos públicos suscritos con firma digital abierta poseen presunción de autenticidad e integridad inalterable.',
    hash: '9f83a2c019d4b...3321ef9a88',
    tags: ['Firma Digital', 'Ley 527/99', 'ONAC', 'Documento Electrónico']
  }
];

const DEFAULT_SIMULATORS: SimulatorCase[] = [
  {
    id: 'sim-1',
    code: 'CASE-2026-01',
    title: 'Aseguramiento de Dispositivo en Escena de Delito Ciber-Informático',
    timeLimit: '05:00 MIN',
    difficulty: 'INTERMEDIO',
    questionNumber: 'CASO 01 / 03',
    categoryTag: 'CADENA DE CUSTODIA (ISO/IEC 27037)',
    simulatorType: 'concurso',
    concursoName: 'Convocatoria Rama Judicial - Jueces & Magistrados',
    ramaDerecho: 'Penal',
    isExamenIdoneidad: true,
    puntuacionRequerida: 80,
    question: 'Durante una diligencia de allanamiento y registro, el perito identifica una laptop encendida con una sesión activa de terminal remota cifrada y un proceso de borrado de logs en curso. ¿Cuál es el protocolo de preservación inmediata que garantiza la admisibilidad probatoria según la norma ISO/IEC 27037 y la jurisprudencia CSJ?',
    scenarioDetails: {
      label: 'RAM Capturada: 16 GB DDR4 • SSD Cifrado BitLocker',
      hash: 'SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      compliance: 'Cumplimiento Normativo: ISO/IEC 27037 & RFC 3227'
    },
    options: [
      {
        key: 'A',
        title: 'Desconectar de inmediato la fuente de alimentación física (Hard Shutdown)',
        subtitle: 'Apagado intempestivo sacando el cable o batería para congelar el sistema.',
        isCorrect: false
      },
      {
        key: 'B',
        title: 'Realizar volcado de memoria RAM en vivo (Live RAM Acquisition) e aislar red de inmediato',
        subtitle: 'Uso de herramientas portátiles validadas (FTK Imager / Lime) para capturar claves de cifrado y volátiles antes de aislar la red con Faraday.',
        isCorrect: true
      },
      {
        key: 'C',
        title: 'Cerrar la tapa del equipo y transportarlo en bolsa antiestática común',
        subtitle: 'Poner el equipo en modo suspensión sin aislar señales inalámbricas.',
        isCorrect: false
      },
      {
        key: 'D',
        title: 'Ejecutar comando de apagado ordenado del sistema operativo (Graceful Shutdown)',
        subtitle: 'Utilizar el menú Inicio / Shutdown para garantizar que se guarden los archivos del sistema.',
        isCorrect: false
      }
    ],
    explanation: {
      isoFoundation: 'ISO/IEC 27037 (Cláusula 6.2 - Adquisición de Memoria Volátil): Cuando el sistema está encendido, la memoria RAM contiene claves de cifrado BitLocker/VeraCrypt en texto claro, procesos activos y sockets de red. Desconectar el equipo destruye irremediablemente esta evidencia volátil.',
      legalFoundation: 'CSJ SP-54910-2023: El perito debe aplicar la técnica menos destructiva disponible. El volcado en vivo con aislamiento de red preserva la mismisidad y evita comandos de borrado remoto.',
      generatedHash: 'SHA-256: 8f3c7a9e102d4b...e418a09bc2 (Firma Digital de Validación)'
    }
  },
  {
    id: 'sim-2',
    code: 'CASE-2026-02',
    title: 'Validación del Hash de Integridad y Tacha de Falsedad de Evidencia Digital',
    timeLimit: '04:30 MIN',
    difficulty: 'AVANZADO',
    questionNumber: 'CASO 02 / 03',
    categoryTag: 'CÓMPUTO FORENSE & HASHING (RFC 1321 / SHA-2)',
    simulatorType: 'idoneidad',
    concursoName: 'Examen de Idoneidad Pericial ONAJ & CTI',
    ramaDerecho: 'Civil',
    isExamenIdoneidad: true,
    puntuacionRequerida: 85,
    question: 'Un perito presenta una imagen forense .E01 generada hace 6 meses. Durante el juicio oral, la defensa realiza una verificación del algoritmo de resumen y obtiene un hash SHA-256 diferente al registrado en el acta de rotulado inicial. La parte acusadora alega que "solo cambió 1 byte por actualización de sistema". ¿Cuál es el dictamen correcto?',
    scenarioDetails: {
      label: 'Evidencia: Disco SSD NVMe 512GB • Hash Inicial vs Actual Discrepante',
      hash: 'SHA-256 Original: 9f86d081884c7d... | Actual: d4735e3a265e16...',
      compliance: 'Principio de Inmutabilidad & Mismisidad Probatoria'
    },
    options: [
      {
        key: 'A',
        title: 'Aceptar la evidencia considerando que un cambio de 1 byte es irrelevante para el fondo del asunto',
        subtitle: 'Tolerancia de modificación en archivos grandes.',
        isCorrect: false
      },
      {
        key: 'B',
        title: 'Declarar la invalidez de la imagen forense por ruptura de la integridad criptográfica',
        subtitle: 'Cualquier variación en el resultado del hash demuestra alteración del archivo, impidiendo certificar su mismisidad.',
        isCorrect: true
      },
      {
        key: 'C',
        title: 'Solicitar que el juez recalcule el hash promediando los dos valores',
        subtitle: 'Promedio aritmético de resúmenes SHA-256.',
        isCorrect: false
      },
      {
        key: 'D',
        title: 'Reemplazar el hash en el acta sin necesidad de suspender la audiencia',
        subtitle: 'Subsanación extemporánea de la firma digital.',
        isCorrect: false
      }
    ],
    explanation: {
      isoFoundation: 'Efecto Avalancha (Avalanche Effect) de la Criptografía Hash: Cualquier cambio, por mínimo que sea (incluso 1 bit), altera impredeciblemente y por completo el resumen SHA-256. La discrepancia prueba fehacientemente que la imagen fue modificada post-adquisición.',
      legalFoundation: 'Ley 527 de 1999 (Art. 8 - Integridad): Se considera que un mensaje de datos permanece inalterado si no ha sufrido modificación fuera del proceso de comunicación o almacenamiento normal. La alteración invalida su presunción de autenticidad.',
      generatedHash: 'SHA-256: 7a2b91c045e...3390f11a8 (Sello de Exclusión)'
    }
  },
  {
    id: 'sim-3',
    code: 'CASE-2026-03',
    title: 'Contrainterrogatorio Pericial sobre Extracción Lógica de Mensajería Cifrada',
    timeLimit: '06:00 MIN',
    difficulty: 'SENIOR',
    questionNumber: 'CASO 03 / 03',
    categoryTag: 'LITIGIO ESTRATÉGICO & TÉCNICA DE JUICIO',
    simulatorType: 'concurso',
    concursoName: 'Concurso de Méritos Fiscalía CTI & Policía Judicial',
    ramaDerecho: 'Penal',
    isExamenIdoneidad: true,
    puntuacionRequerida: 90,
    question: 'En interrogatorio cruzado, el perito de la Fiscalía admite que para extraer la base de datos de Telegram aplicó un procedimiento de Rooting/Jailbreak al dispositivo encendido sin documentar la versión del Kernel utilizada. ¿Bajo qué argumento debe la defensa solicitar la devaluación o exclusión del informe pericial?',
    scenarioDetails: {
      label: 'Kernel Modificado • Inserción de Agente de Supresión de Permisos',
      hash: 'SHA-256: 12ab993c1f...9870aa01',
      compliance: 'Garantía de Repetibilidad e Inalterabilidad del Software'
    },
    options: [
      {
        key: 'A',
        title: 'Alegar que Telegram es una aplicación extranjera no regulada en Colombia',
        subtitle: 'Falta de jurisdicción extraterritorial del software.',
        isCorrect: false
      },
      {
        key: 'B',
        title: 'Demostrar que la modificación del Kernel altera el espacio de usuario (Userland) e introduce software no validado, imposibilitando la prueba de repetibilidad auditada',
        subtitle: 'Afectación del principio de auditoría técnica y falta de trazabilidad del procedimiento de adquisición.',
        isCorrect: true
      },
      {
        key: 'C',
        title: 'Exigir que la empresa Telegram envíe un delegado físico a declarar al juicio',
        subtitle: 'Testimonio corporativo obligatorio.',
        isCorrect: false
      },
      {
        key: 'D',
        title: 'Sostener que el teléfono debió ser sumergido en solución química para preservar los datos',
        subtitle: 'Preservación física no estándar.',
        isCorrect: false
      }
    ],
    explanation: {
      isoFoundation: 'ISO/IEC 27037 (Sección 7.3): El uso de exploits o alteración de Kernel sin registro del firmware específico puede contaminar logs de auditoría e imponer cambios no controlados en la estructura de la base de datos SQLite.',
      legalFoundation: 'CPP Art. 420 (Apreciación de la prueba pericial): La idoneidad técnica de los métodos empleados y la auditabilidad del software son requisitos esenciales para asignar valor probatorio a las conclusiones del experto.',
      generatedHash: 'SHA-256: 410e39b9220...91a27e812 (Firma de Análisis)'
    }
  }
];

const DEFAULT_ACADEMIC_RESOURCES: AcademicResource[] = [
  {
    id: 'acad-1',
    category: 'diapositivas',
    categoryLabel: 'DIAPOSITIVAS & PRESENTACIONES',
    badge: 'CÓMPUTO FORENSE',
    year: '2026',
    subject: 'INFORMATICA FORENSE I',
    cycle: 'CICLO PROFESIONAL',
    title: 'Cadena de Custodia Digital en Entornos Multi-Cloud e Híbridos',
    description: 'Material magistral sobre la preservación de logs de auditoría (CloudTrail, Azure Activity Logs) e imágenes de máquinas virtuales mediante API atómica.',
    slidesCountOrTech: '48 Diapositivas • PPTX / PDF High-Res',
    hashOrRepo: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    hashLabel: 'SHA-256 Verificado',
    pdfSize: '18.4 MB',
    imageUrl: '/assets/aistudio/Image_15_eab288d3.png'
  },
  {
    id: 'acad-2',
    category: 'proyectos',
    categoryLabel: 'PROYECTOS & INVESTIGACIÓN',
    badge: 'CIBERSEGURIDAD',
    year: '2026',
    subject: 'CIBERDELINCUENCIA & DERECHO',
    cycle: 'INVESTIGACIÓN FORMATIVA',
    title: 'Análisis de Malware en Procesos Penales: Guía de Triage y Desmontaje Lógico',
    description: 'Proyecto de aula sobre descompilación de troyanos bancarios, análisis estático/dinámico en Sandbox y elaboración del dictamen pericial de impacto.',
    slidesCountOrTech: 'Python 3.12 • Ghidra • Volatility 3 Framework',
    hashOrRepo: 'github.com/jeytorres/malware-forensics-lab',
    hashLabel: 'Repositorio Institucional',
    pdfSize: 'ZIP 45.2 MB',
    imageUrl: '/assets/aistudio/Image_11_57816b99.png'
  },
  {
    id: 'acad-3',
    category: 'evaluaciones',
    categoryLabel: 'MÓDULOS Y EVALUACIONES',
    badge: 'DERECHO PROBATORIO',
    year: '2024',
    subject: 'PRUEBA DIGITAL & TÉCNICA PERICIAL',
    cycle: 'MÓDULO PRÁCTICO',
    title: 'Simulación Procesal Civil & Peritaje: Impugnación de Evidencia de WhatsApp',
    description: 'Caso práctico completo con expediente simulado, chat exportado, informe pericial con inconsistencias de metadatos y guía de contrainterrogatorio.',
    slidesCountOrTech: 'Expediente 120 Páginas • PDF & Renders',
    hashOrRepo: 'EXP-SIM-2024-009-COL',
    hashLabel: 'Código de Caso Académico',
    pdfSize: '12.8 MB',
    imageUrl: '/assets/aistudio/Image_9_91b12981.png'
  },
  {
    id: 'acad-4',
    category: 'diapositivas',
    categoryLabel: 'DIAPOSITIVAS & PRESENTACIONES',
    badge: 'IA & DERECHO',
    year: '2024',
    subject: 'DERECHO DIGITAL & IA',
    cycle: 'CICLO AVANZADO',
    title: 'Inteligencia Artificial Generativa y Protección de Datos Personales en Colombia',
    description: 'Análisis de la Guía de la SIC para el tratamiento de datos en sistemas de IA, principios de transparencia y auditoría de sesgos algorítmicos.',
    slidesCountOrTech: '62 Diapositivas • PDF HD',
    hashOrRepo: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    hashLabel: 'SHA-256 Verificado',
    pdfSize: '22.1 MB',
    imageUrl: '/assets/aistudio/Image_5_a1301cf4.png'
  }
];

const DEFAULT_NORMA_CATEGORIES: NormaCategory[] = [
  {
    id: 'constitucion',
    title: 'Constitución Política de Colombia',
    description: 'Principios, derechos y garantías fundamentales que constituyen la norma de normas y el marco supremo del ordenamiento jurídico.',
    icon: 'account_balance',
    badge: 'NORMA DE NORMAS',
    subcategories: [
      'Constitución Política',
      'Acciones Constitucionales',
      'Normas Estructurales del Sistema Jurídico',
      'Actos Legislativos',
      'Organización Constitucional del Estado',
      'Participación Política y Democracia',
      'Derechos Fundamentales y Acceso a Información',
      'Actos Legislativos Recientes'
    ]
  },
  {
    id: 'codigos',
    title: 'Códigos',
    description: 'Compendio de estatutos y códigos normativos vigentes que articulan los procedimientos y reglas del sistema judicial.',
    icon: 'menu_book',
    badge: 'SISTEMA JUDICIAL',
    subcategories: ['Código Penal', 'Código General del Proceso', 'Código de Procedimiento Penal']
  },
  {
    id: 'leyes',
    title: 'Leyes',
    description: 'Conjunto de leyes, disposiciones e instrumentos normativos promulgados para la regulación de las distintas materias del derecho.',
    icon: 'gavel',
    badge: 'NORMATIVA VIGENTE',
    subcategories: ['Leyes Estatutarias', 'Leyes Ordinarias', 'Marcos Regulatorios']
  },
  {
    id: 'jurisprudencia',
    title: 'Jurisprudencia',
    description: 'Precedentes judiciales, sentencias hito y pronunciamientos dictados por las altas cortes para la orientación e interpretación legal.',
    icon: 'balance',
    badge: 'DOGMÁTICA Y PRECEDENTE',
    subcategories: ['Corte Suprema de Justicia', 'Corte Constitucional', 'Consejo de Estado']
  }
];

const DEFAULT_NORMA_ITEMS: NormaItem[] = [
  // 1. CONSTITUCIÓN POLÍTICA
  {
    id: 'norm-const-1',
    categoryId: 'constitucion',
    subcategory: 'Constitución Política',
    code: '1991',
    title: 'Constitución Política de Colombia',
    excerpt: 'Norma de normas. Marco supremo del ordenamiento jurídico colombiano promulgado en 1991.',
    fullText: 'Constitución Política de Colombia promulgada en 1991. Establece la estructura del Estado, los derechos, deberes y garantías fundamentales.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/constitucion_politica_1991.html'
  },

  // 2. ACCIONES CONSTITUCIONALES
  {
    id: 'norm-const-tutela',
    categoryId: 'constitucion',
    subcategory: 'Acciones Constitucionales',
    code: 'Decreto 2591 de 1991',
    title: 'Acción de Tutela',
    excerpt: 'Reglamentación de la Acción de Tutela establecida en el Artículo 86 de la Constitución Política.',
    fullText: 'Decreto 2591 de 1991 por el cual se reglamenta la acción de tutela consagrada en el artículo 86 de la Constitución Política para la protección inmediata de derechos fundamentales.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=2008'
  },
  {
    id: 'norm-const-cumplimiento',
    categoryId: 'constitucion',
    subcategory: 'Acciones Constitucionales',
    code: 'Ley 393 de 1997',
    title: 'Acción de Cumplimiento',
    excerpt: 'Mecanismo judicial para hacer efectivo el cumplimiento de leyes o actos administrativos.',
    fullText: 'Ley 393 de 1997 desarrollada con fundamento en el artículo 87 de la Constitución Política de Colombia.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=342'
  },
  {
    id: 'norm-const-inconstitucionalidad',
    categoryId: 'constitucion',
    subcategory: 'Acciones Constitucionales',
    code: 'Decreto 2067 de 1991',
    title: 'Acción Pública de Inconstitucionalidad',
    excerpt: 'Procedimientos y juicio en las demandas de inconstitucionalidad ante la Corte Constitucional.',
    fullText: 'Decreto 2067 de 1991 régimen de procedimientos y actuaciones ante la Corte Constitucional.',
    branchTag: 'Constitucional',
    url: 'https://www.corteconstitucional.gov.co/'
  },
  {
    id: 'norm-const-popular',
    categoryId: 'constitucion',
    subcategory: 'Acciones Constitucionales',
    code: 'Ley 472 de 1998',
    title: 'Acción Popular y Acción de Grupo',
    excerpt: 'Protección de derechos e intereses colectivos y grupo de personas afectadas.',
    fullText: 'Ley 472 de 1998 por la cual se desarrollan las acciones populares y de grupo según el artículo 88 de la Constitución.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=302'
  },
  {
    id: 'norm-const-habeascorpus',
    categoryId: 'constitucion',
    subcategory: 'Acciones Constitucionales',
    code: 'Ley 1095 de 2006',
    title: 'Hábeas Corpus',
    excerpt: 'Garantía y protección inmediata del derecho fundamental a la libertad personal.',
    fullText: 'Ley Estatutaria 1095 de 2006 reglamentaria del artículo 30 constitucional sobre el Hábeas Corpus.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=20490'
  },

  // 3. NORMAS ESTRUCTURALES DEL SISTEMA JURÍDICO
  {
    id: 'norm-const-decretounico',
    categoryId: 'constitucion',
    subcategory: 'Normas Estructurales del Sistema Jurídico',
    code: 'Decreto 1069 de 2015',
    title: 'Decreto Único Reglamentario Sector Justicia',
    excerpt: 'Compendio reglamentario del sector justicia y del derecho.',
    fullText: 'Decreto 1069 de 2015 Decreto Único Reglamentario del Sector Justicia y del Derecho.',
    branchTag: 'Administrativo',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=64939'
  },
  {
    id: 'norm-const-leyestatutariajusticia',
    categoryId: 'constitucion',
    subcategory: 'Normas Estructurales del Sistema Jurídico',
    code: 'Ley 270 de 1996',
    title: 'Ley Estatutaria de Administración de Justicia',
    excerpt: 'Estatuto de la administración de justicia, principios y órganos de la Rama Judicial.',
    fullText: 'Ley 270 de 1996 Estatutaria de la Administración de Justicia en Colombia.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=6264'
  },

  // 4. ACTOS LEGISLATIVOS
  {
    id: 'norm-const-al-03-2002',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos',
    code: 'Acto Legislativo 03 de 2002',
    title: 'Acto Legislativo 03 de 2002',
    excerpt: 'Reforma Sistema Penal Acusatorio.',
    fullText: 'Acto Legislativo 03 de 2002. Reforma constitucional del Sistema Penal Acusatorio en Colombia.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/acto_legislativo_03_2002.html'
  },
  {
    id: 'norm-const-al-01-2018',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos',
    code: 'Acto Legislativo 01 de 2018',
    title: 'Acto Legislativo 01 de 2018',
    excerpt: 'Reforma equilibrio de poderes.',
    fullText: 'Acto Legislativo 01 de 2018 por el cual se modifica la Constitución en materia de equilibrio de poderes y juzgamiento.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/acto_legislativo_01_2018.html'
  },
  {
    id: 'norm-const-al-02-2020',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos',
    code: 'Acto Legislativo 02 de 2020',
    title: 'Acto Legislativo 02 de 2020',
    excerpt: 'Reforma constitucional de la vigencia 2020.',
    fullText: 'Acto Legislativo 02 de 2020 modificatorio de artículos de la Constitución Política.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/acto_legislativo_02_2020.html'
  },
  {
    id: 'norm-const-al-02-2021',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos',
    code: 'Acto Legislativo 02 de 2021',
    title: 'Acto Legislativo 02 de 2021',
    excerpt: 'Reforma constitucional de la vigencia 2021.',
    fullText: 'Acto Legislativo 02 de 2021 modificatorio de la Constitución Política.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/acto_legislativo_02_2021.html'
  },
  {
    id: 'norm-const-al-02-2023',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos',
    code: 'Acto Legislativo 02 de 2023',
    title: 'Acto Legislativo 02 de 2023',
    excerpt: 'Reforma constitucional de la vigencia 2023.',
    fullText: 'Acto Legislativo 02 de 2023 modificatorio de la Constitución Política.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/acto_legislativo_02_2023.html'
  },
  {
    id: 'norm-const-al-03-2023',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos',
    code: 'Acto Legislativo 03 de 2023',
    title: 'Acto Legislativo 03 de 2023',
    excerpt: 'Reforma constitucional de la vigencia 2023.',
    fullText: 'Acto Legislativo 03 de 2023 modificatorio de la Constitución Política.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/acto_legislativo_03_2023.html'
  },
  {
    id: 'norm-const-al-01-2024',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos',
    code: 'Acto Legislativo 01 de 2024',
    title: 'Acto Legislativo 01 de 2024',
    excerpt: 'Reforma constitucional de la vigencia 2024 (Reciente).',
    fullText: 'Acto Legislativo 01 de 2024 modificatorio de la Constitución Política.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/acto_legislativo_01_2024.html'
  },

  // 5. ORGANIZACIÓN CONSTITUCIONAL DEL ESTADO
  {
    id: 'norm-const-reglamentocongreso',
    categoryId: 'constitucion',
    subcategory: 'Organización Constitucional del Estado',
    code: 'Ley 5 de 1992',
    title: 'Reglamento del Congreso',
    excerpt: 'Reglamento de funcionamiento del Congreso, Senado y Cámara de Representantes.',
    fullText: 'Ley 5 de 1992 por la cual se expide el Reglamento del Congreso.',
    branchTag: 'Constitucional',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/ley_0005_1992.html'
  },
  {
    id: 'norm-const-estadosdeexcepcion',
    categoryId: 'constitucion',
    subcategory: 'Organización Constitucional del Estado',
    code: 'Ley 137 de 1994',
    title: 'Ley Estatutaria de Estados de Excepción',
    excerpt: 'Regulación de las facultades del Gobierno en los Estados de Excepción.',
    fullText: 'Ley Estatutaria 137 de 1994 por la cual se regulan los Estados de Excepción.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=331'
  },
  {
    id: 'norm-const-reformaadministracionjusticia',
    categoryId: 'constitucion',
    subcategory: 'Organización Constitucional del Estado',
    code: 'Ley Estatutaria 2430 de 2024',
    title: 'Reforma a la Administración de Justicia',
    excerpt: 'Reforma estatutaria a la Rama Judicial y administración de justicia (Reciente).',
    fullText: 'Ley Estatutaria 2430 de 2024 por la cual se modifica la Ley Estatutaria de Administración de Justicia.',
    branchTag: 'Constitucional',
    url: 'https://www.suin-juriscol.gov.co/'
  },

  // 6. PARTICIPACIÓN POLÍTICA Y DEMOCRACIA
  {
    id: 'norm-const-participacionciudadana',
    categoryId: 'constitucion',
    subcategory: 'Participación Política y Democracia',
    code: 'Ley 134 de 1994',
    title: 'Mecanismos de Participación Ciudadana',
    excerpt: 'Normas sobre los mecanismos de participación democrática del pueblo.',
    fullText: 'Ley 134 de 1994 por la cual se dictan normas sobre mecanismos de participación ciudadana.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=329'
  },
  {
    id: 'norm-const-proteccionparticipacion',
    categoryId: 'constitucion',
    subcategory: 'Participación Política y Democracia',
    code: 'Ley Estatutaria 1757 de 2015',
    title: 'Promoción y Protección de la Participación Democrática',
    excerpt: 'Estatuto de promoción y protección del derecho a la participación democrática.',
    fullText: 'Ley Estatutaria 1757 de 2015 sobre el derecho a la participación democrática.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=65333'
  },
  {
    id: 'norm-const-estatutooposicion',
    categoryId: 'constitucion',
    subcategory: 'Participación Política y Democracia',
    code: 'Ley Estatutaria 1909 de 2018',
    title: 'Estatuto de la Oposición',
    excerpt: 'Estatuto de la Oposición Política y garantías para organizaciones independientes.',
    fullText: 'Ley Estatutaria 1909 de 2018 por la cual se adopta el Estatuto de la Oposición Política.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=87309'
  },
  {
    id: 'norm-const-estatutobasicopartidos',
    categoryId: 'constitucion',
    subcategory: 'Participación Política y Democracia',
    code: 'Ley 130 de 1994',
    title: 'Estatuto Básico de Partidos y Movimientos Políticos',
    excerpt: 'Reconocimiento, funcionamiento y financiación de partidos políticos.',
    fullText: 'Ley 130 de 1994 estatuto básico de partidos y movimientos políticos.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=328'
  },
  {
    id: 'norm-const-organizacionpartidos',
    categoryId: 'constitucion',
    subcategory: 'Participación Política y Democracia',
    code: 'Ley Estatutaria 1475 de 2011',
    title: 'Organización y Funcionamiento de Partidos y Procesos Electorales',
    excerpt: 'Organización interna, avales y financiación de procesos electorales.',
    fullText: 'Ley Estatutaria 1475 de 2011 sobre organización y funcionamiento de partidos políticos.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=43360'
  },

  // 7. DERECHOS FUNDAMENTALES Y ACCESO A INFORMACIÓN
  {
    id: 'norm-const-derechopeticion',
    categoryId: 'constitucion',
    subcategory: 'Derechos Fundamentales y Acceso a Información',
    code: 'Ley Estatutaria 1755 de 2015',
    title: 'Derecho Fundamental de Petición',
    excerpt: 'Reglamentación del Derecho Fundamental de Petición ante autoridades y particulares.',
    fullText: 'Ley Estatutaria 1755 de 2015 por la cual se regula el Derecho Fundamental de Petición.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=65330'
  },
  {
    id: 'norm-const-transparencia',
    categoryId: 'constitucion',
    subcategory: 'Derechos Fundamentales y Acceso a Información',
    code: 'Ley 1712 de 2014',
    title: 'Transparencia y Derecho de Acceso a la Información Pública',
    excerpt: 'Estatuto de transparencia y acceso a la información pública nacional.',
    fullText: 'Ley 1712 de 2014 por la cual se crea la Ley de Transparencia y del Derecho de Acceso a la Información Pública.',
    branchTag: 'Constitucional',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=56882'
  },

  // 8. ACTOS LEGISLATIVOS RECIENTES
  {
    id: 'norm-const-al-03-2024',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos Recientes',
    code: 'Acto Legislativo 03 de 2024',
    title: 'Acto Legislativo 03 de 2024',
    excerpt: 'Sistema General de Participaciones.',
    fullText: 'Acto Legislativo 03 de 2024 referente al Sistema General de Participaciones.',
    branchTag: 'Constitucional',
    url: 'https://www.suin-juriscol.gov.co/'
  },
  {
    id: 'norm-const-al-01-2025',
    categoryId: 'constitucion',
    subcategory: 'Actos Legislativos Recientes',
    code: 'Acto Legislativo 01 de 2025',
    title: 'Acto Legislativo 01 de 2025',
    excerpt: 'Derecho humano a la alimentación adecuada.',
    fullText: 'Acto Legislativo 01 de 2025 que reconoce constitucionalmente el derecho humano a la alimentación adecuada.',
    branchTag: 'Constitucional',
    url: 'https://www.suin-juriscol.gov.co/'
  },

  // CODIGOS
  {
    id: 'norm-cod-1',
    categoryId: 'codigos',
    subcategory: 'Código Penal',
    code: 'ARTÍCULO 269A (C.P.)',
    title: 'Acceso Abusivo a un Sistema Informático',
    excerpt: 'El que, sin autorización o extralimitando la que se le hubiere concedido, acceda de manera total o parcial a un sistema informático...',
    fullText: 'Artículo 269A. Acceso abusivo a un sistema informático. El que, sin autorización o extralimitando la que se le hubiere concedido, acceda de manera total o parcial a un sistema informático protegido o no con medida de seguridad, o se mantenga dentro del mismo en contra de la voluntad de quien tenga el legítimo derecho a excluirlo, incurrirá en pena de prisión de cuarenta y ocho (48) a noventa y seis (96) meses.',
    requisito: 'Verificación de logs de autenticación y preservación de memoria volátil (Live RAM).',
    jurisprudencia: 'Sentencia CSJ SP-1823-2021.',
    concordancia: 'Ley 1273 de 2009',
    branchTag: 'Penal',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/ley_0599_2000.html'
  },
  {
    id: 'norm-cod-3',
    categoryId: 'codigos',
    subcategory: 'Código General del Proceso',
    code: 'ARTÍCULO 247 (C.G.P.)',
    title: 'Valor Probatorio de Mensajes de Datos en la Jurisdicción Civil',
    excerpt: 'Los mensajes de datos serán valorados conforme a las reglas de la sana crítica...',
    fullText: 'Artículo 247. Valor probatorio de los mensajes de datos. Los mensajes de datos serán valorados conforme a las reglas de la sana crítica y demás reglas generales de la prueba.',
    requisito: 'Verificación de firma digital, trazabilidad y hash de conservación.',
    jurisprudencia: 'Sentencia T-043/20.',
    concordancia: 'Ley 527 de 1999',
    branchTag: 'Civil',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/ley_1564_2012.html'
  },

  // LEYES
  {
    id: 'norm-ley-1',
    categoryId: 'leyes',
    subcategory: 'Leyes Ordinarias',
    code: 'LEY 1273 DE 2009',
    title: 'Protección de la Información y de los Datos Personales',
    excerpt: 'Modifica el Código Penal y crea el bien jurídico tutelado de la Protección de la Información y de los Datos...',
    fullText: 'Ley 1273 de 2009. Modifica el Código Penal colombiano adicionando el Título VII BIS "De la Protección de la Información y de los Datos".',
    requisito: 'Dictamen pericial informático sobre preservación de evidencia digital.',
    jurisprudencia: 'CSJ SP-1284-2023.',
    concordancia: 'Convenio de Budapest',
    branchTag: 'Penal',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/ley_1273_2009.html'
  },
  {
    id: 'norm-ley-2',
    categoryId: 'leyes',
    subcategory: 'Leyes Ordinarias',
    code: 'LEY 527 DE 1999',
    title: 'Comercio Electrónico, Mensajes de Datos y Firma Digital',
    excerpt: 'Define y reglamenta el acceso y uso de los mensajes de datos, del comercio electrónico y de las firmas digitales...',
    fullText: 'Ley 527 de 1999. Consagra los principios rectores del Derecho Informático y firma digital.',
    requisito: 'Verificación del certificado digital y sello de tiempo.',
    jurisprudencia: 'CE-SU-2024-0012.',
    concordancia: 'CGP Art. 247',
    branchTag: 'Comercial',
    url: 'https://www.secretariasenado.gov.co/senado/basedoc/ley_0527_1999.html'
  }
];



const DEFAULT_REQUERIMIENTOS: RequerimientoPericial[] = [
  {
    id: 'req-101',
    despacho: 'Juzgado 12 Penal del Circuito de Bogotá',
    radicado: '11001600000020240189',
    area: 'Análisis Forense de WhatsApp',
    asunto: 'Extracción y cotejo de hash de chat en caso de estafa informática',
    urgencia: 'Flagrancia',
    estado: 'En Análisis',
    cifrado: true
  },
  {
    id: 'req-102',
    despacho: 'Tribunal Administrativo de Cundinamarca',
    radicado: '250002336000202300412',
    area: 'Firma Digital & ONAC',
    asunto: 'Dictamen pericial sobre validez de contrato suscrito con firma electrónica simple',
    urgencia: 'Alto',
    estado: 'Pendiente Dictamen',
    cifrado: true
  },
  {
    id: 'req-103',
    despacho: 'Fiscalía 45 Seccional de Delitos Informáticos',
    radicado: '110016000000202300891',
    area: 'Cómputo Forense LUN/SAN',
    asunto: 'Involución de ransomware y determinación de punto de entrada (Initial Vector)',
    urgencia: 'Normal',
    estado: 'Concluido',
    cifrado: false
  }
];

const DEFAULT_MENU_ITEMS: MenuItemConfig[] = [
  { id: 'perfil', label: 'Perfil', page: 'perfil', visible: true },
  { id: 'ciberseguridad', label: 'Ciberseguridad', page: 'ciberseguridad', visible: true },
  { id: 'rincon-normativo', label: 'Rincón Normativo', page: 'rincon-normativo', visible: true },
  { id: 'analisis-juridico', label: 'Análisis Jurídico', page: 'analisis-juridico', visible: true },
  { id: 'simuladores', label: 'Simuladores', page: 'simuladores', visible: true },
  { id: 'experiencias-academicas', label: 'Aula Abierta', page: 'experiencias-academicas', visible: true },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Menu configuration state
  const [menuItems, setMenuItems] = useState<MenuItemConfig[]>(() => {
    const saved = localStorage.getItem('jt_menu_config_v3');
    if (!saved) return DEFAULT_MENU_ITEMS;
    try {
      const parsed: MenuItemConfig[] = JSON.parse(saved);
      return parsed.filter((item) => item.id !== 'trayectoria');
    } catch {
      return DEFAULT_MENU_ITEMS;
    }
  });

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('jt_admin_auth') === 'true';
  });

  // Articles
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('jt_articles');
    if (!saved) return DEFAULT_ARTICLES;
    try {
      const parsed: Article[] = JSON.parse(saved);
      return parsed.map((art) => {
        if (
          art.imageUrl?.includes('Image_5_a1301cf4') ||
          art.imageUrl?.includes('screenshot_1_84f0b5b4') ||
          art.imageUrl?.includes('image_1586eacf') ||
          art.imageUrl?.includes('image_cb96095d')
        ) {
          return { ...art, imageUrl: '' };
        }
        return art;
      });
    } catch {
      return DEFAULT_ARTICLES;
    }
  });

  // Jurisprudencia
  const [jurisprudencias, setJurisprudencias] = useState<JurisprudenciaItem[]>(() => {
    const saved = localStorage.getItem('jt_jurisprudencia');
    return saved ? JSON.parse(saved) : DEFAULT_JURISPRUDENCIA;
  });

  // Simulators
  const [simulators, setSimulators] = useState<SimulatorCase[]>(() => {
    const saved = localStorage.getItem('jt_simulators');
    return saved ? JSON.parse(saved) : DEFAULT_SIMULATORS;
  });

  // Academic Resources
  const [academicResources, setAcademicResources] = useState<AcademicResource[]>(() => {
    const saved = localStorage.getItem('jt_academic');
    return saved ? JSON.parse(saved) : DEFAULT_ACADEMIC_RESOURCES;
  });

  // Norma Categories & Items
  const [normaCategories, setNormaCategories] = useState<NormaCategory[]>(() => {
    const saved = localStorage.getItem('jt_norma_categories');
    if (!saved) return DEFAULT_NORMA_CATEGORIES;
    try {
      const parsed: NormaCategory[] = JSON.parse(saved);
      if (!parsed.some((c) => c.id === 'constitucion')) {
        return DEFAULT_NORMA_CATEGORIES;
      }
      return parsed.map((c) => {
        const def = DEFAULT_NORMA_CATEGORIES.find((d) => d.id === c.id);
        if (def) {
          return {
            ...c,
            title: def.title,
            description: def.description,
            subcategories: def.subcategories,
          };
        }
        return c;
      });
    } catch {
      return DEFAULT_NORMA_CATEGORIES;
    }
  });

  const [normaItems, setNormaItems] = useState<NormaItem[]>(() => {
    const saved = localStorage.getItem('jt_norma_items');
    if (!saved) return DEFAULT_NORMA_ITEMS;
    try {
      const parsed: NormaItem[] = JSON.parse(saved);
      const constDefaultItems = DEFAULT_NORMA_ITEMS.filter((i) => i.categoryId === 'constitucion');
      const nonConstUserItems = parsed.filter((i: NormaItem) => i.categoryId !== 'constitucion');
      const combined = [...constDefaultItems, ...nonConstUserItems];
      return combined.map((item) => {
        const defMatch = DEFAULT_NORMA_ITEMS.find((d) => d.id === item.id);
        return {
          ...item,
          url: item.url || defMatch?.url || 'https://www.suin-juriscol.gov.co/',
        };
      });
    } catch {
      return DEFAULT_NORMA_ITEMS;
    }
  });

  // Requerimientos
  const [requerimientos, setRequerimientos] = useState<RequerimientoPericial[]>(() => {
    const saved = localStorage.getItem('jt_requerimientos');
    return saved ? JSON.parse(saved) : DEFAULT_REQUERIMIENTOS;
  });

  // Save to LocalStorage whenever states update
  useEffect(() => {
    localStorage.setItem('jt_admin_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('jt_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('jt_jurisprudencia', JSON.stringify(jurisprudencias));
  }, [jurisprudencias]);

  useEffect(() => {
    localStorage.setItem('jt_simulators', JSON.stringify(simulators));
  }, [simulators]);

  useEffect(() => {
    localStorage.setItem('jt_academic', JSON.stringify(academicResources));
  }, [academicResources]);

  useEffect(() => {
    localStorage.setItem('jt_norma_categories', JSON.stringify(normaCategories));
  }, [normaCategories]);

  useEffect(() => {
    localStorage.setItem('jt_norma_items', JSON.stringify(normaItems));
  }, [normaItems]);

  useEffect(() => {
    localStorage.setItem('jt_requerimientos', JSON.stringify(requerimientos));
  }, [requerimientos]);

  // Auth functions
  const login = (u: string, p: string) => {
    // Standard credential check (supports 'admin' / 'forense2026' or 'jeytorres')
    if ((u.trim() === 'admin' && p.trim() === 'forense2026') || (u.trim() === 'admin' && p.trim() === 'admin123') || (u.trim() === 'jeytorres' && p.trim() === 'forense2026')) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Article handlers
  const addArticle = (art: Omit<Article, 'id'>) => {
    const newArt: Article = {
      ...art,
      id: 'art-' + Date.now(),
      hash: art.hash || 'sha256-' + Math.random().toString(36).substring(2, 10),
    };
    setArticles((prev) => [newArt, ...prev]);
  };

  const updateArticle = (id: string, art: Partial<Article>) => {
    setArticles((prev) => prev.map((item) => (item.id === id ? { ...item, ...art } : item)));
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
  };

  // Jurisprudencia handlers
  const addJurisprudencia = (item: Omit<JurisprudenciaItem, 'id'>) => {
    const newItem: JurisprudenciaItem = {
      ...item,
      id: 'jur-' + Date.now(),
      hash: item.hash || 'sha256-' + Math.random().toString(36).substring(2, 10),
    };
    setJurisprudencias((prev) => [newItem, ...prev]);
  };

  const updateJurisprudencia = (id: string, item: Partial<JurisprudenciaItem>) => {
    setJurisprudencias((prev) => prev.map((j) => (j.id === id ? { ...j, ...item } : j)));
  };

  const deleteJurisprudencia = (id: string) => {
    setJurisprudencias((prev) => prev.filter((j) => j.id !== id));
  };

  // Simulator handlers
  const addSimulator = (sim: Omit<SimulatorCase, 'id'>) => {
    const newSim: SimulatorCase = {
      ...sim,
      id: 'sim-' + Date.now(),
    };
    setSimulators((prev) => [newSim, ...prev]);
  };

  const updateSimulator = (id: string, sim: Partial<SimulatorCase>) => {
    setSimulators((prev) => prev.map((s) => (s.id === id ? { ...s, ...sim } : s)));
  };

  const deleteSimulator = (id: string) => {
    setSimulators((prev) => prev.filter((s) => s.id !== id));
  };

  // Academic Resources handlers
  const addAcademicResource = (res: Omit<AcademicResource, 'id'>) => {
    const newRes: AcademicResource = {
      ...res,
      id: 'acad-' + Date.now(),
    };
    setAcademicResources((prev) => [newRes, ...prev]);
  };

  const updateAcademicResource = (id: string, res: Partial<AcademicResource>) => {
    setAcademicResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...res } : r)));
  };

  const deleteAcademicResource = (id: string) => {
    setAcademicResources((prev) => prev.filter((r) => r.id !== id));
  };

  // Norma Category handlers
  const addNormaCategory = (cat: Omit<NormaCategory, 'id'>) => {
    const newCat: NormaCategory = {
      ...cat,
      id: 'cat-' + Date.now(),
    };
    setNormaCategories((prev) => [...prev, newCat]);
  };

  const updateNormaCategory = (id: string, cat: Partial<NormaCategory>) => {
    setNormaCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...cat } : c)));
  };

  const deleteNormaCategory = (id: string) => {
    setNormaCategories((prev) => prev.filter((c) => c.id !== id));
    // Remove items associated
    setNormaItems((prev) => prev.filter((item) => item.categoryId !== id));
  };

  const addSubcategoryToCategory = (categoryId: string, subcategoryTitle: string) => {
    const trimmed = subcategoryTitle.trim();
    if (!trimmed) return;
    setNormaCategories((prev) =>
      prev.map((c) => {
        if (c.id === categoryId) {
          const existingSubs = c.subcategories || [];
          if (!existingSubs.includes(trimmed)) {
            return { ...c, subcategories: [...existingSubs, trimmed] };
          }
        }
        return c;
      })
    );
  };

  const deleteSubcategoryFromCategory = (categoryId: string, subcategoryTitle: string) => {
    const trimmed = subcategoryTitle.trim();
    setNormaCategories((prev) =>
      prev.map((c) => {
        if (c.id === categoryId) {
          return {
            ...c,
            subcategories: (c.subcategories || []).filter((s) => s !== trimmed),
          };
        }
        return c;
      })
    );
  };

  // Norma Item handlers
  const addNormaItem = (item: Omit<NormaItem, 'id'>) => {
    const newItem: NormaItem = {
      ...item,
      id: 'norm-' + Date.now(),
    };
    setNormaItems((prev) => [newItem, ...prev]);
  };

  const updateNormaItem = (id: string, item: Partial<NormaItem>) => {
    setNormaItems((prev) => prev.map((n) => (n.id === id ? { ...n, ...item } : n)));
  };

  const deleteNormaItem = (id: string) => {
    setNormaItems((prev) => prev.filter((n) => n.id !== id));
  };

  // Requerimientos handlers
  const addRequerimiento = (req: Omit<RequerimientoPericial, 'id'>) => {
    const newReq: RequerimientoPericial = {
      ...req,
      id: 'req-' + Date.now(),
    };
    setRequerimientos((prev) => [newReq, ...prev]);
  };

  const updateRequerimientoStatus = (id: string, status: RequerimientoPericial['estado']) => {
    setRequerimientos((prev) => prev.map((r) => (r.id === id ? { ...r, estado: status } : r)));
  };

  // Menu items handlers
  useEffect(() => {
    localStorage.setItem('jt_menu_config_v3', JSON.stringify(menuItems));
  }, [menuItems]);

  const toggleMenuItemVisibility = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item))
    );
  };

  const updateMenuItemLabel = (id: string, label: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, label } : item))
    );
  };

  const resetMenuItems = () => {
    setMenuItems(DEFAULT_MENU_ITEMS);
  };

  return (
    <AppContext.Provider
      value={{
        menuItems,
        toggleMenuItemVisibility,
        updateMenuItemLabel,
        resetMenuItems,
        isAuthenticated,
        login,
        logout,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        jurisprudencias,
        addJurisprudencia,
        updateJurisprudencia,
        deleteJurisprudencia,
        simulators,
        addSimulator,
        updateSimulator,
        deleteSimulator,
        academicResources,
        addAcademicResource,
        updateAcademicResource,
        deleteAcademicResource,
        normaCategories,
        addNormaCategory,
        updateNormaCategory,
        deleteNormaCategory,
        addSubcategoryToCategory,
        deleteSubcategoryFromCategory,
        normaItems,
        addNormaItem,
        updateNormaItem,
        deleteNormaItem,
        requerimientos,
        addRequerimiento,
        updateRequerimientoStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
