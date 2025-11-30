'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  INVESTMENT_TYPES, 
  INVESTMENT_TYPE_OPTIONS,
  FUND_TYPE_OPTIONS,
  BULLION_TYPE_OPTIONS,
  BULLION_FORM_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  INTEREST_FREQUENCY_OPTIONS,
  COMPOUNDING_TYPE_OPTIONS,
  InvestmentFormData,
  InvestmentTypeName,
  ClientMaster,
  InvestmentAvenueMaster
} from '@/lib/types';
import { apiService } from '@/lib/api';

const investmentSchema = z.object({
  client_code: z.string().min(1, 'Client code is required'),
  avenue_id: z.number().min(1, 'Investment avenue is required'),
  account_no: z.string().optional(),
  folio_no: z.string().optional(),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().optional(),
  investment_type: z.enum(Object.values(INVESTMENT_TYPES) as [string, ...string[]]),
  
  // Equity fields
  broker_code: z.string().optional(),
  stock_symbol: z.string().optional(),
  units: z.number().optional(),
  buy_price: z.number().optional(),
  current_price: z.number().optional(),
  buy_date: z.string().optional(),
  sell_date: z.string().optional(),
  
  // Demat fields
  dp_id: z.string().optional(),
  client_id: z.string().optional(),
  linked_bank: z.string().optional(),
  
  // Debt fields
  company_name: z.string().optional(),
  security_type: z.string().optional(),
  face_value: z.number().optional(),
  coupon_rate: z.number().optional(),
  issue_date: z.string().optional(),
  maturity_date: z.string().optional(),
  interest_freq: z.string().optional(),
  
  // Fixed Deposit fields
  bank_name: z.string().optional(),
  principal: z.number().optional(),
  interest_rate: z.number().optional(),
  compounding_type: z.string().optional(),
  
  // Mutual Fund fields
  amc: z.string().optional(),
  fund_name: z.string().optional(),
  fund_type: z.string().optional(),
  nav: z.number().optional(),
  exit_date: z.string().optional(),
  
  // PPF fields
  branch: z.string().optional(),
  deposits: z.number().optional(),
  
  // NSC fields
  certificate_no: z.string().optional(),
  purchase_amount: z.number().optional(),
  
  // NPS fields
  pran: z.string().optional(),
  contribution: z.number().optional(),
  pension_provider: z.string().optional(),
  
  // Bullion fields
  type: z.string().optional(),
  form: z.string().optional(),
  quantity: z.number().optional(),
  purchase_price: z.number().optional(),
  current_value: z.number().optional(),
  
  // Real Estate fields
  property_type: z.string().optional(),
  address: z.string().optional(),
  registration: z.string().optional(),
  purchase_date: z.string().optional(),
});

interface InvestmentFormProps {
  onSubmit: (data: InvestmentFormData) => void;
  onCancel: () => void;
  initialData?: Partial<InvestmentFormData>;
  isLoading?: boolean;
}

// Hardcoded investment avenues as fallback
const FALLBACK_INVESTMENT_AVENUES: InvestmentAvenueMaster[] = [
  { avenue_id: 1, avenue_name: 'Equity', investment_type: 'equity', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 2, avenue_name: 'Demat Account', investment_type: 'demat', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 3, avenue_name: 'Debt Securities', investment_type: 'debt', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 4, avenue_name: 'Fixed Deposit', investment_type: 'fixed_deposit', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 5, avenue_name: 'Mutual Fund', investment_type: 'mutual_fund', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 6, avenue_name: 'PPF', investment_type: 'ppf', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 7, avenue_name: 'NSC', investment_type: 'nsc', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 8, avenue_name: 'NPS', investment_type: 'nps', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 9, avenue_name: 'Bullion', investment_type: 'bullion', is_active: true, created_at: '', updated_at: '' },
  { avenue_id: 10, avenue_name: 'Real Estate', investment_type: 'real_estate', is_active: true, created_at: '', updated_at: '' },
];

