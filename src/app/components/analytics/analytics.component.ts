import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Analytics } from '../../services/api.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  analytics: Analytics | null = null;
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.apiService.getAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load analytics data';
        this.loading = false;
        console.error('Error fetching analytics:', error);
      }
    });
  }

  getCityEntries(): Array<[string, number]> {
    if (!this.analytics?.citiesDistribution) return [];
    return Object.entries(this.analytics.citiesDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }
}