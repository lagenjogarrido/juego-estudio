// ==========================================
// RAFA QUEST - CEREBRO DEL JUEGO
// ==========================================

// ---------- DATOS INICIALES ----------

const defaultSubjects = [
  {
    id: "ofimatica",
    name: "Aplicaciones Ofimáticas",
    icon: "💻",
    description: "Procesadores de texto, hojas de cálculo, presentaciones y más.",
    topics: []
  },
  {
    id: "redes",
    name: "Redes Locales",
    icon: "🌐",
    description: "Redes, conexiones, dispositivos y comunicaciones.",
    topics: []
  },
  {
    id: "montaje",
    name: "Montaje y Mantenimiento de Equipos",
    icon: "🖥️",
    description: "Hardware, montaje, mantenimiento y reparación.",
    topics: []
  },
  {
    id: "sistemas",
    name: "Sistemas Operativos Monopuestos",
    icon: "⚙️",
    description: "Sistemas operativos, configuración y administración.",
    topics: []
  }
];


// Estas son las 18 recompensas iniciales.
// Puedes sustituir los nombres/precios posteriormente por los originales.

const defaultRewards = [
  {
    id: "r1",
    name: "Tiempo de videojuegos",
    description: "30 minutos extra de videojuegos.",
    icon: "🎮",
    price: 50,
    category: "Ocio",
    reusable: true,
    active: true
  },
  {
    id: "r2",
    name: "Elegir película",
    description: "Tú eliges la película de esta noche.",
    icon: "🎬",
    price: 40,
    category: "Ocio",
    reusable: true,
    active: true
  },
  {
    id: "r3",
    name: "Snack favorito",
    description: "Consigue tu snack favorito.",
    icon: "🍫",
    price: 60,
    category: "Comida",
    reusable: true,
    active: true
  },
  {
    id: "r4",
    name: "Descanso extra",
    description: "15 minutos de descanso extra.",
    icon: "😎",
    price: 30,
    category: "Descanso",
    reusable: true,
    active: true
  },
  {
    id: "r5",
    name: "Elegir cena",
    description: "Hoy eliges qué se cena.",
    icon: "🍕",
    price: 70,
    category: "Comida",
    reusable: true,
    active: true
  },
  {
    id: "r6",
    name: "Música a elección",
    description: "Elige la música durante un rato.",
    icon: "🎵",
    price: 30,
    category: "Ocio",
    reusable: true,
    active: true
  },
  {
    id: "r7",
    name: "Dulce especial",
    description: "Un dulce especial como premio.",
    icon: "🍪",
    price: 50,
    category: "Comida",
    reusable: true,
    active: true
  },
  {
    id: "r8",
    name: "Una hora libre",
    description: "Una hora libre para hacer lo que quieras.",
    icon: "⏰",
    price: 100,
    category: "Ocio",
    reusable: true,
    active: true
  },
  {
    id: "r9",
    name: "Plan especial",
    description: "Elige un plan especial para hacer juntos.",
    icon: "✨",
    price: 150,
    category: "Especial",
    reusable: true,
    active: true
  },
  {
    id: "r10",
    name: "Desayuno especial",
    description: "Desayuno especial a elección.",
    icon: "🥞",
    price: 80,
    category: "Comida",
    reusable: true,
    active: true
  },
  {
    id: "r11",
    name: "Elegir actividad",
    description: "Tú decides qué actividad hacer.",
    icon: "🎯",
    price: 90,
    category: "Ocio",
    reusable: true,
    active: true
  },
  {
    id: "r12",
    name: "Tarde sin tareas",
    description: "Una tarde sin tareas pendientes.",
    icon: "🛋️",
    price: 200,
    category: "Descanso",
    reusable: true,
    active: true
  },
  {
    id: "r13",
    name: "Capricho pequeño",
    description: "Un pequeño capricho.",
    icon: "🎁",
    price: 100,
    category: "Especial",
    reusable: true,
    active: true
  },
  {
    id: "r14",
    name: "Elegir restaurante",
    description: "Tú eliges dónde comer.",
    icon: "🍔",
    price: 180,
    category: "Comida",
    reusable: true,
    active: true
  },
  {
    id: "r15",
    name: "Noche especial",
    description: "Una noche especial.",
    icon: "🌙",
    price: 250,
    category: "Especial",
    reusable: true,
    active: true
  },
  {
    id: "r16",
    name: "Premio sorpresa",
    description: "Un premio sorpresa.",
    icon: "🎉",
    price: 120,
    category: "Especial",
    reusable: true,
    active: true
  },
  {
    id: "r17",
    name: "Día de recompensa",
    description: "Un día con una recompensa especial.",
    icon: "🏆",
    price: 300,
    category: "Especial",
    reusable: true,
    active: true
  },
  {
    id: "r18",
    name: "Gran premio",
    description: "La recompensa definitiva.",
    icon: "👑",
    price: 500,
    category: "Especial",
    reusable: false,
    active: true
  }
];


