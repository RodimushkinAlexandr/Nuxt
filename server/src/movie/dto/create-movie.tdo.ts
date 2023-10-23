import { IsEmail, IsString, Length } from "class-validator";
import {ObjectId} from "mongoose";


export class CreateMovieDto {
    readonly name:string;
    readonly description:string;
    readonly genres:string[];
    readonly year:string;
    readonly countries: string[];
    readonly poster: string[];
    readonly rating: string[];
}