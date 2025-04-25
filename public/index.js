const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const submitButton = expenseForm.querySelector('button[type="submit"]');
const totalAmountElement = document.getElementById('totalAmount');

// Function to show loading state
const setLoading = (isLoading) => {
    submitButton.disabled = isLoading;
    submitButton.classList.toggle('loading', isLoading);
};

// Function to show alert
const showAlert = (message, type = 'error') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `auth-alert ${type}`;
    alertDiv.textContent = message;
    expenseForm.insertBefore(alertDiv, submitButton);
    setTimeout(() => alertDiv.remove(), 3000);
};

// Function to update total amount
const updateTotalAmount = (expenses) => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountElement.textContent = `$${total.toFixed(2)}`;
};

// Function to delete an expense
const deleteExpense = async (expenseId) => {
    try {
        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
        if (!token) {
            showAlert('Please login first');
            window.location.href = '/login.html';
            return;
        }

        const response = await fetch(`/api/v1/expenses/${expenseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        });

        if (response.ok) {
            showAlert('Expense deleted successfully', 'success');
            fetchExpenses(); // Refresh the list
        } else {
            const data = await response.json();
            showAlert(data.error || 'Failed to delete expense');
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
        showAlert('Error deleting expense');
    }
};

// Function to fetch and display expenses
const fetchExpenses = async () => {
    try {
        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
        if (!token) {
            window.location.href = '/login.html';
            return;
        }

        const response = await fetch('/api/v1/expenses', {
            headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            }
        });
        const data = await response.json();
        
        if (response.ok) {
            // Clear existing expenses
            expenseList.innerHTML = '';
            // Add each expense to the list
            data.expenses.forEach(expense => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${expense.description}</td>
                    <td>${expense.category}</td>
                    <td>$${expense.amount.toFixed(2)}</td>
                    <td>
                        <button class="action-btn delete-btn" onclick="deleteExpense('${expense._id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                expenseList.appendChild(newRow);
            });
            // Update total amount
            updateTotalAmount(data.expenses);
        } else {
            showAlert(data.error || 'Failed to fetch expenses');
        }
    } catch (error) {
        console.error('Error fetching expenses:', error);
        showAlert('Error fetching expenses');
    }
};

// Fetch expenses when page loads
fetchExpenses();

expenseForm.addEventListener('submit',
    async function(event){
        event.preventDefault();

        const description = document.getElementById('description').value.trim();
        const category = document.getElementById('category').value.trim();
        const amount = document.getElementById('amount').value.trim();

        if(description && category && !isNaN(amount) && amount > 0){
            try {
                setLoading(true);
                // Get the user ID from the authentication token
                const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
                if (!token) {
                    showAlert('Please login first');
                    window.location.href = '/login.html';
                    return;
                }

                const response = await fetch('/api/v1/expenses',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.split('=')[1]}`
                    },
                    body: JSON.stringify({ 
                        description, 
                        category, 
                        amount: parseFloat(amount)
                    }),
                });
                const result = await response.json();
                if(response.ok){
                    showAlert('Expense added successfully', 'success');
                    // Refresh the expenses list after adding new expense
                    fetchExpenses();
                    // Clear the form
                    expenseForm.reset();
                }else{
                    showAlert(result.error || 'Failed to add Expense');
                }

            }catch(error){
                console.error('Error adding expense:', error);
                showAlert('Error, failed to connect to backend');
            } finally {
                setLoading(false);
            }
        }
        else{
            showAlert('Please fill all fields with valid data');
        }
    }
);