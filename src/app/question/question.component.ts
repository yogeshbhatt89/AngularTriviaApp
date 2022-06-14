import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionList: any = [];
  public questionNumber: number = 1;
  public currentQuestion: number =
    Math.floor(Math.random() * (141 - 0 + 1)) + 0;
  public points: number = 0;
  public question: number = 1;
  counter = 10;
  correctAns: number = 0;
  incorrectAns: number = 0;
  interval$: any;
  progress: string = '0';
  quizCompleted: boolean = false;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
    this.getProgressPercent();
  }
  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res) => {
      this.questionList = res.questions;
    });
  }
  wrongAnswer(currentQues: number, option: any) {
    this.points -= 50 * this.counter;
    this.incorrectAns++;

    setTimeout(() => {
      this.questionNumber++;
      if (this.questionNumber > 10) {
        this.quizCompleted = true;
      }
      this.getProgressPercent();
      this.currentQuestion = Math.floor(Math.random() * (141 - 0 + 1)) + 0;
      this.resetCounter();
    }, 1500);
  }
  correctAnswer(currentQues: number) {
    this.points += 50 * this.counter;
    this.correctAns++;

    setTimeout(() => {
      this.questionNumber++;
      if (this.questionNumber > 10) {
        this.quizCompleted = true;
      }
      this.getProgressPercent();
      this.currentQuestion = Math.floor(Math.random() * (141 - 0 + 1)) + 0;
      this.resetCounter();
    }, 1500);
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion = Math.floor(Math.random() * (141 - 0 + 1)) + 0;

        this.counter = 10;
        this.points -= 50;
        this.questionNumber++;
        if (this.questionNumber > 10) {
          this.quizCompleted = true;
        }
        this.getProgressPercent();
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 10;
    this.startCounter();
  }
  getProgressPercent() {
    return (this.progress = '' + (this.questionNumber / 10) * 100);
  }
  resetQuiz() {
    this.questionNumber = 1;
    this.resetCounter();
    this.currentQuestion = Math.floor(Math.random() * (141 - 0 + 1)) + 0;
    this.points = 0;
    this.correctAns = 0;
    this.incorrectAns = 0;

    this.progress = '0';
    this.quizCompleted = false;
  }
}
