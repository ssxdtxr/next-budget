import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
}
