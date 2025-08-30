
// import QuestionsManager from './QuestionManager';
import QuestionManager from './QuestionManager';
// import QuestionManager from './QuestionManager'
import RoomManager from './RoomManager';
import { Request, Response } from 'express'

export class AdminManager {

    private roomManager: RoomManager

    constructor(roomManager: RoomManager) {
        this.roomManager = roomManager
    }

    private questionManagers = new Map<string, QuestionManager>();

    organizeRoom(adminId: string, time: number) {
        this.roomManager.createRoom(adminId, time)
    }
    provideQuestions(req: Request, res: Response) {
        const { roomId, quesNo, totalQues, title, ans, option } = req.body;

        console.log("provideQuestions Data : ", quesNo, totalQues, ans, option);

        if (!roomId || !title || !option) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if we already have a QuestionsManager for this room
        let questionManager = this.questionManagers.get(roomId);
        if (!questionManager) {
            questionManager = new QuestionManager();
            this.questionManagers.set(roomId, questionManager);
        }
        const question = questionManager.createQuestion(
            quesNo,
            title,
            ans,
            option
        )
        console.log("Question Added", question);
        return res.json({ message: "question added successfully", question });
    }
    displayResults() {

    }

}