import { ICamiaoPersistence } from '../../dataschema/ICamiaoPersistence';
import mongoose from 'mongoose';

const Camiao = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    matricula: {
      type: String,
      required: [true, 'Please enter matricula'],
      unique: true,
      index: true,
    },

    tara: {
      type: Number,
      index: true,
    },

    capacidade: {
      type: Number, 
      index: true,
    },

    cargaBateria: {
        type: Number,
        index: true,
    },

    autonomia: {
        type: Number,
        index: true,
    },

    tempoCarregamentoRapido: {
        type: Number, 
        index: true,
      },

    disponibilidade: {
      type: Boolean,
      index: true,
    },

  },
  { timestamps: true },
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', Camiao);
