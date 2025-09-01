import RoomManager from "./RoomManager";

export class UserManager {
    private roomManager: RoomManager
    constructor(roomManager: RoomManager) {
        this.roomManager = roomManager
    }

    joinRoom(roomId: string, userId: string) {
        console.log("roomId , userid",roomId, userId)
        const room = this.roomManager.getRoom(roomId);
        console.log("room@join-room11 : ",room)
        if (!room) {
            console.error(`Room with ID ${roomId} not found`);
            return null;
        }

        if (!room.participants.has(userId)) {
            room.participants.set(userId, {
                userId,
                correctAnswer: 0,
                totalScore: 0,
                wrongAnswer: 0
            });
        } else {
            console.log(`User ${userId} already joined room ${roomId}`);
        }
        console.log("room@join-room26 : ",room)

        return room.participants.get(userId);
    }

    submitAnswer(roomId: string, userId: string, correctAnswerOfThisQuestion: string, selectedAnswer: string) {
        const room = this.roomManager.getRoom(roomId);

        if (!room) {
            console.log("couldn't find room in submitAnswer~");
            return
        }

        const participant = room.participants.get(userId);

        const isAnswerCorrect = selectedAnswer === correctAnswerOfThisQuestion
        if (!participant) {
            room.participants.set(userId, {
                userId,
                correctAnswer: 0,
                totalScore: 0,
                wrongAnswer: 0
            })
            console.log("a new participant has been created");
        } else {
            if (isAnswerCorrect) {
                participant.correctAnswer = (participant.correctAnswer || 0) + 1;
                participant.totalScore = (participant.totalScore || 0) + 10
            } else {
                participant.wrongAnswer = (participant.wrongAnswer || 0) + 1;
            }
        }

        if (participant) {
            room.participants.set(userId, participant);
        }
        return room.participants

    }

}