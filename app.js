const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const validator = require("validator");
const crypto = require("crypto");
const path = require("path");
const logger = require("morgan");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

// const admin = require("./firebase-config");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(
  session({
    secret: "very secret very secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false, // key
      maxAge: null,
    },
  })
);

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(logger("dev"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  console.log("HTTP request", req.method, req.url, req.body, req.headers);
  next();
});

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const token = header.split(" ")[1];
    req.token = token;
    console.log('token is: ', token);
    // admin
    //   .auth()
    //   .verifyIdToken(token)
    //   .then((decodedIdToken) => {
    //     // Only process if the user just signed in in the last 5 minutes.
    //     if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    //       // Create session cookie and set it.
    //       const asd = admin
    //         .auth()
    //         .createSessionCookie(token, { expiresIn: 5 * 60 * 1000 });
    //       console.log("asd is: ", asd);
    //       return asd;
    //     }
    //     // A user that was not recently signed in is trying to set a session cookie.
    //     // To guard against ID token theft, require re-authentication.
    //     res.status(401).send("Recent sign in required!");
    //   }).catch((err) => {
    //     console.log('err in check token: ', err);
    //   }) ;
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        // ...
        console.log('success jwt check');
      })
      .catch((error) => {
        // Handle error
        console.log('unsuccess jwt check: ', error);
      });
    next();
  } else {
    res.status(403);
  }
};

const checkSessionCookie = (req, res, next) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((res) => {
      console.log("successful session cookie");
      next();
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      //res.redirect('/login');
      console.log("failed check session cookie: ", error);
    });
};


// app.use(express.static(path.join(__dirname, "../build")));

// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(__dirname, "../build/index.html"));
// });

app.get("/csrfToken", csrfProtection, (req, res) => {
  const csrfToken = req.csrfToken();
  console.log("csrf token before cookie is: ", csrfToken);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("csrfToken", csrfToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
      secure: true,
    })
  );
  res.json(csrfToken);
});

app.get(
  "/signup",
  csrfProtection,
  checkToken,
  checkSessionCookie,
  (req, res) => {
    console.log("success checked everything");
    res.json("success!");
  }
);

app.post("/sessionLogin", csrfProtection, (req, res) => {
  console.log("req body idtoken is: ", req.body.idToken);
  console.log("req body csrftoken is: ", req.body.csrfToken);
  const idToken = req.body.idToken.toString();
  const csrfToken = req.body.csrfToken.toString();
  console.log("req cookies are: ", req.cookies);
  console.log("csrftoken is: ", req.cookies.csrfToken);
  // Guard against CSRF attacks.
  if (csrfToken !== req.cookies.csrfToken) {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.post('/sessionLogout', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  admin
    .auth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then((result) => {
      console.log("result 1 is", result);
      res.json('/signin');
    })
    .catch((error) => {
      console.log("logout err is: ", error);
      res.json('/signin');
    });
});

app.get("/items", (req, res) => {
  const items = [
    {
      category: "Drink",
      has: [
        {
          name: "cake",
          price: 2,
          url: "./cake.png",
        },
        {
          name: "pizza",
          price: 3,
          url: "./pizza.png",
        },
      ],
    },
    {
      category: "Snack",
      has: [
        {
          name: "Burger",
          price: 1,
          url: "./burger.png",
        },
        {
          name: "cake",
          price: 2,
          url: "./cake.png",
        },
      ],
    },
  ];
  res.json(items);
});

app.get("/items/:category", (req, res) => {
  const items = [
    {
      category: "Drink",
      has: [
        {
          name: "cake",
          price: 2,
          url: "./cake.png",
        },
        {
          name: "pizza",
          price: 3,
          url: "./pizza.png",
        },
      ],
    },
    {
      category: "Snack",
      has: [
        {
          name: "Burger",
          price: 1,
          url: "./burger.png",
        },
        {
          name: "cake",
          price: 2,
          url: "./cake.png",
        },
      ],
    },
  ];
  console.log("server side category is: ", req.params.category);
  const filtered_list = items.filter(
    (item) => item.category === req.params.category
  )[0].has;
  res.json(filtered_list);
});

app.get(
  "/user/changeAddress",
  csrfProtection,
  checkSessionCookie,
  checkToken,
  (req, res) => {
    res.json("cool");
  }
);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
