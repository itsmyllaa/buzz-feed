import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import quizz_questions from "../../../assets/data/quizz_questions.json";

type TechProfile = 'frontend' | 'backend' | 'fullstack';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: TechProfile = 'frontend'; // Valor padrão só pra inicializar
  description: string = '';


  constructor(private route: ActivatedRoute, private router: Router) {}


  restartQuiz() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const resultParam = params['answer'] as TechProfile;

      if (resultParam in quizz_questions.results) {
        this.result = resultParam;
        this.description = quizz_questions.results[resultParam];
      } else {
        this.result = 'frontend';
        this.description = quizz_questions.results['frontend'];
      }
    });
  }

}
