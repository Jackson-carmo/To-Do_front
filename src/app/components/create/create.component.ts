import { Todo } from 'src/app/models/todo';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date,
    finalizado: false
  }
  constructor (private router: Router, private service: TodoService) {}

  create(): void {
    this.formataData();
    this.service.create(this.todo).subscribe((resposta) => {
      this.service.message('To-Do criado com secesso!');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao criar To-Do');
      this.router.navigate(['']);
    });
  }

  cancel(): void {
      this.router.navigate(['']);
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }
}
