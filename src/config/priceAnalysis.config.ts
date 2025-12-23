// src/config/priceAnalysis.config.ts

/**
 * Price Analysis Configuration
 * Centralized configuration for price comparison and analysis
 * Aligned with EnhancedPriceCalculator calculations
 * Last updated: December 2025
 */


export interface PhaseBreakdown {
    phase: string;
    cost: number;
    percentage: number;
    icon: any;
    image: string;
}

export interface ConstructionData {
    total: number;
    timeline: string;
    breakdown: PhaseBreakdown[];
}

export interface SizeComparison {
    traditional: ConstructionData;
    prefab: ConstructionData;
}

export interface AdditionalCost {
    item: string;
    cost: string;
    impact: 'positive' | 'negative';
}

export interface QualityFactor {
    factor: string;
    traditional: number;
    prefab: number;
    description: string;
}

export interface SavingsItem {
    category: string;
    saving: string;
    description: string;
}

export interface CityConfig {
    name: string;
    value: string;
    emoji: string;
    multiplier: number;
}

export interface ConstructionTypeConfig {
    name: string;
    value: string;
    traditional: number; // Base rate per sq ft
    prefab: number; // Base rate per sq ft
}
// Cities Configuration with Multipliers (same as EnhancedPriceCalculator)
export const citiesConfig: CityConfig[] = [
    { name: 'Mumbai', value: 'mumbai', emoji: '🌆', multiplier: 1.25 },
    { name: 'Delhi', value: 'delhi', emoji: '🏛️', multiplier: 1.15 },
    { name: 'Bangalore', value: 'bangalore', emoji: '🌳', multiplier: 1.10 },
    { name: 'Pune', value: 'pune', emoji: '🏙️', multiplier: 1.05 },
    { name: 'Hyderabad', value: 'hyderabad', emoji: '🕌', multiplier: 1.00 },
    { name: 'Chennai', value: 'chennai', emoji: '🏖️', multiplier: 1.00 },
    { name: 'Kolkata', value: 'kolkata', emoji: '🌉', multiplier: 0.95 },
    { name: 'Ahmedabad', value: 'ahmedabad', emoji: '🏭', multiplier: 0.90 },
    { name: 'Other', value: 'other', emoji: '📍', multiplier: 1.00 }
];

// Construction Types with Base Rates (same as EnhancedPriceCalculator)
export const constructionTypesConfig: ConstructionTypeConfig[] = [
    { name: 'Basic', value: 'basic', traditional: 2000, prefab: 1800 },
    { name: 'Standard', value: 'standard', traditional: 2000, prefab: 1800 },
    { name: 'Premium', value: 'premium', traditional: 2400, prefab: 2160 },
    { name: 'Luxury', value: 'luxury', traditional: 3000, prefab: 2700 }
];

// Volume Discounts Configuration (same as EnhancedPriceCalculator)
export const volumeDiscountsConfig = {
    threshold: 2000, // Apply discount if area > 2000 sq ft
    traditional: 0,  // 0% discount for traditional
    prefab: 5        // 5% additional discount for prefab
};


// Additional Costs Configuration
export const additionalCostsConfig = {
    traditional: [
        { item: 'Material Wastage (15-20%)', cost: 'High', impact: 'negative' as const },
        { item: 'Weather Delays', cost: 'Variable', impact: 'negative' as const },
        { item: 'Labor Cost Fluctuation', cost: 'High', impact: 'negative' as const },
        { item: 'Site Storage & Security', cost: 'Medium', impact: 'negative' as const },
        { item: 'Supervision & Quality Control', cost: 'High', impact: 'negative' as const }
    ],
    prefab: [
        { item: 'Transportation to Site', cost: 'Low', impact: 'negative' as const },
        { item: 'Crane & Assembly Equipment', cost: 'Medium', impact: 'negative' as const },
        { item: 'Precision Manufacturing', cost: 'None', impact: 'positive' as const },
        { item: 'Weather Independence', cost: 'None', impact: 'positive' as const },
        { item: 'Minimal Waste Generation', cost: 'Savings', impact: 'positive' as const }
    ]
};

