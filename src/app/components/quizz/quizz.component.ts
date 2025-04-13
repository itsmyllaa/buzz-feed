import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"
import {Router} from "@angular/router";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
      this.questionSelected = this.questions[this.questionIndex];

      console.log('Questions:', this.questions);  // Verifique se as perguntas estão sendo carregadas
      console.log('First Question:', this.questionSelected); // Verifique a primeira pergunta
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    console.log('Selected Answer:', value);  // Para verificar a resposta escolhida

    this.nextStep(); // Avança para a próxima pergunta
  }


  nextStep() {
    this.questionIndex += 1;

    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true; // Mostra botão de finalizar
    }
  }

  submitQuiz() {
    const finalAnswer: string = this.checkResult(this.answers);
    this.router.navigate(['/resultado'], {
      queryParams: { answer: finalAnswer }
    });
  }

  checkResult(answers: string[]): string {
    const result = answers.reduce((previous, current, i, arr) => {
      const prevCount = arr.filter(item => item === previous).length;
      const currCount = arr.filter(item => item === current).length;

      return prevCount >= currCount ? previous : current;
    });

    return result;
  }
}
