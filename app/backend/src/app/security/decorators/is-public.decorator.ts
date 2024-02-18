import { SetMetadata } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const IS_PUBLIC_KEY = 'isPublic';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
// export const IsProtect = () => SetMetadata(IS_PUBLIC_KEY, false);
