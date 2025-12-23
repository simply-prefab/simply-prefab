// src/config/priceCalculator.config.ts

/**
 * Price Calculator Configuration
 * Update this file to change pricing, cities, and calculation rules
 * Last updated: December 2025
 */

export interface CostConfig {
  traditional: number;
  prefab: number;
}

export interface ConstructionTypeConfig {
  [key: string]: CostConfig;
}

export interface CityConfig {
  name: string;
  value: string;
  emoji: string;
  multiplier: number;
}

export interface CalculatorConfig {
  // Base costs per sq ft (in INR)
  baseCosts: ConstructionTypeConfig;
  
  // Volume discount configuration
  volumeDiscounts: {
    threshold: number; // sq ft threshold
    traditional: number; // discount percentage for traditional
    prefab: number; // discount percentage for prefab
  };
  
  // City multipliers and display data
  cities: CityConfig[];
  
  // Construction types with labels
  constructionTypes: {
    value: string;
    label: string;
    emoji: string;
  }[];
  
  // Time calculation factors
  timeFactors: {
    traditional: {
      base: number; // base months
      perSqFt: number; // additional months per sq ft
    };
    prefab: {
      base: number; // base months
      perSqFt: number; // additional months per sq ft
    };
  };
  
  // Cost breakdown percentages
  costBreakdown: {
    traditional: {
      materials: number;
      labor: number;
      others: number;
    };
    prefab: {
      modules: number;
      assembly: number;
      others: number;
    };
  };
  
  // Benefits display
  benefits: {
    speed: number; // percentage
    quality: number; // percentage
    waste: number; // percentage
  };
  
  // Default values
  defaults: {
    area: number;
    constructionType: string;
    city: string;
  };
}

// Main configuration object
export const priceCalculatorConfig: CalculatorConfig = {
  // Base construction costs per sq ft (Traditional: ₹2000, Prefab: ₹1800)
  baseCosts: {
    basic: {
      traditional: 2000,
      prefab: 1800
    },
    standard: {
      traditional: 2000,
      prefab: 1800
    },
    premium: {
      traditional: 2400,
      prefab: 2160
    },
    luxury: {
      traditional: 3000,
      prefab: 2700
    }
  },

  // Volume discounts for projects > 2000 sq ft
  volumeDiscounts: {
    threshold: 2000, // Apply discount if area > 2000 sq ft
    traditional: 0,  // 0% discount for traditional
    prefab: 5        // 5% additional discount for prefab
  },

  // Cities with location-based multipliers
  cities: [
    { name: 'Mumbai', value: 'mumbai', emoji: '🌆', multiplier: 1.25 },
    { name: 'Delhi', value: 'delhi', emoji: '🏛️', multiplier: 1.15 },
    { name: 'Bangalore', value: 'bangalore', emoji: '🌳', multiplier: 1.10 },
    { name: 'Pune', value: 'pune', emoji: '🏙️', multiplier: 1.05 },
    { name: 'Hyderabad', value: 'hyderabad', emoji: '🕌', multiplier: 1.00 },
    { name: 'Chennai', value: 'chennai', emoji: '🏖️', multiplier: 1.00 },
    { name: 'Kolkata', value: 'kolkata', emoji: '🌉', multiplier: 0.95 },
    { name: 'Ahmedabad', value: 'ahmedabad', emoji: '🏭', multiplier: 0.90 },
    { name: 'Other', value: 'other', emoji: '📍', multiplier: 1.00 }
  ],

  // Construction types
  constructionTypes: [
    { value: 'basic', label: 'Basic', emoji: '🏠' },
    { value: 'standard', label: 'Standard', emoji: '🏡' },
    { value: 'premium', label: 'Premium', emoji: '🏘️' },
    { value: 'luxury', label: 'Luxury', emoji: '🏰' }
  ],

  // Time calculation factors
  timeFactors: {
    traditional: {
      base: 12,        // 12 months base time for 1000 sq ft
      perSqFt: 0.004   // +0.004 months per additional sq ft
    },
    prefab: {
      base: 4,         // 4 months base time for 1000 sq ft
      perSqFt: 0.0015  // +0.0015 months per additional sq ft
    }
  },

  // Cost breakdown percentages
  costBreakdown: {
    traditional: {
      materials: 0.45,  // 45% materials
      labor: 0.40,      // 40% labor
      others: 0.15      // 15% others (permits, overhead)
    },
    prefab: {
      modules: 0.60,    // 60% prefab modules
      assembly: 0.25,   // 25% assembly/installation
      others: 0.15      // 15% others (permits, overhead)
    }
  },

  // Benefits percentages
  benefits: {
    speed: 60,   // 60% faster construction
    quality: 95, // 95% better quality control
    waste: 70    // 70% less construction waste
  },

  // Default values
  defaults: {
    area: 1500,
    constructionType: 'standard',
    city: 'bangalore'
  }
};

// Helper functions
export const getCityMultiplier = (cityValue: string): number => {
  const city = priceCalculatorConfig.cities.find(c => c.value === cityValue);
  return city?.multiplier || 1.0;
};

export const getBaseCosts = (constructionType: string): CostConfig => {
  return priceCalculatorConfig.baseCosts[constructionType] || priceCalculatorConfig.baseCosts.standard;
};

export const calculateCosts = (
  area: number,
  constructionType: string,
  city: string
): {
  traditional: number;
  prefab: number;
  traditionalTotal: number;
  prefabTotal: number;
  savings: number;
  savingsPercentage: number;
} => {
  const baseCosts = getBaseCosts(constructionType);
  const cityMultiplier = getCityMultiplier(city);
  const { volumeDiscounts } = priceCalculatorConfig;

  // Calculate base cost per sq ft with city multiplier
  let traditionalPerSqFt = Math.round(baseCosts.traditional * cityMultiplier);
  let prefabPerSqFt = Math.round(baseCosts.prefab * cityMultiplier);

  // Apply volume discount for prefab if area > threshold
  if (area > volumeDiscounts.threshold) {
    const discountMultiplier = 1 - (volumeDiscounts.prefab / 100);
    prefabPerSqFt = Math.round(prefabPerSqFt * discountMultiplier);
  }

  // Calculate totals
  const traditionalTotal = traditionalPerSqFt * area;
  const prefabTotal = prefabPerSqFt * area;
  const savings = traditionalTotal - prefabTotal;
  const savingsPercentage = Math.round((savings / traditionalTotal) * 100);

  return {
    traditional: traditionalPerSqFt,
    prefab: prefabPerSqFt,
    traditionalTotal,
    prefabTotal,
    savings,
    savingsPercentage
  };
};

export const calculateTime = (area: number): {
  traditional: number;
  prefab: number;
  timeSaved: number;
} => {
  const { timeFactors } = priceCalculatorConfig;

  // Calculate traditional construction time
  const traditionalMonths = Math.round(
    timeFactors.traditional.base + (area * timeFactors.traditional.perSqFt)
  );

  // Calculate prefab construction time
  const prefabMonths = Math.round(
    timeFactors.prefab.base + (area * timeFactors.prefab.perSqFt)
  );

  const timeSaved = traditionalMonths - prefabMonths;

  return {
    traditional: traditionalMonths,
    prefab: prefabMonths,
    timeSaved
  };
};

export const formatCurrency = (amount: number, shortForm: boolean = false): string => {
  if (shortForm) {
    // Format in Crores if >= 1 Crore
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    }
    // Format in Lakhs if >= 1 Lakh
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }
  }
  // Default Indian number format
  return `₹${amount.toLocaleString('en-IN')}`;
};
