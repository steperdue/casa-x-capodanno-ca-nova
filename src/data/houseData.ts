/**
 * ============================================================================
 * CONFIGURAZIONE UNICA DEI DATI DELLA CASA (JSON EDITABILE)
 * ============================================================================
 * Tutti i dati estratti dall'annuncio Airbnb #17917859 sono raccolti in questo
 * unico oggetto `HOUSE_DATA`. Puoi aggiornare facilmente prezzi, orari di
 * check-in/out, note o capienza modificando direttamente questi campi.
 *
 * Fonte unica: https://www.airbnb.it/rooms/17917859
 * I campi non presenti nell'HTML pubblico dell'annuncio sono segnalati come
 * `null` o "Da confermare" per evitare invenzioni.
 */

export type FloorId = 'terra' | 'mansarda' | 'esterni';

export interface PhotoAsset {
  id: string;
  url: string;
  caption: string;
  isOriginalCaption: boolean;
  roomId: string;
  aspectRatio: number;
  orientation: 'LANDSCAPE' | 'PORTRAIT';
}

export interface BedDetail {
  type: string;
  count: number;
  sleeps: number;
  note?: string;
}

export interface FloorplanRect {
  x: number;
  y: number;
  w: number;
  h: number;
  labelX?: number;
  labelY?: number;
}

export interface RoomModel3D {
  /** Centro nello spazio 3D (metri indicativi) */
  x: number;
  y: number;
  z: number;
  /** Dimensioni stanza */
  w: number;
  h: number;
  d: number;
  /** Posizione camera suggerita quando la stanza viene selezionata */
  cameraPos: [number, number, number];
  /** Target camera suggerito */
  targetPos: [number, number, number];
  /** Colore accento pavimento/zona */
  tint: string;
}

export interface RoomSpace {
  id: string;
  name: string;
  shortName: string;
  floor: FloorId;
  floorLabel: string;
  tourOrder: number;
  isBedroom: boolean;
  summary: string;
  description: string;
  beds: BedDetail[];
  amenities: string[];
  photoIds: string[];
  floorplan: FloorplanRect;
  model3d: RoomModel3D;
}

export interface AmenityItem {
  title: string;
  available: boolean;
  subtitle?: string;
}

export interface AmenityGroup {
  id: string;
  title: string;
  items: AmenityItem[];
}

export interface HouseDataConfig {
  meta: {
    listingId: string;
    airbnbUrl: string;
    originalTitle: string;
    heroTitle: string;
    heroSubtitle: string;
    propertyType: string;
    locationShort: string;
    exactAddress: string;
    altitude: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    cin: string;
    floorplanDisclaimer: string;
  };
  overview: {
    guestsLabel: string;
    maxGuestsNumeric: number;
    bedrooms: number;
    beds: number;
    bathroomsShared: number;
    bathroomsHostReserved: number;
    squareMeters: string;
    levelsNote: string;
    summaryParagraphs: Array<{ title: string | null; text: string }>;
    highlights: Array<{ title: string; body: string }>;
  };
  floors: Array<{
    id: FloorId;
    label: string;
    shortLabel: string;
    description: string;
  }>;
  rooms: RoomSpace[];
  photos: PhotoAsset[];
  amenitiesGroups: AmenityGroup[];
  unavailableAmenities: AmenityItem[];
  rules: {
    standard: Array<{ title: string; detail: string | null }>;
    hostNotes: Array<{ title: string; detail: string }>;
    safety: Array<{ title: string; detail: string; isWarning?: boolean }>;
  };
  stayLogistics: {
    checkIn: string;
    checkOut: string;
    cancellationPolicy: string;
    kitchenSurchargeNote: string;
  };
  pricingDefaults: {
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    friendsCount: number;
    /** Imposta un numero (es. 350) quando ricevi il preventivo dall'host */
    nightlyRateEur: number | null;
    /** Sovrapprezzo giornaliero cucina segnalato dall'host (importo da confermare) */
    kitchenDailySurchargeEur: number | null;
    cleaningFeeEur: number | null;
    airbnbServiceFeeEur: number | null;
    /** Quota indicativa opzionale per spesa cenone/bevande a persona */
    groceriesPerPersonEur: number;
  };
  surroundings: Array<{
    name: string;
    category: string;
    detail: string;
  }>;
  host: {
    name: string;
    avatarUrl: string;
    isSuperhost: boolean;
    yearsHosting: number;
    ratingAverage: number;
    reviewCount: number;
    responseRate: string;
    responseTime: string;
    highlights: string[];
    bio: string;
    legalNote: string;
  };
  reviews: {
    overallRating: number;
    totalCount: number;
    badgeLabel: string;
    textReviewsNote: string;
    categories: Array<{ label: string; rating: string; percentage: number }>;
    distribution: Array<{ stars: number; label: string; percentage: number }>;
    tags: Array<{ label: string; count: number }>;
  };
}