// ---------- ESTADO DEL JUEGO ----------

const defaultState = {
  xp: 0,
  coins: 0,
  completedTopics: [],
  purchasedRewards: [],
  coinHistory: [],
  subjects: defaultSubjects,
  rewards: defaultRewards
};


let state = loadState();
let selectedSubjectId = null;


// ---------- GUARDADO ----------

function loadState() {
  try {
    const saved = localStorage.getItem("rafaQuestState");

    if (!saved) {
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(saved);

    return {
      ...structuredClone(defaultState),
      ...parsed,
      subjects: parsed.subjects || structuredClone(defaultSubjects),
      rewards: parsed.rewards || structuredClone(defaultRewards),
      completedTopics: parsed.completedTopics || [],
      purchasedRewards: parsed.purchasedRewards || [],
      coinHistory: parsed.coinHistory || []
    };

  } catch (error) {
    console.error("Error cargando partida:", error);
    return structuredClone(defaultState);
  }
}


function saveState() {
  localStorage.setItem("rafaQuestState", JSON.stringify(state));
}


// ---------- NIVELES ----------

function getLevel(xp) {

  if (xp >= 5000) return 10;
  if (xp >= 3500) return 9;
  if (xp >= 2500) return 8;
  if (xp >= 1500) return 7;
  if (xp >= 1000) return 6;
  if (xp >= 750) return 5;
  if (xp >= 500) return 4;
  if (xp >= 250) return 3;
  if (xp >= 100) return 2;

  return 1;
}


function getLevelRange(level) {

  const ranges = {
    1: [0, 100],
    2: [100, 250],
    3: [250, 500],
    4: [500, 750],
    5: [750, 1000],
    6: [1000, 1500],
    7: [1500, 2000],
    8: [2000, 2500],
    9: [2500, 3500],
    10: [3500, 5000]
  };

  return ranges[level] || [0, 100];
}


function getLevelProgress() {

  const level = getLevel(state.xp);
  const [min, max] = getLevelRange(level);

  if (level >= 10) {
    return 100;
  }

  return Math.min(
    100,
    Math.max(
      0,
      ((state.xp - min) / (max - min)) * 100
    )
  );
}


// ---------- NAVEGACIÓN ----------

function requestAdminAccess() {
  const password = prompt("🔐 Introduce la contraseña de administración:");

  if (password === "Luna123") {
    sessionStorage.setItem("adminAccess", "true");
    showScreen("admin");
  } else if (password !== null) {
    alert("❌ Contraseña incorrecta.");
  }
}
function showScreen(screenName) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(`screen-${screenName}`);

  if (target) {
    target.classList.add("active");
  }

  document.querySelectorAll(".nav-button").forEach(button => {
    button.classList.remove("active");
  });

  const buttons = document.querySelectorAll(".nav-button");

  buttons.forEach(button => {

    if (
      button.textContent.toLowerCase().includes(
        screenName === "subjects" ? "estudiar" :
        screenName === "shop" ? "tienda" :
        screenName === "profile" ? "perfil" :
        screenName === "admin" ? "administración" :
        "inicio"
      )
    ) {
      button.classList.add("active");
    }

  });

  renderAll();
}


// ---------- ACTUALIZAR INTERFAZ ----------

