// The first 20 entries are preserved from your existing catalogue.
// Entries 21–200 are fictional sample books with original SVG covers.
// featured controls the homepage selection; staffPick controls the badge.
const bookDescriptions = {
  1: 'Nora Seed discovers a library between life and death where each book opens onto a different version of her life. Her journeys explore regret, possibility, and what makes a life meaningful.',
  2: 'A practical guide to building helpful routines and changing behaviour through small, consistent improvements.',
  3: 'A comfort-loving hobbit is drawn into a dangerous journey with a band of dwarves, discovering courage and adventure far beyond home.',
  4: 'Tara Westover reflects on growing up in an isolated family and finding education, independence, and a new understanding of her past.',
  5: 'A young shepherd travels in search of treasure and discovers lessons about purpose, courage, and following a personal dream.',
  6: 'In a society shaped by surveillance and state control, Winston Smith struggles to hold on to truth, independent thought, and personal freedom.',
  7: 'Elizabeth Bennet navigates family expectations, social class, and first impressions as she searches for a relationship built on mutual respect.',
  8: 'Through a child’s perspective on life in Alabama, this novel explores empathy, prejudice, and the pursuit of justice.',
  9: 'Set among the wealth and social ambition of the Jazz Age, this novel examines reinvention, longing, and the limits of the American dream.',
  10: 'After farm animals rebel against their human owner, their new society becomes a sharp fable about power, inequality, and political corruption.',
  11: 'A stranded pilot meets a thoughtful young visitor from another world in a story about friendship, imagination, and seeing what matters.',
  12: 'On the desert planet Arrakis, political conflict, ecology, and the fate of a young heir converge in an expansive science-fiction adventure.',
  13: 'A young girl in wartime Germany finds comfort and connection in books while confronting loss, courage, and the power of stories.',
  14: 'Cal Newport offers strategies for protecting attention and making time for focused, demanding work in a world full of distractions.',
  15: 'Morgan Housel uses memorable examples to explore how emotions, personal experience, and behaviour shape financial decisions.',
  16: 'Simon Sinek explores how a clear sense of purpose can guide leaders, teams, and organisations.',
  17: 'Charles Duhigg examines how habits form and how understanding their patterns can help people and organisations change them.',
  18: 'Daniel Kahneman explains two modes of thinking and how they influence judgment, decision-making, and common mental biases.',
  19: 'Yuval Noah Harari surveys human history, from early societies to modern life, and considers the forces that shaped our world.',
  20: 'Viktor Frankl reflects on his experiences and explores how meaning, responsibility, and inner resilience can help people face hardship.',
}

function describeBook(book) {
  if (bookDescriptions[book.id]) {
    return bookDescriptions[book.id]
  }

  if (book.category === 'Fiction') {
    const setting = book.title.replace(
      /^(Letters from|The Secret of|A Summer at|The Last Light in|Beyond|Return to)\s+/,
      '',
    )

    if (book.title.startsWith('Letters from')) {
      return `A story told through messages connected to ${setting}, where old memories and new discoveries draw the characters into an unexpected mystery.`
    }

    if (book.title.startsWith('The Secret of')) {
      return `A hidden mystery waits in ${setting}. Follow the clues as its visitors uncover long-buried secrets and decide what to do with them.`
    }

    if (book.title.startsWith('A Summer at')) {
      return `Set in ${setting}, this warm seasonal story follows fresh beginnings, unexpected friendships, and discoveries that change the way its characters see home.`
    }

    if (book.title.startsWith('The Last Light in')) {
      return `As the light begins to fade in ${setting}, its residents face a growing challenge and must decide what is worth protecting.`
    }

    if (book.title.startsWith('Beyond')) {
      return `An adventurous journey reaches beyond ${setting}, opening a door to unfamiliar places, difficult choices, and new possibilities.`
    }

    return `A return to ${setting} brings familiar faces together and reveals how the place—and its people—have changed.`
  }

  const topic = book.title
    .replace(
      /^(A Beginner’s Guide to|The Art of|Small Steps in|Exploring|The Foundations of|A Year of|Fresh Ideas for|The Everyday Guide to|Understanding)\s+/,
      '',
    )
    .replace(/\s+in Practice$/, '')

  if (book.title.startsWith('A Beginner’s Guide')) {
    return `An approachable introduction to ${topic}, with clear explanations and practical ideas readers can use in everyday life.`
  }

  if (book.title.startsWith('A Year of')) {
    return `A year of short prompts and practical ideas to help readers explore ${topic} one day at a time.`
  }

  if (book.title.startsWith('Fresh Ideas')) {
    return `A collection of fresh perspectives and exercises for exploring ${topic} and putting new ideas into action.`
  }

  if (book.title.startsWith('The Everyday Guide')) {
    return `A clear everyday reference to ${topic}, breaking key ideas into practical steps and examples.`
  }

  if (book.title.startsWith('Understanding')) {
    return `An accessible introduction to ${topic}, explaining core concepts and how they connect to daily life.`
  }

  if (book.title.startsWith('Small Steps')) {
    return `A practical guide to making steady progress in ${topic} through manageable steps and everyday habits.`
  }

  if (book.title.startsWith('The Foundations')) {
    return `A guide to the essential ideas behind ${topic}, designed to help readers build confidence from the ground up.`
  }

  if (book.title.endsWith('in Practice')) {
    return `Actionable advice for applying ${topic} in real situations, with an emphasis on useful habits and practical decisions.`
  }

  return `Explore ${topic} through clear explanations, useful examples, and ideas to apply in everyday life.`
}

