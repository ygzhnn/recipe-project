import { Component, OnInit } from '@angular/core';

interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  categories: string[];
  portions: number;
  rating: number;
}

@Component({
  selector: 'app-recipe-demo',
  templateUrl: './recipe-demo.component.html',
  styleUrls: ['./recipe-demo.component.scss']
})
export class RecipeDemoComponent implements OnInit {
  showAddRecipe = false;
  showEditRecipe = false;
  searchQuery = '';
  selectedCategory = 'All';
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;
  editingRecipe: Recipe | null = null;

  categories = [
    'All',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Snack',
    'Appetizer',
    'Side Dish',
    'Salad',
    'Soup',
    'Pasta',
    'Asian',
    'Indian'
  ];

  defaultRecipes: Recipe[] = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh vegetables and special sauce',
      ingredients: [
        '500g ground beef',
        'Burger buns',
        'Lettuce leaves',
        'Tomato slices',
        'Red onion rings',
        'Cheddar cheese slices',
        'Mayonnaise',
        'Ketchup',
        'Salt and pepper'
      ],
      instructions: [
        'Season ground beef with salt and pepper',
        'Form into patties',
        'Grill for 4-5 minutes each side',
        'Add cheese in the last minute',
        'Toast the buns',
        'Assemble with vegetables and sauces'
      ],
      imageUrl: 'assets/images/burger.jpg',
      categories: ['Dinner', 'Lunch'],
      portions: 4,
      rating: 4
    },
    {
      id: 2,
      name: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
      ingredients: [
        '400g spaghetti',
        '200g pancetta',
        '4 large eggs',
        '100g Pecorino Romano',
        'Black pepper',
        'Salt'
      ],
      instructions: [
        'Cook pasta in salted water',
        'Fry pancetta until crispy',
        'Mix eggs and cheese',
        'Combine all ingredients while pasta is hot',
        'Add pasta water if needed',
        'Season with black pepper'
      ],
      imageUrl: 'assets/images/carbonara.jpg',
      categories: ['Pasta', 'Dinner'],
      portions: 4,
      rating: 5
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      description: 'Rich and moist chocolate cake with chocolate ganache',
      ingredients: [
        '2 cups flour',
        '2 cups sugar',
        '3/4 cup cocoa powder',
        '2 eggs',
        '1 cup milk',
        '1/2 cup vegetable oil',
        '2 tsp vanilla extract',
        'Chocolate ganache'
      ],
      instructions: [
        'Preheat oven to 350°F',
        'Mix dry ingredients',
        'Add wet ingredients and mix well',
        'Bake for 30-35 minutes',
        'Cool completely',
        'Top with chocolate ganache'
      ],
      imageUrl: 'assets/images/chocolate-cake.jpg',
      categories: ['Dessert'],
      portions: 8,
      rating: 5
    },
    {
      id: 4,
      name: 'Fresh Sushi Rolls',
      description: 'Japanese sushi rolls with fresh fish and vegetables',
      ingredients: [
        'Sushi rice',
        'Nori sheets',
        'Fresh salmon',
        'Cucumber',
        'Avocado',
        'Rice vinegar',
        'Wasabi',
        'Soy sauce'
      ],
      instructions: [
        'Cook and season sushi rice',
        'Place nori on bamboo mat',
        'Spread rice on nori',
        'Add fish and vegetables',
        'Roll tightly',
        'Cut into pieces'
      ],
      imageUrl: 'assets/images/sushi.jpg',
      categories: ['Asian', 'Dinner', 'Lunch'],
      portions: 2,
      rating: 4
    },
    {
      id: 5,
      name: 'Chicken Tikka Masala',
      description: 'Creamy and spicy Indian curry with tender chicken',
      ingredients: [
        'Chicken thighs',
        'Yogurt',
        'Tikka masala paste',
        'Tomato sauce',
        'Heavy cream',
        'Onions',
        'Garlic',
        'Ginger',
        'Garam masala'
      ],
      instructions: [
        'Marinate chicken in yogurt and spices',
        'Grill or bake chicken',
        'Sauté onions, garlic, and ginger',
        'Add tomato sauce and spices',
        'Add cream and simmer',
        'Add chicken and cook until heated'
      ],
      imageUrl: 'assets/images/tikka-masala.jpg',
      categories: ['Indian', 'Dinner'],
      portions: 6,
      rating: 5
    },
    {
      id: 6,
      name: 'Caesar Salad',
      description: 'Classic Caesar salad with homemade dressing and croutons',
      ingredients: [
        'Romaine lettuce',
        'Parmesan cheese',
        'Croutons',
        'Caesar dressing',
        'Anchovy fillets',
        'Garlic',
        'Lemon juice',
        'Olive oil',
        'Black pepper'
      ],
      instructions: [
        'Wash and chop lettuce',
        'Make dressing with anchovy, garlic, and lemon',
        'Toast bread for croutons',
        'Toss lettuce with dressing',
        'Add croutons and cheese',
        'Season with black pepper'
      ],
      imageUrl: 'assets/images/caesar-salad.jpg',
      categories: ['Salad', 'Dinner', 'Lunch'],
      portions: 4,
      rating: 4
    }
  ];

  newRecipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    imageUrl: '',
    categories: [],
    portions: 4,
    rating: 0
  };

  ngOnInit() {
    this.loadRecipes();
    window.scrollTo(0, 0);
  }

  private loadRecipes() {
    try {
      const storedRecipes = localStorage.getItem('recipes');
      if (storedRecipes) {
        const parsed = JSON.parse(storedRecipes);
        if (Array.isArray(parsed)) {
          this.recipes = parsed;
        } else {
          throw new Error('Stored recipes is not an array');
        }
      } else {
        this.recipes = this.getDefaultRecipes();
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      this.recipes = this.getDefaultRecipes();
    }
  }

  private getDefaultRecipes(): Recipe[] {
    return [
      {
        id: 1,
        name: 'Classic Burger',
        description: 'Juicy beef patty with fresh vegetables and special sauce',
        ingredients: [
          '500g ground beef',
          'Burger buns',
          'Lettuce leaves',
          'Tomato slices',
          'Red onion rings',
          'Cheddar cheese slices',
          'Mayonnaise',
          'Ketchup',
          'Salt and pepper'
        ],
        instructions: [
          'Season ground beef with salt and pepper',
          'Form into patties',
          'Grill for 4-5 minutes each side',
          'Add cheese in the last minute',
          'Toast the buns',
          'Assemble with vegetables and sauces'
        ],
        imageUrl: 'assets/images/burger.jpg',
        categories: ['Dinner', 'Lunch'],
        portions: 4,
        rating: 4
      },
      {
        id: 2,
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
        ingredients: [
          '400g spaghetti',
          '200g pancetta',
          '4 large eggs',
          '100g Pecorino Romano',
          'Black pepper',
          'Salt'
        ],
        instructions: [
          'Cook pasta in salted water',
          'Fry pancetta until crispy',
          'Mix eggs and cheese',
          'Combine all ingredients while pasta is hot',
          'Add pasta water if needed',
          'Season with black pepper'
        ],
        imageUrl: 'assets/images/carbonara.jpg',
        categories: ['Pasta', 'Dinner'],
        portions: 4,
        rating: 5
      },
      {
        id: 3,
        name: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake with chocolate ganache',
        ingredients: [
          '2 cups flour',
          '2 cups sugar',
          '3/4 cup cocoa powder',
          '2 eggs',
          '1 cup milk',
          '1/2 cup vegetable oil',
          '2 tsp vanilla extract',
          'Chocolate ganache'
        ],
        instructions: [
          'Preheat oven to 350°F',
          'Mix dry ingredients',
          'Add wet ingredients and mix well',
          'Bake for 30-35 minutes',
          'Cool completely',
          'Top with chocolate ganache'
        ],
        imageUrl: 'assets/images/chocolate-cake.jpg',
        categories: ['Dessert'],
        portions: 8,
        rating: 5
      },
      {
        id: 4,
        name: 'Fresh Sushi Rolls',
        description: 'Japanese sushi rolls with fresh fish and vegetables',
        ingredients: [
          'Sushi rice',
          'Nori sheets',
          'Fresh salmon',
          'Cucumber',
          'Avocado',
          'Rice vinegar',
          'Wasabi',
          'Soy sauce'
        ],
        instructions: [
          'Cook and season sushi rice',
          'Place nori on bamboo mat',
          'Spread rice on nori',
          'Add fish and vegetables',
          'Roll tightly',
          'Cut into pieces'
        ],
        imageUrl: 'assets/images/sushi.jpg',
        categories: ['Asian', 'Dinner', 'Lunch'],
        portions: 2,
        rating: 4
      },
      {
        id: 5,
        name: 'Chicken Tikka Masala',
        description: 'Creamy and spicy Indian curry with tender chicken',
        ingredients: [
          'Chicken thighs',
          'Yogurt',
          'Tikka masala paste',
          'Tomato sauce',
          'Heavy cream',
          'Onions',
          'Garlic',
          'Ginger',
          'Garam masala'
        ],
        instructions: [
          'Marinate chicken in yogurt and spices',
          'Grill or bake chicken',
          'Sauté onions, garlic, and ginger',
          'Add tomato sauce and spices',
          'Add cream and simmer',
          'Add chicken and cook until heated'
        ],
        imageUrl: 'assets/images/tikka-masala.jpg',
        categories: ['Indian', 'Dinner'],
        portions: 6,
        rating: 5
      },
      {
        id: 6,
        name: 'Caesar Salad',
        description: 'Classic Caesar salad with homemade dressing and croutons',
        ingredients: [
          'Romaine lettuce',
          'Parmesan cheese',
          'Croutons',
          'Caesar dressing',
          'Anchovy fillets',
          'Garlic',
          'Lemon juice',
          'Olive oil',
          'Black pepper'
        ],
        instructions: [
          'Wash and chop lettuce',
          'Make dressing with anchovy, garlic, and lemon',
          'Toast bread for croutons',
          'Toss lettuce with dressing',
          'Add croutons and cheese',
          'Season with black pepper'
        ],
        imageUrl: 'assets/images/caesar-salad.jpg',
        categories: ['Salad', 'Dinner', 'Lunch'],
        portions: 4,
        rating: 4
      }
    ];
  }

  private saveRecipes() {
    try {
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
    } catch (error) {
      console.error('Error saving recipes:', error);
      // Optionally show user feedback
      alert('Failed to save recipe. Please try again.');
    }
  }

  submitRecipe() {
    if (!this.validateRecipe()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const maxId = Math.max(0, ...this.recipes.map(r => r.id));
      const recipe = {
        ...this.newRecipe,
        id: maxId + 1,
        ingredients: this.newRecipe.ingredients.filter(i => i.trim() !== ''),
        instructions: this.newRecipe.instructions.filter(i => i.trim() !== '')
      };

      this.recipes = [...this.recipes, recipe];
      this.saveRecipes();
      this.toggleAddRecipe();
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe. Please try again.');
    }
  }

  clearLocalStorage() {
    if (confirm('Are you sure you want to reset to default recipes? This cannot be undone.')) {
      try {
        localStorage.removeItem('recipes');
        this.recipes = this.getDefaultRecipes();
        this.selectedRecipe = null;
      } catch (error) {
        console.error('Error clearing storage:', error);
        alert('Failed to reset recipes. Please try again.');
      }
    }
  }

  get filteredRecipes(): Recipe[] {
    try {
      return this.recipes.filter(recipe => {
        // Filter out recipes with empty categories
        if (!recipe.categories || recipe.categories.length === 0) {
          return false;
        }

        // Clean up categories array to remove null, undefined, or empty strings
        recipe.categories = recipe.categories.filter(cat => cat && cat.trim() !== '');

        const matchesSearch = recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === 'All' || recipe.categories.includes(this.selectedCategory);
        return matchesSearch && matchesCategory;
      });
    } catch (error) {
      console.error('Error filtering recipes:', error);
      return this.recipes;
    }
  }

  toggleAddRecipe() {
    if (this.showAddRecipe) {
      this.resetNewRecipe();
    }
    this.showAddRecipe = !this.showAddRecipe;
  }

  resetNewRecipe() {
    this.newRecipe = {
      id: 0,
      name: '',
      description: '',
      ingredients: [''],
      instructions: [''],
      imageUrl: '',
      categories: [],
      portions: 4,
      rating: 0
    };
  }

  addIngredient() {
    this.newRecipe.ingredients.push('');
  }

  removeIngredient(index: number) {
    this.newRecipe.ingredients.splice(index, 1);
  }

  addInstruction() {
    this.newRecipe.instructions.push('');
  }

  removeInstruction(index: number) {
    this.newRecipe.instructions.splice(index, 1);
  }

  validateRecipe(): boolean {
    return (
      this.newRecipe.name.trim() !== '' &&
      this.newRecipe.description.trim() !== '' &&
      this.newRecipe.ingredients.some(i => i.trim() !== '') &&
      this.newRecipe.instructions.some(i => i.trim() !== '') &&
      this.newRecipe.categories.length > 0
    );
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

  deleteRecipe(recipe: Recipe, event: Event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
      this.recipes = this.recipes.filter(r => r.id !== recipe.id);
      if (this.selectedRecipe?.id === recipe.id) {
        this.selectedRecipe = null;
      }
      this.saveRecipes();
    }
  }

  startEditRecipe(recipe: Recipe, event: Event) {
    event.stopPropagation();
    this.editingRecipe = { ...recipe };
    this.editingRecipe.ingredients = [...recipe.ingredients];
    this.editingRecipe.instructions = [...recipe.instructions];
    this.showEditRecipe = true;
  }

  cancelEdit() {
    this.showEditRecipe = false;
    this.editingRecipe = null;
  }

  submitEditRecipe() {
    if (!this.editingRecipe || !this.validateEditRecipe()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const index = this.recipes.findIndex(r => r.id === this.editingRecipe!.id);
      if (index !== -1) {
        const updatedRecipe = {
          ...this.editingRecipe,
          ingredients: this.editingRecipe.ingredients.filter(i => i.trim() !== ''),
          instructions: this.editingRecipe.instructions.filter(i => i.trim() !== '')
        };
        this.recipes[index] = updatedRecipe;
        if (this.selectedRecipe?.id === updatedRecipe.id) {
          this.selectedRecipe = updatedRecipe;
        }
        this.saveRecipes();
        this.showEditRecipe = false;
        this.editingRecipe = null;
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe. Please try again.');
    }
  }

  validateEditRecipe(): boolean {
    return this.editingRecipe
      ? this.editingRecipe.name.trim() !== '' &&
        this.editingRecipe.description.trim() !== '' &&
        this.editingRecipe.ingredients.some(i => i.trim() !== '') &&
        this.editingRecipe.instructions.some(i => i.trim() !== '') &&
        this.editingRecipe.categories.length > 0
      : false;
  }

  addIngredientToEdit() {
    if (this.editingRecipe) {
      this.editingRecipe.ingredients.push('');
    }
  }

  removeIngredientFromEdit(index: number) {
    if (this.editingRecipe) {
      this.editingRecipe.ingredients.splice(index, 1);
    }
  }

  addInstructionToEdit() {
    if (this.editingRecipe) {
      this.editingRecipe.instructions.push('');
    }
  }

  removeInstructionFromEdit(index: number) {
    if (this.editingRecipe) {
      this.editingRecipe.instructions.splice(index, 1);
    }
  }

  toggleCategory(category: string, categories: string[]) {
    const index = categories.indexOf(category);
    if (index === -1) {
      categories.push(category);
    } else {
      categories.splice(index, 1);
    }
  }

  toggleSelectedCategory(category: string) {
    if (this.selectedCategory === category) {
      this.selectedCategory = 'All';
    } else {
      this.selectedCategory = category;
    }
  }

  updateRating(recipe: Recipe, rating: number, event: Event) {
    event.stopPropagation();
    recipe.rating = rating;
    this.saveRecipes();
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, index) => index < rating ? 1 : 0);
  }
}
