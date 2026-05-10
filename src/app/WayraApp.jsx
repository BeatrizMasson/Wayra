"use client";
import { useState } from "react";

const C = {
  bg: "#FAFAF8", surface: "#FFFFFF", border: "#E8E4DC",
  text: "#1A1A18", muted: "#6B6B65",
  yellow: "#E07B39", red: "#C0392B", green: "#2D6A4F",
};

// ── All UI strings per language ──
const T = {
  pt: {
    appTagline: "seu guia de viagem inteligente",
    langScreen: "Em qual idioma prefere usar o Wayra?",
    step: "Etapa", of: "de",
    s1Title: "Para onde vamos?", s1Sub: "Digite o destino e suas datas.",
    destLabel: "Destino", destPlaceholder: "Ex: Cidade do Panamá, Toscana, Japão...",
    originLabel: "De onde você parte?", originPlaceholder: "Ex: São Paulo",
    dateIn: "Ida", dateOut: "Volta",
    s2Title: "Quem vai viajar?", s2Sub: "Isso personaliza todo o roteiro.",
    whoLabel: "Com quem você vai?",
    who: ["Sozinho(a)","Casal","Lua de mel","Família com crianças","Grupo de amigos"],
    budgetLabel: "Orçamento (excl. passagem)",
    budget: ["Econômico — hostels e transporte público","Moderado — hotéis 3★","Confortável — hotéis 4★","Luxo — 5★, sem restrições"],
    s3Title: "Qual é o seu estilo?", s3Sub: "Escolha até 3 experiências.",
    interestsLabel: "O que você quer viver? (máx. 3)",
    interests: ["Gastronomia e restaurantes","Cultura, museus e história","Natureza e ecoturismo","Vida noturna","Compras","Relaxamento e spa","Fotografia e Instagram","Aventura e esportes"],
    paceLabel: "Qual o seu ritmo?",
    pace: ["Intenso — aproveitar cada hora","Equilibrado — manhã ativa, tarde livre","Relaxado — menos é mais"],
    s4Title: "Detalhes práticos", s4Sub: "Quase lá!",
    transportLabel: "Como prefere se locomover?",
    transport: ["A pé sempre que possível","Transporte público","Carro alugado","Táxi / Uber","Mix conforme necessidade"],
    dietLabel: "Restrição alimentar (opcional)", dietPlaceholder: "Ex: vegetariano, sem glúten...",
    s5Title: "Configurar carro alugado 🚗", s5Sub: "Personalize para evitar surpresas.",
    carTypeLabel: "Tipo de veículo",
    carType: ["Econômico (hatch compacto)","SUV (terrenos variados)","4x4 (estradas de terra e trilhas)","Van / Minivan (grupos e famílias)","Sedan de luxo"],
    carGearLabel: "Câmbio",
    carGear: ["Automático","Manual","Sem preferência"],
    carExtrasLabel: "Itens extras (múltipla escolha)",
    carExtras: ["GPS","Cadeirinha infantil","Rack de bagagem","Seguro total"],
    carNote: "O briefing incluirá: CNH vs. carteira internacional, regras de trânsito, estacionamento e apps úteis para",
    cont: "Continuar →", back: "← Voltar", generate: "✨ Gerar meu roteiro", generating: "Gerando...",
    loadMsg1: "✈️  Criando roteiro — parte 1...", loadMsg2: "✈️  Criando roteiro — parte 2...", loadMsg3: "🛡  Preparando briefing...",
    heroLabel: "✈ seu roteiro wayra",
    tipsTitle: "💡 Dicas essenciais",
    daysTitle: "Roteiro dia a dia",
    morning: "☀️ Manhã", afternoon: "🌤 Tarde", evening: "🌙 Noite",
    restaurant: "🍽 Restaurante do dia",
    briefingTitle: "Sem Surpresas", briefingSub: "Tudo que você precisa saber antes de embarcar.",
    briefingLabel: "🛡 briefing do destino",
    statusOk: "✓ Ok", statusWarn: "⚠ Atenção", statusReq: "! Obrigatório",
    tabItinerary: "Roteiro", tabBriefing: "Briefing", tabNew: "Novo",
    systemItinerary: "Você é curador de viagens de classe mundial. Responda APENAS com JSON válido. Sem markdown, sem texto antes ou depois.",
    systemBriefing: "Você é especialista em segurança de viagens. Responda APENAS com JSON válido. Sem markdown, sem texto extra.",
    promptLang: "pt-BR",
  },
  en: {
    appTagline: "your intelligent travel guide",
    langScreen: "Which language would you like to use?",
    step: "Step", of: "of",
    s1Title: "Where are we going?", s1Sub: "Enter your destination and dates.",
    destLabel: "Destination", destPlaceholder: "E.g.: Panama City, Tuscany, Japan...",
    originLabel: "Where are you departing from?", originPlaceholder: "E.g.: New York",
    dateIn: "Departure", dateOut: "Return",
    s2Title: "Who's traveling?", s2Sub: "This personalizes your entire itinerary.",
    whoLabel: "Who are you traveling with?",
    who: ["Solo","Couple","Honeymoon","Family with kids","Group of friends"],
    budgetLabel: "Budget (excl. flights)",
    budget: ["Budget — hostels & public transit","Moderate — 3★ hotels","Comfortable — 4★ hotels","Luxury — 5★, no limits"],
    s3Title: "What's your style?", s3Sub: "Choose up to 3 experiences.",
    interestsLabel: "What do you want to experience? (max. 3)",
    interests: ["Gastronomy & restaurants","Culture, museums & history","Nature & ecotourism","Nightlife","Shopping","Relaxation & spa","Photography & Instagram","Adventure & sports"],
    paceLabel: "What's your travel pace?",
    pace: ["Intense — make the most of every hour","Balanced — active mornings, relaxed afternoons","Slow — less is more"],
    s4Title: "Practical details", s4Sub: "Almost there!",
    transportLabel: "How do you prefer to get around?",
    transport: ["On foot whenever possible","Public transit","Rental car","Taxi / Uber","Mix as needed"],
    dietLabel: "Dietary restrictions (optional)", dietPlaceholder: "E.g.: vegetarian, gluten-free...",
    s5Title: "Configure rental car 🚗", s5Sub: "Customize to avoid surprises.",
    carTypeLabel: "Vehicle type",
    carType: ["Economy (compact hatchback)","SUV (varied terrain)","4x4 (dirt roads & trails)","Van / Minivan (groups & families)","Luxury sedan"],
    carGearLabel: "Transmission",
    carGear: ["Automatic","Manual","No preference"],
    carExtrasLabel: "Extras (multiple choice)",
    carExtras: ["GPS","Child seat","Roof rack","Full insurance"],
    carNote: "The briefing will include: local driver's license rules, traffic regulations, parking, and useful apps for",
    cont: "Continue →", back: "← Back", generate: "✨ Generate my itinerary", generating: "Generating...",
    loadMsg1: "✈️  Building itinerary — part 1...", loadMsg2: "✈️  Building itinerary — part 2...", loadMsg3: "🛡  Preparing safety briefing...",
    heroLabel: "✈ your wayra itinerary",
    tipsTitle: "💡 Essential tips",
    daysTitle: "Day by day itinerary",
    morning: "☀️ Morning", afternoon: "🌤 Afternoon", evening: "🌙 Evening",
    restaurant: "🍽 Restaurant of the day",
    briefingTitle: "No Surprises", briefingSub: "Everything you need to know before you fly.",
    briefingLabel: "🛡 destination briefing",
    statusOk: "✓ Ok", statusWarn: "⚠ Attention", statusReq: "! Required",
    tabItinerary: "Itinerary", tabBriefing: "Briefing", tabNew: "New",
    systemItinerary: "You are a world-class travel curator. Respond ONLY with valid JSON. No markdown, no text before or after.",
    systemBriefing: "You are a travel safety expert. Respond ONLY with valid JSON. No markdown, no extra text.",
    promptLang: "en-US",
  },
  es: {
    appTagline: "tu guía de viaje inteligente",
    langScreen: "¿En qué idioma prefiere usar Wayra?",
    step: "Paso", of: "de",
    s1Title: "¿A dónde vamos?", s1Sub: "Ingresa tu destino y fechas.",
    destLabel: "Destino", destPlaceholder: "Ej: Ciudad de Panamá, Toscana, Japón...",
    originLabel: "¿Desde dónde partes?", originPlaceholder: "Ej: Buenos Aires",
    dateIn: "Ida", dateOut: "Vuelta",
    s2Title: "¿Quién viaja?", s2Sub: "Esto personaliza todo el itinerario.",
    whoLabel: "¿Con quién viajas?",
    who: ["Solo/a","Pareja","Luna de miel","Familia con niños","Grupo de amigos"],
    budgetLabel: "Presupuesto (excl. vuelos)",
    budget: ["Económico — hostels y transporte público","Moderado — hoteles 3★","Confortable — hoteles 4★","Lujo — 5★, sin restricciones"],
    s3Title: "¿Cuál es tu estilo?", s3Sub: "Elige hasta 3 experiencias.",
    interestsLabel: "¿Qué quieres vivir? (máx. 3)",
    interests: ["Gastronomía y restaurantes","Cultura, museos e historia","Naturaleza y ecoturismo","Vida nocturna","Compras","Relax y spa","Fotografía e Instagram","Aventura y deportes"],
    paceLabel: "¿Cuál es tu ritmo?",
    pace: ["Intenso — aprovechar cada hora","Equilibrado — mañana activa, tarde libre","Relajado — menos es más"],
    s4Title: "Detalles prácticos", s4Sub: "¡Casi listo!",
    transportLabel: "¿Cómo prefieres moverte?",
    transport: ["A pie siempre que sea posible","Transporte público","Auto de alquiler","Taxi / Uber","Mix según necesidad"],
    dietLabel: "Restricción alimentaria (opcional)", dietPlaceholder: "Ej: vegetariano, sin gluten...",
    s5Title: "Configurar auto de alquiler 🚗", s5Sub: "Personaliza para evitar sorpresas.",
    carTypeLabel: "Tipo de vehículo",
    carType: ["Económico (compacto)","SUV (terrenos variados)","4x4 (caminos de tierra)","Van / Minivan (grupos y familias)","Sedán de lujo"],
    carGearLabel: "Transmisión",
    carGear: ["Automático","Manual","Sin preferencia"],
    carExtrasLabel: "Extras (selección múltiple)",
    carExtras: ["GPS","Silla infantil","Rack de equipaje","Seguro total"],
    carNote: "El briefing incluirá: licencia de conducir, reglas de tránsito, estacionamiento y apps útiles para",
    cont: "Continuar →", back: "← Volver", generate: "✨ Generar mi itinerario", generating: "Generando...",
    loadMsg1: "✈️  Creando itinerario — parte 1...", loadMsg2: "✈️  Creando itinerario — parte 2...", loadMsg3: "🛡  Preparando briefing...",
    heroLabel: "✈ tu itinerario wayra",
    tipsTitle: "💡 Consejos esenciales",
    daysTitle: "Itinerario día a día",
    morning: "☀️ Mañana", afternoon: "🌤 Tarde", evening: "🌙 Noche",
    restaurant: "🍽 Restaurante del día",
    briefingTitle: "Sin Sorpresas", briefingSub: "Todo lo que necesitas saber antes de embarcar.",
    briefingLabel: "🛡 briefing del destino",
    statusOk: "✓ Ok", statusWarn: "⚠ Atención", statusReq: "! Obligatorio",
    tabItinerary: "Itinerario", tabBriefing: "Briefing", tabNew: "Nuevo",
    systemItinerary: "Eres un curador de viajes de clase mundial. Responde SOLO con JSON válido. Sin markdown, sin texto antes ni después.",
    systemBriefing: "Eres experto en seguridad de viajes. Responde SOLO con JSON válido. Sin markdown, sin texto extra.",
    promptLang: "es",
  },
  zh: {
    appTagline: "您的智能旅行指南",
    langScreen: "您希望使用哪种语言？",
    step: "步骤", of: "/",
    s1Title: "我们去哪里？", s1Sub: "请输入目的地和日期。",
    destLabel: "目的地", destPlaceholder: "例如：巴拿马城、托斯卡纳、日本...",
    originLabel: "出发地", originPlaceholder: "例如：上海",
    dateIn: "出发", dateOut: "返回",
    s2Title: "谁在旅行？", s2Sub: "这将个性化您的整个行程。",
    whoLabel: "您和谁一起旅行？",
    who: ["独自旅行","情侣","蜜月","带孩子的家庭","朋友团"],
    budgetLabel: "预算（不含机票）",
    budget: ["经济型 — 青旅和公共交通","中等 — 三星级酒店","舒适 — 四星级酒店","豪华 — 五星级，无限制"],
    s3Title: "您的旅行风格？", s3Sub: "最多选择3种体验。",
    interestsLabel: "您想体验什么？（最多3项）",
    interests: ["美食与餐厅","文化、博物馆与历史","自然与生态旅游","夜生活","购物","休闲与水疗","摄影与Instagram","冒险与运动"],
    paceLabel: "您的旅行节奏？",
    pace: ["紧凑 — 充分利用每一小时","均衡 — 上午活跃，下午悠闲","悠闲 — 少即是多"],
    s4Title: "实用细节", s4Sub: "快完成了！",
    transportLabel: "您偏好的出行方式？",
    transport: ["尽可能步行","公共交通","租车","出租车 / 网约车","按需混合"],
    dietLabel: "饮食限制（可选）", dietPlaceholder: "例如：素食、无麸质...",
    s5Title: "配置租车 🚗", s5Sub: "个性化设置以避免意外。",
    carTypeLabel: "车辆类型",
    carType: ["经济型（紧凑型掀背车）","SUV（各种地形）","4x4（土路和小径）","面包车 / 厢式旅行车","豪华轿车"],
    carGearLabel: "变速箱",
    carGear: ["自动挡","手动挡","无偏好"],
    carExtrasLabel: "额外配件（多选）",
    carExtras: ["GPS","儿童座椅","行李架","全险"],
    carNote: "简报将包含：驾照要求、交通规则、停车和实用App信息，目的地：",
    cont: "继续 →", back: "← 返回", generate: "✨ 生成我的行程", generating: "生成中...",
    loadMsg1: "✈️  创建行程 — 第1部分...", loadMsg2: "✈️  创建行程 — 第2部分...", loadMsg3: "🛡  准备安全简报...",
    heroLabel: "✈ 您的 wayra 行程",
    tipsTitle: "💡 必备贴士",
    daysTitle: "逐日行程",
    morning: "☀️ 上午", afternoon: "🌤 下午", evening: "🌙 晚上",
    restaurant: "🍽 今日餐厅",
    briefingTitle: "无惊喜", briefingSub: "出发前您需要了解的一切。",
    briefingLabel: "🛡 目的地简报",
    statusOk: "✓ 正常", statusWarn: "⚠ 注意", statusReq: "! 必须",
    tabItinerary: "行程", tabBriefing: "简报", tabNew: "新建",
    systemItinerary: "您是世界级旅行策划师。仅用有效JSON回复。不要markdown，不要多余文字。",
    systemBriefing: "您是旅行安全专家。仅用有效JSON回复。不要markdown，不要多余文字。",
    promptLang: "zh-CN",
  },
  fr: {
    appTagline: "votre guide de voyage intelligent",
    langScreen: "Dans quelle langue souhaitez-vous utiliser Wayra ?",
    step: "Étape", of: "sur",
    s1Title: "Où allons-nous ?", s1Sub: "Entrez votre destination et vos dates.",
    destLabel: "Destination", destPlaceholder: "Ex : Panama City, Toscane, Japon...",
    originLabel: "D'où partez-vous ?", originPlaceholder: "Ex : Paris",
    dateIn: "Aller", dateOut: "Retour",
    s2Title: "Qui voyage ?", s2Sub: "Cela personnalise tout votre itinéraire.",
    whoLabel: "Avec qui voyagez-vous ?",
    who: ["Seul(e)","En couple","Lune de miel","Famille avec enfants","Groupe d'amis"],
    budgetLabel: "Budget (hors vols)",
    budget: ["Économique — auberges et transports en commun","Modéré — hôtels 3★","Confortable — hôtels 4★","Luxe — 5★, sans limites"],
    s3Title: "Quel est votre style ?", s3Sub: "Choisissez jusqu'à 3 expériences.",
    interestsLabel: "Que voulez-vous vivre ? (max. 3)",
    interests: ["Gastronomie et restaurants","Culture, musées et histoire","Nature et écotourisme","Vie nocturne","Shopping","Détente et spa","Photographie et Instagram","Aventure et sports"],
    paceLabel: "Quel est votre rythme ?",
    pace: ["Intense — profiter de chaque heure","Équilibré — matins actifs, après-midis libres","Détendu — moins c'est plus"],
    s4Title: "Détails pratiques", s4Sub: "Presque terminé !",
    transportLabel: "Comment préférez-vous vous déplacer ?",
    transport: ["À pied autant que possible","Transports en commun","Voiture de location","Taxi / Uber","Mix selon les besoins"],
    dietLabel: "Restrictions alimentaires (optionnel)", dietPlaceholder: "Ex : végétarien, sans gluten...",
    s5Title: "Configurer la voiture de location 🚗", s5Sub: "Personnalisez pour éviter les surprises.",
    carTypeLabel: "Type de véhicule",
    carType: ["Économique (citadine compacte)","SUV (terrains variés)","4x4 (routes non goudronnées)","Van / Monospace (groupes et familles)","Berline de luxe"],
    carGearLabel: "Boîte de vitesses",
    carGear: ["Automatique","Manuelle","Sans préférence"],
    carExtrasLabel: "Extras (choix multiples)",
    carExtras: ["GPS","Siège enfant","Galerie de toit","Assurance tous risques"],
    carNote: "Le briefing inclura : permis de conduire, règles de circulation, stationnement et apps utiles pour",
    cont: "Continuer →", back: "← Retour", generate: "✨ Générer mon itinéraire", generating: "Génération...",
    loadMsg1: "✈️  Création de l'itinéraire — partie 1...", loadMsg2: "✈️  Création — partie 2...", loadMsg3: "🛡  Préparation du briefing...",
    heroLabel: "✈ votre itinéraire wayra",
    tipsTitle: "💡 Conseils essentiels",
    daysTitle: "Itinéraire jour par jour",
    morning: "☀️ Matin", afternoon: "🌤 Après-midi", evening: "🌙 Soir",
    restaurant: "🍽 Restaurant du jour",
    briefingTitle: "Sans Surprises", briefingSub: "Tout ce que vous devez savoir avant d'embarquer.",
    briefingLabel: "🛡 briefing de destination",
    statusOk: "✓ Ok", statusWarn: "⚠ Attention", statusReq: "! Obligatoire",
    tabItinerary: "Itinéraire", tabBriefing: "Briefing", tabNew: "Nouveau",
    systemItinerary: "Vous êtes un curateur de voyages de classe mondiale. Répondez UNIQUEMENT avec du JSON valide. Pas de markdown, pas de texte avant ou après.",
    systemBriefing: "Vous êtes expert en sécurité de voyage. Répondez UNIQUEMENT avec du JSON valide. Pas de markdown.",
    promptLang: "fr-FR",
  },
  de: {
    appTagline: "Ihr intelligenter Reiseführer",
    langScreen: "In welcher Sprache möchten Sie Wayra nutzen?",
    step: "Schritt", of: "von",
    s1Title: "Wohin geht die Reise?", s1Sub: "Geben Sie Ihr Reiseziel und Ihre Daten ein.",
    destLabel: "Reiseziel", destPlaceholder: "z.B.: Panama-Stadt, Toskana, Japan...",
    originLabel: "Von wo reisen Sie ab?", originPlaceholder: "z.B.: Berlin",
    dateIn: "Hinflug", dateOut: "Rückflug",
    s2Title: "Wer reist mit?", s2Sub: "Das personalisiert Ihre gesamte Reiseroute.",
    whoLabel: "Mit wem reisen Sie?",
    who: ["Alleine","Pärchen","Hochzeitsreise","Familie mit Kindern","Freundesgruppe"],
    budgetLabel: "Budget (ohne Flüge)",
    budget: ["Günstig — Hostels und öffentliche Verkehrsmittel","Mittel — 3★ Hotels","Komfortabel — 4★ Hotels","Luxus — 5★, keine Grenzen"],
    s3Title: "Was ist Ihr Reisestil?", s3Sub: "Wählen Sie bis zu 3 Erlebnisse.",
    interestsLabel: "Was möchten Sie erleben? (max. 3)",
    interests: ["Gastronomie und Restaurants","Kultur, Museen und Geschichte","Natur und Ökotourismus","Nachtleben","Shopping","Entspannung und Spa","Fotografie und Instagram","Abenteuer und Sport"],
    paceLabel: "Welches Tempo bevorzugen Sie?",
    pace: ["Intensiv — jede Stunde genießen","Ausgewogen — aktive Morgen, freie Nachmittage","Entspannt — weniger ist mehr"],
    s4Title: "Praktische Details", s4Sub: "Fast geschafft!",
    transportLabel: "Wie möchten Sie sich fortbewegen?",
    transport: ["Zu Fuß wann immer möglich","Öffentliche Verkehrsmittel","Mietwagen","Taxi / Uber","Mix je nach Bedarf"],
    dietLabel: "Ernährungseinschränkungen (optional)", dietPlaceholder: "z.B.: vegetarisch, glutenfrei...",
    s5Title: "Mietwagen konfigurieren 🚗", s5Sub: "Personalisieren Sie, um Überraschungen zu vermeiden.",
    carTypeLabel: "Fahrzeugtyp",
    carType: ["Economy (kompakter Kleinwagen)","SUV (verschiedene Gelände)","4x4 (Schotterpisten und Trails)","Van / Minivan (Gruppen und Familien)","Luxuslimousine"],
    carGearLabel: "Getriebe",
    carGear: ["Automatik","Manuell","Keine Präferenz"],
    carExtrasLabel: "Extras (Mehrfachauswahl)",
    carExtras: ["GPS","Kindersitz","Dachträger","Vollkaskoversicherung"],
    carNote: "Das Briefing enthält: Führerscheinregeln, Verkehrsregeln, Parken und nützliche Apps für",
    cont: "Weiter →", back: "← Zurück", generate: "✨ Reiseroute erstellen", generating: "Erstelle...",
    loadMsg1: "✈️  Erstelle Reiseroute — Teil 1...", loadMsg2: "✈️  Erstelle — Teil 2...", loadMsg3: "🛡  Bereite Sicherheitsbriefing vor...",
    heroLabel: "✈ Ihre wayra-Reiseroute",
    tipsTitle: "💡 Wichtige Tipps",
    daysTitle: "Tagesplan",
    morning: "☀️ Morgen", afternoon: "🌤 Nachmittag", evening: "🌙 Abend",
    restaurant: "🍽 Restaurant des Tages",
    briefingTitle: "Keine Überraschungen", briefingSub: "Alles, was Sie vor dem Abflug wissen müssen.",
    briefingLabel: "🛡 Ziel-Briefing",
    statusOk: "✓ Ok", statusWarn: "⚠ Achtung", statusReq: "! Pflicht",
    tabItinerary: "Reiseroute", tabBriefing: "Briefing", tabNew: "Neu",
    systemItinerary: "Sie sind ein weltklasse Reisekurator. Antworten Sie NUR mit gültigem JSON. Kein Markdown, kein Text davor oder danach.",
    systemBriefing: "Sie sind Reisesicherheitsexperte. Antworten Sie NUR mit gültigem JSON. Kein Markdown.",
    promptLang: "de-DE",
  },
  it: {
    appTagline: "la tua guida di viaggio intelligente",
    langScreen: "In quale lingua preferisce usare Wayra?",
    step: "Passo", of: "di",
    s1Title: "Dove andiamo?", s1Sub: "Inserisci la destinazione e le date.",
    destLabel: "Destinazione", destPlaceholder: "Es: Città di Panama, Toscana, Giappone...",
    originLabel: "Da dove parti?", originPlaceholder: "Es: Roma",
    dateIn: "Andata", dateOut: "Ritorno",
    s2Title: "Chi viaggia?", s2Sub: "Questo personalizzerà tutto il tuo itinerario.",
    whoLabel: "Con chi viaggi?",
    who: ["Da solo/a","Coppia","Luna di miele","Famiglia con bambini","Gruppo di amici"],
    budgetLabel: "Budget (esclusi i voli)",
    budget: ["Economico — ostelli e trasporti pubblici","Moderato — hotel 3★","Confortevole — hotel 4★","Lusso — 5★, nessun limite"],
    s3Title: "Qual è il tuo stile?", s3Sub: "Scegli fino a 3 esperienze.",
    interestsLabel: "Cosa vuoi vivere? (max. 3)",
    interests: ["Gastronomia e ristoranti","Cultura, musei e storia","Natura ed ecoturismo","Vita notturna","Shopping","Relax e spa","Fotografia e Instagram","Avventura e sport"],
    paceLabel: "Qual è il tuo ritmo?",
    pace: ["Intenso — sfruttare ogni ora","Equilibrato — mattine attive, pomeriggi liberi","Rilassato — meno è meglio"],
    s4Title: "Dettagli pratici", s4Sub: "Quasi fatto!",
    transportLabel: "Come preferisci spostarti?",
    transport: ["A piedi quando possibile","Trasporto pubblico","Auto a noleggio","Taxi / Uber","Mix secondo necessità"],
    dietLabel: "Restrizioni alimentari (opzionale)", dietPlaceholder: "Es: vegetariano, senza glutine...",
    s5Title: "Configura auto a noleggio 🚗", s5Sub: "Personalizza per evitare sorprese.",
    carTypeLabel: "Tipo di veicolo",
    carType: ["Economica (utilitaria compatta)","SUV (terreni vari)","4x4 (strade sterrate)","Van / Monovolume (gruppi e famiglie)","Berlina di lusso"],
    carGearLabel: "Cambio",
    carGear: ["Automatico","Manuale","Nessuna preferenza"],
    carExtrasLabel: "Extra (scelta multipla)",
    carExtras: ["GPS","Seggiolino per bambini","Portapacchi","Assicurazione completa"],
    carNote: "Il briefing includerà: patente di guida, regole del traffico, parcheggio e app utili per",
    cont: "Continua →", back: "← Indietro", generate: "✨ Genera il mio itinerario", generating: "Generando...",
    loadMsg1: "✈️  Creando itinerario — parte 1...", loadMsg2: "✈️  Creando — parte 2...", loadMsg3: "🛡  Preparando briefing...",
    heroLabel: "✈ il tuo itinerario wayra",
    tipsTitle: "💡 Consigli essenziali",
    daysTitle: "Itinerario giorno per giorno",
    morning: "☀️ Mattina", afternoon: "🌤 Pomeriggio", evening: "🌙 Sera",
    restaurant: "🍽 Ristorante del giorno",
    briefingTitle: "Nessuna Sorpresa", briefingSub: "Tutto ciò che devi sapere prima di partire.",
    briefingLabel: "🛡 briefing destinazione",
    statusOk: "✓ Ok", statusWarn: "⚠ Attenzione", statusReq: "! Obbligatorio",
    tabItinerary: "Itinerario", tabBriefing: "Briefing", tabNew: "Nuovo",
    systemItinerary: "Sei un curatore di viaggi di classe mondiale. Rispondi SOLO con JSON valido. Nessun markdown, nessun testo prima o dopo.",
    systemBriefing: "Sei un esperto di sicurezza nei viaggi. Rispondi SOLO con JSON valido. Nessun markdown.",
    promptLang: "it-IT",
  },
  ar: {
    appTagline: "دليل سفرك الذكي",
    langScreen: "بأي لغة تفضل استخدام Wayra؟",
    step: "خطوة", of: "من",
    s1Title: "إلى أين نذهب؟", s1Sub: "أدخل وجهتك وتواريخك.",
    destLabel: "الوجهة", destPlaceholder: "مثال: مدينة بنما، توسكانا، اليابان...",
    originLabel: "من أين تغادر؟", originPlaceholder: "مثال: دبي",
    dateIn: "الذهاب", dateOut: "العودة",
    s2Title: "من يسافر؟", s2Sub: "هذا يخصص رحلتك بالكامل.",
    whoLabel: "مع من تسافر؟",
    who: ["بمفردي","زوجين","شهر العسل","عائلة مع أطفال","مجموعة أصدقاء"],
    budgetLabel: "الميزانية (باستثناء الرحلات)",
    budget: ["اقتصادي — نزل وسكن مشترك","معتدل — فنادق 3 نجوم","مريح — فنادق 4 نجوم","فاخر — 5 نجوم، بلا قيود"],
    s3Title: "ما هو أسلوبك؟", s3Sub: "اختر حتى 3 تجارب.",
    interestsLabel: "ماذا تريد أن تعيش؟ (حد أقصى 3)",
    interests: ["المطبخ والمطاعم","الثقافة والمتاحف والتاريخ","الطبيعة والسياحة البيئية","الحياة الليلية","التسوق","الاسترخاء والسبا","التصوير وإنستغرام","المغامرة والرياضة"],
    paceLabel: "ما هو إيقاعك؟",
    pace: ["مكثف — الاستفادة من كل ساعة","متوازن — صباح نشيط، بعد ظهر حر","هادئ — القليل أفضل"],
    s4Title: "التفاصيل العملية", s4Sub: "لقد اقتربنا!",
    transportLabel: "كيف تفضل التنقل؟",
    transport: ["سيرًا على الأقدام كلما أمكن","وسائل النقل العام","سيارة مستأجرة","تاكسي / أوبر","مزيج حسب الحاجة"],
    dietLabel: "قيود غذائية (اختياري)", dietPlaceholder: "مثال: نباتي، خالٍ من الغلوتين...",
    s5Title: "تهيئة السيارة المستأجرة 🚗", s5Sub: "خصص لتجنب المفاجآت.",
    carTypeLabel: "نوع المركبة",
    carType: ["اقتصادية (هاتشباك مدمج)","SUV (تضاريس متنوعة)","4x4 (طرق ترابية)","فان / ميني فان (مجموعات وعائلات)","سيدان فاخرة"],
    carGearLabel: "ناقل الحركة",
    carGear: ["أوتوماتيك","يدوي","لا تفضيل"],
    carExtrasLabel: "إضافات (اختيار متعدد)",
    carExtras: ["GPS","مقعد الأطفال","حامل الأمتعة","تأمين شامل"],
    carNote: "سيتضمن الإيجاز: قواعد رخصة القيادة، قواعد المرور، ومعلومات التوقف في",
    cont: "متابعة ←", back: "رجوع →", generate: "✨ إنشاء رحلتي", generating: "جارٍ الإنشاء...",
    loadMsg1: "✈️  إنشاء البرنامج — الجزء 1...", loadMsg2: "✈️  إنشاء — الجزء 2...", loadMsg3: "🛡  تحضير الإيجاز الأمني...",
    heroLabel: "✈ برنامج wayra الخاص بك",
    tipsTitle: "💡 نصائح أساسية",
    daysTitle: "البرنامج يومًا بيوم",
    morning: "☀️ الصباح", afternoon: "🌤 الظهر", evening: "🌙 المساء",
    restaurant: "🍽 مطعم اليوم",
    briefingTitle: "بلا مفاجآت", briefingSub: "كل ما تحتاج معرفته قبل السفر.",
    briefingLabel: "🛡 إيجاز الوجهة",
    statusOk: "✓ بخير", statusWarn: "⚠ انتبه", statusReq: "! مطلوب",
    tabItinerary: "البرنامج", tabBriefing: "الإيجاز", tabNew: "جديد",
    systemItinerary: "أنت منسق سفر عالمي. أجب فقط بـ JSON صالح. بدون markdown، بدون نص قبل أو بعد.",
    systemBriefing: "أنت خبير أمان السفر. أجب فقط بـ JSON صالح. بدون markdown.",
    promptLang: "ar",
  },
};

