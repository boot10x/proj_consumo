import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
  private consumos: ConsumoAgua[] = [];
  private idCounter = 1;

  registrarConsumo(consumo: Omit<ConsumoAgua, 'id'>): ConsumoAgua {
    const novoConsumo: ConsumoAgua = {
      id: this.idCounter++,
      ...consumo,
    };
    this.consumos.push(novoConsumo);
    return novoConsumo;
  }

  consultarHistorico(
    usuarioId: number,
    dataInicio: Date,
    dataFim: Date,
  ): ConsumoAgua[] {
    return this.consumos.filter(
      (c) =>
        c.usuarioId === usuarioId &&
        c.dataLeitura >= dataInicio &&
        c.dataLeitura <= dataFim,
    );
  }

  verificarAlerta(usuarioId: number): string {
    const consumosUsuario = this.consumos
      .filter((c) => c.usuarioId === usuarioId)
      .sort((a, b) => a.dataLeitura.getTime() - b.dataLeitura.getTime());

    if (consumosUsuario.length < 2) {
      return 'Não há dados suficientes para gerar alertas.';
    }

    const ultimoConsumo = consumosUsuario[consumosUsuario.length - 1];
    const penultimoConsumo = consumosUsuario[consumosUsuario.length - 2];

    if (ultimoConsumo.quantidade > penultimoConsumo.quantidade) {
      return 'Alerta: Seu consumo aumentou em relação ao mês anterior!';
    } else {
      return 'Seu consumo está sob controle.';
    }
  }
}
