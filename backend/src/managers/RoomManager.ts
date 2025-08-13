
import { SingleRoom } from '../interface'
import { randomUUID } from 'crypto';

export class RoomManager {

    private rooms = new Map<string, SingleRoom>();

    private generateJoinCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    createRoom(initialRoomData: Partial<SingleRoom>): SingleRoom {
        const createRoom: SingleRoom = {
            id: randomUUID(),
            code: this.generateJoinCode(), // 4-digit
            adminId: initialRoomData.adminId!,
            participants: new Map(),
            questions: [],
            currentQuestionIndex: 0,
            status: "waiting",
            password: initialRoomData.password!
        };

        this.rooms.set(createRoom.id, createRoom)
        return createRoom;
    }

    getRoom(roomId: string): SingleRoom | undefined {

        const room = this.rooms.get(roomId);

        if (!room) {
            console.log("roomId does not found");
        } else return room
    }
}