import { NextResponse } from "next/server";
import prisma from "../../lib/prisma/prisma";


export async function GET(req) {
    const leaderboard = await prisma.user.findMany({
        orderBy: {
            score: 'desc',
        },
        select: {
            id: true,
            username: true,
            score: true,
        },
    });
    if (!leaderboard) {
        return NextResponse.json({ "response": "No users found" });
    }
    const leaderboardData = leaderboard.map((user) => ({
        id: user.id,
        username: user.username,
        score: user.score,
    }));
    return NextResponse.json({ leaderboard: leaderboardData });

}