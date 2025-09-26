// Example of how to use the contact API from your frontend

async function submitContactForm(formData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (result.ok) {
      // Success
      alert('הודעתך נשלחה בהצלחה! נחזור אליך בקרוב.');
      return true;
    } else {
      // Error from server
      alert('שגיאה: ' + result.error);
      return false;
    }
  } catch (error) {
    // Network or other error
    console.error('Error:', error);
    alert('שגיאה בשליחת ההודעה. אנא נסה שוב.');
    return false;
  }
}

// Example usage:
// const formData = {
//   name: 'יובל כהן',
//   email: 'yuval@example.com',
//   message: 'שלום, אני מעוניין לקבל מידע נוסף על הקורס'
// };
//
// submitContactForm(formData);