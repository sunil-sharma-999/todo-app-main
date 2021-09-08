const body = document.body;
const circles = document.querySelectorAll('.circle');
const crosses = document.querySelectorAll('.cross');
const picture = document.querySelector('picture');
const items = document.querySelector('.items span');
const input = document.querySelector('.add');
const tasksWrap = document.querySelector('.tasks-wrap');

const taskTemplate = (id, taskItem) => {
  const task = document.createElement('div');
  task.innerHTML = `
  <div class="task work" draggable="true" id="${id}">
            <div class="circle-border">
              <div class="circle" onclick="check(this)">
                <img src="./images/icon-check.svg" alt="#" />
              </div>
            </div>
            <p>${taskItem}</p>
            <img
              src="./images/icon-cross.svg"
              alt="X"
              class="cross"
              onclick="crossFunc()"
            />
          </div>
  `;
  tasksWrap.append(task);
};

input.addEventListener('keyup', (e) => {
  if (e.key.toLowerCase() == 'enter') {
    const id = Math.floor(Math.random() * 100);
    const taskItem = e.target.value;
    localStorage.setItem(id, taskItem);
    taskTemplate(id, taskItem);
    count();
    e.target.value = '';
  }
});

const showTasks = () => {
  const count = localStorage.length;
  for (let i = 0; i < count; i++) {
    const id = localStorage.key(i);
    const taskItem = localStorage.getItem(id);
    taskTemplate(id, taskItem);
  }
};
showTasks();

const crossFunc = () => {
  const taskCancel = event.target.parentElement;
  taskCancel.remove();
  localStorage.removeItem(taskCancel.id);
  count();
};

const clearFinishedTask = () => {
  const tasks = document.querySelectorAll('.task');
  tasks.forEach((t) => {
    if (t.className.includes('complete')) {
      t.remove();
      localStorage.removeItem(t.id);
    }
  });
};

const theme = () => {
  const themeIcon = document.querySelector('.theme');
  if (body.className == '') {
    body.className = 'light';
    themeIcon.src = './images/icon-moon.svg';
    bgHeader('light');
  } else {
    body.className = '';
    themeIcon.src = './images/icon-sun.svg';
    bgHeader('dark');
  }
};

const bgHeader = (theme) => {
  const imgSrc = document.querySelectorAll('.imgSrc');
  const imgMain = document.querySelector('.imgMain');
  imgSrc[0].srcset = `./images/bg-desktop-${theme}.jpg`;
  imgSrc[1].srcset = `./images/bg-mobile-${theme}.jpg`;
  imgMain.src = `./images/bg-desktop-${theme}.jpg`;
};

const check = (data) => {
  const current = document.querySelector('.current');
  if (data.className.includes('checked')) {
    data.children[0].style.display = 'none';
  } else {
    data.children[0].style.display = 'block';
  }
  data.classList.toggle('checked');
  data.parentElement.parentElement.classList.toggle('complete');
  data.parentElement.nextElementSibling.classList.toggle('cancel');
  count();
  filter(current);
};

const filter = (data) => {
  const current = document.querySelector('.current');
  const tasks = document.querySelectorAll('.task');
  current.classList.remove('current');

  if (data.className.includes('all')) {
    data.classList.add('current');
    tasks.forEach((t) => {
      t.style.display = 'flex';
    });
  } else if (data.className.includes('active')) {
    data.classList.add('current');
    tasks.forEach((t) => {
      if (t.className.includes('complete')) {
        t.style.display = 'none';
      } else {
        t.style.display = 'flex';
      }
    });
  } else if (data.className.includes('completed')) {
    data.classList.add('current');
    tasks.forEach((t) => {
      if (t.className.includes('complete')) {
        t.style.display = 'flex';
      } else {
        t.style.display = 'none';
      }
    });
  } else {
    return;
  }
};

const count = () => {
  const tasks = document.querySelectorAll('.task');
  var counter = tasks.length;
  items.textContent = counter;
  tasks.forEach((t) => {
    if (t.className.includes('complete')) {
      counter--;
      items.textContent = counter;
    }
  });
};
count();

const sortable = Sortable.create(tasksWrap, {
  animation: 200,
  ghostClass: 'dragstart',
});

circles.forEach((c) => {
  c.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });
});
