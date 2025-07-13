const space = document.querySelector('.space');
const form = document.getElementById('moth-form');
const music = document.getElementById('bg-music');
const toggleMusic = document.getElementById('toggle-music');

let moths = JSON.parse(localStorage.getItem('moths') || '[]');

function createMoth(name, date) {
  const moth = document.createElement('img');
  moth.src = 'images/luna-moth.png';
  moth.classList.add('moth');
  moth.style.left = Math.random() * window.innerWidth + 'px';
  moth.style.top = Math.random() * (window.innerHeight * 0.7) + 'px';

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.innerText = `${name}\n${date}`;
  document.body.appendChild(tooltip);

  moth.addEventListener('mousemove', e => {
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY - 20 + 'px';
    tooltip.style.display = 'block';
  });

  moth.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });

  space.appendChild(moth);
}

moths.forEach(({ name, date }) => createMoth(name, date));

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const date = document.getElementById('date').value.trim();
  if (name && date) {
    const mothData = { name, date };
    moths.push(mothData);
    localStorage.setItem('moths', JSON.stringify(moths));
    createMoth(name, date);
    form.reset();
  }
});

toggleMusic.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    toggleMusic.textContent = '🔇 Música';
  } else {
    music.pause();
    toggleMusic.textContent = '🎵 Música';
  }
});
