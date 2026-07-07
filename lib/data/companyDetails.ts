// Savings Calculator Constants
export const savingsConfig = {
  unitsPerKwPerDay: 4,      // Average units generated per KW per day
  daysPerYear: 365,
  gridCostPerUnit: 6.5,     // Average cost per unit from grid (Rs.)
};

// Calculate savings data
export const calculateSavings = (
  capacityKw: number,
  totalCost: number,
  totalSubsidy: number = 0
) => {
  const unitsPerDay = capacityKw * savingsConfig.unitsPerKwPerDay;
  const annualUnits = unitsPerDay * savingsConfig.daysPerYear;
  const annualSavings = annualUnits * savingsConfig.gridCostPerUnit;
  const netCost = Math.max(0, totalCost - totalSubsidy);
  const roiYears = annualSavings > 0 ? netCost / annualSavings : 0;

  return {
      unitsPerDay: Math.round(unitsPerDay * 100) / 100,
      annualUnits: Math.round(annualUnits * 100) / 100,
      annualSavings: Math.round(annualSavings * 100) / 100,
      totalSubsidy,
      netCost,
      roiYears: Math.round(roiYears * 10) / 10,
  };
};

// Default Terms by System Type
export const defaultTerms = {
  'On-grid': [
      'Payment: 10% Advance on structure installation.',
      'Delivery: 85% Before delivery of kit. 5% Post installation.',
      'Insurance: Freight and transit insurance included.',
      'Discom: Net meter fee charged directly to electricity bill.',
      'Consumer Scope: Structure elevation & civil material.',
      'Permits: Name change/Load increment charged extra.',
      'Structure: 80 Micron GI Sheet with wind resistance.',
      'Support: Assistance in Net Metering documentation.',
      'Grid Voltage: 185V to 275V without frequent fluctuation.',
      'Delivery Timeline: Within 4 weeks from confirmed order.',
      'Installation: Within 45 days from confirmed order & payment.',
      'AC Wire: Up to 10m included. Extra charged as per actual.',
      'Earthing Wire: Up to 30m included. Extra charged as per actual.',
      'Warranty: Solar Module 25 Years, PCU 5 Years. External damages not covered.',
  ],
  'Off-grid': [
      'Payment: 50% Advance. 50% Before delivery.',
      'Insurance: Freight and transit insurance included.',
      'Consumer Scope: Structure elevation & civil material.',
      'Delivery Timeline: Within 4 weeks from confirmed order.',
      'Installation: Within 45 days from confirmed order & payment.',
      'AC Wire: Up to 10m included. Extra charged as per actual.',
      'Earthing Wire: Up to 30m included. Extra charged as per actual.',
      'Warranty: Solar Module 25 Years, Inverter 2 Years, Battery 2 Years.',
  ],
  'Hybrid': [
      'Payment: 10% Advance on structure installation.',
      'Delivery: 85% Before delivery of kit. 5% Post installation.',
      'Insurance: Freight and transit insurance included.',
      'Discom: Net meter fee charged directly to electricity bill.',
      'Consumer Scope: Structure elevation & civil material.',
      'Permits: Name change/Load increment charged extra.',
      'Structure: 80 Micron GI Sheet with wind resistance.',
      'Support: Assistance in Net Metering documentation.',
      'Grid Voltage: 185V to 275V without frequent fluctuation.',
      'Delivery Timeline: Within 4 weeks from confirmed order.',
      'Installation: Within 45 days from confirmed order & payment.',
      'AC Wire: Up to 10m included. Extra charged as per actual.',
      'Earthing Wire: Up to 30m included. Extra charged as per actual.',
      'Warranty: Solar Module 25 Years, Hybrid Inverter 5 Years, Li-Ion Battery 5 Years.',
  ],
  'VFD/Drive': [
      'Payment: 50% Advance with order confirmation.',
      'Delivery: 50% Before delivery.',
      'Insurance: Freight and transit insurance included.',
      'Installation: Charges as per site conditions.',
      'Warranty: VFD 2 Years, Solar Modules 25 Years.',
  ],
};
