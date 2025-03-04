const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
expenseForm.addEventListener('submit',
     function(event){
        event.preventDefault();

    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value.trim();
    const amount = document.getElementById('amount').value.trim();
        if(description && category && !isNaN(amount) && amount > 0){
                
                
                
            const newRow = document.createElement('tr')
            newRow.innerHTML = 
            `<td>${description}</td>
            <td>${category}</td>
            <td>${amount}</td>`;
            expenseList.appendChild(newRow)
            document.getElementById('description').value = '';
            document.getElementById('category').value = '';
            document.getElementById('amount').value = '';
                

            
        }
        else{
            alert('Fill all data, Invalid Input');
        }

    }
)