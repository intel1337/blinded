import { NextResponse } from "next/server"
import prisma from "../../lib/prisma/prisma"


export async function POST(req) {
    const data = req.json()
    const username = data.username
    console.log(data)
    const score = data.score
    try {
        if (!username || !data.score) {
            return NextResponse.json({ "response": "Missing Username" })
        }
        const existingUser = await prisma.user.findMany({
            where: {
                username: username,
            },
        });

        if (!existingUser) {
            const user = await prisma.user.create({
                data: {
                    username: username,
                    score: score,
                },
            })
            return NextResponse.json({"response":"Successefuly saved user"})
        }
        else {
            if (existingUser.score <= score) {
                await prisma.user.update({
                    where: { username: username },
                    data: {
                        score: score
                    },
                });
            }
            else{
                return NextResponse.json({"response":"Not your highest score"})
            }

        }







    }
    catch(err) {
        console.error(err)
        return NextResponse.json({"response": "Internal Error, try again later"})

    }
}