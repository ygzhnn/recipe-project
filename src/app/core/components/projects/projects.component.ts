import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Recipe Book',
      description: 'A web application for managing and sharing recipes. Features include recipe creation, editing, categorization, and search functionality.',
      image: 'assets/images/recipe-project.jpg',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      githubLink: 'https://github.com/yourusername/recipe-demo',
      demoPath: '/recipe-demo'
    }
  ];

  constructor(private router: Router) {}

  navigateToDemo(path: string) {
    this.router.navigate([path]);
  }
}
