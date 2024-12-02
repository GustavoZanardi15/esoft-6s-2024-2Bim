import { Injectable } from '@nestjs/common';
import * as promClient from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly counter: promClient.Counter<string>;
  private readonly gauge: promClient.Gauge<string>;

  constructor() {
    this.counter = new promClient.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'status'],
    });

    this.gauge = new promClient.Gauge({
      name: 'active_requests',
      help: 'Number of active HTTP requests',
    });

    promClient.collectDefaultMetrics();
  }

  incrementCounter(method: string, status: string) {
    this.counter.inc({ method, status });
  }

  setActiveRequests(value: number) {
    this.gauge.set(value);
  }

  getMetrics() {
    return promClient.register.metrics();
  }
}
