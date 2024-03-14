import { z } from "zod";
import { Category, Status, Term, Type } from "@prisma/client";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required.").max(255),
  category: z.nativeEnum(Category),
  job_title: z.string().min(1, "Job Title is required.").max(65535),
  positionNumber: z.string().max(255).optional(),
  type: z.nativeEnum(Type),
  term: z.nativeEnum(Term),
  year: z.number().min(1, "Year is required."),
  location: z.string().min(1, "Location is required.").max(255),
  status: z.nativeEnum(Status),
});