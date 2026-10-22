export type PageView =
  | 'perfil'
  | 'trayectoria'
  | 'ciberseguridad'
  | 'rincon-normativo'
  | 'analisis-juridico'
  | 'experiencias-academicas'
  | 'simuladores'
  | 'admin-portal';

export interface MenuItemConfig {
  id: string;
  label: string;
  page: PageView;
  visible: boolean;
}

export interface Article {
  id: string;
  category: 'forense' | 'ia-derecho' | 'evidencia-digital' | 'ciberdelincuencia' | 'proteccion-datos';
  categoryLabel: string;
  title: string;
  summary: string;
  fullContent?: string;
  readTime: string;
  date: string;
  ref: string;
  tag: string;
  imageUrl?: string;
  hash?: string;
}

export interface JurisprudenciaItem {
  id: string;
  radicado: string;
  title: string;
  court: string;
  sala: string;
  magistrado: string;
  year: number;
  courtType: 'constitucional' | 'suprema' | 'estado';
  categoryTag: string;
  sintesisHechos: string;
  ratioDecidendi: string;
  comentarioTorres: string;
  reglaProbatoria?: string;
  hash?: string;
  tags: string[];
}

export interface SimulatorOption {
  key: 'A' | 'B' | 'C' | 'D';
  title: string;
  subtitle: string;
  isCorrect?: boolean;
}

export type SimulatorType = 'concurso' | 'idoneidad' | 'rama' | 'tactico';

export interface SimulatorCase {
  id: string;
  code: string;
  title: string;
  timeLimit: string;
  difficulty: string;
  questionNumber: string;
  categoryTag: string;
  simulatorType: SimulatorType;
  concursoName?: string; // e.g., "Convocatoria Rama Judicial - Jueces", "Concurso CTI / Fiscalía"
  ramaDerecho: 'Penal' | 'Civil' | 'Comercial' | 'Constitucional' | 'Administrativo' | 'Laboral';
  isExamenIdoneidad?: boolean;
  puntuacionRequerida?: number;
  question: string;
  scenarioDetails: {
    label: string;
    hash: string;
    compliance: string;
  };
  options: SimulatorOption[];
  explanation: {
    isoFoundation: string;
    legalFoundation: string;
    generatedHash: string;
  };
}

export interface AcademicResource {
  id: string;
  category: 'diapositivas' | 'proyectos' | 'evaluaciones';
  categoryLabel: string;
  badge: string;
  year: '2026' | '2025' | '2024' | '2023' | string;
  subject: string;
  cycle: string;
  title: string;
  description: string;
  slidesCountOrTech?: string;
  hashOrRepo?: string;
  hashLabel?: string;
  pdfSize?: string;
  imageUrl?: string;
}

export interface NormaCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  subcategories?: string[];
}

export interface NormaItem {
  id: string;
  categoryId: string;
  subcategory?: string;
  code: string;
  title: string;
  excerpt: string;
  fullText: string;
  requisito?: string;
  jurisprudencia?: string;
  concordancia?: string;
  branchTag?: string;
  url?: string;
}

export interface RequerimientoPericial {
  id: string;
  despacho: string;
  radicado: string;
  area: string;
  asunto: string;
  urgencia: 'Flagrancia' | 'Alto' | 'Normal';
  estado: 'En Análisis' | 'Pendiente Dictamen' | 'Concluido';
  cifrado: boolean;
}