function renderAll() {

  const level = getLevel(state.xp);
  const progress = getLevelProgress();

  setText("header-xp", state.xp);
  setText("header-coins", state.coins);

  setText("home-level", level);
  setText("home-level-circle", level);
  setText("home-xp", state.xp);
  setText("home-coins", state.coins);

  setText(
    "home-topics",
    state.completedTopics.length
  );

  setText(
    "home-rewards",
    state.purchasedRewards.length
  );

  setText(
    "profile-level",
    level
  );

  setText(
    "profile-xp",
    state.xp
  );

  setText(
    "profile-total-xp",
    state.xp
  );

  setText(
    "profile-total-coins",
    state.coins
  );

  setText(
    "profile-completed-topics",
    state.completedTopics.length
  );

  setText(
    "profile-rewards",
    state.purchasedRewards.length
  );

  setText(
    "shop-coins",
    state.coins
  );

  const homeProgress =
    document.getElementById("home-level-progress");

  if (homeProgress) {
    homeProgress.style.width = `${progress}%`;
  }

  const profileProgress =
    document.getElementById("profile-progress");

  if (profileProgress) {
    profileProgress.style.width = `${progress}%`;
  }

  const [min, max] = getLevelRange(level);

  setText(
    "home-level-text",
    level >= 10
      ? "¡Nivel máximo! 🏆"
      : `${state.xp - min} / ${max - min} XP`
  );

  renderSubjects();
  renderRewards();

  if (selectedSubjectId) {
    renderTopics(selectedSubjectId);
  }
}


function setText(id, value) {

  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}


// ---------- ASIGNATURAS ----------

function renderSubjects() {

  const container =
    document.getElementById("subjects-list");

  if (!container) return;

  container.innerHTML = "";

  state.subjects.forEach(subject => {

    const topicCount =
      subject.topics ? subject.topics.length : 0;

    const completed =
      subject.topics
        ? subject.topics.filter(topic =>
            state.completedTopics.includes(topic.id)
          ).length
        : 0;

    const card =
      document.createElement("div");

    card.className = "subject-card";

    card.innerHTML = `
      <div class="subject-icon">${subject.icon}</div>

      <h3>${escapeHTML(subject.name)}</h3>

      <p>${escapeHTML(subject.description)}</p>

      <p style="margin-top:12px;">
        📚 ${completed} / ${topicCount} temas completados
      </p>
    `;

    card.onclick = () => openSubject(subject.id);

    container.appendChild(card);
  });
}


function openSubject(subjectId) {

  selectedSubjectId = subjectId;

  showScreen("topics");

  renderTopics(subjectId);
}


// ---------- TEMAS ----------

function renderTopics(subjectId) {

  const container =
    document.getElementById("topics-list");

  const subject =
    state.subjects.find(s => s.id === subjectId);

  if (!container || !subject) return;

  setText(
    "selected-subject-name",
    subject.name
  );

  container.innerHTML = "";

  const topics = subject.topics || [];

  if (topics.length === 0) {

    container.innerHTML = `
      <div class="card">
        <h3>📭 Todavía no hay temas</h3>
        <p>
          Los temas se podrán añadir desde Administración.
        </p>
      </div>
    `;

    return;
  }

  topics.forEach(topic => {

    const completed =
      state.completedTopics.includes(topic.id);

    const card =
      document.createElement("div");

    card.className =
      `topic-card ${completed ? "completed" : ""}`;

    card.innerHTML = `
      <div class="topic-info">

        <h3>
          ${completed ? "✅" : "📖"}
          ${escapeHTML(topic.name)}
        </h3>

        <p>
          ${completed
            ? "Tema completado"
            : `+${topic.xp || 20} XP · +${topic.coins || 10} 🪙`
          }
        </p>

      </div>

      <div class="topic-actions">

        ${
          completed
          ? `<button class="back-button"
               onclick="uncompleteTopic('${topic.id}')">
               ↩️ Desmarcar
             </button>`
          : `<button class="big-button"
               onclick="completeTopic('${topic.id}')">
               ✅ Completar
             </button>`
        }

      </div>
    `;

    container.appendChild(card);
  });
}


function completeTopic(topicId) {

  if (state.completedTopics.includes(topicId)) {
    return;
  }

  let topic = null;

  for (const subject of state.subjects) {

    const found =
      (subject.topics || []).find(
        topic => topic.id === topicId
      );

    if (found) {
      topic = found;
      break;
    }
  }

  if (!topic) return;

  const xp = topic.xp || 20;
  const coins = topic.coins || 10;

  state.completedTopics.push(topicId);

  addXP(xp);

  addCoins(
    coins,
    `Tema completado: ${topic.name}`
  );

  saveState();
  renderAll();

  alert(
    `🎉 ¡Tema completado!\n\n+${xp} XP\n+${coins} 🪙`
  );
}


function uncompleteTopic(topicId) {

  const index =
    state.completedTopics.indexOf(topicId);

  if (index === -1) return;

  state.completedTopics.splice(index, 1);

  saveState();
  renderAll();
}


