// Client Types
export interface ClientMaster {
  client_code: string;
  group_name: string;
  client_name: string;
  pan: string;
  aadhaar: string;
  mobile: string;
  email: string;
  dob: string;
  address: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvestmentAvenueMaster {
  avenue_id: number;
  avenue_name: string;
  investment_type: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientDetailMaster {
  detail_id: number;
  client_code: string;
  avenue_id: number;
  account_no?: string;
  folio_no?: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Investment Types
export interface Equity {
  detail_id: number;
  broker_code: string;
  stock_symbol: string;
  units: number;
  buy_price: number;
  current_price: number;
  buy_date: string;
  sell_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Demat {
  detail_id: number;
  dp_id: string;
  client_id: string;
  broker_code: string;
  linked_bank: string;
  created_at: string;
  updated_at: string;
}

export interface Debt {
  detail_id: number;
  company_name: string;
  security_type: string;
  face_value: number;
  coupon_rate: number;
  issue_date: string;
  maturity_date: string;
  interest_freq: string; // Monthly, Quarterly, Annual
  created_at: string;
  updated_at: string;
}

export interface FixedDeposit {
  detail_id: number;
  bank_name: string;
  principal: number;
  interest_rate: number;
  start_date: string;
  maturity_date: string;
  compounding_type: string; // Annual, Quarterly, Monthly
  created_at: string;
  updated_at: string;
}

export interface MutualFund {
  detail_id: number;
  amc: string; // Asset Management Company
  fund_name: string;
  fund_type: string; // Equity, Debt, Hybrid
  folio_no: string;
  units: number;
  nav: number;
  start_date: string;
  exit_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PPF {
  detail_id: number;
  account_no: string;
  branch: string;
  deposits: number;
  interest_rate: number;
  start_date: string;
  maturity_date: string;
  created_at: string;
  updated_at: string;
}

export interface NSC {
  detail_id: number;
  certificate_no: string;
  purchase_amount: number;
  interest_rate: number;
  issue_date: string;
  maturity_date: string;
  created_at: string;
  updated_at: string;
}

export interface NPS {
  detail_id: number;
  pran: string; // Permanent Retirement Account Number
  fund_type: string;
  contribution: number;
  pension_provider: string;
  created_at: string;
  updated_at: string;
}

export interface Bullion {
  detail_id: number;
  type: string; // Gold, Silver
  form: string; // Coin, Bar, Jewelry
  quantity: number;
  purchase_price: number;
  current_value: number;
  created_at: string;
  updated_at: string;
}

export interface RealEstate {
  detail_id: number;
  property_type: string; // Residential, Commercial
  address: string;
  registration: string;
  purchase_price: number;
  current_value: number;
  purchase_date: string;
  created_at: string;
  updated_at: string;
}

// Union type for all investment types
export type InvestmentType = 
  | Equity 
  | Demat 
  | Debt 
  | FixedDeposit 
  | MutualFund 
  | PPF 
  | NSC 
  | NPS 
  | Bullion 
  | RealEstate;

// Investment type names
export const INVESTMENT_TYPES = {
  EQUITY: 'equity',
  DEMAT: 'demat',
  DEBT: 'debt',
  FIXED_DEPOSIT: 'fixed_deposit',
  MUTUAL_FUND: 'mutual_fund',
  PPF: 'ppf',
  NSC: 'nsc',
  NPS: 'nps',
  BULLION: 'bullion',
  REAL_ESTATE: 'real_estate',
} as const;

export type InvestmentTypeName = typeof INVESTMENT_TYPES[keyof typeof INVESTMENT_TYPES];

// Form data types for creating/updating investments
export interface InvestmentFormData {
  // Common fields
  client_code: string;
  avenue_id: number;
  account_no?: string;
  folio_no?: string;
  start_date: string;
  end_date?: string;
  
  // Investment-specific fields
  investment_type: InvestmentTypeName;
  
  // Equity fields
  broker_code?: string;
  stock_symbol?: string;
  units?: number;
  buy_price?: number;
  current_price?: number;
  buy_date?: string;
  sell_date?: string;
  
  // Demat fields
  dp_id?: string;
  client_id?: string;
  linked_bank?: string;
  
  // Debt fields
  company_name?: string;
  security_type?: string;
  face_value?: number;
  coupon_rate?: number;
  issue_date?: string;
  maturity_date?: string;
  interest_freq?: string;
  
  // Fixed Deposit fields
  bank_name?: string;
  principal?: number;
  interest_rate?: number;
  compounding_type?: string;
  
  // Mutual Fund fields
  amc?: string;
  fund_name?: string;
  fund_type?: string;
  nav?: number;
  exit_date?: string;
  
  // PPF fields
  branch?: string;
  deposits?: number;
  
  // NSC fields
  certificate_no?: string;
  purchase_amount?: number;
  
  // NPS fields
  pran?: string;
  contribution?: number;
  pension_provider?: string;
  
  // Bullion fields
  type?: string;
  form?: string;
  quantity?: number;
  purchase_price?: number;
  current_value?: number;
  
  // Real Estate fields
  property_type?: string;
  address?: string;
  registration?: string;
  purchase_date?: string;
}

// Select options for dropdowns
export const INVESTMENT_TYPE_OPTIONS = [
  { value: INVESTMENT_TYPES.EQUITY, label: 'Equity' },
  { value: INVESTMENT_TYPES.DEMAT, label: 'Demat Account' },
  { value: INVESTMENT_TYPES.DEBT, label: 'Debt Securities' },
  { value: INVESTMENT_TYPES.FIXED_DEPOSIT, label: 'Fixed Deposit' },
  { value: INVESTMENT_TYPES.MUTUAL_FUND, label: 'Mutual Fund' },
  { value: INVESTMENT_TYPES.PPF, label: 'PPF' },
  { value: INVESTMENT_TYPES.NSC, label: 'NSC/NSS' },
  { value: INVESTMENT_TYPES.NPS, label: 'NPS' },
  { value: INVESTMENT_TYPES.BULLION, label: 'Bullion' },
  { value: INVESTMENT_TYPES.REAL_ESTATE, label: 'Real Estate' },
];

export const FUND_TYPE_OPTIONS = [
  { value: 'equity', label: 'Equity' },
  { value: 'debt', label: 'Debt' },
  { value: 'hybrid', label: 'Hybrid' },
];

export const BULLION_TYPE_OPTIONS = [
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' },
];

export const BULLION_FORM_OPTIONS = [
  { value: 'coin', label: 'Coin' },
  { value: 'bar', label: 'Bar' },
  { value: 'jewelry', label: 'Jewelry' },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
];

export const INTEREST_FREQUENCY_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual', label: 'Annual' },
];

export const COMPOUNDING_TYPE_OPTIONS = [
  { value: 'annual', label: 'Annual' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'monthly', label: 'Monthly' },
];
