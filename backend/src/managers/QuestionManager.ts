
import { Question } from '../interface';
export default class Questions {

    private questions = new Map<string, Question[]>()
    private roomId: string
    private quesArray: Question[] = []

    constructor(roomId: string) {
        this.roomId = roomId;
    }

    createQuestion(quesNo: number, totalQues: number, ans: string, option: []): Question {
        const question: Question = {
            currentQuestionNo: quesNo,
            totalQuestions: totalQues,
            answerOfCurrentQuestionNo: ans,
            optionsOfCurrentQuestion: option,

        }
        this.quesArray.push(question)

        this.questions.set(this.roomId, this.quesArray)
        return question;
    }

    getQuestions(roomId: string) {
        const id = this.questions.get(roomId)
        if (id) {
            console.log("roomId is not found in Questions")
        }
        else
            return this.questions
    }

    editQuestion(){

    }
    deleteQuestion(){

    }
}