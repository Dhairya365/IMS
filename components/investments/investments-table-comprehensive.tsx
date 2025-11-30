'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import { InvestmentType, INVESTMENT_TYPES } from '@/lib/types';
import { apiService } from '@/lib/api';

interface InvestmentTableProps {
  searchTerm: string;
  filterType: string;
  onRefresh?: React.MutableRefObject<(() => void) | null>;
}

// Mock data for demonstration - replace with real API data
const mockInvestments: InvestmentType[] = [
  // Equity
  {
    detail_id: 1,
    broker_code: 'ZERODHA',
    stock_symbol: 'RELIANCE',
    units: 100,
    buy_price: 2500,
    current_price: 2875,
    buy_date: '2023-01-15',
    sell_date: '2023-02-15',
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2023-12-01T10:00:00Z',
  },
  // Fixed Deposit
  {
    detail_id: 2,
    bank_name: 'HDFC Bank',
    principal: 500000,
    interest_rate: 7.5,
    start_date: '2023-02-01',
    maturity_date: '2024-02-01',
    compounding_type: 'quarterly',
    created_at: '2023-02-01T10:00:00Z',
    updated_at: '2023-12-01T10:00:00Z',
  },
  // Mutual Fund
  {
    detail_id: 3,
    amc: 'HDFC Mutual Fund',
    fund_name: 'HDFC Equity Fund',
    fund_type: 'equity',
    folio_no: 'MF123456789',
    units: 500,
    nav: 45.50,
    start_date: '2023-03-01',
    exit_date: '2024-03-01',
    created_at: '2023-03-01T10:00:00Z',
    updated_at: '2023-12-01T10:00:00Z',
  },
  // PPF
  {
    detail_id: 4,
    account_no: 'PPF123456789',
    branch: 'SBI Main Branch',
    deposits: 150000,
    interest_rate: 7.1,
    start_date: '2020-04-01',
    maturity_date: '2035-04-01',
    created_at: '2020-04-01T10:00:00Z',
    updated_at: '2023-12-01T10:00:00Z',
  },
  // Bullion
  {
    detail_id: 5,
    type: 'gold',
    form: 'coin',
    quantity: 10,
    purchase_price: 50000,
    current_value: 65000,
    created_at: '2023-05-01T10:00:00Z',
    updated_at: '2023-12-01T10:00:00Z',
  },
  // Real Estate
  {
    detail_id: 6,
    property_type: 'residential',
    address: '123 Main Street, Mumbai',
    registration: 'REG123456789',
    purchase_price: 5000000,
    current_value: 6500000,
    purchase_date: '2020-01-01',
    created_at: '2020-01-01T10:00:00Z',
    updated_at: '2023-12-01T10:00:00Z',
  },
];

