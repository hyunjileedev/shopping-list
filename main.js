'use strict';

const categories = document.querySelector('.categories');
const list = document.querySelector('.shopping-list__list');
const form = document.querySelector('.shopping-list__form');
const select = document.querySelector('.form__select');
const input = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__add');
const clearBtn = document.querySelector('.clear');
const shoppingItems = [];

form.addEventListener('submit', e => {
  e.preventDefault();
  onAdd();
});

list.addEventListener('click', e => {
  const target = e.target;
  const id = target.dataset.id;
  if (target.matches('.shopping-item__check-btn')) {
    onCheck(id);
  }
  if (target.matches('.shopping-item__delete-btn')) {
    onDelete(id);
  }
});

clearBtn.addEventListener('click', onClear);

categories.addEventListener('change', e => {
  const target = e.target;
  onFilter(target);
});

function onAdd() {
  const selectValue = select.value;
  if (selectValue === '') {
    alert('Please select a category.');
    return;
  }

  const inputValue = input.value;
  if (!/\S/.test(inputValue)) {
    input.focus();
    return;
  }

  input.value = '';
  input.focus();

  const item = createItem(selectValue, inputValue);
  list.appendChild(item);
  item.scrollIntoView({ behavior: 'smooth', block: 'end' });

  shoppingItems.push(item);
}

function createItem(selectValue, inputValue) {
  const id = Date.now();
  const item = document.createElement('li');
  item.setAttribute('class', 'shopping-item');
  item.setAttribute('data-id', `${id}`);
  item.setAttribute('data-category', `${selectValue}`);
  item.innerHTML = `
    <div class="shopping-item__text">
      <span class="shopping-item__tag">${selectValue}</span>
      <span class="shopping-item__name" data-id="${id}">${inputValue}</span>
    </div>  
    <div class="shopping-item__btns">
      <button class="shopping-item__btn shopping-item__check-btn" data-id="${id}">
        <i class="far fa-check-circle shopping-item__check-btn" data-id="${id}"></i>
      </button>
      <button class="shopping-item__btn shopping-item__delete-btn" data-id="${id}">
        <i class="far fa-trash-alt shopping-item__delete-btn" data-id="${id}"></i>
      </button>
    </div>
    `;
  return item;
}

function onCheck(id) {
  const toBeChecked = document.querySelector(
    `.shopping-item__name[data-id="${id}"]`
  );
  toBeChecked.classList.toggle('shopping-item__name--checked');

  const index = shoppingItems.indexOf(toBeChecked);
  shoppingItems[index] = item;
}

function onDelete(id) {
  const toBeDeleted = document.querySelector(`.shopping-item[data-id="${id}"]`);
  toBeDeleted.remove();

  const index = shoppingItems.indexOf(toBeDeleted);
  shoppingItems.splice(index, 1);
}

function onClear() {
  if (list.innerHTML === '') {
    return;
  }
  if (!confirm('Are you sure to delete all items?')) {
    return;
  }
  list.innerHTML = '';
}

function onFilter(target) {
  shoppingItems.forEach(item => {
    if (target.id !== item.dataset.category) {
      return;
    }
    if (target.checked) {
      item.classList.remove('shopping-item--hidden');
    } else {
      item.classList.add('shopping-item--hidden');
    }
  });
}
