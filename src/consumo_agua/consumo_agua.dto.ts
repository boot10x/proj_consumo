import { IsInt, IsPositive, IsISO8601 } from 'class-validator';

export class RegistrarConsumoDto {
  @IsInt()
  @IsPositive()
  usuarioId: number;

  @IsPositive()
  quantidade: number;

  @IsISO8601()
  dataLeitura: string;
}

