

export class ScorecardLine{

    playerId: number= 0;
    position: number= 0;
    firstName: string= ''; 
    surname: string= ''; 
    handicap: number= 0;  
    score: number= 0;  
    isAddedToCard: boolean= false;

    constructor(playerId: number, firstName: string, surname: string, handicap: number, isAddedToCard: boolean= false ){ 
      this.playerId= playerId;
      this.firstName= firstName
      this.surname=  surname
      this.handicap= handicap; 
      this.isAddedToCard= isAddedToCard;
    }

    get points(): number{
        let points= 0;
        switch (this.position) {
            case 1: points= 12;   break;
            case 2: points= 10;   break;
            case 3: points= 8;     break;
            default: points= 2;     break;
        }
        return points;
    }

    add$RemoveFromCard(option: boolean): void{
        this.isAddedToCard= option
        this.setPosition(0);
    }

    setPosition(position: number): void{
        this.position= position;
    }

    setScore(score: number): void{
        this.score= score;
    }

}