const LANGUAGES = [
  { code: "pt", flag: "🇧🇷", name: "Português" },
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "ar", flag: "🇸🇦", name: "العربية" },
];

const Label = ({ children, rtl }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: C.muted, marginBottom: 8, textAlign: rtl ? "right" : "left" }}>{children}</div>
);

const Pill = ({ label, icon, active, onClick, rtl }) => (
  <button onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 12,
    cursor: "pointer", border: `2px solid ${active ? C.text : C.border}`,
    background: active ? C.text : C.surface, color: active ? "#fff" : C.text,
    fontSize: 14, fontWeight: active ? 600 : 400, width: "100%",
    textAlign: rtl ? "right" : "left", flexDirection: rtl ? "row-reverse" : "row",
    transition: "all .15s", fontFamily: "inherit",
  }}>
    {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
    <span style={{ flex: 1 }}>{label}</span>
    {active && <span>✓</span>}
  </button>
);

const Input = ({ value, onChange, placeholder, rtl }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    dir={rtl ? "rtl" : "ltr"}
    style={{ width: "100%", padding: "13px 14px", border: `2px solid ${C.border}`, borderRadius: 12,
      fontSize: 15, outline: "none", background: C.surface, color: C.text, fontFamily: "inherit",
      boxSizing: "border-box", textAlign: rtl ? "right" : "left" }} />
);

