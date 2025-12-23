export interface Product {
    id: string;
    name: string;
    image: string;
    images: string[];
    description: string;
    specifications: string[];
    performance: string[];
}

export const products: Product[] = [
    {
        id: 'steel',
        name: 'Steel Structure',
        image: '/images/products/steelStructure/steel-structure.jpg',
        images: [
            '/images/products/steelStructure/steel-structure.jpg',
            '/images/products/steelStructure/steel-structure.jpg',
            '/images/products/steelStructure/steel-structure.jpg',
            '/images/products/steelStructure/steel-structure.jpg'
        ],
        description: 'We design and construct steel structures based on site requirements and customer needs—including columns, beams, base plates, J-bolts, anchor bolts, and framing.',
        specifications: [
            'Steel Type: Apollo brand box pipes (or ISI-certified brand)',
            'Structural Components: Columns, Beams, Base plates, J-bolts & anchor bolts, Box pipes/I-sections',
            'Design Basis: Licensed structural drawing / Experience-based design',
            'Load Capacity: Client’s specified load + safety factor',
            'Finishing: One coat red oxide primer'
        ],
        performance: [
            'Licensed Structural Drawing by certified steel designers (higher quantity required as per standards)',
            'Experience-based Design offers optimized, balanced solutions with safe load capacity'
        ]
    },
    {
        id: 'panels',
        name: 'Walls / Roof Panels',
        image: '/images/products/wallsRoofPanels/walls-roof-panels.jpg',
        images: [
            '/images/products/wallsRoofPanels/walls-roof-panels.jpg',
            '/images/products/wallsRoofPanels/walls-roof-panels.jpg',
            '/images/products/wallsRoofPanels/walls-roof-panels.jpg',
            '/images/products/wallsRoofPanels/walls-roof-panels.jpg',
        ],
        description: 'Factory-made composite panels replace traditional RCC slabs—offering thermal insulation, strength, long-term durability, and rapid installation.',
        specifications: [
            'Thickness Options: 50mm, 75mm, 100mm',
            'Panel Size: 2.4m x 0.6m',
            'Weight: 45–65 kg/m²',
            'Thermal Conductivity: ≤ 0.22 W/mK',
            'Sound Insulation: Up to 40 dB',
            'Fire Rating: Up to 2 hours'
        ],
        performance: [
            'Engineered for spans up to 20 feet without intermediate support (depends on design)',
            'Load-bearing enhanced by extra joists/thicker panels; compatible with steel/RCC/hybrid'
        ]
    },
    {
        id: 'waterproofing',
        name: 'Water Proofing',
        image: '/images/products/water-proofing/water-proofing.jpg',
        images: [
            '/images/products/water-proofing/water-proofing.jpg'
        ],
        description: 'Multi-layer waterproofing systems with chemical-based compounds and tape or bitumen-based treatments for joints and surfaces.',
        specifications: [
            'Chemical-Based Waterproofing: Plastocrete, Dr. Fixit',
            'Tape & Sealant for joints (fiber mesh + compound)',
            'Bitumen/Elastomeric coating for heavy rain zones',
            'Joint-free, UV-resistant, long-term performance (8–10 yrs)'
        ],
        performance: [
            'Flexible for contraction/expansion',
            'Superior resistance against leaks, seepage, dampness'
        ]
    },
    {
        id: 'falseceiling',
        name: 'False Ceiling',
        image: '/images/products/false-ceiling/false-ceiling.jpg',
        images: [
            '/images/products/false-ceiling/false-ceiling.jpg'
        ],
        description: 'Modular ceiling panels for quick installation, smooth finish, and acoustic/thermal enhancement.',
        specifications: [
            'Gypsum/metal sheet options',
            'Acoustics & insulation available'
        ],
        performance: [
            'Ideal for rapid fit-outs in residential/commercial settings'
        ]
    },
    {
        id: 'electrical',
        name: 'Electricals',
        image: '/images/products/electricals/electricals.jpg',
        images: [
            '/images/products/electricals/electricals.jpg'
        ],
        description: 'Certified electrical wiring, board installation, lighting, and power fit-outs integrated during prefab construction.',
        specifications: [
            'ISI-marked wiring/components',
            'Custom circuits and panels'
        ],
        performance: [
            'Safe and reliable installation for all project types'
        ]
    },
    {
        id: 'plumbing',
        name: 'Plumbing',
        image: '/images/products/plumbing/plumbing.jpg',
        images: [
            '/images/products/plumbing/plumbing.jpg'
        ],
        description: 'Complete internal plumbing, water supply, drainage, and sanitary integration for prefab buildings.',
        specifications: [
            'CPVC/PVC/PEX options',
            'ISI-approved pipe fittings'
        ],
        performance: [
            'Leak-proof, efficient, long-lasting plumbing'
        ]
    },
    {
        id: 'tiles',
        name: 'Tiles',
        image: '/images/products/tiles/tiles.jpg',
        images: [
            '/images/products/tiles/tiles.jpg'
        ],
        description: 'Tile laying for walls, floors, washrooms, and kitchen surfaces as part of prefab fit-outs.',
        specifications: [
            'Ceramic, vitrified, granite/marble—all grades',
            'Skilled laying & grouting'
        ],
        performance: [
            'Smooth surface finish, durability and easy maintenance'
        ]
    },
    {
        id: 'paint',
        name: 'Putty & Paint',
        image: '/images/products/putty-paint/putty-paint.jpg',
        images: [
            '/images/products/putty-paint/putty-paint.jpg'
        ],
        description: 'Final surface finishing works, including interior/exterior wall putty, primer, and paints.',
        specifications: [
            'Acrylic/PU/other durable paints',
            'Smooth wall, weather-resistant options'
        ],
        performance: [
            'Premium surface finish and long-lasting protection'
        ]
    },
    {
        id: 'doors',
        name: 'Doors',
        image: '/images/products/doors/doors.jpg',
        images: [
            '/images/products/doors/doors.jpg'
        ],
        description: 'Factory-finished prefab doors ensuring durability, aesthetics, smooth operation, and low maintenance. ',
        specifications: [
            'Flush, WPC, PVC, UPVC, or aluminum doors with SS hardware and secure locking systems.',
        ],
        performance: [
            'Resistant to moisture, termites, warping, ensuring long life and reliable daily performance.'
        ]
    },
    {
        id: 'windows',
        name: 'Windows',
        image: '/images/products/windows/windows.jpg',
        images: [
            '/images/products/windows/windows.jpg'
        ],
        description: 'Precision-engineered windows providing natural light, ventilation, insulation, and modern aesthetics. ',
        specifications: [
            'UPVC, aluminum, or steel frames with single or double-glazed safety glass. ',
        ],
        performance: [
            'High wind resistance, thermal insulation, sound reduction, and long-term weatherproof performance.'
        ]
    },
    {
        id: 'glass-partitions',
        name: 'Glass Partitions',
        image: '/images/products/glass-partitions/image.png',
        images: [
            '/images/products/glass-partitions/image.png'
        ],
        description:
            'Non-load-bearing glass walls that divide spaces while maintaining openness, visual connectivity, and modern aesthetics.',
        specifications: [
            'Metal track framework with toughened or laminated glass',
            'Custom thickness, heights, and hardware options',
            'Clear, frosted, or patterned finishes based on privacy needs'
        ],
        performance: [
            'Lightweight, stable partitions designed for durability and safety',
            'Supports flexible interior layouts without permanent masonry walls'
        ]
    },
    {
        id: 'architecture-services',
        name: 'Architecture Services',
        image: '/images/products/architecture-services/image.png',
        images: [
            '/images/products/architecture-services/image.png'
        ],
        description:
            'Creative architectural planning focused on functional, aesthetic, and practical spaces tailored to client needs.',
        specifications: [
            'Concept design, space planning, and detailed layouts',
            'Material concepts and façade design coordination',
            'Construction-ready drawings for site execution'
        ],
        performance: [
            'Designs aligned with structural feasibility and building regulations',
            'Improves usability, comfort, and long-term value of the space'
        ]
    },
    {
        id: 'bim-services',
        name: 'BIM Services',
        image: '/images/products/bim-services/image.png',
        images: [
            '/images/products/bim-services/image.png'
        ],
        description:
            'Digital building modeling for coordinated design, visualization, and construction documentation.',
        specifications: [
            '3D models integrating architecture, structure, and services',
            'Data-rich models for quantities, schedules, and documentation',
            'Supports clash detection and design coordination among disciplines'
        ],
        performance: [
            'Reduces errors on site through early clash detection',
            'Enhances construction accuracy and overall project efficiency before execution'
        ]
    }
];


