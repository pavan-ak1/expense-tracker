const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
expenseForm.addEventListener('submit',
    async function(event){
        event.preventDefault();

    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value.trim();
    const amount = document.getElementById('amount').value.trim();
        if(description && category && !isNaN(amount) && amount > 0){
            try{
                const response = await fetch('/api/v1/expenses',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ description, category, amount }),
                });
                const result = await response.json();
                if(response.ok){
                    const newRow = document.createElement('tr')
            newRow.innerHTML = 
            `<td>${description}</td>
            <td>${category}</td>
            <td>${amount}</td>`;
            expenseList.appendChild(newRow)
            document.getElementById('description').value = '';
            document.getElementById('category').value = '';
            document.getElementById('amount').value = '';
                }else{
                    alert(result.error||'Failed to add Expense');
                }

            }catch(error){
                console.log(error)
                alert('Error, failed to connect to backend');
                
            }
            
        }
        else{
            alert('Fill all data, Invalid Input');
        }

    }
)