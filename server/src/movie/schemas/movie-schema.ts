import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  genres: string[];

  @Prop()
  year: string;

  @Prop()
  countries: string[];

  @Prop()
  poster: string[];

  @Prop()
  rating: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
