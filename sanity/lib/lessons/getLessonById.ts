import { GetLessonByIdQueryResult } from "@/sanity.types";
import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getLessonById(
  id: string
): Promise<GetLessonByIdQueryResult> {
  const getLessonByIdQuery =
    defineQuery(`*[_type == "lesson" && _id == $id][0] {
    ...,
    "module": module->{
      ...,
      "course": course->{...}
    }
  }`);

  const result = await sanityFetch({
    query: getLessonByIdQuery,
    params: { id },
  });

  return result.data;
}
