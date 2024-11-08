import {Controller, Get} from '@nestjs/common';
import {HealthCheck, HealthCheckService, MemoryHealthIndicator} from '@nestjs/terminus';
import {APP_ALLOCATED_MEMORY_MB, APP_HEAP_MEMORY_MB} from '../core/config/constants';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      /**
       * Heap is the portion of memory where dynamically allocated memory resides (i.e. memory allocated via malloc)
       */
      async () => this.memory.checkHeap('memory_heap', APP_HEAP_MEMORY_MB * 1024 * 1024),
      /**
       * RSS is the Resident Set Size and is used to show how much memory is allocated to that process and is in RAM. It does not include memory that is swapped out. It does include memory from shared libraries as long as the pages from those libraries are actually in memory. It does include all stack and heap memory.
       */
      async () => this.memory.checkRSS('memory_rss', APP_ALLOCATED_MEMORY_MB * 1024 * 1024),
    ]);
  }
}
