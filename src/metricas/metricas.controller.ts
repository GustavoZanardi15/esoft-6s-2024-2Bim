import { Controller, Get } from '@nestjs/common';
import { PrometheusService } from './metricas.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get()
  getMetrics() {
    return this.prometheusService.getMetrics();
  }
}
