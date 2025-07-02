document.addEventListener('DOMContentLoaded', () => {
  const chatDisplay = document.getElementById('chat-display');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  let webhookUrl = '';
  
  // Fetch configuration from server
  fetch('/api/config')
    .then(response => response.json())
    .then(data => {
      webhookUrl = data.webhookUrl;
      console.log('Webhook URL loaded:', webhookUrl);
    })
    .catch(error => {
      console.error('Error fetching configuration:', error);
      appendMessage('Error loading configuration. Please try again later.', 'bot');
    });
  
  // Function to create typing indicator
  const createTypingIndicator = () => {
    const typing = document.createElement('div');
    typing.classList.add('typing-indicator');
    typing.id = 'typing-indicator';
    
    // Create the three dots
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      typing.appendChild(dot);
    }
    
    return typing;
  };
  
  // Function to handle sending messages
  const sendMessage = async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    appendMessage(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    const typingIndicator = createTypingIndicator();
    chatDisplay.appendChild(typingIndicator);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    try {
      // Check if webhook URL is available
      if (!webhookUrl) {
        throw new Error('Webhook URL not loaded yet');
      }
      
      console.log('Sending to webhook:', webhookUrl);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      // Remove typing indicator
      const indicator = document.getElementById('typing-indicator');
      if (indicator) indicator.remove();

      // Check if response is empty
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let botReply = 'No response from server.';
      
      if (responseText && responseText.trim()) {
        try {
          const data = JSON.parse(responseText);
          botReply = data.output || data.message || data.response || JSON.stringify(data);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          botReply = responseText; // Use raw text if JSON parsing fails
        }
      }

      // Display bot reply
      appendMessage(botReply, 'bot');
    } catch (err) {
      console.error('Error in sendMessage:', err);
      
      // Remove typing indicator
      const indicator = document.getElementById('typing-indicator');
      if (indicator) indicator.remove();
      
      appendMessage('Error connecting to server: ' + err.message, 'bot');
    }
  };

  // Function to append message to chat
  function appendMessage(text, sender) {
    // Create label element
    const labelDiv = document.createElement('div');
    labelDiv.classList.add('message-label', sender === 'user' ? 'user-label' : 'bot-label');
    labelDiv.textContent = sender === 'user' ? 'You:' : 'Bot:';
    
    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.textContent = text;
    
    // Add both to chat display
    chatDisplay.appendChild(labelDiv);
    chatDisplay.appendChild(msgDiv);
    
    // Scroll to bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});