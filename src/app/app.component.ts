import { Component, ViewChild, ElementRef} from '@angular/core';

let cards: any = [
  {
    title: 'card1',
    details: {
      desc: 'card 1 description'
    }
  },
  {
    title: 'card2',
    details: {
      desc: 'card 2 description'
    }
  },
  {
    title: 'card3',
    details: {
      desc: 'card 3 description'
    }
  },
  {
    title: 'card4',
    details: {
      desc: 'card 4 description'
    }
  },
  {
    title: 'card5',
    details: {
      desc: 'card 5 description'
    }
  },
  {
    title: 'card6',
    details: {
      desc: 'card 6 description'
    }
  },
  {
    title: 'card7',
    details: {
      desc: 'card 7 description'
    }
  },
  {
    title: 'card8',
    details: {
      desc: 'card 8 description'
    }
  },
  {
    title: 'card9',
    details: {
      desc: 'card 9 description'
    }
  },
  {
    title: 'card10',
    details: {
      desc: 'card 10 description'
    }
  },
];

let expandedCard: any = {
  expanded: true
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('wrapper') el: ElementRef;
  cards = cards;
  previousExpandedIndex = Infinity;

  public handleCardClick(e, cardIndex) {
    console.log(cardIndex);
    let target = e.path.find(path => path.className === 'card');

    if (!target) return;

    let offsetTop = target.offsetTop,
        targetId = target.id,
        cardsInDOM = this.el.nativeElement.children,
        expandedIndex = this.cards.findIndex(card => card.expanded),
        lastElementIndex;

    this.cards.every((card, index, array) => {
     if (cardsInDOM[index].offsetTop > offsetTop) {
       lastElementIndex = index > this.previousExpandedIndex ? index - 1 : index;
       return false
     } else {
       lastElementIndex = array.length;
       return true
     }
    });

    if (expandedIndex > -1) this.deleteExpandedCard(expandedIndex);

    let selectedCard = this.cards.find(card => card.title === targetId);
    selectedCard.open = true;
    this.cards.splice(lastElementIndex, 0, Object.assign(expandedCard, selectedCard.details));
    this.previousExpandedIndex = lastElementIndex;
  }

  public deleteExpandedCard(index) {
    let expandedIndex = index || this.cards.findIndex(card => card.expanded);
    this.cards.splice(expandedIndex, 1);
    this.cards.forEach((card) => card.open = false);
    this.previousExpandedIndex = Infinity;
  }
}
