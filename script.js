// Xcursions Quiz Logic

const form = document.getElementById('quizForm');
const resultSection = document.getElementById('result');
const resultTitle = document.getElementById('resultTitle');
const resultDescription = document.getElementById('resultDescription');
const resultRegions = document.getElementById('resultRegions');
const resultCTA = document.getElementById('resultCTA');
const restartBtn = document.getElementById('restartBtn');

// Category metadata
const categories = {
  beach: {
    title: 'Beach & Chill Lover',
    regions: ['Zanzibar', 'Seychelles', 'Cape Verde', 'Bali'],
    description:
      "You’re all about sun, sand, slow mornings and soft life. Think turquoise waters, lazy brunches and sunsets that reset your brain.",
  },
  city: {
    title: 'City Explorer',
    regions: ['London', 'Dubai', 'Istanbul', 'Paris'],
    description:
      "You love bright lights, city walks, great food and endless things to do. Museums, rooftop bars and metro lines don’t scare you.",
  },
  culture: {
    title: 'Culture & History Seeker',
    regions: ['Cairo', 'Rome', 'Athens', 'Jerusalem'],
    description:
      "You travel to learn. Castles, ruins, museums and local stories are your thing. You come back from trips with facts, not just photos.",
  },
  nightlife: {
    title: 'Nightlife & Vibes Traveller',
    regions: ['Dubai', 'Lagos (staycation)', 'Barcelona', 'Mykonos'],
    description:
      "You want music, parties, late nights and big energy. You follow the beats, not just the itinerary.",
  },
  nature: {
    title: 'Nature & Adventure Explorer',
    regions: ['Cape Town', 'Kenya (safari)', 'Rwanda', 'Switzerland'],
    description:
      "You love views, mountains, wildlife and active days. Think hiking, safaris, cable cars and road trips with crazy scenery.",
  },
};

// Tie-break priority order
const priority = ['city', 'beach', 'culture', 'nature', 'nightlife'];

// Scoring map per question/answer → category weights
const scoring = {
  q1: {
    beach: { beach: 2 },
    city: { city: 2 },
    culture: { culture: 2 },
    nightlife: { nightlife: 2 },
    nature: { nature: 2 },
  },
  q2: {
    solo: { city: 2, culture: 2, nature: 2 },
    friends: { nightlife: 2, beach: 2, nature: 2 },
    partner: { beach: 2, culture: 2, city: 2 },
    family: { beach: 2, culture: 2, nature: 2 },
  },
  q3: {
    relax: { beach: 2 },
    landmarks: { city: 2, culture: 2 },
    local_culture: { culture: 2 },
    parties: { nightlife: 2 },
    new_experiences: { nature: 2 },
  },
  q4: {
    busy: { city: 2, nightlife: 2 },
    balance: { beach: 2, city: 1, culture: 1 },
    calm: { beach: 2, nature: 2 },
    festival: { nightlife: 2 },
  },
  q5: {
    photo_beach: { beach: 2 },
    photo_city: { city: 2 },
    photo_culture: { culture: 2 },
    photo_nightlife: { nightlife: 2 },
    photo_nature: { nature: 2 },
  },
};

function computeResult(formData) {
  const scores = { beach: 0, city: 0, culture: 0, nightlife: 0, nature: 0 };

  for (const q of ['q1', 'q2', 'q3', 'q4', 'q5']) {
    const ans = formData.get(q);
    const weights = scoring[q][ans];
    for (const k in weights) {
      scores[k] += weights[k];
    }
  }

  // Determine top category
  const max = Math.max(...Object.values(scores));
  const tied = Object.keys(scores).filter((k) => scores[k] === max);
  const top = tied.length === 1 ? tied[0] : priority.find((p) => tied.includes(p));
  return top;
}

function showResult(categoryKey) {
  const c = categories[categoryKey];
  resultTitle.textContent = `Your result: ${c.title}`;
  resultDescription.textContent = c.description;
  resultRegions.textContent = `Ideal regions: ${c.regions.join(', ')}`;
  resultCTA.textContent = `Reply to this email or send us a DM with “I’m a ${c.title}” and we’ll send you 3 trip ideas that match your vibe.`;

  resultSection.hidden = false;
  // Smooth scroll into view for mobile
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate required radios (browser handles most of it)
  const formData = new FormData(form);
  const top = computeResult(formData);
  showResult(top);
});

restartBtn.addEventListener('click', () => {
  form.reset();
  resultSection.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});