export function InvestmentForm({ onSubmit, onCancel, initialData, isLoading = false }: InvestmentFormProps) {
  const [selectedType, setSelectedType] = useState<InvestmentTypeName>(INVESTMENT_TYPES.EQUITY);
  const [clients, setClients] = useState<ClientMaster[]>([]);
  const [investmentAvenues, setInvestmentAvenues] = useState<InvestmentAvenueMaster[]>(FALLBACK_INVESTMENT_AVENUES);
  const [loadingData, setLoadingData] = useState(true);
  
  const form = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      investment_type: INVESTMENT_TYPES.EQUITY,
      ...initialData,
    },
  });

  const watchedType = form.watch('investment_type') as InvestmentTypeName;

  useEffect(() => {
    setSelectedType(watchedType);
  }, [watchedType]);

  // Load clients and investment avenues on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);
        const [clientsData, avenuesData] = await Promise.all([
          apiService.getClients(),
          apiService.getInvestmentAvenues()
        ]);
        setClients(clientsData as ClientMaster[]);
        // Use fetched data if available, otherwise keep fallback
        if (Array.isArray(avenuesData) && avenuesData.length > 0) {
          setInvestmentAvenues(avenuesData as InvestmentAvenueMaster[]);
        }
      } catch (error) {
        console.error('Error loading form data:', error);
        // Keep using fallback data
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // Auto-set investment_type when avenue is selected
  const watchedAvenueId = form.watch('avenue_id');
  useEffect(() => {
    if (watchedAvenueId && investmentAvenues.length > 0) {
      const selectedAvenue = investmentAvenues.find(a => a.avenue_id === watchedAvenueId);
      if (selectedAvenue) {
        form.setValue('investment_type', selectedAvenue.investment_type as InvestmentTypeName);
        setSelectedType(selectedAvenue.investment_type as InvestmentTypeName);
      }
    }
  }, [watchedAvenueId, investmentAvenues]);

  const handleSubmit = (data: InvestmentFormData) => {
    console.log('Form submitted with data:', data);
    // Convert empty strings to undefined to avoid backend issues
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === 'string' && value.trim() === '' ? undefined : value
      ])
    ) as InvestmentFormData;
    onSubmit(cleanedData);
  };

  // const onFormError = (errors: any) => {
  //   console.log('Form validation errors:', errors);
  // };

  const renderEquityFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="broker_code">Broker Code</Label>
        <Input {...form.register('broker_code')} placeholder="Enter broker code" />
      </div>
      <div>
        <Label htmlFor="stock_symbol">Stock Symbol</Label>
        <Input {...form.register('stock_symbol')} placeholder="e.g., RELIANCE" />
      </div>
      <div>
        <Label htmlFor="units">Units</Label>
        <Input 
          type="number" 
          step="0.0001"
          {...form.register('units', { valueAsNumber: true })} 
          placeholder="Number of units" 
        />
      </div>
      <div>
        <Label htmlFor="buy_price">Buy Price (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('buy_price', { valueAsNumber: true })} 
          placeholder="Purchase price per unit" 
        />
      </div>
      <div>
        <Label htmlFor="current_price">Current Price (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('current_price', { valueAsNumber: true })} 
          placeholder="Current market price" 
        />
      </div>
      <div>
        <Label htmlFor="buy_date">Buy Date</Label>
        <Input type="date" {...form.register('buy_date')} />
      </div>
      <div>
        <Label htmlFor="sell_date">Sell Date (Optional)</Label>
        <Input type="date" {...form.register('sell_date')} />
      </div>
    </div>
  );

  const renderDematFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="dp_id">DP ID</Label>
        <Input {...form.register('dp_id')} placeholder="Depository Participant ID" />
      </div>
      <div>
        <Label htmlFor="client_id">Client ID</Label>
        <Input {...form.register('client_id')} placeholder="Client ID" />
      </div>
      <div>
        <Label htmlFor="broker_code">Broker Code</Label>
        <Input {...form.register('broker_code')} placeholder="Broker code" />
      </div>
      <div>
        <Label htmlFor="linked_bank">Linked Bank</Label>
        <Input {...form.register('linked_bank')} placeholder="Bank name" />
      </div>
    </div>
  );

  const renderDebtFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="company_name">Company Name</Label>
        <Input {...form.register('company_name')} placeholder="Issuing company" />
      </div>
      <div>
        <Label htmlFor="security_type">Security Type</Label>
        <Input {...form.register('security_type')} placeholder="e.g., Corporate Bond" />
      </div>
      <div>
        <Label htmlFor="face_value">Face Value (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('face_value', { valueAsNumber: true })} 
          placeholder="Face value per unit" 
        />
      </div>
      <div>
        <Label htmlFor="coupon_rate">Coupon Rate (%)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('coupon_rate', { valueAsNumber: true })} 
          placeholder="Annual interest rate" 
        />
      </div>
      <div>
        <Label htmlFor="issue_date">Issue Date</Label>
        <Input type="date" {...form.register('issue_date')} />
      </div>
      <div>
        <Label htmlFor="maturity_date">Maturity Date</Label>
        <Input type="date" {...form.register('maturity_date')} />
      </div>
      <div>
        <Label htmlFor="interest_freq">Interest Frequency</Label>
        <Controller
          name="interest_freq"
          control={form.control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {INTEREST_FREQUENCY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );

  const renderFixedDepositFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="bank_name">Bank Name</Label>
        <Input {...form.register('bank_name')} placeholder="Bank name" />
      </div>
      <div>
        <Label htmlFor="principal">Principal Amount (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('principal', { valueAsNumber: true })} 
          placeholder="Investment amount" 
        />
      </div>
      <div>
        <Label htmlFor="interest_rate">Interest Rate (%)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('interest_rate', { valueAsNumber: true })} 
          placeholder="Annual interest rate" 
        />
      </div>
      <div>
        <Label htmlFor="compounding_type">Compounding Type</Label>
        <Controller
          name="compounding_type"
          control={form.control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select compounding" />
              </SelectTrigger>
              <SelectContent>
                {COMPOUNDING_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="start_date">Start Date</Label>
        <Input type="date" {...form.register('start_date')} />
      </div>
      <div>
        <Label htmlFor="maturity_date">Maturity Date</Label>
        <Input type="date" {...form.register('maturity_date')} />
      </div>
    </div>
  );

  const renderMutualFundFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="amc">AMC (Asset Management Company)</Label>
        <Input {...form.register('amc')} placeholder="e.g., HDFC Mutual Fund" />
      </div>
      <div>
        <Label htmlFor="fund_name">Fund Name</Label>
        <Input {...form.register('fund_name')} placeholder="Fund name" />
      </div>
      <div>
        <Label htmlFor="fund_type">Fund Type</Label>
        <Controller
          name="fund_type"
          control={form.control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select fund type" />
              </SelectTrigger>
              <SelectContent>
                {FUND_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="folio_no">Folio Number</Label>
        <Input {...form.register('folio_no')} placeholder="Folio number" />
      </div>
      <div>
        <Label htmlFor="units">Units</Label>
        <Input 
          type="number" 
          step="0.0001"
          {...form.register('units', { valueAsNumber: true })} 
          placeholder="Number of units" 
        />
      </div>
      <div>
        <Label htmlFor="nav">NAV (₹)</Label>
        <Input 
          type="number" 
          step="0.0001"
          {...form.register('nav', { valueAsNumber: true })} 
          placeholder="Net Asset Value" 
        />
      </div>
      <div>
        <Label htmlFor="start_date">Start Date</Label>
        <Input type="date" {...form.register('start_date')} />
      </div>
      <div>
        <Label htmlFor="exit_date">Exit Date (Optional)</Label>
        <Input type="date" {...form.register('exit_date')} />
      </div>
    </div>
  );

  const renderPPFFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="account_no">Account Number</Label>
        <Input {...form.register('account_no')} placeholder="PPF account number" />
      </div>
      <div>
        <Label htmlFor="branch">Branch</Label>
        <Input {...form.register('branch')} placeholder="Bank branch" />
      </div>
      <div>
        <Label htmlFor="deposits">Total Deposits (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('deposits', { valueAsNumber: true })} 
          placeholder="Total deposits made" 
        />
      </div>
      <div>
        <Label htmlFor="interest_rate">Interest Rate (%)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('interest_rate', { valueAsNumber: true })} 
          placeholder="Current interest rate" 
        />
      </div>
      <div>
        <Label htmlFor="start_date">Start Date</Label>
        <Input type="date" {...form.register('start_date')} />
      </div>
      <div>
        <Label htmlFor="maturity_date">Maturity Date</Label>
        <Input type="date" {...form.register('maturity_date')} />
      </div>
    </div>
  );

  const renderNSCFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="certificate_no">Certificate Number</Label>
        <Input {...form.register('certificate_no')} placeholder="NSC certificate number" />
      </div>
      <div>
        <Label htmlFor="purchase_amount">Purchase Amount (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('purchase_amount', { valueAsNumber: true })} 
          placeholder="Investment amount" 
        />
      </div>
      <div>
        <Label htmlFor="interest_rate">Interest Rate (%)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('interest_rate', { valueAsNumber: true })} 
          placeholder="Interest rate" 
        />
      </div>
      <div>
        <Label htmlFor="issue_date">Issue Date</Label>
        <Input type="date" {...form.register('issue_date')} />
      </div>
      <div>
        <Label htmlFor="maturity_date">Maturity Date</Label>
        <Input type="date" {...form.register('maturity_date')} />
      </div>
    </div>
  );

  const renderNPSFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="pran">PRAN (Permanent Retirement Account Number)</Label>
        <Input {...form.register('pran')} placeholder="PRAN number" />
      </div>
      <div>
        <Label htmlFor="fund_type">Fund Type</Label>
        <Input {...form.register('fund_type')} placeholder="e.g., Equity, Debt, Hybrid" />
      </div>
      <div>
        <Label htmlFor="contribution">Total Contribution (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('contribution', { valueAsNumber: true })} 
          placeholder="Total contributions" 
        />
      </div>
      <div>
        <Label htmlFor="pension_provider">Pension Provider</Label>
        <Input {...form.register('pension_provider')} placeholder="Pension fund provider" />
      </div>
    </div>
  );

  const renderBullionFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="type">Type</Label>
        <Controller
          name="type"
          control={form.control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {BULLION_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="form">Form</Label>
        <Controller
          name="form"
          control={form.control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select form" />
              </SelectTrigger>
              <SelectContent>
                {BULLION_FORM_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input 
          type="number" 
          step="0.0001"
          {...form.register('quantity', { valueAsNumber: true })} 
          placeholder="Weight/quantity" 
        />
      </div>
      <div>
        <Label htmlFor="purchase_price">Purchase Price (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('purchase_price', { valueAsNumber: true })} 
          placeholder="Price per unit" 
        />
      </div>
      <div>
        <Label htmlFor="current_value">Current Value (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('current_value', { valueAsNumber: true })} 
          placeholder="Current market value" 
        />
      </div>
    </div>
  );

  const renderRealEstateFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="property_type">Property Type</Label>
        <Controller
          name="property_type"
          control={form.control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="registration">Registration Number</Label>
        <Input {...form.register('registration')} placeholder="Property registration number" />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="address">Address</Label>
        <Textarea {...form.register('address')} placeholder="Property address" />
      </div>
      <div>
        <Label htmlFor="purchase_price">Purchase Price (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('purchase_price', { valueAsNumber: true })} 
          placeholder="Purchase price" 
        />
      </div>
      <div>
        <Label htmlFor="current_value">Current Value (₹)</Label>
        <Input 
          type="number" 
          step="0.01"
          {...form.register('current_value', { valueAsNumber: true })} 
          placeholder="Current market value" 
        />
      </div>
      <div>
        <Label htmlFor="purchase_date">Purchase Date</Label>
        <Input type="date" {...form.register('purchase_date')} />
      </div>
    </div>
  );

  const renderInvestmentSpecificFields = () => {
    switch (selectedType) {
      case INVESTMENT_TYPES.EQUITY:
        return renderEquityFields();
      case INVESTMENT_TYPES.DEMAT:
        return renderDematFields();
      case INVESTMENT_TYPES.DEBT:
        return renderDebtFields();
      case INVESTMENT_TYPES.FIXED_DEPOSIT:
        return renderFixedDepositFields();
      case INVESTMENT_TYPES.MUTUAL_FUND:
        return renderMutualFundFields();
      case INVESTMENT_TYPES.PPF:
        return renderPPFFields();
      case INVESTMENT_TYPES.NSC:
        return renderNSCFields();
      case INVESTMENT_TYPES.NPS:
        return renderNPSFields();
      case INVESTMENT_TYPES.BULLION:
        return renderBullionFields();
      case INVESTMENT_TYPES.REAL_ESTATE:
        return renderRealEstateFields();
      default:
        return null;
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading form data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          handleSubmit,
          (errors) => console.error("Form validation errors:", errors)
        )}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Enter the investment information</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Hidden input for investment_type registration */}
            <input type="hidden" {...form.register("investment_type")} />

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Client Code */}
              <FormField
                control={form.control}
                name="client_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Code *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter client code (e.g., CLI001)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Investment Avenue */}
              <FormField
                control={form.control}
                name="avenue_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Avenue *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        disabled={loadingData}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              loadingData
                                ? "Loading avenues..."
                                : "Select investment avenue"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {investmentAvenues.map((avenue) => (
                            <SelectItem
                              key={avenue.avenue_id}
                              value={avenue.avenue_id.toString()}
                            >
                              {avenue.avenue_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account Number */}
              <FormField
                control={form.control}
                name="account_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Account number (if applicable)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Folio Number */}
              <FormField
                control={form.control}
                name="folio_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folio Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Folio number (if applicable)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Date */}
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Investment-Specific Fields */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                Investment-Specific Details
              </h3>
              {renderInvestmentSpecificFields()}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Investment"}
          </Button>
        </div>
      </form>
    </Form>

  );
}
