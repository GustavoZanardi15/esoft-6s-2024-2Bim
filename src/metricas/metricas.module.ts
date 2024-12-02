import { Module } from '@nestjs/common';
import { PrometheusService } from './metricas.service';
import { MetricsController } from './metricas.controller';

@Module({
  imports: [],
  controllers: [MetricsController],
  providers: [PrometheusService],
})
export class MetricsModule {}
