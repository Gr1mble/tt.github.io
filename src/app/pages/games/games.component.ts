import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent {
  @ViewChild('yearInput') year!: ElementRef;
  @ViewChild('pokerRef') poker!: ElementRef;
  @ViewChild('euchreRef') euchre!: ElementRef;
  @ViewChild('dartsRef') darts!: ElementRef;
  @ViewChild('horseShoesRef') horseshoes!: ElementRef;

  selectedYear: number = 0;

  constructor() {

  }

  gameWinners(yearInput: HTMLSelectElement): void {
    this.selectedYear = parseInt(this.year.nativeElement.value);
    console.log(this.selectedYear);

    this.poker.nativeElement.innerHTML = "Poker: " + this.pokerArray[this.selectedYear];
    this.euchre.nativeElement.innerHTML = "Euchre: " + this.euchreArray[this.selectedYear];
    this.darts.nativeElement.innerHTML = "Darts: " + this.dartsArray[this.selectedYear];
    this.horseshoes.nativeElement.innerHTML = "HorseShoes: " + this.horseShoeArray[this.selectedYear];
  }

  pokerArray = [
    ["Sassy Sara"],
    ["Mars"],
    ["Kottin"],
    ["Sassy Sara"],
    ["Sassy Sara"],
    ["Woody"],
    ["Sassy Sara"],
    ["Mars"],
    ["Mars"],
    ["Woody"],
    ["Mars"],
    ["Joltin' Joe III"]
  ]

  euchreArray = [
    ["Sassy Sara"],
    ["Sassy Sara / Joltin' Joe III"],
    ["Sassy Sara / Cara"],
    ["Joltin' Joe III / Slaw"],
    ["Woody / Cardio"],
    ["Fong Shui / Woody"],
    ["Woody / Sassy Sara"],
    ["Mars / Skatey"],
    ["JakeZilla / Xmas"],
    ["Woody / Kottin"],
    ["Sassy Sara / Jukebox"],
    ["Bob / Methy"]
  ]
  dartsArray = [
    ["Sassy Sara"],
    ["Kottin / Slaw"],
    ["Joltin' Joe III / Kottin"],
    ["Joltin' Joe III / Slaw"],
    ["Chica / Kottin"],
    ["Kottin / Joltin' Joe III"],
    ["Kottin / Joltin' Joe III"],
    ["JakeZilla / Kottin"],
    ["Woody / Kottin"],
    ["Woody / Kottin"],
    ["Kottin / Methy"],
    ["KylePetty / Jukebox Jon"]
  ]
  horseShoeArray = [
    ["Sassy Sara"],
    ["Mars / Fong Shui"],
    ["Sassy Sara / Cara"],
    ["Woody / Kottin"],
    ["Fong Shui / Joltin' Joe III"],
    ["JakeZilla / Sassy Sara"],
    ["Sassy Sara / Woody"],
    ["Jukebox Jon / Sassy Sara"],
    ["Sassy Sara / KylePetty"],
    ["Woody / Kottin"],
    ["Sassy Sara / Jukebox Jon"],
    ["Sassy Sara / Joltin' Joe III"]
  ]
}
