import { Question } from '../interface';

export default class QuestionsManager {
    private questions: Question[] = []; // Just stores questions for THIS room

    createQuestion(
        quesNo: number,
        title: string,
        ans: string,
        options: string[]
    ): Question {
        const question: Question = {
            currentQuestionNo: quesNo,
            questionTitle: title,
            answerOfCurrentQuestionNo: ans,
            optionsOfCurrentQuestion: options,
        };

        this.questions.push(question);
        return question;
    }

    getQuestions(): Question[] {
        return this.questions;
    }

    editQuestion(quesNo: number, updatedQuestion: Partial<Question>) {
        const index = this.questions.findIndex(q => q.currentQuestionNo === quesNo);
        if (index === -1) return false;

        this.questions[index] = { ...this.questions[index], ...updatedQuestion };
        return true;
    }

    deleteQuestion(quesNo: number) {
        const index = this.questions.findIndex(q => q.currentQuestionNo === quesNo);
        if (index === -1) return false;

        this.questions.splice(index, 1);
        return true;
    }
}