// Quality Factors Configuration
export const qualityFactorsConfig: QualityFactor[] = [
    {
        factor: 'Precision Manufacturing',
        traditional: 60,
        prefab: 95,
        description: 'Accuracy in dimensions and fittings'
    },
    {
        factor: 'Material Quality Control',
        traditional: 70,
        prefab: 90,
        description: 'Consistent quality standards'
    },
    {
        factor: 'Weather Protection',
        traditional: 40,
        prefab: 100,
        description: 'Independence from weather conditions'
    },
    {
        factor: 'Waste Minimization',
        traditional: 30,
        prefab: 85,
        description: 'Efficient material utilization'
    },
    {
        factor: 'Construction Speed',
        traditional: 45,
        prefab: 90,
        description: 'Project completion timeline'
    }
];

// Cost Savings Analysis Configuration
export const costSavingsAnalysisConfig = {
    direct: {
        title: 'Direct Cost Savings',
        items: [
            { category: 'Material Costs', saving: '10-15%', description: 'Bulk procurement and minimal waste' },
            { category: 'Labor Costs', saving: '20-25%', description: 'Reduced on-site labor requirements' },
            { category: 'Time Costs', saving: '60%', description: 'Faster construction timeline' },
            { category: 'Supervision', saving: '50%', description: 'Factory-controlled quality' }
        ]
    },
    indirect: {
        title: 'Indirect Cost Benefits',
        items: [
            { category: 'Interest Savings', saving: '₹2-5 Lakhs', description: 'Shorter loan tenure due to faster completion' },
            { category: 'Rent Savings', saving: '₹3-8 Lakhs', description: 'Move in earlier, save on current accommodation' },
            { category: 'Price Escalation', saving: '₹1-3 Lakhs', description: 'Protection from material price increases' },
            { category: 'Opportunity Cost', saving: 'Significant', description: 'Earlier property appreciation benefits' }
        ]
    }
};

// Custom Cost Calculation Configuration (aligned with EnhancedPriceCalculator)
export const customCostConfig = {
    // Phase percentages for traditional construction
    traditionalPhasePercentages: {
        foundation: 0.12,
        structural: 0.30,
        masonry: 0.16,
        mep: 0.12,
        flooring: 0.14,
        finishing: 0.10,
        doors: 0.06
    },

    // Phase percentages for prefab construction
    prefabPhasePercentages: {
        foundation: 0.14,
        manufacturing: 0.33,
        assembly: 0.17,
        mep: 0.14,
        finishing: 0.16,
        quality: 0.06
    },

    // Timeline calculation factors (aligned with EnhancedPriceCalculator)
    timelineFactors: {
        traditional: {
            base: 12,        // 12 months base time for 1000 sq ft
            perSqFt: 0.004   // +0.004 months per additional sq ft
        },
        prefab: {
            base: 4,         // 4 months base time for 1000 sq ft
            perSqFt: 0.0015  // +0.0015 months per additional sq ft
        }
    }
};

// Helper Functions
export const getCityMultiplier = (cityValue: string): number => {
    const city = citiesConfig.find(c => c.value === cityValue);
    return city?.multiplier || 1.0;
};

export const getConstructionTypeRates = (constructionTypeValue: string): { traditional: number; prefab: number } => {
    const type = constructionTypesConfig.find(t => t.value === constructionTypeValue);
    return {
        traditional: type?.traditional || 2000,
        prefab: type?.prefab || 1800
    };
};

export const formatCurrency = (amount: number, inLakhs: boolean = false): string => {
    if (inLakhs) {
        return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
};

export const getDisplaySize = (area: number): string => {
    if (area === 1000) return '1000sqft';
    if (area === 1500) return '1500sqft';
    if (area === 2000) return '2000sqft';
    return 'custom';
};
