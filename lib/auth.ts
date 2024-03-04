import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

import { cookies } from "next/headers";
import { cache } from "react";
import { GitHub } from "arctic";

import type { Session, User } from "lucia";

import prisma from '@/lib/prisma'

const adapter = new PrismaAdapter(prisma.session, prisma.user);


export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			githubId: attributes.github_id,
			username: attributes.username
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
interface DatabaseUserAttributes {
	github_id: number;
	username: string;
}

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch { }
		return result;
	}
);

// async function logout(): Promise<ActionResult> {
// 	// "use server";
// 	const { session } = await validateRequest();
// 	if (!session) {
// 		return {
// 			error: "Unauthorized"
// 		};
// 	}

// 	await lucia.invalidateSession(session.id);

// 	const sessionCookie = lucia.createBlankSessionCookie();
// 	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 	return redirect("/login");
// }


export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);


interface ActionResult {
	error: string | null;
}