// ---------- XP ----------

function addXP(amount) {

  const oldLevel =
    getLevel(state.xp);

  state.xp += Number(amount) || 0;

  const newLevel =
    getLevel(state.xp);

  if (newLevel > oldLevel) {

    setTimeout(() => {

      alert(
        `🎉 ¡SUBIDA DE NIVEL!\n\nHas alcanzado el nivel ${newLevel} ⭐`
      );

    }, 100);

  }
}


// ---------- MONEDAS ----------

function addCoins(amount, reason = "Movimiento") {

  amount = Number(amount) || 0;

  state.coins += amount;

  state.coinHistory.push({
    id: Date.now(),
    amount,
    type: "earn",
    reason,
    date: new Date().toISOString()
  });
}


function spendCoins(amount, reason = "Compra") {

  amount = Number(amount) || 0;

  if (state.coins < amount) {
    return false;
  }

  state.coins -= amount;

  state.coinHistory.push({
    id: Date.now(),
    amount: -amount,
    type: "spend",
    reason,
    date: new Date().toISOString()
  });

  return true;
}


// ---------- TIENDA ----------

function renderRewards() {

  const container =
    document.getElementById("rewards-list");

  if (!container) return;

  container.innerHTML = "";

  const activeRewards =
    state.rewards.filter(reward => reward.active);

  if (activeRewards.length === 0) {

    container.innerHTML = `
      <div class="card">
        <h3>📭 No hay recompensas disponibles</h3>
      </div>
    `;

    return;
  }

  activeRewards.forEach(reward => {

    const card =
      document.createElement("div");

    card.className = "reward-card";

    const canBuy =
      state.coins >= reward.price;

    card.innerHTML = `
      <div class="reward-icon">
        ${reward.icon}
      </div>

      <h3>${escapeHTML(reward.name)}</h3>

      <p class="reward-description">
        ${escapeHTML(reward.description)}
      </p>

      <p class="reward-price">
        🪙 ${reward.price}
      </p>

      <button
        class="reward-button"
        ${canBuy ? "" : "disabled"}
        onclick="buyReward('${reward.id}')"
      >
        ${canBuy ? "🎁 Canjear" : "🔒 Faltan monedas"}
      </button>
    `;

    container.appendChild(card);
  });
}


function buyReward(rewardId) {

  const reward =
    state.rewards.find(
      reward => reward.id === rewardId
    );

  if (!reward || !reward.active) return;

  if (state.coins < reward.price) {

    alert("❌ No tienes suficientes monedas.");

    return;
  }

  const confirmed =
    confirm(
      `¿Quieres canjear "${reward.name}" por ${reward.price} monedas?`
    );

  if (!confirmed) return;

  if (
    !spendCoins(
      reward.price,
      `Recompensa: ${reward.name}`
    )
  ) {
    return;
  }

  state.purchasedRewards.push({
    id: Date.now(),
    rewardId: reward.id,
    name: reward.name,
    date: new Date().toISOString()
  });

  saveState();
  renderAll();

  alert(
    `🎉 ¡Recompensa conseguida!\n\n${reward.icon} ${reward.name}`
  );
}


// ---------- ADMINISTRACIÓN ----------

function showAdminRewards() {

  const container =
    document.getElementById("admin-content");

  if (!container) return;

  container.innerHTML = `
    <div class="card">

      <div class="section-header">

        <div>
          <h2>🎁 Gestionar recompensas</h2>
          <p>
            Todas las recompensas, incluidas las inactivas.
          </p>
        </div>

        <button
          class="big-button"
          onclick="showRewardForm()"
        >
          ➕ Nueva recompensa
        </button>

      </div>

      <div id="admin-rewards-list"></div>

    </div>
  `;

  renderAdminRewards();
}


function renderAdminRewards() {

  const container =
    document.getElementById("admin-rewards-list");

  if (!container) return;

  container.innerHTML = "";

  state.rewards.forEach(reward => {

    const item =
      document.createElement("div");

    item.className = "topic-card";

    item.innerHTML = `
      <div class="topic-info">

        <h3>
          ${reward.icon}
          ${escapeHTML(reward.name)}
        </h3>

        <p>
          🪙 ${reward.price}
          · ${escapeHTML(reward.category)}
          · ${reward.active ? "🟢 Activa" : "🔴 Inactiva"}
        </p>

      </div>

      <div class="topic-actions">

        <button
          class="back-button"
          onclick="showRewardForm('${reward.id}')"
        >
          ✏️ Editar
        </button>

        <button
          class="back-button"
          onclick="toggleReward('${reward.id}')"
        >
          ${reward.active
            ? "🔴 Desactivar"
            : "🟢 Activar"}
        </button>

        <button
          class="back-button"
          onclick="deleteReward('${reward.id}')"
        >
          🗑️ Eliminar
        </button>

      </div>
    `;

    container.appendChild(item);
  });
}


