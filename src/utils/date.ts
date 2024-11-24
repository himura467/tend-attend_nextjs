import { z } from "zod";

const ymdDateSchema = z
  .date()
  .refine(
    (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const milliseconds = date.getMilliseconds();
      return hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0;
    },
    { message: "Date must only contain YYYY-MM-DD (time part must be 00:00:00.000)." },
  )
  .brand<"YmdDate">();
type YmdDate = z.infer<typeof ymdDateSchema>;

const ymdHm15DateSchema = z
  .date()
  .refine(
    (date) => {
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const milliseconds = date.getMilliseconds();
      return [0, 15, 30, 45].includes(minutes) && seconds === 0 && milliseconds === 0;
    },
    { message: "Minutes must be 0, 15, 30, or 45, and seconds/milliseconds must be 0." },
  )
  .brand<"YmdHm15Date">();
type YmdHm15Date = z.infer<typeof ymdHm15DateSchema>;

const parseYmdDate = (date: Date | string): YmdDate => {
  if (date instanceof Date) {
    return ymdDateSchema.parse(date);
  }
  return ymdDateSchema.parse(new Date(date));
};

const parseYmdHm15Date = (date: Date | string): YmdHm15Date => {
  if (date instanceof Date) {
    return ymdHm15DateSchema.parse(date);
  }
  return ymdHm15DateSchema.parse(new Date(date));
};

const getCurrentYmdDate = (date: Date | string): YmdDate => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  date.setHours(0, 0, 0, 0);
  return ymdDateSchema.parse(date);
};

export { type YmdDate, type YmdHm15Date, parseYmdDate, parseYmdHm15Date, getCurrentYmdDate };