const Btn = ({ label, onClick, disabled, busy }) => (
  <button onClick={() => { if (!busy && !disabled && onClick) onClick(); }} style={{
    width: "100%", padding: 16,
    background: disabled || busy ? "#ccc" : C.text,
    color: disabled || busy ? "#888" : "#fff",
    border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700,
    cursor: disabled || busy ? "default" : "pointer", fontFamily: "inherit",
  }}>{label}</button>
);

const BackBtn = ({ label, onClick }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", fontFamily: "inherit", padding: "8px 0" }}>{label}</button>
);

const Progress = ({ step, total, t }) => (
  <div style={{ padding: "0 24px 16px" }}>
    <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>{t.step} {step} {t.of} {total}</div>
    <div style={{ height: 3, background: C.border, borderRadius: 99 }}>
      <div style={{ height: 3, background: C.text, borderRadius: 99, width: `${(step / total) * 100}%`, transition: "width .4s" }} />
    </div>
  </div>
);

const Nav = ({ t }) => (
  <div style={{ padding: "36px 24px 20px" }}>
    <div style={{ fontSize: 22, fontWeight: 800 }}>🪁 wayra</div>
  </div>
);

const Wrap = ({ children, rtl }) => (
  <div dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: rtl ? "sans-serif" : "'DM Sans', 'Helvetica Neue', sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
    {!rtl && <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');`}</style>}
    {children}
  </div>
);

async function askClaude(userMsg, systemMsg) {
  const resp = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: systemMsg, messages: [{ role: "user", content: userMsg }] }),
  });
  const data = await resp.json();
  if (data.error) throw new Error(data.error);
  const raw = (data.content || []).map(b => b.text || "").join("").trim();
  const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try { return JSON.parse(clean); }
  catch {
    const m = clean.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error("Invalid JSON: " + clean.slice(0, 150));
  }
}

