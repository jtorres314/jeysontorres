import React, { useState } from 'react';
import { PageView, Article, JurisprudenciaItem, SimulatorCase, AcademicResource, NormaItem, NormaCategory } from '../types';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';

interface AdminConsolePageProps {
  onNavigate: (page: PageView) => void;
}

export const AdminConsolePage: React.FC<AdminConsolePageProps> = ({ onNavigate }) => {
  const {
    isAuthenticated,
    login,
    logout,
    menuItems,
    toggleMenuItemVisibility,
    updateMenuItemLabel,
    resetMenuItems,
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
    updateRequerimientoStatus,
  } = useApp();

  // Subcategory Form State
  const [subCatParentId, setSubCatParentId] = useState<string>('constitucion');
  const [subCatName, setSubCatName] = useState<string>('');

  // Login Form State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Section Tab
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'menus' | 'blog' | 'normativo' | 'jurisprudencia' | 'simuladores' | 'aula'>('dashboard');

  // Category filter state for Rincón Normativo in Admin Console
  const [selectedAdminCategoryFilter, setSelectedAdminCategoryFilter] = useState<string>('all');
  const [adminSearchTerm, setAdminSearchTerm] = useState<string>('');
  const [adminSubcategoryFilter, setAdminSubcategoryFilter] = useState<string>('all');
  const [adminSortOption, setAdminSortOption] = useState<'default' | 'title' | 'code' | 'category'>('default');

  // Modals and Forms State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- FORM STATES ---
  // 1. Article Form
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState<Article['category']>('forense');
  const [artSummary, setArtSummary] = useState('');
  const [artFullContent, setArtFullContent] = useState('');
  const [artReadTime, setArtReadTime] = useState('10 MIN');
  const [artDate, setArtDate] = useState('20 ENE 2025');
  const [artRef, setArtRef] = useState('ISO/IEC 27037');
  const [artTag, setArtTag] = useState('TÉCNICO & PROBATORIO');
  const [artImageUrl, setArtImageUrl] = useState('/assets/aistudio/Image_5_a1301cf4.png');

  // 2. Jurisprudencia Form
  const [jurRadicado, setJurRadicado] = useState('');
  const [jurTitle, setJurTitle] = useState('');
  const [jurCourt, setJurCourt] = useState('Corte Suprema de Justicia');
  const [jurSala, setJurSala] = useState('Sala de Casación Penal');
  const [jurMagistrado, setJurMagistrado] = useState('');
  const [jurYear, setJurYear] = useState<number>(2025);
  const [jurCourtType, setJurCourtType] = useState<JurisprudenciaItem['courtType']>('suprema');
  const [jurCategoryTag, setJurCategoryTag] = useState('EVIDENCIA DIGITAL & PROCESAL PENAL');
  const [jurSintesis, setJurSintesis] = useState('');
  const [jurRatio, setJurRatio] = useState('');
  const [jurComentario, setJurComentario] = useState('');
  const [jurRegla, setJurRegla] = useState('');
  const [jurTagsInput, setJurTagsInput] = useState('Evidencia, Cadena de Custodia');

  // 3. Simulator Form
  const [simCode, setSimCode] = useState('CASE-2025-04');
  const [simTitle, setSimTitle] = useState('');
  const [simTimeLimit, setSimTimeLimit] = useState('05:00 MIN');
  const [simDifficulty, setSimDifficulty] = useState('INTERMEDIO');
  const [simQuestionNumber, setSimQuestionNumber] = useState('CASO 04');
  const [simCategoryTag, setSimCategoryTag] = useState('INFORMÁTICA FORENSE');
  const [simType, setSimType] = useState<SimulatorCase['simulatorType']>('concurso');
  const [simConcursoName, setSimConcursoName] = useState('Convocatoria Rama Judicial - Jueces');
  const [simRama, setSimRama] = useState<SimulatorCase['ramaDerecho']>('Penal');
  const [simIsIdoneidad, setSimIsIdoneidad] = useState(true);
  const [simQuestion, setSimQuestion] = useState('');
  const [simScenarioLabel, setSimScenarioLabel] = useState('Evidencia SSD • BitLocker Cifrado');
  const [simScenarioCompliance, setSimScenarioCompliance] = useState('Cumplimiento ISO/IEC 27037 & RFC 3227');

  const [optATitle, setOptATitle] = useState('');
  const [optASubtitle, setOptASubtitle] = useState('');
  const [optBTitle, setOptBTitle] = useState('');
  const [optBSubtitle, setOptBSubtitle] = useState('');
  const [optCTitle, setOptCTitle] = useState('');
  const [optCSubtitle, setOptCSubtitle] = useState('');
  const [optDTitle, setOptDTitle] = useState('');
  const [optDSubtitle, setOptDSubtitle] = useState('');
  const [correctOptionKey, setCorrectOptionKey] = useState<'A' | 'B' | 'C' | 'D'>('B');

  const [expIso, setExpIso] = useState('');
  const [expLegal, setExpLegal] = useState('');

  // 4. Norma Item Form
  const [editingNormaId, setEditingNormaId] = useState<string | null>(null);
  const [normCategoryRef, setNormCategoryRef] = useState('codigos');
  const [normSubcategory, setNormSubcategory] = useState('');
  const [normCode, setNormCode] = useState('ARTÍCULO 269A (C.P.)');
  const [normTitle, setNormTitle] = useState('');
  const [normExcerpt, setNormExcerpt] = useState('');
  const [normFullText, setNormFullText] = useState('');
  const [normRequisito, setNormRequisito] = useState('');
  const [normJurisprudencia, setNormJurisprudencia] = useState('');
  const [normConcordancia, setNormConcordancia] = useState('');
  const [normBranchTag, setNormBranchTag] = useState('Penal');
  const [normUrl, setNormUrl] = useState('https://www.suin-juriscol.gov.co/');

  // 5. Norma Category Form
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catTitle, setCatTitle] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catIcon, setCatIcon] = useState('menu_book');
  const [catBadge, setCatBadge] = useState('NORMATIVA REGIONAL');
  const [catSubcategoriesInput, setCatSubcategoriesInput] = useState('');

  // 6. Academic Resource Form
  const [acadCategory, setAcadCategory] = useState<AcademicResource['category']>('diapositivas');
  const [acadBadge, setAcadBadge] = useState('CÓMPUTO FORENSE');
  const [acadYear, setAcadYear] = useState<'2025' | '2024' | '2023'>('2025');
  const [acadSubject, setAcadSubject] = useState('INFORMÁTICA FORENSE I');
  const [acadCycle, setAcadCycle] = useState('CICLO PROFESIONAL');
  const [acadTitle, setAcadTitle] = useState('');
  const [acadDescription, setAcadDescription] = useState('');
  const [acadTech, setAcadTech] = useState('PDF High-Res • 45 Páginas');
  const [acadHash, setAcadHash] = useState('VERIFIED-SHA256');

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    const success = login(usernameInput, passwordInput);
    if (!success) {
      setLoginError(true);
    }
  };

  const handleAutofillDemo = () => {
    setUsernameInput('admin');
    setPasswordInput('forense2026');
    setLoginError(false);
  };

  // --- SUBMIT HANDLERS ---
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim()) return;

    if (editingId) {
      updateArticle(editingId, {
        title: artTitle,
        category: artCategory,
        categoryLabel: artCategory === 'forense' ? 'INFORMÁTICA FORENSE' : artCategory === 'ia-derecho' ? 'IA & DERECHO' : artCategory === 'evidencia-digital' ? 'EVIDENCIA DIGITAL' : 'CIBERDELINCUENCIA',
        summary: artSummary,
        fullContent: artFullContent,
        readTime: artReadTime,
        date: artDate,
        ref: artRef,
        tag: artTag,
        imageUrl: artImageUrl,
      });
    } else {
      addArticle({
        category: artCategory,
        categoryLabel: artCategory === 'forense' ? 'INFORMÁTICA FORENSE' : artCategory === 'ia-derecho' ? 'IA & DERECHO' : artCategory === 'evidencia-digital' ? 'EVIDENCIA DIGITAL' : 'CIBERDELINCUENCIA',
        title: artTitle,
        summary: artSummary,
        fullContent: artFullContent,
        readTime: artReadTime,
        date: artDate,
        ref: artRef,
        tag: artTag,
        imageUrl: artImageUrl,
      });
    }
    setActiveModal(null);
    setEditingId(null);
  };

  const handleSaveJurisprudencia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jurTitle.trim()) return;

    const tagsArray = jurTagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingId) {
      updateJurisprudencia(editingId, {
        radicado: jurRadicado,
        title: jurTitle,
        court: jurCourt,
        sala: jurSala,
        magistrado: jurMagistrado,
        year: Number(jurYear),
        courtType: jurCourtType,
        categoryTag: jurCategoryTag,
        sintesisHechos: jurSintesis,
        ratioDecidendi: jurRatio,
        comentarioTorres: jurComentario,
        reglaProbatoria: jurRegla,
        tags: tagsArray,
      });
    } else {
      addJurisprudencia({
        radicado: jurRadicado,
        title: jurTitle,
        court: jurCourt,
        sala: jurSala,
        magistrado: jurMagistrado,
        year: Number(jurYear),
        courtType: jurCourtType,
        categoryTag: jurCategoryTag,
        sintesisHechos: jurSintesis,
        ratioDecidendi: jurRatio,
        comentarioTorres: jurComentario,
        reglaProbatoria: jurRegla,
        hash: 'sha256-' + Math.random().toString(36).substring(2, 10),
        tags: tagsArray,
      });
    }
    setActiveModal(null);
    setEditingId(null);
  };

  const handleSaveSimulator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTitle.trim()) return;

    const optionsList = [
      { key: 'A' as const, title: optATitle || 'Opción A', subtitle: optASubtitle, isCorrect: correctOptionKey === 'A' },
      { key: 'B' as const, title: optBTitle || 'Opción B', subtitle: optBSubtitle, isCorrect: correctOptionKey === 'B' },
      { key: 'C' as const, title: optCTitle || 'Opción C', subtitle: optCSubtitle, isCorrect: correctOptionKey === 'C' },
      { key: 'D' as const, title: optDTitle || 'Opción D', subtitle: optDSubtitle, isCorrect: correctOptionKey === 'D' },
    ];

    if (editingId) {
      updateSimulator(editingId, {
        code: simCode,
        title: simTitle,
        timeLimit: simTimeLimit,
        difficulty: simDifficulty,
        questionNumber: simQuestionNumber,
        categoryTag: simCategoryTag,
        simulatorType: simType,
        concursoName: simConcursoName,
        ramaDerecho: simRama,
        isExamenIdoneidad: simIsIdoneidad,
        puntuacionRequerida: 80,
        question: simQuestion,
        scenarioDetails: {
          label: simScenarioLabel,
          hash: 'SHA-256: ' + Math.random().toString(36).substring(2, 12),
          compliance: simScenarioCompliance,
        },
        options: optionsList,
        explanation: {
          isoFoundation: expIso || 'Cumplimiento de estándares ISO/IEC 27037',
          legalFoundation: expLegal || 'Sustento procesal según jurisprudencia de la CSJ',
          generatedHash: 'SHA-256: ' + Math.random().toString(36).substring(2, 12),
        },
      });
    } else {
      addSimulator({
        code: simCode,
        title: simTitle,
        timeLimit: simTimeLimit,
        difficulty: simDifficulty,
        questionNumber: simQuestionNumber,
        categoryTag: simCategoryTag,
        simulatorType: simType,
        concursoName: simConcursoName,
        ramaDerecho: simRama,
        isExamenIdoneidad: simIsIdoneidad,
        puntuacionRequerida: 80,
        question: simQuestion,
        scenarioDetails: {
          label: simScenarioLabel,
          hash: 'SHA-256: ' + Math.random().toString(36).substring(2, 12),
          compliance: simScenarioCompliance,
        },
        options: optionsList,
        explanation: {
          isoFoundation: expIso || 'Cumplimiento de estándares ISO/IEC 27037',
          legalFoundation: expLegal || 'Sustento procesal según jurisprudencia de la CSJ',
          generatedHash: 'SHA-256: ' + Math.random().toString(36).substring(2, 12),
        },
      });
    }
    setActiveModal(null);
    setEditingId(null);
  };

  const handleSaveNormaItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!normTitle.trim()) return;

    if (editingNormaId) {
      updateNormaItem(editingNormaId, {
        categoryId: normCategoryRef,
        subcategory: normSubcategory,
        code: normCode,
        title: normTitle,
        excerpt: normExcerpt,
        fullText: normFullText,
        requisito: normRequisito,
        jurisprudencia: normJurisprudencia,
        concordancia: normConcordancia,
        branchTag: normBranchTag,
        url: normUrl,
      });
    } else {
      addNormaItem({
        categoryId: normCategoryRef,
        subcategory: normSubcategory,
        code: normCode,
        title: normTitle,
        excerpt: normExcerpt,
        fullText: normFullText,
        requisito: normRequisito,
        jurisprudencia: normJurisprudencia,
        concordancia: normConcordancia,
        branchTag: normBranchTag,
        url: normUrl,
      });
    }
    setActiveModal(null);
    setEditingNormaId(null);
  };

  const handleSaveNormaCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catTitle.trim()) return;

    const subcatsArray = catSubcategoriesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingCatId) {
      updateNormaCategory(editingCatId, {
        title: catTitle,
        description: catDescription,
        icon: catIcon,
        badge: catBadge,
        subcategories: subcatsArray,
      });
    } else {
      addNormaCategory({
        title: catTitle,
        description: catDescription,
        icon: catIcon,
        badge: catBadge,
        subcategories: subcatsArray,
      });
    }
    setActiveModal(null);
    setEditingCatId(null);
  };

  const handleSaveAcademicResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acadTitle.trim()) return;

    addAcademicResource({
      category: acadCategory,
      categoryLabel: acadCategory === 'diapositivas' ? 'DIAPOSITIVAS & PRESENTACIONES' : acadCategory === 'proyectos' ? 'PROYECTOS & INVESTIGACIÓN' : 'EVALUACIONES & SÍLABOS',
      badge: acadBadge,
      year: acadYear,
      subject: acadSubject,
      cycle: acadCycle,
      title: acadTitle,
      description: acadDescription,
      slidesCountOrTech: acadTech,
      hashOrRepo: acadHash,
      pdfSize: '15.0 MB',
    });
    setActiveModal(null);
  };

  // IF NOT AUTHENTICATED -> SHOW FORENSIC LOGIN SHIELD
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-8 shadow-2xl flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-[#0f5132] text-[#4edea3] flex items-center justify-center border border-[#4edea3]/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span className="material-symbols-outlined text-[32px]">shield_lock</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#d6e3fe] mt-2">Acceso Administrativo</h1>
            <p className="text-xs text-[#bbcabf]">
              Panel de control y gestión de contenidos para Jeyson Torres T. - Investigador Judicial & Ingeniero de Sistemas
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#4edea3] uppercase tracking-wider">Usuario Admin:</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bbcabf] text-[18px]">
                  person
                </span>
                <input
                  type="text"
                  required
                  placeholder="Ingrese su usuario (ej: admin)"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-[#132033] text-[#d6e3fe] placeholder-[#8f9fa0] text-sm rounded-xl pl-10 pr-4 py-3 border border-[#28354a] focus:outline-none focus:border-[#4edea3]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#4edea3] uppercase tracking-wider">Contraseña:</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bbcabf] text-[18px]">
                  key
                </span>
                <input
                  type="password"
                  required
                  placeholder="Ingrese su contraseña"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#132033] text-[#d6e3fe] placeholder-[#8f9fa0] text-sm rounded-xl pl-10 pr-4 py-3 border border-[#28354a] focus:outline-none focus:border-[#4edea3]"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-bold text-center animate-shake">
                ⚠️ Credenciales incorrectas. Verifique e intente de nuevo.
              </div>
            )}

            <button
              type="submit"
              className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold text-sm py-3 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2"
            >
              <span>Autenticar y Acceder</span>
              <span className="material-symbols-outlined text-[18px]">login</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#18283f] flex flex-col gap-2">
            <button
              onClick={handleAutofillDemo}
              className="w-full py-2 bg-[#132033] hover:bg-[#1c2c45] text-[#4edea3] text-xs font-bold rounded-xl border border-[#233754] transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Rellenar Credenciales de Demo (admin / forense2026)</span>
            </button>

            <button
              onClick={() => onNavigate('perfil')}
              className="text-center text-xs text-[#8f9fa0] hover:text-[#d6e3fe] pt-1"
            >
              Volver al Sitio Público
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ONCE AUTHENTICATED -> SHOW COMPLETE ADMIN CMS
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Admin Top Dashboard Bar */}
      <div className="w-full bg-[#081523] border-b border-[#18283f] px-4 md:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0f5132] text-[#4edea3] flex items-center justify-center border border-[#4edea3]/30">
              <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#d6e3fe]">Panel de Gestión Forense & CMS</h1>
              <p className="text-xs text-[#bbcabf]">
                Gestión en tiempo real de publicaciones, jurisprudencia, simuladores y compendios normativos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tabs Navigation */}
      <div className="w-full bg-[#0d1a2d] border-b border-[#18283f] px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none py-2">
          <button
            onClick={() => setActiveAdminTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'dashboard'
                ? 'bg-[#10b981] text-[#003824] shadow-md'
                : 'text-[#bbcabf] hover:text-[#d6e3fe] hover:bg-[#132033]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Dashboard & Requerimientos ({requerimientos.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('menus')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'menus'
                ? 'bg-[#10b981] text-[#003824] shadow-md'
                : 'text-[#bbcabf] hover:text-[#d6e3fe] hover:bg-[#132033]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Gestión de Menús ({menuItems.filter((i) => i.visible).length}/{menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('blog')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'blog'
                ? 'bg-[#10b981] text-[#003824] shadow-md'
                : 'text-[#bbcabf] hover:text-[#d6e3fe] hover:bg-[#132033]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">article</span>
            <span>Blog Ciberseguridad ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('normativo')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'normativo'
                ? 'bg-[#10b981] text-[#003824] shadow-md'
                : 'text-[#bbcabf] hover:text-[#d6e3fe] hover:bg-[#132033]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">gavel</span>
            <span>Rincón Normativo ({normaItems.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('jurisprudencia')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'jurisprudencia'
                ? 'bg-[#10b981] text-[#003824] shadow-md'
                : 'text-[#bbcabf] hover:text-[#d6e3fe] hover:bg-[#132033]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">balance</span>
            <span>Análisis Jurídico ({jurisprudencias.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('simuladores')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'simuladores'
                ? 'bg-[#10b981] text-[#003824] shadow-md'
                : 'text-[#bbcabf] hover:text-[#d6e3fe] hover:bg-[#132033]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">sports_esports</span>
            <span>Simuladores Procesales ({simulators.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('aula')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'aula'
                ? 'bg-[#10b981] text-[#003824] shadow-md'
                : 'text-[#bbcabf] hover:text-[#d6e3fe] hover:bg-[#132033]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>Aula Abierta ({academicResources.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content View per Tab */}
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 flex-1">
        {/* TAB 0: GESTIÓN DE MENÚS Y NAVEGACIÓN */}
        {activeAdminTab === 'menus' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e1c2f] p-6 rounded-2xl border border-[#1e2f47] shadow-xl">
              <div>
                <span className="text-xs font-bold text-[#4edea3] uppercase tracking-wider">
                  Navegación Dinámica
                </span>
                <h2 className="text-xl font-bold text-[#d6e3fe] mt-1">
                  Administración de Menús Públicos
                </h2>
                <p className="text-xs text-[#bbcabf] mt-1">
                  Active o desactive las opciones que los visitantes ven en la barra superior y menú móvil. Los cambios surten efecto inmediatamente.
                </p>
              </div>

              <button
                onClick={resetMenuItems}
                className="px-4 py-2.5 rounded-xl bg-[#132033] hover:bg-[#1f304a] text-[#4edea3] font-bold text-xs border border-[#233754] transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>Restablecer Menú Predeterminado</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                    item.visible
                      ? 'bg-[#0e1c2f] border-[#10b981]/40 shadow-lg'
                      : 'bg-[#0a1524] border-[#1d2a3e] opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-[#8f9fa0] uppercase">
                        ID: {item.id} • Vista: {item.page}
                      </span>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updateMenuItemLabel(item.id, e.target.value)}
                        className="font-bold text-base bg-[#132033] text-[#d6e3fe] px-3 py-1.5 rounded-lg border border-[#28354a] focus:outline-none focus:border-[#4edea3]"
                      />
                    </div>

                    <button
                      onClick={() => toggleMenuItemVisibility(item.id)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shrink-0 cursor-pointer ${
                        item.visible ? 'bg-[#10b981]' : 'bg-[#1d2a3e]'
                      }`}
                      title={item.visible ? 'Ocultar opción del menú' : 'Mostrar opción en el menú'}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-[#003824] transition-transform ${
                          item.visible ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3 border-t border-[#18283f] flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.visible
                          ? 'bg-[#0f5132] text-[#4edea3]'
                          : 'bg-[#1d2a3e] text-[#8f9fa0]'
                      }`}
                    >
                      {item.visible ? '✓ Visible en Menú' : '✕ Oculto para Usuarios'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: DASHBOARD & REQUERIMIENTOS */}

        {activeAdminTab === 'dashboard' && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 flex flex-col gap-2">
                <span className="text-xs font-bold text-[#bbcabf] uppercase">Artículos Publicados</span>
                <span className="text-3xl font-extrabold text-[#4edea3]">{articles.length}</span>
                <span className="text-[11px] text-[#8f9fa0]">Blog de Ciberseguridad</span>
              </div>
              <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 flex flex-col gap-2">
                <span className="text-xs font-bold text-[#bbcabf] uppercase">Sentencias Estandarizadas</span>
                <span className="text-3xl font-extrabold text-[#4edea3]">{jurisprudencias.length}</span>
                <span className="text-[11px] text-[#8f9fa0]">Corte Suprema & Constitucional</span>
              </div>
              <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 flex flex-col gap-2">
                <span className="text-xs font-bold text-[#bbcabf] uppercase">Simuladores Activos</span>
                <span className="text-3xl font-extrabold text-[#4edea3]">{simulators.length}</span>
                <span className="text-[11px] text-[#8f9fa0]">Casos Procesales Interactivos</span>
              </div>
              <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 flex flex-col gap-2">
                <span className="text-xs font-bold text-[#bbcabf] uppercase">Normas & Códigos</span>
                <span className="text-3xl font-extrabold text-[#4edea3]">{normaItems.length}</span>
                <span className="text-[11px] text-[#8f9fa0]">Compendio Rincón Normativo</span>
              </div>
            </div>

            {/* Requerimientos Table */}
            <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 shadow-xl">
              <h2 className="text-lg font-bold text-[#d6e3fe] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3]">inbox</span>
                <span>Bandeja Prioritaria de Requerimientos Periciales</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#1d2a3e] text-xs font-bold text-[#bbcabf] uppercase">
                      <th className="py-3 px-4">Despacho / Radicado</th>
                      <th className="py-3 px-4">Área / Asunto</th>
                      <th className="py-3 px-4">Urgencia</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-right">Cambiar Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#18283f] text-xs">
                    {requerimientos.map((req) => (
                      <tr key={req.id} className="hover:bg-[#132033]">
                        <td className="py-4 px-4 font-bold text-[#d6e3fe]">
                          <div>{req.despacho}</div>
                          <div className="text-[11px] font-mono text-[#8f9fa0]">{req.radicado}</div>
                        </td>
                        <td className="py-4 px-4 text-[#bbcabf]">
                          <div className="font-bold text-[#4edea3]">{req.area}</div>
                          <div>{req.asunto}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              req.urgencia === 'Flagrancia'
                                ? 'bg-red-950 text-red-400 border border-red-800'
                                : 'bg-[#18283f] text-[#4edea3]'
                            }`}
                          >
                            {req.urgencia}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#0f5132] text-[#4edea3] font-bold text-[10px]">
                            {req.estado}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right flex justify-end gap-2">
                          <button
                            onClick={() => updateRequerimientoStatus(req.id, 'En Análisis')}
                            className="px-2 py-1 bg-[#132033] hover:bg-[#1f304a] text-[#d6e3fe] text-[10px] rounded"
                          >
                            Análisis
                          </button>
                          <button
                            onClick={() => updateRequerimientoStatus(req.id, 'Concluido')}
                            className="px-2 py-1 bg-[#0f5132] hover:bg-[#13613d] text-[#4edea3] text-[10px] rounded font-bold"
                          >
                            Concluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOG DE CIBERSEGURIDAD */}
        {activeAdminTab === 'blog' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#d6e3fe]">Gestor de Blog de Ciberseguridad & Forense</h2>
                <p className="text-xs text-[#bbcabf]">Cargue, edite o elimine artículos técnicos para la vista pública.</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setArtTitle('');
                  setArtSummary('');
                  setArtFullContent('');
                  setActiveModal('article');
                }}
                className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Crear Nuevo Artículo</span>
              </button>
            </div>

            <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 shadow-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#1d2a3e] text-xs font-bold text-[#bbcabf] uppercase">
                    <th className="py-3 px-4">Título / Ref</th>
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4">Fecha / Lectura</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18283f] text-xs">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-[#132033]">
                      <td className="py-4 px-4 font-bold text-[#d6e3fe] max-w-[320px]">
                        <div>{art.title}</div>
                        <div className="text-[10px] font-mono text-[#4edea3]">Ref: {art.ref}</div>
                      </td>
                      <td className="py-4 px-4 text-[#bbcabf]">
                        <span className="px-2.5 py-0.5 rounded bg-[#0f5132] text-[#4edea3] text-[10px] font-bold">
                          {art.categoryLabel}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[#8f9fa0] font-mono">
                        {art.date} ({art.readTime})
                      </td>
                      <td className="py-4 px-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingId(art.id);
                            setArtTitle(art.title);
                            setArtCategory(art.category);
                            setArtSummary(art.summary);
                            setArtFullContent(art.fullContent || '');
                            setArtReadTime(art.readTime);
                            setArtDate(art.date);
                            setArtRef(art.ref);
                            setArtTag(art.tag);
                            setArtImageUrl(art.imageUrl || '');
                            setActiveModal('article');
                          }}
                          className="px-3 py-1.5 bg-[#18283f] hover:bg-[#253957] text-[#4edea3] font-bold rounded-lg"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteArticle(art.id)}
                          className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 font-bold rounded-lg border border-red-800"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: RINCÓN NORMATIVO */}
        {activeAdminTab === 'normativo' && (
          <div className="flex flex-col gap-8">
            {/* Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#d6e3fe]">Gestor del Rincón Normativo</h2>
                <p className="text-xs text-[#bbcabf]">Administre categorías, subcategorías, códigos, leyes y sentencias de forma 100% dinámica.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingCatId(null);
                    setCatTitle('');
                    setCatDescription('');
                    setCatIcon('account_balance');
                    setCatBadge('NORMATIVA REGIONAL');
                    setCatSubcategoriesInput('');
                    setActiveModal('normaCategory');
                  }}
                  className="bg-[#132033] hover:bg-[#1f304a] text-[#4edea3] border border-[#2d3e58] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">create_new_folder</span>
                  <span>+ Crear Categoría</span>
                </button>

                <button
                  onClick={() => {
                    setSubCatParentId(normaCategories[0]?.id || 'constitucion');
                    setSubCatName('');
                    setActiveModal('normaSubcategory');
                  }}
                  className="bg-[#132033] hover:bg-[#1f304a] text-[#4edea3] border border-[#2d3e58] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                  <span>+ Registrar Subcategoría</span>
                </button>

                <button
                  onClick={() => {
                    setEditingNormaId(null);
                    setNormCategoryRef(normaCategories[0]?.id || 'constitucion');
                    setNormSubcategory('');
                    setNormCode('LEY 1273 DE 2009');
                    setNormTitle('');
                    setNormExcerpt('');
                    setNormFullText('');
                    setNormRequisito('');
                    setNormJurisprudencia('');
                    setNormConcordancia('');
                    setNormBranchTag('Penal');
                    setNormUrl('https://www.suin-juriscol.gov.co/');
                    setActiveModal('normaItem');
                  }}
                  className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>+ Crear Norma / Ley / Código</span>
                </button>
              </div>
            </div>

            {/* Existing Categories */}
            <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-sm font-bold text-[#4edea3] uppercase tracking-wider">
                  Categorías Configuradas ({normaCategories.length})
                </h3>
                <span className="text-xs text-[#bbcabf] font-mono">
                  💡 Haz clic en una categoría para filtrar la tabla de abajo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {normaCategories.map((c) => {
                  const isSelected = selectedAdminCategoryFilter === c.id;
                  const categoryItemCount = normaItems.filter((i) => i.categoryId === c.id).length;

                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedAdminCategoryFilter(isSelected ? 'all' : c.id)}
                      className={`p-4 rounded-2xl bg-[#0e1c2f] border transition-all shadow-md cursor-pointer relative ${
                        isSelected
                          ? 'border-[#4edea3] ring-2 ring-[#4edea3]/40 bg-[#122338]'
                          : 'border-[#1d2d45] hover:border-[#4edea3]/50 hover:bg-[#112033]'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute -top-2.5 right-3 bg-[#10b981] text-[#003824] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          <span>Seleccionada</span>
                        </span>
                      )}

                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="material-symbols-outlined text-[#4edea3] text-[28px]">{c.icon}</span>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#132033] text-[#4edea3] border border-[#283850]">
                            {categoryItemCount} ítems
                          </span>
                        </div>
                        <h4 className="font-bold text-[#d6e3fe] text-base leading-snug">{c.title}</h4>
                        <p className="text-xs text-[#8f9fa0] line-clamp-2 leading-relaxed">{c.description}</p>
                        
                        <div className="flex flex-col gap-1.5 mt-1">
                          <div className="flex items-center justify-between text-xs text-[#84c39b]">
                            <span className="font-semibold text-[11px] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-[#4edea3]">folder_open</span>
                              <span>Subcategorías ({c.subcategories ? c.subcategories.length : 0}):</span>
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSubCatParentId(c.id);
                                setSubCatName('');
                                setActiveModal('normaSubcategory');
                              }}
                              className="text-[10px] text-[#4edea3] hover:underline font-bold cursor-pointer"
                            >
                              + Añadir
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1 scrollbar-none" onClick={(e) => e.stopPropagation()}>
                            {c.subcategories && c.subcategories.length > 0 ? (
                              c.subcategories.map((sub, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="inline-flex items-center gap-1 text-[10px] font-medium text-[#c0d6f3] bg-[#081729] px-2 py-0.5 rounded-md border border-[#162a44]"
                                >
                                  <span className="truncate max-w-[130px]">{sub}</span>
                                  <button
                                    type="button"
                                    onClick={() => deleteSubcategoryFromCategory(c.id, sub)}
                                    className="text-[#f87171] hover:text-[#ef4444] font-bold text-[12px] leading-none cursor-pointer pl-0.5"
                                    title={`Eliminar subcategoría "${sub}"`}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))
                            ) : (
                              <span className="text-[10px] text-[#637d9e] italic">Sin subcategorías registradas</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#18283f] flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[10px] text-[#4edea3] font-bold uppercase tracking-wider">{c.badge || 'CATEGORÍA'}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingCatId(c.id);
                              setCatTitle(c.title);
                              setCatDescription(c.description);
                              setCatIcon(c.icon);
                              setCatBadge(c.badge || '');
                              setCatSubcategoriesInput(c.subcategories ? c.subcategories.join(', ') : '');
                              setActiveModal('normaCategory');
                            }}
                            className="text-[#4edea3] hover:text-[#6ffbbe] text-xs font-bold px-2.5 py-1 bg-[#132033] rounded-lg hover:bg-[#1a2c44] cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteNormaCategory(c.id)}
                            className="text-red-400 hover:text-red-300 text-xs font-bold px-2.5 py-1 bg-red-950/40 rounded-lg hover:bg-red-950 cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BARRA DE HERRAMIENTAS Y REGISTROS DE NORMAS */}
            <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 shadow-xl flex flex-col gap-6">
              {/* Header & Item Counter */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#1d2a3e]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4edea3]">manage_search</span>
                  <h3 className="text-base font-bold text-[#d6e3fe]">
                    Gestión & Filtrado de Elementos Normativos
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#132033] text-[#4edea3] border border-[#283850]">
                  Mostrando {
                    normaItems.filter((item) => {
                      if (selectedAdminCategoryFilter !== 'all' && item.categoryId !== selectedAdminCategoryFilter) return false;
                      if (adminSubcategoryFilter !== 'all' && item.subcategory !== adminSubcategoryFilter) return false;
                      if (adminSearchTerm.trim()) {
                        const q = adminSearchTerm.toLowerCase();
                        return (
                          item.title.toLowerCase().includes(q) ||
                          item.code.toLowerCase().includes(q) ||
                          item.excerpt.toLowerCase().includes(q) ||
                          (item.subcategory || '').toLowerCase().includes(q)
                        );
                      }
                      return true;
                    }).length
                  } de {normaItems.length} ítems
                </span>
              </div>

              {/* TOOLBAR CONTROLS: SEARCH + CATEGORY FILTER + SUBCATEGORY FILTER + SORT */}
              <div className="bg-[#0a1626] p-4 rounded-xl border border-[#18283f] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Search Box */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#4edea3] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">search</span>
                    <span>Buscar Ítem:</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Código, título o extracto..."
                      value={adminSearchTerm}
                      onChange={(e) => setAdminSearchTerm(e.target.value)}
                      className="w-full bg-[#132033] text-[#d6e3fe] placeholder-[#718296] text-xs rounded-xl pl-3 pr-8 py-2.5 border border-[#283850] focus:outline-none focus:border-[#4edea3]"
                    />
                    {adminSearchTerm && (
                      <button
                        onClick={() => setAdminSearchTerm('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#718296] hover:text-[#d6e3fe]"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Category Filter */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#4edea3] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">category</span>
                    <span>Categoría:</span>
                  </label>
                  <select
                    value={selectedAdminCategoryFilter}
                    onChange={(e) => {
                      setSelectedAdminCategoryFilter(e.target.value);
                      setAdminSubcategoryFilter('all');
                    }}
                    className="w-full bg-[#132033] text-[#d6e3fe] text-xs rounded-xl px-3 py-2.5 border border-[#283850] focus:outline-none focus:border-[#4edea3] cursor-pointer"
                  >
                    <option value="all">Todas las Categorías ({normaCategories.length})</option>
                    {normaCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Subcategory Filter */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#4edea3] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">folder_open</span>
                    <span>Subcategoría:</span>
                  </label>
                  <select
                    value={adminSubcategoryFilter}
                    onChange={(e) => setAdminSubcategoryFilter(e.target.value)}
                    className="w-full bg-[#132033] text-[#d6e3fe] text-xs rounded-xl px-3 py-2.5 border border-[#283850] focus:outline-none focus:border-[#4edea3] cursor-pointer"
                  >
                    <option value="all">Todas las Subcategorías</option>
                    {(selectedAdminCategoryFilter !== 'all'
                      ? normaCategories.find((c) => c.id === selectedAdminCategoryFilter)?.subcategories || []
                      : Array.from(new Set(normaItems.map((i) => i.subcategory).filter(Boolean))) as string[]
                    ).map((sub, idx) => (
                      <option key={idx} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Sort Control */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#4edea3] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">sort</span>
                    <span>Ordenar Por:</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={adminSortOption}
                      onChange={(e) => setAdminSortOption(e.target.value as any)}
                      className="w-full bg-[#132033] text-[#d6e3fe] text-xs rounded-xl px-3 py-2.5 border border-[#283850] focus:outline-none focus:border-[#4edea3] cursor-pointer"
                    >
                      <option value="default">Orden Predeterminado</option>
                      <option value="code">Código / Norma (A-Z)</option>
                      <option value="title">Título (A-Z)</option>
                      <option value="category">Categoría</option>
                    </select>

                    {(selectedAdminCategoryFilter !== 'all' || adminSubcategoryFilter !== 'all' || adminSearchTerm || adminSortOption !== 'default') && (
                      <button
                        onClick={() => {
                          setSelectedAdminCategoryFilter('all');
                          setAdminSubcategoryFilter('all');
                          setAdminSearchTerm('');
                          setAdminSortOption('default');
                        }}
                        className="px-3 py-2.5 bg-[#1f2d42] hover:bg-[#283a54] text-[#4edea3] rounded-xl border border-[#283850] transition-all flex items-center justify-center shrink-0"
                        title="Limpiar todos los filtros"
                      >
                        <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Table of Filtered & Sorted Items */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="border-b border-[#1d2a3e] text-xs font-bold text-[#bbcabf] uppercase">
                      <th className="py-3 px-4">Categoría / Subcategoría</th>
                      <th className="py-3 px-4">Código / Identificador</th>
                      <th className="py-3 px-4">Título</th>
                      <th className="py-3 px-4">Rama</th>
                      <th className="py-3 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#18283f] text-xs">
                    {normaItems
                      .filter((item) => {
                        if (selectedAdminCategoryFilter !== 'all' && item.categoryId !== selectedAdminCategoryFilter) return false;
                        if (adminSubcategoryFilter !== 'all' && item.subcategory !== adminSubcategoryFilter) return false;
                        if (adminSearchTerm.trim()) {
                          const q = adminSearchTerm.toLowerCase();
                          return (
                            item.title.toLowerCase().includes(q) ||
                            item.code.toLowerCase().includes(q) ||
                            item.excerpt.toLowerCase().includes(q) ||
                            (item.subcategory || '').toLowerCase().includes(q)
                          );
                        }
                        return true;
                      })
                      .sort((a, b) => {
                        if (adminSortOption === 'title') return a.title.localeCompare(b.title);
                        if (adminSortOption === 'code') return a.code.localeCompare(b.code);
                        if (adminSortOption === 'category') return a.categoryId.localeCompare(b.categoryId);
                        return 0;
                      })
                      .map((n) => {
                        const parentCat = normaCategories.find((c) => c.id === n.categoryId);
                        return (
                          <tr key={n.id} className="hover:bg-[#132033] transition-colors">
                            <td className="py-4 px-4 font-bold text-[#d6e3fe]">
                              <div>{parentCat?.title || n.categoryId}</div>
                              {n.subcategory && (
                                <div className="text-[10px] text-[#4edea3] font-normal">{n.subcategory}</div>
                              )}
                            </td>
                            <td className="py-4 px-4 font-mono font-bold text-[#4edea3]">{n.code}</td>
                            <td className="py-4 px-4 font-bold text-[#d6e3fe] max-w-[280px]">
                              <div>{n.title}</div>
                            </td>
                            <td className="py-4 px-4 text-[#bbcabf]">{n.branchTag || 'General'}</td>
                            <td className="py-4 px-4 text-right flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingNormaId(n.id);
                                  setNormCategoryRef(n.categoryId);
                                  setNormSubcategory(n.subcategory || '');
                                  setNormCode(n.code);
                                  setNormTitle(n.title);
                                  setNormExcerpt(n.excerpt);
                                  setNormFullText(n.fullText);
                                  setNormRequisito(n.requisito || '');
                                  setNormJurisprudencia(n.jurisprudencia || '');
                                  setNormConcordancia(n.concordancia || '');
                                  setNormBranchTag(n.branchTag || 'Penal');
                                  setNormUrl(n.url || 'https://www.suin-juriscol.gov.co/');
                                  setActiveModal('normaItem');
                                }}
                                className="px-3 py-1.5 bg-[#18283f] hover:bg-[#253957] text-[#4edea3] font-bold rounded-lg cursor-pointer"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => deleteNormaItem(n.id)}
                                className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 font-bold rounded-lg border border-red-800 cursor-pointer"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: JURISPRUDENCIA / SENTENCIAS ESTANDARIZADAS */}
        {activeAdminTab === 'jurisprudencia' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#d6e3fe]">Carga y Estandarización de Sentencias</h2>
                <p className="text-xs text-[#bbcabf]">Cargue providencias judiciales conservando la estructura idéntica estandarizada.</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setJurRadicado('');
                  setJurTitle('');
                  setJurSintesis('');
                  setJurRatio('');
                  setJurComentario('');
                  setJurRegla('');
                  setActiveModal('jurisprudencia');
                }}
                className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ Cargar Nueva Sentencia</span>
              </button>
            </div>

            <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 shadow-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#1d2a3e] text-xs font-bold text-[#bbcabf] uppercase">
                    <th className="py-3 px-4">Radicado / Corte</th>
                    <th className="py-3 px-4">Título & Tema</th>
                    <th className="py-3 px-4">Magistrado</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18283f] text-xs">
                  {jurisprudencias.map((j) => (
                    <tr key={j.id} className="hover:bg-[#132033]">
                      <td className="py-4 px-4 font-bold text-[#d6e3fe]">
                        <div>{j.radicado}</div>
                        <div className="text-[10px] text-[#4edea3] font-mono">{j.court}</div>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#d6e3fe] max-w-[300px]">{j.title}</td>
                      <td className="py-4 px-4 text-[#bbcabf]">{j.magistrado}</td>
                      <td className="py-4 px-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingId(j.id);
                            setJurRadicado(j.radicado);
                            setJurTitle(j.title);
                            setJurCourt(j.court);
                            setJurSala(j.sala);
                            setJurMagistrado(j.magistrado);
                            setJurYear(j.year);
                            setJurCourtType(j.courtType);
                            setJurCategoryTag(j.categoryTag);
                            setJurSintesis(j.sintesisHechos);
                            setJurRatio(j.ratioDecidendi);
                            setJurComentario(j.comentarioTorres);
                            setJurRegla(j.reglaProbatoria || '');
                            setJurTagsInput(j.tags.join(', '));
                            setActiveModal('jurisprudencia');
                          }}
                          className="px-3 py-1.5 bg-[#18283f] hover:bg-[#253957] text-[#4edea3] font-bold rounded-lg"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteJurisprudencia(j.id)}
                          className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 font-bold rounded-lg border border-red-800"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SIMULADORES PROCESALES */}
        {activeAdminTab === 'simuladores' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#d6e3fe]">Creador & Gestor de Simuladores Procesales</h2>
                <p className="text-xs text-[#bbcabf]">Cree nuevos casos con supuestos fácticos, opciones A-D y retroalimentación técnica/legal.</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setSimTitle('');
                  setSimQuestion('');
                  setActiveModal('simulator');
                }}
                className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ Crear Nuevo Simulador</span>
              </button>
            </div>

            <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 shadow-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#1d2a3e] text-xs font-bold text-[#bbcabf] uppercase">
                    <th className="py-3 px-4">Código / Caso</th>
                    <th className="py-3 px-4">Dificultad</th>
                    <th className="py-3 px-4">Tiempo Límite</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18283f] text-xs">
                  {simulators.map((s) => (
                    <tr key={s.id} className="hover:bg-[#132033]">
                      <td className="py-4 px-4 font-bold text-[#d6e3fe]">
                        <div>{s.title}</div>
                        <div className="text-[10px] text-[#4edea3] font-mono">{s.code}</div>
                      </td>
                      <td className="py-4 px-4 text-[#bbcabf]">{s.difficulty}</td>
                      <td className="py-4 px-4 text-[#8f9fa0] font-mono">{s.timeLimit}</td>
                      <td className="py-4 px-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => deleteSimulator(s.id)}
                          className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 font-bold rounded-lg border border-red-800"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: AULA ABIERTA */}
        {activeAdminTab === 'aula' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#d6e3fe]">Gestor de Aula Abierta & Repositorio</h2>
                <p className="text-xs text-[#bbcabf]">Cargue diapositivas, proyectos e instructivos universitarios.</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setAcadTitle('');
                  setAcadDescription('');
                  setActiveModal('academic');
                }}
                className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ Crear Recurso Académico</span>
              </button>
            </div>

            <div className="bg-[#0e1c2f] rounded-2xl border border-[#1e2f47] p-6 shadow-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#1d2a3e] text-xs font-bold text-[#bbcabf] uppercase">
                    <th className="py-3 px-4">Título Recurso</th>
                    <th className="py-3 px-4">Asignatura</th>
                    <th className="py-3 px-4">Año Lectivo</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18283f] text-xs">
                  {academicResources.map((a) => (
                    <tr key={a.id} className="hover:bg-[#132033]">
                      <td className="py-4 px-4 font-bold text-[#d6e3fe]">{a.title}</td>
                      <td className="py-4 px-4 text-[#bbcabf]">{a.subject}</td>
                      <td className="py-4 px-4 font-mono text-[#4edea3]">{a.year}</td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => deleteAcademicResource(a.id)}
                          className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 font-bold rounded-lg border border-red-800"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* --- FORM MODALS --- */}
      {/* 1. ARTICLE MODAL */}
      {activeModal === 'article' && (
        <Modal
          isOpen={activeModal === 'article'}
          onClose={() => setActiveModal(null)}
          title={editingId ? 'Editar Artículo de Blog' : 'Crear Artículo de Ciberseguridad & Forense'}
          subtitle="Complete la información del artículo para su publicación instantánea"
          badge="CMS ARTICLE"
        >
          <form onSubmit={handleSaveArticle} className="flex flex-col gap-4 text-xs sm:text-sm text-[#d6e3fe]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Título del Artículo:</label>
                <input
                  type="text"
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Categoría:</label>
                <select
                  value={artCategory}
                  onChange={(e) => setArtCategory(e.target.value as Article['category'])}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                >
                  <option value="forense">Informática Forense</option>
                  <option value="ia-derecho">IA & Derecho</option>
                  <option value="evidencia-digital">Evidencia Digital</option>
                  <option value="ciberdelincuencia">Ciberdelincuencia</option>
                  <option value="proteccion-datos">Protección de Datos</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Resumen / Reseña Corta:</label>
              <textarea
                required
                rows={2}
                value={artSummary}
                onChange={(e) => setArtSummary(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Contenido Técnico Completo:</label>
              <textarea
                rows={5}
                value={artFullContent}
                onChange={(e) => setArtFullContent(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Tiempo Lectura:</label>
                <input
                  type="text"
                  value={artReadTime}
                  onChange={(e) => setArtReadTime(e.target.value)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Norma Ref:</label>
                <input
                  type="text"
                  value={artRef}
                  onChange={(e) => setArtRef(e.target.value)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Tag Principal:</label>
                <input
                  type="text"
                  value={artTag}
                  onChange={(e) => setArtTag(e.target.value)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1a2a40] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="bg-[#1d2a3e] text-[#d6e3fe] px-4 py-2 rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-[#10b981] text-[#003824] font-bold px-5 py-2 rounded-xl text-xs">
                Guardar y Publicar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 2. JURISPRUDENCIA MODAL */}
      {activeModal === 'jurisprudencia' && (
        <Modal
          isOpen={activeModal === 'jurisprudencia'}
          onClose={() => setActiveModal(null)}
          title={editingId ? 'Editar Sentencia Estandarizada' : 'Cargar Nueva Sentencia Estandarizada'}
          subtitle="Cargue la providencia conservando la estructura oficial"
          badge="ESTÁNDAR PROCESAL"
        >
          <form onSubmit={handleSaveJurisprudencia} className="flex flex-col gap-4 text-xs sm:text-sm text-[#d6e3fe]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Providencia / Radicado:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: SP-1284-2023 / Rad. 58192"
                  value={jurRadicado}
                  onChange={(e) => setJurRadicado(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Corte:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Corte Suprema de Justicia"
                  value={jurCourt}
                  onChange={(e) => setJurCourt(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Título y Tema Principal:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Inadmisibilidad de Capturas Simples de WhatsApp"
                  value={jurTitle}
                  onChange={(e) => setJurTitle(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Magistrado Ponente:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Dr. Gerson Chaverra Castro"
                  value={jurMagistrado}
                  onChange={(e) => setJurMagistrado(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Síntesis de Hechos / Contexto:</label>
              <textarea
                required
                rows={2}
                value={jurSintesis}
                onChange={(e) => setJurSintesis(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Ratio Decidendi (Tesis de la Corte):</label>
              <textarea
                required
                rows={3}
                value={jurRatio}
                onChange={(e) => setJurRatio(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Análisis Pericial Jeyson Torres T.:</label>
              <textarea
                required
                rows={3}
                value={jurComentario}
                onChange={(e) => setJurComentario(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Regla Probatoria Estándar:</label>
              <input
                type="text"
                placeholder="Exigencias técnicas específicas para la prueba"
                value={jurRegla}
                onChange={(e) => setJurRegla(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="pt-4 border-t border-[#1a2a40] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="bg-[#1d2a3e] text-[#d6e3fe] px-4 py-2 rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-[#10b981] text-[#003824] font-bold px-5 py-2 rounded-xl text-xs">
                Cargar Sentencia Estandarizada
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 3. SIMULATOR MODAL */}
      {activeModal === 'simulator' && (
        <Modal
          isOpen={activeModal === 'simulator'}
          onClose={() => setActiveModal(null)}
          title="Crear Nuevo Simulador Procesal"
          subtitle="Configure supuestos, opciones A-D, respuesta correcta y retroalimentación"
          badge="SIMULATOR BUILDER"
        >
          <form onSubmit={handleSaveSimulator} className="flex flex-col gap-4 text-xs sm:text-sm text-[#d6e3fe]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Código de Incidente:</label>
                <input
                  type="text"
                  required
                  value={simCode}
                  onChange={(e) => setSimCode(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Título del Caso:</label>
                <input
                  type="text"
                  required
                  value={simTitle}
                  onChange={(e) => setSimTitle(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Propósito / Categoría:</label>
                <select
                  value={simType}
                  onChange={(e) => setSimType(e.target.value as any)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                >
                  <option value="concurso">Concurso de Méritos</option>
                  <option value="idoneidad">Examen de Idoneidad Pericial</option>
                  <option value="rama">Evaluación por Rama del Derecho</option>
                  <option value="tactico">Práctica Táctica de Campo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Rama del Derecho:</label>
                <select
                  value={simRama}
                  onChange={(e) => setSimRama(e.target.value as any)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                >
                  <option value="Penal">Derecho Penal & Ciberdelitos</option>
                  <option value="Civil">Derecho Procesal Civil (CGP)</option>
                  <option value="Comercial">Comercio Electrónico</option>
                  <option value="Constitucional">Constitucional & Habeas Data</option>
                  <option value="Administrativo">Derecho Administrativo</option>
                  <option value="Laboral">Derecho Laboral & Probatorio</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Concurso / Convocatoria:</label>
                <input
                  type="text"
                  placeholder="Ej: Convocatoria Rama Judicial - Jueces"
                  value={simConcursoName}
                  onChange={(e) => setSimConcursoName(e.target.value)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-[#112136] rounded-xl border border-[#1d2d45]">
              <input
                type="checkbox"
                id="isIdoneidadCheck"
                checked={simIsIdoneidad}
                onChange={(e) => setSimIsIdoneidad(e.target.checked)}
                className="w-4 h-4 accent-[#4edea3]"
              />
              <label htmlFor="isIdoneidadCheck" className="text-xs font-bold text-[#d6e3fe] cursor-pointer">
                Incluir en la batería oficial del Examen de Idoneidad Pericial (Acreditación)
              </label>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Supuesto Fáctico / Pregunta del Caso:</label>
              <textarea
                required
                rows={3}
                value={simQuestion}
                onChange={(e) => setSimQuestion(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            {/* Options A, B, C, D */}
            <div className="p-4 bg-[#112136] rounded-xl border border-[#1d2d45] flex flex-col gap-3">
              <h4 className="font-bold text-[#4edea3] uppercase text-xs">Opciones de Respuesta:</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs text-[#d6e3fe]">Opción A:</span>
                  <input
                    type="text"
                    required
                    placeholder="Título Opción A"
                    value={optATitle}
                    onChange={(e) => setOptATitle(e.target.value)}
                    className="p-2 bg-[#132033] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Subtítulo / Explicación corta A"
                    value={optASubtitle}
                    onChange={(e) => setOptASubtitle(e.target.value)}
                    className="p-2 bg-[#132033] rounded-lg text-xs text-[#8f9fa0]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs text-[#d6e3fe]">Opción B:</span>
                  <input
                    type="text"
                    required
                    placeholder="Título Opción B"
                    value={optBTitle}
                    onChange={(e) => setOptBTitle(e.target.value)}
                    className="p-2 bg-[#132033] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Subtítulo / Explicación corta B"
                    value={optBSubtitle}
                    onChange={(e) => setOptBSubtitle(e.target.value)}
                    className="p-2 bg-[#132033] rounded-lg text-xs text-[#8f9fa0]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs text-[#d6e3fe]">Opción C:</span>
                  <input
                    type="text"
                    placeholder="Título Opción C"
                    value={optCTitle}
                    onChange={(e) => setOptCTitle(e.target.value)}
                    className="p-2 bg-[#132033] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Subtítulo C"
                    value={optCSubtitle}
                    onChange={(e) => setOptCSubtitle(e.target.value)}
                    className="p-2 bg-[#132033] rounded-lg text-xs text-[#8f9fa0]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs text-[#d6e3fe]">Opción D:</span>
                  <input
                    type="text"
                    placeholder="Título Opción D"
                    value={optDTitle}
                    onChange={(e) => setOptDTitle(e.target.value)}
                    className="p-2 bg-[#132033] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Subtítulo D"
                    value={optDSubtitle}
                    onChange={(e) => setOptDSubtitle(e.target.value)}
                    className="p-2 bg-[#132033] rounded-lg text-xs text-[#8f9fa0]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-xs text-[#4edea3]">Opción Correcta:</span>
                <select
                  value={correctOptionKey}
                  onChange={(e) => setCorrectOptionKey(e.target.value as any)}
                  className="p-2 bg-[#132033] rounded-lg text-xs font-bold text-[#4edea3]"
                >
                  <option value="A">Opción A</option>
                  <option value="B">Opción B</option>
                  <option value="C">Opción C</option>
                  <option value="D">Opción D</option>
                </select>
              </div>
            </div>

            {/* Retroalimentación */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Retroalimentación ISO/IEC 27037:</label>
              <textarea
                rows={2}
                value={expIso}
                onChange={(e) => setExpIso(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />

              <label className="font-bold text-[#4edea3] uppercase text-xs">Retroalimentación Legal (CSJ):</label>
              <textarea
                rows={2}
                value={expLegal}
                onChange={(e) => setExpLegal(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="pt-4 border-t border-[#1a2a40] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="bg-[#1d2a3e] text-[#d6e3fe] px-4 py-2 rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-[#10b981] text-[#003824] font-bold px-5 py-2 rounded-xl text-xs">
                Guardar Simulador
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 4. NORMA ITEM MODAL */}
      {activeModal === 'normaItem' && (
        <Modal
          isOpen={activeModal === 'normaItem'}
          onClose={() => setActiveModal(null)}
          title={editingNormaId ? 'Editar Elemento Normativo' : 'Crear Norma, Ley, Código o Decreto'}
          subtitle="Configure el código, categoría, subcategoría y detalles del elemento"
          badge="RINCÓN NORMATIVO"
        >
          <form onSubmit={handleSaveNormaItem} className="flex flex-col gap-4 text-xs sm:text-sm text-[#d6e3fe]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Categoría Asignada:</label>
                <select
                  value={normCategoryRef}
                  onChange={(e) => setNormCategoryRef(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                >
                  {normaCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#4edea3] uppercase text-xs">Subcategoría:</label>
                  <button
                    type="button"
                    onClick={() => {
                      setSubCatParentId(normCategoryRef);
                      setSubCatName('');
                      setActiveModal('normaSubcategory');
                    }}
                    className="text-[10.5px] text-[#4edea3] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">add_circle</span>
                    <span>+ Registrar Subcategoría</span>
                  </button>
                </div>
                {(() => {
                  const currentCategoryObj = normaCategories.find((c) => c.id === normCategoryRef);
                  const registeredSubs = currentCategoryObj?.subcategories || [];
                  const existingItemSubs = Array.from(
                    new Set(
                      normaItems
                        .filter((i) => i.categoryId === normCategoryRef && i.subcategory)
                        .map((i) => i.subcategory as string)
                    )
                  );
                  const availableSubcatList = Array.from(
                    new Set([
                      ...registeredSubs,
                      ...existingItemSubs,
                      ...(normSubcategory ? [normSubcategory] : []),
                    ])
                  ).filter(Boolean);

                  return (
                    <select
                      value={normSubcategory}
                      onChange={(e) => setNormSubcategory(e.target.value)}
                      className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a] focus:outline-none focus:border-[#4edea3] cursor-pointer"
                    >
                      <option value="" className="bg-[#0e1c2f] text-[#8f9fa0]">
                        -- Seleccionar Subcategoría --
                      </option>
                      {availableSubcatList.map((sub, idx) => (
                        <option key={idx} value={sub} className="bg-[#0e1c2f] text-[#d6e3fe]">
                          {sub}
                        </option>
                      ))}
                    </select>
                  );
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Código / Identificador:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: LEY 1273 DE 2009 o ARTÍCULO 269A (C.P.)"
                  value={normCode}
                  onChange={(e) => setNormCode(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Rama del Derecho:</label>
                <select
                  value={normBranchTag}
                  onChange={(e) => setNormBranchTag(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                >
                  <option value="Penal">Penal & Ciberdelitos</option>
                  <option value="Civil">Procesal Civil (CGP)</option>
                  <option value="Comercial">Comercio Electrónico</option>
                  <option value="Constitucional">Constitucional & Habeas Data</option>
                  <option value="Administrativo">Administrativo & Estado</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Título Normativo:</label>
              <input
                type="text"
                required
                placeholder="Ej: Acceso abusivo a un sistema informático"
                value={normTitle}
                onChange={(e) => setNormTitle(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Extracto / Resumen Corto:</label>
              <textarea
                rows={2}
                placeholder="Resumen o encabezado del artículo..."
                value={normExcerpt}
                onChange={(e) => setNormExcerpt(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Texto Legal Completo:</label>
              <textarea
                required
                rows={4}
                placeholder="Transcripción íntegra de la norma o ley..."
                value={normFullText}
                onChange={(e) => setNormFullText(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Requisito Validez Probatoria:</label>
                <input
                  type="text"
                  placeholder="Ej: Verificación de logs de autenticación..."
                  value={normRequisito}
                  onChange={(e) => setNormRequisito(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Jurisprudencia Aplicable:</label>
                <input
                  type="text"
                  placeholder="Ej: Sentencia CSJ SP-1823-2021"
                  value={normJurisprudencia}
                  onChange={(e) => setNormJurisprudencia(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">link</span>
                <span>Enlace Oficial de Consulta (URL):</span>
              </label>
              <input
                type="url"
                required
                placeholder="Ej: https://www.secretariasenado.gov.co/... o https://www.suin-juriscol.gov.co/"
                value={normUrl}
                onChange={(e) => setNormUrl(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="pt-4 border-t border-[#1a2a40] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="bg-[#1d2a3e] text-[#d6e3fe] px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-[#10b981] text-[#003824] font-bold px-5 py-2 rounded-xl text-xs cursor-pointer">
                {editingNormaId ? 'Guardar Cambios' : 'Crear Elemento'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 5. NORMA CATEGORY MODAL */}
      {activeModal === 'normaCategory' && (
        <Modal
          isOpen={activeModal === 'normaCategory'}
          onClose={() => setActiveModal(null)}
          title={editingCatId ? 'Editar Categoría Normativa' : 'Crear Nueva Categoría Normativa'}
          subtitle="Configure la categoría, icono, insignia y subcategorías"
          badge="CATEGORÍA NORMATIVA"
        >
          <form onSubmit={handleSaveNormaCategory} className="flex flex-col gap-4 text-xs sm:text-sm text-[#d6e3fe]">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Título de la Categoría:</label>
              <input
                type="text"
                required
                placeholder="Ej: Constitución Política de Colombia"
                value={catTitle}
                onChange={(e) => setCatTitle(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Descripción:</label>
              <textarea
                required
                rows={2}
                placeholder="Descripción corta de lo que abarca esta categoría..."
                value={catDescription}
                onChange={(e) => setCatDescription(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Material Symbol Icon:</label>
                <input
                  type="text"
                  placeholder="Ej: account_balance, menu_book, gavel, balance"
                  value={catIcon}
                  onChange={(e) => setCatIcon(e.target.value)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Insignia / Badge:</label>
                <input
                  type="text"
                  placeholder="Ej: NORMA DE NORMAS, SISTEMA JUDICIAL"
                  value={catBadge}
                  onChange={(e) => setCatBadge(e.target.value)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Subcategorías (separadas por comas):</label>
              <input
                type="text"
                placeholder="Ej: Derechos Fundamentales, Debido Proceso, Investigación Penal"
                value={catSubcategoriesInput}
                onChange={(e) => setCatSubcategoriesInput(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
              <span className="text-[11px] text-[#8f9fa0] font-mono">
                Escriba las subcategorías separadas por comas para que aparezcan como botones de filtro.
              </span>
            </div>

            <div className="pt-4 border-t border-[#1a2a40] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="bg-[#1d2a3e] text-[#d6e3fe] px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-[#10b981] text-[#003824] font-bold px-5 py-2 rounded-xl text-xs cursor-pointer">
                {editingCatId ? 'Guardar Cambios' : 'Crear Categoría'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 6. ACADEMIC RESOURCE MODAL */}
      {activeModal === 'academic' && (
        <Modal
          isOpen={activeModal === 'academic'}
          onClose={() => setActiveModal(null)}
          title="Crear Recurso Académico (Aula Abierta)"
          subtitle="Cargue presentaciones, proyectos o guías para estudiantes y docentes"
          badge="AULA ABIERTA"
        >
          <form onSubmit={handleSaveAcademicResource} className="flex flex-col gap-4 text-xs sm:text-sm text-[#d6e3fe]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Título del Recurso:</label>
                <input
                  type="text"
                  required
                  value={acadTitle}
                  onChange={(e) => setAcadTitle(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Asignatura / Materia:</label>
                <input
                  type="text"
                  required
                  value={acadSubject}
                  onChange={(e) => setAcadSubject(e.target.value)}
                  className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Descripción Detallada:</label>
              <textarea
                required
                rows={2}
                value={acadDescription}
                onChange={(e) => setAcadDescription(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Categoría:</label>
                <select
                  value={acadCategory}
                  onChange={(e) => setAcadCategory(e.target.value as any)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                >
                  <option value="diapositivas">Diapositivas y Presentaciones</option>
                  <option value="proyectos">Proyectos e Investigación</option>
                  <option value="evaluaciones">Sílabos y Evaluaciones</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Año Lectivo:</label>
                <select
                  value={acadYear}
                  onChange={(e) => setAcadYear(e.target.value as any)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#4edea3] uppercase text-xs">Badge Temático:</label>
                <input
                  type="text"
                  value={acadBadge}
                  onChange={(e) => setAcadBadge(e.target.value)}
                  className="p-2 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1a2a40] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="bg-[#1d2a3e] text-[#d6e3fe] px-4 py-2 rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-[#10b981] text-[#003824] font-bold px-5 py-2 rounded-xl text-xs">
                Cargar Recurso
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 7. NORMA SUBCATEGORY MODAL */}
      {activeModal === 'normaSubcategory' && (
        <Modal
          isOpen={activeModal === 'normaSubcategory'}
          onClose={() => setActiveModal(null)}
          title="Registrar Nueva Subcategoría"
          subtitle="Añada un nombre de subcategoría independientemente a una categoría normativa"
          badge="REGISTRO DE SUBCATEGORÍA"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (subCatParentId && subCatName.trim()) {
                addSubcategoryToCategory(subCatParentId, subCatName.trim());
                if (normCategoryRef === subCatParentId) {
                  setNormSubcategory(subCatName.trim());
                }
                setActiveModal(editingNormaId !== null ? 'normaItem' : null);
                setSubCatName('');
              }
            }}
            className="flex flex-col gap-4 text-xs sm:text-sm text-[#d6e3fe]"
          >
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Categoría Padre:</label>
              <select
                value={subCatParentId}
                onChange={(e) => setSubCatParentId(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a] cursor-pointer"
              >
                {normaCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#4edea3] uppercase text-xs">Nombre de la Subcategoría:</label>
              <input
                type="text"
                required
                placeholder="Ej: Ciberdelitos, Derechos Fundamentales, Procedimiento Penal..."
                value={subCatName}
                onChange={(e) => setSubCatName(e.target.value)}
                className="p-2.5 bg-[#132033] rounded-xl text-xs text-[#d6e3fe] border border-[#28354a]"
              />
            </div>

            <div className="pt-4 border-t border-[#1a2a40] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="bg-[#1d2a3e] text-[#d6e3fe] px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-[#10b981] text-[#003824] font-bold px-5 py-2 rounded-xl text-xs cursor-pointer">
                Registrar Subcategoría
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
