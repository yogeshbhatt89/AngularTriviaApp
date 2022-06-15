import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Leaderboard } from 'src/models/leaderboard';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  leaderboardCollection: AngularFirestoreCollection<Leaderboard>;
  leaderboard: Observable<any[]>;

  constructor(public afs: AngularFirestore) {
    this.leaderboardCollection = this.afs.collection('leaderboard', (ref) =>
      ref.orderBy('score', 'desc')
    );

    this.leaderboard = this.leaderboardCollection.valueChanges();
    // this.leaderboard = this.leaderboardCollection.valueChanges();
  }
  getLeaderboard() {
    return this.leaderboard;
  }
  addHighScore(leaderboard: Leaderboard) {
    this.leaderboardCollection.add(leaderboard);
  }
}
