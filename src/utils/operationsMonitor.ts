// Real-time Operations Monitor for SimplyPrefab Backend Services
// Monitors Firestore, Razorpay, Resend, and WhatsApp API operations

import { CONFIG, isDevelopment } from './config';

export interface OperationLog {
  id: string;
  type: 'firestore' | 'payment' | 'email' | 'whatsapp';
  operation: string;
  status: 'pending' | 'processing' | 'success' | 'error' | 'warning';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  data?: any;
  error?: string;
  retryCount: number;
  metadata?: Record<string, any>;
}

export interface ServiceHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  lastCheck: Date;
  errorRate: number;
  uptime: number;
}

class OperationsMonitor {
  private static instance: OperationsMonitor;
  private operations: Map<string, OperationLog> = new Map();
  private listeners: ((operations: OperationLog[]) => void)[] = [];
  private healthListeners: ((health: ServiceHealth[]) => void)[] = [];
  private serviceHealth: Map<string, ServiceHealth> = new Map();

  static getInstance(): OperationsMonitor {
    if (!OperationsMonitor.instance) {
      OperationsMonitor.instance = new OperationsMonitor();
    }
    return OperationsMonitor.instance;
  }

  constructor() {
    this.initializeServices();
    this.startHealthChecks();
  }

  private initializeServices() {
    const services = ['firestore', 'payment', 'email', 'whatsapp'];
    services.forEach(service => {
      this.serviceHealth.set(service, {
        service,
        status: 'healthy',
        responseTime: 0,
        lastCheck: new Date(),
        errorRate: 0,
        uptime: 100
      });
    });
  }

  private startHealthChecks() {
    setInterval(() => {
      this.performHealthChecks();
    }, 30000); // Every 30 seconds
  }

  // Start tracking an operation
  startOperation(
    type: OperationLog['type'], 
    operation: string, 
    data?: any,
    metadata?: Record<string, any>
  ): string {
    const id = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const operationLog: OperationLog = {
      id,
      type,
      operation,
      status: 'pending',
      startTime: new Date(),
      data,
      retryCount: 0,
      metadata
    };

    this.operations.set(id, operationLog);
    this.notifyListeners();
    
    console.log(`🟡 Started ${type} operation: ${operation}`);
    return id;
  }

  // Update operation status
  updateOperation(
    id: string, 
    status: OperationLog['status'], 
    error?: string,
    additionalData?: any
  ): void {
    const operation = this.operations.get(id);
    if (!operation) return;

    const now = new Date();
    const updatedOperation: OperationLog = {
      ...operation,
      status,
      error,
      data: additionalData || operation.data
    };

    if (status === 'success' || status === 'error') {
      updatedOperation.endTime = now;
      updatedOperation.duration = now.getTime() - operation.startTime.getTime();
    }

    this.operations.set(id, updatedOperation);
    this.updateServiceHealth(operation.type, status, updatedOperation.duration || 0);
    this.notifyListeners();

    const statusEmoji = {
      pending: '🟡',
      processing: '🔄',
      success: '✅',
      error: '❌',
      warning: '⚠️'
    };

    console.log(`${statusEmoji[status]} ${operation.type} operation ${status}: ${operation.operation}${error ? ` - ${error}` : ''}`);
  }

  // Retry failed operation
  retryOperation(id: string): void {
    const operation = this.operations.get(id);
    if (!operation) return;

    const retryOperation: OperationLog = {
      ...operation,
      status: 'pending',
      retryCount: operation.retryCount + 1,
      startTime: new Date(),
      endTime: undefined,
      duration: undefined,
      error: undefined
    };

    this.operations.set(id, retryOperation);
    this.notifyListeners();
    
    console.log(`🔄 Retrying ${operation.type} operation (attempt ${retryOperation.retryCount + 1}): ${operation.operation}`);
  }

  // Get operation history
  getOperations(limit?: number): OperationLog[] {
    const operations = Array.from(this.operations.values())
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
    
    return limit ? operations.slice(0, limit) : operations;
  }

  // Get operations by type
  getOperationsByType(type: OperationLog['type'], limit?: number): OperationLog[] {
    const operations = this.getOperations()
      .filter(op => op.type === type);
    
    return limit ? operations.slice(0, limit) : operations;
  }

