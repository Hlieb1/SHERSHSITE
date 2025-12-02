document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-card').forEach(card => {
    const slides = card.querySelectorAll('.media-slide');
    const prevBtn = card.querySelector('.nav.prev');
    const nextBtn = card.querySelector('.nav.next');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    showSlide(currentSlide);
  });

  // Load DB data
  loadDrone();
  loadCatapult();
});


// ====================== SHERSH-8 ======================
async function loadDrone() {
  const res = await fetch("/api/drones/shersh-8");
  const drone = await res.json();

  console.log("Дані SHERSH-8:", drone);

  const list = document.getElementById("drone-specs");

  if (!drone) {
    list.innerHTML = "<li>Помилка завантаження даних</li>";
    return;
  }

  list.innerHTML = `
    <li><strong>Тип:</strong> ${drone.TYPE}</li>
    <li><strong>Тип старту / посадки:</strong> ${drone.LAUNCHLANDING}</li>
    <li><strong>Швидкість польоту:</strong> мінімальна — ${drone.MINSPEEDKMH} км/год;
        крейсерська — ${drone.CRUISESPEEDMINKMH}–${drone.CRUISESPEEDMAXKMH} км/год;
        максимальна — ${drone.MAXSPEEDKMH} км/год</li>
    <li><strong>Габарити:</strong> ${drone.WINGSPANMM}×${drone.LENGTHMM}×${drone.HEIGHTMM} мм</li>
    <li><strong>Максимальна дальність польоту:</strong> ${drone.MAXRANGEKM}</li>
    <li><strong>Висота польоту:</strong> ${drone.MAXALTITUDEM} м</li>
    <li><strong>Корисне навантаження:</strong> ${drone.PAYLOADKG} кг</li>
    <li><strong>Захват цілі:</strong> ${drone.TARGETLOCKDISTANCEM} м, зум ${drone.TARGETZOOMM}</li>
    <li><strong>Радіочастота керування:</strong> ${drone.CONTROLFREQUENCY}</li>
    <li><strong>Частота відеосигналу:</strong> ${drone.VIDEOFREQUENCY}</li>
    <li><strong>Акумулятор:</strong> ${drone.BATTERY}</li>
    <li><strong>Відеопередавач:</strong> ${drone.VIDEOTRANSMITTER}</li>
    <li><strong>Тип двигуна:</strong> ${drone.ENGINETYPE}</li>
    <li><strong>Пропелер:</strong> ${drone.PROPELLER}</li>
    <li><strong>Час розгортання комплексу:</strong> ${drone.DEPLOYMENTTIME}</li>
  `;
}


// ====================== CATAPULT ======================
async function loadCatapult() {
  const res = await fetch("/api/catapult");
  const cat = await res.json();

  console.log("Катапульта:", cat);

  const list = document.getElementById("catapult-specs");

  // перевірка чи прийшли дані з backend
  if (!cat || Object.keys(cat).length === 0) {
    list.innerHTML = "<li>Помилка: дані катапульти не знайдені</li>";
    return;
  }

  list.innerHTML = `
    <li><strong>Тип:</strong> ${cat.TYPE}</li>
    <li><strong>Довжина направляючої:</strong> ${cat.GUIDE_LENGTH}</li>
    <li><strong>Максимальна злітна маса БПЛА:</strong> ${cat.MAX_UAV_WEIGHT_KG} кг</li>
    <li><strong>Принцип дії:</strong> ${cat.ACTION_PRINCIPLE}</li>
    <li><strong>Час підготовки:</strong> ${cat.PREP_TIME_MIN}</li>
    <li><strong>Конструкція:</strong> ${cat.CONSTRUCTION}</li>
  `;
}
