import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

type ResponseType = 'single' | 'pagination';

export const ApiResponse = <TModel extends Type<any>>(model: TModel, type: ResponseType = 'single') => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data:
                type === 'pagination'
                  ? {
                      type: 'object',
                      properties: {
                        total: {
                          type: 'number',
                          example: 10,
                          description: '데이터 전체 개수',
                        },
                        items: {
                          type: 'array',
                          items: { $ref: getSchemaPath(model) }, // 모델 참조
                        },
                      },
                    }
                  : // [Single 타입일 경우]
                    {
                      $ref: getSchemaPath(model), // 모델 바로 참조
                    },
            },
          },
        ],
      },
    })
  );
};
