import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    name: {
      type: String,
      index: true,
    },

    email: {
      type: String,
      lowercase: true,  
      unique: true,
      index: true,
    },

    phoneNumber: {
      type: Number,
      index: true,
    },

    role: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