export const HOUSE_DATA: HouseDataConfig = {
  meta: {
    listingId: '17917859',
    airbnbUrl:
      'https://www.airbnb.it/rooms/17917859?unique_share_id=dab1d278-846a-4ace-bd03-fac8dc03ed35&viralityEntryPoint=1&s=76',
    originalTitle: "Grande casa Oltrepo', loc. Cà Nova Caminata (PC)",
    heroTitle: 'Capodanno a Cà Nova',
    heroSubtitle: "Casa colonica anni '60 tra i boschi e i vigneti sopra l'Oltrepò Piacentino",
    propertyType: 'Intero alloggio: casa',
    locationShort: "Cà Nova di Caminata (PC), Emilia-Romagna",
    exactAddress: "Via Cà Nova, 1 · Loc. Cà Nova di Caminata (PC)",
    altitude: 'ca. 600 m s.l.m.',
    coordinates: {
      lat: 44.92921,
      lng: 9.30481,
    },
    cin: 'IT033049C116NXOYKB',
    floorplanDisclaimer:
      "Ricostruzione indicativa elaborata dalle foto e dalla descrizione dell'annuncio Airbnb: non è una pianta catastale ufficiale.",
  },

  overview: {
    guestsLabel: 'Più di 16 ospiti',
    maxGuestsNumeric: 16,
    bedrooms: 3,
    beds: 14,
    bathroomsShared: 2,
    bathroomsHostReserved: 1,
    squareMeters: 'Da confermare (non indicata su Airbnb)',
    levelsNote:
      'Casa su 3 livelli con 2 rampe di scale: gli ospiti usano il Piano Terra e l’Ultimo Piano (mansarda). Il piano intermedio resta riservato all’host (1 bagno riservato ai padroni di casa, 2 bagni per gli ospiti).',
    summaryParagraphs: [
      {
        title: null,
        text: "Casa colonica anni '60, con un ampio sottotetto mansardato dove si trova una grande camerata, le due camere e il bagno. Al piano terra cucina (sovrapprezzo giornaliero), bagno e grande sala giochi. Intorno un vasto prato, una cascina (con tavoli e panche per 40 persone), una zona giochi attrezzata per bambini. Contesto: boschi, vigneti, possibilità di belle passeggiate a piedi, cavallo, mountain bike, circuito Via Francigena, Cammino degli Abati.",
      },
      {
        title: 'Lo spazio',
        text: 'Si tratta di una grande casa dislocata su tre piani con spazi diversificati e ben attrezzati. Usufruibile il piano terra (cucina con sovrapprezzo giornaliero, bagno, sala giochi: ping pong, calcetto, biliardo) e l’ultimo (3 camere da letto e bagno condiviso). Lo spazio esterno è molto confortevole e attrezzato (alberi, tavoli, panche, amache, giochi bimbi e barbecue), adatto per ospitare feste ed eventi. Ideale per famiglie, gruppi di amici e ciclisti.',
      },
      {
        title: 'Accesso per gli ospiti',
        text: 'Gli ospiti hanno accesso all’ultimo piano dove vi è una grande stanza mansardata di 9 letti (8 a castello e un matrimoniale diviso da un separè), una camera con un letto matrimoniale e uno a castello, un’altra camera con letto matrimoniale e letto singolo (disponibile anche lettino per bimbi piccoli e una culla), e il bagno in comune.',
      },
    ],
    highlights: [
      {
        title: "Tra le colline sopra l'Oltrepò Pavese",
        body: 'Circondato da vigneti, boschi e dolci colline nella campagna piacentina.',
      },
      {
        title: 'Divertimento al coperto e all’aperto',
        body: 'Sala giochi con ping pong, calcio balilla e biliardo, più griglia a carbone, cascina per 40 persone e prato.',
      },
      {
        title: 'Accoglienza calorosa di Maria Enrica',
        body: 'Gli ospiti lodano la casa spaziosa e l’host cordiale e comunicativa (4,8/5 in comunicazione).',
      },
    ],
  },

  floors: [
    {
      id: 'terra',
      label: 'Piano Terra · Giorno & Giochi',
      shortLabel: 'Piano Terra',
      description: 'Ingresso ospiti, cucina attrezzata (con sovrapprezzo giornaliero), sala pranzo, bagno ospiti e grande sala giochi.',
    },
    {
      id: 'mansarda',
      label: 'Ultimo Piano · Sottotetto Mansardato',
      shortLabel: 'Mansarda',
      description: 'Anticamera comune, grande camerata (matrimoniale + 4 castelli), due camere da letto e bagno condiviso.',
    },
    {
      id: 'esterni',
      label: 'Esterni, Cascina & Panorama',
      shortLabel: 'Esterni',
      description: 'Vasto prato recintato di verde, parcheggio gratuito, cascina con tavoli per 40 persone, barbecue a carbonella e vista colline.',
    },
  ],

  rooms: [
    {
      id: 'esterni',
      name: 'Esterni, Giardino & Cascina',
      shortName: 'Esterni & Prato',
      floor: 'esterni',
      floorLabel: 'Esterni',
      tourOrder: 1,
      isBedroom: false,
      summary: 'Prato, cascina per 40 persone, barbecue e parcheggio in loco',
      description:
        "Ampio prato attorno alla casa colonica con vista su boschi e vigneti dell'Oltrepò. Comprende parcheggio gratuito in loco, ingresso dedicato agli ospiti, cascina coperta con tavoli e panche per 40 persone, amache, zona giochi per bambini e barbecue a carbonella. Nota: una delle foto mostra l'ingresso separato dell'host.",
      beds: [],
      amenities: [
        'Parcheggio gratuito in loco',
        'Cascina con tavoli e panche (40 posti)',
        'Barbecue a carbonella e utensili',
        'Cortile/prato e amache',
        'Zona giochi attrezzata per bambini',
        'Patio o balcone',
      ],
      photoIds: [
        '1017711836',
        '1018788552',
        '1018788644',
        '1017713411',
        '1018788441',
        '1017716563',
        '1017713555',
        '1017713920',
        '1018788773',
      ],
      floorplan: { x: 24, y: 24, w: 552, h: 352 },
      model3d: {
        x: 0,
        y: 0.2,
        z: 6.8,
        w: 16,
        h: 0.4,
        d: 6.5,
        cameraPos: [14, 10, 18],
        targetPos: [0, 1, 2],
        tint: '#4D6B53',
      },
    },
    {
      id: 'cucina',
      name: 'Cucina per gli ospiti',
      shortName: 'Cucina',
      floor: 'terra',
      floorLabel: 'Piano Terra',
      tourOrder: 2,
      isBedroom: false,
      summary: 'Cucina completa al piano terra (sovrapprezzo giornaliero)',
      description:
        "Cucina dedicata agli ospiti al piano terra, attrezzata per gruppi numerosi con fornello, forno, frigorifero, congelatore, lavastoviglie, microonde, macchina per caffè espresso e stoviglie complete. L'host specifica che l'uso della cucina prevede un sovrapprezzo giornaliero (importo esatto da confermare).",
      beds: [],
      amenities: [
        'Frigorifero e congelatore',
        'Fornello, forno e microonde',
        'Lavastoviglie',
        'Macchina caffè espresso e calici da vino',
        'Pentole, padelle, piatti, posate e teglie',
        'Sovrapprezzo giornaliero richiesto',
      ],
      photoIds: ['1018786545', '1018786866'],
      floorplan: { x: 40, y: 40, w: 205, h: 145 },
      model3d: {
        x: -3.2,
        y: 1.4,
        z: -2.2,
        w: 4.4,
        h: 2.6,
        d: 3.6,
        cameraPos: [-10, 9, -8],
        targetPos: [-3.2, 1.2, -2.2],
        tint: '#C97B57',
      },
    },
    {
      id: 'sala_pranzo',
      name: 'Sala Pranzo',
      shortName: 'Sala Pranzo',
      floor: 'terra',
      floorLabel: 'Piano Terra',
      tourOrder: 3,
      isBedroom: false,
      summary: 'Tavolata conviviale per cenoni e pasti di gruppo',
      description:
        'Adiacente alla cucina al piano terra, la sala pranzo ospita lunghi tavoli adatti a tutto il gruppo per il cenone di Capodanno, colazioni insieme e serate in compagnia.',
      beds: [],
      amenities: ['Tavolo da pranzo ampio', 'Riscaldamento', 'Accesso diretto al piano terra'],
      photoIds: ['1018788007', '1018787574', '1018788937', '2893079087'],
      floorplan: { x: 255, y: 40, w: 210, h: 145 },
      model3d: {
        x: 1.6,
        y: 1.4,
        z: -2.2,
        w: 4.8,
        h: 2.6,
        d: 3.6,
        cameraPos: [9, 9, -8],
        targetPos: [1.6, 1.2, -2.2],
        tint: '#D4A373',
      },
    },
    {
      id: 'bagno_pt',
      name: 'Bagno Ospiti (Piano Terra)',
      shortName: 'Bagno P.T.',
      floor: 'terra',
      floorLabel: 'Piano Terra',
      tourOrder: 4,
      isBedroom: false,
      summary: 'Bagno completo al piano terra con lavatrice',
      description:
        'Primo dei due bagni condivisi a disposizione degli ospiti, situato comodamente al piano terra vicino alla zona giorno e alla sala giochi.',
      beds: [],
      amenities: [
        'Acqua calda',
        'Bidè e asciugacapelli',
        'Shampoo, balsamo e sapone',
        'Prodotti per la pulizia',
        'Lavatrice (in casa)',
      ],
      photoIds: ['1018785863', '1018786227', '1018785447'],
      floorplan: { x: 475, y: 40, w: 85, h: 145 },
      model3d: {
        x: 5.1,
        y: 1.4,
        z: -2.2,
        w: 2.0,
        h: 2.6,
        d: 3.6,
        cameraPos: [11, 8.5, -5],
        targetPos: [5.1, 1.2, -2.2],
        tint: '#8CA3A3',
      },
    },
    {
      id: 'sala_giochi',
      name: 'Sala Giochi & Hobby',
      shortName: 'Sala Giochi',
      floor: 'terra',
      floorLabel: 'Piano Terra',
      tourOrder: 5,
      isBedroom: false,
      summary: 'Ping pong, calcio balilla e tavolo da biliardo',
      description:
        'Il cuore delle serate invernali al piano terra: una grande sala hobby attrezzata con tavolo da ping pong, biliardo, calcio balilla e spazio per sfide e tornei di gruppo.',
      beds: [],
      amenities: [
        'Tavolo da ping-pong',
        'Tavolo da biliardo',
        'Calcio balilla (calcetto)',
        'Attrezzatura sportiva',
        'Libri e materiale di lettura',
      ],
      photoIds: ['1018784029', '1018784767', '1018785103'],
      floorplan: { x: 40, y: 195, w: 425, h: 165 },
      model3d: {
        x: -0.6,
        y: 1.4,
        z: 1.9,
        w: 9.6,
        h: 2.6,
        d: 4.2,
        cameraPos: [0, 9.5, 11],
        targetPos: [-0.6, 1.2, 1.9],
        tint: '#B84A2E',
      },
    },
    {
      id: 'anticamera',
      name: 'Anticamera Stanze (Mansarda)',
      shortName: 'Anticamera',
      floor: 'mansarda',
      floorLabel: 'Mansarda (Ultimo Piano)',
      tourOrder: 6,
      isBedroom: false,
      summary: 'Disimpegno superiore che collega le 3 camere e il bagno',
      description:
        "Arrivando dalle due rampe di scale all'ultimo piano mansardato, l'anticamera distribuisce l'accesso verso la grande camerata, le due camere matrimoniali e il bagno condiviso.",
      beds: [],
      amenities: ['Accesso tramite 2 rampe di scale', 'Collegamento alle 3 camere'],
      photoIds: ['651698952'],
      floorplan: { x: 40, y: 235, w: 170, h: 125 },
      model3d: {
        x: -3.6,
        y: 6.4,
        z: 2.1,
        w: 3.6,
        h: 2.4,
        d: 3.6,
        cameraPos: [-10, 12, 9],
        targetPos: [-3.6, 6.2, 2.1],
        tint: '#C8B8A6',
      },
    },
    {
      id: 'camerata',
      name: 'Camera 1 · Grande Camerata',
      shortName: 'Camerata (10p)',
      floor: 'mansarda',
      floorLabel: 'Mansarda (Ultimo Piano)',
      tourOrder: 7,
      isBedroom: true,
      summary: '1 matrimoniale con separè + 4 letti a castello + culla + salottino',
      description:
        "Ampia stanza mansardata con travi a vista. La sezione 'Dove dormirai' riporta 1 letto matrimoniale (separato da un separè), 4 letti a castello (8 posti singoli) e 1 culla; nella foto principale è indicata come 'Camerata: 10 letti e una culla' (nel testo descrizione l'host indica 9 letti: 8 a castello + 1 matrimoniale). Dispone inoltre di ingresso dedicato, zona salottino e tavolo studio.",
      beds: [
        { type: 'Letto matrimoniale (diviso da separè)', count: 1, sleeps: 2 },
        { type: 'Letti a castello (8 posti singoli)', count: 4, sleeps: 8 },
        { type: 'Culla', count: 1, sleeps: 0, note: 'Per neonati/bimbi piccoli' },
      ],
      amenities: [
        'Salottino interno',
        'Spazio di lavoro dedicato (tavolo studio)',
        'Biancheria, cuscini e coperte extra',
        'Armadio / cassettiera e grucce',
        'Riscaldamento',
      ],
      photoIds: [
        '651698490',
        '651698664',
        '286242693',
        '651698054',
        '651698344',
        '1017712343',
        '651698237',
        '1017712507',
      ],
      floorplan: { x: 40, y: 40, w: 300, h: 185 },
      model3d: {
        x: -2.2,
        y: 6.4,
        z: -1.8,
        w: 6.4,
        h: 2.4,
        d: 4.0,
        cameraPos: [-9, 13, -7],
        targetPos: [-2.2, 6.2, -1.8],
        tint: '#B57B52',
      },
    },
    {
      id: 'camera_2',
      name: 'Camera 2 · Matrimoniale & Castello',
      shortName: 'Camera 2 (4p)',
      floor: 'mansarda',
      floorLabel: 'Mansarda (Ultimo Piano)',
      tourOrder: 8,
      isBedroom: true,
      summary: '1 letto matrimoniale + 1 letto a castello (4 posti)',
      description:
        'Seconda camera nel sottotetto mansardato, adatta a una coppia con amici o a una famiglia: ospita un letto matrimoniale e un letto a castello a due posti.',
      beds: [
        { type: 'Letto matrimoniale', count: 1, sleeps: 2 },
        { type: 'Letto a castello', count: 1, sleeps: 2 },
      ],
      amenities: [
        'Biancheria da letto',
        'Cuscini e coperte aggiuntive',
        'Spazio per conservare abbigliamento',
        'Riscaldamento',
      ],
      photoIds: ['651699441', '651700050', '651700343'],
      floorplan: { x: 350, y: 40, w: 210, h: 155 },
      model3d: {
        x: 3.6,
        y: 6.4,
        z: -1.9,
        w: 4.8,
        h: 2.4,
        d: 3.8,
        cameraPos: [10, 13, -6],
        targetPos: [3.6, 6.2, -1.9],
        tint: '#C98A63',
      },
    },
    {
      id: 'camera_3',
      name: 'Camera 3 · Matrimoniale & Singolo',
      shortName: 'Camera 3 (3p)',
      floor: 'mansarda',
      floorLabel: 'Mansarda (Ultimo Piano)',
      tourOrder: 9,
      isBedroom: true,
      summary: '1 letto matrimoniale + 1 letto singolo (3 posti)',
      description:
        'Terza camera da letto in mansarda con letto matrimoniale e letto singolo. Dalla descrizione host è inoltre disponibile su necessità un lettino per bimbi piccoli e una culla.',
      beds: [
        { type: 'Letto matrimoniale', count: 1, sleeps: 2 },
        { type: 'Letto singolo', count: 1, sleeps: 1 },
      ],
      amenities: [
        'Biancheria da letto e grucce',
        'Cuscini e coperte aggiuntive',
        'Lettino bimbi/culla disponibili (da descrizione)',
        'Riscaldamento',
      ],
      photoIds: ['1017685738', '1017684040', '1017684848'],
      floorplan: { x: 350, y: 205, w: 210, h: 155 },
      model3d: {
        x: 3.6,
        y: 6.4,
        z: 2.1,
        w: 4.8,
        h: 2.4,
        d: 3.6,
        cameraPos: [10, 12.5, 8],
        targetPos: [3.6, 6.2, 2.1],
        tint: '#A66E4E',
      },
    },
    {
      id: 'bagno_camere',
      name: 'Bagno Camere (Mansarda)',
      shortName: 'Bagno Mansarda',
      floor: 'mansarda',
      floorLabel: 'Mansarda (Ultimo Piano)',
      tourOrder: 10,
      isBedroom: false,
      summary: 'Bagno completo condiviso al piano notte con vasca',
      description:
        'Secondo bagno a uso condiviso degli ospiti, posizionato direttamente al piano delle tre camere da letto in mansarda, completo di vasca da bagno, bidè e asciugacapelli.',
      beds: [],
      amenities: [
        'Vasca da bagno e acqua calda',
        'Bidè e asciugacapelli',
        'Asciugamani, sapone, shampoo e balsamo',
        'Carta igienica e prodotti pulizia',
      ],
      photoIds: ['651700732', '651700546'],
      floorplan: { x: 220, y: 235, w: 120, h: 125 },
      model3d: {
        x: -0.2,
        y: 6.4,
        z: 2.1,
        w: 2.8,
        h: 2.4,
        d: 3.6,
        cameraPos: [0, 12, 9],
        targetPos: [-0.2, 6.2, 2.1],
        tint: '#7A9696',
      },
    },
  ],

  photos: [
    // Esterni (9 foto)
    {
      id: '1017711836',
      url: 'https://a0.muscache.com/im/pictures/a5f7ef5b-7cb3-4f77-8310-2b033f1bd768.jpg',
      caption: 'Facciata principale della casa colonica (foto copertina Airbnb)',
      isOriginalCaption: false,
      roomId: 'esterni',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1017713411',
      url: 'https://a0.muscache.com/im/pictures/dbf8e4b8-9e27-4608-8260-15ebca95496c.jpg',
      caption: 'La casa dalla strada provinciale',
      isOriginalCaption: true,
      roomId: 'esterni',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018788441',
      url: 'https://a0.muscache.com/im/pictures/847b2994-bc11-469f-a7ae-77a52cc628b7.jpg',
      caption: 'Parcheggio',
      isOriginalCaption: true,
      roomId: 'esterni',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018788552',
      url: 'https://a0.muscache.com/im/pictures/a14dbabf-7aa7-444d-822f-1cae6f6b8c3e.jpg',
      caption: 'Ingresso per gli ospiti',
      isOriginalCaption: true,
      roomId: 'esterni',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018788644',
      url: 'https://a0.muscache.com/im/pictures/a52a64be-1ac3-4625-a4e4-db340735b0f3.jpg',
      caption: 'La casa dal giardino',
      isOriginalCaption: true,
      roomId: 'esterni',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018788773',
      url: 'https://a0.muscache.com/im/pictures/7bcf7789-9105-41e5-baf3-10b33a2129f5.jpg',
      caption: 'Ingresso host',
      isOriginalCaption: true,
      roomId: 'esterni',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1017713555',
      url: 'https://a0.muscache.com/im/pictures/a6bdc47d-a40e-43a3-ade1-0aeeb65faff0.jpg',
      caption: 'Panorama: particolare',
      isOriginalCaption: true,
      roomId: 'esterni',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1017716563',
      url: 'https://a0.muscache.com/im/pictures/0d3fb67f-a68f-4f38-a6ff-16c3d5935f43.jpg',
      caption: 'Panorama dalla casa',
      isOriginalCaption: true,
      roomId: 'esterni',
      aspectRatio: 1.462,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1017713920',
      url: 'https://a0.muscache.com/im/pictures/1b1dd1e8-4960-46ea-8a1a-7241a35019f2.jpg',
      caption: 'Panorama: dettaglio',
      isOriginalCaption: true,
      roomId: 'esterni',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },

    // Cucina (2 foto)
    {
      id: '1018786545',
      url: 'https://a0.muscache.com/im/pictures/4cf23a7d-cd8d-4ace-8456-5a4f4b016cfc.jpg',
      caption: 'Piano terra: cucina per ospiti',
      isOriginalCaption: true,
      roomId: 'cucina',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018786866',
      url: 'https://a0.muscache.com/im/pictures/05abafed-6884-49fb-b58f-a5eee3484688.jpg',
      caption: 'Piano terra: cucina per ospiti',
      isOriginalCaption: true,
      roomId: 'cucina',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },

    // Sala Pranzo (2 foto con didascalia + 2 foto tagged Dining_room)
    {
      id: '1018788007',
      url: 'https://a0.muscache.com/im/pictures/7fd5223f-0bc2-4dd5-bd2d-0ca946b1cceb.jpg',
      caption: 'Piano terra: sala pranzo',
      isOriginalCaption: true,
      roomId: 'sala_pranzo',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018787574',
      url: 'https://a0.muscache.com/im/pictures/99ccbbe5-4c42-4e35-986b-9be1ba6505ba.jpg',
      caption: 'Piano terra: sala pranzo',
      isOriginalCaption: true,
      roomId: 'sala_pranzo',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018788937',
      url: 'https://a0.muscache.com/im/pictures/b8689541-69cc-4b69-a838-ea0ac3aa403e.jpg',
      caption: 'Zona pranzo / tavolo interno (classificata Sala pranzo su Airbnb)',
      isOriginalCaption: false,
      roomId: 'sala_pranzo',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '2893079087',
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-17917859/original/7b9e0724-795b-4c4e-9782-1cd3fdaae7ea.jpeg',
      caption: 'Dettaglio zona pranzo (classificata Sala pranzo su Airbnb)',
      isOriginalCaption: false,
      roomId: 'sala_pranzo',
      aspectRatio: 0.75,
      orientation: 'PORTRAIT',
    },

    // Bagno Piano Terra (3 foto)
    {
      id: '1018785863',
      url: 'https://a0.muscache.com/im/pictures/7f312126-9e7d-4f98-98cf-6ede087b38b8.jpg',
      caption: 'Piano terra: bagno ospiti',
      isOriginalCaption: true,
      roomId: 'bagno_pt',
      aspectRatio: 0.5,
      orientation: 'PORTRAIT',
    },
    {
      id: '1018786227',
      url: 'https://a0.muscache.com/im/pictures/0b24c3f9-85fc-466a-9191-a8e38a701e6f.jpg',
      caption: 'Piano terra: bagno ospiti',
      isOriginalCaption: true,
      roomId: 'bagno_pt',
      aspectRatio: 0.5,
      orientation: 'PORTRAIT',
    },
    {
      id: '1018785447',
      url: 'https://a0.muscache.com/im/pictures/e147baee-bf2c-489b-8a06-f3852fd5e5d8.jpg',
      caption: 'Piano terra: bagno ospiti',
      isOriginalCaption: true,
      roomId: 'bagno_pt',
      aspectRatio: 0.5,
      orientation: 'PORTRAIT',
    },

    // Sala Giochi (3 foto)
    {
      id: '1018784029',
      url: 'https://a0.muscache.com/im/pictures/e8359cec-67ca-4063-9bb7-21e83149fd23.jpg',
      caption: 'Sala Giochi: ping pong, calcetto, biliardo',
      isOriginalCaption: true,
      roomId: 'sala_giochi',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018784767',
      url: 'https://a0.muscache.com/im/pictures/577fefec-cab9-4bfa-aa7c-5372c6f2a6d3.jpg',
      caption: 'Sala Giochi: ping pong, calcetto, biliardo',
      isOriginalCaption: true,
      roomId: 'sala_giochi',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1018785103',
      url: 'https://a0.muscache.com/im/pictures/3539dc51-5b68-4c6d-a4fd-3b765c76c01c.jpg',
      caption: 'Sala Giochi: ping pong',
      isOriginalCaption: true,
      roomId: 'sala_giochi',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },

    // Anticamera stanze (1 foto)
    {
      id: '651698952',
      url: 'https://a0.muscache.com/im/pictures/d7239192-7f43-4786-80de-66ec5d40ec73.jpg',
      caption: 'anticamera stanze',
      isOriginalCaption: true,
      roomId: 'anticamera',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },

    // Camerata / Camera 1 (8 foto)
    {
      id: '651698490',
      url: 'https://a0.muscache.com/im/pictures/f65de849-a04f-4db4-bc27-4be4e0392018.jpg',
      caption: 'Camerata: 10 letti e una culla',
      isOriginalCaption: true,
      roomId: 'camerata',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '286242693',
      url: 'https://a0.muscache.com/im/pictures/299c8d9a-e739-422f-afcb-052e6d52e0ba.jpg',
      caption: 'Camerata: letto matrimoniale',
      isOriginalCaption: true,
      roomId: 'camerata',
      aspectRatio: 0.75,
      orientation: 'PORTRAIT',
    },
    {
      id: '651698664',
      url: 'https://a0.muscache.com/im/pictures/21a8eebf-65a0-4ebb-912e-8ba57c7fc501.jpg',
      caption: 'Ingresso camerata',
      isOriginalCaption: true,
      roomId: 'camerata',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '651698237',
      url: 'https://a0.muscache.com/im/pictures/6255376d-ac49-4067-a55d-cc70bd7f33c2.jpg',
      caption: 'Camerata: salottino',
      isOriginalCaption: true,
      roomId: 'camerata',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1017712507',
      url: 'https://a0.muscache.com/im/pictures/0daf56b2-9414-4cd3-a19c-25436326d8d9.jpg',
      caption: 'Camerata: tavolo studio',
      isOriginalCaption: true,
      roomId: 'camerata',
      aspectRatio: 1.489,
      orientation: 'LANDSCAPE',
    },
    {
      id: '651698344',
      url: 'https://a0.muscache.com/im/pictures/77a2a942-731f-454d-a78c-8bffc74d6c50.jpg',
      caption: 'Camerata: letti a castello',
      isOriginalCaption: true,
      roomId: 'camerata',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1017712343',
      url: 'https://a0.muscache.com/im/pictures/0213d733-ad1e-4b44-9782-58d93447ec70.jpg',
      caption: 'Camerata: letti a castello',
      isOriginalCaption: true,
      roomId: 'camerata',
      aspectRatio: 1.476,
      orientation: 'LANDSCAPE',
    },
    {
      id: '651698054',
      url: 'https://a0.muscache.com/im/pictures/55598e7c-207c-4a1f-8cb7-039cd34cf28f.jpg',
      caption: 'Camerata: letto matrimoniale e culla',
      isOriginalCaption: true,
      roomId: 'camerata',
      aspectRatio: 1.526,
      orientation: 'LANDSCAPE',
    },

    // Camera 2 (3 foto)
    {
      id: '651699441',
      url: 'https://a0.muscache.com/im/pictures/43ceb61c-f313-44de-8a58-bca84f8995cd.jpg',
      caption: 'Camera con letto matrimoniale e letto castello',
      isOriginalCaption: true,
      roomId: 'camera_2',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '651700050',
      url: 'https://a0.muscache.com/im/pictures/ef5aed8d-b698-4b8c-b89c-3aacdb00a128.jpg',
      caption: 'Camera con letto matrimoniale e letto castello',
      isOriginalCaption: true,
      roomId: 'camera_2',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '651700343',
      url: 'https://a0.muscache.com/im/pictures/be324a27-8247-4373-b784-05f702d6fc00.jpg',
      caption: 'Camera con letto matrimoniale e letto castello',
      isOriginalCaption: true,
      roomId: 'camera_2',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },

    // Camera 3 (3 foto)
    {
      id: '1017685738',
      url: 'https://a0.muscache.com/im/pictures/6c736ecb-83ab-4542-af92-8f0c32c5d90c.jpg',
      caption: 'Camera matrimoniale con letto singolo (4)',
      isOriginalCaption: true,
      roomId: 'camera_3',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1017684040',
      url: 'https://a0.muscache.com/im/pictures/fac7cd31-d993-4f07-b60f-031bdecea8b5.jpg',
      caption: 'Camera matrimoniale con letto singolo (2)',
      isOriginalCaption: true,
      roomId: 'camera_3',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },
    {
      id: '1017684848',
      url: 'https://a0.muscache.com/im/pictures/8890e7da-59e1-4427-9f43-78bcee166e09.jpg',
      caption: 'Camera matrimoniale con letto singolo (3)',
      isOriginalCaption: true,
      roomId: 'camera_3',
      aspectRatio: 2,
      orientation: 'LANDSCAPE',
    },

    // Bagno Camere Mansarda (2 foto)
    {
      id: '651700732',
      url: 'https://a0.muscache.com/im/pictures/19b10256-d6be-4906-952d-602722c7111a.jpg',
      caption: 'Bagno camere',
      isOriginalCaption: true,
      roomId: 'bagno_camere',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
    {
      id: '651700546',
      url: 'https://a0.muscache.com/im/pictures/c2aa4bc5-8f70-4b5e-a6be-64e129234587.jpg',
      caption: 'Bagno camere',
      isOriginalCaption: true,
      roomId: 'bagno_camere',
      aspectRatio: 1.5,
      orientation: 'LANDSCAPE',
    },
  ],

  amenitiesGroups: [
    {
      id: 'cucina',
      title: 'Cucina e zona pranzo',
      items: [
        { title: 'Cucina', available: true, subtitle: 'Al piano terra (sovrapprezzo giornaliero)' },
        { title: 'Frigorifero e congelatore', available: true },
        { title: 'Fornello, forno e microonde', available: true },
        { title: 'Lavastoviglie', available: true },
        { title: 'Macchina per caffè espresso e caffè', available: true },
        { title: 'Pentole, padelle, olio, sale e pepe', available: true },
        { title: 'Piatti, insalatiere, tazze, posate e teglie', available: true },
        { title: 'Calici da vino', available: true },
        { title: 'Tavolo da pranzo', available: true },
        { title: 'Utensili e combustibile barbecue', available: true },
      ],
    },
    {
      id: 'intrattenimento',
      title: 'Intrattenimento & Sala Giochi',
      items: [
        { title: 'Tavolo da ping-pong', available: true },
        { title: 'Tavolo da biliardo', available: true },
        { title: 'Calcio balilla (da descrizione/foto)', available: true },
        { title: 'Attrezzatura sportiva', available: true },
        { title: 'Libri e materiale di lettura', available: true },
      ],
    },
    {
      id: 'camere',
      title: 'Camere da letto e lavanderia',
      items: [
        { title: 'Lavatrice', available: true },
        { title: 'Asciugamani, lenzuola, sapone e carta igienica', available: true },
        { title: 'Biancheria da letto, cuscini e coperte extra', available: true },
        { title: 'Armadio, cassettiera e grucce', available: true },
        { title: 'Ferro da stiro e stendibiancheria', available: true },
      ],
    },
    {
      id: 'bagno',
      title: 'Bagno',
      items: [
        { title: 'Vasca da bagno', available: true },
        { title: 'Acqua calda', available: true },
        { title: 'Bidè', available: true },
        { title: 'Asciugacapelli', available: true },
        { title: 'Shampoo, balsamo e sapone per il corpo', available: true },
        { title: 'Prodotti per la pulizia', available: true },
      ],
    },
    {
      id: 'riscaldamento',
      title: 'Riscaldamento e lavoro',
      items: [
        { title: 'Riscaldamento', available: true },
        { title: 'Ventilatori portatili', available: true },
        { title: 'Spazio di lavoro dedicato (scrivania)', available: true },
        { title: 'Kit di primo soccorso', available: true },
      ],
    },
    {
      id: 'esterni',
      title: 'All’aperto e parcheggio',
      items: [
        { title: 'Parcheggio gratuito in loco', available: true },
        { title: 'Cortile / vasto prato e amache', available: true },
        { title: 'Cascina coperta con tavoli e panche per 40 persone', available: true },
        { title: 'Barbecue a carbonella', available: true },
        { title: 'Patio o balcone', available: true },
        { title: 'Animali domestici ammessi (max 2)', available: true },
      ],
    },
  ],

  unavailableAmenities: [
    {
      title: 'Wi-Fi NON incluso',
      available: false,
      subtitle: 'L’host segnala che il Wi-Fi è disponibile al bar nel paese vicino (Pometo).',
    },
    {
      title: 'TV non presente',
      available: false,
    },
    {
      title: 'Aria condizionata e asciugatrice assenti',
      available: false,
    },
    {
      title: 'Allarme antincendio non segnalato',
      available: false,
      subtitle: 'Consigliato portare un rilevatore portatile.',
    },
    {
      title: 'Rilevatore di monossido di carbonio non segnalato',
      available: false,
      subtitle: 'Consigliato portare un rilevatore portatile da viaggio.',
    },
  ],

  rules: {
    standard: [
      { title: 'Più di 16 ospiti con pernottamento', detail: 'Ideale per gruppi numerosi o famiglie.' },
      { title: 'Animali domestici ammessi', detail: 'Massimo 2 animali (avvisare l’host se di più).' },
      { title: 'Vietato fumare', detail: 'Svapo e sigarette elettroniche inclusi.' },
    ],
    hostNotes: [
      {
        title: 'Uso esclusivo degli spazi comuni',
        detail:
          '“È preferibile essere in gruppi o famiglie in modo da avere gli ampi spazi (cucina, sala pranzo, sala giochi, bagni) tutti per sé.”',
      },
      {
        title: 'Feste ed eventi all’aperto',
        detail:
          'Nella descrizione l’host indica che lo spazio esterno attrezzato è adatto per ospitare feste ed eventi (da confermare le condizioni specifiche per Capodanno).',
      },
    ],
    safety: [
      {
        title: 'Casa su 3 livelli — 2 rampe di scale',
        detail: 'Necessario salire le scale per raggiungere la zona notte in mansarda.',
      },
      {
        title: 'Alcuni spazi dell’edificio sono dell’host',
        detail: 'Ci sono tre bagni totali nell’immobile: 1 riservato ai padroni di casa e 2 condivisi per gli ospiti.',
      },
      {
        title: 'Nessun Wi-Fi in casa',
        detail: 'Connessione disponibile al bar del paese vicino.',
        isWarning: true,
      },
      {
        title: 'Rilevatori fumo / CO non segnalati',
        detail: 'L’annuncio riporta che non sono segnalati rilevatori di fumo e monossido di carbonio.',
        isWarning: true,
      },
    ],
  },

  stayLogistics: {
    checkIn: 'Da confermare con l’host (orario non visibile senza prenotazione)',
    checkOut: 'Da confermare con l’host (orario non visibile senza prenotazione)',
    cancellationPolicy:
      'Da confermare prima dell’invio richiesta (termini variabili in base alle date su Airbnb)',
    kitchenSurchargeNote:
      'Attenzione: l’host specifica in descrizione che la cucina al piano terra comporta un sovrapprezzo giornaliero (importo esatto da chiedere a Maria Enrica).',
  },

  pricingDefaults: {
    checkInDate: '2026-12-30',
    checkOutDate: '2027-01-02',
    nights: 3,
    friendsCount: 12,
    nightlyRateEur: null,
    kitchenDailySurchargeEur: null,
    cleaningFeeEur: null,
    airbnbServiceFeeEur: null,
    groceriesPerPersonEur: 35,
  },

  surroundings: [
    {
      name: 'Pometo (PV) — Paese più vicino',
      category: 'Negozi & Wi-Fi',
      detail:
        'Cà Nova non ha negozi: alimentari di base e bar (con Wi-Fi disponibile) si trovano a Pometo.',
    },
    {
      name: 'Stazione FS di Stradella',
      category: 'Treno',
      detail: 'Stazione ferroviaria più vicina segnalata dall’host nell’annuncio.',
    },
    {
      name: 'Autolinea Arfea (da Milano Famagosta)',
      category: 'Bus',
      detail: 'Collegamento extraurbano segnalato verso Pometo.',
    },
    {
      name: 'Via Francigena & Cammino degli Abati',
      category: 'Natura & Trekking',
      detail: 'Boschi, vigneti e sentieri per passeggiate a piedi, a cavallo o in mountain bike.',
    },
  ],

  host: {
    name: 'Maria Enrica',
    avatarUrl: 'https://a0.muscache.com/im/users/37351472/profile_pic/1435872445/original.jpg',
    isSuperhost: false,
    yearsHosting: 10,
    ratingAverage: 4.65,
    reviewCount: 34,
    responseRate: '94%',
    responseTime: 'Risponde entro qualche ora',
    highlights: ['Studi: Università Statale Milano', 'Lavoro: psicoterapeuta', 'Host privato verificato'],
    bio: 'Sono nata a Milano nel 1950, coniugata, ho due figli e tre nipoti. Sono psicoterapeuta ed esercito a Milano.',
    legalNote:
      'Maria Enrica opera su Airbnb come host privato (non professionale).',
  },

  reviews: {
    overallRating: 4.65,
    totalCount: 34,
    badgeLabel: 'Uno degli alloggi più amati dagli ospiti di Airbnb',
    textReviewsNote:
      'L’HTML pubblico dell’annuncio espone i punteggi ufficiali, la distribuzione stelle e i temi ricorrenti, ma non i commenti testuali dei singoli ospiti.',
    categories: [
      { label: 'Comunicazione', rating: '4,8', percentage: 96 },
      { label: 'Check-in', rating: '4,8', percentage: 96 },
      { label: 'Precisione', rating: '4,6', percentage: 93 },
      { label: 'Posizione', rating: '4,5', percentage: 90 },
      { label: 'Qualità/prezzo', rating: '4,5', percentage: 89 },
      { label: 'Pulizia', rating: '4,0', percentage: 81 },
    ],
    distribution: [
      { stars: 5, label: '68%', percentage: 68 },
      { stars: 4, label: '29%', percentage: 29 },
      { stars: 3, label: '3%', percentage: 3 },
      { stars: 2, label: '0%', percentage: 0 },
      { stars: 1, label: '0%', percentage: 0 },
    ],
    tags: [
      { label: 'Ospitalità', count: 22 },
      { label: 'Spazi interni', count: 17 },
      { label: 'Posizione', count: 11 },
      { label: "Spazi all'aperto", count: 8 },
      { label: 'Pulizia', count: 8 },
      { label: 'Famiglia', count: 4 },
      { label: 'Comfort', count: 4 },
      { label: 'Cucina', count: 4 },
      { label: 'Riscaldamento', count: 2 },
    ],
  },
};
