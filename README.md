# AI-Enhanced Product Feedback System

This project is a backend system for collecting, analyzing, and retrieving product feedback from investors using an AI-powered tool. It allows investors to submit feedback, have it analyzed by AI, and retrieve structured insights. Admins can access summarized analytics to understand user sentiment and improve the product.

## Features

- Investors can submit qualitative feedback.
- AI processes feedback to extract sentiment, themes, and relevant product modules.
- Users can retrieve their own feedback.
- Admins can access platform-wide analytics.
- JWT-based authentication with role-based access control.

## Project Structure

```
/product-feedback-backend
├── src
│   ├── controllers/          # Route handlers
│   ├── routes/               # API routes
│   ├── models/               # Mongoose schemas
│   ├── middleware/           # Auth & role-based access control
│   ├── services/
│   │   └── ai/               # AI feedback analysis
│   ├── utils/                # Database & helper functions
│   ├── config/               # Environment variables
│   └── index.ts              # Entry point
├── tests/                    # Unit & integration tests
├── .env                      # Environment variables
├── .gitignore                # Ignored files
├── package.json              # Dependencies
└── README.md                 # Documentation
```

## API Endpoints

### Authentication

| Method | Endpoint  | Description |
|--------|----------|-------------|
| POST   | /api/login | Authenticate user & get JWT token |

### Feedback API

| Method  | Endpoint                    | Description |
|---------|-----------------------------|-------------|
| POST    | /api/feedback                | Submit product feedback (investor only) |
| GET     | /api/feedback                | Get investor’s submitted feedback |
| GET     | /api/admin/feedback-summary  | Get admin feedback analytics (admin only) |

## AI Analysis

Each feedback submission undergoes AI processing to extract:
- **Sentiment**: Positive, Neutral, or Negative.
- **Themes**: Extracted key topics from the feedback.
- **Module Tags**: Categorization into form_builder, ai_scoring, ui_ux, dashboard, or other.
- **Confidence Score**: AI confidence in the analysis (0-100).

## Authentication & Roles

- **JWT-based authentication** ensures secure access.
- **Roles**:
  - Investor: Can submit and view personal feedback.
  - Admin: Can access platform-wide feedback insights.

## Setup & Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/product-feedback-backend.git
   cd product-feedback-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file and add the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the server:
   ```sh
   npm start
   ```
   The server should start on `http://localhost:5000`.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT
- **AI Integration**: OpenAI API for sentiment analysis

## Postman Documentation with Saved Responses

You can find the Postman collection for testing the APIs [here](https://atharvnagar.postman.co/workspace/Atharv-Nagar's-Workspace~7e73a9bb-8c9d-4eee-88dd-d81eb453bf8d/collection/43610271-4bcf3052-93ce-4731-8961-4d9ac36af099?action=share&creator=43610271&active-environment=43610271-473fd2f7-b6f6-4f24-842e-318656b2859f).
![Postman API Test Screenshot](/feedback.png)

## Future Improvements

- Implement rate limiting.
- Improve test coverage.
- Add CI/CD pipeline.

## License

This project is licensed under the MIT License.

## Final Notes

This system is designed to streamline the feedback process, helping investors share their thoughts while allowing admins to gain structured insights for improving the product.
