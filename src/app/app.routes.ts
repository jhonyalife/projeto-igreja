import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TemposReligiosoComponent } from './pages/tempos-religioso/tempos-religioso.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { NaoEncontradaComponent } from './pages/nao-encontrada/nao-encontrada.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tempos-religiosos',
    component: TemposReligiosoComponent
  },
  {
    path: 'equipe',
    component: EquipeComponent
  },
  {
    path: '**',
    component: NaoEncontradaComponent
  }
]

