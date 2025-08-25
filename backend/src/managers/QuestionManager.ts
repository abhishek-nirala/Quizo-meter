
import { Question } from '../interface';
export default class QuestionsManager {

    private roomId: string
    private quesArray: Question[] = []

    constructor(roomId: string) {
        this.roomId = roomId;
    }

    createQuestion(quesNo: number, title: string, ans: string, option: string[]): Question {
        const question: Question = {
            currentQuestionNo: quesNo,
            // totalQuestions: totalQues,
            questionTitle: title,
            answerOfCurrentQuestionNo: ans,
            optionsOfCurrentQuestion: option,

        }
        this.quesArray.push(question)

        return question;
    }

    getQuestions(roomId: string) {
        if (this.quesArray.length === 0) {
            console.log("Room not found in Questions")
            return [];
        }
        return this.quesArray;
    }

    editQuestion(quesNo: number, updatedData: Partial<Question>) {

        const question = this.quesArray.findIndex(q => q.currentQuestionNo === quesNo)
        if (question === -1) {
            console.log("couldn't find the question!");
            return
        }
        this.quesArray[question] = { ...this.quesArray[question], ...updatedData }


    }
    deleteQuestion(quesNo: number) {
        this.quesArray = this.quesArray.filter(q => q.currentQuestionNo !== quesNo);
    }
}