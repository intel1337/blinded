import { NextResponse } from "next/server"
import prisma from "../../lib/prisma/prisma"



export async function POST(req) {
    const data = await req.json()
    const username = data.username
    console.log(data)
    let score = data.score
    if (typeof score !== "number") {
        score = parseInt(score)
        console.log(score)
    }
    try {
        if (!username || !data.score) {
            return NextResponse.json({ "response": "Missing Username" })
        }
        const existingUser = await prisma.user.findMany({
            where: {
                username: username,
            },
        });
        console.log(existingUser)
        console.log(existingUser[0].score)



        if (!existingUser) {
            const user = await prisma.user.create({
                data: {
                    username: username,
                    score: score,
                },
            })
            return NextResponse.json({ "response": "Successefuly saved user" })
        }
        else {
            if (existingUser[0].score <= score) {
                await prisma.user.updateMany({
                    where: { username: username },
                    data: {
                        score: score
                    },
                });
                return NextResponse.json({ "response": "Saved Best score " })
            }
            
            else {


                return NextResponse.json({ "response": "Not your highest score" })
            }

        }

    }
    catch (err) {
        console.error(err)
        return NextResponse.json({ "response": "Internal Error, try again later" })

    }
}