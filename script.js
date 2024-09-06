function next_step(){
    const next = document.querySelector('button[onclick="next_step()"]');
    const form=document.getElementById('formId');
    next.addEventListener('click',()=>{
        form.style.display='block';
        form.scrollIntoView({behavior:'smooth'})
    });
}



async function submitFormData() {
    
    const sdatetime = document.getElementById('sdatetime').value;
    const edatetime = document.getElementById('edatetime').value;
    const email = document.getElementById('email').value;

    const formData = {
        sdatetime,
        edatetime,
        email
    };

    try {
        const response = await fetch('http://localhost:5500/api/form-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            const formId=document.getElementById('formId')
            window.location.href = 'formId';
        } else {
            console.error('Failed to save form data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}






next_step();
submitFormData();