const catalogueBooks = [
  {
    "id": 1,
    "title": "The Midnight Library",
    "author": "Matt Haig",
    "category": "Fiction",
    "price": 14.99,
    "staffPick": false,
    "image": "/images/the-midnight-library.jpg",
    "featured": true
  },
  {
    "id": 2,
    "title": "Atomic Habits",
    "author": "James Clear",
    "category": "Nonfiction",
    "price": 18.5,
    "staffPick": true,
    "image": "/images/atomic-habits.jpg",
    "featured": true
  },
  {
    "id": 3,
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "category": "Fiction",
    "price": 12.99,
    "staffPick": true,
    "image": "/images/the-hobbit.jpg",
    "featured": true
  },
  {
    "id": 4,
    "title": "Educated",
    "author": "Tara Westover",
    "category": "Nonfiction",
    "price": 16.75,
    "staffPick": false,
    "image": "/images/educated.jpg",
    "featured": true
  },
  {
    "id": 5,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "category": "Fiction",
    "price": 13.5,
    "staffPick": true,
    "image": "/images/the-alchemist.svg",
    "featured": true
  },
  {
    "id": 6,
    "title": "1984",
    "author": "George Orwell",
    "category": "Fiction",
    "price": 11.99,
    "staffPick": false,
    "image": "/images/1984.svg",
    "featured": false
  },
  {
    "id": 7,
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "category": "Fiction",
    "price": 10.5,
    "staffPick": false,
    "image": "/images/pride-and-prejudice.svg",
    "featured": false
  },
  {
    "id": 8,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "category": "Fiction",
    "price": 14.25,
    "staffPick": false,
    "image": "/images/to-kill-a-mockingbird.svg",
    "featured": false
  },
  {
    "id": 9,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "price": 10.99,
    "staffPick": false,
    "image": "/images/the-great-gatsby.svg",
    "featured": false
  },
  {
    "id": 10,
    "title": "Animal Farm",
    "author": "George Orwell",
    "category": "Fiction",
    "price": 9.99,
    "staffPick": false,
    "image": "/images/animal-farm.svg",
    "featured": false
  },
  {
    "id": 11,
    "title": "The Little Prince",
    "author": "Antoine de Saint-Exupéry",
    "category": "Fiction",
    "price": 11.5,
    "staffPick": false,
    "image": "/images/the-little-prince.svg",
    "featured": false
  },
  {
    "id": 12,
    "title": "Dune",
    "author": "Frank Herbert",
    "category": "Fiction",
    "price": 19.99,
    "staffPick": true,
    "image": "/images/dune.svg",
    "featured": true
  },
  {
    "id": 13,
    "title": "The Book Thief",
    "author": "Markus Zusak",
    "category": "Fiction",
    "price": 15.75,
    "staffPick": false,
    "image": "/images/the-book-thief.svg",
    "featured": false
  },
  {
    "id": 14,
    "title": "Deep Work",
    "author": "Cal Newport",
    "category": "Nonfiction",
    "price": 17.5,
    "staffPick": true,
    "image": "/images/deep-work.svg",
    "featured": true
  },
  {
    "id": 15,
    "title": "The Psychology of Money",
    "author": "Morgan Housel",
    "category": "Nonfiction",
    "price": 18.99,
    "staffPick": true,
    "image": "/images/the-psychology-of-money.svg",
    "featured": true
  },
  {
    "id": 16,
    "title": "Start with Why",
    "author": "Simon Sinek",
    "category": "Nonfiction",
    "price": 16.5,
    "staffPick": false,
    "image": "/images/start-with-why.svg",
    "featured": false
  },
  {
    "id": 17,
    "title": "The Power of Habit",
    "author": "Charles Duhigg",
    "category": "Nonfiction",
    "price": 17.99,
    "staffPick": false,
    "image": "/images/the-power-of-habit.svg",
    "featured": false
  },
  {
    "id": 18,
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "category": "Nonfiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/thinking-fast-and-slow.svg",
    "featured": false
  },
  {
    "id": 19,
    "title": "Sapiens",
    "author": "Yuval Noah Harari",
    "category": "Nonfiction",
    "price": 22.99,
    "staffPick": false,
    "image": "/images/sapiens.svg",
    "featured": false
  },
  {
    "id": 20,
    "title": "Man's Search for Meaning",
    "author": "Viktor E. Frankl",
    "category": "Nonfiction",
    "price": 14.5,
    "staffPick": false,
    "image": "/images/mans-search-for-meaning.svg",
    "featured": false
  },
  {
    "id": 21,
    "title": "Letters from the Lantern House",
    "author": "Mira Ashby",
    "category": "Fiction",
    "price": 9.5,
    "staffPick": true,
    "image": "/images/sample-book-021.svg",
    "featured": false
  },
  {
    "id": 22,
    "title": "Letters from the Glass Orchard",
    "author": "Felix Alden",
    "category": "Fiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-022.svg",
    "featured": false
  },
  {
    "id": 23,
    "title": "Letters from the Paper Kingdom",
    "author": "Ada Winslow",
    "category": "Fiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-023.svg",
    "featured": false
  },
  {
    "id": 24,
    "title": "Letters from the Winter Harbour",
    "author": "Owen Briar",
    "category": "Fiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-024.svg",
    "featured": false
  },
  {
    "id": 25,
    "title": "Letters from the Amber Garden",
    "author": "Cleo Bennett",
    "category": "Fiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-025.svg",
    "featured": false
  },
  {
    "id": 26,
    "title": "Letters from the Silent Station",
    "author": "Jonas Vale",
    "category": "Fiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-026.svg",
    "featured": false
  },
  {
    "id": 27,
    "title": "Letters from the Silver Forest",
    "author": "Zara Ellery",
    "category": "Fiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-027.svg",
    "featured": false
  },
  {
    "id": 28,
    "title": "Letters from the Clockwork City",
    "author": "Miles Arden",
    "category": "Fiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-028.svg",
    "featured": false
  },
  {
    "id": 29,
    "title": "Letters from the Hidden Valley",
    "author": "Freya Hollis",
    "category": "Fiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-029.svg",
    "featured": false
  },
  {
    "id": 30,
    "title": "Letters from the Moonlit Archive",
    "author": "Elias Marlow",
    "category": "Fiction",
    "price": 16.25,
    "staffPick": false,
    "image": "/images/sample-book-030.svg",
    "featured": false
  },
  {
    "id": 31,
    "title": "Letters from the Copper Island",
    "author": "Clara Moss",
    "category": "Fiction",
    "price": 17.0,
    "staffPick": false,
    "image": "/images/sample-book-031.svg",
    "featured": false
  },
  {
    "id": 32,
    "title": "Letters from the Velvet Theatre",
    "author": "Luca Whitmore",
    "category": "Fiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-032.svg",
    "featured": false
  },
  {
    "id": 33,
    "title": "Letters from the Forgotten Bridge",
    "author": "Sana Rivers",
    "category": "Fiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-033.svg",
    "featured": false
  },
  {
    "id": 34,
    "title": "Letters from the Starlight Cafe",
    "author": "Theo Rowan",
    "category": "Fiction",
    "price": 19.25,
    "staffPick": true,
    "image": "/images/sample-book-034.svg",
    "featured": false
  },
  {
    "id": 35,
    "title": "Letters from the Painted Library",
    "author": "Nora Bellamy",
    "category": "Fiction",
    "price": 20.0,
    "staffPick": false,
    "image": "/images/sample-book-035.svg",
    "featured": false
  },
  {
    "id": 36,
    "title": "The Secret of the Lantern House",
    "author": "Ravi North",
    "category": "Fiction",
    "price": 20.75,
    "staffPick": false,
    "image": "/images/sample-book-036.svg",
    "featured": false
  },
  {
    "id": 37,
    "title": "The Secret of the Glass Orchard",
    "author": "Lina Mercer",
    "category": "Fiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/sample-book-037.svg",
    "featured": false
  },
  {
    "id": 38,
    "title": "The Secret of the Paper Kingdom",
    "author": "Samira Oakley",
    "category": "Fiction",
    "price": 22.25,
    "staffPick": false,
    "image": "/images/sample-book-038.svg",
    "featured": false
  },
  {
    "id": 39,
    "title": "The Secret of the Winter Harbour",
    "author": "Amara Finch",
    "category": "Fiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-039.svg",
    "featured": false
  },
  {
    "id": 40,
    "title": "The Secret of the Amber Garden",
    "author": "Hugo Beckett",
    "category": "Fiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-040.svg",
    "featured": false
  },
  {
    "id": 41,
    "title": "The Secret of the Silent Station",
    "author": "Iris Hawthorne",
    "category": "Fiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-041.svg",
    "featured": false
  },
  {
    "id": 42,
    "title": "The Secret of the Silver Forest",
    "author": "Adam Waverly",
    "category": "Fiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-042.svg",
    "featured": false
  },
  {
    "id": 43,
    "title": "The Secret of the Clockwork City",
    "author": "Leah Fenwick",
    "category": "Fiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-043.svg",
    "featured": false
  },
  {
    "id": 44,
    "title": "The Secret of the Hidden Valley",
    "author": "Oscar Linden",
    "category": "Fiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-044.svg",
    "featured": false
  },
  {
    "id": 45,
    "title": "The Secret of the Moonlit Archive",
    "author": "Safiya Reed",
    "category": "Fiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-045.svg",
    "featured": false
  },
  {
    "id": 46,
    "title": "The Secret of the Copper Island",
    "author": "Toby Langley",
    "category": "Fiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-046.svg",
    "featured": false
  },
  {
    "id": 47,
    "title": "The Secret of the Velvet Theatre",
    "author": "Nadia Wren",
    "category": "Fiction",
    "price": 14.75,
    "staffPick": true,
    "image": "/images/sample-book-047.svg",
    "featured": false
  },
  {
    "id": 48,
    "title": "The Secret of the Forgotten Bridge",
    "author": "Idris Hartwell",
    "category": "Fiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-048.svg",
    "featured": false
  },
  {
    "id": 49,
    "title": "The Secret of the Starlight Cafe",
    "author": "Esme Calder",
    "category": "Fiction",
    "price": 16.25,
    "staffPick": false,
    "image": "/images/sample-book-049.svg",
    "featured": false
  },
  {
    "id": 50,
    "title": "The Secret of the Painted Library",
    "author": "Noah Westbrook",
    "category": "Fiction",
    "price": 17.0,
    "staffPick": false,
    "image": "/images/sample-book-050.svg",
    "featured": false
  },
  {
    "id": 51,
    "title": "A Summer at the Lantern House",
    "author": "Mira Ashby",
    "category": "Fiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-051.svg",
    "featured": false
  },
  {
    "id": 52,
    "title": "A Summer at the Glass Orchard",
    "author": "Felix Alden",
    "category": "Fiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-052.svg",
    "featured": false
  },
  {
    "id": 53,
    "title": "A Summer at the Paper Kingdom",
    "author": "Ada Winslow",
    "category": "Fiction",
    "price": 19.25,
    "staffPick": false,
    "image": "/images/sample-book-053.svg",
    "featured": false
  },
  {
    "id": 54,
    "title": "A Summer at the Winter Harbour",
    "author": "Owen Briar",
    "category": "Fiction",
    "price": 20.0,
    "staffPick": false,
    "image": "/images/sample-book-054.svg",
    "featured": false
  },
  {
    "id": 55,
    "title": "A Summer at the Amber Garden",
    "author": "Cleo Bennett",
    "category": "Fiction",
    "price": 20.75,
    "staffPick": false,
    "image": "/images/sample-book-055.svg",
    "featured": false
  },
  {
    "id": 56,
    "title": "A Summer at the Silent Station",
    "author": "Jonas Vale",
    "category": "Fiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/sample-book-056.svg",
    "featured": false
  },
  {
    "id": 57,
    "title": "A Summer at the Silver Forest",
    "author": "Zara Ellery",
    "category": "Fiction",
    "price": 22.25,
    "staffPick": false,
    "image": "/images/sample-book-057.svg",
    "featured": false
  },
  {
    "id": 58,
    "title": "A Summer at the Clockwork City",
    "author": "Miles Arden",
    "category": "Fiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-058.svg",
    "featured": false
  },
  {
    "id": 59,
    "title": "A Summer at the Hidden Valley",
    "author": "Freya Hollis",
    "category": "Fiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-059.svg",
    "featured": false
  },
  {
    "id": 60,
    "title": "A Summer at the Moonlit Archive",
    "author": "Elias Marlow",
    "category": "Fiction",
    "price": 10.25,
    "staffPick": true,
    "image": "/images/sample-book-060.svg",
    "featured": false
  },
  {
    "id": 61,
    "title": "A Summer at the Copper Island",
    "author": "Clara Moss",
    "category": "Fiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-061.svg",
    "featured": false
  },
  {
    "id": 62,
    "title": "A Summer at the Velvet Theatre",
    "author": "Luca Whitmore",
    "category": "Fiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-062.svg",
    "featured": false
  },
  {
    "id": 63,
    "title": "A Summer at the Forgotten Bridge",
    "author": "Sana Rivers",
    "category": "Fiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-063.svg",
    "featured": false
  },
  {
    "id": 64,
    "title": "A Summer at the Starlight Cafe",
    "author": "Theo Rowan",
    "category": "Fiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-064.svg",
    "featured": false
  },
  {
    "id": 65,
    "title": "A Summer at the Painted Library",
    "author": "Nora Bellamy",
    "category": "Fiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-065.svg",
    "featured": false
  },
  {
    "id": 66,
    "title": "The Last Light in the Lantern House",
    "author": "Ravi North",
    "category": "Fiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-066.svg",
    "featured": false
  },
  {
    "id": 67,
    "title": "The Last Light in the Glass Orchard",
    "author": "Lina Mercer",
    "category": "Fiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-067.svg",
    "featured": false
  },
  {
    "id": 68,
    "title": "The Last Light in the Paper Kingdom",
    "author": "Samira Oakley",
    "category": "Fiction",
    "price": 16.25,
    "staffPick": false,
    "image": "/images/sample-book-068.svg",
    "featured": false
  },
  {
    "id": 69,
    "title": "The Last Light in the Winter Harbour",
    "author": "Amara Finch",
    "category": "Fiction",
    "price": 17.0,
    "staffPick": false,
    "image": "/images/sample-book-069.svg",
    "featured": false
  },
  {
    "id": 70,
    "title": "The Last Light in the Amber Garden",
    "author": "Hugo Beckett",
    "category": "Fiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-070.svg",
    "featured": false
  },
  {
    "id": 71,
    "title": "The Last Light in the Silent Station",
    "author": "Iris Hawthorne",
    "category": "Fiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-071.svg",
    "featured": false
  },
  {
    "id": 72,
    "title": "The Last Light in the Silver Forest",
    "author": "Adam Waverly",
    "category": "Fiction",
    "price": 19.25,
    "staffPick": false,
    "image": "/images/sample-book-072.svg",
    "featured": false
  },
  {
    "id": 73,
    "title": "The Last Light in the Clockwork City",
    "author": "Leah Fenwick",
    "category": "Fiction",
    "price": 20.0,
    "staffPick": true,
    "image": "/images/sample-book-073.svg",
    "featured": false
  },
  {
    "id": 74,
    "title": "The Last Light in the Hidden Valley",
    "author": "Oscar Linden",
    "category": "Fiction",
    "price": 20.75,
    "staffPick": false,
    "image": "/images/sample-book-074.svg",
    "featured": false
  },
  {
    "id": 75,
    "title": "The Last Light in the Moonlit Archive",
    "author": "Safiya Reed",
    "category": "Fiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/sample-book-075.svg",
    "featured": false
  },
  {
    "id": 76,
    "title": "The Last Light in the Copper Island",
    "author": "Toby Langley",
    "category": "Fiction",
    "price": 22.25,
    "staffPick": false,
    "image": "/images/sample-book-076.svg",
    "featured": false
  },
  {
    "id": 77,
    "title": "The Last Light in the Velvet Theatre",
    "author": "Nadia Wren",
    "category": "Fiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-077.svg",
    "featured": false
  },
  {
    "id": 78,
    "title": "The Last Light in the Forgotten Bridge",
    "author": "Idris Hartwell",
    "category": "Fiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-078.svg",
    "featured": false
  },
  {
    "id": 79,
    "title": "The Last Light in the Starlight Cafe",
    "author": "Esme Calder",
    "category": "Fiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-079.svg",
    "featured": false
  },
  {
    "id": 80,
    "title": "The Last Light in the Painted Library",
    "author": "Noah Westbrook",
    "category": "Fiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-080.svg",
    "featured": false
  },
  {
    "id": 81,
    "title": "Beyond the Lantern House",
    "author": "Mira Ashby",
    "category": "Fiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-081.svg",
    "featured": false
  },
  {
    "id": 82,
    "title": "Beyond the Glass Orchard",
    "author": "Felix Alden",
    "category": "Fiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-082.svg",
    "featured": false
  },
  {
    "id": 83,
    "title": "Beyond the Paper Kingdom",
    "author": "Ada Winslow",
    "category": "Fiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-083.svg",
    "featured": false
  },
  {
    "id": 84,
    "title": "Beyond the Winter Harbour",
    "author": "Owen Briar",
    "category": "Fiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-084.svg",
    "featured": false
  },
  {
    "id": 85,
    "title": "Beyond the Amber Garden",
    "author": "Cleo Bennett",
    "category": "Fiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-085.svg",
    "featured": false
  },
  {
    "id": 86,
    "title": "Beyond the Silent Station",
    "author": "Jonas Vale",
    "category": "Fiction",
    "price": 15.5,
    "staffPick": true,
    "image": "/images/sample-book-086.svg",
    "featured": false
  },
  {
    "id": 87,
    "title": "Beyond the Silver Forest",
    "author": "Zara Ellery",
    "category": "Fiction",
    "price": 16.25,
    "staffPick": false,
    "image": "/images/sample-book-087.svg",
    "featured": false
  },
  {
    "id": 88,
    "title": "Beyond the Clockwork City",
    "author": "Miles Arden",
    "category": "Fiction",
    "price": 17.0,
    "staffPick": false,
    "image": "/images/sample-book-088.svg",
    "featured": false
  },
  {
    "id": 89,
    "title": "Beyond the Hidden Valley",
    "author": "Freya Hollis",
    "category": "Fiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-089.svg",
    "featured": false
  },
  {
    "id": 90,
    "title": "Beyond the Moonlit Archive",
    "author": "Elias Marlow",
    "category": "Fiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-090.svg",
    "featured": false
  },
  {
    "id": 91,
    "title": "Beyond the Copper Island",
    "author": "Clara Moss",
    "category": "Fiction",
    "price": 19.25,
    "staffPick": false,
    "image": "/images/sample-book-091.svg",
    "featured": false
  },
  {
    "id": 92,
    "title": "Beyond the Velvet Theatre",
    "author": "Luca Whitmore",
    "category": "Fiction",
    "price": 20.0,
    "staffPick": false,
    "image": "/images/sample-book-092.svg",
    "featured": false
  },
  {
    "id": 93,
    "title": "Beyond the Forgotten Bridge",
    "author": "Sana Rivers",
    "category": "Fiction",
    "price": 20.75,
    "staffPick": false,
    "image": "/images/sample-book-093.svg",
    "featured": false
  },
  {
    "id": 94,
    "title": "Beyond the Starlight Cafe",
    "author": "Theo Rowan",
    "category": "Fiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/sample-book-094.svg",
    "featured": false
  },
  {
    "id": 95,
    "title": "Beyond the Painted Library",
    "author": "Nora Bellamy",
    "category": "Fiction",
    "price": 22.25,
    "staffPick": false,
    "image": "/images/sample-book-095.svg",
    "featured": false
  },
  {
    "id": 96,
    "title": "Return to the Lantern House",
    "author": "Ravi North",
    "category": "Fiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-096.svg",
    "featured": false
  },
  {
    "id": 97,
    "title": "Return to the Glass Orchard",
    "author": "Lina Mercer",
    "category": "Fiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-097.svg",
    "featured": false
  },
  {
    "id": 98,
    "title": "Return to the Paper Kingdom",
    "author": "Samira Oakley",
    "category": "Fiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-098.svg",
    "featured": false
  },
  {
    "id": 99,
    "title": "Return to the Winter Harbour",
    "author": "Amara Finch",
    "category": "Fiction",
    "price": 11.0,
    "staffPick": true,
    "image": "/images/sample-book-099.svg",
    "featured": false
  },
  {
    "id": 100,
    "title": "Return to the Amber Garden",
    "author": "Hugo Beckett",
    "category": "Fiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-100.svg",
    "featured": false
  },
  {
    "id": 101,
    "title": "Return to the Silent Station",
    "author": "Iris Hawthorne",
    "category": "Fiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-101.svg",
    "featured": false
  },
  {
    "id": 102,
    "title": "Return to the Silver Forest",
    "author": "Adam Waverly",
    "category": "Fiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-102.svg",
    "featured": false
  },
  {
    "id": 103,
    "title": "Return to the Clockwork City",
    "author": "Leah Fenwick",
    "category": "Fiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-103.svg",
    "featured": false
  },
  {
    "id": 104,
    "title": "Return to the Hidden Valley",
    "author": "Oscar Linden",
    "category": "Fiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-104.svg",
    "featured": false
  },
  {
    "id": 105,
    "title": "Return to the Moonlit Archive",
    "author": "Safiya Reed",
    "category": "Fiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-105.svg",
    "featured": false
  },
  {
    "id": 106,
    "title": "Return to the Copper Island",
    "author": "Toby Langley",
    "category": "Fiction",
    "price": 16.25,
    "staffPick": false,
    "image": "/images/sample-book-106.svg",
    "featured": false
  },
  {
    "id": 107,
    "title": "Return to the Velvet Theatre",
    "author": "Nadia Wren",
    "category": "Fiction",
    "price": 17.0,
    "staffPick": false,
    "image": "/images/sample-book-107.svg",
    "featured": false
  },
  {
    "id": 108,
    "title": "Return to the Forgotten Bridge",
    "author": "Idris Hartwell",
    "category": "Fiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-108.svg",
    "featured": false
  },
  {
    "id": 109,
    "title": "Return to the Starlight Cafe",
    "author": "Esme Calder",
    "category": "Fiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-109.svg",
    "featured": false
  },
  {
    "id": 110,
    "title": "Return to the Painted Library",
    "author": "Noah Westbrook",
    "category": "Fiction",
    "price": 19.25,
    "staffPick": false,
    "image": "/images/sample-book-110.svg",
    "featured": false
  },
  {
    "id": 111,
    "title": "A Beginner’s Guide to Creative Thinking",
    "author": "Mira Ashby",
    "category": "Nonfiction",
    "price": 20.0,
    "staffPick": false,
    "image": "/images/sample-book-111.svg",
    "featured": false
  },
  {
    "id": 112,
    "title": "A Beginner’s Guide to Everyday Science",
    "author": "Felix Alden",
    "category": "Nonfiction",
    "price": 20.75,
    "staffPick": true,
    "image": "/images/sample-book-112.svg",
    "featured": false
  },
  {
    "id": 113,
    "title": "A Beginner’s Guide to Mindful Living",
    "author": "Ada Winslow",
    "category": "Nonfiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/sample-book-113.svg",
    "featured": false
  },
  {
    "id": 114,
    "title": "A Beginner’s Guide to Urban Gardening",
    "author": "Owen Briar",
    "category": "Nonfiction",
    "price": 22.25,
    "staffPick": false,
    "image": "/images/sample-book-114.svg",
    "featured": false
  },
  {
    "id": 115,
    "title": "A Beginner’s Guide to Clear Communication",
    "author": "Cleo Bennett",
    "category": "Nonfiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-115.svg",
    "featured": false
  },
  {
    "id": 116,
    "title": "A Beginner’s Guide to Personal Finance",
    "author": "Jonas Vale",
    "category": "Nonfiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-116.svg",
    "featured": false
  },
  {
    "id": 117,
    "title": "A Beginner’s Guide to Better Learning",
    "author": "Zara Ellery",
    "category": "Nonfiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-117.svg",
    "featured": false
  },
  {
    "id": 118,
    "title": "A Beginner’s Guide to Simple Cooking",
    "author": "Miles Arden",
    "category": "Nonfiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-118.svg",
    "featured": false
  },
  {
    "id": 119,
    "title": "A Beginner’s Guide to Digital Wellbeing",
    "author": "Freya Hollis",
    "category": "Nonfiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-119.svg",
    "featured": false
  },
  {
    "id": 120,
    "title": "The Art of Creative Thinking",
    "author": "Elias Marlow",
    "category": "Nonfiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-120.svg",
    "featured": false
  },
  {
    "id": 121,
    "title": "The Art of Everyday Science",
    "author": "Clara Moss",
    "category": "Nonfiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-121.svg",
    "featured": false
  },
  {
    "id": 122,
    "title": "The Art of Mindful Living",
    "author": "Luca Whitmore",
    "category": "Nonfiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-122.svg",
    "featured": false
  },
  {
    "id": 123,
    "title": "The Art of Urban Gardening",
    "author": "Sana Rivers",
    "category": "Nonfiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-123.svg",
    "featured": false
  },
  {
    "id": 124,
    "title": "The Art of Clear Communication",
    "author": "Theo Rowan",
    "category": "Nonfiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-124.svg",
    "featured": false
  },
  {
    "id": 125,
    "title": "The Art of Personal Finance",
    "author": "Nora Bellamy",
    "category": "Nonfiction",
    "price": 16.25,
    "staffPick": true,
    "image": "/images/sample-book-125.svg",
    "featured": false
  },
  {
    "id": 126,
    "title": "The Art of Better Learning",
    "author": "Ravi North",
    "category": "Nonfiction",
    "price": 17.0,
    "staffPick": false,
    "image": "/images/sample-book-126.svg",
    "featured": false
  },
  {
    "id": 127,
    "title": "The Art of Simple Cooking",
    "author": "Lina Mercer",
    "category": "Nonfiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-127.svg",
    "featured": false
  },
  {
    "id": 128,
    "title": "The Art of Digital Wellbeing",
    "author": "Samira Oakley",
    "category": "Nonfiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-128.svg",
    "featured": false
  },
  {
    "id": 129,
    "title": "Small Steps in Creative Thinking",
    "author": "Amara Finch",
    "category": "Nonfiction",
    "price": 19.25,
    "staffPick": false,
    "image": "/images/sample-book-129.svg",
    "featured": false
  },
  {
    "id": 130,
    "title": "Small Steps in Everyday Science",
    "author": "Hugo Beckett",
    "category": "Nonfiction",
    "price": 20.0,
    "staffPick": false,
    "image": "/images/sample-book-130.svg",
    "featured": false
  },
  {
    "id": 131,
    "title": "Small Steps in Mindful Living",
    "author": "Iris Hawthorne",
    "category": "Nonfiction",
    "price": 20.75,
    "staffPick": false,
    "image": "/images/sample-book-131.svg",
    "featured": false
  },
  {
    "id": 132,
    "title": "Small Steps in Urban Gardening",
    "author": "Adam Waverly",
    "category": "Nonfiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/sample-book-132.svg",
    "featured": false
  },
  {
    "id": 133,
    "title": "Small Steps in Clear Communication",
    "author": "Leah Fenwick",
    "category": "Nonfiction",
    "price": 22.25,
    "staffPick": false,
    "image": "/images/sample-book-133.svg",
    "featured": false
  },
  {
    "id": 134,
    "title": "Small Steps in Personal Finance",
    "author": "Oscar Linden",
    "category": "Nonfiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-134.svg",
    "featured": false
  },
  {
    "id": 135,
    "title": "Small Steps in Better Learning",
    "author": "Safiya Reed",
    "category": "Nonfiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-135.svg",
    "featured": false
  },
  {
    "id": 136,
    "title": "Small Steps in Simple Cooking",
    "author": "Toby Langley",
    "category": "Nonfiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-136.svg",
    "featured": false
  },
  {
    "id": 137,
    "title": "Small Steps in Digital Wellbeing",
    "author": "Nadia Wren",
    "category": "Nonfiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-137.svg",
    "featured": false
  },
  {
    "id": 138,
    "title": "Exploring Creative Thinking",
    "author": "Idris Hartwell",
    "category": "Nonfiction",
    "price": 11.75,
    "staffPick": true,
    "image": "/images/sample-book-138.svg",
    "featured": false
  },
  {
    "id": 139,
    "title": "Exploring Everyday Science",
    "author": "Esme Calder",
    "category": "Nonfiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-139.svg",
    "featured": false
  },
  {
    "id": 140,
    "title": "Exploring Mindful Living",
    "author": "Noah Westbrook",
    "category": "Nonfiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-140.svg",
    "featured": false
  },
  {
    "id": 141,
    "title": "Exploring Urban Gardening",
    "author": "Mira Ashby",
    "category": "Nonfiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-141.svg",
    "featured": false
  },
  {
    "id": 142,
    "title": "Exploring Clear Communication",
    "author": "Felix Alden",
    "category": "Nonfiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-142.svg",
    "featured": false
  },
  {
    "id": 143,
    "title": "Exploring Personal Finance",
    "author": "Ada Winslow",
    "category": "Nonfiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-143.svg",
    "featured": false
  },
  {
    "id": 144,
    "title": "Exploring Better Learning",
    "author": "Owen Briar",
    "category": "Nonfiction",
    "price": 16.25,
    "staffPick": false,
    "image": "/images/sample-book-144.svg",
    "featured": false
  },
  {
    "id": 145,
    "title": "Exploring Simple Cooking",
    "author": "Cleo Bennett",
    "category": "Nonfiction",
    "price": 17.0,
    "staffPick": false,
    "image": "/images/sample-book-145.svg",
    "featured": false
  },
  {
    "id": 146,
    "title": "Exploring Digital Wellbeing",
    "author": "Jonas Vale",
    "category": "Nonfiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-146.svg",
    "featured": false
  },
  {
    "id": 147,
    "title": "The Foundations of Creative Thinking",
    "author": "Zara Ellery",
    "category": "Nonfiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-147.svg",
    "featured": false
  },
  {
    "id": 148,
    "title": "The Foundations of Everyday Science",
    "author": "Miles Arden",
    "category": "Nonfiction",
    "price": 19.25,
    "staffPick": false,
    "image": "/images/sample-book-148.svg",
    "featured": false
  },
  {
    "id": 149,
    "title": "The Foundations of Mindful Living",
    "author": "Freya Hollis",
    "category": "Nonfiction",
    "price": 20.0,
    "staffPick": false,
    "image": "/images/sample-book-149.svg",
    "featured": false
  },
  {
    "id": 150,
    "title": "The Foundations of Urban Gardening",
    "author": "Elias Marlow",
    "category": "Nonfiction",
    "price": 20.75,
    "staffPick": false,
    "image": "/images/sample-book-150.svg",
    "featured": false
  },
  {
    "id": 151,
    "title": "The Foundations of Clear Communication",
    "author": "Clara Moss",
    "category": "Nonfiction",
    "price": 21.5,
    "staffPick": true,
    "image": "/images/sample-book-151.svg",
    "featured": false
  },
  {
    "id": 152,
    "title": "The Foundations of Personal Finance",
    "author": "Luca Whitmore",
    "category": "Nonfiction",
    "price": 22.25,
    "staffPick": false,
    "image": "/images/sample-book-152.svg",
    "featured": false
  },
  {
    "id": 153,
    "title": "The Foundations of Better Learning",
    "author": "Sana Rivers",
    "category": "Nonfiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-153.svg",
    "featured": false
  },
  {
    "id": 154,
    "title": "The Foundations of Simple Cooking",
    "author": "Theo Rowan",
    "category": "Nonfiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-154.svg",
    "featured": false
  },
  {
    "id": 155,
    "title": "The Foundations of Digital Wellbeing",
    "author": "Nora Bellamy",
    "category": "Nonfiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-155.svg",
    "featured": false
  },
  {
    "id": 156,
    "title": "Creative Thinking in Practice",
    "author": "Ravi North",
    "category": "Nonfiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-156.svg",
    "featured": false
  },
  {
    "id": 157,
    "title": "Everyday Science in Practice",
    "author": "Lina Mercer",
    "category": "Nonfiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-157.svg",
    "featured": false
  },
  {
    "id": 158,
    "title": "Mindful Living in Practice",
    "author": "Samira Oakley",
    "category": "Nonfiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-158.svg",
    "featured": false
  },
  {
    "id": 159,
    "title": "Urban Gardening in Practice",
    "author": "Amara Finch",
    "category": "Nonfiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-159.svg",
    "featured": false
  },
  {
    "id": 160,
    "title": "Clear Communication in Practice",
    "author": "Hugo Beckett",
    "category": "Nonfiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-160.svg",
    "featured": false
  },
  {
    "id": 161,
    "title": "Personal Finance in Practice",
    "author": "Iris Hawthorne",
    "category": "Nonfiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-161.svg",
    "featured": false
  },
  {
    "id": 162,
    "title": "Better Learning in Practice",
    "author": "Adam Waverly",
    "category": "Nonfiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-162.svg",
    "featured": false
  },
  {
    "id": 163,
    "title": "Simple Cooking in Practice",
    "author": "Leah Fenwick",
    "category": "Nonfiction",
    "price": 16.25,
    "staffPick": false,
    "image": "/images/sample-book-163.svg",
    "featured": false
  },
  {
    "id": 164,
    "title": "Digital Wellbeing in Practice",
    "author": "Oscar Linden",
    "category": "Nonfiction",
    "price": 17.0,
    "staffPick": true,
    "image": "/images/sample-book-164.svg",
    "featured": false
  },
  {
    "id": 165,
    "title": "A Year of Creative Thinking",
    "author": "Safiya Reed",
    "category": "Nonfiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-165.svg",
    "featured": false
  },
  {
    "id": 166,
    "title": "A Year of Everyday Science",
    "author": "Toby Langley",
    "category": "Nonfiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-166.svg",
    "featured": false
  },
  {
    "id": 167,
    "title": "A Year of Mindful Living",
    "author": "Nadia Wren",
    "category": "Nonfiction",
    "price": 19.25,
    "staffPick": false,
    "image": "/images/sample-book-167.svg",
    "featured": false
  },
  {
    "id": 168,
    "title": "A Year of Urban Gardening",
    "author": "Idris Hartwell",
    "category": "Nonfiction",
    "price": 20.0,
    "staffPick": false,
    "image": "/images/sample-book-168.svg",
    "featured": false
  },
  {
    "id": 169,
    "title": "A Year of Clear Communication",
    "author": "Esme Calder",
    "category": "Nonfiction",
    "price": 20.75,
    "staffPick": false,
    "image": "/images/sample-book-169.svg",
    "featured": false
  },
  {
    "id": 170,
    "title": "A Year of Personal Finance",
    "author": "Noah Westbrook",
    "category": "Nonfiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/sample-book-170.svg",
    "featured": false
  },
  {
    "id": 171,
    "title": "A Year of Better Learning",
    "author": "Mira Ashby",
    "category": "Nonfiction",
    "price": 22.25,
    "staffPick": false,
    "image": "/images/sample-book-171.svg",
    "featured": false
  },
  {
    "id": 172,
    "title": "A Year of Simple Cooking",
    "author": "Felix Alden",
    "category": "Nonfiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-172.svg",
    "featured": false
  },
  {
    "id": 173,
    "title": "A Year of Digital Wellbeing",
    "author": "Ada Winslow",
    "category": "Nonfiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-173.svg",
    "featured": false
  },
  {
    "id": 174,
    "title": "Fresh Ideas for Creative Thinking",
    "author": "Owen Briar",
    "category": "Nonfiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-174.svg",
    "featured": false
  },
  {
    "id": 175,
    "title": "Fresh Ideas for Everyday Science",
    "author": "Cleo Bennett",
    "category": "Nonfiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-175.svg",
    "featured": false
  },
  {
    "id": 176,
    "title": "Fresh Ideas for Mindful Living",
    "author": "Jonas Vale",
    "category": "Nonfiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-176.svg",
    "featured": false
  },
  {
    "id": 177,
    "title": "Fresh Ideas for Urban Gardening",
    "author": "Zara Ellery",
    "category": "Nonfiction",
    "price": 12.5,
    "staffPick": true,
    "image": "/images/sample-book-177.svg",
    "featured": false
  },
  {
    "id": 178,
    "title": "Fresh Ideas for Clear Communication",
    "author": "Miles Arden",
    "category": "Nonfiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-178.svg",
    "featured": false
  },
  {
    "id": 179,
    "title": "Fresh Ideas for Personal Finance",
    "author": "Freya Hollis",
    "category": "Nonfiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-179.svg",
    "featured": false
  },
  {
    "id": 180,
    "title": "Fresh Ideas for Better Learning",
    "author": "Elias Marlow",
    "category": "Nonfiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-180.svg",
    "featured": false
  },
  {
    "id": 181,
    "title": "Fresh Ideas for Simple Cooking",
    "author": "Clara Moss",
    "category": "Nonfiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-181.svg",
    "featured": false
  },
  {
    "id": 182,
    "title": "Fresh Ideas for Digital Wellbeing",
    "author": "Luca Whitmore",
    "category": "Nonfiction",
    "price": 16.25,
    "staffPick": false,
    "image": "/images/sample-book-182.svg",
    "featured": false
  },
  {
    "id": 183,
    "title": "The Everyday Guide to Creative Thinking",
    "author": "Sana Rivers",
    "category": "Nonfiction",
    "price": 17.0,
    "staffPick": false,
    "image": "/images/sample-book-183.svg",
    "featured": false
  },
  {
    "id": 184,
    "title": "The Everyday Guide to Everyday Science",
    "author": "Theo Rowan",
    "category": "Nonfiction",
    "price": 17.75,
    "staffPick": false,
    "image": "/images/sample-book-184.svg",
    "featured": false
  },
  {
    "id": 185,
    "title": "The Everyday Guide to Mindful Living",
    "author": "Nora Bellamy",
    "category": "Nonfiction",
    "price": 18.5,
    "staffPick": false,
    "image": "/images/sample-book-185.svg",
    "featured": false
  },
  {
    "id": 186,
    "title": "The Everyday Guide to Urban Gardening",
    "author": "Ravi North",
    "category": "Nonfiction",
    "price": 19.25,
    "staffPick": false,
    "image": "/images/sample-book-186.svg",
    "featured": false
  },
  {
    "id": 187,
    "title": "The Everyday Guide to Clear Communication",
    "author": "Lina Mercer",
    "category": "Nonfiction",
    "price": 20.0,
    "staffPick": false,
    "image": "/images/sample-book-187.svg",
    "featured": false
  },
  {
    "id": 188,
    "title": "The Everyday Guide to Personal Finance",
    "author": "Samira Oakley",
    "category": "Nonfiction",
    "price": 20.75,
    "staffPick": false,
    "image": "/images/sample-book-188.svg",
    "featured": false
  },
  {
    "id": 189,
    "title": "The Everyday Guide to Better Learning",
    "author": "Amara Finch",
    "category": "Nonfiction",
    "price": 21.5,
    "staffPick": false,
    "image": "/images/sample-book-189.svg",
    "featured": false
  },
  {
    "id": 190,
    "title": "The Everyday Guide to Simple Cooking",
    "author": "Hugo Beckett",
    "category": "Nonfiction",
    "price": 22.25,
    "staffPick": true,
    "image": "/images/sample-book-190.svg",
    "featured": false
  },
  {
    "id": 191,
    "title": "The Everyday Guide to Digital Wellbeing",
    "author": "Iris Hawthorne",
    "category": "Nonfiction",
    "price": 23.0,
    "staffPick": false,
    "image": "/images/sample-book-191.svg",
    "featured": false
  },
  {
    "id": 192,
    "title": "Understanding Creative Thinking",
    "author": "Adam Waverly",
    "category": "Nonfiction",
    "price": 9.5,
    "staffPick": false,
    "image": "/images/sample-book-192.svg",
    "featured": false
  },
  {
    "id": 193,
    "title": "Understanding Everyday Science",
    "author": "Leah Fenwick",
    "category": "Nonfiction",
    "price": 10.25,
    "staffPick": false,
    "image": "/images/sample-book-193.svg",
    "featured": false
  },
  {
    "id": 194,
    "title": "Understanding Mindful Living",
    "author": "Oscar Linden",
    "category": "Nonfiction",
    "price": 11.0,
    "staffPick": false,
    "image": "/images/sample-book-194.svg",
    "featured": false
  },
  {
    "id": 195,
    "title": "Understanding Urban Gardening",
    "author": "Safiya Reed",
    "category": "Nonfiction",
    "price": 11.75,
    "staffPick": false,
    "image": "/images/sample-book-195.svg",
    "featured": false
  },
  {
    "id": 196,
    "title": "Understanding Clear Communication",
    "author": "Toby Langley",
    "category": "Nonfiction",
    "price": 12.5,
    "staffPick": false,
    "image": "/images/sample-book-196.svg",
    "featured": false
  },
  {
    "id": 197,
    "title": "Understanding Personal Finance",
    "author": "Nadia Wren",
    "category": "Nonfiction",
    "price": 13.25,
    "staffPick": false,
    "image": "/images/sample-book-197.svg",
    "featured": false
  },
  {
    "id": 198,
    "title": "Understanding Better Learning",
    "author": "Idris Hartwell",
    "category": "Nonfiction",
    "price": 14.0,
    "staffPick": false,
    "image": "/images/sample-book-198.svg",
    "featured": false
  },
  {
    "id": 199,
    "title": "Understanding Simple Cooking",
    "author": "Esme Calder",
    "category": "Nonfiction",
    "price": 14.75,
    "staffPick": false,
    "image": "/images/sample-book-199.svg",
    "featured": false
  },
  {
    "id": 200,
    "title": "Understanding Digital Wellbeing",
    "author": "Noah Westbrook",
    "category": "Nonfiction",
    "price": 15.5,
    "staffPick": false,
    "image": "/images/sample-book-200.svg",
    "featured": false
  }
]

export const books = catalogueBooks.map((book) => ({
  ...book,
  description: describeBook(book),
}))
