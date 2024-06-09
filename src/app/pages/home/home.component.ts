import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DbService } from '../../services/db.service';
import { HttpClientModule } from '@angular/common/http';
import { Eventos } from '../../models/Eventos';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tema } from '../../models/Tema';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MatExpansionModule, HttpClientModule, ReactiveFormsModule],
  providers: [DbService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public dados: Eventos[] = [];
  private _dbService = inject(DbService);
  public form: FormGroup;
  private FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.buildResourceForm();
    this.getAllDados();
  }

  private buildResourceForm() {
    this.form = this.FormBuilder.group({
      tema: [null],
      tempo: [''],
      ano: [''],
      datainicio: [null],
      datafim: [null]
    });
  }

  protected filter() {
    const { tema, tempo, ano, datainicio, datafim } = this.form.value;

    let filteredTemas: Tema[] = [];

    this.dados.forEach(evento => {
      let temas = evento.temas;

      if (tempo && evento.nome.toLowerCase() !== tempo.toLowerCase()) {
        return;
      }

      if (tema) {
        temas = temas.filter(item => item.tema.toLowerCase().includes(tema.toLowerCase()));
      }

      if (ano) {
        temas = temas.filter(item => item.ano === ano);
      }

      if (datainicio) {
        temas = temas.filter(item => new Date(item.datainicio) >= new Date(datainicio));
      }

      if (datafim) {
        temas = temas.filter(item => new Date(item.datafim) <= new Date(datafim));
      }

      if (temas.length > 0) {
        filteredTemas = filteredTemas.concat(temas);
      }
    });

    this.dados = this.groupByTempo(filteredTemas);
  }

  private groupByTempo(filteredTemas: Tema[]): Eventos[] {
    const grouped: { [key: string]: Eventos } = {};

    filteredTemas.forEach(tema => {
      const tempoKey = this.getTempoKey(tema);
      if (!grouped[tempoKey]) {
        grouped[tempoKey] = {
          nome: tempoKey,
          descricao: '',
          temas: []
        };
      }
      grouped[tempoKey].temas.push(tema);
    });

    return Object.values(grouped);
  }

  private getTempoKey(tema: Tema): string {
    return this.dados.find(evento => evento.temas.includes(tema))?.nome || 'unknown';
  }

  public getAllDados(){
    this._dbService.getDados().subscribe(
      (res) => {
        this.dados = res;
      }
    )

  }

  public reset(){
    this.form.reset();
    this.form.get('tempo').setValue('');
    this.form.get('ano').setValue('');
  }
}
