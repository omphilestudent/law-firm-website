const servicesData = [
    {
        id: 'civil-litigation',
        title: 'Civil and Commercial Litigation',
        shortTitle: 'Civil & Commercial Litigation',
        icon: 'fas fa-gavel',
        summary: 'Effective dispute resolution services in High Court and Magistrate\'s Court practice.',
        description: 'Effective dispute resolution services across High Court and Magistrate\'s Court Practice',
        overview: 'We provide a full range of effective and solutions-based dispute resolution services, prioritising early resolution and cost-effective strategies to avoid prolonged litigation when possible.',
        imageKey: 'litigation',
        featured: true,
        status: 'active',
        condition: 'Accepting new matters',
        features: [
            'High Court Practice representation',
            'Magistrate\'s Court litigation',
            'Alternative dispute resolution',
            'Commercial contract disputes',
            'Debt recovery litigation',
            'Advocate/Counsel briefing when necessary'
        ],
        process: [
            'Initial case assessment and litigation strategy',
            'Pre-litigation negotiations and ADR',
            'Drafting and filing of court documents',
            'Case management and trial preparation',
            'Court appearances and representation',
            'Judgment enforcement and execution'
        ],
        benefits: [
            'Cost-effective litigation strategies',
            'Early resolution of potential complexities',
            'Experienced courtroom advocacy',
            'Strategic dispute resolution approach',
            'Access to specialised counsel when needed'
        ],
        caseExamples: [
            'Resolved complex commercial disputes before trial',
            'Managed high-stakes litigation across courts',
            'Achieved favourable outcomes in contract disputes'
        ]
    },
    {
        id: 'corporate-commercial',
        title: 'Corporate & Commercial Law',
        shortTitle: 'Corporate & Commercial Law',
        icon: 'fas fa-building',
        summary: 'Drafting commercial agreements, shareholders agreements, and business transactions.',
        description: 'Comprehensive corporate and commercial legal services',
        overview: 'We advise on a wide spectrum of corporate and commercial matters, including drafting and negotiating the agreements that power our clients’ businesses.',
        imageKey: 'corporate',
        featured: true,
        status: 'active',
        condition: 'Accepting new matters',
        features: [
            'Purchase and sale of business agreements',
            'Shareholders and subscription agreements',
            'Lease agreements and commercial contracts',
            'Employment and consultancy agreements',
            'Joint venture structuring',
            'Loan facility agreements and guarantees'
        ],
        process: [
            'Business needs assessment',
            'Due diligence and risk analysis',
            'Document drafting and negotiation',
            'Regulatory compliance review',
            'Agreement finalisation and execution',
            'Ongoing commercial support'
        ],
        benefits: [
            'Comprehensive agreement expertise',
            'Risk mitigation in transactions',
            'Regulatory compliance assurance',
            'Strategic business structuring advice',
            'Experienced in diverse commercial matters'
        ],
        caseExamples: [
            'Structured joint venture agreements',
            'Drafted social housing funding agreements',
            'Prepared complex cession agreements'
        ]
    },
    {
        id: 'labor-employment',
        title: 'Employment and Labour Law',
        shortTitle: 'Employment & Labour Law',
        icon: 'fas fa-users',
        summary: 'Representation at CCMA, Bargaining Councils, Labour Court and Labour Appeal Court.',
        description: 'Comprehensive workplace law solutions and dispute resolution',
        overview: 'We possess specialist knowledge across all aspects of employment and labour law, representing both institutions and individuals in every major forum.',
        imageKey: 'labour',
        featured: true,
        status: 'limited',
        condition: 'Limited slots available',
        features: [
            'CCMA and Bargaining Council representation',
            'Labour Court and Labour Appeal Court litigation',
            'Employment agreements and policies',
            'Disciplinary enquiries and arbitrations',
            'Workplace compliance and investigations',
            'Transfer of employees (section 197) advice'
        ],
        process: [
            'Case evaluation and strategy development',
            'Dispute resolution planning',
            'Forum representation and evidence prep',
            'Settlement negotiations when appropriate',
            'Hearing advocacy and submissions',
            'Appeal and review applications'
        ],
        benefits: [
            'Expert knowledge of LRA, BCEA, EEA, OHSA, COIDA',
            'Experience across all labour forums',
            'Proactive workplace relations advice',
            'Comprehensive compliance support',
            'Strategic dispute management'
        ],
        caseExamples: [
            'Represented clients in unfair dismissal claims',
            'Handled occupational detriment and PDA matters',
            'Advised on complex employment transfers'
        ]
    },
    {
        id: 'debt-collection',
        title: 'Debt Collection & Recovery',
        shortTitle: 'Debt Collection & Recovery',
        icon: 'fas fa-hand-holding-usd',
        summary: 'Comprehensive debt recovery services including soft collection and litigation.',
        description: 'Comprehensive debt recovery through soft collection and litigation',
        overview: 'Led by Director Shimane Sebela, our debt practice applies the latest best practices to efficiently recover debts through negotiated and litigated channels.',
        imageKey: 'debt',
        featured: true,
        status: 'high-demand',
        condition: 'High demand – book early',
        features: [
            'Soft collection procedures',
            'Debt collection litigation',
            'Judgment obtaining and enforcement',
            'Settlement negotiations',
            'Asset tracing and recovery',
            'Portfolio management reporting'
        ],
        process: [
            'Debt verification and documentation review',
            'Pre-litigation collection efforts',
            'Issuing legal process where required',
            'Judgment enforcement procedures',
            'Settlement facilitation',
            'Recovery optimisation strategies'
        ],
        benefits: [
            'Led by experienced director',
            'Latest best practice application',
            'Efficient recovery timelines',
            'Both soft and hard collection paths',
            'Transparent client reporting'
        ],
        caseExamples: [
            'Obtained judgments for institutional creditors',
            'Negotiated favourable settlement plans',
            'Managed large-scale debt portfolios'
        ]
    },
    {
        id: 'constitutional-admin',
        title: 'Constitutional and Administrative Law',
        shortTitle: 'Constitutional & Administrative Law',
        icon: 'fas fa-balance-scale-left',
        summary: 'Judicial reviews, PAJA, PAIA, and procurement related disputes.',
        description: 'Judicial reviews and administrative justice matters including PAJA and PAIA',
        overview: 'We guide clients through judicial reviews, PAJA and PAIA processes, and procurement disputes with strategic insight into public law frameworks.',
        imageKey: 'constitutional',
        featured: true,
        status: 'active',
        condition: 'Accepting new matters',
        features: [
            'Judicial review applications',
            'PAJA compliance and advice',
            'PAIA request management',
            'Procurement dispute resolution',
            'Administrative law litigation',
            'Constitutional matters representation'
        ],
        process: [
            'Case merit assessment and grounds evaluation',
            'Review application preparation and filing',
            'Record compilation and legal analysis',
            'Court application proceedings',
            'Opposition and reply processes',
            'Appeal procedure implementation'
        ],
        benefits: [
            'Deep administrative justice expertise',
            'Strategic judicial review approach',
            'Access to information compliance',
            'Effective procurement dispute handling',
            'Experienced in government matters'
        ],
        caseExamples: [
            'Handled PAIA information requests',
            'Resolved procurement-related disputes',
            'Advised on PAJA compliance matters'
        ]
    },
    {
        id: 'property-real-estate',
        title: 'Real Estate and Property Law',
        shortTitle: 'Real Estate & Property Law',
        icon: 'fas fa-home',
        summary: 'Conveyancing, property development, and commercial property transactions.',
        description: 'Comprehensive property law and conveyancing services',
        overview: 'Our conveyancing consultants handle commercial property transactions, developments, and government housing transfers with precision and compliance.',
        imageKey: 'realestate',
        featured: true,
        status: 'active',
        condition: 'Accepting transfers',
        features: [
            'Commercial property transactions',
            'Conveyancing services and title transfers',
            'Property development advice',
            'Sectional title developments',
            'Government housing verification',
            'Lease agreements and development contracts'
        ],
        process: [
            'Property due diligence and title investigation',
            'Agreement drafting and negotiation',
            'Municipal compliance and clearance',
            'Deeds Office registration processes',
            'Transfer duty and tax coordination',
            'Post-registration follow-up'
        ],
        benefits: [
            'Expert conveyancing services',
            'Experience with government housing',
            'Comprehensive development advice',
            'Efficient transaction management',
            'Regulatory compliance assurance'
        ],
        caseExamples: [
            'Transferred government housing portfolios',
            'Managed commercial development deals',
            'Advised on sectional title projects'
        ]
    },
    {
        id: 'aviation-law',
        title: 'Aviation Law',
        shortTitle: 'Aviation Law',
        icon: 'fas fa-plane',
        summary: 'Specialised legal services for aviation and air navigation services.',
        description: 'Specialised legal services for aviation and air navigation providers',
        overview: 'Leveraging experience at Air Traffic & Navigation Services SOC Ltd, we provide cost-effective aviation legal expertise across contracts and compliance.',
        imageKey: null,
        featured: false,
        status: 'specialist',
        condition: 'Specialist practice – enquire',
        features: [
            'Air navigation services contracts',
            'OEM supplier agreement negotiation',
            'Airport operations and management agreements',
            'Regulatory compliance advisory',
            'Contract drafting and vetting services',
            'Aviation sector dispute resolution'
        ],
        process: [
            'Sector-specific regulatory analysis',
            'OEM and supplier negotiations',
            'Agreement drafting and review',
            'Compliance framework development',
            'Dispute resolution in aviation context',
            'Regulatory monitoring and updates'
        ],
        benefits: [
            'Rare aviation law expertise',
            'Direct experience with ATNS',
            'Cost-effective legal solutions',
            'Understanding of navigation services',
            'Established supplier relationships'
        ],
        caseExamples: [
            'Negotiated contracts with navigation OEMs',
            'Drafted agreements for airports and ACSA',
            'Provided legal services for ATNS operations'
        ]
    },
    {
        id: 'investigations',
        title: 'Investigations',
        shortTitle: 'Investigations',
        icon: 'fas fa-search',
        summary: 'Comprehensive investigative services for PFMA, MFMA, PDA and workplace matters.',
        description: 'Comprehensive investigative services for various matters',
        overview: 'We investigate PFMA/MFMA contraventions, employee misconduct, school incidents, and irregular expenditure with thorough methodologies.',
        imageKey: null,
        featured: false,
        status: 'active',
        condition: 'Accepting briefing notes',
        features: [
            'PFMA and MFMA compliance investigations',
            'Employee misconduct investigations',
            'Schools incidents investigations',
            'Whistleblower protection matters',
            'Financial irregularity examinations',
            'Service provider appointment reviews'
        ],
        process: [
            'Allegation assessment and scoping',
            'Evidence gathering and documentation review',
            'Witness interviews and statements',
            'Legal analysis and compliance evaluation',
            'Investigation report preparation',
            'Recommendations implementation support'
        ],
        benefits: [
            'Experience with public finance legislation',
            'Thorough investigative methodologies',
            'Understanding of municipal governance',
            'Expertise in misconduct matters',
            'Comprehensive reporting and advice'
        ],
        caseExamples: [
            'Investigated PFMA contraventions',
            'Handled employee misconduct cases',
            'Addressed irregular expenditure matters'
        ]
    },
    {
        id: 'local-government',
        title: 'Local Government Law',
        shortTitle: 'Local Government Law',
        icon: 'fas fa-landmark',
        summary: 'Legal services for municipalities covering systems, finance, and property legislation.',
        description: 'Legal services for local government authorities and municipalities',
        overview: 'We support municipalities across governance, compliance, and litigation issues tied to South African local government legislation.',
        imageKey: null,
        featured: false,
        status: 'active',
        condition: 'Accepting municipal instructions',
        features: [
            'Municipal Systems Act compliance',
            'Municipal Structures Act advisory',
            'MFMA implementation and support',
            'Municipal Property Rates Act applications',
            'Local government litigation support',
            'Governance and policy advisory'
        ],
        process: [
            'Municipal legal framework analysis',
            'Compliance assessment and gap review',
            'Policy development and implementation',
            'Dispute resolution and litigation management',
            'Ongoing legal advisory services',
            'Regulatory updates and training'
        ],
        benefits: [
            'Deep understanding of municipal legislation',
            'Experience with municipal operations',
            'Comprehensive compliance support',
            'Strategic governance advice',
            'Practical implementation guidance'
        ],
        caseExamples: [
            'Advised on Municipal Systems Act compliance',
            'Assisted with MFMA implementation',
            'Guided municipalities on governance matters'
        ]
    },
    {
        id: 'criminal-law',
        title: 'Criminal Law & Litigation',
        shortTitle: 'Criminal Law & Litigation',
        icon: 'fas fa-shield-alt',
        summary: 'Expert defense representation in criminal matters and appeals.',
        description: 'Expert defence representation in criminal matters',
        overview: 'Director Julius Galananzhele leads our criminal practice, defending complex matters with extensive courtroom experience.',
        imageKey: null,
        featured: false,
        status: 'specialist',
        condition: 'Accepting select matters',
        features: [
            'Criminal defence representation',
            'Bail applications and hearings',
            'Trial preparation and management',
            'Sentencing mitigation strategies',
            'Appeal procedures and applications',
            'Legal opinion preparation'
        ],
        process: [
            'Case analysis and defence strategy',
            'Evidence review and preparation',
            'Court appearances and advocacy',
            'Witness preparation and examination',
            'Sentencing submissions',
            'Appeal or review processes'
        ],
        benefits: [
            'Extensive criminal law experience',
            'Strategic defence approach',
            'Seasoned courtroom advocacy',
            'Comprehensive case preparation',
            'Client-focused representation'
        ],
        caseExamples: [
            'Defended complex criminal matters',
            'Obtained favourable outcomes under pressure',
            'Provided expert criminal law opinions'
        ]
    }
];

export default servicesData;

