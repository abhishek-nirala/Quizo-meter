
import { SingleRoom } from '../interface'
import { randomUUID } from 'crypto';
import {Participant} from '../interface'

export default class RoomManager {

    private rooms = new Map<string, SingleRoom>();

    private generateJoinCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    createRoom(adminId: string, time: number): SingleRoom {
        const room: SingleRoom = {
            roomId: randomUUID(),
            adminId: adminId,
            participants: new Map<string, Participant>(),
            questions: [],
            currentQuestionIndex: 0,
            status: "waiting",
            adminPassword: this.generateJoinCode(), //4-digit code to let user join as admin
            questionDisplayTimeINSeconds: time
        };

        this.rooms.set(room.roomId, room)
        return room;
    }

    getRoom(roomId: string): SingleRoom | null {
        const room = this.rooms.get(roomId);
        if (!room) {
            console.log("Room not found with roomId : ",roomId);
            return null;
        } else return room
    }

    endRoom(roomId: string) {
        return this.rooms.delete(roomId)
    }
}