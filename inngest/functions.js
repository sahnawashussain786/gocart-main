import { inngest } from "./client";
import prisma from "@/lib/prisma";

// inngest function to save user data to the database

export const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-create'},
    {event: 'clerk/user.created'},
    async ({event}) => {
        const {data} = event
        await prisma.user.create({
            data: {
                id: data.id,
                email: data.email_addresses[0],
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
)

// function to update user data in the database
export const syncUserUpdation = inngest.createFunction(
    {id : 'sync-user-update'},
    {event: 'clerk/user.updated'},
    async ({event}) => {
        const {data} = event
        await prisma.user.update({
            where: {id: data.id,},
            data: {
                email: data.email_addresses[0],
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
)