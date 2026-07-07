export type ComponentCategory = 'Panel' | 'Inverter' | 'Battery' | 'Structure' | 'Electrical' | 'Cable' | 'Earthing' | 'Service';

export interface SolarComponent {
  id: string;
  name: string;
  brand: string;
  category: ComponentCategory;
  spec: string;
  price: number; // Base price before GST
  unit: string; // e.g., 'nos', 'mtr', 'set'
  gstRate: number; // e.g., 5, 12, 18
  kWp?: number; // Only for panels to calculate total system capacity
}

export const individualComponents: SolarComponent[] = [
  // --- PANELS ---
  { id: 'p1', name: 'Tata 560Wp Mono PERC', brand: 'Tata Power', category: 'Panel', spec: '560Wp, DCR', price: 14500, unit: 'nos', gstRate: 5, kWp: 0.56 },
  { id: 'p2', name: 'Waaree 580Wp TOPCON', brand: 'Waaree', category: 'Panel', spec: '580Wp, N-Type TOPCON', price: 13800, unit: 'nos', gstRate: 5, kWp: 0.58 },
  { id: 'p3', name: 'Waaree 600Wp TOPCON', brand: 'Waaree', category: 'Panel', spec: '600Wp, N-Type TOPCON', price: 14200, unit: 'nos', gstRate: 5, kWp: 0.60 },
  { id: 'p4', name: 'Adani 580Wp TOPCON', brand: 'Adani Solar', category: 'Panel', spec: '580Wp, N-Type TOPCON', price: 13750, unit: 'nos', gstRate: 5, kWp: 0.58 },

  // --- INVERTERS ---
  { id: 'i1', name: 'String Inverter 3kW (1-Ph)', brand: 'Polycab / Shakti', category: 'Inverter', spec: '3kW, On-Grid, Single Phase', price: 35000, unit: 'nos', gstRate: 5 },
  { id: 'i2', name: 'String Inverter 5kW (1-Ph)', brand: 'Polycab / Shakti', category: 'Inverter', spec: '5kW, On-Grid, Single Phase', price: 48000, unit: 'nos', gstRate: 5 },
  { id: 'i3', name: 'String Inverter 10kW (3-Ph)', brand: 'Polycab / Shakti', category: 'Inverter', spec: '10kW, On-Grid, Three Phase', price: 85000, unit: 'nos', gstRate: 5 },
  { id: 'i4', name: 'Hybrid Inverter 3.6kW', brand: 'Servotech', category: 'Inverter', spec: '3.6kW, Hybrid, Battery Support', price: 55000, unit: 'nos', gstRate: 5 },
  { id: 'i5', name: 'Off-Grid Inverter 3kVA', brand: 'Standard', category: 'Inverter', spec: '3kVA, PWM/MPPT', price: 28000, unit: 'nos', gstRate: 5 },
  { id: 'i6', name: 'VFD Pump Drive 10HP', brand: 'INVT / Crompton', category: 'Inverter', spec: '10HP Solar VFD', price: 32000, unit: 'nos', gstRate: 5 },

  // --- BATTERIES ---
  { id: 'b1', name: 'Lithium Ion Battery', brand: 'Servotech', category: 'Battery', spec: '12.8V 100Ah, 2000 Cycles', price: 30000, unit: 'nos', gstRate: 5 },
  { id: 'b2', name: 'Tubular Battery 150Ah', brand: 'Exide / Luminous', category: 'Battery', spec: '12V 150Ah Tubular', price: 15500, unit: 'nos', gstRate: 18 }, // Batteries usually 18% standalone

  // --- STRUCTURES (BoS) ---
  { id: 's1', name: 'Module Mounting Structure', brand: 'Standard', category: 'Structure', spec: 'GI 80 Micron, Pre-galvanized', price: 1500, unit: 'per panel', gstRate: 18 },
  { id: 's2', name: 'Elevated Structure', brand: 'Standard', category: 'Structure', spec: 'High rise GI 80 Micron', price: 2500, unit: 'per panel', gstRate: 18 },

  // --- CABLES & BOXES (BoS) ---
  { id: 'c1', name: 'AC Distribution Box (ACDB)', brand: 'Standard', category: 'Electrical', spec: 'SPD, Changeover, MCB, Meter', price: 4500, unit: 'nos', gstRate: 18 },
  { id: 'c2', name: 'DC Distribution Box (DCDB)', brand: 'Standard', category: 'Electrical', spec: 'IP65 CRCA with DP MCB', price: 3500, unit: 'nos', gstRate: 18 },
  { id: 'c3', name: 'AC Cable (4 Sq mm)', brand: 'Polycab / KEI', category: 'Cable', spec: 'Copper Multi-strand', price: 150, unit: 'mtr', gstRate: 18 },
  { id: 'c4', name: 'DC Interconnecting Cable', brand: 'Polycab', category: 'Cable', spec: '4 Sq mm, UV Protected', price: 80, unit: 'mtr', gstRate: 18 },

  // --- EARTHING (BoS) ---
  { id: 'e1', name: 'Earthing Kit', brand: 'Standard', category: 'Earthing', spec: 'Copper Bonded Rod + Chemical', price: 2500, unit: 'set', gstRate: 18 },
  { id: 'e2', name: 'Earthing Wire (Al 10mm)', brand: 'Standard', category: 'Earthing', spec: 'Aluminum 10mm', price: 40, unit: 'mtr', gstRate: 18 },
  { id: 'e3', name: 'Lightning Arrestor', brand: 'Standard', category: 'Earthing', spec: 'Conventional Type 1.25" Dia', price: 1800, unit: 'set', gstRate: 18 },

  // --- SERVICES ---
  { id: 'srv1', name: 'Installation & Commissioning', brand: 'Krishnanuja', category: 'Service', spec: 'Standard residential installation', price: 25000, unit: 'system', gstRate: 18 },
  { id: 'srv2', name: 'Net Metering Liaison', brand: 'Krishnanuja', category: 'Service', spec: 'Discom liaison charges', price: 5000, unit: 'system', gstRate: 18 },
  { id: 'srv3', name: 'Annual O&M Contract', brand: 'Krishnanuja', category: 'Service', spec: '1 Year comprehensive maintenance', price: 8000, unit: 'year', gstRate: 18 },
];
