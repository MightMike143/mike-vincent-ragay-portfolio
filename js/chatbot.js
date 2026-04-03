/**
 * Chatbot JavaScript
 * Handles chat window toggle, message sending, and AI communication
 */

// ============================================
// Chat Configuration
// ============================================
const CHAT_CONFIG = {
  endpoint: '/.netlify/functions/chat',
  initialMessage: "Hi! Ask me anything about Mike's Splunk work, data engineering at Accenture, or how to collaborate.",
  typingDelay: 300,
  messageDelay: 500
};

// ============================================
// Chat Initialization
// ============================================
function initChatbot() {
  const chatButton = document.getElementById('chatBtn');
  const chatWindow = document.getElementById('chatWindow');
  const userInput = document.getElementById('userInput');
  const sendButton = document.querySelector('.chat-send-btn');

  if (!chatButton || !chatWindow) {
    console.warn('Chat elements not found');
    return;
  }

  // Event Listeners
  chatButton.addEventListener('click', () => toggleChat());
  sendButton.addEventListener('click', () => sendMessage());
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Close button
  const closeButton = document.querySelector('.chat-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => toggleChat());
  }

  console.log('💬 Chatbot initialized');
}

// ============================================
// Toggle Chat Window
// ============================================
function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  const chatButton = document.getElementById('chatBtn');
  
  if (chatWindow.classList.contains('active')) {
    chatWindow.classList.remove('active');
    chatButton.setAttribute('aria-pressed', 'false');
  } else {
    chatWindow.classList.add('active');
    chatButton.setAttribute('aria-pressed', 'true');
    // Focus input when opened
    setTimeout(() => {
      document.getElementById('userInput').focus();
    }, 300);
  }
}

// ============================================
// Send Message to Chatbot
// ============================================
async function sendMessage() {
  const input = document.getElementById('userInput');
  const userMessage = input.value.trim();

  // Validation
  if (!userMessage) return;

  // Add user message to chat
  addMessage(userMessage, 'user');
  input.value = '';
  input.focus();

  // Show typing indicator
  const typingId = showTypingIndicator();

  try {
    // Call API endpoint
    const response = await fetch(CHAT_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        message: userMessage,
        timestamp: new Date().toISOString()
      })
    });

    // Remove typing indicator
    removeTypingIndicator(typingId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.reply || 'Sorry, something went wrong. Please try again.';
    
    // Add bot message to chat
    addMessage(botReply, 'bot');

  } catch (error) {
    // Remove typing indicator and show error
    removeTypingIndicator(typingId);
    console.error('Chat Error:', error);
    
    const errorMessage = error.message.includes('API') 
      ? 'Unable to connect to the chatbot service. Please try again later.'
      : 'AI is taking a quick break — try again soon!';
    
    addMessage(errorMessage, 'bot');
  }
}

// ============================================
// Add Message to Chat
// ============================================
function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  
  // Add animation class
  messageDiv.style.animation = 'fadeIn 0.3s ease-out';
  
  messagesContainer.appendChild(messageDiv);
  
  // Auto-scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ============================================
// Typing Indicator Management
// ============================================
function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  const typingId = 'typing-' + Date.now();
  
  typingDiv.id = typingId;
  typingDiv.className = 'message bot';
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  return typingId;
}

function removeTypingIndicator(typingId) {
  const typingElement = document.getElementById(typingId);
  if (typingElement) {
    typingElement.remove();
  }
}

// ============================================
// Fallback for offline/manual testing
// ============================================
function useFallbackChat() {
  console.info('📡 Using fallback chat responses (not connected to API)');
  
  // Mock responses for testing
  const responses = [
    "That's a great question! Mike specializes in Splunk implementations and data engineering.",
    "Mike has extensive experience with data pipelines and real-time analytics at Accenture.",
    "Feel free to reach out through the contact form or LinkedIn for collaboration opportunities!",
    "Mike's work focuses on turning complex data into actionable insights.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// ============================================
// Keyboard Shortcuts
// ============================================
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + C to toggle chat
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'm') {
      e.preventDefault();
      toggleChat();
    }
  });
}

// ============================================
// Initialize on DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
  initKeyboardShortcuts();
  console.log('🤖 Chatbot system ready');
});
