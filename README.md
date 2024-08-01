This is a [Next.js](https://nextjs.org/) project

- A radio button to select the response mode of the voice assistant (text or audio).
- A button to start and stop recording the user's voice.
- The user's input is always audio, and the assistant's response can be either audio or text.
- If the audio response mode is selected, the assistant plays the user's recorded voice after 3 seconds.
- If the text response mode is selected, the provided API should be called to display the information.
- Each time the user records audio, the previous response from the voice assistant is cleared.

## Getting Started

First, build the project:

```bash
npm run build
```

Then, start the server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
