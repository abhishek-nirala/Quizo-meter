export interface SingleRoom {
  roomId: string;
  adminId: string;
  participants: Map<string, Participant>;
  questions: Question[];
  currentQuestionIndex: number;
  status: "waiting" | "running" | "finished";
  adminPassword: string;
  questionDisplayTimeINSeconds: number,
}

export interface Question {
  currentQuestionNo: number,
  // totalQuestions : number,
  questionTitle: string,
  answerOfCurrentQuestionNo: string,
  optionsOfCurrentQuestion: string[],

};

export interface Participant {
  userId : string,
  correctAnswer ?: number,
  wrongAnswer ?: number,
  totalScore ?: number,
}
