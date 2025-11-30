import { authService } from './auth';
import { InvestmentFormData, InvestmentType, INVESTMENT_TYPES } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiService {
  private async getHeaders(): Promise<HeadersInit> {
    const jwt = await authService.getJWT();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = await this.getHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized - redirect to login
          await authService.logout();
          window.location.href = '/auth/login';
          throw new Error('Unauthorized');
        }
        
        const errorData = await response.json().catch(() => ({}));
        console.error('API error details:', errorData);
        throw new Error(errorData.detail || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Client endpoints
  async getClients() {
    return this.request('/clients/');
  }

  async getClient(id: string) {
    return this.request(`/clients/${id}/`);
  }

  async createClient(data: any) {
    return this.request('/clients/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateClient(id: string, data: any) {
    return this.request(`/clients/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteClient(id: string) {
    return this.request(`/clients/${id}/`, {
      method: 'DELETE',
    });
  }

  // Investment Avenue endpoints
  async getInvestmentAvenues() {
    return this.request('/investment-avenues/');
  }

  async getInvestmentAvenue(id: string) {
    return this.request(`/investment-avenues/${id}/`);
  }

  async createInvestmentAvenue(data: any) {
    return this.request('/investment-avenues/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInvestmentAvenue(id: string, data: any) {
    return this.request(`/investment-avenues/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInvestmentAvenue(id: string) {
    return this.request(`/investment-avenues/${id}/`, {
      method: 'DELETE',
    });
  }

  // Investment endpoints
  async getInvestments(): Promise<InvestmentType[]> {
    return this.request<InvestmentType[]>('/investments/');
  }

  async getInvestment(id: string) {
    return this.request(`/investments/${id}/`);
  }

  private transformInvestmentData(formData: InvestmentFormData) {
    // First, create the client detail master record
    const clientDetailData = {
      client_code: formData.client_code,
      avenue_id: formData.avenue_id,
      account_no: formData.account_no,
      folio_no: formData.folio_no,
      start_date: formData.start_date,
      end_date: formData.end_date,
    };
    
    // Remove empty values from optional fields in client detail
    if (!clientDetailData.account_no || clientDetailData.account_no.trim() === '') {
      delete clientDetailData.account_no;
    }
    if (!clientDetailData.folio_no || clientDetailData.folio_no.trim() === '') {
      delete clientDetailData.folio_no;
    }
    if (!clientDetailData.end_date || clientDetailData.end_date.trim() === '') {
      delete clientDetailData.end_date;
    }

    // Then create the specific investment type data
    let investmentSpecificData = {};

    switch (formData.investment_type) {
      case INVESTMENT_TYPES.EQUITY:
        investmentSpecificData = {
          broker_code: formData.broker_code,
          stock_symbol: formData.stock_symbol,
          units: formData.units,
          buy_price: formData.buy_price,
          current_price: formData.current_price,
          buy_date: formData.buy_date,
          sell_date: formData.sell_date,
        };
        break;

      case INVESTMENT_TYPES.DEMAT:
        investmentSpecificData = {
          dp_id: formData.dp_id,
          client_id: formData.client_id,
          broker_code: formData.broker_code,
          linked_bank: formData.linked_bank,
        };
        break;

      case INVESTMENT_TYPES.DEBT:
        investmentSpecificData = {
          company_name: formData.company_name,
          security_type: formData.security_type,
          face_value: formData.face_value,
          coupon_rate: formData.coupon_rate,
          issue_date: formData.issue_date,
          maturity_date: formData.maturity_date,
          interest_freq: formData.interest_freq,
        };
        break;

      case INVESTMENT_TYPES.FIXED_DEPOSIT:
        investmentSpecificData = {
          bank_name: formData.bank_name,
          principal: formData.principal,
          interest_rate: formData.interest_rate,
          start_date: formData.start_date,
          maturity_date: formData.maturity_date,
          compounding_type: formData.compounding_type,
        };
        break;

      case INVESTMENT_TYPES.MUTUAL_FUND:
        investmentSpecificData = {
          amc: formData.amc,
          fund_name: formData.fund_name,
          fund_type: formData.fund_type,
          folio_no: formData.folio_no,
          units: formData.units,
          nav: formData.nav,
          start_date: formData.start_date,
          exit_date: formData.exit_date,
        };
        break;

      case INVESTMENT_TYPES.PPF:
        investmentSpecificData = {
          account_no: formData.account_no,
          branch: formData.branch,
          deposits: formData.deposits,
          interest_rate: formData.interest_rate,
          start_date: formData.start_date,
          maturity_date: formData.maturity_date,
        };
        break;

      case INVESTMENT_TYPES.NSC:
        investmentSpecificData = {
          certificate_no: formData.certificate_no,
          purchase_amount: formData.purchase_amount,
          interest_rate: formData.interest_rate,
          issue_date: formData.issue_date,
          maturity_date: formData.maturity_date,
        };
        break;

      case INVESTMENT_TYPES.NPS:
        investmentSpecificData = {
          pran: formData.pran,
          fund_type: formData.fund_type,
          contribution: formData.contribution,
          pension_provider: formData.pension_provider,
        };
        break;

      case INVESTMENT_TYPES.BULLION:
        investmentSpecificData = {
          type: formData.type,
          form: formData.form,
          quantity: formData.quantity,
          purchase_price: formData.purchase_price,
          current_value: formData.current_value,
        };
        break;

      case INVESTMENT_TYPES.REAL_ESTATE:
        investmentSpecificData = {
          property_type: formData.property_type,
          address: formData.address,
          registration: formData.registration,
          purchase_price: formData.purchase_price,
          current_value: formData.current_value,
          purchase_date: formData.purchase_date,
        };
        break;

      default:
        throw new Error(`Unsupported investment type: ${formData.investment_type}`);
    }

    // Remove null/undefined/empty string values
    const cleanInvestmentData = Object.fromEntries(
      Object.entries(investmentSpecificData).filter(([_, value]) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string' && value.trim() === '') return false;
        return true;
      })
    );

    return {
      client_detail: clientDetailData,
      investment_type: formData.investment_type,
      investment_data: cleanInvestmentData,
    };
  }

  async createInvestment(formData: InvestmentFormData) {
    const transformedData = this.transformInvestmentData(formData);
    console.log('Transformed investment data:', JSON.stringify(transformedData, null, 2));
    return this.request('/investments/', {
      method: 'POST',
      body: JSON.stringify(transformedData),
    });
  }

  async updateInvestment(id: string, data: any) {
    return this.request(`/investments/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInvestment(id: string) {
    return this.request(`/investments/${id}/`, {
      method: 'DELETE',
    });
  }

  // Reports endpoints
  async getReports() {
    return this.request('/reports/');
  }

  async generateReport(type: string, params: any = {}) {
    return this.request(`/reports/${type}/`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Notifications endpoints
  async getNotifications() {
    return this.request('/notifications/');
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read/`, {
      method: 'POST',
    });
  }

  // Dashboard data
  async getDashboardData() {
    return this.request('/dashboard/');
  }

  // Portfolio summary
  async getPortfolioSummary() {
    return this.request('/portfolio/summary/');
  }
}

export const apiService = new ApiService();
