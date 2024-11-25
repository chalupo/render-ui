const API_URL = 'https://render-i57q.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  fetchItems();

  document.getElementById('add-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    try {
      await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, quantity }),
      });

      fetchItems();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  });
});

async function fetchItems() {
  const tbody = document.querySelector('#items-table tbody');
  tbody.innerHTML = '';

  try {
    const res = await fetch(`${API_URL}/items`);
    const items = await res.json();

    items.forEach((item) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>
          <button onclick="deleteItem(${item.id})">Delete</button>
        </td>
      `;

      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error fetching items:', err);
  }
}

async function deleteItem(id) {
  try {
    await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' });
    fetchItems();
  } catch (err) {
    console.error('Error deleting item:', err);
  }
}