export function InvestmentsTableComprehensive({ searchTerm, filterType, onRefresh }: InvestmentTableProps) {
  const [editingInvestment, setEditingInvestment] = useState<InvestmentType | null>(null);
  const [investments, setInvestments] = useState<InvestmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load investments from API
  const loadInvestments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getInvestments();
      setInvestments(data);
    } catch (err) {
      console.error('Error loading investments:', err);
      setError('Failed to load investments');
      // Fallback to mock data for development
      setInvestments(mockInvestments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvestments();
  }, []);

  // Expose refresh function to parent component
  useEffect(() => {
    if (onRefresh) {
      onRefresh.current = loadInvestments;
    }
  }, [onRefresh]);

  const getInvestmentType = (investment: InvestmentType): string => {
    if ('stock_symbol' in investment) return 'Equity';
    if ('dp_id' in investment) return 'Demat';
    if ('company_name' in investment) return 'Debt';
    if ('bank_name' in investment) return 'Fixed Deposit';
    if ('fund_name' in investment) return 'Mutual Fund';
    if ('account_no' in investment && 'branch' in investment) return 'PPF';
    if ('certificate_no' in investment) return 'NSC';
    if ('pran' in investment) return 'NPS';
    if ('type' in investment && 'form' in investment) return 'Bullion';
    if ('property_type' in investment) return 'Real Estate';
    return 'Unknown';
  };

  const getInvestmentName = (investment: InvestmentType): string => {
    if ('stock_symbol' in investment) return investment.stock_symbol;
    if ('fund_name' in investment) return investment.fund_name;
    if ('bank_name' in investment) return investment.bank_name;
    if ('company_name' in investment) return investment.company_name;
    if ('account_no' in investment) return `PPF ${investment.account_no}`;
    if ('certificate_no' in investment) return `NSC ${investment.certificate_no}`;
    if ('pran' in investment) return `NPS ${investment.pran}`;
    if ('type' in investment) return `${investment.type} ${investment.form}`;
    if ('property_type' in investment) return `${investment.property_type} Property`;
    return 'Unknown Investment';
  };

  const getInvestmentValue = (investment: InvestmentType): number => {
    if ('current_price' in investment && 'units' in investment) {
      return investment.current_price * investment.units;
    }
    if ('principal' in investment) return investment.principal;
    if ('nav' in investment && 'units' in investment) {
      return investment.nav * investment.units;
    }
    if ('deposits' in investment) return investment.deposits;
    if ('purchase_amount' in investment) return investment.purchase_amount;
    if ('contribution' in investment) return investment.contribution;
    if ('current_value' in investment) return investment.current_value;
    return 0;
  };

  const getPurchaseValue = (investment: InvestmentType): number => {
    if ('buy_price' in investment && 'units' in investment) {
      return investment.buy_price * investment.units;
    }
    if ('principal' in investment) return investment.principal;
    if ('nav' in investment && 'units' in investment) {
      return investment.nav * investment.units;
    }
    if ('deposits' in investment) return investment.deposits;
    if ('purchase_amount' in investment) return investment.purchase_amount;
    if ('contribution' in investment) return investment.contribution;
    if ('purchase_price' in investment) return investment.purchase_price;
    return 0;
  };

  const getReturns = (investment: InvestmentType): { amount: number; percentage: number } => {
    const currentValue = getInvestmentValue(investment);
    const purchaseValue = getPurchaseValue(investment);
    const amount = currentValue - purchaseValue;
    const percentage = purchaseValue > 0 ? (amount / purchaseValue) * 100 : 0;
    return { amount, percentage };
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch = getInvestmentName(investment).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || getInvestmentType(investment).toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (investment: InvestmentType) => {
    setEditingInvestment(investment);
  };

  const handleDelete = (investment: InvestmentType) => {
    // Implement delete functionality
    console.log('Delete investment:', investment);
  };

  const handleView = (investment: InvestmentType) => {
    // Implement view functionality
    console.log('View investment:', investment);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Loading investments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8 text-destructive">
          <p>{error}</p>
          <p className="text-sm text-muted-foreground mt-2">Using sample data for demonstration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Purchase Value</TableHead>
            <TableHead>Current Value</TableHead>
            <TableHead>Returns</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvestments.map((investment) => {
            const returns = getReturns(investment);
            const investmentType = getInvestmentType(investment);
            const investmentName = getInvestmentName(investment);
            const currentValue = getInvestmentValue(investment);
            const purchaseValue = getPurchaseValue(investment);

            return (
              <TableRow key={investment.detail_id}>
                <TableCell>
                  <Badge variant="outline">{investmentType}</Badge>
                </TableCell>
                <TableCell className="font-medium">{investmentName}</TableCell>
                <TableCell>{formatCurrency(purchaseValue)}</TableCell>
                <TableCell>{formatCurrency(currentValue)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {returns.amount >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={returns.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(returns.amount)} ({returns.percentage.toFixed(2)}%)
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {formatDate(
                    'start_date' in investment ? investment.start_date :
                    'buy_date' in investment ? investment.buy_date :
                    'issue_date' in investment ? investment.issue_date :
                    'purchase_date' in investment ? investment.purchase_date :
                    'created_at' in investment ? investment.created_at : ''
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Active</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(investment)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(investment)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(investment)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {filteredInvestments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No investments found matching your criteria.
        </div>
      )}
    </div>
  );
}
