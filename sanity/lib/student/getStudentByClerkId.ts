import { GetStudentByClerkIdQueryResult } from "@/sanity.types";
import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getStudentByClerkId(
  clerkId: string
): Promise<{ data: GetStudentByClerkIdQueryResult }> {
  const getStudentByClerkIdQuery = defineQuery(
    `*[_type == "student" && clerkId == $clerkId][0]`
  );

  const student = await sanityFetch({
    query: getStudentByClerkIdQuery,
    params: { clerkId },
  });

  return student;
}
