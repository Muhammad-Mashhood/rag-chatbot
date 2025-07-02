# Skill Trade Chatbot

This project is a simple chatbot for the Skill Trade website. It allows users to send messages and receive responses from a bot via a webhook endpoint using n8n.

## Project Structure

```
my-node-chatbot
├── public
│   ├── index.html       # HTML structure of the chatbot webpage
│   ├── script.js        # JavaScript code for handling chat functionality
│   └── style.css        # CSS styles for the chatbot interface
├── .env                 # Environment variables (webhook URL)
├── package.json         # npm configuration file
├── server.js            # Node.js server setup
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd my-node-chatbot
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your n8n webhook URL:

   ```
   # n8n Webhook URL
   N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
   ```

### Running the Project

1. Start the server:

   ```
   npm start
   ```
   
   Or directly with Node:
   
   ```
   node server.js
   ```

2. Open your web browser and navigate to `http://localhost:3000` to access the chatbot.

3. The server will output the configured webhook URL when it starts.

### Usage

- Type your message in the input field and click the "Send" button or press Enter.
- The message will be sent to the n8n webhook endpoint, and the bot's response will be displayed in the chat area.
- Messages from you will appear in blue and messages from the bot will appear in teal.

### Environment Variables

The application uses the following environment variables that should be set in your `.env` file:

- `N8N_WEBHOOK_URL`: The URL of your n8n webhook endpoint.
- `PORT` (optional): The port on which the server will run. Defaults to 3000.

### Troubleshooting

If you encounter issues:

1. Check that your `.env` file is properly configured with the correct webhook URL.
2. Ensure your n8n workflow is active and properly configured to accept and respond to webhook requests.
3. Check the browser console for any errors.
4. Verify that your server is running and accessible at http://localhost:3000.

### License

This project is licensed under the ISC License.