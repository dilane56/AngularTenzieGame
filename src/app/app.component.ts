import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {nanoid} from 'nanoid';
import {ButtonInfo} from './models/buttonInfo';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tenzieGame';
  allButton !: ButtonInfo [];
  //variable verifiant si le jeux est terminer
  gameStart!: boolean;
  numberOfRoll!: number;
  highScore:  number =0;
  allActive! : boolean;
  firstButtonValue!:number
  theSameValue!:boolean;
  allScore:number[] = [];
  minScore: number | null = null; // Déclarez la propriété minScore




  ngOnInit(): void {
    this.allButton = this.randomArrayNumber()
    this.gameStart = false;
    this.numberOfRoll = 0;
    this.firstButtonValue = this.allButton[0].value;
    this.theSameValue =false;
    this.allActive=false;
  }

  generateRandomNumber(): ButtonInfo {
    return {
      isHold: false,
      value: Math.floor(Math.random() * 10),
      id: nanoid()
    };
  }

  randomArrayNumber(): ButtonInfo [] {
    let allButton: ButtonInfo[] = []
    for (let i = 0; i < 10; i++) {
      allButton.push(this.generateRandomNumber())
    }
    return allButton

  }


  changeValue() {
    if (!this.gameStart) {

      this.allButton.map(element => {
        if (!element.isHold) {
          element.id = nanoid();
          element.isHold = false;
          element.value = Math.floor(Math.random() * 10);

          return element;
        } else {
          return element;
        }
      });
      this.numberOfRoll++;
      this.highScore = this.numberOfRoll

    }else{
      this.numberOfRoll = 0;
      this.gameStart = false;
      this.allButton = this.randomArrayNumber();
      //this.updateMinScore()


    }
  }
  gameOver(): void {
    this.firstButtonValue = this.allButton[0].value;
    this.theSameValue = !this.allButton.some(element => element.value !== this.firstButtonValue);
    this.allActive = this.allButton.every(element => element.isHold);
    console.log(this.allActive)
    console.log(this.theSameValue)
    if (this.theSameValue && this.allActive) {
      alert('You Won The Game');
      this.gameStart = true; // Mettez fin au jeu
      this.updateMinScore()


    }
  }


  activeButton(id: string) {
    this.allButton.map(element => {
      if (element.id == id) {
        element.isHold = !element.isHold;
      }
      return element;
    });
    this.gameOver()
    // Vérification pour mettre à jour les variables


  }


  // Méthode pour mettre à jour le score minimum
  updateMinScore() {
    if (this.minScore === null || this.highScore < this.minScore) {
      this.minScore = this.highScore;
    }
  }

}