function showRewardForm(rewardId = null) {

  const reward =
    rewardId
      ? state.rewards.find(
          reward => reward.id === rewardId
        )
      : null;

  const modal =
    document.getElementById("modal");

  const body =
    document.getElementById("modal-body");

  body.innerHTML = `

    <h2>
      ${reward
        ? "✏️ Editar recompensa"
        : "➕ Nueva recompensa"}
    </h2>

    <div style="display:flex;flex-direction:column;gap:12px;margin-top:20px;">

      <input id="reward-name"
        placeholder="Nombre"
        value="${reward ? escapeAttribute(reward.name) : ""}"
        style="padding:12px;border:1px solid #ddd;border-radius:10px;">

      <textarea id="reward-description"
        placeholder="Descripción"
        style="padding:12px;border:1px solid #ddd;border-radius:10px;">${reward ? escapeHTML(reward.description) : ""}</textarea>

      <input id="reward-icon"
        placeholder="Icono"
        value="${reward ? escapeAttribute(reward.icon) : "🎁"}"
        style="padding:12px;border:1px solid #ddd;border-radius:10px;">

      <input id="reward-price"
        type="number"
        min="0"
        placeholder="Precio"
        value="${reward ? reward.price : 50}"
        style="padding:12px;border:1px solid #ddd;border-radius:10px;">

      <input id="reward-category"
        placeholder="Categoría"
        value="${reward ? escapeAttribute(reward.category) : "Ocio"}"
        style="padding:12px;border:1px solid #ddd;border-radius:10px;">

      <label>
        <input id="reward-reusable"
          type="checkbox"
          ${!reward || reward.reusable ? "checked" : ""}>
        Reutilizable
      </label>

      <label>
        <input id="reward-active"
          type="checkbox"
          ${!reward || reward.active ? "checked" : ""}>
        Activa
      </label>

      <button
        class="big-button"
        onclick="saveReward('${rewardId || ""}')"
      >
        💾 Guardar
      </button>

    </div>
  `;

  modal.classList.remove("hidden");
}


function saveReward(rewardId) {

  const name =
    document.getElementById("reward-name").value.trim();

  const description =
    document.getElementById("reward-description").value.trim();

  const icon =
    document.getElementById("reward-icon").value.trim() || "🎁";

  const price =
    Number(document.getElementById("reward-price").value) || 0;

  const category =
    document.getElementById("reward-category").value.trim() || "General";

  const reusable =
    document.getElementById("reward-reusable").checked;

  const active =
    document.getElementById("reward-active").checked;

  if (!name) {

    alert("Escribe un nombre para la recompensa.");

    return;
  }

  if (rewardId) {

    const reward =
      state.rewards.find(
        reward => reward.id === rewardId
      );

    if (reward) {

      reward.name = name;
      reward.description = description;
      reward.icon = icon;
      reward.price = price;
      reward.category = category;
      reward.reusable = reusable;
      reward.active = active;

    }

  } else {

    state.rewards.push({
      id: `custom-${Date.now()}`,
      name,
      description,
      icon,
      price,
      category,
      reusable,
      active
    });

  }

  saveState();

  closeModal();

  showAdminRewards();
  renderAll();
}


function toggleReward(rewardId) {

  const reward =
    state.rewards.find(
      reward => reward.id === rewardId
    );

  if (!reward) return;

  reward.active = !reward.active;

  saveState();

  renderAdminRewards();
  renderRewards();
}


function deleteReward(rewardId) {

  const reward =
    state.rewards.find(
      reward => reward.id === rewardId
    );

  if (!reward) return;

  const confirmed =
    confirm(
      `¿Seguro que quieres eliminar "${reward.name}"?\n\nEl historial de monedas NO se modificará.`
    );

  if (!confirmed) return;

  state.rewards =
    state.rewards.filter(
      reward => reward.id !== rewardId
    );

  saveState();

  renderAdminRewards();
  renderRewards();
}


