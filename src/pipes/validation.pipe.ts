import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any,any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const odj = plainToClass(metadata.metatype, value)
        const errors = await validate(odj)

        if (errors.length){
            let messages = errors.map(error => {
                return `${error.property} - ${Object.values(error.constraints).join(', ')}`
            })
            throw new ValidationException(messages)
        }
        return value
    }
}