import { IViagemPersistence } from '../../dataschema/IViagemPersistence';
import mongoose from 'mongoose';

const Viagem = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },


    camiao: {
      type: String,
      required: [true, 'Please enter camiao'],
      index: true,
    },

    data: {
        type: Number,
        index: true,
    },


    custo: {
      type: Number,
      index: true,
    },

    entregas: {
      type: Array<String>, 
      index: true,
    },

    armazens: {
        type: Array<Number>,
        index: true,
    },


  },
  
  { timestamps: true },
);

Viagem.index({
    camiao: 1,
    data: 1,
  }, {
    unique: true,
  });

export default mongoose.model<IViagemPersistence & mongoose.Document>('Viagem', Viagem);