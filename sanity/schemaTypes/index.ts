import { type SchemaTypeDefinition } from "sanity";
import { studentType } from "./studentType";
import { lessonCompletionType } from "./lessonCompletionType";
import { enrollmentType } from "./enrollmentType";
import { courseType } from "./courseType";
import { moduleType } from "./moduleType";
import { lessonType } from "./lessonType";
import { instructorType } from "./instructorType";
import { blockContent } from "./blockContent";
import { categoryType } from "./categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    studentType,
    courseType,
    moduleType,
    lessonType,
    instructorType,
    blockContent,
    enrollmentType,
    categoryType,
    lessonCompletionType,
  ],
};