export default function WayraApp() {
  const [lang, setLang] = useState(null);
  const [screen, setScreen] = useState("s1");
  const [dest, setDest] = useState("");
  const [origin, setOrigin] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [who, setWho] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState([]);
  const [pace, setPace] = useState("");
  const [transport, setTransport] = useState("");
  const [diet, setDiet] = useState("");
  const [carType, setCarType] = useState("");
  const [carGear, setCarGear] = useState("");
  const [carExtras, setCarExtras] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [briefing, setBriefing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [err, setErr] = useState("");
  const [openDay, setOpenDay] = useState(0);
  const [openBlock, setOpenBlock] = useState(null);

  const t = lang ? T[lang] : T.en;
  const rtl = lang === "ar";
  const totalSteps = transport === "car" ? 5 : 4;

  const toggleArr = (arr, setArr, v, max) => {
    if (arr.includes(v)) setArr(arr.filter(x => x !== v));
    else if (!max || arr.length < max) setArr([...arr, v]);
  };

  async function generate() {
    setErr(""); setBusy(true); setScreen("loading");
    const days = dateIn && dateOut ? Math.max(1, Math.round((new Date(dateOut) - new Date(dateIn)) / 86400000)) : 5;
    const profile = `Destination: ${dest}. Origin: ${origin}. Dates: ${dateIn} to ${dateOut} (${days} days). Traveler: ${who}. Budget: ${budget}. Interests: ${interests.join(", ")}. Pace: ${pace}. Transport: ${transport}${transport === "car" ? ` (type: ${carType}, gear: ${carGear}, extras: ${carExtras.join(", ")})` : ""}. Diet: ${diet || "none"}.`;
    const half = Math.ceil(days / 2);
    try {
      setLoadMsg(t.loadMsg1);
      const it1 = await askClaude(
        `Traveler profile: ${profile}\n\nCreate days 1 to ${half} of the itinerary for ${dest}. Reply with ONLY valid JSON:\n{"destination":"${dest}","tagline":"short phrase","days":[{"day":1,"title":"Theme","emoji":"🏛","morning":{"activity":"activity","tip":"tip"},"afternoon":{"activity":"activity","tip":"tip"},"evening":{"activity":"activity","tip":"tip"},"restaurant":{"name":"name","cuisine":"type","price":"$$","tip":"why go"}}]}\nRespond in ${t.promptLang}.`,
        t.systemItinerary
      );
      let it2 = { days: [] };
      if (days > half) {
        setLoadMsg(t.loadMsg2);
        it2 = await askClaude(
          `Traveler profile: ${profile}\n\nCreate days ${half + 1} to ${days} for ${dest}. Reply with ONLY valid JSON:\n{"days":[{"day":${half + 1},"title":"Theme","emoji":"🌿","morning":{"activity":"activity","tip":"tip"},"afternoon":{"activity":"activity","tip":"tip"},"evening":{"activity":"activity","tip":"tip"},"restaurant":{"name":"name","cuisine":"type","price":"$$","tip":"why go"}}]}\nRespond in ${t.promptLang}.`,
          t.systemItinerary
        );
      }
      setLoadMsg(t.loadMsg3);
      const br = await askClaude(
        `Traveler going to ${dest}. Transport: ${transport}.\n\nReply with ONLY this JSON with real specific information (respond in ${t.promptLang}):\n{"highlights":["tip1","tip2","tip3"],"driving":{"status":"green","title":"...","items":["item1","item2","item3"]},"health":{"status":"yellow","title":"...","items":["item1","item2","item3"]},"clothing":{"status":"green","title":"...","items":["item1","item2"]},"safety":{"status":"green","title":"...","items":["item1","item2"]},"money":{"status":"green","title":"...","items":["item1","item2"]},"documents":{"status":"yellow","title":"...","items":["item1","item2"]},"weather":{"status":"green","title":"...","items":["item1","item2"]}}\nUse status green/yellow/red based on real risk.`,
        t.systemBriefing
      );
      const { highlights, ...briefingOnly } = br;
      setItinerary({ destination: it1.destination || dest, tagline: it1.tagline || "", highlights: highlights || [], days: [...(it1.days || []), ...(it2.days || [])] });
      setBriefing(briefingOnly);
      setScreen("result");
    } catch (e) {
      setErr(e.message);
      setScreen(transport === "car" ? "s5" : "s4");
    } finally { setBusy(false); setLoadMsg(""); }
  }

  const BottomBar = () => (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex" }}>
      {[["result","✈️", t.tabItinerary],["briefing","🛡", t.tabBriefing],["s1","🔄", t.tabNew]].map(([sc,ic,lb]) => (
        <button key={sc} onClick={() => setScreen(sc)} style={{ flex: 1, padding: "12px 0 10px", border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: "inherit" }}>
          <span style={{ fontSize: 18 }}>{ic}</span>
          <span style={{ fontSize: 10, fontWeight: screen === sc ? 700 : 400, color: screen === sc ? C.text : C.muted }}>{lb}</span>
        </button>
      ))}
    </div>
  );

  // ── LANGUAGE PICKER ──
  if (!lang) return (
    <Wrap>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 32 }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🪁</div>
        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>wayra</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 36, textAlign: "center" }}>
          Choose your language · Escolha o idioma · Elige tu idioma
        </div>
        <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 10 }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 20px",
              border: `2px solid ${C.border}`, borderRadius: 14, background: C.surface,
              cursor: "pointer", fontSize: 16, fontFamily: "inherit", fontWeight: 500,
              transition: "all .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.text; e.currentTarget.style.background = C.text; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
            >
              <span style={{ fontSize: 24 }}>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Wrap>
  );

  if (screen === "loading") return (
    <Wrap rtl={rtl}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🪁</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>wayra</div>
        <div style={{ fontSize: 15, color: C.muted, textAlign: "center", maxWidth: 280, lineHeight: 1.5 }}>{loadMsg}</div>
        <div style={{ marginTop: 28, width: 200, height: 3, background: C.border, borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: "40%", height: "100%", background: C.text, borderRadius: 99, animation: "sl 1.2s ease-in-out infinite" }} />
        </div>
        <style>{`@keyframes sl{0%{transform:translateX(-100%)}100%{transform:translateX(550%)}}`}</style>
      </div>
    </Wrap>
  );

  if (screen === "s1") return (
    <Wrap rtl={rtl}><Nav t={t} /><Progress step={1} total={totalSteps} t={t} />
    <div style={{ padding: "0 24px 32px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", textAlign: rtl ? "right" : "left" }}>{t.s1Title}</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", textAlign: rtl ? "right" : "left" }}>{t.s1Sub}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div><Label rtl={rtl}>{t.destLabel}</Label><Input value={dest} onChange={setDest} placeholder={t.destPlaceholder} rtl={rtl} /></div>
        <div><Label rtl={rtl}>{t.originLabel}</Label><Input value={origin} onChange={setOrigin} placeholder={t.originPlaceholder} rtl={rtl} /></div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}><Label rtl={rtl}>{t.dateIn}</Label><input type="date" value={dateIn} onChange={e => setDateIn(e.target.value)} style={{ width: "100%", padding: "13px 12px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", background: C.surface, boxSizing: "border-box" }} /></div>
          <div style={{ flex: 1 }}><Label rtl={rtl}>{t.dateOut}</Label><input type="date" value={dateOut} onChange={e => setDateOut(e.target.value)} style={{ width: "100%", padding: "13px 12px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", background: C.surface, boxSizing: "border-box" }} /></div>
        </div>
      </div>
      <div style={{ marginTop: 28 }}><Btn label={t.cont} onClick={() => setScreen("s2")} disabled={!dest.trim() || !origin.trim()} /></div>
    </div></Wrap>
  );

  if (screen === "s2") return (
    <Wrap rtl={rtl}><Nav t={t} /><Progress step={2} total={totalSteps} t={t} />
    <div style={{ padding: "0 24px 32px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", textAlign: rtl ? "right" : "left" }}>{t.s2Title}</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", textAlign: rtl ? "right" : "left" }}>{t.s2Sub}</p>
      <Label rtl={rtl}>{t.whoLabel}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[["solo","🧍"],["couple","👫"],["honeymoon","🌙"],["family","👨‍👩‍👧"],["friends","🎉"]].map(([v,ic],i) =>
          <Pill key={v} icon={ic} label={t.who[i]} active={who===v} onClick={() => setWho(v)} rtl={rtl} />)}
      </div>
      <Label rtl={rtl}>{t.budgetLabel}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {[["economy","💰"],["moderate","💳"],["comfortable","✨"],["luxury","👑"]].map(([v,ic],i) =>
          <Pill key={v} icon={ic} label={t.budget[i]} active={budget===v} onClick={() => setBudget(v)} rtl={rtl} />)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Btn label={t.cont} onClick={() => setScreen("s3")} disabled={!who || !budget} />
        <BackBtn label={t.back} onClick={() => setScreen("s1")} />
      </div>
    </div></Wrap>
  );

  if (screen === "s3") return (
    <Wrap rtl={rtl}><Nav t={t} /><Progress step={3} total={totalSteps} t={t} />
    <div style={{ padding: "0 24px 32px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", textAlign: rtl ? "right" : "left" }}>{t.s3Title}</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", textAlign: rtl ? "right" : "left" }}>{t.s3Sub}</p>
      <Label rtl={rtl}>{t.interestsLabel}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[["food","🍽️"],["culture","🏛️"],["nature","🌿"],["nightlife","🎉"],["shopping","🛍️"],["wellness","🧘"],["photo","📸"],["adventure","🏄"]].map(([v,ic],i) =>
          <Pill key={v} icon={ic} label={t.interests[i]} active={interests.includes(v)} onClick={() => toggleArr(interests, setInterests, v, 3)} rtl={rtl} />)}
      </div>
      <Label rtl={rtl}>{t.paceLabel}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {[["intense","⚡"],["balanced","⚖️"],["relaxed","🌅"]].map(([v,ic],i) =>
          <Pill key={v} icon={ic} label={t.pace[i]} active={pace===v} onClick={() => setPace(v)} rtl={rtl} />)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Btn label={t.cont} onClick={() => setScreen("s4")} disabled={interests.length===0 || !pace} />
        <BackBtn label={t.back} onClick={() => setScreen("s2")} />
      </div>
    </div></Wrap>
  );

  if (screen === "s4") return (
    <Wrap rtl={rtl}><Nav t={t} /><Progress step={4} total={totalSteps} t={t} />
    <div style={{ padding: "0 24px 32px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", textAlign: rtl ? "right" : "left" }}>{t.s4Title}</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", textAlign: rtl ? "right" : "left" }}>{t.s4Sub}</p>
      <Label rtl={rtl}>{t.transportLabel}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[["walking","🚶"],["public","🚌"],["car","🚗"],["uber","📱"],["mix","🔀"]].map(([v,ic],i) =>
          <Pill key={v} icon={ic} label={t.transport[i]} active={transport===v} onClick={() => setTransport(v)} rtl={rtl} />)}
      </div>
      <Label rtl={rtl}>{t.dietLabel}</Label>
      <div style={{ marginBottom: 24 }}><Input value={diet} onChange={setDiet} placeholder={t.dietPlaceholder} rtl={rtl} /></div>
      {err && <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: C.red }}>{err}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Btn label={transport === "car" ? t.cont : t.generate} onClick={() => transport === "car" ? setScreen("s5") : generate()} disabled={!transport} busy={busy && transport !== "car"} />
        <BackBtn label={t.back} onClick={() => setScreen("s3")} />
      </div>
    </div></Wrap>
  );

  if (screen === "s5") return (
    <Wrap rtl={rtl}><Nav t={t} /><Progress step={5} total={5} t={t} />
    <div style={{ padding: "0 24px 32px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", textAlign: rtl ? "right" : "left" }}>{t.s5Title}</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", textAlign: rtl ? "right" : "left" }}>{t.s5Sub}</p>
      <Label rtl={rtl}>{t.carTypeLabel}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[["economy","🚗"],["suv","🚙"],["4x4","🛻"],["van","🚐"],["luxury","🏎️"]].map(([v,ic],i) =>
          <Pill key={v} icon={ic} label={t.carType[i]} active={carType===v} onClick={() => setCarType(v)} rtl={rtl} />)}
      </div>
      <Label rtl={rtl}>{t.carGearLabel}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[["automatic","🔄"],["manual","⚙️"],["any","✌️"]].map(([v,ic],i) =>
          <Pill key={v} icon={ic} label={t.carGear[i]} active={carGear===v} onClick={() => setCarGear(v)} rtl={rtl} />)}
      </div>
      <Label rtl={rtl}>{t.carExtrasLabel}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[["gps","🗺️"],["child_seat","👶"],["roof_rack","🎒"],["insurance","🛡️"]].map(([v,ic],i) =>
          <Pill key={v} icon={ic} label={t.carExtras[i]} active={carExtras.includes(v)} onClick={() => toggleArr(carExtras, setCarExtras, v, null)} rtl={rtl} />)}
      </div>
      <div style={{ background: "#FFF8EE", border: `1px solid #F0D8A0`, borderRadius: 14, padding: "14px 16px", marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: rtl ? "right" : "left" }}>{t.carNote} {dest}.</div>
      </div>
      {err && <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: C.red }}>{err}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Btn label={t.generate} onClick={generate} disabled={!carType || !carGear} busy={busy} />
        <BackBtn label={t.back} onClick={() => setScreen("s4")} />
      </div>
    </div></Wrap>
  );

  if (screen === "result" && itinerary) return (
    <Wrap rtl={rtl}>
      <div style={{ background: C.text, color: "#fff", padding: "40px 24px 28px" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, textAlign: rtl ? "right" : "left" }}>{t.heroLabel}</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px", textAlign: rtl ? "right" : "left" }}>{itinerary.destination}</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, textAlign: rtl ? "right" : "left" }}>{itinerary.tagline}</p>
        {dateIn && dateOut && <div style={{ marginTop: 14, display: "inline-block", background: "rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>📅 {new Date(dateIn + "T12:00:00").toLocaleDateString()} → {new Date(dateOut + "T12:00:00").toLocaleDateString()}</div>}
      </div>
      {itinerary.highlights?.length > 0 && (
        <div style={{ margin: "20px 24px 0", background: "#FFF8EE", border: `1px solid #F0D8A0`, borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.yellow, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10, textAlign: rtl ? "right" : "left" }}>{t.tipsTitle}</div>
          {itinerary.highlights.map((h, i) => <div key={i} style={{ fontSize: 13, marginBottom: 6, display: "flex", gap: 8, flexDirection: rtl ? "row-reverse" : "row" }}><span style={{ color: C.yellow }}>→</span>{h}</div>)}
        </div>
      )}
      <div style={{ padding: "20px 24px 100px" }}>
        <Label rtl={rtl}>{t.daysTitle}</Label>
        {(itinerary.days || []).map((day, i) => (
          <div key={i} style={{ marginBottom: 10, border: `2px solid ${openDay===i ? C.text : C.border}`, borderRadius: 16, overflow: "hidden" }}>
            <button onClick={() => setOpenDay(openDay===i ? -1 : i)} style={{ width: "100%", padding: 16, background: openDay===i ? C.text : C.surface, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, flexDirection: rtl ? "row-reverse" : "row", textAlign: rtl ? "right" : "left", fontFamily: "inherit" }}>
              <span style={{ fontSize: 24 }}>{day.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: openDay===i ? "rgba(255,255,255,0.45)" : C.muted, marginBottom: 2 }}>Day {day.day}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: openDay===i ? "#fff" : C.text }}>{day.title}</div>
              </div>
              <span style={{ color: openDay===i ? "#fff" : C.muted }}>{openDay===i ? "▲" : "▼"}</span>
            </button>
            {openDay===i && (
              <div style={{ padding: "4px 16px 16px", background: C.surface }}>
                {[[t.morning, day.morning],[t.afternoon, day.afternoon],[t.evening, day.evening]].map(([lbl, d]) => d && (
                  <div key={lbl} style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4, textAlign: rtl ? "right" : "left" }}>{lbl}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, textAlign: rtl ? "right" : "left" }}>{d.activity}</div>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5, textAlign: rtl ? "right" : "left" }}>💡 {d.tip}</div>
                  </div>
                ))}
                {day.restaurant && (
                  <div style={{ marginTop: 16, background: "#FFF8EE", borderRadius: 12, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.yellow, textTransform: "uppercase", marginBottom: 6, textAlign: rtl ? "right" : "left" }}>{t.restaurant}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, textAlign: rtl ? "right" : "left" }}>{day.restaurant.name}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2, textAlign: rtl ? "right" : "left" }}>{day.restaurant.cuisine} · {day.restaurant.price}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4, lineHeight: 1.5, textAlign: rtl ? "right" : "left" }}>💡 {day.restaurant.tip}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <BottomBar />
    </Wrap>
  );

  if (screen === "briefing" && briefing) return (
    <Wrap rtl={rtl}>
      <div style={{ padding: "36px 24px 8px" }}>
        <div style={{ fontSize: 11, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6, textAlign: rtl ? "right" : "left" }}>{t.briefingLabel}</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", textAlign: rtl ? "right" : "left" }}>{t.briefingTitle}</h1>
        <p style={{ fontSize: 14, color: C.muted, margin: 0, textAlign: rtl ? "right" : "left" }}>{t.briefingSub}</p>
      </div>
      <div style={{ padding: "20px 24px 100px" }}>
        {Object.values(briefing).map((block, i) => {
          const sc = block.status;
          const dot = sc==="green" ? "🟢" : sc==="yellow" ? "🟡" : "🔴";
          const clr = sc==="green" ? C.green : sc==="yellow" ? C.yellow : C.red;
          const lbl = sc==="green" ? t.statusOk : sc==="yellow" ? t.statusWarn : t.statusReq;
          const key = String(i);
          return (
            <div key={key} style={{ marginBottom: 10, border: `2px solid ${openBlock===key ? C.text : C.border}`, borderRadius: 16, overflow: "hidden" }}>
              <button onClick={() => setOpenBlock(openBlock===key ? null : key)} style={{ width: "100%", padding: "14px 16px", background: openBlock===key ? C.text : C.surface, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, flexDirection: rtl ? "row-reverse" : "row", textAlign: rtl ? "right" : "left", fontFamily: "inherit" }}>
                <span style={{ fontSize: 18 }}>{dot}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: openBlock===key ? "#fff" : C.text }}>{block.title}</div>
                  <div style={{ fontSize: 11, color: openBlock===key ? "rgba(255,255,255,0.5)" : clr, fontWeight: 600 }}>{lbl}</div>
                </div>
                <span style={{ color: openBlock===key ? "#fff" : C.muted }}>{openBlock===key ? "▲" : "▼"}</span>
              </button>
              {openBlock===key && (
                <div style={{ padding: "8px 16px 16px", background: C.surface }}>
                  {(block.items||[]).map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start", flexDirection: rtl ? "row-reverse" : "row" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: clr, marginTop: 6, flexShrink: 0 }} />
                      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: rtl ? "right" : "left" }}>{item}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <BottomBar />
    </Wrap>
  );

  return (
    <Wrap rtl={rtl}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 16 }}>
        <div style={{ fontSize: 48 }}>🪁</div>
        <button onClick={() => setScreen("s1")} style={{ padding: "14px 28px", background: C.text, color: "#fff", border: "none", borderRadius: 14, cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 700 }}>Iniciar Wayra</button>
      </div>
    </Wrap>
  );
}