  // Subscribe to operation updates
  subscribe(callback: (operations: OperationLog[]) => void): () => void {
    this.listeners.push(callback);
    // Send initial data
    callback(this.getOperations(10));
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Subscribe to health updates
  subscribeToHealth(callback: (health: ServiceHealth[]) => void): () => void {
    this.healthListeners.push(callback);
    // Send initial data
    callback(Array.from(this.serviceHealth.values()));
    
    // Return unsubscribe function
    return () => {
      this.healthListeners = this.healthListeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    const operations = this.getOperations(10);
    this.listeners.forEach(callback => callback(operations));
  }

  private notifyHealthListeners(): void {
    const health = Array.from(this.serviceHealth.values());
    this.healthListeners.forEach(callback => callback(health));
  }

  private updateServiceHealth(
    service: string, 
    status: OperationLog['status'], 
    responseTime: number
  ): void {
    const health = this.serviceHealth.get(service);
    if (!health) return;

    const isError = status === 'error';
    const newErrorRate = isError ? 
      Math.min(health.errorRate + 5, 100) : 
      Math.max(health.errorRate - 1, 0);

    const newUptime = isError ? 
      Math.max(health.uptime - 2, 0) : 
      Math.min(health.uptime + 0.1, 100);

    let serviceStatus: ServiceHealth['status'] = 'healthy';
    if (newErrorRate > 50 || newUptime < 50) {
      serviceStatus = 'down';
    } else if (newErrorRate > 20 || newUptime < 80) {
      serviceStatus = 'degraded';
    }

    this.serviceHealth.set(service, {
      ...health,
      status: serviceStatus,
      responseTime: responseTime || health.responseTime,
      lastCheck: new Date(),
      errorRate: newErrorRate,
      uptime: newUptime
    });

    this.notifyHealthListeners();
  }

  private async performHealthChecks(): Promise<void> {
    const services = ['firestore', 'payment', 'email', 'whatsapp'];
    
    for (const service of services) {
      try {
        const startTime = Date.now();
        const isHealthy = await this.checkServiceHealth(service);
        const responseTime = Date.now() - startTime;
        
        this.updateServiceHealth(
          service, 
          isHealthy ? 'success' : 'error', 
          responseTime
        );
      } catch (error) {
        this.updateServiceHealth(service, 'error', 5000);
      }
    }
  }

  private async checkServiceHealth(service: string): Promise<boolean> {
    if (isDevelopment) {
      // In development, simulate health checks
      return Math.random() > 0.1; // 90% healthy
    }

    switch (service) {
      case 'firestore':
        return this.checkFirestoreHealth();
      case 'payment':
        return this.checkRazorpayHealth();
      case 'email':
        return this.checkResendHealth();
      case 'whatsapp':
        return this.checkWhatsAppHealth();
      default:
        return false;
    }
  }

  private async checkFirestoreHealth(): Promise<boolean> {
    try {
      // In a real implementation, you would:
      // 1. Try to read from Firestore
      // 2. Check connection status
      // 3. Verify write permissions
      return true;
    } catch (error) {
      console.error('Firestore health check failed:', error);
      return false;
    }
  }

  private async checkRazorpayHealth(): Promise<boolean> {
    try {
      // In a real implementation, you would:
      // 1. Ping Razorpay API endpoint
      // 2. Verify API credentials
      // 3. Check rate limits
      return CONFIG.RAZORPAY.KEY_ID !== 'YOUR_RAZORPAY_KEY_ID';
    } catch (error) {
      console.error('Razorpay health check failed:', error);
      return false;
    }
  }

  private async checkResendHealth(): Promise<boolean> {
    try {
      // In a real implementation, you would:
      // 1. Test Resend API connectivity
      // 2. Verify API key validity
      // 3. Check sending quotas
      return CONFIG.RESEND.API_KEY !== 're_DgNLjkPf_aNoU8k6JsESkL3zeVhb3tqZ3';
    } catch (error) {
      console.error('Resend health check failed:', error);
      return false;
    }
  }

  private async checkWhatsAppHealth(): Promise<boolean> {
    try {
      // In a real implementation, you would:
      // 1. Check WhatsApp Business API status
      // 2. Verify webhook connectivity
      // 3. Test message sending permissions
      return CONFIG.WHATSAPP.ACCESS_TOKEN !== 'YOUR_WHATSAPP_ACCESS_TOKEN';
    } catch (error) {
      console.error('WhatsApp health check failed:', error);
      return false;
    }
  }

  // Clear old operations (keep last 100)
  cleanup(): void {
    const operations = Array.from(this.operations.entries())
      .sort(([, a], [, b]) => b.startTime.getTime() - a.startTime.getTime())
      .slice(0, 100);

    this.operations.clear();
    operations.forEach(([id, operation]) => {
      this.operations.set(id, operation);
    });

    console.log('🧹 Cleaned up operations history');
  }

  // Get service statistics
  getServiceStats(service: string): {
    totalOperations: number;
    successRate: number;
    averageResponseTime: number;
    recentErrors: OperationLog[];
  } {
    const operations = this.getOperationsByType(service as OperationLog['type']);
    const totalOperations = operations.length;
    const successfulOperations = operations.filter(op => op.status === 'success').length;
    const successRate = totalOperations > 0 ? (successfulOperations / totalOperations) * 100 : 0;
    
    const operationsWithDuration = operations.filter(op => op.duration);
    const averageResponseTime = operationsWithDuration.length > 0 
      ? operationsWithDuration.reduce((sum, op) => sum + (op.duration || 0), 0) / operationsWithDuration.length 
      : 0;

    const recentErrors = operations
      .filter(op => op.status === 'error')
      .slice(0, 5);

    return {
      totalOperations,
      successRate,
      averageResponseTime,
      recentErrors
    };
  }
}

// Export singleton instance
export default OperationsMonitor;