// ---------- ADMINISTRACIÓN DE ASIGNATURAS ----------

function showAdminSubjects() {

  const container =
    document.getElementById("admin-content");

  if (!container) return;

  container.innerHTML = `
    <div class="card">

      <h2>📚 Asignaturas y temas</h2>

      <p style="margin-bottom:20px;">
        Añade los temas cuando los tengas.
      </p>

      <div id="admin-subjects-list"></div>

    </div>
  `;

  renderAdminSubjects();
}


function renderAdminSubjects() {

  const container =
    document.getElementById("admin-subjects-list");

  if (!container) return;

  container.innerHTML = "";

  state.subjects.forEach(subject => {

    const item =
      document.createElement("div");

    item.className = "topic-card";

    item.innerHTML = `

      <div class="topic-info">

        <h3>
          ${subject.icon}
          ${escapeHTML(subject.name)}
        </h3>

        <p>
          ${(subject.topics || []).length} temas
        </p>

      </div>

      <button
        class="back-button"
        onclick="showAddTopicForm('${subject.id}')"
      >
        ➕ Añadir tema
      </button>

    `;

    container.appendChild(item);
  });
}


function showAddTopicForm(subjectId) {

  const subject =
    state.subjects.find(
      subject => subject.id === subjectId
    );

  if (!subject) return;

  const modal =
    document.getElementById("modal");

  const body =
    document.getElementById("modal-body");

  body.innerHTML = `

    <h2>➕ Añadir tema</h2>

    <p style="margin:10px 0 20px;">
      ${escapeHTML(subject.name)}
    </p>

    <div style="display:flex;flex-direction:column;gap:12px;">

      <input
        id="topic-name"
        placeholder="Nombre del tema"
        style="padding:12px;border:1px solid #ddd;border-radius:10px;"
      >

      <input
        id="topic-xp"
        type="number"
        value="20"
        min="1"
        placeholder="XP"
        style="padding:12px;border:1px solid #ddd;border-radius:10px;"
      >

      <input
        id="topic-coins"
        type="number"
        value="10"
        min="0"
        placeholder="Monedas"
        style="padding:12px;border:1px solid #ddd;border-radius:10px;"
      >

      <button
        class="big-button"
        onclick="addTopic('${subjectId}')"
      >
        💾 Añadir tema
      </button>

    </div>
  `;

  modal.classList.remove("hidden");
}


function addTopic(subjectId) {

  const subject =
    state.subjects.find(
      subject => subject.id === subjectId
    );

  if (!subject) return;

  const name =
    document.getElementById("topic-name").value.trim();

  const xp =
    Number(document.getElementById("topic-xp").value) || 20;

  const coins =
    Number(document.getElementById("topic-coins").value) || 10;

  if (!name) {

    alert("Escribe el nombre del tema.");

    return;
  }

  if (!subject.topics) {
    subject.topics = [];
  }

  subject.topics.push({
    id: `topic-${Date.now()}`,
    name,
    xp,
    coins
  });

  saveState();

  closeModal();

  renderAll();

  showAdminSubjects();
}


// ---------- HISTORIAL DE MONEDAS ----------

function showAdminWallet() {

  const container =
    document.getElementById("admin-content");

  if (!container) return;

  const history =
    [...state.coinHistory].reverse();

  container.innerHTML = `
    <div class="card">

      <h2>💰 Historial de monedas</h2>

      ${
        history.length === 0
        ? `
          <p>
            Todavía no hay movimientos.
          </p>
        `
        :
        `
          <div class="stats-list">

            ${history.map(item => `

              <div>

                <span>
                  ${item.amount > 0 ? "➕" : "➖"}
                  ${escapeHTML(item.reason)}
                </span>

                <strong>
                  ${item.amount > 0 ? "+" : ""}
                  ${item.amount} 🪙
                </strong>

              </div>

            `).join("")}

          </div>
        `
      }

    </div>
  `;
}


// ---------- MODAL ----------

function closeModal() {

  const modal =
    document.getElementById("modal");

  if (modal) {
    modal.classList.add("hidden");
  }
}


// ---------- SEGURIDAD BÁSICA DE TEXTO ----------

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {
  return escapeHTML(value);
}


// ---------- INICIO ----------

document.addEventListener(
  "DOMContentLoaded",
  () => {
    renderAll();
  }
);
