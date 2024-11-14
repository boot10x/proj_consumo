import { Controller, Get, Post, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { RegistrarConsumoDto } from './consumo_agua.dto';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo-agua')
export class ConsumoAguaController {
  constructor(private readonly consumoAguaService: ConsumoAguaService) { }

  @Post('registrar')
  async registrarConsumo(@Body() consumoDto: RegistrarConsumoDto): Promise<ConsumoAgua> {
    const consumoData = {
      ...consumoDto,
      dataLeitura: new Date(consumoDto.dataLeitura),
    };
    return this.consumoAguaService.registrarConsumo(consumoData);
  }

  @Get('historico')
  async consultarHistorico(
    @Query('usuarioId', ParseIntPipe) usuarioId: number,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ): Promise<ConsumoAgua[]> {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    return this.consumoAguaService.consultarHistorico(usuarioId, inicio, fim);
  }

  @Get('alerta')
  async verificarAlerta(@Query('usuarioId', ParseIntPipe) usuarioId: number): Promise<string> {
    return this.consumoAguaService.verificarAlerta(usuarioId);
  }
}
