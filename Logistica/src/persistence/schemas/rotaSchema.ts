import { IRotaPersistence } from '../../dataschema/IRotaPersistence';
import mongoose from 'mongoose';

const RotaSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique:true},
    idArmazemPartida: { type: String},
    idArmazemChegada: { type: String},
    distancia: { type: Number},
    tempoViagemCheio: { type: Number},
    energiaGasta: { type: Number},
    tempoCarregamentoExtra: { type: Number},
  },
  { 
    timestamps: true
  }
);

export default mongoose.model<IRotaPersistence & mongoose.Document>('Rota', RotaSchema);
