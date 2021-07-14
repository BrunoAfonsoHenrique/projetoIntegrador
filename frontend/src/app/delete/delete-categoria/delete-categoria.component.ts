import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { AlertasService } from 'src/app/service/alertas.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-delete-categoria',
  templateUrl: './delete-categoria.component.html',
  styleUrls: ['./delete-categoria.component.css']
})
export class DeleteCategoriaComponent implements OnInit {
  categoria:Categoria=new Categoria()
  idCategoria:number
  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService

  ) { }

  ngOnInit(){
    if(environment.token ==''){
      this.router.navigate(['/entrar'])
    }

    if (environment.nome != "admin"){
      this.alertas.showAlertDanger("Você precisa ser administrador para acesar essa rota")
      this.router.navigate(['/home'])
    }
    
    this.idCategoria = this.route. snapshot.params['id']
    this.findByIdCategoria(this.idCategoria)
  }
  findByIdCategoria(id:number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
      this.categoria=resp
    })

  }
  
  apagar(){
    this.categoriaService.deleteCategoria(this.idCategoria).subscribe(()=>{
      this.alertas.showAlertSuccess('Categoria apagada com sucesso') 
     this.router.navigate(['/categorias'])
    })
  }

}
