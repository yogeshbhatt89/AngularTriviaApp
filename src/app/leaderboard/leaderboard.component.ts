import { Component, OnInit } from '@angular/core';
import { Leaderboard } from 'src/models/leaderboard';
import { LeaderboardService } from '../service/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboard: Leaderboard[] = [];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardService
      .getLeaderboard()
      .subscribe((items) => (this.leaderboard = items));
  }
}
