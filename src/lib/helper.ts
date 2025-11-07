import { z } from 'zod';

export const optionalRegex = (regex: RegExp, msg: string) =>
  z
    .string()
    .refine((val) => val === '' || regex.test(val), msg)
    .optional();
