# 1V1 ARENA setup

## Firebase required for online play

1. Create a Firebase project and register a **Web app**.
2. Enable **Authentication → Sign-in method → Anonymous**.
3. Create a **Realtime Database** and copy its database URL.
4. Paste the web app values into `firebaseConfig` in `main/firebase.js`.
5. For a quick prototype, set Realtime Database rules to allow authenticated users to read and write the app data. Do not leave broad rules enabled for a public production game; client-side score and damage are not authoritative.

Example rules for local testing only:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

The browser module imports and the Three.js import map use CDN URLs. This prototype intentionally does not claim secure competitive integrity: anonymous clients can spoof movement, health, score, and damage. A production competitive game needs trusted server validation, rate limits, room cleanup, and stronger database rules. If Firebase is not configured, Practice remains playable and Play Online displays the configuration error.
