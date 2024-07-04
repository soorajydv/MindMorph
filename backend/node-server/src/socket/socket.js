const express = require('express');
const { Server } = require("socket.io");
const prisma = require('../../prisma/prisma');

function initializeSocket(server) {
    const io = new Server(server);

    io.attach(server);

    io.on('connection', (socket) => {
        console.log('Socket connected', socket.id);

        socket.on('join-room', (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        socket.on('send-message', async ({ senderId, receiverId, message, roomId }) => {
            try {
                // Find or create a conversation between the two users
                let conversation = await prisma.conversation.findFirst({
                    where: {
                        participants: {
                            every: {
                                id: {
                                    in: [senderId, receiverId]
                                }
                            }
                        }
                    }
                });

                if (!conversation) {
                    conversation = await prisma.conversation.create({
                        data: {
                            participants: {
                                connect: [{ id: senderId }, { id: receiverId }]
                            }
                        }
                    });
                }

                // Create a new message in the conversation
                const newMessage = await prisma.message.create({
                    data: {
                        message,
                        senderId,
                        receiverId,
                        conversationId: conversation.id
                    }
                });

                // Emit the message to the receiver's room
                io.to(roomId).emit('receive-message', newMessage);

            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected', socket.id);
        });
    });
}

module.exports = initializeSocket;
