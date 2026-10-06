// A static, curated quote list — no external API, so this app works
// fully offline and deploys as plain static files.
const QUOTES = [
  // Wisdom
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom" },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "wisdom" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "wisdom" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "wisdom" },
  { text: "It is the mark of an educated mind to entertain a thought without accepting it.", author: "Aristotle", category: "wisdom" },

  // Life
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", category: "life" },
  { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", category: "life" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "life" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll", category: "life" },

  // Success
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "success" },
  { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "success" },
  { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson", category: "success" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "success" },

  // Perseverance
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: "perseverance" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "perseverance" },
  { text: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot", category: "perseverance" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius", category: "perseverance" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin", category: "perseverance" },

  // Creativity
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein", category: "creativity" },
  { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou", category: "creativity" },
  { text: "Every artist was first an amateur.", author: "Ralph Waldo Emerson", category: "creativity" },
  { text: "Imagination is more important than knowledge.", author: "Albert Einstein", category: "creativity" },
  { text: "Creativity takes courage.", author: "Henri Matisse", category: "creativity" },

  // Humor
  { text: "I am not young enough to know everything.", author: "Oscar Wilde", category: "humor" },
  { text: "The trouble with having an open mind is that people keep coming along and sticking things in it.", author: "Terry Pratchett", category: "humor" },
  { text: "Do not take life too seriously. You will never get out of it alive.", author: "Elbert Hubbard", category: "humor" },
  { text: "I can resist everything except temptation.", author: "Oscar Wilde", category: "humor" },
  { text: "Behind every great man is a woman rolling her eyes.", author: "Jim Carrey", category: "humor" },
];
